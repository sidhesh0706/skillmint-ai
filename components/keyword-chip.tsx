import { clsx } from "clsx";
import type { CSSProperties, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

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
    <Badge
      style={style}
      variant={dark ? "neutral" : "success"}
      className={clsx(
        "keyword-chip",
        dark && "bg-white text-slate-700",
        className,
      )}
    >
      {children}
    </Badge>
  );
}
