import { CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

const defaultPills = [
  "Free to use",
  "No signup required",
  "ATS-friendly outputs",
];

type TrustPillsProps = {
  items?: string[];
  centered?: boolean;
  compact?: boolean;
};

export function TrustPills({
  items = defaultPills,
  centered = false,
  compact = false,
}: TrustPillsProps) {
  return (
    <div className={clsx("flex flex-wrap gap-2", centered && "justify-center")}>
      {items.map((item) => (
        <span
          key={item}
          className={clsx(
            "trust-pill inline-flex items-center gap-2 rounded-full font-semibold text-slate-700 backdrop-blur",
            compact ? "px-3 py-1.5 text-xs" : "px-3.5 py-2 text-sm",
          )}
        >
          <CheckCircle2
            className={clsx(
              compact ? "h-3.5 w-3.5" : "h-4 w-4",
              "text-mint-700",
            )}
            aria-hidden="true"
          />
          {item}
        </span>
      ))}
    </div>
  );
}
