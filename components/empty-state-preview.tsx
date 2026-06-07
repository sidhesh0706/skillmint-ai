import { ArrowRight, Sparkles } from "lucide-react";

type EmptyStatePreviewProps = {
  title: string;
  description: string;
};

export function EmptyStatePreview({ title, description }: EmptyStatePreviewProps) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[1.75rem] border border-dashed border-slate-300 bg-[linear-gradient(135deg,#ffffff,#f8faf7_52%,#eef4ef)] p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-6">
      <div className="relative z-10 max-w-md">
        <div className="score-orb mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-mint-700 shadow-soft">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-lg font-semibold text-ink">{title}</p>
        <p className="mt-2 leading-7 text-slate-600">{description}</p>
        <div className="scan-line mt-5 rounded-2xl border border-slate-200 bg-white/92 p-4 text-left shadow-[0_20px_64px_rgba(8,11,18,0.10)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-700">Preview transformation</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto_1.35fr] sm:items-center">
            <p className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold leading-5 text-slate-500">
              Made dashboard for sales data
            </p>
            <ArrowRight className="mx-auto hidden h-4 w-4 text-mint-700 sm:block" aria-hidden="true" />
            <p className="rounded-xl border border-mint-100 bg-mint-50 px-3 py-2 text-xs font-semibold leading-5 text-slate-700">
              Built a sales dashboard to track weekly pipeline trends and identify underperforming regions faster.
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Score +24", "ATS keywords", "Truth-first rewrite", "Export"].map((item) => (
              <span key={item} className="rounded-full bg-mint-50 px-2.5 py-1 text-xs font-semibold text-mint-700">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
