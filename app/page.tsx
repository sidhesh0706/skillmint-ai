import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  MessageCircleQuestion,
  PanelsTopLeft,
  Send,
  type LucideIcon,
} from "lucide-react";
import { HomeConversionPanel } from "@/components/home-conversion-panel";
import { HomeFeaturedTools } from "@/components/home-featured-tools";
import { JsonLd } from "@/components/json-ld";
import { ProductWindow } from "@/components/product-window";
import { TrackedLink } from "@/components/tracked-link";
import {
  breadcrumbSchema,
  softwareApplicationSchema,
} from "@/lib/structured-data";
import styles from "./home.module.css";

const trustPills = [
  "No signup",
  "Browser-only history",
  "Truth-first rewrites",
  "ATS-friendly outputs",
];

const workflowSteps: Array<{
  title: string;
  description: string;
  outcome: string;
  icon: LucideIcon;
}> = [
  {
    title: "Build proof",
    description: "Turn rough notes into scored resume bullets.",
    outcome: "Resume bullets",
    icon: FileText,
  },
  {
    title: "Pressure-test it",
    description: "Find weak phrasing before a recruiter does.",
    outcome: "Resume roast",
    icon: MessageCircleQuestion,
  },
  {
    title: "Match the role",
    description: "Compare your evidence with the target posting.",
    outcome: "JD match",
    icon: BriefcaseBusiness,
  },
  {
    title: "Package the story",
    description: "Reuse the strongest proof across your profile and letter.",
    outcome: "LinkedIn + cover letter",
    icon: PanelsTopLeft,
  },
  {
    title: "Apply clearly",
    description: "Export clean, truthful copy wherever you need it.",
    outcome: "Application ready",
    icon: Send,
  },
];

export const metadata: Metadata = {
  title: "SkillMint AI | Recruiter-Ready Career Tools",
  description:
    "Turn real student, project, and work experience into recruiter-ready resume bullets, job match insights, cover letters, and LinkedIn assets.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "SkillMint AI | Recruiter-Ready Career Tools",
    description:
      "Create recruiter-ready resume bullets and career assets with free AI tools.",
    url: "/",
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
    title: "SkillMint AI | Free AI Career Tools",
    description:
      "Create recruiter-ready resume bullets and career assets with free AI tools.",
    images: ["/opengraph-image"],
  },
};

export default function Home() {
  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          breadcrumbSchema([{ name: "Home", path: "/" }]),
        ]}
      />

      <section className={styles.hero}>
        <div className={styles.inner}>
          <div className={styles.copy}>
            <div className={styles.eyebrow}>
              <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
              Free AI career workspace
            </div>
            <h1 className={styles.headline}>
              <span className="block">Turn real experience into</span>
              <span className={`${styles.headlineAccent} block`}>
                job-ready career assets.
              </span>
            </h1>
            <p className={styles.subheadline}>
              Build stronger resume bullets, match job descriptions, and carry
              the same truthful proof into LinkedIn and cover letters.
            </p>
            <div className={styles.actions}>
              <TrackedLink
                href="/tools/resume-bullet-generator"
                className={`${styles.primaryAction} group`}
                eventName="homepage_cta_click"
                eventPayload={{ cta: "generate_resume_bullets" }}
              >
                Generate resume bullets
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </TrackedLink>
              <TrackedLink
                href="/tools"
                className={`${styles.secondaryAction} group`}
                eventName="homepage_cta_click"
                eventPayload={{ cta: "explore_application_tools" }}
              >
                Explore application tools
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </TrackedLink>
            </div>
            <div className={styles.trustRow}>
              {trustPills.map((pill) => (
                <span key={pill} className={styles.trustPill}>
                  {pill}
                </span>
              ))}
            </div>
          </div>
          <div className={styles.previewStage}>
            <ProductWindow />
          </div>
        </div>
      </section>

      <section className="surface-band py-10 sm:py-12">
        <div className="container-shell section-reveal">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
                One connected workflow
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                From rough notes to a ready application.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
              Start with proof, test it against the role, then reuse the best
              language across the rest of your application.
            </p>
          </div>

          <div className="home-workflow-grid mt-7">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="home-workflow-step"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="home-workflow-icon">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold text-slate-400">
                      0{index + 1}
                    </span>
                  </div>
                  <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
                    {step.outcome}
                  </p>
                  <h3 className="mt-2 font-semibold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="soft-stage py-10 sm:py-12">
        <div className="container-shell section-reveal">
          <div className="transformation-panel rounded-[1.75rem] border border-slate-200 p-5 sm:p-7">
            <div className="grid gap-7 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
                  Example transformation
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                  Make the proof easier to see.
                </h2>
                <p className="mt-4 max-w-lg leading-7 text-slate-600">
                  SkillMint strengthens structure, action verbs, keywords, and
                  impact without inventing claims.
                </p>
                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-line">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-slate-500" aria-hidden="true">
                      Bullet strength
                    </span>
                    <span className="sr-only">
                      Bullet strength improved from 68 to 91 out of 100.
                    </span>
                    <span
                      className="flex items-center gap-2 text-emerald-700"
                      aria-hidden="true"
                    >
                      <span>68</span>
                      <span>→</span>
                      <span>91</span>
                    </span>
                  </div>
                  <div
                    className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-label="Improved bullet strength"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={91}
                    aria-valuetext="91 out of 100"
                  >
                    <span className="score-fill block h-full w-[91%] rounded-full bg-emerald-500" />
                  </div>
                </div>
              </div>

              <div>
                <div className="grid gap-3 sm:grid-cols-[0.72fr_1.28fr]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Before
                    </p>
                    <p className="mt-3 text-lg leading-7 text-slate-700">
                      Made dashboard for sales data.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                      After
                    </p>
                    <p className="mt-3 text-lg leading-8 text-slate-800">
                      <mark className="rounded bg-emerald-100 px-1 text-slate-950">
                        Built
                      </mark>{" "}
                      an interactive sales dashboard using{" "}
                      <mark className="rounded bg-cyan-100 px-1 text-slate-950">
                        SQL and Excel
                      </mark>{" "}
                      to track weekly pipeline trends and{" "}
                      <mark className="rounded bg-amber-100 px-1 text-slate-950">
                        identify underperforming regions faster
                      </mark>
                      .
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Action verb",
                      "Tools",
                      "Clear impact",
                      "ATS language",
                    ].map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/tools/resume-bullet-generator"
                    className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-emerald-700"
                  >
                    Use this pattern
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="surface-band py-10 sm:py-12">
        <div className="container-shell section-reveal">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-emerald-700">
                Featured tools
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
                Start with the tool your application needs next.
              </h2>
            </div>
            <Link href="/tools" className="button-secondary group self-start">
              View all tools
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>
          <HomeFeaturedTools />
        </div>
      </section>

      <section className="soft-stage py-10 sm:py-12">
        <div className="container-shell section-reveal">
          <HomeConversionPanel />
        </div>
      </section>
    </>
  );
}
