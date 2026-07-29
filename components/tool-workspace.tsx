"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Clipboard,
  Download,
  FileDown,
  FileText,
  Linkedin,
  Share2,
  Sparkles,
  Target,
  Wand2,
} from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { AffiliateRecommendationCard } from "@/components/affiliate-recommendation-card";
import { EmailCapture } from "@/components/email-capture";
import { MotionButton } from "@/components/motion-button";
import { OutputActionBar } from "@/components/output-action-bar";
import { ComposerPanel } from "@/components/tool-workspace/composer-panel";
import { ComposerStep } from "@/components/tool-workspace/composer-step";
import { EmptyPreview } from "@/components/tool-workspace/empty-preview";
import { HistoryPanel } from "@/components/tool-workspace/history-panel";
import { KeywordIntelligence } from "@/components/tool-workspace/keyword-intelligence";
import { LoadingSequence } from "@/components/tool-workspace/loading-sequence";
import { OutputStudio } from "@/components/tool-workspace/output-studio";
import { OutputSummary } from "@/components/tool-workspace/output-summary";
import { PresetPicker } from "@/components/tool-workspace/preset-picker";
import { ResultCard } from "@/components/tool-workspace/result-card";
import { RewriteComparison } from "@/components/tool-workspace/rewrite-comparison";
import {
  type BulletScore,
  type BulletScoreBreakdown,
  type GenerationHistoryItem,
  type ResumeOutput,
  type RewriteResult,
} from "@/components/tool-workspace/types";
import { WorkspaceShell } from "@/components/tool-workspace/workspace-shell";
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
      metrics:
        "analyzed 50,000 customer records and reduced weekly reporting time by 6 hours",
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
  "Reading your notes",
  "Finding measurable impact",
  "Matching job keywords",
  "Rewriting for recruiter clarity",
  "Preparing export formats",
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
    output.summary.strengths.length
      ? `Strengths: ${output.summary.strengths.join("; ")}`
      : "",
    output.summary.weaknesses.length
      ? `Weaknesses: ${output.summary.weaknesses.join("; ")}`
      : "",
    output.summary.nextAction
      ? `Next action: ${output.summary.nextAction}`
      : "",
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
    output.summary.strengths.length
      ? `**Strengths:** ${output.summary.strengths.join("; ")}`
      : "",
    output.summary.weaknesses.length
      ? `**Weaknesses:** ${output.summary.weaknesses.join("; ")}`
      : "",
    output.summary.nextAction
      ? `**Next action:** ${output.summary.nextAction}`
      : "",
    "",
    "## Best 5 bullets",
    ...output.bullets.map((bullet, index) => {
      const score = output.scores[index]?.score;
      return `- ${bullet}${score ? ` _Score: ${score}/100_` : ""}`;
    }),
    "",
    "## Keywords used",
    output.keywords.length
      ? output.keywords.map((keyword) => `\`${keyword}\``).join(", ")
      : "None",
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
    ...(output.whatToAdd.length
      ? output.whatToAdd.map((item) => `- ${item}`)
      : ["None"]),
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
    Math.max(
      0,
      Math.min(
        100,
        Math.round(typeof value === "number" ? value : fallbackScore),
      ),
    );

  return {
    clarity: clean(breakdown?.clarity),
    impact: clean(breakdown?.impact),
    specificity: clean(breakdown?.specificity),
    metrics: clean(breakdown?.metrics),
    atsKeywordFit: clean(breakdown?.atsKeywordFit),
    actionVerbStrength: clean(breakdown?.actionVerbStrength),
  };
}

function normalizeScore(
  score: Partial<BulletScore> | undefined,
  bullet: string,
): BulletScore {
  const numericScore =
    typeof score?.score === "number"
      ? score.score
      : bullet.match(/\d/)
        ? 78
        : 68;
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

function normalizeOutput(
  output: Partial<ResumeOutput> | null | undefined,
): ResumeOutput {
  const bullets = Array.isArray(output?.bullets)
    ? output.bullets.filter(Boolean).slice(0, 5)
    : [];
  const scores = bullets.map((bullet, index) =>
    normalizeScore(output?.scores?.[index], bullet),
  );
  const averageScore = scores.length
    ? Math.round(
        scores.reduce((total, score) => total + score.score, 0) / scores.length,
      )
    : 0;

  return {
    bullets,
    keywords: Array.isArray(output?.keywords)
      ? output.keywords.filter(Boolean).slice(0, 10)
      : [],
    tips: Array.isArray(output?.tips)
      ? output.tips.filter(Boolean).slice(0, 3)
      : [],
    scores,
    summary: {
      overallScore: Math.max(
        0,
        Math.min(
          100,
          Math.round(Number(output?.summary?.overallScore) || averageScore),
        ),
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

function getPresetDescription(values: ToolFormValues) {
  const role = values.targetRole || "Target role";
  const tools = values.tools
    ? values.tools.split(",").slice(0, 2).join(", ")
    : "real tools";
  return `${role} - ${tools}`;
}

export function ToolWorkspace({ slug }: ToolWorkspaceProps) {
  const tool = getToolBySlug(slug)!;
  const formStorageKey = `skillmint:${tool.slug}:form`;
  const outputStorageKey = `skillmint:${tool.slug}:output`;
  const historyStorageKey = `skillmint:${tool.slug}:history`;

  const [form, setForm] = useState<ToolFormValues>(() =>
    getInitialToolValues(tool),
  );
  const [generated, setGenerated] = useState<ResumeOutput>(emptyOutput);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [improvingIndex, setImprovingIndex] = useState<number | null>(null);
  const [lastGeneratedAt, setLastGeneratedAt] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState("");
  const [expandedComparisons, setExpandedComparisons] = useState<
    Record<number, boolean>
  >({});
  const [hasTrackedFormStart, setHasTrackedFormStart] = useState(false);
  const [existingBullet, setExistingBullet] = useState("");
  const [rewriteResult, setRewriteResult] = useState<RewriteResult | null>(
    null,
  );
  const [isRewriting, setIsRewriting] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState("");
  const studioRef = useRef<HTMLDivElement>(null);

  const hasOutput = generated.bullets.length > 0;
  const outputText = useMemo(() => formatOutputText(generated), [generated]);
  const outputMarkdown = useMemo(
    () => formatOutputMarkdown(generated),
    [generated],
  );
  const roleFields = tool.inputFields.filter((field) =>
    ["targetRole", "industry", "experienceLevel"].includes(field.name),
  );
  const experienceFields = tool.inputFields.filter(
    (field) => field.name === "achievement",
  );
  const proofFields = tool.inputFields.filter((field) =>
    ["tools", "metrics"].includes(field.name),
  );
  const jobMatchFields = tool.inputFields.filter(
    (field) => field.name === "jobDescription",
  );
  const styleFields = tool.inputFields.filter((field) =>
    ["outputMode", "tone"].includes(field.name),
  );
  const completedSections = [
    Boolean(form.targetRole),
    Boolean(form.achievement),
    Boolean(form.tools || form.metrics),
    Boolean(form.jobDescription),
    Boolean(form.outputMode && form.tone),
  ];
  const completedSectionCount = completedSections.filter(Boolean).length;
  const atsReadiness = generated.scores.length
    ? Math.round(
        generated.scores.reduce(
          (total, score) => total + score.breakdown.atsKeywordFit,
          0,
        ) / generated.scores.length,
      )
    : 0;

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
        const parsedOutput = normalizeOutput(
          JSON.parse(savedOutput) as Partial<ResumeOutput>,
        );
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

  function applyPreset(values: ToolFormValues, label = "Sample") {
    setForm((current) => ({ ...current, ...values }));
    setSelectedPreset(label);
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

  async function requestGeneration(
    action: "generate" | "improve-bullet",
    bullet?: string,
  ) {
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
      throw new Error(
        data.error || "Unable to generate resume bullets right now.",
      );
    }

    return data;
  }

  async function handleGenerate(
    eventName: "generate_click" | "regenerate_click" = hasOutput
      ? "regenerate_click"
      : "generate_click",
  ) {
    const now = Date.now();
    const cooldownRemaining = 10_000 - (now - lastGeneratedAt);

    if (cooldownRemaining > 0) {
      setError(
        `Please wait ${Math.ceil(cooldownRemaining / 1000)} seconds before generating again.`,
      );
      return;
    }

    setError("");
    setCopied(false);
    setIsGenerating(true);
    if (window.matchMedia("(max-width: 1279px)").matches) {
      window.requestAnimationFrame(() => {
        studioRef.current?.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
            .matches
            ? "auto"
            : "smooth",
          block: "start",
        });
      });
    }
    trackEvent(eventName, { tool: tool.slug, outputMode: form.outputMode });
    trackEvent("tool_generate_clicked", {
      tool: tool.slug,
      outputMode: form.outputMode,
    });

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
      const data = await requestGeneration(
        "improve-bullet",
        generated.bullets[index],
      );

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
          ? Math.round(
              nextScores.reduce((total, score) => total + score.score, 0) /
                nextScores.length,
            )
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
            nextAction:
              "Review the strengthened bullet and add any truthful missing keywords that fit your experience.",
          },
          comparisons: {
            ...current.comparisons,
            [index]: {
              original: current.bullets[index],
              improved: data.bullet || current.bullets[index],
              changes: data.changes?.length
                ? data.changes
                : [
                    "Improved clarity, action verb strength, and recruiter readability.",
                  ],
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

      const data = (await response.json()) as Partial<RewriteResult> & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to rewrite this bullet right now.",
        );
      }

      if (!data.bullet) {
        throw new Error("Unable to rewrite this bullet right now.");
      }

      setRewriteResult({
        original: data.original || cleanBullet,
        bullet: data.bullet,
        score: normalizeScore(data.score, data.bullet),
        changes:
          Array.isArray(data.changes) && data.changes.length
            ? data.changes
            : ["Improved action verb, clarity, and recruiter readability."],
      });
      trackEvent("bullet_improved", {
        tool: tool.slug,
        source: "before_after",
      });
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
    await navigator.clipboard.writeText(
      `${window.location.origin}/tools/${tool.slug}`,
    );
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

  function handleExportAction(
    action: (typeof exportActions)[number]["action"],
  ) {
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
      downloadText(
        outputMarkdown,
        "skillmint-resume-bullets.md",
        "Markdown downloaded.",
      );
      return;
    }

    if (action === "linkedin") {
      trackEvent("export_used", { tool: tool.slug, format: "linkedin" });
      copyText(formatLinkedInCopy(generated), "Copied for LinkedIn.");
      return;
    }

    trackEvent("export_used", { tool: tool.slug, format: "docs" });
    copyText(
      formatDocsCopy(generated),
      "Copied for Google Docs / resume editor.",
    );
  }

  const weakestBulletIndex = generated.scores.length
    ? generated.scores.reduce(
        (lowestIndex, score, index, scores) =>
          score.score < scores[lowestIndex].score ? index : lowestIndex,
        0,
      )
    : 0;
  const cockpitStats = [
    {
      label: "Output",
      value: hasOutput ? `${generated.bullets.length} bullets` : "Ready",
    },
    { label: "Mode", value: form.outputMode || "Recruiter-friendly" },
    { label: "Target", value: form.targetRole || "Role pending" },
  ];

  return (
    <div className="relative z-10">
      <WorkspaceShell
        title="Your resume workspace"
        description="Compose on the left. Review scored bullets, keyword intelligence, rewrites, and exports on the right."
        stats={cockpitStats}
        composer={
          <ComposerPanel
            onSubmit={(event) => {
              event.preventDefault();
              handleGenerate(hasOutput ? "regenerate_click" : "generate_click");
            }}
          >
            <PresetPicker
              presets={examplePresets}
              selectedLabel={selectedPreset}
              onApply={applyPreset}
              getDescription={getPresetDescription}
            />

            <div className="composer-progress">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-semibold text-slate-700">
                  {completedSectionCount} of 5 sections complete
                </p>
                <span className="text-[11px] font-semibold text-emerald-700">
                  {Math.round((completedSectionCount / 5) * 100)}%
                </span>
              </div>
              <div className="composer-progress-track">
                <div
                  className="composer-progress-fill"
                  style={{ width: `${(completedSectionCount / 5) * 100}%` }}
                />
              </div>
            </div>

            <ComposerStep
              step={1}
              title="Role context"
              description="Who these bullets should sound tailored for."
              complete={completedSections[0]}
            >
              {roleFields.map((field) => (
                <label key={field.name} className={getFieldLayout(field)}>
                  <span className="text-sm font-semibold text-ink">
                    {field.label}
                  </span>
                  {renderField(field, form[field.name] || "", updateForm)}
                </label>
              ))}
            </ComposerStep>

            <ComposerStep
              step={2}
              title="Experience details"
              description="Describe the work, ownership, and outcome in plain language."
              complete={completedSections[1]}
            >
              {experienceFields.map((field) => (
                <label key={field.name} className={getFieldLayout(field)}>
                  <span className="text-sm font-semibold text-ink">
                    {field.label}
                  </span>
                  {renderField(field, form[field.name] || "", updateForm)}
                  <span className="mt-2 block text-xs leading-5 text-slate-500">
                    Example: improved onboarding, analyzed support tickets,
                    launched a dashboard, or coordinated a campaign.
                  </span>
                </label>
              ))}
            </ComposerStep>

            <ComposerStep
              step={3}
              title="Proof and metrics"
              description="Tools, numbers, and scope make the output specific."
              complete={completedSections[2]}
              optional
            >
              {proofFields.map((field) => (
                <label key={field.name} className={getFieldLayout(field)}>
                  <span className="text-sm font-semibold text-ink">
                    {field.label}
                  </span>
                  {renderField(field, form[field.name] || "", updateForm)}
                </label>
              ))}
            </ComposerStep>

            <ComposerStep
              step={4}
              title="Job match"
              description="Paste the target posting to surface truthful keyword gaps."
              complete={completedSections[3]}
              optional
            >
              {jobMatchFields.map((field) => (
                <label key={field.name} className={getFieldLayout(field)}>
                  <span className="text-sm font-semibold text-ink">
                    {field.label}
                  </span>
                  {renderField(field, form[field.name] || "", updateForm)}
                  <span className="mt-2 block text-xs leading-5 text-slate-500">
                    Optional. Add responsibilities, tools, and qualifications
                    from the posting.
                  </span>
                </label>
              ))}
            </ComposerStep>

            <ComposerStep
              step={5}
              title="Style and output"
              description="Choose the level of optimization and writing tone."
              complete={completedSections[4]}
            >
              {styleFields.map((field) => (
                <label key={field.name} className={getFieldLayout(field)}>
                  <span className="text-sm font-semibold text-ink">
                    {field.label}
                  </span>
                  {renderField(field, form[field.name] || "", updateForm)}
                </label>
              ))}
            </ComposerStep>

            <div className="composer-submit-dock">
              <div className="hidden min-w-0 sm:block">
                <p className="text-xs font-semibold text-slate-900">
                  {completedSectionCount >= 2
                    ? "Ready to generate"
                    : "Add role and experience"}
                </p>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {completedSectionCount}/5 sections prepared
                </p>
              </div>
              <MotionButton
                type="submit"
                loading={isGenerating}
                disabled={isGenerating}
                icon={Sparkles}
                className="min-w-0 flex-1 sm:flex-none"
              >
                {hasOutput ? "Regenerate bullets" : "Generate bullets"}
              </MotionButton>
            </div>
          </ComposerPanel>
        }
        studio={
          <div ref={studioRef} className="scroll-mt-20">
            <OutputStudio
              title={tool.output.title}
              description={tool.output.description}
              hasOutput={hasOutput}
              isGenerating={isGenerating}
              onRegenerate={() => handleGenerate("regenerate_click")}
              actions={
                <>
                  {exportActions.map((item) => {
                    const Icon = item.icon;

                    return (
                      <button
                        key={item.action}
                        type="button"
                        onClick={() => handleExportAction(item.action)}
                        disabled={!hasOutput}
                        className="output-export-action group"
                        aria-label={item.label}
                        title={item.description}
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-mint-700 transition group-hover:bg-white">
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-ink">
                            {item.label}
                          </span>
                          <span className="hidden truncate text-[11px] text-slate-500 2xl:block">
                            {item.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </>
              }
            >
              {error ? (
                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              ) : null}

              {isGenerating && !hasOutput ? (
                <LoadingSequence steps={loadingSteps} />
              ) : hasOutput ? (
                <div className="flex flex-1 flex-col gap-5">
                  <OutputSummary
                    summary={generated.summary}
                    bulletCount={generated.bullets.length}
                    atsReadiness={atsReadiness}
                    missingKeywordCount={generated.missingKeywords.length}
                  />

                  <section>
                    <div className="flex items-end justify-between gap-4">
                      <div>
                        <p className="workspace-label">Best five bullets</p>
                        <h3 className="mt-1 text-xl font-semibold text-slate-950">
                          Recruiter-ready output
                        </h3>
                      </div>
                      <span className="hidden text-xs font-medium text-slate-500 sm:block">
                        Improve any card independently
                      </span>
                    </div>
                    <div className="mt-3 space-y-3">
                      {generated.bullets.map((item, index) => (
                        <ResultCard
                          key={`${item}-${index}`}
                          index={index}
                          bullet={item}
                          score={generated.scores[index]}
                          comparison={generated.comparisons[index]}
                          comparisonExpanded={Boolean(
                            expandedComparisons[index],
                          )}
                          improving={improvingIndex === index}
                          copyConfirmed={copied}
                          onCopy={() => copyText(item, "Bullet copied.")}
                          onImprove={() => handleImproveBullet(index)}
                          onToggleComparison={() => toggleComparison(index)}
                        />
                      ))}
                    </div>
                  </section>

                  <KeywordIntelligence
                    included={generated.keywords}
                    missing={generated.missingKeywords}
                    actionVerbs={generated.actionVerbs}
                  />

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
                        <h3 className="text-sm font-semibold uppercase text-slate-700">
                          Improvement tips
                        </h3>
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
                          Send the generator to a friend or start a fresh draft
                          for another target role.
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                          type="button"
                          onClick={() =>
                            copyGeneratorLink("Share link copied.")
                          }
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
                            trackEvent("share_click", {
                              tool: tool.slug,
                              action: "try_another_role",
                            });
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
                    <h3 className="text-sm font-semibold uppercase text-mint-700">
                      Recommended next steps
                    </h3>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      {recommendedResources
                        .slice(0, 3)
                        .map((recommendation) => (
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
                    <p className="text-sm font-semibold text-mint-700">
                      Copied to clipboard.
                    </p>
                  ) : null}
                </div>
              ) : (
                <EmptyPreview
                  title={tool.output.emptyTitle}
                  description={tool.output.emptyDescription}
                  onTrySample={() =>
                    applyPreset(
                      examplePresets[0].values,
                      examplePresets[0].label,
                    )
                  }
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
                          window.location.href =
                            "/tools/cover-letter-generator";
                        },
                      },
                    ]}
                  />
                </div>
              ) : null}

              <section className="mt-6 output-card-pro p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase text-mint-700">
                      Before vs After
                    </p>
                    <h3 className="mt-1 text-xl font-semibold text-ink">
                      Rewrite an existing bullet
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Paste a bullet you already have. SkillMint will score it,
                      rewrite it, and explain what changed.
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
                  <RewriteComparison
                    comparison={{
                      original: rewriteResult.original,
                      improved: rewriteResult.bullet,
                      changes: rewriteResult.changes,
                    }}
                  />
                ) : null}
              </section>

              <HistoryPanel
                items={history}
                onOpen={reopenHistoryItem}
                onClear={clearHistory}
              />
            </OutputStudio>
          </div>
        }
      />

      {toast ? (
        <div className="success-pulse fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-full border border-mint-100 bg-ink px-5 py-3 text-center text-sm font-semibold text-white shadow-soft">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
