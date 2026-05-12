import { clsx } from "clsx";
import type { ReactNode } from "react";

type FloatingPreviewCardProps = {
  children: ReactNode;
  className?: string;
  delay?: "none" | "sm" | "md";
};

export function FloatingPreviewCard({
  children,
  className,
  delay = "none",
}: FloatingPreviewCardProps) {
  return (
    <div
      className={clsx(
        "floating-card rounded-xl border border-white/10 bg-white/[0.08] p-4 shadow-celestial backdrop-blur-xl",
        delay === "sm" && "floating-card-delay-sm",
        delay === "md" && "floating-card-delay-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

