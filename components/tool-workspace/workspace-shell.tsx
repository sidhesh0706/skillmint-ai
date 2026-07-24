import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

type WorkspaceStat = {
  label: string;
  value: string;
};

type WorkspaceShellProps = {
  title: string;
  description: string;
  stats: WorkspaceStat[];
  composer: ReactNode;
  studio: ReactNode;
};

export function WorkspaceShell({
  title,
  description,
  stats,
  composer,
  studio,
}: WorkspaceShellProps) {
  return (
    <div className="workspace-product relative z-10">
      <header className="workspace-toolbar">
        <div className="min-w-0">
          <p className="workspace-kicker">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            Resume workspace
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] text-slate-950 sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        </div>
        <dl className="workspace-stats">
          {stats.map((stat) => (
            <div key={stat.label} className="workspace-stat">
              <dt>{stat.label}</dt>
              <dd title={stat.value}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      </header>

      <div className="workspace-columns">
        <div className="workspace-composer-column">{composer}</div>
        <div className="workspace-studio-column">{studio}</div>
      </div>
    </div>
  );
}
