import { Bell, ThumbsUp } from "lucide-react";
import { clsx } from "clsx";
import { MotionButton } from "@/components/motion-button";
import { ToolStatusBadge } from "@/components/tool-status-badge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getToolHref, type ToolConfig } from "@/data/tool-config";

type ToolCardProps = {
  tool: ToolConfig;
};

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  const isLive = tool.status === "live";

  return (
    <Card
      as="article"
      interactive
      className={clsx(
        "group flex h-full min-h-[24rem] flex-col overflow-hidden p-5 sm:p-6",
        isLive && "border-emerald-200",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 bg-slate-950 text-white shadow-sm">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <ToolStatusBadge status={tool.status} />
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-emerald-700">
          {tool.category}
        </p>
        <h3 className="mt-1 text-lg font-semibold text-slate-950">
          {tool.name}
        </h3>
        <p className="mt-3 flex-1 leading-7 text-slate-600">
          {tool.shortDescription}
        </p>
        <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
              <span
                className={clsx(
                  "block h-full rounded-full",
                  isLive
                    ? "w-4/5 bg-emerald-500"
                    : "w-2/5 bg-slate-300",
                )}
              />
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {isLive ? "Output ready" : "Preview"}
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {tool.quickFacts.slice(0, 3).map((fact, index) => (
              <Badge
                key={fact}
                variant={isLive ? "success" : "neutral"}
                className="keyword-chip text-[11px]"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {fact}
              </Badge>
            ))}
          </div>
        </div>
        <MotionButton
          href={getToolHref(tool)}
          variant={isLive ? "primary" : "secondary"}
          compact
          showArrow
          className="mt-6 self-start"
        >
          {isLive ? "Open tool" : "View details"}
        </MotionButton>
        {!isLive ? (
          <div className="mt-3 flex gap-2">
            <Badge>
              <Bell className="h-3.5 w-3.5 text-mint-700" aria-hidden="true" />
              Notify me
            </Badge>
            <Badge>
              <ThumbsUp
                className="h-3.5 w-3.5 text-mint-700"
                aria-hidden="true"
              />
              Vote
            </Badge>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
