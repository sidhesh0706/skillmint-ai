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
        "floating-card rounded-2xl border border-slate-200/75 bg-white/[0.88] p-4 shadow-[0_18px_54px_rgba(23,32,51,0.08)] backdrop-blur-xl",
        delay === "sm" && "floating-card-delay-sm",
        delay === "md" && "floating-card-delay-md",
        className,
      )}
    >
      {children}
    </div>
  );
}

