import { clsx } from "clsx";
import type { ReactNode } from "react";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: "none" | "sm" | "md";
};

export function SectionReveal({
  children,
  className,
  delay = "none",
}: SectionRevealProps) {
  return (
    <div
      className={clsx(
        "section-reveal",
        delay === "sm" && "section-reveal-delay-sm",
        delay === "md" && "section-reveal-delay-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
