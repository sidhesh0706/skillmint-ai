import { clsx } from "clsx";
import type { HTMLAttributes } from "react";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "article" | "div" | "section";
  interactive?: boolean;
};

export function Card({
  as: Component = "div",
  interactive = false,
  className,
  ...props
}: CardProps) {
  return (
    <Component
      className={clsx(
        "rounded-xl border border-slate-200 bg-white shadow-sm",
        interactive &&
          "card-interactive relative isolate overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_48px_rgba(15,23,42,0.09)]",
        className,
      )}
      {...props}
    />
  );
}
