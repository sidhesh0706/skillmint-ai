import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import type { SeoLandingPage } from "@/data/seo-landing-pages";

type ResourceCardProps = {
  page: SeoLandingPage;
};

export function ResourceCard({ page }: ResourceCardProps) {
  return (
    <article className="gloss-panel hover-gloss group flex h-full flex-col p-5">
      <div className="gloss-content flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <p className="rounded-full border border-mint-100 bg-mint-50 px-3 py-1 text-xs font-semibold uppercase text-mint-700">
            {page.category || "guide"}
          </p>
          <Sparkles className="h-4 w-4 text-mint-700" aria-hidden="true" />
        </div>
        <p className="mt-4 text-sm font-semibold uppercase text-slate-500">{page.audience}</p>
        <h3 className="mt-2 text-xl font-semibold leading-snug text-ink">{page.title}</h3>
        <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
          {page.metaDescription}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {page.actionVerbs.slice(0, 3).map((verb) => (
            <span
              key={verb}
              className="rounded-full border border-mint-100 bg-white/80 px-3 py-1 text-xs font-semibold text-mint-700"
            >
              {verb}
            </span>
          ))}
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/${page.slug}`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Open guide
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link
            href="/tools/resume-bullet-generator"
            className="inline-flex min-h-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-mint-100 hover:bg-mint-50 hover:text-mint-700"
          >
            Generate bullets
          </Link>
        </div>
      </div>
    </article>
  );
}
