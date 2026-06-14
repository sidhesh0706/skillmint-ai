"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clipboard,
  Download,
  Eye,
  FileDown,
  FileText,
  History,
  Linkedin,
  RefreshCw,
  Share2,
  Sparkles,
  Target,
  Trash2,
  Wand2,
} from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { AffiliateRecommendationCard } from "@/components/affiliate-recommendation-card";
import { AnimatedScoreBadge } from "@/components/animated-score-badge";
import { EmailCapture } from "@/components/email-capture";
import { EmptyStatePreview } from "@/components/empty-state-preview";
import { InsightPanel } from "@/components/insight-panel";
import { KeywordChip } from "@/components/keyword-chip";
import { LoadingIntelligenceState } from "@/components/loading-intelligence-state";
import { MotionButton } from "@/components/motion-button";
import { OutputActionBar } from "@/components/output-action-bar";
import { ScoreMeter } from "@/components/score-meter";
import { recommendedResources } from "@/config/monetization";
import {
  getInitialToolValues,
  getToolBySlug,
  type ToolField,
  type ToolFormValues,
} from "@/data/tool-config";
import { trackEvent } from "@/lib/analytics";

type ToolWorkspaceProps = {
  slug: string;
};

type ResumeOutput = {
  bullets: string[];
  keywords: string[];
  tips: string[];
  scores: BulletScore[];
  summary: ResumeStrengthSummary;
  missingKeywords: string[];
  actionVerbs: string[];
  whatToAdd: string[];
  comparisons: Record<number, BulletComparison>;
};

type BulletScore = {
  score: number;
  reason: string;
  suggestion: string;
  breakdown: BulletScoreBreakdown;
};

type BulletScoreBreakdown = {
  clarity: number;
  impact: number;
  specificity: number;
  metrics: number;
  atsKeywordFit: number;
  actionVerbStrength: number;
};

type BulletComparison = {
  original: string;
  improved: string;
  changes: string[];
};

type ResumeStrengthSummary = {
  overallScore: number;
  strengths: string[];
  weaknesses: string[];
  nextAction: string;
};

type GenerationHistoryItem = {
  id: string;
  role: string;
  createdAt: string;
  form: ToolFormValues;
  output: ResumeOutput;
};

const emptyOutput: ResumeOutput = {
  bullets: [],
  keywords: [],
  tips: [],
  scores: [],
  summary: {
    overallScore: 0,
    strengths: [],
    weaknesses: [],
    nextAction: "",
  },
  missingKeywords: [],
  actionVerbs: [],
  whatToAdd: [],
  comparisons: {},
};

type RewriteResult = {
  original: string;
  bullet: string;
  score: BulletScore;
  changes: string[];
};

const examplePresets = [
  {
    label: "Software project",
    values: {
      targetRole: "Software Engineer",
      industry: "SaaS",
      experienceLevel: "Entry level",
      outputMode: "ATS-optimized",
      achievement:
        "Built a React dashboard for users to track onboarding tasks and support requests.",
      tools: "React, TypeScript, Tailwind CSS, REST APIs",
      metrics: "reduced duplicate status questions by 25%",
      tone: "Impactful",
      jobDescription:
        "Looking for a software engineer with React, TypeScript, API integration, dashboard development, collaboration, and performance optimization experience.",
    },
  },
  {
    label: "Data analysis project",
    values: {
      targetRole: "Data Analyst",
      industry: "Ecommerce",
      experienceLevel: "Mid level",
      outputMode: "ATS-optimized",
      achievement:
        "Analyzed customer purchase data to identify retention patterns and campaign opportunities.",
      tools: "SQL, Excel, Tableau",
      metrics: "analyzed 50,000 customer records and reduced weekly reporting time by 6 hours",
      tone: "Professional",
      jobDescription:
        "Data analyst role requiring SQL, dashboards, customer analytics, stakeholder reporting, data cleaning, and business insights.",
    },
  },
  {
    label: "Internship task",
    values: {
      targetRole: "Marketing Intern",
      industry: "B2B technology",
      experienceLevel: "Entry level",
      outputMode: "Recruiter-friendly",
      achievement:
        "Supported weekly content planning, competitor research, and social media reporting during internship.",
      tools: "Google Sheets, Canva, LinkedIn, Google Analytics",
      metrics: "researched 15 competitors and prepared 4 weekly reports",
      tone: "Concise",
      jobDescription:
        "Marketing internship focused on content planning, competitor research, social media, campaign reporting, and analytics.",
    },
  },
  {
    label: "Leadership activity",
    values: {
      targetRole: "Project Coordinator",
      industry: "Student organization",
      experienceLevel: "Entry level",
      outputMode: "Recruiter-friendly",
      achievement:
        "Led a student team to organize a campus event, coordinate vendors, manage timeline, and track registrations.",
      tools: "Google Sheets, Notion, email",
      metrics: "coordinated 8 volunteers and supported 120 attendees",
      tone: "Impactful",
      jobDescription:
        "Project coordinator role requiring stakeholder communication, scheduling, documentation, event coordination, and task tracking.",
    },
  },
  {
    label: "Customer support work",
    values: {
      targetRole: "Customer Support Specialist",
      industry: "Software",
      experienceLevel: "Mid level",
      outputMode: "ATS-optimized",
      achievement:
        "Resolved customer questions across chat and email while documenting recurring product issues.",
      tools: "Zendesk, Intercom, Salesforce",
      metrics: "handled 45 tickets per day and maintained 94% CSAT",
      tone: "Professional",
      jobDescription:
        "Customer support specialist role requiring ticket resolution, Zendesk, customer communication, escalation, documentation, and CSAT ownership.",
    },
  },
  {
    label: "Marketing campaign",
    values: {
      targetRole: "Digital Marketing Specialist",
      industry: "Consumer apps",
      experienceLevel: "Mid level",
      outputMode: "Short & punchy",
      achievement:
        "Managed paid social campaign reporting and adjusted messaging based on conversion performance.",
      tools: "Meta Ads, Google Analytics, HubSpot",
      metrics: "improved qualified lead volume by 18%",
      tone: "Impactful",
      jobDescription:
        "Digital marketing role focused on paid social campaigns, conversion optimization, reporting, Google Analytics, CRM, and lifecycle messaging.",
    },
  },
];

const breakdownLabels: Array<[keyof BulletScoreBreakdown, string]> = [
  ["clarity", "Clarity"],
  ["impact", "Impact"],
  ["specificity", "Specificity"],
  ["metrics", "Metrics"],
  ["atsKeywordFit", "ATS fit"],
  ["actionVerbStrength", "Verb"],
];

const exportActions = [
  {
    label: "Copy",
    description: "Plain resume format",
    icon: Clipboard,
    action: "copy" as const,
  },
  {
    label: "TXT",
    description: "Download text",
    icon: Download,
    action: "txt" as const,
  },
  {
    label: "Markdown",
    description: "Download .md",
    icon: FileDown,
    action: "markdown" as const,
  },
  {
    label: "LinkedIn",
    description: "Profile-ready copy",
    icon: Linkedin,
    action: "linkedin" as const,
  },
  {
    label: "Docs",
    description: "Editor-friendly copy",
    icon: FileText,
    action: "docs" as const,
  },
];

const loadingSteps = [
  "Scanning experience",
  "Extracting impact",
  "Matching ATS keywords",
  "Rewriting for recruiters",
];

function renderField(
  field: ToolField,
  value: string,
  onChange: (name: string, value: string) => void,
) {
  const commonClasses = "premium-input";

  if (field.type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        placeholder={field.placeholder}
        rows={field.rows || 5}
        className={`${commonClasses} resize-none`}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={commonClasses}
      >
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    );
  }

  return (
    <input
      value={value}
      onChange={(event) => onChange(field.name, event.target.value)}
      placeholder={field.placeholder}
      className={commonClasses}
    />
  );
}

function formatOutputText(output: ResumeOutput) {
  return [
    "Resume Strength Summary",
    `Overall score: ${output.summary.overallScore || 0}/100`,
    output.summary.strengths.length ? `Strengths: ${output.summary.strengths.join("; ")}` : "",
    output.summary.weaknesses.length ? `Weaknesses: ${output.summary.weaknesses.join("; ")}` : "",
    output.summary.nextAction ? `Next action: ${output.summary.nextAction}` : "",
    "",
    "Best 5 bullets",
    ...output.bullets.map((bullet, index) => {
      const score = output.scores[index]?.score;
      return `- ${bullet}${score ? ` (${score}/100)` : ""}`;
    }),
    "",
    "Keywords used",
    output.keywords.join(", "),
    "",
    "Missing keywords to consider",
    output.missingKeywords.join(", "),
    "",
    "Stronger action verbs",
    output.actionVerbs.join(", "),
    "",
    "What to add if truthful",
    ...output.whatToAdd.map((item) => `- ${item}`),
    "",
    "Improvement tips",
    ...output.tips.map((tip) => `- ${tip}`),
  ]
    .filter((line, index, lines) => line || lines[index - 1] !== "")
    .join("\n");
}

function formatOutputMarkdown(output: ResumeOutput) {
  return [
    "## Resume Strength Summary",
    `Overall score: **${output.summary.overallScore || 0}/100**`,
    "",
    output.summary.strengths.length ? `**Strengths:** ${output.summary.strengths.join("; ")}` : "",
    output.summary.weaknesses.length ? `**Weaknesses:** ${output.summary.weaknesses.join("; ")}` : "",
    output.summary.nextAction ? `**Next action:** ${output.summary.nextAction}` : "",
    "",
    "## Best 5 bullets",
    ...output.bullets.map((bullet, index) => {
      const score = output.scores[index]?.score;
      return `- ${bullet}${score ? ` _Score: ${score}/100_` : ""}`;
    }),
    "",
    "## Keywords used",
    output.keywords.length ? output.keywords.map((keyword) => `\`${keyword}\``).join(", ") : "None",
    "",
    "## Missing keywords to consider",
    output.missingKeywords.length
      ? output.missingKeywords.map((keyword) => `\`${keyword}\``).join(", ")
      : "None",
    "",
    "## Stronger action verbs",
    output.actionVerbs.length
      ? output.actionVerbs.map((verb) => `\`${verb}\``).join(", ")
      : "None",
    "",
    "## What to add if truthful",
    ...(output.whatToAdd.length ? output.whatToAdd.map((item) => `- ${item}`) : ["None"]),
    "",
    "## Improvement tips",
    ...output.tips.map((tip) => `- ${tip}`),
  ]
    .filter((line, index, lines) => line || lines[index - 1] !== "")
    .join("\n");
}

function formatLinkedInCopy(output: ResumeOutput) {
  return [
    "A few resume-ready wins from my recent work:",
    "",
    ...output.bullets.map((bullet) => `- ${bullet}`),
    "",
    output.keywords.length ? `Keywords: ${output.keywords.join(", ")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function formatDocsCopy(output: ResumeOutput) {
  return [
    "Best 5 Resume Bullets",
    ...output.bullets.map((bullet) => `- ${bullet}`),
    "",
    "Keywords Used",
    output.keywords.join(", "),
    "",
    "Missing Keywords From Target Posting",
    output.missingKeywords.join(", "),
    "",
    "Stronger Action Verbs",
    output.actionVerbs.join(", "),
    "",
    "Improvement Tips",
    ...output.tips.map((tip) => `- ${tip}`),
  ].join("\n");
}

function normalizeBreakdown(
  breakdown: Partial<BulletScoreBreakdown> | undefined,
  fallbackScore: number,
): BulletScoreBreakdown {
  const clean = (value: unknown) =>
    Math.max(0, Math.min(100, Math.round(typeof value === "number" ? value : fallbackScore)));

  return {
    clarity: clean(breakdown?.clarity),
    impact: clean(breakdown?.impact),
    specificity: clean(breakdown?.specificity),
    metrics: clean(breakdown?.metrics),
    atsKeywordFit: clean(breakdown?.atsKeywordFit),
    actionVerbStrength: clean(breakdown?.actionVerbStrength),
  };
}

function normalizeScore(score: Partial<BulletScore> | undefined, bullet: string): BulletScore {
  const numericScore = typeof score?.score === "number" ? score.score : bullet.match(/\d/) ? 78 : 68;
  const cleanScore = Math.max(0, Math.min(100, Math.round(numericScore)));

  return {
    score: cleanScore,
    reason:
      score?.reason ||
      (bullet.match(/\d/)
        ? "Clear bullet with measurable evidence."
        : "Clear bullet, but impact could be more specific."),
    suggestion:
      score?.suggestion ||
      (bullet.match(/\d/)
        ? "Make sure the metric is truthful and tied to a business outcome."
        : "Add a truthful metric, tool, scope, or outcome if available."),
    breakdown: normalizeBreakdown(score?.breakdown, cleanScore),
  };
}

function normalizeOutput(output: Partial<ResumeOutput> | null | undefined): ResumeOutput {
  const bullets = Array.isArray(output?.bullets) ? output.bullets.filter(Boolean).slice(0, 5) : [];
  const scores = bullets.map((bullet, index) => normalizeScore(output?.scores?.[index], bullet));
  const averageScore = scores.length
    ? Math.round(scores.reduce((total, score) => total + score.score, 0) / scores.length)
    : 0;

  return {
    bullets,
    keywords: Array.isArray(output?.keywords) ? output.keywords.filter(Boolean).slice(0, 10) : [],
    tips: Array.isArray(output?.tips) ? output.tips.filter(Boolean).slice(0, 3) : [],
    scores,
    summary: {
      overallScore: Math.max(
        0,
        Math.min(100, Math.round(Number(output?.summary?.overallScore) || averageScore)),
      ),
      strengths: Array.isArray(output?.summary?.strengths)
        ? output.summary.strengths.filter(Boolean).slice(0, 3)
        : [],
      weaknesses: Array.isArray(output?.summary?.weaknesses)
        ? output.summary.weaknesses.filter(Boolean).slice(0, 3)
        : [],
      nextAction: output?.summary?.nextAction || "",
    },
    missingKeywords: Array.isArray(output?.missingKeywords)
      ? output.missingKeywords.filter(Boolean).slice(0, 8)
      : [],
    actionVerbs: Array.isArray(output?.actionVerbs)
      ? output.actionVerbs.filter(Boolean).slice(0, 10)
      : [],
    whatToAdd: Array.isArray(output?.whatToAdd)
      ? output.whatToAdd.filter(Boolean).slice(0, 6)
      : [],
    comparisons: output?.comparisons || {},
  };
}

function getFieldLayout(field: ToolField) {
  if (field.layout === "half") {
    return "block";
  }

  return "block sm:col-span-2";
}

function getScoreClasses(score: number) {
  if (score >= 85) {
    return "border-mint-100 bg-mint-50 text-mint-700";
  }

  if (score >= 70) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-red-200 bg-red-50 text-red-700";
}

function getScoreBarColor(score: number) {
  if (score >= 85) {
    return "bg-mint-500";
  }

  if (score >= 70) {
    return "bg-amber-400";
  }

  return "bg-red-400";
}

export function ToolWorkspace({ slug }: ToolWorkspaceProps) {
  const tool = getToolBySlug(slug)!;
  const formStorageKey = `skillmint:${tool.slug}:form`;
  const outputStorageKey = `skillmint:${tool.slug}:output`;
  const historyStorageKey = `skillmint:${tool.slug}:history`;

  const [form, setForm] = useState<ToolFormValues>(() => getInitialToolValues(tool));
  const [generated, setGenerated] = useState<ResumeOutput>(emptyOutput);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [improvingIndex, setImprovingIndex] = useState<number | null>(null);
  const [lastGeneratedAt, setLastGeneratedAt] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState("");
  const [expandedComparisons, setExpandedComparisons] = useState<Record<number, boolean>>({});
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
  const [existingBullet, setExistingBullet] = useState("");
  const [rewriteResult, setRewriteResult] = useState<RewriteResult | null>(null);
  const [isRewriting, setIsRewriting] = useState(false);

  const hasOutput = generated.bullets.length > 0;
  const outputText = useMemo(() => formatOutputText(generated), [generated]);
  const outputMarkdown = useMemo(() => formatOutputMarkdown(generated), [generated]);
  const contextFields = tool.inputFields.filter((field) =>
    ["targetRole", "industry", "experienceLevel", "outputMode", "tone"].includes(field.name),
  );
  const detailFields = tool.inputFields.filter((field) =>
    ["achievement", "jobDescription"].includes(field.name),
  );
  const proofFields = tool.inputFields.filter((field) =>
    ["tools", "metrics"].includes(field.name),
  );

  useEffect(() => {
    try {
      const savedForm = localStorage.getItem(formStorageKey);
      const savedOutput = localStorage.getItem(outputStorageKey);
      const savedHistory = localStorage.getItem(historyStorageKey);

      if (savedForm) {
        setForm((current) => ({
          ...current,
          ...(JSON.parse(savedForm) as ToolFormValues),
        }));
      }

      if (savedOutput) {
        const parsedOutput = normalizeOutput(JSON.parse(savedOutput) as Partial<ResumeOutput>);
        if (parsedOutput.bullets.length) {
          setGenerated(parsedOutput);
        }
      }

      if (savedHistory) {
        const rawHistory = JSON.parse(savedHistory) as GenerationHistoryItem[];
        const parsedHistory = Array.isArray(rawHistory)
          ? rawHistory.map((item) => ({
              ...item,
              output: normalizeOutput(item.output),
            }))
          : [];
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory.slice(0, 10));
        }
      }
    } catch {
      setHistory([]);
    } finally {
      setIsHydrated(true);
    }
  }, [formStorageKey, historyStorageKey, outputStorageKey]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    localStorage.setItem(formStorageKey, JSON.stringify(form));
  }, [form, formStorageKey, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (hasOutput) {
      localStorage.setItem(outputStorageKey, JSON.stringify(generated));
    }
  }, [generated, hasOutput, isHydrated, outputStorageKey]);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(""), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  function updateForm(name: string, value: string) {
    if (!hasTrackedFormStart) {
      trackEvent("tool_form_started", { tool: tool.slug, field: name });
      setHasTrackedFormStart(true);
    }
    setForm((current) => ({ ...current, [name]: value }));
  }

  function applyPreset(values: ToolFormValues) {
    setForm((current) => ({ ...current, ...values }));
    trackEvent("tool_form_started", { tool: tool.slug, field: "preset" });
    setHasTrackedFormStart(true);
    showToast("Example fields added. Adjust anything before generating.");
  }

  function showToast(message: string) {
    setToast(message);
  }

  function saveToHistory(output: ResumeOutput, sourceForm: ToolFormValues) {
    const normalizedOutput = normalizeOutput(output);
    const item: GenerationHistoryItem = {
      id: `${Date.now()}`,
      role: sourceForm.targetRole || "Untitled role",
      createdAt: new Date().toISOString(),
      form: sourceForm,
      output: normalizedOutput,
    };

    setHistory((current) => {
      const nextHistory = [item, ...current].slice(0, 10);
      localStorage.setItem(historyStorageKey, JSON.stringify(nextHistory));
      return nextHistory;
    });
    showToast("Saved to recent generations.");
  }

  function reopenHistoryItem(item: GenerationHistoryItem) {
    setForm((current) => ({ ...current, ...item.form }));
    setGenerated(normalizeOutput(item.output));
    setError("");
    setExpandedComparisons({});
    trackEvent("history_reopened", { tool: tool.slug });
    showToast("Past generation restored.");
  }

  function clearHistory() {
    setHistory([]);
    localStorage.removeItem(historyStorageKey);
    showToast("Recent generations cleared.");
  }

  function validateInputs() {
    if (!form.targetRole?.trim()) {
      return "Please enter a target role before generating.";
    }

    if (!form.achievement?.trim()) {
      return "Please describe an achievement or task before generating.";
    }

    return "";
  }

  async function requestGeneration(action: "generate" | "improve-bullet", bullet?: string) {
    const validationError = validateInputs();

    if (validationError) {
      setError(validationError);
      return null;
    }

    const response = await fetch(`/api/tools/${tool.slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...form,
        action,
        bullet,
      }),
    });

    const data = (await response.json()) as Partial<ResumeOutput> & {
      bullet?: string;
      score?: BulletScore;
      changes?: string[];
      error?: string;
    };

    if (!response.ok) {
      throw new Error(data.error || "Unable to generate resume bullets right now.");
    }

    return data;
  }

  async function handleGenerate(eventName: "generate_click" | "regenerate_click" = hasOutput ? "regenerate_click" : "generate_click") {
    const now = Date.now();
    const cooldownRemaining = 10_000 - (now - lastGeneratedAt);

    if (cooldownRemaining > 0) {
      setError(`Please wait ${Math.ceil(cooldownRemaining / 1000)} seconds before generating again.`);
      return;
    }

    setError("");
    setCopied(false);
    setIsGenerating(true);
    trackEvent(eventName, { tool: tool.slug, outputMode: form.outputMode });
    trackEvent("tool_generate_clicked", { tool: tool.slug, outputMode: form.outputMode });

    try {
      const data = await requestGeneration("generate");

      if (!data?.bullets?.length) {
        throw new Error("Unable to generate resume bullets right now.");
      }

      const output = normalizeOutput(data);

      setGenerated(output);
      setExpandedComparisons({});
      saveToHistory(output, form);
      trackEvent("score_generated", {
        tool: tool.slug,
        overallScore: output.summary.overallScore,
      });
      trackEvent("generation_success", {
        tool: tool.slug,
        outputMode: form.outputMode,
        overallScore: output.summary.overallScore,
      });
      trackEvent("tool_generate_success", {
        tool: tool.slug,
        outputMode: form.outputMode,
        overallScore: output.summary.overallScore,
      });
      setLastGeneratedAt(Date.now());
    } catch (caughtError) {
      trackEvent("tool_generate_error", { tool: tool.slug });
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to generate resume bullets right now.",
      );
    } finally {
      setIsGenerating(false);
    }
  }

  async function handleImproveBullet(index: number) {
    setError("");
    setImprovingIndex(index);

    try {
      const data = await requestGeneration("improve-bullet", generated.bullets[index]);

      if (!data?.bullet) {
        throw new Error("Unable to improve this bullet right now.");
      }

      setGenerated((current) => {
        const nextScores = current.scores.map((score, bulletIndex) =>
          bulletIndex === index
            ? normalizeScore(data.score, data.bullet || current.bullets[index])
            : score,
        );
        const nextOverallScore = nextScores.length
          ? Math.round(nextScores.reduce((total, score) => total + score.score, 0) / nextScores.length)
          : current.summary.overallScore;

        return {
          ...current,
          bullets: current.bullets.map((bullet, bulletIndex) =>
            bulletIndex === index ? data.bullet || bullet : bullet,
          ),
          scores: nextScores,
          summary: {
            ...current.summary,
            overallScore: nextOverallScore,
            nextAction: "Review the strengthened bullet and add any truthful missing keywords that fit your experience.",
          },
          comparisons: {
            ...current.comparisons,
            [index]: {
              original: current.bullets[index],
              improved: data.bullet || current.bullets[index],
              changes: data.changes?.length
                ? data.changes
                : ["Improved clarity, action verb strength, and recruiter readability."],
            },
          },
        };
      });
      setExpandedComparisons((current) => ({ ...current, [index]: true }));
      trackEvent("bullet_improved", { tool: tool.slug, index });
      showToast("Bullet improved.");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to improve this bullet right now.",
      );
    } finally {
      setImprovingIndex(null);
    }
  }

  async function handleRewriteExisting() {
    const cleanBullet = existingBullet.trim();

    if (!form.targetRole?.trim()) {
      setError("Enter a target role before rewriting a bullet.");
      return;
    }

    if (!cleanBullet) {
      setError("Paste an existing resume bullet to rewrite.");
      return;
    }

    setError("");
    setIsRewriting(true);

    try {
      const response = await fetch(`/api/tools/${tool.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          action: "rewrite-existing",
          existingBullet: cleanBullet,
        }),
      });

      const data = (await response.json()) as Partial<RewriteResult> & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Unable to rewrite this bullet right now.");
      }

      if (!data.bullet) {
        throw new Error("Unable to rewrite this bullet right now.");
      }

      setRewriteResult({
        original: data.original || cleanBullet,
        bullet: data.bullet,
        score: normalizeScore(data.score, data.bullet),
        changes: Array.isArray(data.changes) && data.changes.length
          ? data.changes
          : ["Improved action verb, clarity, and recruiter readability."],
      });
      trackEvent("bullet_improved", { tool: tool.slug, source: "before_after" });
      showToast("Before vs after rewrite ready.");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to rewrite this bullet right now.",
      );
    } finally {
      setIsRewriting(false);
    }
  }

  async function copyText(text: string, message: string) {
    if (!hasOutput) {
      return;
    }

    await navigator.clipboard.writeText(text);
    trackEvent("copy_click", { tool: tool.slug });
    trackEvent("bullet_copied", { tool: tool.slug });
    setCopied(true);
    showToast(message);
    window.setTimeout(() => setCopied(false), 1800);
  }

  async function copyGeneratorLink(message = "Generator link copied.") {
    await navigator.clipboard.writeText(`${window.location.origin}/tools/${tool.slug}`);
    trackEvent("share_click", { tool: tool.slug, action: "copy_link" });
    showToast(message);
  }

  function downloadText(text: string, fileName: string, message: string) {
    if (!hasOutput) {
      return;
    }

    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = fileName;
    anchor.click();
    trackEvent("download_click", { tool: tool.slug });
    URL.revokeObjectURL(url);
    showToast(message);
  }

  function toggleComparison(index: number) {
    setExpandedComparisons((current) => {
      const nextValue = !current[index];
      if (nextValue) {
        trackEvent("compare_viewed", { tool: tool.slug, index });
      }

      return { ...current, [index]: nextValue };
    });
  }

  function handleExportAction(action: (typeof exportActions)[number]["action"]) {
    if (action === "copy") {
      trackEvent("export_used", { tool: tool.slug, format: "copy" });
      copyText(outputText, "Copied resume output.");
      return;
    }

    if (action === "txt") {
      trackEvent("export_used", { tool: tool.slug, format: "txt" });
      trackEvent("export_txt_clicked", { tool: tool.slug });
      downloadText(outputText, tool.output.downloadFileName, "TXT downloaded.");
      return;
    }

    if (action === "markdown") {
      trackEvent("export_used", { tool: tool.slug, format: "markdown" });
      trackEvent("export_markdown_clicked", { tool: tool.slug });
      downloadText(outputMarkdown, "skillmint-resume-bullets.md", "Markdown downloaded.");
      return;
    }

    if (action === "linkedin") {
      trackEvent("export_used", { tool: tool.slug, format: "linkedin" });
      copyText(formatLinkedInCopy(generated), "Copied for LinkedIn.");
      return;
    }

    trackEvent("export_used", { tool: tool.slug, format: "docs" });
    copyText(formatDocsCopy(generated), "Copied for Google Docs / resume editor.");
  }

  const weakestBulletIndex = generated.scores.length
    ? generated.scores.reduce(
        (lowestIndex, score, index, scores) =>
          score.score < scores[lowestIndex].score ? index : lowestIndex,
        0,
      )
    : 0;
  const cockpitStats = [
    { label: "Output", value: hasOutput ? `${generated.bullets.length} bullets` : "Ready" },
    { label: "Mode", value: form.outputMode || "Recruiter-friendly" },
    { label: "Target", value: form.targetRole || "Role pending" },
  ];

  return (
    <div className="relative space-y-5">
      <div className="command-panel overflow-hidden p-4 text-white sm:p-5">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-mint-300/80 to-transparent" />
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-mint-100">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              AI resume cockpit
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              Build, score, rewrite, and export one focused resume draft.
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base sm:leading-7">
              Your inputs stay in this browser unless you generate. The output workspace turns rough notes into scored bullets, keyword guidance, and clean export formats.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[28rem]">
            {cockpitStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 shadow-line backdrop-blur"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">
                  {stat.label}
                </p>
                <p className="mt-1 truncate text-sm font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(22rem,0.88fr)_minmax(0,1.42fr)] xl:items-start">
      <form
        className="command-panel relative overflow-hidden p-4 text-white sm:p-6 xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto"
        onSubmit={(event) => {
          event.preventDefault();
          handleGenerate(hasOutput ? "regenerate_click" : "generate_click");
        }}
      >
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-mint-300/70 to-transparent" />
        <div className="mb-5 flex items-start gap-4 sm:mb-6">
          <div className="score-orb flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-mint-700 shadow-line">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mint-100">
              Control panel
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Command input</h2>
            <p className="mt-2 leading-7 text-slate-300">
              Add truthful role context, proof, and targeting so the output cockpit has enough signal.
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-100">Try an example</p>
              <span className="hidden text-xs font-semibold text-slate-400 sm:inline">
                Great for first-time users
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {examplePresets.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => applyPreset(preset.values)}
                  className="rounded-full border border-white/10 bg-white/[0.08] px-3 py-2 text-xs font-semibold text-slate-200 transition hover:-translate-y-0.5 hover:border-mint-300/40 hover:bg-white/[0.14] hover:text-white"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="control-card p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                1
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mint-700">Role context</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Who the bullets should sound tailored for.</p>
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {contextFields.map((field) => (
                <label key={field.name} className={getFieldLayout(field)}>
                  <span className="text-sm font-semibold text-ink">{field.label}</span>
                  {renderField(field, form[field.name] || "", updateForm)}
                </label>
              ))}
            </div>
          </div>

          <div className="control-card p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                2
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mint-700">Experience details</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Describe the work, target posting, and the raw material.</p>
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {detailFields.map((field) => (
                <label key={field.name} className={getFieldLayout(field)}>
                  <span className="text-sm font-semibold text-ink">{field.label}</span>
                  {renderField(field, form[field.name] || "", updateForm)}
                  {field.name === "achievement" ? (
                    <span className="mt-2 block text-xs leading-5 text-slate-500">
                      Example: improved onboarding docs, analyzed support tickets, launched a dashboard,
                      or coordinated a campaign.
                    </span>
                  ) : (
                    <span className="mt-2 block text-xs leading-5 text-slate-500">
                      Optional, but useful: paste responsibilities, tools, qualifications, or keywords from the posting.
                    </span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="control-card p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
                3
              </span>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-mint-700">Proof and metrics</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Tools, numbers, and scope help the output feel specific.</p>
              </div>
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {proofFields.map((field) => (
                <label key={field.name} className={getFieldLayout(field)}>
                  <span className="text-sm font-semibold text-ink">{field.label}</span>
                  {renderField(field, form[field.name] || "", updateForm)}
                </label>
              ))}
            </div>
          </div>

          <MotionButton
            type="submit"
            loading={isGenerating}
            disabled={isGenerating}
            icon={Sparkles}
            className="sticky bottom-3 z-10 w-full sm:static"
          >
            {hasOutput ? "Regenerate cockpit output" : "Generate resume bullets"}
          </MotionButton>

          <p className="rounded-2xl border border-mint-300/20 bg-mint-300/10 px-4 py-3 text-sm font-semibold text-mint-100">
            Saved only in your browser. No account required.
          </p>
        </div>
      </form>

      <section className="gloss-panel flex min-h-[34rem] flex-col overflow-hidden shadow-[0_34px_110px_rgba(23,32,51,0.14)]" aria-live="polite">
        <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_0%,rgba(31,201,153,0.26),transparent_32%),radial-gradient(circle_at_95%_15%,rgba(125,211,252,0.18),transparent_34%),linear-gradient(135deg,#080b12,#172033_58%,#0d1f1d)] p-4 text-white sm:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-300/80 to-transparent" />
          <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full border border-mint-200/10" />
          <div className="pointer-events-none absolute -right-8 top-10 h-36 w-36 rounded-full border border-cyan-200/10" />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="relative z-10">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-mint-100 shadow-line backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Resume Intelligence
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-white">{tool.output.title}</h2>
              <p className="mt-2 max-w-2xl leading-7 text-slate-300">{tool.output.description}</p>
            </div>
            <div className="relative z-10 flex flex-wrap gap-2 sm:justify-end">
              {hasOutput ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleGenerate("regenerate_click")}
                    disabled={isGenerating}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.08] px-4 text-sm font-semibold text-white shadow-line backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.14] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                    aria-label="Tailor output to job description"
                    title="Tailor to JD"
                  >
                    <RefreshCw className="h-4 w-4" aria-hidden="true" />
                    Tailor to JD
                  </button>
                  <Link
                    href="/tools/cover-letter-generator"
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-ink shadow-line transition duration-300 hover:-translate-y-0.5 hover:bg-mint-50"
                  >
                    Cover letter
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </>
              ) : null}
            </div>
          </div>

          <div className="relative z-10 mt-5 grid gap-2 sm:grid-cols-5">
            {exportActions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.action}
                  type="button"
                  onClick={() => handleExportAction(item.action)}
                  disabled={!hasOutput}
                  className="group flex min-h-16 items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-2 text-left shadow-line backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-mint-300/40 hover:bg-white/[0.14] disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0 disabled:hover:shadow-line"
                  aria-label={item.label}
                  title={item.description}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.12] text-mint-100 transition group-hover:bg-mint-300/15 group-hover:text-white">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white">{item.label}</span>
                    <span className="hidden truncate text-xs text-slate-300 sm:block">
                      {item.description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-1 flex-col bg-[radial-gradient(circle_at_8%_0%,rgba(31,201,153,0.08),transparent_28%),linear-gradient(180deg,#f8fafc,#ffffff_36%,#f8fafc)] p-4 sm:p-5">
          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            {cockpitStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white/86 px-3 py-3 text-center shadow-line"
              >
                <span className="block text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                  {stat.label}
                </span>
                <span className="mt-1 block truncate text-sm font-semibold text-ink">{stat.value}</span>
              </div>
            ))}
          </div>

          {error ? (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          {isGenerating && !hasOutput ? (
            <div className="space-y-4">
              <LoadingIntelligenceState steps={loadingSteps} />
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-lg border border-slate-200 bg-white p-4 shadow-line"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="h-3 w-24 rounded-full bg-mint-100" />
                    <div className="h-7 w-16 rounded-full bg-slate-100" />
                  </div>
                  <div className="mt-4 h-4 w-11/12 rounded-full bg-slate-100" />
                  <div className="mt-3 h-4 w-2/3 rounded-full bg-slate-100" />
                  <div className="mt-4 grid gap-2 sm:grid-cols-3">
                    <div className="h-12 rounded-lg bg-slate-50" />
                    <div className="h-12 rounded-lg bg-slate-50" />
                    <div className="h-12 rounded-lg bg-slate-50" />
                  </div>
                </div>
              ))}
            </div>
          ) : hasOutput ? (
            <div className="flex flex-1 flex-col gap-5">
              <section className="output-card-pro scan-line p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-mint-700">
                      <BarChart3 className="h-4 w-4" aria-hidden="true" />
                      Resume Strength Summary
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-ink">
                      {generated.summary.overallScore || 0}/100
                    </h3>
                    <p className="mt-2 leading-7 text-slate-600">
                      {generated.summary.nextAction ||
                        "Add truthful metrics and role-specific keywords to keep improving this draft."}
                    </p>
                  </div>
                  <AnimatedScoreBadge
                    score={`${generated.summary.overallScore || 0}/100`}
                    label="Overall"
                    className={`shrink-0 ${getScoreClasses(generated.summary.overallScore)}`}
                  />
                </div>
                <ScoreMeter
                  value={generated.summary.overallScore || 0}
                  label="Overall strength"
                  className="mt-5"
                />

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white/85 p-3.5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <CheckCircle2 className="h-4 w-4 text-mint-700" aria-hidden="true" />
                      Strengths
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {(generated.summary.strengths.length
                        ? generated.summary.strengths
                        : ["Action-oriented language", "Recruiter-friendly structure"]).map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white/85 p-3.5">
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Target className="h-4 w-4 text-amber-600" aria-hidden="true" />
                      Weaknesses
                    </p>
                    <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                      {(generated.summary.weaknesses.length
                        ? generated.summary.weaknesses
                        : ["More metrics or scope could strengthen the proof."]).map((item) => (
                        <li key={item}>- {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold uppercase text-mint-700">Best 5 bullets</h3>
                <div className="mt-3 space-y-3">
                  {generated.bullets.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="output-card-pro scan-line p-3.5"
                      style={{ animationDelay: `${index * 80}ms` }}
                    >
                      <div className="flex gap-3">
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-50 text-xs font-semibold text-mint-700">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_6.5rem] md:items-start">
                            <p className="text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">{item}</p>
                            <div className="shrink-0 md:text-right">
                              <span
                                className={`inline-flex items-center justify-center rounded-full border px-3 py-1 text-xs font-semibold ${getScoreClasses(
                                  generated.scores[index]?.score || 0,
                                )}`}
                              >
                                {generated.scores[index]?.score || 0}/100
                              </span>
                              <div className="mt-2 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100 md:ml-auto">
                                <div
                                  className={`h-full rounded-full ${getScoreBarColor(
                                    generated.scores[index]?.score || 0,
                                  )}`}
                                  style={{ width: `${generated.scores[index]?.score || 0}%` }}
                                />
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 rounded-2xl border border-slate-200 bg-white/76 p-3 text-xs leading-5 text-slate-600 shadow-line sm:text-sm sm:leading-6">
                            <div className="grid gap-2 lg:grid-cols-2">
                              <p>
                                <span className="font-semibold text-ink">Why:</span>{" "}
                                {generated.scores[index]?.reason}
                              </p>
                              <p>
                                <span className="font-semibold text-ink">Improve:</span>{" "}
                                {generated.scores[index]?.suggestion}
                              </p>
                            </div>
                            <div className="mt-3 grid gap-1.5 sm:grid-cols-3">
                              {breakdownLabels.map(([key, label]) => (
                                <div key={key} className="rounded-xl bg-white px-2.5 py-2 shadow-line">
                                  <span className="block text-[11px] font-semibold uppercase text-slate-500">
                                    {label}
                                  </span>
                                  <span className="mt-0.5 block font-semibold text-ink">
                                    {generated.scores[index]?.breakdown?.[key] || 0}/100
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => handleImproveBullet(index)}
                              disabled={improvingIndex !== null || isGenerating}
                              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-mint-100 hover:bg-mint-50 hover:text-mint-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
                              {improvingIndex === index ? "Strengthening..." : "Make it stronger"}
                            </button>

                            {generated.comparisons[index] ? (
                              <button
                                type="button"
                                onClick={() => toggleComparison(index)}
                                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-mint-100 hover:bg-mint-50 hover:text-mint-700"
                              >
                                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                                Compare versions
                              </button>
                            ) : null}
                          </div>

                          {generated.comparisons[index] && expandedComparisons[index] ? (
                            <div className="mt-4 grid gap-3 rounded-2xl border border-mint-100 bg-mint-50/50 p-3 text-sm sm:grid-cols-2">
                              <div>
                                <p className="font-semibold uppercase text-slate-500">Original</p>
                                <p className="mt-2 leading-6 text-slate-700">
                                  {generated.comparisons[index].original}
                                </p>
                              </div>
                              <div>
                                <p className="font-semibold uppercase text-mint-700">Improved</p>
                                <p className="mt-2 leading-6 text-slate-700">
                                  {generated.comparisons[index].improved}
                                </p>
                              </div>
                              <div className="sm:col-span-2">
                                <p className="font-semibold uppercase text-slate-500">What changed</p>
                                <ul className="mt-2 space-y-1 leading-6 text-slate-700">
                                  {generated.comparisons[index].changes.map((change) => (
                                    <li key={change}>- {change}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {generated.keywords.length ? (
                <section>
                  <h3 className="text-sm font-semibold uppercase text-mint-700">Keywords used</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {generated.keywords.map((keyword) => (
                      <KeywordChip key={keyword}>
                        {keyword}
                      </KeywordChip>
                    ))}
                  </div>
                </section>
              ) : null}

              {generated.missingKeywords.length ? (
                <InsightPanel title="Missing keywords from job description">
                  <h3 className="text-sm font-semibold uppercase text-amber-700">
                    Add only if truthful
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    Add these only if they truthfully match your experience, tools, or role scope.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {generated.missingKeywords.map((keyword) => (
                      <KeywordChip key={keyword} className="border-amber-200 bg-white text-amber-700">
                        {keyword}
                      </KeywordChip>
                    ))}
                  </div>
                </InsightPanel>
              ) : null}

              {generated.actionVerbs.length ? (
                <section>
                  <h3 className="text-sm font-semibold uppercase text-mint-700">
                    Stronger action verbs
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {generated.actionVerbs.map((verb) => (
                      <span
                        key={verb}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow-line"
                      >
                        {verb}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {generated.whatToAdd.length ? (
                <section className="output-card-pro p-4">
                  <h3 className="text-sm font-semibold uppercase text-mint-700">
                    What to add if truthful
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                    {generated.whatToAdd.map((item) => (
                      <li key={item}>- {item}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              {generated.tips.length ? (
                <section className="gloss-panel p-4">
                  <div className="gloss-content">
                  <h3 className="text-sm font-semibold uppercase text-slate-700">Improvement tips</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {generated.tips.map((tip) => (
                      <li key={tip}>- {tip}</li>
                    ))}
                  </ul>
                  </div>
                </section>
              ) : null}

              <section className="output-card-pro p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="flex items-center gap-2 text-sm font-semibold uppercase text-mint-700">
                      <Share2 className="h-4 w-4" aria-hidden="true" />
                      Share and keep improving
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Send the generator to a friend or start a fresh draft for another target role.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => copyGeneratorLink("Share link copied.")}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-mint-100 hover:bg-mint-50 hover:text-mint-700"
                    >
                      <Clipboard className="h-4 w-4" aria-hidden="true" />
                      Copy link
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setGenerated(emptyOutput);
                        setExpandedComparisons({});
                        setError("");
                        trackEvent("share_click", { tool: tool.slug, action: "try_another_role" });
                        showToast("Ready for another role.");
                      }}
                      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
                    >
                      Try another role
                    </button>
                  </div>
                </div>
              </section>

              <EmailCapture compact location="tool_output_capture" />

              <section>
                <h3 className="text-sm font-semibold uppercase text-mint-700">Recommended next steps</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {recommendedResources.slice(0, 3).map((recommendation) => (
                    <AffiliateRecommendationCard
                      key={recommendation.title}
                      title={recommendation.title}
                      description={recommendation.description}
                      href={recommendation.href}
                      label="Next step"
                      onClick={() => {
                        trackEvent("affiliate_click", {
                          tool: tool.slug,
                          resource: recommendation.title,
                        });
                        trackEvent("affiliate_card_clicked", {
                          tool: tool.slug,
                          resource: recommendation.title,
                        });
                      }}
                    />
                  ))}
                </div>
              </section>

              <AdSlot label="Resume tool resource placement" />

              {copied ? (
                <p className="text-sm font-semibold text-mint-700">Copied to clipboard.</p>
              ) : null}
            </div>
          ) : (
            <EmptyStatePreview
              title={tool.output.emptyTitle}
              description={tool.output.emptyDescription}
            />
          )}

          {hasOutput ? (
            <div className="mt-6">
              <OutputActionBar
                actions={[
                  {
                    label: "Copy all",
                    icon: Clipboard,
                    onClick: () => handleExportAction("copy"),
                  },
                  {
                    label: "TXT",
                    icon: Download,
                    onClick: () => handleExportAction("txt"),
                  },
                  {
                    label: "Markdown",
                    icon: FileDown,
                    onClick: () => handleExportAction("markdown"),
                  },
                  {
                    label: "Improve",
                    icon: Wand2,
                    onClick: () => handleImproveBullet(weakestBulletIndex),
                    disabled: isGenerating || improvingIndex !== null,
                  },
                  {
                    label: "Tailor to JD",
                    icon: Target,
                    onClick: () => handleGenerate("regenerate_click"),
                    disabled: isGenerating,
                  },
                  {
                    label: "Cover letter",
                    icon: FileText,
                    onClick: () => {
                      window.location.href = "/tools/cover-letter-generator";
                    },
                  },
                ]}
              />
            </div>
          ) : null}

          <section className="mt-6 output-card-pro p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase text-mint-700">Before vs After</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">Rewrite an existing bullet</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  Paste a bullet you already have. SkillMint will score it, rewrite it, and explain
                  what changed.
                </p>
              </div>
              <button
                type="button"
                onClick={handleRewriteExisting}
                disabled={isRewriting}
                className="button-secondary min-h-10 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Wand2 className="h-4 w-4" aria-hidden="true" />
                {isRewriting ? "Rewriting..." : "Rewrite"}
              </button>
            </div>
            <textarea
              value={existingBullet}
              onChange={(event) => setExistingBullet(event.target.value)}
              rows={3}
              placeholder="e.g. Responsible for creating weekly reports for sales team."
              className="premium-input mt-4 min-h-24 resize-none px-4 py-3"
            />
            {rewriteResult ? (
              <div className="mt-4 grid gap-3 rounded-2xl border border-mint-100 bg-mint-50/50 p-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-500">Before</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{rewriteResult.original}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase text-mint-700">
                    After - {rewriteResult.score.score}/100
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">{rewriteResult.bullet}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-xs font-semibold uppercase text-slate-500">What changed</p>
                  <ul className="mt-2 space-y-1 text-sm leading-6 text-slate-700">
                    {rewriteResult.changes.map((change) => (
                      <li key={change}>- {change}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}
          </section>

          {history.length ? (
            <section className="mt-6 output-card-pro p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase text-mint-700">
                    <History className="h-4 w-4" aria-hidden="true" />
                    Recent generations
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Saved locally for quick reuse while you apply.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={clearHistory}
                  className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Clear history
                </button>
              </div>

              <div className="mt-4 space-y-3">
                {history.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => reopenHistoryItem(item)}
                    className="block w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-left transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-mint-50/60"
                  >
                    <span className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-semibold text-ink">{item.role}</span>
                      <span className="text-xs font-semibold uppercase text-slate-500">
                        {new Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        }).format(new Date(item.createdAt))}
                      </span>
                    </span>
                    <span className="mt-2 line-clamp-2 block text-sm leading-6 text-slate-600">
                      {item.output.bullets[0] || "Resume bullets saved in this browser."}
                    </span>
                  </button>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </section>
      </div>

      {toast ? (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-full border border-mint-100 bg-ink px-5 py-3 text-center text-sm font-semibold text-white shadow-soft">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
