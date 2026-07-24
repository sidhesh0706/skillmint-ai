import { AlertTriangle, KeyRound, Sparkles } from "lucide-react";
import { KeywordChip } from "@/components/keyword-chip";

type KeywordIntelligenceProps = {
  included: string[];
  missing: string[];
  actionVerbs: string[];
};

export function KeywordIntelligence({
  included,
  missing,
  actionVerbs,
}: KeywordIntelligenceProps) {
  if (!included.length && !missing.length && !actionVerbs.length) {
    return null;
  }

  return (
    <section className="keyword-intelligence">
      <div className="keyword-intelligence-heading">
        <div>
          <p className="workspace-label flex items-center gap-2">
            <KeyRound className="h-4 w-4" aria-hidden="true" />
            Keyword intelligence
          </p>
          <h3 className="mt-1 text-xl font-semibold text-slate-950">
            Language recruiters and ATS systems scan
          </h3>
        </div>
        <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500">
          Truth-first
        </span>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="keyword-group">
          <p className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Included
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {included.map((keyword, index) => (
              <KeywordChip
                key={keyword}
                style={{ animationDelay: `${index * 45}ms` }}
              >
                {keyword}
              </KeywordChip>
            ))}
          </div>
        </div>

        <div className="keyword-group keyword-group-warning">
          <p className="flex items-center gap-2 text-xs font-semibold text-amber-700">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Missing, only add if truthful
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {missing.map((keyword, index) => (
              <KeywordChip
                key={keyword}
                className="border-amber-200 bg-white text-amber-700"
                style={{ animationDelay: `${index * 45}ms` }}
              >
                {keyword}
              </KeywordChip>
            ))}
          </div>
        </div>

        <div className="keyword-group">
          <p className="text-xs font-semibold text-slate-700">
            Stronger action verbs
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {actionVerbs.map((verb) => (
              <span key={verb} className="action-verb-chip">
                {verb}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
