import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-transparent px-3 py-3">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4 rounded-full border border-slate-200/80 bg-white/[0.84] px-4 py-2 shadow-[0_18px_60px_rgba(23,32,51,0.08)] backdrop-blur-xl">
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
            className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-white shadow-[0_12px_34px_rgba(23,32,51,0.18)] transition hover:-translate-y-0.5 hover:bg-slate-800 sm:inline-flex"
          >
            Try Generator
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}
