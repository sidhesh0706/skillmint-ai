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
    <article className="gloss-panel hover-gloss group flex h-full flex-col p-5 sm:p-6">
      <div className={clsx(
        "pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint-300 to-transparent transition duration-300",
        isLive ? "opacity-100" : "opacity-40",
      )} />
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-mint-300/10 blur-3xl transition duration-500 group-hover:bg-cyan-300/20" />
      <div className="gloss-content flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-ink via-slate-800 to-mint-700 text-white shadow-line transition duration-300 group-hover:scale-105 group-hover:shadow-[0_0_34px_rgba(31,201,153,0.22)]">
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

      <div className="gloss-content mt-6 flex flex-1 flex-col">
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

