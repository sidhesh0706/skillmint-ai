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
  const classes = clsx("button-primary", className);

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
