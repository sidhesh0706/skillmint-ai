import type { Metadata } from "next";
import { StaticPageFrame } from "@/components/static-page-frame";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "Terms of use for SkillMint AI career tools and AI-generated resume content.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  const sections = [
    {
      title: "Drafting support",
      body: (
        <p>
          SkillMint AI provides career writing tools for drafting and editing.
          Generated content should be reviewed before use in resumes, profiles,
          applications, or professional communication.
        </p>
      ),
    },
    {
      title: "Truthfulness",
      body: (
        <>
          <p>
            You are responsible for ensuring that your final resume content is
            truthful, accurate, and appropriate for your background.
          </p>
          <p>
            Do not use SkillMint AI to create misleading claims, impersonate
            another person, or submit false qualifications.
          </p>
        </>
      ),
    },
    {
      title: "No guarantees",
      body: (
        <p>
          The service is provided as-is. We do not guarantee job interviews,
          offers, recruiter responses, or application outcomes.
        </p>
      ),
    },
    {
      title: "Resources",
      body: (
        <p>
          SkillMint may show recommended resources, affiliate links, or disabled
          ad placements when configured. These should be treated as optional
          resources, not guarantees of outcomes.
        </p>
      ),
    },
  ];

  return (
    <StaticPageFrame
      eyebrow="Legal"
      title="Terms of Use"
      description="SkillMint helps with drafting and editing. You stay responsible for accuracy, truthfulness, and final use."
      sections={sections}
    />
  );
}
