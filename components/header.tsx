import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/[0.82] shadow-line backdrop-blur-xl">
      <div className="container-shell flex min-h-16 items-center justify-between gap-4 py-3">
        <Link href="/" className="flex items-center gap-3 font-semibold text-ink">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-ink via-slate-800 to-mint-700 text-white shadow-line">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-base">SkillMint AI</span>
        </Link>

        <nav aria-label="Main navigation" className="flex items-center gap-2 text-sm font-medium">
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
