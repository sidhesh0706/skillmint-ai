import { clsx } from "clsx";

type ScoreMeterProps = {
  value: number;
  label?: string;
  className?: string;
};

export function ScoreMeter({ value, label, className }: ScoreMeterProps) {
  const safeValue = Math.max(0, Math.min(100, value || 0));

  return (
    <div className={clsx("rounded-2xl border border-slate-200 bg-white/82 p-3 shadow-line", className)}>
      <div className="flex items-center justify-between gap-3">
        {label ? <p className="text-xs font-semibold uppercase text-slate-500">{label}</p> : null}
        <p className="text-sm font-semibold text-ink">{safeValue}/100</p>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-mint-500 to-cyan-300 transition-[width] duration-700"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
