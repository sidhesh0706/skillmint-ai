"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  ChevronDown,
  Code2,
  GraduationCap,
  Search,
  Sparkles,
  WandSparkles,
} from "lucide-react";
import {
  ResourceCard,
  type ResourceCardPage,
} from "@/components/resource-card";

type ResourceShelf = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  pages: ResourceCardPage[];
};

type ResourceLibraryProps = {
  pages: ResourceCardPage[];
  shelves: ResourceShelf[];
  featured: ResourceCardPage;
  startHere: ResourceCardPage[];
};

const filters = [
  "Students",
  "Freshers",
  "Software",
  "Data",
  "ATS",
  "Metrics",
  "Projects",
  "Internships",
];

const startIcons = [GraduationCap, Code2, BarChart3];

function matches(page: ResourceCardPage, query: string) {
  const haystack = [
    page.title,
    page.audience,
    page.metaDescription,
    page.category || "",
    page.slug,
    ...page.actionVerbs,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export function ResourceLibrary({
  pages,
  shelves,
  featured,
  startHere,
}: ResourceLibraryProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const effectiveQuery = query.trim() || activeFilter;
  const filteredPages = useMemo(
    () =>
      effectiveQuery
        ? pages.filter((page) => matches(page, effectiveQuery))
        : [],
    [effectiveQuery, pages],
  );

  function selectFilter(filter: string) {
    setActiveFilter((current) => (current === filter ? "" : filter));
    setQuery("");
  }

  return (
    <>
      <section className="resources-hero">
        <div className="container-shell resources-hero-grid">
          <div>
            <p className="resources-eyebrow">
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              Resume career library
            </p>
            <h1 className="resources-title">
              Practical resume guides, curated for the next application.
            </h1>
            <p className="resources-subtitle">
              Find the closest example, borrow the structure, then turn your
              real experience into a stronger bullet.
            </p>
          </div>

          <div className="resource-filter-panel">
            <label className="resource-search">
              <Search className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">Search resume resources</span>
              <input
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveFilter("");
                }}
                placeholder="Search by role, goal, metric, or ATS keyword"
              />
            </label>
            <div className="resource-filter-chips" aria-label="Filter guides">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => selectFilter(filter)}
                  className={activeFilter === filter ? "is-active" : ""}
                  aria-pressed={activeFilter === filter}
                >
                  {filter}
                </button>
              ))}
            </div>
            {effectiveQuery ? (
              <p className="resource-filter-status" aria-live="polite">
                {filteredPages.length} guide
                {filteredPages.length === 1 ? "" : "s"} matching{" "}
                <strong>{effectiveQuery}</strong>
              </p>
            ) : (
              <p className="resource-filter-status">
                Curated by experience, role, and resume goal.
              </p>
            )}
          </div>
        </div>
      </section>

      <main className="resource-library-shell">
        <div className="container-shell">
          {effectiveQuery ? (
            <section className="resource-filter-results section-reveal">
              <div className="resource-section-heading">
                <div>
                  <p className="resources-section-eyebrow">Filtered library</p>
                  <h2>Guides matching your search</h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setActiveFilter("");
                  }}
                  className="resource-clear-filter"
                >
                  Clear filter
                </button>
              </div>
              {filteredPages.length ? (
                <div className="resource-card-grid">
                  {filteredPages.slice(0, 8).map((page) => (
                    <ResourceCard key={page.slug} page={page} />
                  ))}
                </div>
              ) : (
                <div className="resource-no-results">
                  <Search className="h-5 w-5" aria-hidden="true" />
                  <p>No exact match yet. Try a role, skill, or outcome.</p>
                </div>
              )}
            </section>
          ) : (
            <>
              <section className="featured-resource section-reveal">
                <div className="featured-resource-copy">
                  <p className="resources-section-eyebrow">Featured guide</p>
                  <p className="featured-audience">{featured.audience}</p>
                  <h2>{featured.title}</h2>
                  <p>{featured.metaDescription}</p>
                  <div className="featured-verbs">
                    {featured.actionVerbs.slice(0, 3).map((verb) => (
                      <span key={verb}>{verb}</span>
                    ))}
                  </div>
                  <div className="featured-actions">
                    <Link
                      href={`/${featured.slug}`}
                      className="resource-featured-primary"
                    >
                      Open guide
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <Link
                      href="/tools/resume-bullet-generator"
                      className="resource-featured-secondary"
                    >
                      <WandSparkles
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                      Generate bullets
                    </Link>
                  </div>
                </div>
                <div className="featured-resource-insight">
                  <span className="featured-insight-icon">
                    <Sparkles className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <p>Why it matters</p>
                  <h3>Strong resumes prove outcomes, not just activity.</h3>
                  <div className="featured-before-after">
                    <span>Before</span>
                    <p>Helped with the onboarding process.</p>
                    <span>After</span>
                    <p>
                      Streamlined onboarding documentation to reduce repeated
                      support questions and improve new-hire readiness.
                    </p>
                  </div>
                </div>
              </section>

              <section className="resource-start section-reveal">
                <div className="resource-section-heading">
                  <div>
                    <p className="resources-section-eyebrow">Start here</p>
                    <h2>Choose the closest starting point.</h2>
                  </div>
                  <p>
                    Three high-leverage guides for the most common resume
                    problems.
                  </p>
                </div>
                <div className="resource-start-grid">
                  {startHere.map((page, index) => {
                    const Icon = startIcons[index % startIcons.length];
                    const labels = [
                      "For students",
                      "For software roles",
                      "Add metrics to weak bullets",
                    ];

                    return (
                      <Link
                        key={page.slug}
                        href={`/${page.slug}`}
                        className="resource-start-card group"
                      >
                        <span className="resource-start-icon">
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </span>
                        <div>
                          <p>{labels[index]}</p>
                          <h3>{page.title}</h3>
                          <span>
                            Open guide
                            <ArrowRight
                              className="h-4 w-4"
                              aria-hidden="true"
                            />
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </section>

              <div className="resource-shelves">
                {shelves.map((shelf) => (
                  <section
                    key={shelf.id}
                    id={shelf.id}
                    className="resource-shelf section-reveal"
                  >
                    <div className="resource-section-heading">
                      <div>
                        <p className="resources-section-eyebrow">
                          {shelf.eyebrow}
                        </p>
                        <h2>{shelf.title}</h2>
                      </div>
                      <p>{shelf.description}</p>
                    </div>
                    <div className="resource-card-grid">
                      {shelf.pages.slice(0, 5).map((page) => (
                        <ResourceCard key={page.slug} page={page} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <details className="resource-link-index section-reveal">
                <summary>
                  <span>
                    Browse every resume guide
                    <small>
                      All {pages.length} internal resource links remain
                      available.
                    </small>
                  </span>
                  <ChevronDown className="h-5 w-5" aria-hidden="true" />
                </summary>
                <div>
                  {pages.map((page) => (
                    <Link key={page.slug} href={`/${page.slug}`}>
                      {page.title}
                    </Link>
                  ))}
                </div>
              </details>
            </>
          )}

          <section className="resource-final-cta section-reveal">
            <div>
              <p className="resources-section-eyebrow">Make it yours</p>
              <h2>Turn the right example into your own truthful bullet.</h2>
            </div>
            <Link href="/tools/resume-bullet-generator">
              Generate resume bullets
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </section>
        </div>
      </main>
    </>
  );
}
