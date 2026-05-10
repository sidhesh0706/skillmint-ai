"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock3, Sparkles, ThumbsUp } from "lucide-react";
import { EmailCapture } from "@/components/email-capture";
import { getToolBySlug, type ToolConfig } from "@/data/tool-config";
import { trackEvent } from "@/lib/analytics";

type ComingSoonToolProps = {
  slug: string;
};

export function ComingSoonTool({ slug }: ComingSoonToolProps) {
  const tool = getToolBySlug(slug) as ToolConfig;
  const Icon = tool.icon;

  return (
    <div className="mx-auto max-w-4xl">
      <div className="card-surface overflow-hidden">
        <div className="border-b border-slate-200/80 bg-gradient-to-r from-white via-mint-50/80 to-white p-6 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-white text-mint-700 shadow-line">
            <Icon className="h-6 w-6" aria-hidden="true" />
          </div>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-line">
            <Clock3 className="h-4 w-4 text-mint-700" aria-hidden="true" />
            This tool is coming soon
          </p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
            {tool.name}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            {tool.longDescription}
          </p>
        </div>

        <div className="grid gap-5 p-5 sm:p-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-line">
            <h2 className="text-xl font-semibold text-ink">What it will help with</h2>
            <div className="mt-4 grid gap-2">
              {tool.quickFacts.map((fact) => (
                <span
                  key={fact}
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm font-semibold text-slate-700"
                >
                  <Sparkles className="h-4 w-4 text-mint-700" aria-hidden="true" />
                  {fact}
                </span>
              ))}
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
