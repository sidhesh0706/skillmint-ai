import type { LucideIcon } from "lucide-react";

type WorkflowOrbitProps = {
  steps: Array<{
    title: string;
    description: string;
    icon?: LucideIcon;
  }>;
};

export function WorkflowOrbit({ steps }: WorkflowOrbitProps) {
  return (
    <div className="relative mt-10 grid gap-4 md:grid-cols-5">
      <div className="pointer-events-none absolute left-8 right-8 top-10 hidden h-px bg-gradient-to-r from-transparent via-mint-300/70 to-transparent md:block" />
      {steps.map((step, index) => {
        const Icon = step.icon;

        return (
          <article key={step.title} className="gloss-panel hover-gloss p-5">
            <div className="gloss-content">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white shadow-[0_0_24px_rgba(31,201,153,0.18)]">
                {Icon ? <Icon className="h-4 w-4" aria-hidden="true" /> : index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 leading-7 text-slate-600">{step.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
