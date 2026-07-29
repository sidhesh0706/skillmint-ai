import { clsx } from "clsx";

type ScoreMeterProps = {
  value: number;
  label?: string;
  status?: string;
  compact?: boolean;
  className?: string;
};

export function ScoreMeter({
  value,
  label,
  status,
  compact = false,
  className,
}: ScoreMeterProps) {
  const safeValue = Math.max(0, Math.min(100, value || 0));
  const statusText =
    status ||
    (safeValue >= 85
      ? "Strong"
      : safeValue >= 70
        ? "Needs proof"
        : "Needs work");
  const strengthClass =
    safeValue >= 85
      ? "score-meter-strong"
      : safeValue >= 70
        ? "score-meter-medium"
        : "score-meter-low";

  return (
    <div
      data-score={safeValue}
      className={clsx(
        "score-meter rounded-2xl border border-slate-200 bg-white/90 shadow-line",
        strengthClass,
        compact ? "p-2.5" : "p-3.5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        {label ? (
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            {label}
          </p>
        ) : null}
        <p className="text-sm font-semibold text-ink">{safeValue}/100</p>
      </div>
      <div
        className={clsx(
          "score-meter-track overflow-hidden rounded-full bg-slate-100",
          compact ? "mt-2 h-1.5" : "mt-3 h-2",
        )}
        role="progressbar"
        aria-label={label || "Score"}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={safeValue}
      >
        <div
          className="score-meter-fill score-fill h-full rounded-full bg-gradient-to-r from-mint-500 via-emerald to-cyan transition-[width] duration-700"
          style={{ width: `${safeValue}%` }}
        />
      </div>
      {!compact ? (
        <p className="score-meter-status mt-2 text-xs font-semibold text-slate-500">
          {statusText}
        </p>
      ) : null}
    </div>
  );
}
