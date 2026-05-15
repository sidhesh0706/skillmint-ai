import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BarChart3, FileDown, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { ComingSoonTool } from "@/components/coming-soon-tool";
import { CosmicGrid } from "@/components/cosmic-grid";
import { GenericToolWorkspace } from "@/components/generic-tool-workspace";
import { JsonLd } from "@/components/json-ld";
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
      <section className="relative overflow-hidden py-12 sm:py-16 lg:py-[4.5rem]">
        <div className="hero-stage absolute inset-x-0 top-0 -z-10 h-[34rem]" />
        <CosmicGrid />
        <div className="container-shell">
          <ComingSoonTool slug={tool.slug} />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-[4.5rem]">
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
      <div className="hero-stage absolute inset-x-0 top-0 -z-10 h-[34rem]" />
      <CosmicGrid />
      <div className="container-shell">
        <div className="fade-in-up grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="inline-flex items-center justify-center rounded-full border border-mint-100 bg-white/[0.82] px-4 py-2 text-sm font-semibold uppercase text-mint-700 shadow-line backdrop-blur">
              {tool.category}
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.98] tracking-[-0.045em] text-ink sm:text-6xl">
              {tool.name}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
              {tool.longDescription}
            </p>
            <div className="mt-5">
              <TrustPills />
            </div>
          </div>
          <div className="rounded-[1.75rem] border border-slate-200 bg-white/[0.84] p-4 shadow-[0_28px_90px_rgba(23,32,51,0.10)] backdrop-blur">
            <div className="grid gap-3 sm:grid-cols-2">
              {liveToolHighlights.map((highlight) => {
                const Icon = highlight.icon;

                return (
                  <span
                    key={highlight.label}
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/85 px-3.5 py-3 text-sm font-semibold text-slate-700 shadow-line backdrop-blur"
                  >
                    <Icon className="h-4 w-4 text-mint-700" aria-hidden="true" />
                    {highlight.label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="fade-in-up-delayed mt-9 sm:mt-10">
          {tool.slug === "resume-bullet-generator" ? (
            <ToolWorkspace slug={tool.slug} />
          ) : (
            <GenericToolWorkspace slug={tool.slug} />
          )}
        </div>
      </div>
    </section>
  );
}
