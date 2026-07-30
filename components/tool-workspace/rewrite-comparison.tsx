import { ArrowRight, CheckCircle2 } from "lucide-react";
import type { BulletComparison } from "@/components/tool-workspace/types";

type RewriteComparisonProps = {
  id?: string;
  comparison: BulletComparison;
};

export function RewriteComparison({ id, comparison }: RewriteComparisonProps) {
  return (
    <div id={id} className="rewrite-comparison">
      <div className="rewrite-before">
        <p className="comparison-label">Original</p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {comparison.original}
        </p>
      </div>
      <div className="rewrite-direction" aria-hidden="true">
        <ArrowRight className="h-4 w-4" />
      </div>
      <div className="rewrite-after">
        <p className="comparison-label flex items-center gap-2 text-emerald-700">
          <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
          Improved
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-800">
          {comparison.improved}
        </p>
      </div>
      <div className="col-span-full border-t border-slate-200 pt-3">
        <p className="comparison-label">What changed</p>
        <ul className="mt-2 grid gap-1 text-sm leading-6 text-slate-600 sm:grid-cols-2">
          {comparison.changes.map((change) => (
            <li key={change} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
              {change}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
