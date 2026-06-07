import type { Metadata } from "next";
import {
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Route,
  Target,
} from "lucide-react";
import { CommandPanel } from "@/components/command-panel";
import { JsonLd } from "@/components/json-ld";
import { MotionButton } from "@/components/motion-button";
import { ProductCard } from "@/components/product-card";
import { tools, getToolHref, type ToolConfig } from "@/data/tool-config";
import { breadcrumbSchema } from "@/lib/structured-data";

const workflowSteps = [
  {
    title: "Resume bullets",
    description: "Turn rough notes into measurable proof.",
  },
  {
    title: "Resume roast",
    description: "Catch weak phrasing before recruiters do.",
  },
  {
    title: "JD match",
    description: "Find truthful keyword gaps.",
  },
  {
    title: "LinkedIn",
    description: "Reuse your strongest positioning.",
  },
  {
    title: "Cover letter",
    description: "Connect proof to the target role.",
  },
  {
    title: "Apply",
    description: "Export clean copy for applications.",
  },
];

const workflowGroups = [
  {
    title: "Resume",
    description: "Generate, score, roast, and convert proof points.",
    categories: ["Resume", "Resume Review", "Projects"],
  },
  {
    title: "Job matching",
    description: "Compare your wording against a role without overclaiming.",
    categories: ["Resume Targeting"],
  },
  {
    title: "LinkedIn",
    description: "Turn the same experience into profile-ready positioning.",
    categories: ["LinkedIn"],
  },
  {
    title: "Applications",
    description: "Draft assets that connect your background to the company.",
    categories: ["Applications", "Interview"],
  },
  {
    title: "Communication",
    description: "Handle professional follow-ups and replies faster.",
    categories: ["Productivity"],
  },
];

const liveTools = tools.filter((tool) => tool.status === "live");
const upcomingTools = tools.filter((tool) => tool.status === "coming-soon");

function toolsForGroup(group: (typeof workflowGroups)[number]) {
  return tools.filter((tool) => group.categories.includes(tool.category));
}

function cardProps(tool: ToolConfig) {
  return {
    title: tool.name,
    outcome: tool.category,
    description: tool.shortDescription,
    href: getToolHref(tool),
    icon: tool.icon,
    status: tool.status === "live" ? ("live" as const) : ("coming-soon" as const),
    cta: tool.status === "live" ? "Open tool" : "Preview tool",
    preview: tool.quickFacts,
  };
}

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

      <section className="premium-dark-shell py-14 text-white sm:py-20">
        <div className="container-command relative">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="fade-in-up">
              <p className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.08] px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-mint-100">
                AI career command center
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
                Your AI career toolkit.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                Build a resume, LinkedIn headline, cover letter, and job-match plan from the
                same real experience, without fake claims or account setup.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <MotionButton href="/tools/resume-bullet-generator" variant="secondary" showArrow>
                  Start with resume bullets
                </MotionButton>
                <MotionButton href="/resources" variant="ghost">
                  Browse examples
                </MotionButton>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-300">
                {["No signup", "Truth-first rewrites", "Browser-only history", "Clean exports"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.07] px-3 py-1.5 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-mint-300" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <CommandPanel
              eyebrow="Recommended path"
              title="Build the application kit in order."
              description="Start with proof, score it, match the role, then reuse the best wording across profile and application assets."
              status={`${liveTools.length} live`}
              scanLine
              footer="Each step routes to a real tool or a useful preview."
            >
              <div className="grid gap-3">
                {workflowSteps.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.10]"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-sm font-semibold text-ink">
                        {index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-white">{step.title}</p>
                        <p className="mt-1 text-sm leading-6 text-slate-300">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CommandPanel>
          </div>
        </div>
      </section>

      <section className="premium-shell py-14 sm:py-20">
        <div className="container-command">
          <div className="mb-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-700">
                Live tools
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
                Start with the workflows ready to use today.
              </h2>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white/90 p-5 shadow-soft">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  [FileText, "Write", "Generate stronger proof"],
                  [ClipboardCheck, "Review", "Score weak sections"],
                  [Target, "Match", "Find keyword gaps"],
                ].map(([Icon, title, text]) => {
                  const TypedIcon = Icon as typeof FileText;

                  return (
                    <div key={title as string} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <TypedIcon className="h-5 w-5 text-mint-700" aria-hidden="true" />
                      <p className="mt-3 font-semibold text-ink">{title as string}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {liveTools.map((tool) => (
              <ProductCard key={tool.slug} {...cardProps(tool)} />
            ))}
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
            <CommandPanel
              eyebrow="Workflow map"
              title="Move through the suite by intent."
              description="Pick the kind of application asset you need, then open the tool closest to that job."
              status="Mapped"
              className="lg:sticky lg:top-24"
            >
              <div className="grid gap-3">
                {workflowGroups.map((group, index) => {
                  const groupTools = toolsForGroup(group);

                  return (
                    <a
                      key={group.title}
                      href={`#${group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="rounded-2xl border border-white/10 bg-white/[0.07] p-3 transition hover:bg-white/[0.11]"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold text-white">
                          {index + 1}. {group.title}
                        </span>
                        <span className="rounded-full bg-white/[0.08] px-2.5 py-1 text-xs font-semibold text-slate-300">
                          {groupTools.length}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-300">{group.description}</p>
                    </a>
                  );
                })}
              </div>
            </CommandPanel>

            <div className="space-y-8">
              {workflowGroups.map((group) => {
                const groupTools = toolsForGroup(group);

                return (
                  <section key={group.title} id={group.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")} className="scroll-mt-28">
                    <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-mint-700">
                          {group.title}
                        </p>
                        <h3 className="mt-1 text-2xl font-semibold tracking-[-0.03em] text-ink">
                          {group.description}
                        </h3>
                      </div>
                    </div>
                    <div className="grid gap-5 md:grid-cols-2">
                      {groupTools.map((tool) => (
                        <ProductCard key={tool.slug} {...cardProps(tool)} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>

          {upcomingTools.length ? (
            <section className="mt-14 rounded-[2rem] border border-slate-200 bg-white/90 p-5 shadow-soft sm:p-7">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-700">
                    Upcoming tools
                  </p>
                  <h2 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-ink">
                    Preview what is coming next.
                  </h2>
                </div>
                <p className="max-w-xl leading-7 text-slate-600">
                  Coming-soon tools still show expected inputs, outputs, and a related live tool to try.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2">
                {upcomingTools.map((tool) => (
                  <ProductCard key={tool.slug} {...cardProps(tool)} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="mt-14 overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-command sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-mint-100">
                  <Route className="h-4 w-4" aria-hidden="true" />
                  Build your first application kit
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em]">
                  Start with one honest work note, then reuse the strongest proof everywhere.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <MotionButton href="/tools/resume-bullet-generator" variant="secondary" showArrow>
                  Generate bullets
                </MotionButton>
                <MotionButton href="/resources" variant="ghost">
                  Browse resources
                </MotionButton>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
