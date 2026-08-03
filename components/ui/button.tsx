import { clsx } from "clsx";
import Link from "next/link";
import type {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ReactNode,
} from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

const baseStyles =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border border-slate-950 bg-slate-950 text-white shadow-sm hover:bg-slate-800",
  secondary:
    "border border-slate-300 bg-white text-slate-900 shadow-sm hover:border-slate-400 hover:bg-slate-50",
  ghost:
    "border border-transparent bg-transparent text-slate-700 hover:bg-slate-100 hover:text-slate-950",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "min-h-10 px-4 py-2 text-sm",
  md: "min-h-11 px-5 py-2.5 text-sm",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return clsx(baseStyles, variantStyles[variant], sizeStyles[size], className);
}

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

type LinkButtonProps = SharedProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: ComponentPropsWithoutRef<typeof Link>["href"];
    disabled?: boolean;
  };

export function Button(props: ButtonProps | LinkButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;
  const classes = buttonStyles({ variant, size, className });

  if ("href" in props && props.href !== undefined) {
    const { href, disabled, onClick, ...linkProps } = props;

    return (
      <Link
        {...linkProps}
        href={href}
        className={classes}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : linkProps.tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }
          onClick?.(event);
        }}
      >
        {children}
      </Link>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonProps;

  return (
    <button {...buttonProps} type={type} className={classes}>
      {children}
    </button>
  );
}
