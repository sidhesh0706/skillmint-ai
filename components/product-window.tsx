import { clsx } from "clsx";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ScoreMeter } from "@/components/score-meter";

type ProductWindowProps = {
  title?: string;
  subtitle?: string;
  tabs?: string[];
  bullets?: Array<{
    score: number;
    text: string;
  }>;
  keywords?: string[];
  className?: string;
};

export function ProductWindow({
  title = "Resume workspace",
  subtitle = "Score, rewrite, match, export",
  tabs = ["Resume", "JD Match", "LinkedIn", "Cover Letter"],
  bullets = [
    {
      score: 92,
      text: "Built an interactive sales dashboard using SQL and Excel to track weekly pipeline trends.",
    },
    {
      score: 87,
      text: "Coordinated product, operations, and support updates to remove launch blockers.",
    },
    {
      score: 81,
      text: "Analyzed customer feedback trends to prioritize process improvements.",
    },
  ],
  keywords = ["stakeholder management", "process improvement", "customer insights"],
  className,
}: ProductWindowProps) {
  return (
    <div
      className={clsx(
        "overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.12)]",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-300" />
          <span className="h-3 w-3 rounded-full bg-amber-300" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
        </div>
        <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Live workspace
        </span>
      </div>

      <div className="grid lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 bg-slate-950 p-4 text-white lg:border-b-0 lg:border-r">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-emerald-200">
            Career kit
          </p>
          <div className="mt-4 space-y-2">
            {tabs.map((tab, index) => (
              <div
                key={tab}
                className={clsx(
                  "rounded-xl border px-3 py-2 text-sm transition",
                  index === 0
                    ? "border-white/16 bg-white/12 text-white"
                    : "border-white/8 bg-white/[0.04] text-slate-300",
                )}
              >
                {tab}
              </div>
            ))}
          </div>
        </aside>

        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold text-slate-950">{title}</p>
              <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
            </div>
            <ScoreMeter value={92} compact className="w-full sm:w-36" />
          </div>

          <div className="mt-4 space-y-3">
            {bullets.map((bullet, index) => (
              <div
                key={`${bullet.text}-${index}`}
                className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-soft"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
                    Result {index + 1}
                  </span>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                    {bullet.score}/100
                  </span>
                </div>
                <div className="mb-3 h-1.5 w-24 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="score-fill h-full rounded-full bg-gradient-to-r from-mint-500 to-cyan"
                    style={{ width: `${bullet.score}%` }}
                  />
                </div>
                <p className="text-sm leading-6 text-slate-700">- {bullet.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-800">
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Keyword opportunities
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <span
                  key={keyword}
                  className="keyword-chip rounded-full border border-amber-200 bg-white px-3 py-1 text-xs font-semibold text-amber-800"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {["Scored", "Rewrite", "Export"].map((action) => (
              <div
                key={action}
                className="flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 text-sm font-semibold text-slate-700"
              >
                {action}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
