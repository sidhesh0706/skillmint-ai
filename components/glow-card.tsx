import { clsx } from "clsx";
import type { ReactNode } from "react";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export function GlowCard({ children, className, as: Component = "div" }: GlowCardProps) {
  return (
    <Component
      className={clsx(
        "group section-reveal relative overflow-hidden rounded-[2rem] border border-slate-200/75 bg-white/[0.9] shadow-[0_30px_90px_rgba(23,32,51,0.09)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-mint-100 hover:shadow-[0_36px_110px_rgba(15,132,102,0.14)]",
        "before:pointer-events-none before:absolute before:inset-x-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-mint-300/70 before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_20%_0%,rgba(31,201,153,0.10),transparent_36%)] after:transition after:duration-300 group-hover:after:bg-[radial-gradient(circle_at_20%_0%,rgba(31,201,153,0.16),transparent_38%)]",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </Component>
  );
}

