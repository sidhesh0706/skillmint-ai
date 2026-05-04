import Link from "next/link";
import { Sparkles } from "lucide-react";
import { seoLandingPages } from "@/data/seo-landing-pages";

export function Footer() {
  return (
    <footer className="border-t border-white/70 bg-ink text-white">
      <div className="container-shell py-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link href="/" className="flex items-center gap-3 font-semibold">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-ink">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>SkillMint AI</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              Free AI career tools for resumes, cover letters, LinkedIn profiles,
              and professional productivity.
            </p>
          </div>

          <div className="grid gap-8 text-sm text-slate-300 sm:grid-cols-3 sm:gap-x-10">
            <div className="grid gap-3">
              <p className="font-semibold uppercase text-white">SkillMint</p>
              <Link href="/" className="transition hover:text-white">
                Home
              </Link>
              <Link href="/tools" className="transition hover:text-white">
                Tools
              </Link>
              <Link href="/tools/resume-bullet-generator" className="transition hover:text-white">
                Resume Generator
              </Link>
            </div>

            <div className="grid gap-3">
              <p className="font-semibold uppercase text-white">Resources</p>
              <Link href="/resources" className="transition hover:text-white">
                All resources
              </Link>
              {seoLandingPages.map((page) => (
                <Link key={page.slug} href={`/${page.slug}`} className="transition hover:text-white">
                  {page.title.replace(" (2026 Guide)", "").replace(" (2026 Examples)", "")}
                </Link>
              ))}
            </div>

            <div className="grid gap-3">
              <p className="font-semibold uppercase text-white">Company</p>
              <Link href="/privacy" className="transition hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="transition hover:text-white">
                Terms
              </Link>
              <Link href="/contact" className="transition hover:text-white">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-sm text-slate-400">
          &copy; 2026 SkillMint AI. Built for faster career momentum.
        </div>
      </div>
    </footer>
  );
}
