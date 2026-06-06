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
      <section className="premium-dark-shell py-12 sm:py-16 lg:py-[4.5rem]">
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
      <PremiumPageShell
        eyebrow={tool.category}
        title={tool.name}
        description={tool.longDescription}
        dark
        side={
          <div className="command-panel p-4">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-mint-100">
              Workspace signals
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {liveToolHighlights.map((highlight) => {
                const Icon = highlight.icon;

                return (
                  <span
                    key={highlight.label}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.08] px-3.5 py-3 text-sm font-semibold text-slate-100 shadow-line backdrop-blur"
                  >
                    <Icon className="h-4 w-4 text-mint-300" aria-hidden="true" />
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

      <section className="premium-shell py-10 sm:py-12">
        <div className="container-shell">
        <div className="fade-in-up-delayed">
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
