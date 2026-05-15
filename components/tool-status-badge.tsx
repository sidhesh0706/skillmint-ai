import { Clock3, Radio } from "lucide-react";
import { clsx } from "clsx";
import type { ToolStatus } from "@/data/tool-config";

type ToolStatusBadgeProps = {
  status: ToolStatus;
  className?: string;
};

export function ToolStatusBadge({ status, className }: ToolStatusBadgeProps) {
  const isLive = status === "live";
  const Icon = isLive ? Radio : Clock3;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        isLive
          ? "border-mint-100 bg-mint-50 text-mint-700 shadow-[0_0_24px_rgba(31,201,153,0.12)]"
          : "border-slate-200 bg-slate-50 text-slate-600",
        className,
      )}
    >
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {isLive ? "Live" : "Coming soon"}
    </span>
  );
}
