import { monetizationConfig } from "@/config/monetization";

type AdSlotProps = {
  label: string;
};

export function AdSlot({ label }: AdSlotProps) {
  if (!monetizationConfig.showAdSlots) {
    return null;
  }

  return (
    <aside className="rounded-lg border border-dashed border-slate-300 bg-white/70 p-4 text-center text-sm font-semibold text-slate-500">
      {label}
    </aside>
  );
}
