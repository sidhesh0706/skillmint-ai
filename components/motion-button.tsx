import { clsx } from "clsx";
import Link from "next/link";
import { ArrowRight, Loader2, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type MotionButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  compact?: boolean;
  loading?: boolean;
  icon?: LucideIcon;
  showArrow?: boolean;
  className?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function MotionButton({
  children,
  href,
  variant = "primary",
  compact = false,
  loading = false,
  icon: Icon,
  showArrow = false,
  className,
  disabled,
  type = "button",
  ...buttonProps
}: MotionButtonProps) {
  const classes = clsx(
    "group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-300",
    "focus:outline-none focus:ring-4 active:translate-y-0",
    compact ? "min-h-10 px-4 py-2 text-sm" : "min-h-12 px-6 py-3",
    variant === "primary" &&
      "bg-ink text-white shadow-[0_16px_42px_rgba(8,11,18,0.20)] hover:-translate-y-0.5 hover:bg-panel hover:shadow-[0_22px_60px_rgba(16,185,129,0.18)] focus:ring-mint-100",
    variant === "secondary" &&
      "border border-slate-300 bg-white/90 text-ink shadow-line hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white hover:shadow-soft focus:ring-mint-100",
    variant === "ghost" &&
      "border border-white/15 bg-white/[0.08] text-white shadow-line backdrop-blur hover:-translate-y-0.5 hover:bg-white/[0.14] focus:ring-white/20",
    variant === "danger" &&
      "border border-red-200 bg-red-50 text-red-700 hover:-translate-y-0.5 hover:bg-red-100 focus:ring-red-100",
    (disabled || loading) &&
      "pointer-events-none cursor-not-allowed opacity-60 hover:translate-y-0",
    className,
  );
  const content = (
    <>
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : null}
      {!loading && Icon ? (
        <Icon className="h-4 w-4" aria-hidden="true" />
      ) : null}
      {children}
      {showArrow ? (
        <ArrowRight
          className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-disabled={disabled || loading}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={classes}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
