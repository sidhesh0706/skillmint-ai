import { clsx } from "clsx";
import { Clipboard, Wand2 } from "lucide-react";
import { KeywordChip } from "@/components/keyword-chip";
import { MotionButton } from "@/components/motion-button";
import { ScoreMeter } from "@/components/score-meter";

type OutputCardProps = {
  index?: number;
  text: string;
  score?: number;
  reason?: string;
  suggestion?: string;
  keywords?: string[];
  onCopy?: () => void;
  onImprove?: () => void;
  className?: string;
};

export function OutputCard({
  index,
  text,
  score,
  reason,
  suggestion,
  keywords = [],
  onCopy,
  onImprove,
  className,
}: OutputCardProps) {
  return (
    <article className={clsx("output-card-pro p-4", className)}>
      <div className="flex gap-3">
        {typeof index === "number" ? (
          <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
            {index + 1}
          </span>
        ) : null}
        <div className="min-w-0 flex-1">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_9rem] md:items-start">
            <p className="text-sm leading-6 text-slate-700 sm:text-base sm:leading-7">
              {text}
            </p>
            {typeof score === "number" ? (
              <ScoreMeter value={score} label="Score" compact />
            ) : null}
          </div>

          {reason || suggestion ? (
            <div className="mt-4 grid gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm leading-6 text-slate-600 lg:grid-cols-2">
              {reason ? (
                <p>
                  <span className="font-semibold text-ink">Why it works:</span>{" "}
                  {reason}
                </p>
              ) : null}
              {suggestion ? (
                <p>
                  <span className="font-semibold text-ink">
                    Next improvement:
                  </span>{" "}
                  {suggestion}
                </p>
              ) : null}
            </div>
          ) : null}

          {keywords.length ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {keywords.slice(0, 5).map((keyword, chipIndex) => (
                <KeywordChip
                  key={keyword}
                  style={{ animationDelay: `${chipIndex * 70}ms` }}
                >
                  {keyword}
                </KeywordChip>
              ))}
            </div>
          ) : null}

          {onCopy || onImprove ? (
            <div className="mt-4 flex flex-wrap gap-2">
              {onCopy ? (
                <MotionButton
                  compact
                  variant="secondary"
                  icon={Clipboard}
                  onClick={onCopy}
                >
                  Copy
                </MotionButton>
              ) : null}
              {onImprove ? (
                <MotionButton
                  compact
                  variant="secondary"
                  icon={Wand2}
                  onClick={onImprove}
                >
                  Improve
                </MotionButton>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
