"use client";

import { useMemo, useState } from "react";
import { Clipboard, Download, FileText, Sparkles } from "lucide-react";
import {
  getInitialToolValues,
  getToolBySlug,
  type ToolField,
  type ToolFormValues,
} from "@/data/tool-config";

type ToolWorkspaceProps = {
  slug: string;
};

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

export function ToolWorkspace({ slug }: ToolWorkspaceProps) {
  const tool = getToolBySlug(slug)!;

  const [form, setForm] = useState<ToolFormValues>(() => getInitialToolValues(tool));
  const [generated, setGenerated] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedAt, setLastGeneratedAt] = useState(0);

  const outputText = useMemo(() => generated.map((item) => `- ${item}`).join("\n"), [generated]);
  const contextChips = [
    ...tool.quickFacts,
    form.tone,
    form.experienceLevel,
  ].filter(Boolean);

  function updateForm(name: string, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleGenerate() {
    const now = Date.now();
    const cooldownRemaining = 10_000 - (now - lastGeneratedAt);

    if (cooldownRemaining > 0) {
      setError(`Please wait ${Math.ceil(cooldownRemaining / 1000)} seconds before generating again.`);
      return;
    }

    setError("");
    setCopied(false);
    setIsGenerating(true);

    try {
      const response = await fetch(`/api/tools/${tool.slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as {
        bullets?: string[];
        error?: string;
      };

      if (!response.ok || !data.bullets?.length) {
        throw new Error(data.error || "Unable to generate resume bullets right now.");
      }

      setGenerated(data.bullets);
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

  async function handleCopy() {
    if (!outputText) {
      return;
    }

    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  function handleDownload() {
    if (!outputText) {
      return;
    }

    const blob = new Blob([outputText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = tool.mockOutput.downloadFileName;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
      <form
        className="card-surface p-4 sm:p-6 lg:sticky lg:top-24"
        onSubmit={(event) => {
          event.preventDefault();
          handleGenerate();
        }}
      >
        <div className="mb-6 flex items-start gap-4 sm:mb-7">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-mint-50 text-mint-700 shadow-line">
            <FileText className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">Build your draft</h2>
            <p className="mt-2 leading-7 text-slate-600">
              Fill in the fields below. SkillMint will generate tailored resume bullets.
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {tool.inputFields.map((field) => (
            <label
              key={field.name}
              className={field.type === "select" ? "block" : "block sm:col-span-2"}
            >
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
            {isGenerating ? "Generating..." : "Generate"}
          </button>
        </div>
      </form>

      <section className="card-surface flex min-h-[34rem] flex-col overflow-hidden" aria-live="polite">
        <div className="border-b border-slate-200/80 bg-[linear-gradient(120deg,#ffffff,#effdf8_58%,#ffffff)] p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-mint-100 bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase text-mint-700 shadow-line">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                AI preview
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">{tool.mockOutput.title}</h2>
              <p className="mt-2 leading-7 text-slate-600">{tool.mockOutput.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!generated.length}
                className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-mint-50 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
                aria-label="Copy output to clipboard"
                title="Copy"
              >
                <Clipboard className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={handleDownload}
                disabled={!generated.length}
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

          {generated.length ? (
            <div className="flex flex-1 flex-col">
              <div className="space-y-3">
                {generated.map((item, index) => (
                  <div key={item} className="rounded-lg border border-slate-200 bg-white p-4 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100">
                    <div className="flex gap-3">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mint-50 text-xs font-semibold text-mint-700">
                        {index + 1}
                      </span>
                      <p className="leading-7 text-slate-700">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
              {copied ? (
                <p className="mt-4 text-sm font-semibold text-mint-700">Copied to clipboard.</p>
              ) : null}
            </div>
          ) : (
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-[linear-gradient(135deg,#ffffff,#effdf8_48%,#f8fafc)] p-5 text-center sm:p-6">
              <div className="max-w-md">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-mint-700 shadow-soft">
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="text-lg font-semibold text-ink">{tool.mockOutput.emptyTitle}</p>
                <p className="mt-2 leading-7 text-slate-600">{tool.mockOutput.emptyDescription}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
