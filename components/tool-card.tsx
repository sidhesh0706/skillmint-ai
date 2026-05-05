import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { clsx } from "clsx";
import { getToolHref, type ToolConfig } from "@/data/tool-config";

type ToolCardProps = {
  tool: ToolConfig;
};

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;
  const isLive = tool.status === "live";
  const statusLabel = isLive ? "Live" : "Coming soon";

  return (
    <article className="group card-surface relative flex h-full flex-col overflow-hidden p-5 transition duration-300 hover:-translate-y-1 hover:border-mint-100 hover:shadow-xl sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-mint-500 via-amber-300 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-mint-50 via-white to-amber-50 text-mint-700 shadow-line transition duration-300 group-hover:scale-105 group-hover:shadow-soft">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <span
          className={clsx(
            "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-semibold",
            isLive
              ? "border-mint-100 bg-mint-50 text-mint-700"
              : "border-slate-200 bg-slate-50 text-slate-600",
          )}
        >
          {!isLive ? <Clock3 className="h-3.5 w-3.5" aria-hidden="true" /> : null}
          {statusLabel}
        </span>
      </div>

      <div className="mt-6 flex flex-1 flex-col">
        <h3 className="text-lg font-semibold text-ink">{tool.name}</h3>
        <p className="mt-3 flex-1 leading-7 text-slate-600">{tool.shortDescription}</p>
        <Link
          href={getToolHref(tool)}
          className={clsx(
            "mt-6 inline-flex items-center gap-2 self-start rounded-full px-4 py-2 text-sm font-semibold transition duration-300",
            isLive
              ? "bg-ink text-white hover:-translate-y-0.5 hover:bg-slate-800"
              : "bg-slate-100 text-slate-600 hover:-translate-y-0.5 hover:bg-slate-200",
          )}
        >
          {isLive ? "Open tool" : "View details"}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
