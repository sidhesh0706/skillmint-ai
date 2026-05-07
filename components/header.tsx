import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/[0.82] shadow-line backdrop-blur-xl">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-semibold text-ink">
          <BrandMark />
          <span className="text-base">SkillMint AI</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2 text-sm font-medium">
          <Link
            href="/resources"
            className="hidden rounded-full px-4 py-2.5 text-slate-700 transition hover:bg-white hover:text-ink hover:shadow-line sm:inline-flex"
          >
            Resources
          </Link>
          <Link
            href="/tools"
            className="rounded-full px-4 py-2.5 text-slate-700 transition hover:bg-white hover:text-ink hover:shadow-line"
          >
            Tools
          </Link>
          <Link
            href="/tools/resume-bullet-generator"
            className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-white shadow-line transition hover:-translate-y-0.5 hover:bg-slate-800 sm:inline-flex"
          >
            Try Generator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
