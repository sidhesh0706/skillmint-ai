import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { CosmicGrid } from "@/components/cosmic-grid";
import { JsonLd } from "@/components/json-ld";
import { ToolGrid } from "@/components/tool-grid";
import { TrustPills } from "@/components/trust-pills";
import { tools } from "@/data/tool-config";
import { breadcrumbSchema } from "@/lib/structured-data";

const workflowSteps = [
  "Resume bullets",
  "Resume roast",
  "JD match",
  "LinkedIn",
  "Cover letter",
  "Apply",
];

const toolCategories = Array.from(new Set(tools.map((tool) => tool.category)));

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

      <section className="tools-cockpit relative isolate overflow-hidden py-14 text-white sm:py-20">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-ink" />
        <div
          aria-hidden="true"
          className="absolute -left-28 top-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-mint-500/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute right-0 top-16 -z-10 h-[32rem] w-[32rem] rounded-full bg-cyan-300/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-[#f7fbfa] to-transparent"
        />
        <CosmicGrid className="opacity-45 [mask-image:radial-gradient(circle_at_50%_8%,black,transparent_76%)]" />

        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="fade-in-up">
              <div className="mb-6">
                <TrustPills />
              </div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-mint-100">
                Product suite
              </p>
              <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
                Your AI career toolkit.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
                A connected workspace for turning rough experience into resume bullets,
                recruiter critique, job-match insights, LinkedIn copy, cover letters, and
                application-ready assets.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/tools/resume-bullet-generator" className="button-primary bg-white text-ink hover:bg-mint-50">
                  Start with resume bullets
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link href="/resources" className="button-secondary border-white/15 bg-white/10 text-white hover:bg-white/15">
                  Browse examples
                </Link>
              </div>
            </div>

            <div className="fade-in-up-delayed rounded-[2rem] border border-white/15 bg-white/[0.07] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm font-semibold text-white">Application cockpit</p>
                  <p className="mt-1 text-xs font-medium text-slate-300">
                    One workflow, multiple career assets
                  </p>
                </div>
                <span className="score-orb rounded-full border border-mint-300/30 bg-mint-300/10 px-3 py-1 text-xs font-semibold text-mint-100">
                  Live suite
                </span>
              </div>
              <div className="grid gap-3">
                {workflowSteps.map((step, index) => (
                  <div
                    key={step}
                    className="scan-line rounded-2xl border border-white/10 bg-white/[0.08] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-mint-300/35 hover:bg-white/[0.11]"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-ink">
                          {index + 1}
                        </span>
                        <span className="font-semibold">{step}</span>
                      </div>
                      <span className="hidden h-2 w-24 overflow-hidden rounded-full bg-white/10 sm:block">
                        <span
                          className="block h-full rounded-full bg-gradient-to-r from-mint-500 to-cyan-300"
                          style={{ width: `${88 - index * 8}%` }}
                        />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 overflow-hidden rounded-full border border-white/10 bg-white/[0.07] px-4 py-3 shadow-[0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-xl">
            <div className="feature-marquee">
              <div className="marquee-track flex w-max gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                {[...workflowSteps, ...workflowSteps].map((item, index) => (
                  <span key={`${item}-${index}`} className="inline-flex items-center gap-4">
                    {item}
                    <span className="h-1.5 w-1.5 rounded-full bg-mint-300" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f7fbfa] py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-16 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-mint-500/10 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute -right-32 bottom-28 h-[26rem] w-[26rem] rounded-full bg-cyan-300/10 blur-3xl"
        />
        <div className="container-shell relative">
          <div className="rounded-[2.25rem] border border-slate-200/80 bg-white/[0.78] p-5 shadow-[0_34px_110px_rgba(23,32,51,0.12)] backdrop-blur-xl sm:p-8">
            <div className="mb-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mint-700">
                  All tools in one suite
                </p>
                <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-[-0.045em] text-ink sm:text-5xl">
                  Build the application kit without jumping between disconnected pages.
                </h2>
              </div>
              <div>
                <p className="max-w-2xl leading-7 text-slate-600">
                  Live tools open immediately. Coming-soon tools still show what they will
                  produce, collect interest, and route you to the closest active workflow.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {toolCategories.map((category) => (
                    <span
                      key={category}
                      className="keyword-chip rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-line"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <ToolGrid tools={tools} />
          </div>

          <div className="relative mt-12 overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-[0_28px_90px_rgba(23,32,51,0.22)] sm:p-8">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-10 top-0 h-48 w-48 rounded-full bg-mint-500/20 blur-3xl"
            />
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-mint-100">
              Start your application kit
            </p>
            <div className="mt-3 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.035em]">
                  Begin with one honest work note. Build the rest from there.
                </h2>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-300">
                  {["Truth-first rewrites", "Browser-only history", "Clean exports"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                      <CheckCircle2 className="h-4 w-4 text-mint-300" aria-hidden="true" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link href="/tools/resume-bullet-generator" className="button-primary bg-white text-ink hover:bg-mint-50">
                  Generate bullets
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
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
