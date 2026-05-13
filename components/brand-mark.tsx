type BrandMarkProps = {
  inverted?: boolean;
};

export function BrandMark({ inverted = false }: BrandMarkProps) {
  return (
    <span
      className={
        inverted
          ? "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white text-ink shadow-line"
          : "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-ink text-white shadow-[0_14px_32px_rgba(23,32,51,0.18)]"
      }
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(31,201,153,0.55),transparent_38%),linear-gradient(135deg,transparent,rgba(255,255,255,0.10))]" />
      <span className="relative flex h-5 w-5 items-center justify-center rounded-md border border-white/20 bg-white/10 text-[11px] font-bold tracking-[-0.08em]">
        S
      </span>
    </span>
  );
}
