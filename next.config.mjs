/** @type {import('next').NextConfig} */
const sitemapHeaders = [
  {
    key: "Content-Type",
    value: "application/xml; charset=utf-8",
  },
  {
    key: "Cache-Control",
    value: "public, max-age=0, must-revalidate",
  },
  {
    key: "X-Robots-Tag",
    value: "index, follow",
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: "/sitemap.xml",
        headers: sitemapHeaders,
      },
      {
        source: "/sitemap-google.xml",
        headers: sitemapHeaders,
      },
    ];
  },
};

export default nextConfig;
