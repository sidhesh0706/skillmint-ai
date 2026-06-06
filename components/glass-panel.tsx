import { clsx } from "clsx";
import type { ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "article" | "section";
};

export function GlassPanel({ children, className, as: Component = "div" }: GlassPanelProps) {
  return (
    <Component className={clsx("gloss-panel section-reveal", className)}>
      <div className="gloss-content">{children}</div>
    </Component>
  );
}
