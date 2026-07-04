import { clsx } from "clsx";

type ScoreMeterProps = {
  value: number;
  label?: string;
  status?: string;
  compact?: boolean;
  className?: string;
};

export function ScoreMeter({ value, label, status, compact = false, className }: ScoreMeterProps) {
  const safeValue = Math.max(0, Math.min(100, value || 0));
  const statusText =
    status || (safeValue >= 85 ? "Strong" : safeValue >= 70 ? "Needs proof" : "Needs work");

  return (
    <div
      className={clsx(
        "rounded-2xl border border-slate-200 bg-white/90 shadow-line",
        compact ? "p-2.5" : "p-3.5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {label ? <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">{label}</p> : null}
        <p className="text-sm font-semibold text-ink">{safeValue}/100</p>
      </div>
      <div className={clsx("overflow-hidden rounded-full bg-slate-100", compact ? "mt-2 h-1.5" : "mt-3 h-2")}>
        <div
          className="score-fill h-full rounded-full bg-gradient-to-r from-mint-500 via-emerald to-cyan transition-[width] duration-700"
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {!compact ? (
        <p className="mt-2 text-xs font-semibold text-slate-500">{statusText}</p>
      ) : null}
    </div>
  );
}
