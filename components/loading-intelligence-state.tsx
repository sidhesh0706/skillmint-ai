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
    <div className="relative overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white p-4 shadow-soft">
      <div className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-mint-300/80 to-transparent" />
      <div className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full bg-mint-100/60 blur-3xl" />
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-700">
              Building output
            </p>
            <p className="mt-1 text-sm text-slate-500">Turning your notes into recruiter-ready structure.</p>
          </div>
          <span className="h-2.5 w-2.5 rounded-full bg-mint-500 shadow-[0_0_18px_rgba(31,201,153,0.55)]" />
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {steps.map((step, index) => (
            <div
              key={step}
              className="section-reveal rounded-2xl border border-slate-200 bg-[#FAFAF8] px-3 py-2 text-sm font-semibold text-slate-700 shadow-line"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-mint-500 shadow-[0_0_14px_rgba(31,201,153,0.55)]" />
              {step}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
