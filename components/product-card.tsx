import { clsx } from "clsx";
import { type LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { MotionButton } from "@/components/motion-button";

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

  return (
    <article
      className={clsx(
        "group relative flex h-full min-h-[19rem] flex-col overflow-hidden rounded-[1.65rem] border bg-white p-5 shadow-[0_18px_54px_rgba(8,11,18,0.08)] transition duration-300",
        "hover:-translate-y-1 hover:shadow-[0_28px_82px_rgba(8,11,18,0.12)]",
        isLive
          ? "border-emerald-200/80"
          : "border-slate-200/90 bg-[linear-gradient(180deg,#ffffff,#fafafa)]",
        className,
      )}
      style={style}
    >
      <div
        className={clsx(
          "pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent to-transparent",
          isLive ? "via-mint-500/70" : "via-slate-300/80",
        )}
      />
      <div className="pointer-events-none absolute -right-16 -top-20 h-40 w-40 rounded-full bg-mint-100/0 blur-3xl transition duration-500 group-hover:bg-mint-100/60" />
      <div className="flex items-start justify-between gap-4">
        <div
          className={clsx(
            "flex h-12 w-12 items-center justify-center rounded-2xl shadow-crisp transition duration-300 group-hover:scale-105",
            isLive ? "bg-ink text-white" : "bg-slate-100 text-slate-700",
          )}
        >
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <span
          className={clsx(
            "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold",
            isLive
              ? "border-mint-100 bg-mint-50 text-mint-700"
              : "border-slate-200 bg-white text-slate-600",
          )}
        >
          <span className={clsx("h-1.5 w-1.5 rounded-full", isLive ? "bg-mint-500" : "bg-slate-400")} />
          {statusLabels[status]}
        </span>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-mint-700">
        {outcome}
      </p>
      <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{description}</p>

      <div className="mt-5 rounded-2xl border border-slate-200 bg-[#FAFAF8] p-3 shadow-line">
        <div className="flex items-center gap-2">
          <span className="h-2 w-24 overflow-hidden rounded-full bg-white">
            <span
              className={clsx(
                "block h-full rounded-full bg-gradient-to-r",
                isLive ? "w-4/5 from-mint-500 to-cyan" : "w-2/3 from-slate-300 to-slate-200",
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
              <span key={item} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                {item}
              </span>
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
    </article>
  );
}
