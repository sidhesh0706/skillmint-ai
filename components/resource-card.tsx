import Link from "next/link";
import { clsx } from "clsx";
import { ArrowRight, Sparkles } from "lucide-react";
import type { SeoLandingPage } from "@/data/seo-landing-pages";

type ResourceCardProps = {
  page: SeoLandingPage;
  featured?: boolean;
};

export function ResourceCard({ page, featured = false }: ResourceCardProps) {
  return (
    <article
      className={clsx(
        "group interactive-card resource-card relative flex h-full flex-col overflow-hidden rounded-[1.5rem] p-5",
        featured
          ? "resource-card-featured min-h-[18rem] sm:p-7"
          : "min-h-[19rem]",
      )}
    >
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-mint-300/0 to-transparent transition duration-300 group-hover:via-mint-300/80" />
      <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-mint-100/0 blur-3xl transition duration-500 group-hover:bg-mint-100/55" />
      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <p className="rounded-full border border-mint-100 bg-mint-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-mint-700 shadow-line">
            {page.category || "guide"}
          </p>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-mint-100 bg-white text-mint-700 shadow-line transition duration-300 group-hover:scale-105">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-slate-500">
          {page.audience}
        </p>
        <h3
          className={clsx(
            "mt-2 font-semibold leading-snug tracking-[-0.025em] text-ink",
            featured ? "max-w-2xl text-2xl sm:text-3xl" : "text-xl",
          )}
        >
          {page.title}
        </h3>
        <p
          className={clsx(
            "mt-3 flex-1 text-sm leading-6 text-slate-600",
            featured ? "max-w-2xl sm:text-base sm:leading-7" : "line-clamp-3",
          )}
        >
          {page.metaDescription}
        </p>
        <div className="mt-5 rounded-2xl border border-slate-200 bg-[#FAFAF8] p-3 shadow-line">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Useful action verbs
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {page.actionVerbs.slice(0, 3).map((verb, index) => (
              <span
                key={verb}
                className="keyword-chip rounded-full border border-mint-100 bg-white px-3 py-1 text-xs font-semibold text-mint-700"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {verb}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-semibold text-slate-600">
          <span className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-line">
            ATS examples
          </span>
          <span className="rounded-xl border border-slate-200 bg-white px-2.5 py-2 shadow-line">
            CTA included
          </span>
        </div>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            href={`/${page.slug}`}
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-line transition hover:-translate-y-0.5 hover:bg-slate-800"
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
