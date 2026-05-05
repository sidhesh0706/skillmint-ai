"use client";

import { track } from "@vercel/analytics";

export type AnalyticsEventName =
  | "generate_click"
  | "regenerate_click"
  | "copy_click"
  | "download_click"
  | "email_signup_click"
  | "affiliate_click"
  | "score_generated"
  | "bullet_improved"
  | "compare_viewed";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(event: AnalyticsEventName, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") {
    return;
  }

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter((entry): entry is [string, string | number | boolean] => {
      const value = entry[1];
      return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
    }),
  );

  window.dataLayer?.push({
    event,
    ...cleanPayload,
  });

  track(event, cleanPayload);
}
