import { Lightbulb } from "lucide-react";
import type { ReactNode } from "react";

type InsightPanelProps = {
  title: string;
  children: ReactNode;
};

export function InsightPanel({ title, children }: InsightPanelProps) {
  return (
    <div className="rounded-[1.5rem] border border-amber-200 bg-[linear-gradient(135deg,rgba(255,251,235,0.94),rgba(255,255,255,0.78))] p-4 shadow-[0_20px_70px_rgba(180,83,9,0.10)]">
      <p className="flex items-center gap-2 text-sm font-semibold text-amber-800">
        <Lightbulb className="h-4 w-4" aria-hidden="true" />
        {title}
      </p>
      <div className="mt-3">{children}</div>
    </div>
  );
}
