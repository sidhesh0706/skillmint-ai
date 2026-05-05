import { seoLandingPages } from "@/data/seo-landing-pages";
import { tools } from "@/data/tool-config";

const baseUrl = "https://skillmint-ai.vercel.app";

export const dynamic = "force-static";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function createUrlEntry(path: string, lastmod: string) {
  const normalizedPath = path;
  const loc = `${baseUrl}${normalizedPath}`;

  return [
    "  <url>",
    `    <loc>${escapeXml(loc)}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    "  </url>",
  ].join("\n");
}

export function GET() {
  const lastmod = new Date().toISOString().slice(0, 10);
  const staticRoutes = ["/", "/tools", "/resources", "/privacy", "/terms", "/contact"];
  const seoRoutes = seoLandingPages.map((page) => `/${page.slug}`);
  const toolRoutes = tools.map((tool) => `/tools/${tool.slug}`);
  const routes = [...staticRoutes, ...seoRoutes, ...toolRoutes];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...routes.map((route) => createUrlEntry(route, lastmod)),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Content-Type": "application/xml; charset=utf-8",
      "X-Robots-Tag": "index, follow",
    },
  });
}
