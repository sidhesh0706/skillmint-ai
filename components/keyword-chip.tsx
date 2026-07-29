import { clsx } from "clsx";
import type { CSSProperties, ReactNode } from "react";

type KeywordChipProps = {
  children: ReactNode;
  className?: string;
  dark?: boolean;
  style?: CSSProperties;
};

export function KeywordChip({
  children,
  className,
  dark = false,
  style,
}: KeywordChipProps) {
  return (
    <span
      style={style}
      className={clsx(
        "keyword-chip keyword-chip-premium inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold",
        dark
          ? "border-slate-200 bg-white/85 text-slate-700"
          : "border-mint-100 bg-mint-50 text-mint-700",
        className,
      )}
    >
      {children}
    </span>
  );
}
