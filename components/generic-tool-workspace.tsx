"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  AlertTriangle,
  BarChart3,
  CheckCircle2,
  Clipboard,
  Download,
  FileDown,
  Loader2,
  Sparkles,
} from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { AffiliateRecommendationCard } from "@/components/affiliate-recommendation-card";
import { EmailCapture } from "@/components/email-capture";
import { recommendedResources } from "@/config/monetization";
import {
  getInitialToolValues,
  type ToolConfig,
  type ToolField,
  type ToolFormValues,
} from "@/data/tool-config";
import { trackEvent } from "@/lib/analytics";

type GenericToolWorkspaceProps = {
  tool: ToolConfig;
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
  const baseClass =
    "mt-2 w-full rounded-lg border border-slate-300 bg-white/95 px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-mint-600 focus:ring-4 focus:ring-mint-100";

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
      ? ["Scores", ...result.scores.map((score) => `- ${score.label}: ${score.score}/100`), ""]
      : []),
    ...result.sections.flatMap((section) => [
      section.title,
      section.text || "",
      ...(section.items || []).map((item) => `- ${item}`),
      "",
    ]),
    ...(result.warnings?.length
      ? ["Truthfulness checks", ...result.warnings.map((warning) => `- ${warning}`)]
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

export function GenericToolWorkspace({ tool }: GenericToolWorkspaceProps) {
  const [form, setForm] = useState<ToolFormValues>(() => getInitialToolValues(tool));
  const [result, setResult] = useState<GenericToolResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const outputText = useMemo(() => (result ? formatResultText(result) : ""), [result]);

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

      const payload = (await response.json()) as { error?: string } & GenericToolResult;

      if (!response.ok) {
        throw new Error(payload.error || "Something went wrong. Try again in a moment.");
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
        caughtError instanceof Error ? caughtError.message : "Something went wrong. Try again.";
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
          line.startsWith("- ") || line.endsWith("/100") || !line ? line : `## ${line}`,
        )
      : outputText;
    downloadText(
      markdown ? tool.output.downloadFileName.replace(".txt", ".md") : tool.output.downloadFileName,
      text,
      markdown ? "text/markdown" : "text/plain",
    );
    trackEvent("export_clicked", { tool: tool.slug, format });
    showToast(markdown ? "Markdown downloaded." : "TXT downloaded.");
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
      <form
        onSubmit={handleSubmit}
        className="card-surface p-4 sm:p-5 lg:sticky lg:top-24"
      >
        <div className="rounded-lg border border-mint-100 bg-mint-50/70 p-4">
          <p className="text-sm font-semibold uppercase text-mint-700">AI workspace</p>
          <h2 className="mt-1 text-2xl font-semibold text-ink">Build the input</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add honest context. SkillMint will improve clarity and positioning without encouraging
            overclaiming.
          </p>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {tool.inputFields.map((field) => (
            <label
              key={field.name}
              className={field.layout === "half" ? "block" : "block sm:col-span-2"}
            >
              <span className="text-sm font-semibold text-ink">{field.label}</span>
              {renderField(field, form[field.name] || "", updateForm)}
            </label>
          ))}
        </div>

        {error ? (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={isLoading}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#142033,#0f766e)] px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          )}
          {isLoading ? "Generating..." : `Run ${tool.name}`}
        </button>

        <p className="mt-3 rounded-lg border border-mint-100 bg-white px-3 py-2 text-xs font-semibold text-mint-700">
          Privacy-first: no signup required. Review every generated claim before using it.
        </p>
      </form>

      <section className="card-surface min-h-[34rem] overflow-hidden">
        <div className="sticky top-16 z-10 border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur sm:px-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-mint-700">Output workspace</p>
              <h2 className="text-xl font-semibold text-ink">{tool.output.title}</h2>
            </div>
            {result ? (
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={copyOutput} className="button-secondary min-h-10 px-3 py-2 text-xs">
                  <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />
                  Copy
                </button>
                <button
                  type="button"
                  onClick={() => exportOutput("txt")}
                  className="button-secondary min-h-10 px-3 py-2 text-xs"
                >
                  <Download className="h-3.5 w-3.5" aria-hidden="true" />
                  TXT
                </button>
                <button
                  type="button"
                  onClick={() => exportOutput("markdown")}
                  className="button-secondary min-h-10 px-3 py-2 text-xs"
                >
                  <FileDown className="h-3.5 w-3.5" aria-hidden="true" />
                  Markdown
                </button>
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-5 p-4 sm:p-5">
          {isLoading ? (
            <div className="space-y-4">
              {[0, 1, 2].map((item) => (
                <div key={item} className="animate-pulse rounded-lg border border-slate-200 bg-white p-4 shadow-line">
                  <div className="h-3 w-24 rounded-full bg-mint-100" />
                  <div className="mt-4 h-4 w-3/4 rounded-full bg-slate-100" />
                  <div className="mt-3 h-4 w-5/6 rounded-full bg-slate-100" />
                </div>
              ))}
            </div>
          ) : result ? (
            <>
              <div className="rounded-lg border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#f0fdfa)] p-4 shadow-line">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-ink">{result.title}</h3>
                    <p className="mt-2 leading-7 text-slate-600">{result.summary}</p>
                  </div>
                  {typeof result.score === "number" ? (
                    <div className={`rounded-lg border px-4 py-3 text-center ${getScoreColor(result.score)}`}>
                      <p className="text-3xl font-semibold">{result.score}</p>
                      <p className="text-xs font-semibold uppercase">Score</p>
                    </div>
                  ) : null}
                </div>
              </div>

              {result.scores?.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {result.scores.map((score) => (
                    <div key={score.label} className="rounded-lg border border-slate-200 bg-white p-3 shadow-line">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-ink">{score.label}</p>
                        <span className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${getScoreColor(score.score)}`}>
                          {score.score}/100
                        </span>
                      </div>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-mint-500"
                          style={{ width: `${Math.max(0, Math.min(100, score.score))}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              {result.sections.map((section) => (
                <article key={section.title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-line">
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase text-mint-700">
                    <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                    {section.title}
                  </h3>
                  {section.text ? <p className="mt-3 leading-7 text-slate-700">{section.text}</p> : null}
                  {section.items?.length ? (
                    <div className="mt-3 grid gap-2">
                      {section.items.map((item) => (
                        <div key={item} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-sm leading-6 text-slate-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}

              {result.warnings?.length ? (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
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
                <h3 className="text-sm font-semibold uppercase text-mint-700">Recommended next steps</h3>
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
            <div className="flex min-h-[28rem] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-[linear-gradient(135deg,#ffffff,#effdf8_48%,#f8fafc)] p-6 text-center">
              <div className="max-w-md">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-white text-mint-700 shadow-soft">
                  <BarChart3 className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-xl font-semibold text-ink">{tool.output.emptyTitle}</h3>
                <p className="mt-2 leading-7 text-slate-600">{tool.output.emptyDescription}</p>
                <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4 text-left shadow-line">
                  <p className="text-xs font-semibold uppercase text-mint-700">Preview</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Output will include scores, practical recommendations, copy-ready sections, and
                    truthfulness notes before you export.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {toast ? (
        <div className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-full border border-mint-100 bg-ink px-5 py-3 text-center text-sm font-semibold text-white shadow-soft">
          {toast}
        </div>
      ) : null}
    </div>
  );
}
