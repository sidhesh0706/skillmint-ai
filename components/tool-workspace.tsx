"use client";

import { useMemo, useState } from "react";
import { Clipboard, Download, FileText, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { AffiliateRecommendationCard } from "@/components/affiliate-recommendation-card";
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
};

const emptyOutput: ResumeOutput = {
  bullets: [],
  keywords: [],
  tips: [],
};

const recommendations = [
  {
    title: "Resume templates",
    description: "Use a clean structure that makes your strongest bullets easy to scan.",
    href: "#resume-templates",
  },
  {
    title: "LinkedIn optimization guide",
    description: "Turn your new bullets into a sharper profile summary and headline.",
    href: "#linkedin-optimization-guide",
  },
  {
    title: "Interview prep checklist",
    description: "Convert resume wins into concise stories for behavioral interviews.",
    href: "#interview-prep-checklist",
  },
];

function renderField(
  field: ToolField,
  value: string,
  onChange: (name: string, value: string) => void,
) {
  const commonClasses =
    "mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white/90 px-4 py-3 text-ink outline-none transition duration-300 placeholder:text-slate-400 hover:border-slate-400 focus:border-mint-600 focus:ring-4 focus:ring-mint-100";

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
    "Best 5 bullets",
    ...output.bullets.map((bullet) => `- ${bullet}`),
    "",
    "Keywords used",
    output.keywords.join(", "),
    "",
    "Improvement tips",
    ...output.tips.map((tip) => `- ${tip}`),
  ].join("\n");
}

function getFieldLayout(field: ToolField) {
  if (field.layout === "half") {
    return "block";
  }

  return "block sm:col-span-2";
}

export function ToolWorkspace({ slug }: ToolWorkspaceProps) {
  const tool = getToolBySlug(slug)!;

  const [form, setForm] = useState<ToolFormValues>(() => getInitialToolValues(tool));
  const [generated, setGenerated] = useState<ResumeOutput>(emptyOutput);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [improvingIndex, setImprovingIndex] = useState<number | null>(null);
  const [lastGeneratedAt, setLastGeneratedAt] = useState(0);

  const hasOutput = generated.bullets.length > 0;
  const outputText = useMemo(() => formatOutputText(generated), [generated]);
  const contextChips = [
    form.outputMode,
    form.tone,
    form.experienceLevel,
  ].filter(Boolean);

  function updateForm(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
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

    try {
      const data = await requestGeneration("generate");

      if (!data?.bullets?.length) {
        throw new Error("Unable to generate resume bullets right now.");
      }

      setGenerated({
        bullets: data.bullets,
        keywords: data.keywords || [],
        tips: data.tips || [],
      });
      setLastGeneratedAt(Date.now());
    } catch (caughtError) {
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

      setGenerated((current) => ({
        ...current,
        bullets: current.bullets.map((bullet, bulletIndex) =>
          bulletIndex === index ? data.bullet || bullet : bullet,
        ),
      }));
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

  async function handleCopy() {
    if (!hasOutput) {
      return;
    }

    await navigator.clipboard.writeText(outputText);
    trackEvent("copy_click", { tool: tool.slug });
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function handleDownload() {
    if (!hasOutput) {
      return;
    }

    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = tool.output.downloadFileName;
    anchor.click();
    trackEvent("download_click", { tool: tool.slug });
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
      <form
        className="card-surface p-4 sm:p-6 lg:sticky lg:top-24"
        onSubmit={(event) => {
          event.preventDefault();
          handleGenerate(hasOutput ? "regenerate_click" : "generate_click");
        }}
      >
        <div className="mb-6 flex items-start gap-4 sm:mb-7">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mint-50 text-mint-700 shadow-line">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">Build your draft</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Add context so SkillMint can generate specific, recruiter-ready bullets.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {tool.inputFields.map((field) => (
            <label key={field.name} className={getFieldLayout(field)}>
              <span className="text-sm font-semibold text-ink">{field.label}</span>
              {renderField(field, form[field.name] || "", updateForm)}
            </label>
          ))}

          <button
            type="submit"
            disabled={isGenerating}
            className="button-primary w-full disabled:cursor-not-allowed disabled:opacity-70 sm:col-span-2"
          >
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            {isGenerating ? "Generating..." : hasOutput ? "Regenerate" : "Generate"}
          </button>
        </div>
      </form>

      <section className="card-surface flex min-h-[34rem] flex-col overflow-hidden" aria-live="polite">
        <div className="border-b border-slate-200/80 bg-[linear-gradient(120deg,#ffffff,#effdf8_58%,#ffffff)] p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-mint-100 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase text-mint-700 shadow-line">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                AI output
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">{tool.output.title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{tool.output.description}</p>
            </div>
            <div className="flex gap-2">
              {hasOutput ? (
                <button
                  type="button"
                  onClick={() => handleGenerate("regenerate_click")}
                  disabled={isGenerating}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-mint-50 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                  aria-label="Regenerate output"
                  title="Regenerate"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                </button>
              ) : null}
              <button
                type="button"
                onClick={handleCopy}
                disabled={!hasOutput}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-mint-50 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                aria-label="Copy output to clipboard"
                title="Copy"
              >
                <Clipboard className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!hasOutput}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-mint-50 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                aria-label="Download output as TXT"
                title="Download TXT"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-6">
          <div className="mb-5 grid gap-3 sm:grid-cols-3">
            {contextChips.slice(0, 3).map((label) => (
              <div
                key={label}
                className="rounded-lg border border-slate-200 bg-white/80 px-3 py-2 text-center text-sm font-semibold text-slate-700 shadow-line"
              >
                {label}
              </div>
            ))}
          </div>

          {error ? (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          ) : null}

          {hasOutput ? (
            <div className="flex flex-1 flex-col gap-6">
              <section>
                <h3 className="text-sm font-semibold uppercase text-mint-700">Best 5 bullets</h3>
                <div className="mt-3 space-y-3">
                  {generated.bullets.map((item, index) => (
                    <div key={`${item}-${index}`} className="rounded-lg border border-slate-200 bg-white p-4 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100">
                      <div className="flex gap-3">
                        <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-50 text-xs font-semibold text-mint-700">
                          {index + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="leading-7 text-slate-700">{item}</p>
                          <button
                            type="button"
                            onClick={() => handleImproveBullet(index)}
                            disabled={improvingIndex !== null || isGenerating}
                            className="mt-3 inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-mint-100 hover:bg-mint-50 hover:text-mint-700 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
                            {improvingIndex === index ? "Improving..." : "Improve"}
                          </button>
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
                      <span
                        key={keyword}
                        className="rounded-full border border-mint-100 bg-mint-50 px-3 py-1.5 text-sm font-semibold text-mint-700"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {generated.tips.length ? (
                <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <h3 className="text-sm font-semibold uppercase text-slate-700">Improvement tips</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {generated.tips.map((tip) => (
                      <li key={tip}>- {tip}</li>
                    ))}
                  </ul>
                </section>
              ) : null}

              <section>
                <h3 className="text-sm font-semibold uppercase text-mint-700">Recommended next steps</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {recommendations.map((recommendation) => (
                    <AffiliateRecommendationCard
                      key={recommendation.title}
                      title={recommendation.title}
                      description={recommendation.description}
                      href={recommendation.href}
                      label="Next step"
                      onClick={() =>
                        trackEvent("affiliate_click", {
                          tool: tool.slug,
                          resource: recommendation.title,
                        })
                      }
                    />
                  ))}
                </div>
              </section>

              {copied ? (
                <p className="text-sm font-semibold text-mint-700">Copied to clipboard.</p>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-[linear-gradient(135deg,#ffffff,#effdf8_48%,#f8fafc)] p-5 text-center sm:p-6">
              <div className="max-w-md">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-mint-700 shadow-soft">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-lg font-semibold text-ink">{tool.output.emptyTitle}</p>
                <p className="mt-2 leading-7 text-slate-600">{tool.output.emptyDescription}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
