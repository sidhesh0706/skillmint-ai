"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Bell, ThumbsUp } from "lucide-react";
import { EmailCapture } from "@/components/email-capture";
import { GlassPanel } from "@/components/glass-panel";
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
      <GlassPanel className="overflow-hidden p-0">
        <div className="grid gap-6 border-b border-slate-200/80 bg-[radial-gradient(circle_at_20%_0%,rgba(31,201,153,0.16),transparent_28rem),linear-gradient(135deg,#ffffff,#effdf8)] p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-mint-700 shadow-line">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              <ToolStatusBadge status={tool.status} />
              <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-600">
                <Bell className="h-3.5 w-3.5 text-mint-700" aria-hidden="true" />
                Notify when ready
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-ink sm:text-5xl">
              {tool.name}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {tool.longDescription}
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-ink p-5 text-white shadow-[0_28px_90px_rgba(23,32,51,0.18)]">
            <p className="text-sm font-semibold uppercase text-mint-100">Preview output</p>
            <div className="mt-4 space-y-3">
              {tool.quickFacts.map((fact) => (
                <div key={fact} className="rounded-2xl border border-white/10 bg-white/[0.07] p-4">
                  <p className="text-sm font-semibold">{fact}</p>
                  <p className="mt-1 text-xs leading-5 text-slate-300">
                    Designed to turn rough context into cleaner, review-ready application copy.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="gloss-panel p-5">
            <div className="gloss-content">
              <h2 className="text-xl font-semibold text-ink">What it will help with</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="text-sm font-semibold uppercase text-mint-700">Expected inputs</p>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-600">
                    {tool.inputFields.slice(0, 4).map((field) => (
                      <li key={field.name}>- {field.label}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-white/80 p-4">
                  <p className="text-sm font-semibold uppercase text-mint-700">Expected outputs</p>
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
                  onClick={() => trackEvent("coming_soon_vote_clicked", { tool: tool.slug })}
                  className="button-secondary"
                >
                  <ThumbsUp className="h-4 w-4" aria-hidden="true" />
                  Vote for this tool
                </button>
                <Link href="/tools/resume-bullet-generator" className="button-primary">
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
      </GlassPanel>
    </div>
  );
}
