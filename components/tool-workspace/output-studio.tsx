import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw, Sparkles } from "lucide-react";

type OutputStudioProps = {
  title: string;
  description: string;
  hasOutput: boolean;
  isGenerating: boolean;
  onRegenerate: () => void;
  actions: ReactNode;
  children: ReactNode;
};

export function OutputStudio({
  title,
  description,
  hasOutput,
  isGenerating,
  onRegenerate,
  actions,
  children,
}: OutputStudioProps) {
  return (
    <section className="output-studio" aria-live="polite">
      <header className="output-studio-header">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="relative z-10">
            <p className="workspace-kicker">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              Resume bullet analysis
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              {title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              {description}
            </p>
          </div>
          {hasOutput ? (
            <div className="relative z-10 flex flex-wrap gap-2 sm:justify-end">
              <button
                type="button"
                onClick={onRegenerate}
                disabled={isGenerating}
                className="workspace-action"
                aria-label="Regenerate bullets using the current job description"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Tailor to JD
              </button>
              <Link
                href="/tools/cover-letter-generator"
                className="workspace-action workspace-action-primary"
              >
                Cover letter
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          ) : null}
        </div>
        <div className="output-export-strip">{actions}</div>
      </header>
      <div className="output-studio-body">{children}</div>
    </section>
  );
}
