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
    <div className="sticky bottom-3 z-20 rounded-[1.5rem] border border-slate-200 bg-white/[0.92] p-2 shadow-[0_22px_80px_rgba(23,32,51,0.16)] backdrop-blur-xl sm:rounded-full">
      <div className="flex flex-wrap justify-center gap-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              type="button"
              onClick={action.onClick}
              disabled={action.disabled}
              className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-slate-700 transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-mint-50 hover:text-mint-700 focus:outline-none focus:ring-4 focus:ring-mint-100 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
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
