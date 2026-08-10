import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BarChart3,
  FileDown,
  ShieldCheck,
  Sparkles,
  Wand2,
} from "lucide-react";
import { ComingSoonTool } from "@/components/coming-soon-tool";
import { GenericToolWorkspace } from "@/components/generic-tool-workspace";
import { ToolIdentityPanel } from "@/components/generic-tool-workspace/tool-identity-panel";
import { JsonLd } from "@/components/json-ld";
import { PremiumPageShell } from "@/components/premium-page-shell";
import { ToolWorkspace } from "@/components/tool-workspace";
import { TrustPills } from "@/components/trust-pills";
import { getToolBySlug, tools } from "@/data/tool-config";
import {
  breadcrumbSchema,
  softwareApplicationSchema,
} from "@/lib/structured-data";

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
    label: "Guided workspace",
    icon: Sparkles,
  },
  {
    label: "Scored results",
    icon: BarChart3,
  },
  {
    label: "Truthful rewrites",
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

export async function generateMetadata({
  params,
}: ToolPageProps): Promise<Metadata> {
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
      <section className="premium-shell relative overflow-hidden py-12 sm:py-16 lg:py-[4.5rem]">
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
        <section className="resume-tool-intro">
          <div className="container-shell">
            <div className="resume-tool-intro-inner">
              <div className="flex min-w-[15rem] shrink-0 items-center gap-3">
                <span className="resume-tool-mark">
                  <Sparkles className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-emerald-700">
                      {tool.category}
                    </p>
                    <span className="resume-live-status">Live</span>
                  </div>
                  <h1 className="mt-0.5 text-lg font-semibold leading-tight tracking-[-0.035em] text-slate-950 sm:whitespace-nowrap sm:text-2xl">
                    {tool.name}
                  </h1>
                </div>
              </div>

              <p className="hidden max-w-xl text-sm leading-6 text-slate-600 lg:block">
                Turn honest work notes into five scored, recruiter-ready bullets
                with keyword and rewrite guidance.
              </p>

              <div className="resume-tool-signals">
                {liveToolHighlights.slice(0, 3).map((highlight) => {
                  const Icon = highlight.icon;

                  return (
                    <span key={highlight.label} className="resume-tool-signal">
                      <Icon
                        className="h-3.5 w-3.5 text-emerald-600"
                        aria-hidden="true"
                      />
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
          side={<ToolIdentityPanel slug={tool.slug} icon={tool.icon} />}
          compact
        >
          <TrustPills />
        </PremiumPageShell>
      )}

      <section className="workspace-shell py-4 sm:py-5">
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
