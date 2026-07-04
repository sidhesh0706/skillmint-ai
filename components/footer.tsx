import Link from "next/link";
import { BrandMark } from "@/components/brand-mark";
import { seoLandingPages } from "@/data/seo-landing-pages";

const featuredResourceSlugs = [
  "resume-bullets-for-freshers",
  "software-engineer-resume-bullets",
  "data-analyst-resume-bullets",
  "resume-bullet-generator-for-students",
  "ats-resume-bullet-checker",
  "resume-achievement-rewriter",
];

const featuredResources = featuredResourceSlugs
  .map((slug) => seoLandingPages.find((page) => page.slug === slug))
  .filter((page): page is (typeof seoLandingPages)[number] => Boolean(page));

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-ink">
      <div className="container-shell py-10 sm:py-12">
        <div className="grid gap-10 rounded-[1.75rem] border border-slate-200 bg-[#FAFAF8] p-6 shadow-line sm:p-8 lg:grid-cols-[1.05fr_2.1fr] lg:items-start">
          <div className="max-w-md">
            <Link href="/" className="flex items-center gap-3 font-semibold">
              <BrandMark />
              <span>SkillMint AI</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-600">
              Free AI career tools for resumes, cover letters, LinkedIn profiles,
              and professional productivity.
            </p>
            <Link
              href="/tools/resume-bullet-generator"
              className="mt-5 inline-flex min-h-10 items-center justify-center rounded-full bg-ink px-4 py-2 text-sm font-semibold text-white shadow-line transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Generate resume bullets
            </Link>
          </div>

          <div className="grid gap-8 text-sm text-slate-600 sm:grid-cols-3 lg:gap-10">
            <div>
              <p className="font-semibold uppercase tracking-wide text-ink">SkillMint</p>
              <div className="mt-4 grid gap-2.5">
                <Link href="/" className="transition hover:text-mint-700">
                  Home
                </Link>
                <Link href="/tools" className="transition hover:text-mint-700">
                  Tools
                </Link>
                <Link href="/tools/resume-roast" className="transition hover:text-mint-700">
                  Resume Roast
                </Link>
                <Link href="/tools/job-description-match" className="transition hover:text-mint-700">
                  JD Match
                </Link>
                <Link href="/tools/resume-bullet-generator" className="transition hover:text-mint-700">
                  Resume Generator
                </Link>
                <Link href="/resources" className="transition hover:text-mint-700">
                  Resources
                </Link>
              </div>
            </div>

            <div>
              <p className="font-semibold uppercase tracking-wide text-ink">Resources</p>
              <div className="mt-4 grid max-w-xs gap-2.5">
                <Link href="/resources" className="transition hover:text-mint-700">
                  All resources
                </Link>
                {featuredResources.map((page) => (
                  <Link key={page.slug} href={`/${page.slug}`} className="line-clamp-2 transition hover:text-mint-700">
                    {page.title.replace(" (2026 Guide)", "").replace(" (2026 Examples)", "")}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <p className="font-semibold uppercase tracking-wide text-ink">Company</p>
              <div className="mt-4 grid gap-2.5">
                <Link href="/about" className="transition hover:text-mint-700">
                  About
                </Link>
                <Link href="/privacy" className="transition hover:text-mint-700">
                  Privacy
                </Link>
                <Link href="/terms" className="transition hover:text-mint-700">
                  Terms
                </Link>
                <Link href="/contact" className="transition hover:text-mint-700">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-500">
          &copy; 2026 SkillMint AI. Built for faster career momentum.
        </div>
      </div>
    </footer>
  );
}
