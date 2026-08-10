"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";

export function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const links = [
    { href: "/tools", label: "Tools" },
    { href: "/resources", label: "Resources" },
  ];

  return (
    <header className="site-header sticky top-0 z-40">
      <div className="container-shell relative flex min-h-[4.5rem] items-center justify-between gap-4 py-3">
        <Link
          href="/"
          className="site-brand group flex items-center gap-3 font-semibold text-ink"
        >
          <BrandMark />
          <span>
            <span className="block text-base leading-none">SkillMint AI</span>
            <span className="mt-1 hidden text-[10px] font-medium uppercase tracking-[0.16em] text-slate-400 md:block">
              Career intelligence
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-xl border border-slate-200/80 bg-white/80 p-1 text-sm font-medium shadow-sm md:flex"
        >
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`site-header-link rounded-lg px-3.5 py-2 transition ${
                  active
                    ? "is-active bg-slate-950 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/tools/resume-bullet-generator"
            className="site-header-cta group ml-1 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white shadow-sm transition hover:bg-emerald-700"
          >
            Build a bullet
            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href="/tools/resume-bullet-generator"
            className="site-header-mobile-cta inline-flex min-h-10 items-center rounded-lg bg-slate-950 px-3 text-xs font-semibold text-white"
          >
            Generate
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm"
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {menuOpen ? (
          <nav
            aria-label="Mobile navigation"
            className="site-mobile-menu absolute inset-x-4 top-[4.2rem] grid gap-1 rounded-xl border border-slate-200 bg-white p-2 shadow-xl md:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
