import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { AdSlot } from "@/components/ad-slot";
import { AffiliateRecommendationCard } from "@/components/affiliate-recommendation-card";
import { JsonLd } from "@/components/json-ld";
import { TrackedLink } from "@/components/tracked-link";
import { recommendedResources } from "@/config/monetization";
import type { SeoLandingPage as SeoLandingPageData } from "@/data/seo-landing-pages";
import { getSeoLandingPage } from "@/data/seo-landing-pages";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/structured-data";

type SeoLandingPageProps = {
  page: SeoLandingPageData;
};

export function SeoLandingPage({ page }: SeoLandingPageProps) {
  const relatedPages = (page.relatedSlugs || [])
    .map((slug) => getSeoLandingPage(slug))
    .filter((relatedPage): relatedPage is SeoLandingPageData => Boolean(relatedPage))
    .slice(0, 5);
  const atsKeywords = page.atsKeywords?.length
    ? page.atsKeywords
    : page.keywords.slice(0, 6);
  const commonMistakes = page.commonMistakes?.length
    ? page.commonMistakes
    : ["Using vague task descriptions", "Skipping measurable scope", "Leaving out role keywords"];

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: page.metaTitle,
            description: page.metaDescription,
            path: `/${page.slug}`,
          }),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Resources", path: "/resources" },
            { name: page.title, path: `/${page.slug}` },
          ]),
          faqSchema(page.faqs),
        ]}
      />
      <section className="relative overflow-hidden py-14 sm:py-20">
        <div className="hero-glow absolute inset-x-0 top-0 -z-10 h-[30rem]" />
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-mint-100 bg-white/80 px-4 py-2 text-sm font-semibold text-mint-700 shadow-line backdrop-blur">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              {page.audience}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
              {page.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
              {page.intro}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href="/tools/resume-bullet-generator"
                className="button-primary"
                eventName="seo_page_cta_click"
                eventPayload={{ slug: page.slug, cta: "hero_generate" }}
              >
                Generate your own bullets
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
              <Link href="/tools" className="button-secondary">
                Explore AI tools
              </Link>
              <Link href="/resources" className="button-secondary">
                Browse resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
            <article className="card-surface p-5 sm:p-7">
              <div className="mb-6">
                <p className="text-sm font-semibold uppercase text-mint-700">Examples</p>
                <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink">
                  {page.examplesTitle}
                </h2>
                <p className="mt-3 leading-7 text-slate-600">
                  Adapt these bullets to your real work, tools, and outcomes. The strongest resume
                  bullets are specific, honest, and easy for recruiters to scan.
                </p>
              </div>

              <div className="space-y-3">
                {page.bullets.map((bullet, index) => (
                  <div
                    key={bullet}
                    className="rounded-lg border border-slate-200 bg-white p-4 shadow-line transition duration-300 hover:-translate-y-0.5 hover:border-mint-100"
                  >
                    <div className="flex gap-3">
                      <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mint-50 text-xs font-semibold text-mint-700">
                        {index + 1}
                      </span>
                      <p className="leading-7 text-slate-700">{bullet}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <aside className="card-surface p-5 sm:p-6 lg:sticky lg:top-24">
              <p className="text-sm font-semibold uppercase text-mint-700">Quick writing formula</p>
              <h2 className="mt-2 text-2xl font-semibold text-ink">
                Action + scope + result
              </h2>
              <p className="mt-3 leading-7 text-slate-600">
                Start with a strong verb, add the work you owned, then finish with a metric,
                outcome, or business reason.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {page.actionVerbs.map((verb) => (
                  <span
                    key={verb}
                    className="rounded-full border border-mint-100 bg-mint-50 px-3 py-1.5 text-sm font-semibold text-mint-700"
                  >
                    {verb}
                  </span>
                ))}
              </div>
              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-sm font-semibold uppercase text-mint-700">ATS keywords</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {atsKeywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-semibold text-slate-700"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              {relatedPages.length ? (
                <div className="mt-6 border-t border-slate-200 pt-5">
                  <p className="text-sm font-semibold uppercase text-mint-700">Related guides</p>
                  <div className="mt-3 grid gap-2">
                    {relatedPages.map((relatedPage) => (
                      <Link
                        key={relatedPage.slug}
                        href={`/${relatedPage.slug}`}
                        className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:border-mint-100 hover:bg-mint-50 hover:text-mint-700"
                      >
                        {relatedPage.title.replace(" (2026 Guide)", "").replace(" (2026 Examples)", "")}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-mint-700">Common mistakes</p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink">
                What weakens these bullets
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Small wording mistakes can make strong experience look generic. Avoid these before
                sending applications.
              </p>
            </div>
            <div className="grid gap-3">
              {commonMistakes.map((mistake) => (
                <div key={mistake} className="rounded-lg border border-amber-200 bg-amber-50/80 p-4">
                  <p className="leading-7 text-amber-900">{mistake}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="grid gap-3 sm:grid-cols-3">
            {recommendedResources.slice(0, 3).map((resource) => (
              <AffiliateRecommendationCard
                key={resource.title}
                title={resource.title}
                description={resource.description}
                href={resource.href}
                label="Recommended resource"
              />
            ))}
          </div>
          <div className="mt-4">
            <AdSlot label="Resume guide resource placement" />
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="card-surface overflow-hidden bg-ink p-6 text-white sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-mint-100">Create yours faster</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                  Paste one work note and get scored resume bullets.
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                  SkillMint AI can turn your real projects, tools, and results into recruiter-ready
                  bullets with scores, rewrites, keyword suggestions, and exports.
                </p>
              </div>
              <TrackedLink
                href="/tools/resume-bullet-generator"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-mint-50"
                eventName="seo_page_cta_click"
                eventPayload={{ slug: page.slug, cta: "midpage_generate" }}
              >
                Generate with AI
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="page-band py-16 sm:py-20">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase text-mint-700">Tips</p>
              <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink">
                How to write better resume bullets
              </h2>
              <p className="mt-4 leading-7 text-slate-600">
                Recruiters look for proof of impact. Small improvements in specificity,
                keywords, and metrics can make a resume much easier to understand.
              </p>
            </div>
            <div className="grid gap-3">
              {page.tips.map((tip) => (
                <div key={tip} className="rounded-lg border border-slate-200 bg-white p-4 shadow-line">
                  <div className="flex gap-3">
                    <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-mint-700" aria-hidden="true" />
                    <p className="leading-7 text-slate-700">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="container-shell">
          <div className="card-surface overflow-hidden bg-ink p-6 text-white sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase text-mint-100">AI resume tool</p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">
                  Generate your own resume bullets with AI
                </h2>
                <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                  Add your role, level, tools, and results. SkillMint AI turns your notes into
                  five recruiter-ready resume bullets you can copy or export.
                </p>
              </div>
              <TrackedLink
                href="/tools/resume-bullet-generator"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-mint-50"
                eventName="seo_page_cta_click"
                eventPayload={{ slug: page.slug, cta: "bottom_generate" }}
              >
                Generate bullets
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedLink>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold uppercase text-mint-700">FAQ</p>
            <h2 className="mt-2 text-3xl font-semibold leading-tight text-ink">
              Common questions
            </h2>
            <div className="mt-6 space-y-3">
              {page.faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border border-slate-200 bg-white/90 p-5 shadow-line"
                >
                  <summary className="cursor-pointer list-none text-base font-semibold text-ink">
                    {faq.question}
                  </summary>
                  <p className="mt-3 leading-7 text-slate-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
