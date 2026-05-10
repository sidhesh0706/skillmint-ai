"use client";

import { useEffect } from "react";
import { monetizationConfig } from "@/config/monetization";
import { trackEvent } from "@/lib/analytics";

type AdSlotProps = {
  label: string;
};

export function AdSlot({ label }: AdSlotProps) {
  useEffect(() => {
    if (monetizationConfig.showAdSlots) {
      trackEvent("ad_slot_rendered_placeholder", { label });
    }
  }, [label]);

  if (!monetizationConfig.showAdSlots) {
    return null;
  }

  return (
    <aside className="min-h-24 rounded-lg border border-dashed border-slate-300 bg-white/70 p-4 text-center text-sm font-semibold text-slate-500">
      {label}
    </aside>
  );
}
