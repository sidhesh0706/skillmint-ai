import { clsx } from "clsx";
import type { CSSProperties, ReactNode } from "react";

type KeywordChipProps = {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  style?: CSSProperties;
};

export function KeywordChip({ children, className, dark = false, style }: KeywordChipProps) {
  return (
    <span
      style={style}
      className={clsx(
        "keyword-chip inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold",
        dark
          ? "border-cyan-200/20 bg-white/[0.08] text-cyan-50"
          : "border-mint-100 bg-mint-50 text-mint-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

