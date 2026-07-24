"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clipboard,
  Download,
  FileDown,
  Sparkles,
} from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { AffiliateRecommendationCard } from "@/components/affiliate-recommendation-card";
import { AnimatedScoreBadge } from "@/components/animated-score-badge";
import { EmailCapture } from "@/components/email-capture";
import { EmptyStatePreview } from "@/components/empty-state-preview";
import { KeywordChip } from "@/components/keyword-chip";
import { LoadingIntelligenceState } from "@/components/loading-intelligence-state";
import { MotionButton } from "@/components/motion-button";
import { ScoreMeter } from "@/components/score-meter";
import { ComposerPanel } from "@/components/tool-workspace/composer-panel";
import { ComposerStep } from "@/components/tool-workspace/composer-step";
import { OutputStudio } from "@/components/tool-workspace/output-studio";
import { WorkspaceShell } from "@/components/tool-workspace/workspace-shell";
import { recommendedResources } from "@/config/monetization";
import {
  getInitialToolValues,
  getToolBySlug,
  type ToolConfig,
  type ToolField,
  type ToolFormValues,
} from "@/data/tool-config";
import { trackEvent } from "@/lib/analytics";

type GenericToolWorkspaceProps = {
  slug: string;
};

type GenericToolResult = {
  title: string;
  summary: string;
  score?: number;
  scores?: Array<{ label: string; score: number }>;
  sections: Array<{ title: string; items?: string[]; text?: string }>;
  warnings?: string[];
};

const completedEvents: Record<string, Parameters<typeof trackEvent>[0]> = {
  "resume-roast": "resume_roast_completed",
  "job-description-match": "jd_match_completed",
  "project-to-resume": "project_to_resume_completed",
};

function renderField(
  field: ToolField,
  value: string,
  onChange: (name: string, value: string) => void,
) {
  const baseClass = "premium-input";

  if (field.type === "textarea") {
    return (
      <textarea
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        placeholder={field.placeholder}
        rows={field.rows || 5}
        className={`${baseClass} min-h-28 resize-none`}
      />
    );
  }

  if (field.type === "select") {
    return (
      <select
        value={value}
        onChange={(event) => onChange(field.name, event.target.value)}
        className={`${baseClass} min-h-11`}
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
      className={`${baseClass} min-h-11`}
    />
  );
}

function formatResultText(result: GenericToolResult) {
  return [
    result.title,
    result.score ? `Overall score: ${result.score}/100` : "",
    result.summary,
    "",
    ...(result.scores?.length
      ? [
          "Scores",
          ...result.scores.map(
            (score) => `- ${score.label}: ${score.score}/100`,
          ),
          "",
        ]
      : []),
    ...result.sections.flatMap((section) => [
      section.title,
      section.text || "",
      ...(section.items || []).map((item) => `- ${item}`),
      "",
    ]),
    ...(result.warnings?.length
      ? [
          "Truthfulness checks",
          ...result.warnings.map((warning) => `- ${warning}`),
        ]
      : []),
  ]
    .filter((line, index, lines) => line || lines[index - 1] !== "")
    .join("\n");
}

function downloadText(fileName: string, text: string, type = "text/plain") {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getScoreColor(score: number) {
  if (score >= 85) {
    return "text-mint-700 bg-mint-50 border-mint-100";
  }

  if (score >= 70) {
    return "text-amber-700 bg-amber-50 border-amber-200";
  }

  return "text-red-700 bg-red-50 border-red-200";
}

export function GenericToolWorkspace({ slug }: GenericToolWorkspaceProps) {
  const tool = getToolBySlug(slug) as ToolConfig;
  const [form, setForm] = useState<ToolFormValues>(() =>
    getInitialToolValues(tool),
  );
  const [result, setResult] = useState<GenericToolResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const outputText = useMemo(
    () => (result ? formatResultText(result) : ""),
    [result],
  );

  function updateForm(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2200);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsLoading(true);
    trackEvent("tool_started", { tool: tool.slug });

    try {
      const response = await fetch(`/api/tools/${tool.slug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as {
        error?: string;
      } & GenericToolResult;

      if (!response.ok) {
        throw new Error(
          payload.error || "Something went wrong. Try again in a moment.",
        );
      }

      const nextResult: GenericToolResult = {
        title: payload.title || tool.output.title,
        summary: payload.summary || tool.output.description,
        score: payload.score,
        scores: Array.isArray(payload.scores) ? payload.scores : [],
        sections: Array.isArray(payload.sections) ? payload.sections : [],
        warnings: Array.isArray(payload.warnings) ? payload.warnings : [],
      };

      setResult(nextResult);
      trackEvent("tool_completed", { tool: tool.slug });
      const specificEvent = completedEvents[tool.slug];
      if (specificEvent) {
        trackEvent(specificEvent, { tool: tool.slug });
      }
      showToast("Output ready. Review before using it.");
    } catch (caughtError) {
      const message =
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong. Try again.";
      setError(message);
      trackEvent("tool_generate_error", { tool: tool.slug });
    } finally {
      setIsLoading(false);
    }
  }

  async function copyOutput() {
    if (!outputText) {
      return;
    }

    await navigator.clipboard.writeText(outputText);
    trackEvent("copy_clicked", { tool: tool.slug });
    showToast("Copied.");
  }

  function exportOutput(format: "txt" | "markdown") {
    if (!outputText) {
      return;
    }

    const markdown = format === "markdown";
    const text = markdown
      ? outputText.replace(/^(.+)$/gm, (line) =>
          line.startsWith("- ") || line.endsWith("/100") || !line
            ? line
            : `## ${line}`,
        )
      : outputText;
    downloadText(
      markdown
        ? tool.output.downloadFileName.replace(".txt", ".md")
        : tool.output.downloadFileName,
      text,
      markdown ? "text/markdown" : "text/plain",
    );
    trackEvent("export_clicked", { tool: tool.slug, format });
    showToast(markdown ? "Markdown downloaded." : "TXT downloaded.");
  }

  return (
    <div className="relative z-10">
      <WorkspaceShell
        title={`${tool.name} workspace`}
        description="Build the input on the left, then review the intelligence report and export the useful parts on the right."
        stats={[
          {
            label: "Output",
            value: result ? "Report ready" : "Ready",
          },
          {
            label: "Score",
            value:
              typeof result?.score === "number"
                ? `${result.score}/100`
                : "Pending",
          },
          { label: "Privacy", value: "No signup" },
        ]}
        composer={
          <ComposerPanel onSubmit={handleSubmit}>
            <ComposerStep
              step={1}
              title="Add your context"
              description="Use specific, truthful details for a stronger report."
            >
              {tool.inputFields.map((field) => (
                <label
                  key={field.name}
                  className={
                    field.layout === "half"
                      ? "block"
                      : "block sm:col-span-2"
                  }
                >
                  <span className="text-sm font-semibold text-slate-950">
                    {field.label}
                  </span>
                  {renderField(field, form[field.name] || "", updateForm)}
                </label>
              ))}
            </ComposerStep>

            {error ? (
              <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : null}

            <MotionButton
              type="submit"
              loading={isLoading}
              disabled={isLoading}
              icon={Sparkles}
              className="w-full"
            >
              {isLoading ? "Building report" : `Run ${tool.name}`}
            </MotionButton>
          </ComposerPanel>
        }
        studio={
          <OutputStudio
            title={tool.output.title}
            description={tool.output.description}
            hasOutput={Boolean(result)}
            isGenerating={isLoading}
            onRegenerate={() => {
              const syntheticEvent = {
                preventDefault() {},
              } as FormEvent<HTMLFormElement>;
              void handleSubmit(syntheticEvent);
            }}
            actions={
              result ? (
                <>
                <button
                  type="button"
                  onClick={copyOutput}
                  className="output-export-action group"
                >
                  <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />
                  Copy
                </button>
                <button
                  type="button"
                  onClick={() => exportOutput("txt")}
                  className="output-export-action group"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  TXT
                </button>
                <button
                  type="button"
                  onClick={() => exportOutput("markdown")}
                  className="output-export-action group"
                >
                  <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                  Markdown
                </button>
                </>
              ) : (
                <div className="col-span-full rounded-2xl border border-dashed border-slate-200 px-4 py-3 text-center text-xs font-semibold text-slate-400">
                  Export actions appear after generation
                </div>
              )
            }
          >
          {isLoading ? (
            <div className="space-y-4">
              <LoadingIntelligenceState />
              {[0, 1, 2].map((item) => (
                <div
                  key={item}
                  className="animate-pulse rounded-2xl border border-slate-200 bg-white p-4 shadow-line"
                >
                  <div className="h-3 w-24 rounded-full bg-mint-100" />
                  <div className="mt-4 h-4 w-3/4 rounded-full bg-slate-100" />
                  <div className="mt-3 h-4 w-5/6 rounded-full bg-slate-100" />
                </div>
              ))}
            </div>
          ) : result ? (
            <>
              <div className="output-card-pro p-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-ink">
                      {result.title}
                    </h3>
                    <p className="mt-2 leading-7 text-slate-600">
                      {result.summary}
                    </p>
                  </div>
                  {typeof result.score === "number" ? (
                    <AnimatedScoreBadge
                      score={`${result.score}/100`}
                      label="Score"
                      className={`px-4 py-3 text-sm ${getScoreColor(result.score)}`}
                    />
                  ) : null}
                </div>
                {typeof result.score === "number" ? (
                  <ScoreMeter
                    value={result.score}
                    label="Overall score"
                    className="mt-5"
                  />
                ) : null}
              </div>

              {result.scores?.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.scores.map((score) => (
                    <div key={score.label} className="output-card-pro p-3">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-ink">
                          {score.label}
                        </p>
                        <span
                          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getScoreColor(score.score)}`}
                        >
                          {score.score}/100
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-mint-500"
                          style={{
                            width: `${Math.max(0, Math.min(100, score.score))}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {result.sections.map((section) => (
                <article key={section.title} className="output-card-pro p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase text-mint-700">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    {section.title}
                  </h3>
                  {section.text ? (
                    <p className="mt-3 leading-7 text-slate-700">
                      {section.text}
                    </p>
                  ) : null}
                  {section.items?.length ? (
                    <div className="mt-3 grid gap-2">
                      {section.items.map((item) => (
                        <div
                          key={item}
                          className="rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700"
                        >
                          {section.title.toLowerCase().includes("keyword") ? (
                            <KeywordChip>{item}</KeywordChip>
                          ) : (
                            item
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}

              {result.warnings?.length ? (
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase text-amber-700">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    Truthfulness checks
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-amber-800">
                    {result.warnings.map((warning) => (
                      <li key={warning}>- {warning}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <EmailCapture compact location={`${tool.slug}_output_capture`} />

              <div>
                <h3 className="text-sm font-semibold uppercase text-mint-700">
                  Recommended next steps
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                  {recommendedResources.slice(0, 3).map((recommendation) => (
                    <AffiliateRecommendationCard
                      key={recommendation.title}
                      title={recommendation.title}
                      description={recommendation.description}
                      href={recommendation.href}
                      whyThisHelps={recommendation.whyThisHelps}
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
              </div>

              <AdSlot label={`${tool.name} resource placement`} />
            </>
          ) : (
            <EmptyStatePreview
              title={tool.output.emptyTitle}
              description={tool.output.emptyDescription}
            />
          )}
          </OutputStudio>
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
