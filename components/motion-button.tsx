import { ArrowRight, Loader2, type LucideIcon } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "@/components/ui/button";

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
          className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  const buttonVariant =
    variant === "danger" ? "secondary" : variant === "ghost" ? "ghost" : variant;
  const dangerClasses =
    variant === "danger"
      ? "border-red-200 bg-red-50 text-red-700 hover:border-red-300 hover:bg-red-100"
      : undefined;

  if (href) {
    return (
      <Button
        href={href}
        variant={buttonVariant}
        size={compact ? "sm" : "md"}
        className={`${dangerClasses || ""} ${className || ""}`}
        disabled={disabled || loading}
      >
        {content}
      </Button>
    );
  }

  return (
    <Button
      type={type}
      disabled={disabled || loading}
      aria-busy={loading}
      variant={buttonVariant}
      size={compact ? "sm" : "md"}
      className={`${dangerClasses || ""} ${className || ""}`}
      {...buttonProps}
    >
      {content}
    </Button>
  );
}
