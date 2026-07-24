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
  | "compare_viewed"
  | "homepage_cta_click"
  | "seo_page_cta_click"
  | "tool_form_started"
  | "generation_success"
  | "export_used"
  | "history_reopened"
  | "share_click"
  | "page_view"
  | "tool_generate_clicked"
  | "tool_generate_success"
  | "tool_generate_error"
  | "bullet_copied"
  | "export_txt_clicked"
  | "export_markdown_clicked"
  | "email_signup_submitted"
  | "affiliate_card_clicked"
  | "seo_cta_clicked"
  | "tool_started"
  | "tool_completed"
  | "resume_roast_completed"
  | "jd_match_completed"
  | "project_to_resume_completed"
  | "copy_clicked"
  | "export_clicked"
  | "application_kit_cta_clicked"
  | "email_capture_viewed"
  | "affiliate_click"
  | "ad_slot_rendered_placeholder"
  | "coming_soon_vote_clicked";

type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function trackEvent(
  event: AnalyticsEventName,
  payload: AnalyticsPayload = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const cleanPayload = Object.fromEntries(
      Object.entries(payload).filter(
        (entry): entry is [string, string | number | boolean] => {
          const value = entry[1];
          return (
            typeof value === "string" ||
            typeof value === "number" ||
            typeof value === "boolean"
          );
        },
      ),
    );

    window.dataLayer?.push({
      event,
      ...cleanPayload,
    });

    track(event, cleanPayload);
  } catch {
    // Analytics should never block generation, exports, or navigation.
  }
}
