import { clsx } from "clsx";
import type { ReactNode } from "react";
import { CelestialBackground } from "@/components/celestial-background";
import { CosmicGrid } from "@/components/cosmic-grid";

type CelestialPageShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  side?: ReactNode;
  className?: string;
};

export function CelestialPageShell({
  eyebrow,
  title,
  description,
  children,
  side,
  className,
}: CelestialPageShellProps) {
  return (
    <section className={clsx("cosmic-shell relative py-14 sm:py-20", className)}>
      <CelestialBackground intensity="section" />
      <CosmicGrid />
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div className="max-w-3xl">
            <p className="inline-flex items-center rounded-full border border-mint-100 bg-white/[0.82] px-4 py-2 text-sm font-semibold uppercase text-mint-700 shadow-line backdrop-blur">
              {eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-ink sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">{description}</p>
            {children ? <div className="mt-7">{children}</div> : null}
          </div>
          {side ? <div>{side}</div> : null}
        </div>
      </div>
    </section>
  );
}
