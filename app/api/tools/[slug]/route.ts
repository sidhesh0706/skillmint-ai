import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

type ResumeRequestBody = {
  action?: "generate" | "improve-bullet";
  targetRole?: string;
  experienceLevel?: string;
  industry?: string;
  achievement?: string;
  tools?: string;
  metrics?: string;
  tone?: string;
  outputMode?: string;
  bullet?: string;
};

type ResumeGeneration = {
  bullets: string[];
  keywords: string[];
  tips: string[];
  scores: BulletScore[];
  summary: ResumeStrengthSummary;
  missingKeywords: string[];
};

type BulletScore = {
  score: number;
  reason: string;
  suggestion: string;
};

type ResumeStrengthSummary = {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  nextAction: string;
};

type ImprovedBullet = {
  bullet: string;
  score: BulletScore;
  changes: string[];
};

type GroqChatResponse = {
  choices?: Array<{
    message?: {
      content?: string;
    };
  }>;
  error?: {
    message?: string;
  };
};

const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const requestLog = new Map<string, number[]>();

function getClientId(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "anonymous";
}

function checkRateLimit(clientId: string) {
  const now = Date.now();
  const recentRequests = (requestLog.get(clientId) || []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  requestLog.set(clientId, [...recentRequests, now]);
  return true;
}

function sanitizeInput(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function getStringArray(value: unknown, maxItems: number) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, maxItems);
}

function getScore(value: unknown) {
  if (typeof value !== "number" || Number.isNaN(value)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(value)));
}

function getBulletScores(value: unknown, maxItems: number) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return {
          score: 0,
          reason: "",
          suggestion: "",
        };
      }

      const scoreItem = item as {
        score?: unknown;
        reason?: unknown;
        suggestion?: unknown;
      };

      return {
        score: getScore(scoreItem.score),
        reason:
          typeof scoreItem.reason === "string"
            ? scoreItem.reason.trim().slice(0, 180)
            : "",
        suggestion:
          typeof scoreItem.suggestion === "string"
            ? scoreItem.suggestion.trim().slice(0, 180)
            : "",
      };
    })
    .slice(0, maxItems);
}

function getSummary(value: unknown): ResumeStrengthSummary {
  const summary = value as {
    overallScore?: unknown;
    strengths?: unknown;
    weaknesses?: unknown;
    nextAction?: unknown;
  };

  return {
    overallScore: getScore(summary?.overallScore),
    strengths: getStringArray(summary?.strengths, 3),
    weaknesses: getStringArray(summary?.weaknesses, 3),
    nextAction:
      typeof summary?.nextAction === "string"
        ? summary.nextAction.trim().slice(0, 180)
        : "",
  };
}

function parseJsonObject(content: string) {
  try {
    const parsed = JSON.parse(content) as unknown;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    const match = content.match(/\{[\s\S]*\}/);
    if (!match) {
      return null;
    }

    try {
      const parsed = JSON.parse(match[0]) as unknown;
      return parsed && typeof parsed === "object" ? parsed : null;
    } catch {
      return null;
    }
  }
}

function parseGeneration(content: string): ResumeGeneration {
  const parsed = parseJsonObject(content) as {
    bullets?: unknown;
    keywords?: unknown;
    tips?: unknown;
    scores?: unknown;
    summary?: unknown;
    missingKeywords?: unknown;
  } | null;

  return {
    bullets: getStringArray(parsed?.bullets, 5),
    keywords: getStringArray(parsed?.keywords, 10),
    tips: getStringArray(parsed?.tips, 3),
    scores: getBulletScores(parsed?.scores, 5),
    summary: getSummary(parsed?.summary),
    missingKeywords: getStringArray(parsed?.missingKeywords, 8),
  };
}

function parseImprovedBullet(content: string): ImprovedBullet {
  const parsed = parseJsonObject(content) as {
    bullet?: unknown;
    score?: unknown;
    changes?: unknown;
  } | null;

  return {
    bullet: typeof parsed?.bullet === "string" ? parsed.bullet.trim() : "",
    score: getBulletScores([parsed?.score], 1)[0] || {
      score: 0,
      reason: "",
      suggestion: "",
    },
    changes: getStringArray(parsed?.changes, 3),
  };
}

function getModeGuidance(outputMode: string) {
  if (outputMode === "ATS-optimized") {
    return "Prioritize role-relevant ATS keywords, standard resume phrasing, and searchable skills without keyword stuffing.";
  }

  if (outputMode === "Short & punchy") {
    return "Keep bullets very tight, direct, and punchy; prefer 16-22 words per bullet.";
  }

  return "Balance human recruiter readability with measurable impact, credibility, and role-specific context.";
}

function getToneGuidance(tone: string) {
  if (tone === "Professional") {
    return "Use polished, credible business language with restrained claims.";
  }

  if (tone === "Concise") {
    return "Use compact wording, remove filler, and keep each bullet under 22 words.";
  }

  return "Use confident action verbs and sharper impact language while staying believable.";
}

async function callGroq(apiKey: string, prompt: string, maxCompletionTokens: number) {
  const groqResponse = await fetch(GROQ_CHAT_COMPLETIONS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume writer and technical recruiter. You write specific, truthful, ATS-friendly bullets with strong action verbs and role-relevant keywords.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.42,
      max_completion_tokens: maxCompletionTokens,
      response_format: { type: "json_object" },
    }),
  });

  const data = (await groqResponse.json()) as GroqChatResponse;

  if (!groqResponse.ok) {
    throw new Error(
      data.error?.message || "AI generation failed. Please try again in a moment.",
    );
  }

  return data.choices?.[0]?.message?.content || "";
}

function getCleanBody(rawBody: ResumeRequestBody) {
  return {
    action: rawBody.action || "generate",
    targetRole: sanitizeInput(rawBody.targetRole, 120),
    experienceLevel: sanitizeInput(rawBody.experienceLevel, 60) || "Mid level",
    industry: sanitizeInput(rawBody.industry, 120),
    achievement: sanitizeInput(rawBody.achievement, 1_000),
    tools: sanitizeInput(rawBody.tools, 300),
    metrics: sanitizeInput(rawBody.metrics, 240),
    tone: sanitizeInput(rawBody.tone, 40) || "Impactful",
    outputMode: sanitizeInput(rawBody.outputMode, 60) || "Recruiter-friendly",
    bullet: sanitizeInput(rawBody.bullet, 400),
  };
}

function buildGeneratePrompt(input: ReturnType<typeof getCleanBody>) {
  const metricsGuidance = input.metrics
    ? `Use these user-provided metrics/results where relevant: ${input.metrics}`
    : "If no metrics are provided, add conservative, realistic metrics only when the task implies measurable scope or improvement. Do not invent extreme revenue, headcount, or company-wide claims.";

  return [
    "Generate recruiter-ready resume content for this candidate.",
    `Target role: ${input.targetRole}`,
    `Experience level: ${input.experienceLevel}`,
    `Industry/domain: ${input.industry || "Not specified"}`,
    `Achievement/task: ${input.achievement}`,
    `Tools/technologies used: ${input.tools || "Not specified"}`,
    `Tone: ${input.tone}`,
    `Output mode: ${input.outputMode}`,
    `Mode guidance: ${getModeGuidance(input.outputMode)}`,
    `Tone guidance: ${getToneGuidance(input.tone)}`,
    metricsGuidance,
    "Rules:",
    "- Produce exactly 5 resume bullets.",
    "- Start every bullet with a strong action verb.",
    "- Include role-relevant keywords naturally.",
    "- Avoid generic phrases such as responsible for, helped with, worked on, or involved in.",
    "- Avoid overused AI-sounding language such as leveraged, spearheaded, cutting-edge, robust, seamless, and game-changing unless truly natural.",
    "- Keep bullets concise, ATS-friendly, and credible.",
    "- Use numbers, percentages, timeframes, volumes, or quality indicators where useful.",
    "- If adding inferred metrics, keep them modest and plausible.",
    "- Return 6-10 keywords that were used or should be represented.",
    "- Suggest 4-8 missing role or industry keywords the user may add only if truthful.",
    "- Score each bullet from 0-100 based on clarity, impact, specificity, ATS keyword strength, metric usage, and action verb quality.",
    "- For each score, include a short reason and one improvement suggestion.",
    "- Return an overall resume strength summary with overall score, strengths, weaknesses, and next recommended action.",
    "- Return 2-3 short improvement tips for the user's resume input.",
    'Return only JSON in this exact shape: {"bullets":["...","...","...","...","..."],"keywords":["..."],"tips":["..."],"scores":[{"score":85,"reason":"...","suggestion":"..."}],"summary":{"overallScore":84,"strengths":["..."],"weaknesses":["..."],"nextAction":"..."},"missingKeywords":["..."]}.',
  ].join("\n");
}

function buildImprovePrompt(input: ReturnType<typeof getCleanBody>) {
  return [
    "Rewrite only the provided resume bullet into a stronger version.",
    `Target role: ${input.targetRole}`,
    `Experience level: ${input.experienceLevel}`,
    `Industry/domain: ${input.industry || "Not specified"}`,
    `Tools/technologies used: ${input.tools || "Not specified"}`,
    `Metrics/results: ${input.metrics || "Not specified"}`,
    `Tone: ${input.tone}`,
    `Output mode: ${input.outputMode}`,
    `Original bullet: ${input.bullet}`,
    "Rules:",
    "- Keep the meaning truthful to the original bullet.",
    "- Improve specificity, action verb strength, ATS keywords, and measurable impact.",
    "- Return 1-3 concise notes explaining what changed.",
    "- Score the improved bullet from 0-100 based on clarity, impact, specificity, ATS keyword strength, metric usage, and action verb quality.",
    "- Keep it concise and recruiter-ready.",
    "- Do not rewrite other bullets.",
    '- Return only JSON in this exact shape: {"bullet":"...","score":{"score":90,"reason":"...","suggestion":"..."},"changes":["..."]}',
  ].join("\n");
}

export async function POST(request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;

  if (slug !== "resume-bullet-generator") {
    return NextResponse.json({ error: "Tool is not available yet." }, { status: 404 });
  }

  if (!checkRateLimit(getClientId(request))) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute before generating again." },
      { status: 429 },
    );
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "AI generation is not configured yet. Add GROQ_API_KEY to enable it." },
      { status: 500 },
    );
  }

  const input = getCleanBody((await request.json()) as ResumeRequestBody);

  if (!input.targetRole || !input.achievement) {
    return NextResponse.json(
      { error: "Please enter a target role and achievement before generating." },
      { status: 400 },
    );
  }

  try {
    if (input.action === "improve-bullet") {
      if (!input.bullet) {
        return NextResponse.json(
          { error: "Choose a bullet to improve first." },
          { status: 400 },
        );
      }

      const content = await callGroq(apiKey, buildImprovePrompt(input), 360);
      const result = parseImprovedBullet(content);

      if (!result.bullet) {
        return NextResponse.json(
          { error: "AI response was incomplete. Please try improving the bullet again." },
          { status: 502 },
        );
      }

      return NextResponse.json(result);
    }

    const content = await callGroq(apiKey, buildGeneratePrompt(input), 1_300);
    const result = parseGeneration(content);

    if (result.bullets.length !== 5) {
      return NextResponse.json(
        { error: "AI response was incomplete. Please try generating again." },
        { status: 502 },
      );
    }

    if (result.scores.length !== 5) {
      result.scores = result.bullets.map((bullet) => ({
        score: 72,
        reason: bullet.match(/\d/) ? "Clear bullet with some measurable evidence." : "Clear wording, but impact could be more specific.",
        suggestion: bullet.match(/\d/) ? "Keep the metric tied to the outcome." : "Add a truthful metric, scope, or result if available.",
      }));
    }

    if (!result.summary.overallScore) {
      result.summary = {
        overallScore: Math.round(
          result.scores.reduce((total, score) => total + score.score, 0) / result.scores.length,
        ),
        strengths: ["Uses action-oriented resume language.", "Includes role-relevant phrasing."],
        weaknesses: ["Some bullets may need more proof or context."],
        nextAction: "Add truthful metrics, tools, and business outcomes where possible.",
      };
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "AI generation failed. Please try again in a moment.",
      },
      { status: 500 },
    );
  }
}
