import { Check, Clipboard, Eye, Wand2 } from "lucide-react";
import { ScoreMeter } from "@/components/score-meter";
import { RewriteComparison } from "@/components/tool-workspace/rewrite-comparison";
import type {
  BulletComparison,
  BulletScore,
} from "@/components/tool-workspace/types";

type ResultCardProps = {
  index: number;
  bullet: string;
  score: BulletScore;
  comparison?: BulletComparison;
  comparisonExpanded: boolean;
  improving: boolean;
  copyConfirmed: boolean;
  onCopy: () => void;
  onImprove: () => void;
  onToggleComparison: () => void;
};

const breakdownItems: Array<[keyof BulletScore["breakdown"], string]> = [
  ["clarity", "Clarity"],
  ["impact", "Impact"],
  ["specificity", "Specificity"],
  ["metrics", "Metrics"],
  ["atsKeywordFit", "ATS fit"],
  ["actionVerbStrength", "Action verb"],
];

export function ResultCard({
  index,
  bullet,
  score,
  comparison,
  comparisonExpanded,
  improving,
  copyConfirmed,
  onCopy,
  onImprove,
  onToggleComparison,
}: ResultCardProps) {
  const comparisonId = `bullet-comparison-${index}`;

  return (
    <article
      className="result-card"
      style={{ animationDelay: `${Math.min(index * 70, 280)}ms` }}
    >
      <div className="min-w-0 flex-1">
        <div className="result-card-header">
          <div className="flex items-center gap-3">
            <span className="result-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="comparison-label">Resume bullet</p>
              <p className="mt-0.5 text-xs font-medium text-slate-500">
                Recruiter-ready draft
              </p>
            </div>
          </div>
          <div className="result-score-block">
            <ScoreMeter value={score.score} compact />
            <span className="score-chip" aria-hidden="true">
              {score.score}/100
            </span>
          </div>
        </div>

        <div className="result-copy">
          <p>{bullet}</p>
        </div>

        <div className="result-rationale">
          <div>
            <p className="comparison-label">Why it works</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {score.reason}
            </p>
          </div>
          <div>
            <p className="comparison-label">Next improvement</p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {score.suggestion}
            </p>
          </div>
        </div>

        <dl className="score-breakdown">
          {breakdownItems.map(([key, label]) => (
            <div key={key}>
              <dt>{label}</dt>
              <dd>{score.breakdown[key]}/100</dd>
            </div>
          ))}
        </dl>

        <div className="mt-4 flex flex-wrap gap-2">
          <button type="button" onClick={onCopy} className="result-action">
            {copyConfirmed ? (
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <Clipboard className="h-3.5 w-3.5" aria-hidden="true" />
            )}
            {copyConfirmed ? "Copied" : "Copy"}
          </button>
          <button
            type="button"
            onClick={onImprove}
            disabled={improving}
            className="result-action result-action-primary"
          >
            <Wand2 className="h-3.5 w-3.5" aria-hidden="true" />
            {improving ? "Strengthening..." : "Make stronger"}
          </button>
          {comparison ? (
            <button
              type="button"
              onClick={onToggleComparison}
              className="result-action"
              aria-expanded={comparisonExpanded}
              aria-controls={comparisonId}
            >
              <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              {comparisonExpanded ? "Hide comparison" : "Compare"}
            </button>
          ) : null}
        </div>
        {comparison && comparisonExpanded ? (
          <RewriteComparison id={comparisonId} comparison={comparison} />
        ) : null}
      </div>
    </article>
  );
}
