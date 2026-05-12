import { clsx } from "clsx";

type CelestialBackgroundProps = {
  className?: string;
  intensity?: "hero" | "section" | "subtle";
};

export function CelestialBackground({
  className,
  intensity = "section",
}: CelestialBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        intensity === "hero" && "celestial-hero",
        intensity === "section" && "celestial-section",
        intensity === "subtle" && "celestial-subtle",
        className,
      )}
    >
      <div className="starfield" />
      <div className="orbital-ring left-[58%] top-16 h-80 w-80" />
      <div className="orbital-ring -left-24 bottom-12 h-64 w-64 opacity-50" />
      <div className="cosmic-noise" />
    </div>
  );
}
