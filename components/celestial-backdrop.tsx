import { clsx } from "clsx";

type CelestialBackdropProps = {
  dark?: boolean;
  className?: string;
};

export function CelestialBackdrop({ dark = false, className }: CelestialBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}
    >
      <div
        className={clsx(
          "absolute inset-0",
          dark
            ? "bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:56px_56px]"
            : "bg-[linear-gradient(rgba(8,11,18,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(8,11,18,0.026)_1px,transparent_1px)] bg-[size:48px_48px]",
        )}
      />
      <div
        className={clsx(
          "absolute left-1/2 top-0 h-px w-[76%] -translate-x-1/2 bg-gradient-to-r from-transparent to-transparent",
          dark ? "via-mint-500/55" : "via-mint-500/35",
        )}
      />
      <div
        className={clsx(
          "absolute -top-40 left-1/2 h-80 w-[44rem] -translate-x-1/2 rounded-full blur-3xl",
          dark ? "bg-mint-500/12" : "bg-mint-500/8",
        )}
      />
    </div>
  );
}
