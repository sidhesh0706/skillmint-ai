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
          "transition duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}
