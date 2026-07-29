import {
  ArrowUpRight,
  Blocks,
  ChartNoAxesCombined,
  Headphones,
  Users,
} from "lucide-react";
import type { ToolFormValues } from "@/data/tool-config";

type Preset = {
  label: string;
  values: ToolFormValues;
};

type PresetPickerProps = {
  presets: Preset[];
  selectedLabel?: string;
  onApply: (values: ToolFormValues, label: string) => void;
  getDescription: (values: ToolFormValues) => string;
};

const presetIcons = [Blocks, ChartNoAxesCombined, Headphones, Users];

export function PresetPicker({
  presets,
  selectedLabel,
  onApply,
  getDescription,
}: PresetPickerProps) {
  return (
    <section className="preset-picker">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="workspace-label">Quick start</p>
          <h3 className="mt-1 text-sm font-semibold text-slate-950">
            Load a realistic example
          </h3>
        </div>
        <span className="hidden text-xs text-slate-500 sm:block">
          Fully editable
        </span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {presets.map((preset, index) => {
          const Icon = presetIcons[index % presetIcons.length];

          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onApply(preset.values, preset.label)}
              className={`preset-card group ${
                selectedLabel === preset.label ? "is-selected" : ""
              }`}
              aria-pressed={selectedLabel === preset.label}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="preset-icon">
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-3 flex items-center justify-between gap-2 text-xs font-semibold text-slate-950">
                {preset.label}
                {selectedLabel === preset.label ? (
                  <span className="preset-selected-label">Applied</span>
                ) : null}
              </span>
              <span className="mt-1 block truncate text-[11px] font-medium text-slate-500">
                {getDescription(preset.values)}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
