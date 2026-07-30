"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Sparkles } from "lucide-react";

type LoadingSequenceProps = {
  steps: string[];
};

export function LoadingSequence({ steps }: LoadingSequenceProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setActiveStep(0);
    const timer = window.setInterval(() => {
      setActiveStep((current) => Math.min(current + 1, steps.length - 1));
    }, 850);

    return () => window.clearInterval(timer);
  }, [steps]);

  const progress = ((activeStep + 1) / steps.length) * 100;

  return (
    <section className="loading-report" aria-label="Generating resume bullets">
      <div className="loading-report-heading">
        <div>
          <p className="workspace-label flex items-center gap-2">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Resume bullet analysis in progress
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] text-slate-950">
            Building your recruiter-ready report
          </h3>
        </div>
        <span
          className="loading-percent"
          aria-label={`${Math.round(progress)} percent complete`}
        >
          {Math.round(progress)}%
        </span>
      </div>

      <div className="loading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      <ol className="loading-steps">
        {steps.map((step, index) => {
          const complete = index < activeStep;
          const active = index === activeStep;

          return (
            <li
              key={step}
              className={`${complete ? "is-complete" : ""} ${
                active ? "is-active" : ""
              }`}
            >
              <span className="loading-step-icon">
                {complete ? (
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                ) : active ? (
                  <Loader2
                    className="h-3.5 w-3.5 animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  index + 1
                )}
              </span>
              <span>
                <strong>{step}</strong>
                <small>
                  {complete ? "Complete" : active ? "In progress" : "Queued"}
                </small>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="loading-skeletons" aria-hidden="true">
        {[0, 1].map((item) => (
          <div key={item} className="loading-result-skeleton">
            <div className="flex items-center justify-between gap-4">
              <span className="skeleton-line w-20" />
              <span className="skeleton-pill" />
            </div>
            <span className="skeleton-line mt-4 w-full" />
            <span className="skeleton-line mt-2 w-4/5" />
            <div className="mt-4 grid grid-cols-3 gap-2">
              <span className="skeleton-box" />
              <span className="skeleton-box" />
              <span className="skeleton-box" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
