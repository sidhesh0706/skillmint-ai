import { clsx } from "clsx";
import type { ReactNode } from "react";

type PremiumPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  side?: ReactNode;
  dark?: boolean;
  contained?: boolean;
  className?: string;
};

export function PremiumPageShell({
  eyebrow,
  title,
  description,
  children,
  side,
  dark = false,
  contained = true,
  className,
}: PremiumPageShellProps) {
  return (
    <section
      className={clsx(
        dark ? "bg-slate-950 text-white" : "bg-[#FAFAF8] text-ink",
        "relative isolate overflow-hidden py-14 sm:py-20",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,#ffffff,rgba(255,255,255,0))]" />
      <div className={clsx(contained ? "container-command" : "container-shell", "relative")}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="fade-in-up max-w-3xl">
            <p
              className={clsx(
                "inline-flex items-center rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] shadow-line backdrop-blur",
                dark
                  ? "border-white/15 bg-white/[0.08] text-mint-100"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700",
              )}
            >
              {eyebrow}
            </p>
            <h1
              className={clsx(
                "mt-5 text-4xl font-semibold leading-[1.01] tracking-[-0.045em] sm:text-6xl",
                dark ? "text-white" : "text-slate-950",
              )}
            >
              {title}
            </h1>
            <p className={clsx("mt-5 max-w-2xl text-lg leading-8", dark ? "text-slate-300" : "text-slate-600")}>
              {description}
            </p>
            {children ? <div className="mt-7">{children}</div> : null}
          </div>
          {side ? <div className="fade-in-up-delayed">{side}</div> : null}
        </div>
      </div>
    </section>
  );
}
