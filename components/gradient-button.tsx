import { clsx } from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

type GradientButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function GradientButton({
  children,
  className,
  href,
  type = "button",
  disabled,
  onClick,
}: GradientButtonProps) {
  const classes = clsx("button-primary motion-button", className);

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
          }
        }}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
