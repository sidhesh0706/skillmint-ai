import { clsx } from "clsx";
import { Activity, Circle } from "lucide-react";
import type { ReactNode } from "react";

type CommandPanelProps = {
  title?: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  status?: string;
  scanLine?: boolean;
  footer?: ReactNode;
};

export function CommandPanel({
  title,
  eyebrow,
  description,
  children,
  className,
  status = "Ready",
  scanLine = false,
  footer,
}: CommandPanelProps) {
  return (
    <section className={clsx("command-panel text-white", scanLine && "scan-line", className)}>
      <div className="relative z-10">
        {(title || eyebrow || description) ? (
          <div className="border-b border-white/10 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                {eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-mint-100">
                    {eyebrow}
                  </p>
                ) : null}
                {title ? <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em]">{title}</h2> : null}
                {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">{description}</p> : null}
              </div>
              <div className="inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.08] px-3 py-1.5 text-xs font-semibold text-slate-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-500 opacity-60" />
                  <Circle className="relative h-2 w-2 fill-mint-500 text-mint-500" aria-hidden="true" />
                </span>
                {status}
              </div>
            </div>
          </div>
        ) : null}
        <div className="p-5">{children}</div>
        {footer ? (
          <div className="border-t border-white/10 px-5 py-4 text-sm text-slate-300">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-mint-300" aria-hidden="true" />
              {footer}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
