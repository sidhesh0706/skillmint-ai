import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
        <div className="fade-in-up mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase text-mint-700">{tool.category}</p>
          <h1 className="mt-3 text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
            {tool.name}
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{tool.longDescription}</p>
          <div className="mt-5">
            <TrustPills centered />
          </div>
        </div>

        <div className="fade-in-up-delayed mt-9 sm:mt-10">
          <ToolWorkspace slug={tool.slug} />
        </div>
      </div>
    </section>
  );
}
