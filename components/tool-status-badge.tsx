import { Clock3, Radio } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { ToolStatus } from "@/data/tool-config";

type ToolStatusBadgeProps = {
  status: ToolStatus;
  className?: string;
};

export function ToolStatusBadge({ status, className }: ToolStatusBadgeProps) {
  const isLive = status === "live";
  const Icon = isLive ? Radio : Clock3;

  return (
    <Badge variant={isLive ? "success" : "neutral"} className={className}>
      <Icon className="h-3.5 w-3.5" aria-hidden="true" />
      {isLive ? "Live" : "Coming soon"}
    </Badge>
  );
}
