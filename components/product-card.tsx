import { clsx } from "clsx";
import { type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { MotionButton } from "@/components/motion-button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

type ProductCardProps = {
  title: string;
  outcome: string;
  description: string;
  href: string;
  icon: LucideIcon;
  status?: "live" | "coming-soon" | "recommended";
  cta?: string;
  preview?: string[];
  className?: string;
  style?: CSSProperties;
};

const statusLabels = {
  live: "Live",
  "coming-soon": "Coming soon",
  recommended: "Recommended",
};

export function ProductCard({
  title,
  outcome,
  description,
  href,
  icon: Icon,
  status = "live",
  cta = "Open",
  preview = [],
  className,
  style,
}: ProductCardProps) {
  const isLive = status === "live";
  const nextStep = isLive
    ? "Use this in your application kit"
    : "Join the waitlist preview";

  return (
    <Card
      as="article"
      interactive
      className={clsx(
        "group relative flex h-full min-h-[19rem] flex-col p-5",
        isLive && "border-emerald-200",
        className,
      )}
      style={style}
    >
      <div className="flex items-start justify-between gap-4">
        <div
          className={clsx(
            "flex h-11 w-11 items-center justify-center rounded-lg border",
            isLive ? "bg-ink text-white" : "bg-slate-100 text-slate-700",
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <Badge variant={isLive ? "success" : "neutral"}>
          <span
            className={clsx(
              "h-1.5 w-1.5 rounded-full",
              isLive ? "bg-mint-500" : "bg-slate-400",
            )}
          />
          {statusLabels[status]}
        </Badge>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-mint-700">
        {outcome}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">
        {title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Related next step
        </p>
        <p className="mt-1 text-sm font-semibold text-slate-800">{nextStep}</p>
      </div>

      <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-24 overflow-hidden rounded-full bg-slate-200">
            <span
              className={clsx(
                "score-fill block h-full rounded-full",
                isLive ? "w-4/5 bg-emerald-500" : "w-2/3 bg-slate-300",
              )}
            />
          </span>
          <span className="text-xs font-semibold text-slate-500">
            {isLive ? "Output ready" : "Preview"}
          </span>
        </div>
        {preview.length ? (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {preview.slice(0, 3).map((item) => (
              <Badge key={item} className="text-[11px]">
                {item}
              </Badge>
            ))}
          </div>
        ) : null}
      </div>

      <MotionButton
        href={href}
        compact
        variant={isLive ? "primary" : "secondary"}
        className="mt-5 self-start"
        showArrow
      >
        {cta}
      </MotionButton>
    </Card>
  );
}
