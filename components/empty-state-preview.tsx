import { Sparkles } from "lucide-react";

type EmptyStatePreviewProps = {
  title: string;
  description: string;
};

export function EmptyStatePreview({ title, description }: EmptyStatePreviewProps) {
  return (
    <div className="flex flex-1 items-center justify-center rounded-[1.5rem] border border-dashed border-slate-300 bg-[linear-gradient(135deg,#ffffff,#effdf8_48%,#f8fafc)] p-5 text-center sm:p-6">
      <div className="max-w-md">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-mint-700 shadow-soft">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <p className="text-lg font-semibold text-ink">{title}</p>
        <p className="mt-2 leading-7 text-slate-600">{description}</p>
        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-line">
          <p className="text-xs font-semibold uppercase text-mint-700">Preview example</p>
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
