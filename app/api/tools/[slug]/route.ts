import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

type ResumeRequestBody = {
  targetRole?: string;
  experienceLevel?: string;
  tone?: string;
  achievement?: string;
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
const RATE_LIMIT_MAX_REQUESTS = 5;
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

function parseBullets(content: string) {
  try {
    const parsed = JSON.parse(content) as unknown;
    if (Array.isArray(parsed)) {
      return parsed.filter((item): item is string => typeof item === "string").slice(0, 5);
    }

    if (parsed && typeof parsed === "object" && "bullets" in parsed) {
      const maybeObject = parsed as { bullets?: unknown };
      if (!Array.isArray(maybeObject.bullets)) {
        return [];
      }

      return maybeObject.bullets
        .filter((item): item is string => typeof item === "string")
        .slice(0, 5);
    }
  } catch {
    // Fall through to line parsing for occasional non-JSON model responses.
  }

  return content
    .split("\n")
    .map((line) => line.replace(/^[-*\d.)\s]+/, "").trim())
    .filter(Boolean)
    .slice(0, 5);
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

  const body = (await request.json()) as ResumeRequestBody;
  const targetRole = sanitizeInput(body.targetRole, 120);
  const experienceLevel = sanitizeInput(body.experienceLevel, 60) || "Mid level";
  const tone = sanitizeInput(body.tone, 40) || "Impactful";
  const achievement = sanitizeInput(body.achievement, 900);

  if (!targetRole || !achievement) {
    return NextResponse.json(
      { error: "Please enter a target role and achievement before generating." },
      { status: 400 },
    );
  }

  const prompt = [
    "Create exactly 5 ATS-friendly resume bullet points.",
    `Target role: ${targetRole}`,
    `Experience level: ${experienceLevel}`,
    `Tone: ${tone}`,
    `Achievement/task: ${achievement}`,
    "Rules:",
    "- Use concise, strong action verbs.",
    "- Tailor each bullet to the role, level, and tone.",
    "- Include measurable impact language where possible, but do not invent fake numbers.",
    "- Keep each bullet under 28 words.",
    '- Return only JSON in this shape: {"bullets":["...","...","...","...","..."]}. No markdown. No explanation.',
  ].join("\n");

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
            "You are an expert resume writer who writes concise, ATS-friendly bullets for modern job seekers.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.45,
      max_completion_tokens: 450,
      response_format: { type: "json_object" },
    }),
  });

  const data = (await groqResponse.json()) as GroqChatResponse;

  if (!groqResponse.ok) {
    return NextResponse.json(
      {
        error:
          data.error?.message ||
          "AI generation failed. Please try again in a moment.",
      },
      { status: groqResponse.status },
    );
  }

  const content = data.choices?.[0]?.message?.content || "";
  const bullets = parseBullets(content);

  if (bullets.length !== 5) {
    return NextResponse.json(
      { error: "AI response was incomplete. Please try generating again." },
      { status: 502 },
    );
  }

  return NextResponse.json({ bullets });
}
