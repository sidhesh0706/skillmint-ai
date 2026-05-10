import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for SkillMint AI, including how tool inputs and email signups are handled.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-shell max-w-3xl">
        <p className="text-sm font-semibold uppercase text-mint-700">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">Privacy Policy</h1>
        <div className="mt-8 space-y-6 leading-7 text-slate-600">
          <p>
            SkillMint AI is designed to help users create career assets with minimal data
            collection, no required account, and clear privacy-first defaults.
          </p>
          <p>
            Tool inputs are sent through secure server-side API routes so an AI provider can
            generate or improve outputs. API keys are never exposed in the browser. Avoid entering
            sensitive personal data that is not needed for resume, LinkedIn, or application content.
          </p>
          <p>
            SkillMint uses browser local storage for convenience features such as saved form inputs,
            recent generations, email prompt suppression, and local email capture fallback. You can
            clear this data from your browser settings.
          </p>
          <p>
            Analytics may be used to understand page views and product actions. Analytics wrappers
            are designed so they do not interrupt the app if a provider is unavailable.
          </p>
          <p>
            Email capture is currently handled as a local fallback unless a future email provider is
            connected. If email delivery is enabled later, submitted emails may be sent to that
            provider for product updates and resume resources.
          </p>
          <p>
            SkillMint may show recommended resources or affiliate links. Ads and ad cookies are only
            intended to run when explicitly enabled through configuration; ads are disabled by
            default.
          </p>
          <p>
            For privacy questions, contact us through the contact page.
          </p>
        </div>
      </div>
    </section>
  );
}
