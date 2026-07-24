import type { Metadata } from "next";
import {
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Route,
  Target,
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { MotionButton } from "@/components/motion-button";
import { ProductCard } from "@/components/product-card";
import { ProductWindow } from "@/components/product-window";
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

const liveTools = tools.filter((tool) => tool.status === "live");
const suiteTools = [...tools].sort((a, b) => {
  if (a.status === b.status) {
    return a.name.localeCompare(b.name);
  }

  return a.status === "live" ? -1 : 1;
});

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

      <section className="premium-hero py-10 sm:py-14">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[linear-gradient(180deg,#ffffff,rgba(255,255,255,0))]" />
        <div className="container-command relative">
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
            <div className="fade-in-up">
              <p className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                AI career toolkit
              </p>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-6xl">
                Build your application kit.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                Start with your real experience, then turn it into resume bullets, recruiter
                critique, job-match insights, LinkedIn copy, and cover letters.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <MotionButton href="/tools/resume-bullet-generator" showArrow>
                  Start with resume bullets
                </MotionButton>
                <MotionButton href="/resources" variant="secondary">
                  Browse examples
                </MotionButton>
              </div>
              <div className="mt-6 flex flex-wrap gap-2 text-sm text-slate-700">
                {["No signup", "Truth-first rewrites", "Browser-only history", "Clean exports"].map((item) => (
                  <span key={item} className="trust-pill inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-semibold">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <ProductWindow
              title="Application kit preview"
              subtitle={`${liveTools.length} live tools ready`}
              tabs={["Resume", "Review", "JD Match", "Project", "Apply"]}
              bullets={[
                { score: 94, text: "Generate proof-driven bullets from rough experience notes." },
                { score: 89, text: "Review weak sections before sending applications." },
                { score: 86, text: "Match wording against the role without overclaiming." },
              ]}
              keywords={["resume scoring", "JD match", "export-ready copy"]}
            />
          </div>
        </div>
      </section>

      <section className="premium-shell py-12 sm:py-16">
        <div className="container-command">
          <div className="mb-7 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-mint-700">
                Product suite
              </p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-ink sm:text-5xl">
                One connected toolkit, not scattered utilities.
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-slate-600">
                Live tools are ready now. Preview tools show what they will do and route you toward
                the closest useful workflow.
              </p>
            </div>
            <div className="app-panel p-5">
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  [FileText, "Write", "Generate stronger proof"],
                  [ClipboardCheck, "Review", "Score weak sections"],
                  [Target, "Match", "Find keyword gaps"],
                ].map(([Icon, title, text]) => {
                  const TypedIcon = Icon as typeof FileText;

                  return (
                    <div key={title as string} className="interactive-card rounded-2xl p-4">
                      <span className="feature-icon flex h-9 w-9 items-center justify-center rounded-xl text-mint-700">
                        <TypedIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <p className="mt-3 font-semibold text-ink">{title as string}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{text as string}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="app-panel mb-7 overflow-hidden p-2">
            <div className="grid gap-2 md:grid-cols-6">
              {workflowSteps.map((step, index) => (
                <div
                  key={step.title}
                  className="workflow-card rounded-[1.15rem] px-3 py-3"
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-[11px] font-semibold text-white">
                      {index + 1}
                    </span>
                    <p className="truncate text-sm font-semibold text-ink">{step.title}</p>
                  </div>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {suiteTools.map((tool, index) => (
              <ProductCard
                key={tool.slug}
                {...cardProps(tool)}
                className="tool-card-animated"
                style={{ animationDelay: `${Math.min(index * 55, 420)}ms` }}
              />
            ))}
          </div>

          <section className="cta-panel-premium mt-12 rounded-[2rem] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-200">
                  <Route className="h-4 w-4" aria-hidden="true" />
                  Build your first application kit
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white">
                  Start with one honest work note, then reuse the strongest proof everywhere.
                </h2>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <MotionButton href="/tools/resume-bullet-generator" showArrow>
                  Generate bullets
                </MotionButton>
                <MotionButton href="/resources" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/15">
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
