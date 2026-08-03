import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

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
  if (href) {
    return (
      <Button
        href={href}
        className={className}
        disabled={disabled}
      >
        {children}
      </Button>
    );
  }

  return (
    <Button
      type={type}
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={className}
    >
      {children}
    </Button>
  );
}
