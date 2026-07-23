import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function Header() {
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-semibold text-ink">
          <BrandMark />
          <span className="text-base">SkillMint AI</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2 text-sm font-medium">
          <Link
            href="/resources"
            className="site-header-link hidden rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100/80 hover:text-ink sm:inline-flex"
          >
            Resources
          </Link>
          <Link
            href="/tools"
            className="site-header-link rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100/80 hover:text-ink"
          >
            Tools
          </Link>
          <Link
            href="/tools/resume-bullet-generator"
            className="group hidden items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-white shadow-[0_14px_34px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_42px_rgba(16,185,129,0.22)] sm:inline-flex"
          >
            Try Generator
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
