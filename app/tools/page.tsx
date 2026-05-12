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

const toolGroups = [
  {
    title: "Resume",
    description: "Generate, score, roast, and improve resume proof points.",
    tools: tools.filter((tool) => ["Resume", "Resume Review", "Projects"].includes(tool.category)),
  },
  {
    title: "Job matching",
    description: "Compare your experience against target postings and keyword gaps.",
    tools: tools.filter((tool) => tool.category === "Resume Targeting"),
  },
  {
    title: "LinkedIn",
    description: "Turn resume positioning into profile-ready headline copy.",
    tools: tools.filter((tool) => tool.category === "LinkedIn"),
  },
  {
    title: "Applications",
    description: "Draft assets that connect your background to roles and companies.",
    tools: tools.filter((tool) => tool.category === "Applications" || tool.category === "Interview"),
  },
  {
    title: "Communication",
    description: "Professional replies and follow-up support for the search.",
    tools: tools.filter((tool) => tool.category === "Productivity"),
  },
].filter((group) => group.tools.length);

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
          <div className="mb-6 [&_span]:border-white/10 [&_span]:bg-white/[0.08] [&_span]:text-slate-100">
            <TrustPills />
          </div>
          <SectionHeading
            eyebrow="Tools"
            title="Practical AI tools for every step of your career search."
            description="Generate resume bullets, review weak sections, match job descriptions, convert projects, and draft application assets without creating an account."
            className="[&_h2]:text-white [&_p]:text-slate-300"
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell space-y-12">
          {toolGroups.map((group) => (
            <section key={group.title}>
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase text-mint-700">{group.title}</p>
                  <h2 className="mt-1 text-2xl font-semibold text-ink">{group.description}</h2>
                </div>
              </div>
              <ToolGrid tools={group.tools} />
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
