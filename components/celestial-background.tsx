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
      {intensity === "hero" ? <div className="starfield opacity-10" /> : null}
      <div className="orbital-ring left-[62%] top-16 h-80 w-80 opacity-35" />
      <div className="cosmic-noise" />
    </div>
  );
}
