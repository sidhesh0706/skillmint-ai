import type { LucideIcon } from "lucide-react";

type OutputActionBarProps = {
  actions: Array<{
    label: string;
    icon: LucideIcon;
    onClick?: () => void;
    disabled?: boolean;
  }>;
};

export function OutputActionBar({ actions }: OutputActionBarProps) {
  return (
    <div className="sticky bottom-3 z-20 rounded-full border border-slate-200 bg-white/[0.88] p-2 shadow-[0_20px_70px_rgba(23,32,51,0.14)] backdrop-blur-xl">
      <div className="flex flex-wrap justify-center gap-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              disabled={action.disabled}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-mint-50 hover:text-mint-700 disabled:cursor-not-allowed disabled:opacity-45"
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
