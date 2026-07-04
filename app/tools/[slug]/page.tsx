import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BarChart3, FileDown, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { ComingSoonTool } from "@/components/coming-soon-tool";
import { GenericToolWorkspace } from "@/components/generic-tool-workspace";
import { JsonLd } from "@/components/json-ld";
import { PremiumPageShell } from "@/components/premium-page-shell";
import { ToolWorkspace } from "@/components/tool-workspace";
import { TrustPills } from "@/components/trust-pills";
import { getToolBySlug, tools } from "@/data/tool-config";
import { breadcrumbSchema, softwareApplicationSchema } from "@/lib/structured-data";

type ToolPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

const liveToolHighlights = [
  {
    label: "AI workspace",
    icon: Sparkles,
  },
  {
    label: "Score insights",
    icon: BarChart3,
  },
  {
    label: "Truth-first rewrites",
    icon: Wand2,
  },
  {
    label: "Copy/export ready",
    icon: FileDown,
  },
  {
    label: "Secure workflow",
    icon: ShieldCheck,
  },
];

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  return {
    title: tool.seo.title,
    description: tool.seo.description,
    alternates: {
      canonical: `/tools/${tool.slug}`,
    },
    openGraph: {
      title: `${tool.seo.title} | SkillMint AI`,
      description: tool.seo.description,
      url: `/tools/${tool.slug}`,
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${tool.seo.title} | SkillMint AI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.seo.title} | SkillMint AI`,
      description: tool.seo.description,
      images: ["/opengraph-image"],
    },
  };
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    notFound();
  }

  if (tool.status === "coming-soon") {
    return (
      <section className="bg-[#FAFAF8] py-12 sm:py-16 lg:py-[4.5rem]">
        <div className="container-shell">
          <ComingSoonTool slug={tool.slug} />
        </div>
      </section>
    );
  }

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: tool.name, path: `/tools/${tool.slug}` },
          ]),
        ]}
      />
      {tool.slug === "resume-bullet-generator" ? (
        <section className="bg-[#FAFAF8] py-6 sm:py-8">
          <div className="container-shell">
            <div className="app-panel grid min-w-0 gap-5 p-5 sm:p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div className="min-w-0">
                <p className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  {tool.category}
                </p>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.045em] text-slate-950 sm:text-5xl">
                  {tool.name}
                </h1>
                <p className="mt-3 max-w-2xl break-words text-sm leading-6 text-slate-600 sm:text-base sm:leading-7">
                  {tool.longDescription}
                </p>
                <div className="mt-4">
                  <TrustPills />
                </div>
              </div>
              <div className="grid min-w-0 gap-2 sm:grid-cols-2">
                {liveToolHighlights.map((highlight) => {
                  const Icon = highlight.icon;

                  return (
                    <span
                      key={highlight.label}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-700 shadow-line"
                    >
                      <Icon className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                      {highlight.label}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <PremiumPageShell
          eyebrow={tool.category}
          title={tool.name}
          description={tool.longDescription}
          side={
            <div className="app-panel p-4">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
                Workspace signals
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {liveToolHighlights.map((highlight) => {
                  const Icon = highlight.icon;

                  return (
                    <span
                      key={highlight.label}
                      className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-semibold text-slate-700 shadow-line"
                    >
                      <Icon className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                      {highlight.label}
                    </span>
                  );
                })}
              </div>
            </div>
          }
        >
          <TrustPills />
        </PremiumPageShell>
      )}

      <section className="premium-shell py-5 sm:py-7">
        <div className="container-shell">
        <div>
          {tool.slug === "resume-bullet-generator" ? (
            <ToolWorkspace slug={tool.slug} />
          ) : (
            <GenericToolWorkspace slug={tool.slug} />
          )}
        </div>
        </div>
      </section>
    </>
  );
}
