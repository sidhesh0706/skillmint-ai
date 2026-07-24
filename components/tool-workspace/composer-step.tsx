import type { ReactNode } from "react";
import { Check } from "lucide-react";

type ComposerStepProps = {
  step: number;
  title: string;
  description: string;
  children: ReactNode;
  complete?: boolean;
};

export function ComposerStep({
  step,
  title,
  description,
  children,
  complete = false,
}: ComposerStepProps) {
  return (
    <section className="composer-module">
      <div className="flex items-start gap-3">
        <span className={`composer-step ${complete ? "is-complete" : ""}`}>
          {complete ? (
            <Check className="h-4 w-4" aria-hidden="true" />
          ) : (
            step
          )}
        </span>
        <div>
          <h3 className="text-sm font-semibold text-slate-950">{title}</h3>
          <p className="mt-1 text-xs leading-5 text-slate-500">
            {description}
          </p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">{children}</div>
    </section>
  );
}
