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
        "score-orb inline-flex items-center gap-2 rounded-full border border-mint-300/30 bg-mint-300/10 px-3 py-1.5 text-xs font-semibold text-mint-100 shadow-[0_0_24px_rgba(31,201,153,0.22)]",
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-mint-300 shadow-[0_0_14px_rgba(31,201,153,0.85)]" />
      {score}
      <span className="text-mint-100/65">{label}</span>
    </div>
  );
}
