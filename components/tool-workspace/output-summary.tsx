import {
  BarChart3,
  CircleCheck,
  Download,
  KeyRound,
  ScanSearch,
} from "lucide-react";
import { AnimatedScoreBadge } from "@/components/animated-score-badge";
import { ScoreMeter } from "@/components/score-meter";
import type { ResumeStrengthSummary } from "@/components/tool-workspace/types";

type OutputSummaryProps = {
  summary: ResumeStrengthSummary;
  bulletCount: number;
  atsReadiness: number;
  missingKeywordCount: number;
};

export function OutputSummary({
  summary,
  bulletCount,
  atsReadiness,
  missingKeywordCount,
}: OutputSummaryProps) {
  const score = summary.overallScore || 0;
  const metrics = [
    {
      icon: CircleCheck,
      label: "Overall score",
      value: `${score}/100`,
    },
    {
      icon: ScanSearch,
      label: "ATS readiness",
      value: `${atsReadiness}/100`,
    },
    {
      icon: KeyRound,
      label: "Missing keywords",
      value: missingKeywordCount ? `${missingKeywordCount} found` : "No gaps",
    },
    {
      icon: Download,
      label: "Export status",
      value: bulletCount ? "Ready" : "Pending",
    },
  ];

  return (
    <section className="result-overview">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="workspace-label flex items-center gap-2">
            <BarChart3 className="h-4 w-4" aria-hidden="true" />
            Resume strength
          </p>
          <h3 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-slate-950">
            {score}/100
          </h3>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {summary.nextAction ||
              "Add truthful metrics and role-specific keywords to strengthen the draft."}
          </p>
        </div>
        <AnimatedScoreBadge
          score={`${score}/100`}
          label="Overall"
          className="shrink-0 border-emerald-200 bg-emerald-50 text-emerald-700"
        />
      </div>
      <ScoreMeter value={score} label="Overall strength" className="mt-5" />
      <dl className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.label} className="summary-metric">
              <Icon className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              <div>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            </div>
          );
        })}
      </dl>
    </section>
  );
}
