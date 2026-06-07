const defaultSteps = [
  "Scanning input",
  "Finding impact",
  "Matching keywords",
  "Rewriting",
  "Preparing exports",
];

type LoadingIntelligenceStateProps = {
  steps?: string[];
};

export function LoadingIntelligenceState({ steps = defaultSteps }: LoadingIntelligenceStateProps) {
  return (
    <div className="command-panel scan-line p-4 text-white">
      <div className="gloss-content">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-100">AI process</p>
          <span className="score-orb h-2.5 w-2.5 rounded-full bg-mint-500" />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className="section-reveal rounded-2xl border border-white/10 bg-white/[0.08] px-3 py-2 text-sm font-semibold text-slate-200 shadow-line"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-mint-500 shadow-[0_0_14px_rgba(31,201,153,0.75)]" />
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
