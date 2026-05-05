import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BarChart3, FileDown, History, ShieldCheck, Wand2 } from "lucide-react";
import { ComingSoonTool } from "@/components/coming-soon-tool";
import { ToolWorkspace } from "@/components/tool-workspace";
import { TrustPills } from "@/components/trust-pills";
import { getToolBySlug, tools } from "@/data/tool-config";

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
    label: "Scored bullets",
    icon: BarChart3,
  },
  {
    label: "Stronger rewrites",
    icon: Wand2,
  },
  {
    label: "Private history",
    icon: History,
  },
  {
    label: "Clean exports",
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
    },
    twitter: {
      card: "summary_large_image",
      title: `${tool.seo.title} | SkillMint AI`,
      description: tool.seo.description,
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
        <div className="hero-glow absolute inset-x-0 top-0 -z-10 h-[30rem]" />
        <div className="container-shell">
          <ComingSoonTool tool={tool} />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-[4.5rem]">
      <div className="hero-glow absolute inset-x-0 top-0 -z-10 h-[30rem]" />
      <div className="container-shell">
        <div className="fade-in-up mx-auto max-w-4xl text-center">
          <p className="inline-flex items-center justify-center rounded-full border border-mint-100 bg-white/80 px-4 py-2 text-sm font-semibold uppercase text-mint-700 shadow-line backdrop-blur">
            {tool.category}
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
            {tool.name}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate-600">
            {tool.longDescription}
          </p>
          <div className="mt-5">
            <TrustPills centered />
          </div>
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-2">
            {liveToolHighlights.map((highlight) => {
              const Icon = highlight.icon;

              return (
                <span
                  key={highlight.label}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/85 px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-line backdrop-blur"
                >
                  <Icon className="h-4 w-4 text-mint-700" aria-hidden="true" />
                  {highlight.label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="fade-in-up-delayed mt-9 sm:mt-10">
          <ToolWorkspace slug={tool.slug} />
        </div>
      </div>
    </section>
  );
}
