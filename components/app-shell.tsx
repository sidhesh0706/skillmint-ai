import { clsx } from "clsx";
import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  className?: string;
  narrow?: boolean;
};

export function AppShell({
  children,
  className,
  narrow = false,
}: AppShellProps) {
  return (
    <div className={clsx("app-canvas", className)}>
      <div
        className={clsx(
          "mx-auto w-full px-4 sm:px-6 lg:px-8",
          narrow ? "max-w-5xl" : "max-w-7xl",
        )}
      >
        {children}
      </div>
    </div>
  );
}
