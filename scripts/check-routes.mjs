import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = process.argv[2] || "http://127.0.0.1:3000";

const routeMarkers = new Map([
  ["/", "job-ready career assets."],
  ["/tools", "Build your application kit"],
  ["/resources", "Practical resume guides, curated for the next application."],
  ["/tools/resume-bullet-generator", "Resume Bullet Generator"],
  ["/tools/resume-roast", "Resume critique workspace"],
  ["/tools/job-description-match", "JD match workspace"],
  ["/tools/project-to-resume", "Project packaging workspace"],
  ["/tools/cover-letter-generator", "Cover letter workspace"],
  ["/tools/linkedin-headline-generator", "LinkedIn positioning workspace"],
  ["/about", "A practical AI career workspace for real experience."],
  ["/contact", "Send feedback, tool ideas, or support notes."],
  ["/privacy", "Privacy Policy"],
  ["/terms", "Terms of Use"],
  ["/sitemap.xml", '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'],
  [
    "/robots.txt",
    "Sitemap: https://skillmint-ai.vercel.app/sitemap.xml",
  ],
]);

function extractToolStatuses(source) {
  return [
    ...source.matchAll(
      /slug:\s*"([^"]+)"[\s\S]*?status:\s*"(live|coming-soon)"/g,
    ),
  ].map((match) => ({ slug: match[1], status: match[2] }));
}

function extractPresentationSlugs(source) {
  const start = source.indexOf(
    "const presentations: Record<PurposeToolSlug, PurposeToolPresentation>",
  );
  const end = source.indexOf("\n};", start);

  assert.notEqual(start, -1, "Could not find the presentation config.");
  assert.notEqual(end, -1, "Could not read the presentation config.");

  return new Set(
    [...source.slice(start, end).matchAll(/^\s{2}"([^"]+)":\s*{/gm)].map(
      (match) => match[1],
    ),
  );
}

function extractGenericApiSlugs(source) {
  const match = source.match(
    /const genericSlugs = new Set\(\[([\s\S]*?)\]\);/,
  );

  assert(match, "Could not find the generic API slug allowlist.");

  return new Set([
    "resume-bullet-generator",
    ...[...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]),
  ]);
}

function extractSitemapPaths(source) {
  return new Set(
    [...source.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
      (match) => new URL(match[1]).pathname,
    ),
  );
}

async function validateConfig() {
  const [toolsSource, presentationsSource, apiSource, workspaceSource, sitemap] =
    await Promise.all([
      readFile(join(root, "data", "tool-config.ts"), "utf8"),
      readFile(
        join(
          root,
          "components",
          "generic-tool-workspace",
          "presentation-config.ts",
        ),
        "utf8",
      ),
      readFile(join(root, "app", "api", "tools", "[slug]", "route.ts"), "utf8"),
      readFile(join(root, "components", "generic-tool-workspace.tsx"), "utf8"),
      readFile(join(root, "public", "sitemap.xml"), "utf8"),
    ]);

  const tools = extractToolStatuses(toolsSource);
  const presentations = extractPresentationSlugs(presentationsSource);
  const apiSlugs = extractGenericApiSlugs(apiSource);
  const sitemapPaths = extractSitemapPaths(sitemap);
  const liveTools = tools.filter((tool) => tool.status === "live");
  const comingSoonTools = tools.filter(
    (tool) => tool.status === "coming-soon",
  );

  assert(tools.length > 0, "No tools were found in the central config.");
  assert(
    workspaceSource.includes(
      "throw new Error(`Unsupported live tool workspace: ${slug}`)",
    ),
    "Unsupported tool workspaces must fail explicitly.",
  );

  for (const tool of liveTools) {
    assert(
      apiSlugs.has(tool.slug),
      `Live tool "${tool.slug}" is missing API support.`,
    );

    if (tool.slug !== "resume-bullet-generator") {
      assert(
        presentations.has(tool.slug),
        `Live tool "${tool.slug}" is missing presentation config.`,
      );
    }
  }

  for (const tool of comingSoonTools) {
    assert(
      !apiSlugs.has(tool.slug),
      `Coming-soon tool "${tool.slug}" is exposed by the live API allowlist.`,
    );
  }

  const expectedSitemapPaths = new Set([
    ...routeMarkers.keys(),
    ...tools.map((tool) => `/tools/${tool.slug}`),
  ]);
  expectedSitemapPaths.delete("/sitemap.xml");
  expectedSitemapPaths.delete("/robots.txt");

  for (const path of expectedSitemapPaths) {
    assert(sitemapPaths.has(path), `Sitemap is missing "${path}".`);
  }

  assert(
    sitemap.includes(
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ),
    "Sitemap XML namespace is missing or invalid.",
  );

  console.log(
    `Config checks passed: ${liveTools.length} live tools, ${comingSoonTools.length} coming-soon tools.`,
  );
}

async function checkRoute(path, marker) {
  const url = new URL(path, baseUrl);
  const response = await fetch(url, {
    redirect: "manual",
    signal: AbortSignal.timeout(10_000),
  });
  const body = await response.text();

  assert.equal(response.status, 200, `${path} returned ${response.status}.`);
  assert(body.includes(marker), `${path} is missing "${marker}".`);

  if (path === "/") {
    assert(
      body.includes("Bullet strength improved from 68 to 91 out of 100."),
      "Homepage score comparison is missing accessible text.",
    );
    assert(
      !body.includes("Bullet strength 6891"),
      "Homepage score comparison has collapsed into ambiguous text.",
    );
  }

  if (path === "/sitemap.xml") {
    assert(
      response.headers.get("content-type")?.includes("application/xml"),
      "/sitemap.xml must return Content-Type: application/xml.",
    );
  }

  if (path === "/robots.txt") {
    assert(
      response.headers.get("content-type")?.includes("text/plain"),
      "/robots.txt must return Content-Type: text/plain.",
    );
  }

  console.log(`PASS ${path}`);
}

async function main() {
  await validateConfig();

  for (const [path, marker] of routeMarkers) {
    await checkRoute(path, marker);
  }

  console.log(`Route checks passed against ${baseUrl}.`);
}

main().catch((error) => {
  console.error(`Route check failed: ${error.message}`);
  process.exitCode = 1;
});
