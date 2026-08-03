import { clsx } from "clsx";

import { Badge } from "@/components/ui/badge";

type AnimatedScoreBadgeProps = {
  score: string | number;
  label?: string;
  className?: string;
};

export function AnimatedScoreBadge({
  score,
  label = "Score",
  className,
}: AnimatedScoreBadgeProps) {
  return (
    <Badge
      variant="success"
      className={clsx("animated-score-badge gap-2", className)}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      {score}
      <span className="text-emerald-700/70">{label}</span>
    </Badge>
  );
}
