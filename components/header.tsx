import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/92 backdrop-blur">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-semibold text-ink">
          <BrandMark />
          <span className="text-base">SkillMint AI</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2 text-sm font-medium">
          <Link
            href="/resources"
            className="hidden rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-ink sm:inline-flex"
          >
            Resources
          </Link>
          <Link
            href="/tools"
            className="rounded-lg px-3 py-2 text-slate-700 transition hover:bg-slate-100 hover:text-ink"
          >
            Tools
          </Link>
          <Link
            href="/tools/resume-bullet-generator"
            className="group hidden items-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-white shadow-[0_12px_30px_rgba(15,23,42,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 sm:inline-flex"
          >
            Try Generator
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
