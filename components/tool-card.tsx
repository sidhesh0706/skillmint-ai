import Link from "next/link";
import { ArrowRight, Bell, ThumbsUp } from "lucide-react";
import { clsx } from "clsx";
import { ToolStatusBadge } from "@/components/tool-status-badge";
import { getToolHref, type ToolConfig } from "@/data/tool-config";

type ToolCardProps = {
  tool: ToolConfig;
};

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  const isLive = tool.status === "live";

  return (
    <article
      className={clsx(
        "tool-card-shell tool-card-animated hover-gloss group relative flex h-full min-h-[23rem] flex-col overflow-hidden rounded-[1.5rem] border bg-white p-5 transition duration-300 sm:p-6",
        isLive
          ? "border-emerald-200/90"
          : "border-slate-200/90",
      )}
    >
      <div
        className={clsx(
          "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-300 to-transparent transition duration-300",
          isLive ? "opacity-100" : "opacity-40",
        )}
      />
      <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-emerald-50/80 transition duration-300 group-hover:bg-emerald-100/80" />
      <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
      <div className="gloss-content flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ink via-slate-800 to-mint-700 text-white shadow-line transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_34px_rgba(31,201,153,0.22)]">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <ToolStatusBadge status={tool.status} />
      </div>

      <div className="gloss-content mt-6 flex flex-1 flex-col">
        <p className="text-xs font-semibold uppercase text-mint-700">
          {tool.category}
        </p>
        <h3 className="text-lg font-semibold text-ink">{tool.name}</h3>
        <p className="mt-3 flex-1 leading-7 text-slate-600">
          {tool.shortDescription}
        </p>
        <div className="tool-card-preview scan-line mt-5 rounded-2xl border border-slate-200 bg-slate-50/85 p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="h-2 w-24 overflow-hidden rounded-full bg-slate-100">
              <span
                className={clsx(
                  "block h-full rounded-full",
                  isLive
                    ? "w-4/5 bg-gradient-to-r from-mint-500 to-cyan-300"
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
              <span
                key={fact}
                className="keyword-chip rounded-full bg-mint-50 px-2.5 py-1 text-[11px] font-semibold text-mint-700"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                {fact}
              </span>
            ))}
          </div>
        </div>
        <Link
          href={getToolHref(tool)}
          className={clsx(
            "tool-card-cta mt-6 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold transition duration-300",
            isLive
              ? "bg-ink text-white hover:-translate-y-0.5 hover:bg-slate-800"
              : "bg-slate-100 text-slate-600 hover:-translate-y-0.5 hover:bg-slate-200",
          )}
        >
          {isLive ? "Open tool" : "View details"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
        {!isLive ? (
          <div className="mt-3 flex gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/75 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <Bell className="h-3.5 w-3.5 text-mint-700" aria-hidden="true" />
              Notify me
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/75 px-3 py-1.5 text-xs font-semibold text-slate-600">
              <ThumbsUp
                className="h-3.5 w-3.5 text-mint-700"
                aria-hidden="true"
              />
              Vote
            </span>
          </div>
        ) : null}
      </div>
    </article>
  );
}
