import { clsx } from "clsx";

type CosmicGridProps = {
  className?: string;
};

export function CosmicGrid({ className }: CosmicGridProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        "bg-[linear-gradient(rgba(15,23,42,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-[size:44px_44px]",
        "[mask-image:radial-gradient(circle_at_50%_18%,black,transparent_74%)]",
        className,
      )}
    />
  );
}
