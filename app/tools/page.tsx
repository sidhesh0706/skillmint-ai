import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { ToolGrid } from "@/components/tool-grid";
import { TrustPills } from "@/components/trust-pills";
import { tools } from "@/data/tool-config";
import { breadcrumbSchema } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: "AI Career Tools",
  description:
    "Browse SkillMint AI tools for resumes, cover letters, LinkedIn profiles, interview preparation, and professional email replies.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "AI Career Tools | SkillMint AI",
    description:
      "Browse SkillMint AI tools for resumes, cover letters, LinkedIn profiles, interview preparation, and professional email replies.",
    url: "/tools",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SkillMint AI career tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Career Tools | SkillMint AI",
    description:
      "Browse free AI career tools for modern job seekers and professionals.",
    images: ["/opengraph-image"],
  },
};

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Tools", path: "/tools" },
        ])}
      />
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(130deg,rgba(31,201,153,0.14),transparent_38%),linear-gradient(230deg,rgba(245,158,11,0.10),transparent_32%)]" />
        <div className="container-shell">
          <div className="mb-6">
            <TrustPills />
          </div>
          <SectionHeading
            eyebrow="Tools"
            title="Practical AI tools for every step of your career search."
            description="Generate resume bullets, review weak sections, match job descriptions, convert projects, and draft application assets without creating an account."
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <ToolGrid tools={tools} />
        </div>
      </section>
    </>
  );
}
