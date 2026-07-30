import {
  ArrowRight,
  CheckCircle2,
  Play,
  Sparkles,
  TrendingUp,
} from "lucide-react";

type EmptyPreviewProps = {
  title: string;
  description: string;
  onTrySample: () => void;
};

const checks = ["Clarity", "Impact", "Metrics", "ATS keywords", "Truthfulness"];

export function EmptyPreview({
  title,
  description,
  onTrySample,
}: EmptyPreviewProps) {
  return (
    <section className="empty-report">
      <div className="empty-report-heading">
        <div>
          <p className="workspace-label flex items-center gap-2">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Live output preview
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-slate-950">
            {title}
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
        <button
          type="button"
          onClick={onTrySample}
          className="workspace-action empty-sample-action"
        >
          <Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
          Try sample
        </button>
      </div>

      <div className="empty-transformation">
        <article className="empty-note">
          <span>Before</span>
          <p>Made dashboard for sales data.</p>
          <div
            className="empty-score is-before"
            aria-label="Starting score: 68 out of 100"
          >
            <span aria-hidden="true">68/100</span>
            <div>
              <span style={{ width: "68%" }} />
            </div>
          </div>
        </article>

        <div className="empty-transform-arrow" aria-hidden="true">
          <ArrowRight className="h-4 w-4" />
        </div>

        <article className="empty-note is-improved">
          <div className="flex items-center justify-between gap-3">
            <span>Recruiter-ready</span>
            <span className="empty-ready-badge">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              +23 points
            </span>
          </div>
          <p>
            Built a sales dashboard using SQL and Excel to track weekly pipeline
            trends and identify underperforming regions faster.
          </p>
          <div
            className="empty-score is-after"
            aria-label="Improved score: 91 out of 100"
          >
            <span aria-hidden="true">91/100</span>
            <div>
              <span style={{ width: "91%" }} />
            </div>
          </div>
        </article>
      </div>

      <div className="empty-insight-row">
        <div>
          <p className="comparison-label">Detected keywords</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["SQL", "Excel", "pipeline analysis"].map((keyword, index) => (
              <span
                key={keyword}
                className="keyword-chip empty-keyword"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
        <div className="empty-checklist">
          {checks.map((item, index) => (
            <span
              key={item}
              className="keyword-chip"
              style={{ animationDelay: `${(index + 3) * 55}ms` }}
            >
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
