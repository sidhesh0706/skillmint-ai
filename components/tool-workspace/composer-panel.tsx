import type { FormEvent, ReactNode } from "react";
import { FileText, ShieldCheck } from "lucide-react";

type ComposerPanelProps = {
  children: ReactNode;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export function ComposerPanel({ children, onSubmit }: ComposerPanelProps) {
  return (
    <form className="composer-panel" onSubmit={onSubmit}>
      <div className="composer-heading">
        <span className="composer-heading-icon">
          <FileText className="h-5 w-5" aria-hidden="true" />
        </span>
        <div>
          <p className="workspace-label">Input composer</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
            Build your draft
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Add the shortest truthful version of your work. SkillMint handles
            structure, keywords, and recruiter-ready phrasing.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">{children}</div>

      <p className="privacy-note">
        <ShieldCheck className="h-4 w-4" aria-hidden="true" />
        Saved only in your browser. No account required.
      </p>
    </form>
  );
}
