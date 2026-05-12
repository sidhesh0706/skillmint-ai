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
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.07] shadow-celestial backdrop-blur-xl",
        "before:pointer-events-none before:absolute before:inset-x-6 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-mint-300/70 before:to-transparent",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_20%_0%,rgba(31,201,153,0.12),transparent_36%)]",
        className,
      )}
    >
      <div className="relative z-10">{children}</div>
    </Component>
  );
}

