import { Sparkles } from "lucide-react";

type EmptyStatePreviewProps = {
  title: string;
  description: string;
};

export function EmptyStatePreview({ title, description }: EmptyStatePreviewProps) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-[1.75rem] border border-dashed border-mint-200 bg-[radial-gradient(circle_at_20%_0%,rgba(31,201,153,0.18),transparent_22rem),linear-gradient(135deg,#ffffff,#effdf8_48%,#f8fafc)] p-5 text-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:p-6">
      <div aria-hidden="true" className="starfield opacity-20" />
      <div className="relative z-10 max-w-md">
        <div className="score-orb mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-mint-700 shadow-soft">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-lg font-semibold text-ink">{title}</p>
        <p className="mt-2 leading-7 text-slate-600">{description}</p>
        <div className="scan-line mt-5 rounded-2xl border border-slate-200 bg-white/88 p-4 text-left shadow-[0_20px_64px_rgba(23,32,51,0.10)] backdrop-blur">
          <p className="text-xs font-semibold uppercase text-mint-700">Preview example</p>
          <p className="mt-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-500">
            Before: Made dashboard for sales data
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-700">
            - Improved onboarding documentation for a 12-person team, reducing repeated setup
            questions and helping new hires ramp faster.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Score", "Keywords", "Rewrite", "Export"].map((item) => (
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
