import { Sparkles } from "lucide-react";

type BrandMarkProps = {
  inverted?: boolean;
};

export function BrandMark({ inverted = false }: BrandMarkProps) {
  return (
    <span
      className={
        inverted
          ? "flex h-10 w-10 items-center justify-center rounded-lg bg-white text-ink shadow-line"
          : "flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-ink via-slate-800 to-mint-700 text-white shadow-line"
      }
      aria-hidden="true"
    >
      <Sparkles className="h-4 w-4" />
    </span>
  );
}
