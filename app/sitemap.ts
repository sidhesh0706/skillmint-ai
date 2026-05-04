import type { MetadataRoute } from "next";
import { seoLandingPages } from "@/data/seo-landing-pages";
import { tools } from "@/data/tool-config";

const baseUrl = "https://skillmint-ai.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/tools", "/privacy", "/terms", "/contact"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    lastModified: new Date(),
  }));

  const seoRoutes = seoLandingPages.map((page) => ({
    url: `${baseUrl}/${page.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...toolRoutes, ...seoRoutes];
}
