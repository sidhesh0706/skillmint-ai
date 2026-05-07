"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { trackEvent, type AnalyticsEventName } from "@/lib/analytics";

type TrackedLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "onClick"> & {
  children: ReactNode;
  eventName: AnalyticsEventName;
  eventPayload?: Record<string, string | number | boolean | undefined>;
};

export function TrackedLink({
  children,
  eventName,
  eventPayload,
  ...props
}: TrackedLinkProps) {
  return (
    <Link
      {...props}
      onClick={() => {
        trackEvent(eventName, eventPayload);
      }}
    >
      {children}
    </Link>
  );
}
