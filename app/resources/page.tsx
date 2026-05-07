import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { seoLandingPages } from "@/data/seo-landing-pages";

export const metadata: Metadata = {
  title: "Resume Bullet Resources",
  description:
    "Browse SkillMint AI resume bullet guides with ATS-friendly examples, writing tips, and action verbs for freshers, engineers, analysts, product managers, and marketers.",
  keywords: [
    "resume bullet examples",
    "resume bullet resources",
    "ATS resume bullets",
    "resume writing guides",
    "AI resume bullet generator",
  ],
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Resume Bullet Resources | SkillMint AI",
    description:
      "Explore role-specific resume bullet examples and writing guides, then generate your own bullets with AI.",
    url: "/resources",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "SkillMint AI resume bullet resources",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume Bullet Resources | SkillMint AI",
    description:
      "Explore role-specific resume bullet examples and writing guides from SkillMint AI.",
    images: ["/opengraph-image"],
  },
};

export default function ResourcesPage() {
  return (
    <>
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="hero-glow absolute inset-x-0 top-0 -z-10 h-[30rem]" />
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint-100 bg-white/80 px-4 py-2 text-sm font-semibold text-mint-700 shadow-line backdrop-blur">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Resume resources
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              Resume bullet examples and writing guides
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              Browse role-specific examples, action verbs, FAQs, and practical tips for
              writing stronger resume bullets. Each guide links back to the AI resume
              bullet generator when you are ready to create your own.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/tools/resume-bullet-generator" className="button-primary">
                Generate bullets
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/tools" className="button-secondary">
                Explore tools
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="mb-8">
            <SectionHeading
              eyebrow="Guides"
              title="Resume Bullet Examples"
              description="Use these pages for inspiration, then tailor the language to your real projects, tools, and measurable results."
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {seoLandingPages.map((page) => (
              <Link
                key={page.slug}
                href={`/${page.slug}`}
                className="group rounded-lg border border-slate-200 bg-white/90 p-5 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100 hover:bg-white hover:shadow-soft"
              >
                <p className="text-sm font-semibold uppercase text-mint-700">{page.audience}</p>
                <h2 className="mt-3 text-xl font-semibold leading-snug text-ink">
                  {page.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">
                  {page.metaDescription}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {page.actionVerbs.slice(0, 3).map((verb) => (
                    <span
                      key={verb}
                      className="rounded-full border border-mint-100 bg-mint-50 px-3 py-1 text-xs font-semibold text-mint-700"
                    >
                      {verb}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-mint-700">
                  Open guide
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
