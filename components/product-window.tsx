"use client";

import { useState } from "react";
import { clsx } from "clsx";
import {
  ArrowRight,
  Check,
  Clipboard,
  Download,
  RefreshCw,
} from "lucide-react";
import { ScoreMeter } from "@/components/score-meter";

type ProductWindowProps = {
  className?: string;
};

const previews = [
  {
    tab: "Resume",
    label: "Resume intelligence",
    title: "Recruiter-ready bullets",
    description: "Scored for clarity, impact, keywords, and truthful proof.",
    score: 92,
    results: [
      {
        label: "Best bullet",
        text: "Built an interactive sales dashboard using SQL and Excel to track weekly pipeline trends.",
      },
      {
        label: "Improvement",
        text: "Add a truthful usage or time-saving metric when available.",
      },
    ],
    keywords: ["SQL", "Excel", "pipeline reporting"],
    actions: ["Copy", "Rewrite", "Export"],
  },
  {
    tab: "JD Match",
    label: "Role alignment",
    title: "Job description match",
    description: "Matched evidence, keyword gaps, and overclaiming checks.",
    score: 78,
    results: [
      {
        label: "Matched skills",
        text: "SQL, dashboards, stakeholder communication, reporting",
      },
      {
        label: "Truthful gap",
        text: "Forecasting appears in the posting but not in your current proof.",
      },
    ],
    keywords: ["4 matched", "2 gaps", "low claim risk"],
    actions: ["Compare", "Tailor", "Export"],
  },
  {
    tab: "LinkedIn",
    label: "Profile positioning",
    title: "Headline options",
    description: "Clear positioning that carries your strongest keywords.",
    score: 89,
    results: [
      {
        label: "Recommended",
        text: "Data Analyst | SQL, Excel and dashboard reporting",
      },
      {
        label: "Alternative",
        text: "Early-career Data Analyst turning data into clear decisions",
      },
    ],
    keywords: ["Data Analyst", "SQL", "dashboards"],
    actions: ["Copy", "Compare", "Refine"],
  },
  {
    tab: "Cover Letter",
    label: "Application draft",
    title: "Proof-led opening",
    description: "Role context connected to your most relevant evidence.",
    score: 86,
    results: [
      {
        label: "Opening",
        text: "I am applying for the Product Analyst role with hands-on experience turning product data into clear recommendations.",
      },
      {
        label: "Proof to include",
        text: "Interactive sales dashboard built with SQL and Excel.",
      },
    ],
    keywords: ["role fit", "company context", "proof strength"],
    actions: ["Copy", "Edit", "Export"],
  },
];

export function ProductWindow({ className }: ProductWindowProps) {
  const [activeTab, setActiveTab] = useState(0);
  const activePreview = previews[activeTab];

  return (
    <div
      className={clsx(
        "premium-window overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white",
        className,
      )}
    >
      <div className="scan-line flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-300" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden text-xs font-medium text-slate-500 sm:inline">
            SkillMint application workspace
          </span>
          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            Live preview
          </span>
        </div>
      </div>

      <div className="border-b border-slate-200 bg-white p-2 sm:p-3">
        <div
          className="grid grid-cols-2 gap-1.5 sm:grid-cols-4"
          role="tablist"
          aria-label="Application workspace previews"
        >
          {previews.map((preview, index) => (
            <button
              type="button"
              role="tab"
              key={preview.tab}
              aria-selected={activeTab === index}
              onClick={() => setActiveTab(index)}
              className={clsx(
                "home-product-tab",
                activeTab === index && "home-product-tab-active",
              )}
            >
              <span
                className={clsx(
                  "h-1.5 w-1.5 rounded-full transition-colors",
                  activeTab === index ? "bg-emerald-500" : "bg-slate-300",
                )}
              />
              {preview.tab}
            </button>
          ))}
        </div>
      </div>

      <div
        key={activePreview.tab}
        className="home-product-pane p-4 sm:p-5"
        role="tabpanel"
      >
        <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
              {activePreview.label}
            </p>
            <h2 className="mt-2 text-lg font-semibold text-slate-950">
              {activePreview.title}
            </h2>
            <p className="mt-1 text-sm leading-6 text-slate-500">
              {activePreview.description}
            </p>
          </div>
          <div className="home-product-score">
            <div className="flex items-center justify-between gap-4">
              <span>Overall score</span>
              <strong>{activePreview.score}/100</strong>
            </div>
            <ScoreMeter
              value={activePreview.score}
              compact
              className="mt-2 w-full"
            />
          </div>
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_0.72fr]">
          <div className="space-y-3">
            {activePreview.results.map((result, index) => (
              <article
                key={result.label}
                className="home-preview-result"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-400">
                    {result.label}
                  </span>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {result.text}
                </p>
              </article>
            ))}
          </div>

          <aside className="home-keyword-panel">
            <p className="text-xs font-semibold uppercase tracking-[0.13em] text-slate-500">
              Intelligence signals
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {activePreview.keywords.map((keyword, index) => (
                <span
                  key={keyword}
                  className="keyword-chip rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-semibold text-emerald-700"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  {keyword}
                </span>
              ))}
            </div>
            <div className="mt-5 space-y-2 text-xs font-medium text-slate-600">
              <span className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Truthfulness check
              </span>
              <span className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                Export-ready copy
              </span>
            </div>
          </aside>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2">
          {activePreview.actions.map((action, index) => {
            const Icon =
              index === 0 ? Clipboard : index === 1 ? RefreshCw : Download;

            return (
              <button
                type="button"
                key={action}
                className="home-preview-action group"
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {action}
                <ArrowRight
                  className="hidden h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 sm:block"
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
