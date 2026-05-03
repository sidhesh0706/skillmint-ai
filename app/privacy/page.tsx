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
            SkillMint AI is designed to help users create career assets with
            minimal data collection. This policy explains the current first
            version of the product.
          </p>
          <p>
            Resume generator inputs are sent to our secure server route so the AI
            provider can generate results. API keys are never exposed in the browser.
            Avoid entering sensitive personal data that is not needed for a resume bullet.
          </p>
          <p>
            Email signup is currently stored in your browser local storage only.
            No email database or mailing provider is connected yet.
          </p>
          <p>
            SkillMint AI may add analytics, email delivery, and monetization
            integrations later. This policy should be updated before those services
            are enabled in production.
          </p>
          <p>
            For privacy questions, contact us through the contact page.
          </p>
        </div>
      </div>
    </section>
  );
}
