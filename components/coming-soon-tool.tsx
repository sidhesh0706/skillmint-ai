"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Bell, ThumbsUp } from "lucide-react";
import { EmailCapture } from "@/components/email-capture";
import { ToolStatusBadge } from "@/components/tool-status-badge";
import { getToolBySlug, type ToolConfig } from "@/data/tool-config";
import { trackEvent } from "@/lib/analytics";

type ComingSoonToolProps = {
  slug: string;
};

export function ComingSoonTool({ slug }: ComingSoonToolProps) {
  const tool = getToolBySlug(slug) as ToolConfig;
  const Icon = tool.icon;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="launch-panel overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-soft">
        <div className="grid gap-6 border-b border-slate-200 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-line">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <ToolStatusBadge status={tool.status} />
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Bell
                  className="h-3.5 w-3.5 text-mint-700"
                  aria-hidden="true"
                />
                Notify when ready
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-5xl">
              {tool.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {tool.longDescription}
            </p>
          </div>
          <div className="launch-preview rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-line">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Preview output
              </p>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                Planned
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {tool.quickFacts.map((fact, index) => (
                <div
                  key={fact}
                  className="group flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-white hover:shadow-line"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{fact}</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Designed to turn rough context into cleaner, review-ready
                      application copy.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-[#FAFAF8] p-5">
            <div>
              <h2 className="text-xl font-semibold text-ink">
                What it will help with
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="text-sm font-semibold uppercase text-mint-700">
                    Expected inputs
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {tool.inputFields.slice(0, 4).map((field) => (
                      <li key={field.name}>- {field.label}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="text-sm font-semibold uppercase text-mint-700">
                    Expected outputs
                  </p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {tool.quickFacts.map((fact) => (
                      <li key={fact}>- {fact}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() =>
                    trackEvent("coming_soon_vote_clicked", { tool: tool.slug })
                  }
                  className="button-secondary"
                >
                  <ThumbsUp className="h-4 w-4" aria-hidden="true" />
                  Vote for this tool
                </button>
                <Link
                  href="/tools/resume-bullet-generator"
                  className="button-primary"
                >
                  Try related live tool
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          <EmailCapture
            compact
            location={`${tool.slug}_notify_me`}
            leadMagnet="new tool launch notes"
          />
        </div>

        <div className="border-t border-slate-200/80 p-5 sm:p-8">
          <Link href="/tools" className="button-secondary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to tools
          </Link>
        </div>
      </div>
    </div>
  );
}
