import type { Metadata } from "next";
import { CelestialBackground } from "@/components/celestial-background";
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
      <section className="cosmic-shell py-14 sm:py-20">
        <CelestialBackground intensity="section" />
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="mb-6">
                <TrustPills />
              </div>
              <SectionHeading
                eyebrow="Tools"
                title="Your application kit, organized by workflow."
                description="Generate resume bullets, review weak sections, match job descriptions, convert projects, and draft application assets without creating an account."
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["Resume", "Score and rewrite proof points"],
                ["Job match", "Find truthful keyword gaps"],
                ["Applications", "Draft assets faster"],
              ].map(([title, description]) => (
                <div key={title} className="metric-tile">
                  <p className="text-sm font-semibold uppercase text-mint-700">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-mint-700">Product suite</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink">
                All SkillMint tools in one place.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-600">
              Live tools are ready to use today. Coming-soon tools collect interest and point you
              toward the closest live workflow.
            </p>
          </div>
          <ToolGrid tools={tools} />
        </div>
      </section>
    </>
  );
}
