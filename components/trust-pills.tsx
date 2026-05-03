import { CheckCircle2 } from "lucide-react";
import { clsx } from "clsx";

const defaultPills = ["Free to use", "No signup required", "ATS-friendly outputs"];

type TrustPillsProps = {
  items?: string[];
  centered?: boolean;
};

export function TrustPills({ items = defaultPills, centered = false }: TrustPillsProps) {
  return (
    <div className={clsx("flex flex-wrap gap-2", centered && "justify-center")}>
      {items.map((item) => (
        <span
          key={item}
          className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/[0.78] px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-line backdrop-blur"
        >
          <CheckCircle2 className="h-4 w-4 text-mint-700" aria-hidden="true" />
          {item}
        </span>
      ))}
    </div>
  );
}
