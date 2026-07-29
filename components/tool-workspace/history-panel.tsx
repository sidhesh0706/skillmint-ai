import { Clock3, History, Trash2 } from "lucide-react";
import type { GenerationHistoryItem } from "@/components/tool-workspace/types";

type HistoryPanelProps = {
  items: GenerationHistoryItem[];
  onOpen: (item: GenerationHistoryItem) => void;
  onClear: () => void;
};

export function HistoryPanel({ items, onOpen, onClear }: HistoryPanelProps) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="history-panel">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="workspace-label flex items-center gap-2">
            <History className="h-4 w-4" aria-hidden="true" />
            Recent generations
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Saved locally for quick reuse while you apply.
          </p>
        </div>
        <button type="button" onClick={onClear} className="history-clear">
          <Trash2 className="h-4 w-4" aria-hidden="true" />
          Clear
        </button>
      </div>
      <div className="mt-4 grid gap-2 md:grid-cols-2">
        {items.slice(0, 6).map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(item)}
            className="history-item"
          >
            <span className="flex items-center justify-between gap-3">
              <span className="font-semibold text-slate-950">{item.role}</span>
              <Clock3
                className="h-3.5 w-3.5 shrink-0 text-slate-400"
                aria-hidden="true"
              />
            </span>
            <span className="mt-2 line-clamp-2 block text-xs leading-5 text-slate-500">
              {item.output.bullets[0] ||
                "Resume bullets saved in this browser."}
            </span>
            <span className="mt-3 block text-[11px] font-semibold text-emerald-700">
              {new Intl.DateTimeFormat(undefined, {
                dateStyle: "medium",
                timeStyle: "short",
              }).format(new Date(item.createdAt))}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
