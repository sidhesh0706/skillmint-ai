import { clsx } from "clsx";

type AnimatedScoreBadgeProps = {
  score: string | number;
  label?: string;
  className?: string;
};

export function AnimatedScoreBadge({ score, label = "Score", className }: AnimatedScoreBadgeProps) {
  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 rounded-full border border-mint-100 bg-mint-50 px-3 py-1.5 text-xs font-semibold text-mint-700 shadow-[0_12px_30px_rgba(31,201,153,0.12)]",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-mint-300 shadow-[0_0_14px_rgba(31,201,153,0.85)]" />
      {score}
      <span className="text-mint-700/65">{label}</span>
    </div>
  );
}
