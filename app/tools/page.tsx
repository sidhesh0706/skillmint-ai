import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CelestialBackground } from "@/components/celestial-background";
import { CosmicGrid } from "@/components/cosmic-grid";
import { JsonLd } from "@/components/json-ld";
import { SectionHeading } from "@/components/section-heading";
import { ToolGrid } from "@/components/tool-grid";
import { TrustPills } from "@/components/trust-pills";
import { tools } from "@/data/tool-config";
import { breadcrumbSchema } from "@/lib/structured-data";

const toolGroups = [
  {
    title: "Resume",
    description: "Generate, score, roast, and convert proof points.",
    tools: tools.filter((tool) => ["Resume", "Resume Review", "Projects"].includes(tool.category)),
  },
  {
    title: "Job matching",
    description: "Compare your experience against roles and keyword gaps.",
    tools: tools.filter((tool) => tool.category === "Resume Targeting"),
  },
  {
    title: "LinkedIn",
    description: "Turn positioning into profile-ready copy.",
    tools: tools.filter((tool) => tool.category === "LinkedIn"),
  },
  {
    title: "Applications",
    description: "Draft assets that connect your background to the role.",
    tools: tools.filter((tool) => tool.category === "Applications" || tool.category === "Interview"),
  },
  {
    title: "Communication",
    description: "Handle professional follow-ups and replies faster.",
    tools: tools.filter((tool) => tool.category === "Productivity"),
  },
].filter((group) => group.tools.length);

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
        <CosmicGrid />
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="mb-6">
                <TrustPills />
              </div>
              <SectionHeading
                eyebrow="Tools"
                title="Your AI career toolkit."
                description="Generate resume bullets, review weak sections, match job descriptions, convert projects, and draft application assets without creating an account."
              />
              <Link href="/tools/resume-bullet-generator" className="button-primary mt-6">
                Start with resume bullets
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
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
          <div className="-mt-4 mb-10 overflow-hidden rounded-[1.75rem] bg-ink px-4 py-4 text-white shadow-[0_28px_90px_rgba(23,32,51,0.18)]">
            <div className="flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">
              {[
                "Resume Bullet Generator",
                "Resume Roast",
                "JD Match",
                "LinkedIn",
                "Cover Letter",
                "Apply",
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-3">
                  {item}
                  <span className="h-1.5 w-1.5 rounded-full bg-mint-300" />
                </span>
              ))}
            </div>
          </div>
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-mint-700">Product suite</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-ink">
                Follow the workflow from resume to application.
              </h2>
            </div>
            <p className="max-w-xl leading-7 text-slate-600">
              Live tools are ready to use today. Coming-soon tools collect interest and point you
              toward the closest live workflow.
            </p>
          </div>
          <div className="space-y-12">
            {toolGroups.map((group, index) => (
              <section key={group.title} className="scroll-mt-28">
                <div className="mb-5 grid gap-3 lg:grid-cols-[0.32fr_0.68fr] lg:items-end">
                  <div className="gloss-panel p-5">
                    <div className="gloss-content">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-sm font-semibold text-white">
                        {index + 1}
                      </span>
                      <h3 className="mt-4 text-2xl font-semibold text-ink">{group.title}</h3>
                      <p className="mt-2 leading-7 text-slate-600">{group.description}</p>
                    </div>
                  </div>
                  <ToolGrid tools={group.tools} />
                </div>
              </section>
            ))}
          </div>
          <div className="mt-12 rounded-[1.75rem] bg-ink p-6 text-white shadow-[0_28px_90px_rgba(23,32,51,0.18)] sm:p-8">
            <p className="text-sm font-semibold uppercase text-mint-100">Start your application kit</p>
            <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.035em]">
                Begin with one honest work note. Build the rest from there.
              </h2>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/tools/resume-bullet-generator" className="button-primary bg-white text-ink hover:bg-mint-50">
                  Generate bullets
                </Link>
                <Link href="/resources" className="button-secondary border-white/20 bg-white/[0.08] text-white hover:bg-white/15">
                  Browse resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
