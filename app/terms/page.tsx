import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for SkillMint AI career tools and AI-generated resume content.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <section className="py-14 sm:py-20">
      <div className="container-shell max-w-3xl">
        <p className="text-sm font-semibold uppercase text-mint-700">Legal</p>
        <h1 className="mt-3 text-4xl font-semibold text-ink">Terms of Use</h1>
        <div className="mt-8 space-y-6 leading-7 text-slate-600">
          <p>
            SkillMint AI provides career writing tools for drafting and editing.
            Generated content should be reviewed before use in resumes, profiles,
            applications, or professional communication.
          </p>
          <p>
            You are responsible for ensuring that your final resume content is
            truthful, accurate, and appropriate for your background.
          </p>
          <p>
            The service is provided as-is. We do not guarantee job interviews,
            offers, recruiter responses, or application outcomes.
          </p>
          <p>
            Do not use SkillMint AI to create misleading claims, impersonate
            another person, or submit false qualifications.
          </p>
          <p>
            These terms may be updated as the product adds accounts, payments,
            analytics, or additional integrations.
          </p>
        </div>
      </div>
    </section>
  );
}
