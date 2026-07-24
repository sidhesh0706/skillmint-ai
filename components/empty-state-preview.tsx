import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

type EmptyStatePreviewProps = {
  title: string;
  description: string;
};

export function EmptyStatePreview({
  title,
  description,
}: EmptyStatePreviewProps) {
  const checks = [
    "Clarity",
    "Impact",
    "Metrics",
    "ATS keywords",
    "Truthfulness",
  ];

  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#fbfcfb_48%,#eef8f4)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.96)] sm:p-6">
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-mint-300/80 to-transparent" />
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-mint-100/50 blur-3xl" />
      <div className="relative z-10 w-full max-w-2xl">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-mint-700 shadow-soft success-pulse">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="mx-auto max-w-xl text-center">
          <p className="text-xl font-semibold tracking-[-0.02em] text-ink">
            {title}
          </p>
          <p className="mt-2 leading-7 text-slate-600">{description}</p>
        </div>
        <div className="mt-5 rounded-[1.35rem] border border-slate-200 bg-white/95 p-4 text-left shadow-[0_20px_64px_rgba(8,11,18,0.09)] backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-700">
              Preview transformation
            </p>
            <span className="inline-flex w-max items-center rounded-full border border-mint-100 bg-mint-50 px-3 py-1 text-xs font-semibold text-mint-700">
              68 to 91 score
            </span>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto_1.25fr] sm:items-stretch">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
                Rough note
              </p>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
                Made dashboard for sales data.
              </p>
            </div>
            <div className="hidden items-center justify-center sm:flex">
              <ArrowRight
                className="h-4 w-4 text-mint-700"
                aria-hidden="true"
              />
            </div>
            <div className="rounded-2xl border border-mint-100 bg-mint-50/70 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-mint-700">
                  Recruiter-ready
                </p>
                <span className="rounded-full border border-mint-100 bg-white px-2.5 py-1 text-[11px] font-semibold text-mint-700">
                  91/100
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-slate-800">
                Built a sales dashboard using SQL and Excel to track weekly
                pipeline trends and identify underperforming regions faster.
              </p>
            </div>
          </div>
          <div className="mt-4 grid gap-2 sm:grid-cols-5">
            {checks.map((item, index) => (
              <div
                key={item}
                className="keyword-chip flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-2 text-xs font-semibold text-slate-600"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <CheckCircle2
                  className="h-3.5 w-3.5 text-mint-700"
                  aria-hidden="true"
                />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "Action verb",
              "Tools included",
              "Clearer scope",
              "Export-ready",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-600"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
