import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLandingPage } from "@/components/seo-landing-page";
import { getSeoLandingPage, seoLandingPages } from "@/data/seo-landing-pages";

type SeoRouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return seoLandingPages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: SeoRouteProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.keywords,
    alternates: {
      canonical: `/${page.slug}`,
    },
    openGraph: {
      title: `${page.metaTitle} | SkillMint AI`,
      description: page.metaDescription,
      url: `/${page.slug}`,
      type: "article",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${page.metaTitle} | SkillMint AI`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.metaTitle} | SkillMint AI`,
      description: page.metaDescription,
      images: ["/opengraph-image"],
    },
  };
}

export default async function SeoPage({ params }: SeoRouteProps) {
  const { slug } = await params;
  const page = getSeoLandingPage(slug);

  if (!page) {
    notFound();
  }

  return <SeoLandingPage page={page} />;
}
