import type { Metadata } from "next";
import { StaticPageFrame } from "@/components/static-page-frame";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for SkillMint AI, including how tool inputs and email signups are handled.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  const sections = [
    {
      title: "Privacy-first defaults",
      body: (
        <p>
          SkillMint AI is designed to help users create career assets with
          minimal data collection, no required account, and clear privacy-first
          defaults.
        </p>
      ),
    },
    {
      title: "AI generation",
      body: (
        <p>
          Tool inputs are sent through secure server-side API routes so an AI
          provider can generate or improve outputs. API keys are never exposed
          in the browser. Avoid entering sensitive personal data that is not
          needed for resume, LinkedIn, or application content.
        </p>
      ),
    },
    {
      title: "Browser storage",
      body: (
        <p>
          SkillMint uses browser local storage for convenience features such as
          saved form inputs, recent generations, email prompt suppression, and
          local email capture fallback. You can clear this data from your
          browser settings.
        </p>
      ),
    },
    {
      title: "Analytics and resources",
      body: (
        <>
          <p>
            Analytics may be used to understand page views and product actions.
            Analytics wrappers are designed so they do not interrupt the app if
            a provider is unavailable.
          </p>
          <p>
            SkillMint may show recommended resources or affiliate links. Ads and
            ad cookies are only intended to run when explicitly enabled through
            configuration; ads are disabled by default.
          </p>
        </>
      ),
    },
    {
      title: "Contact",
      body: <p>For privacy questions, contact us through the contact page.</p>,
    },
  ];

  return (
    <StaticPageFrame
      eyebrow="Legal"
      title="Privacy Policy"
      description="How SkillMint handles AI inputs, browser storage, analytics, and optional resource recommendations."
      sections={sections}
    />
  );
}
