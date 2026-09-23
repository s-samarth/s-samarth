/**
 * Post-build step: bakes every prerendered page, its JSON-LD, llms.txt and a
 * fresh sitemap into dist/. Runs after both `vite build` passes (see package.json).
 */
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const SITE_URL = "https://www.samarthsaraswat.com";

const { render, jsonLd, llmsTxt, prerenderedRoutes } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = await readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("prerender: #root placeholder not found");

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Swaps the home page's title, description, canonical and social tags for this page's own. */
const withMeta = (html, route) => {
  if (!route.meta) return html;
  const url = `${SITE_URL}${route.path}`;
  const title = escapeAttr(route.meta.title);
  const desc = escapeAttr(route.meta.description);
  return html
    .replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`)
    .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*"/g, `$1${desc}"`)
    .replace(/(<meta (?:property|name)="(?:og:title|twitter:title)" content=")[^"]*"/g, `$1${title}"`)
    .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${url}"`)
    .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
};

for (const route of prerenderedRoutes) {
  // `<` is escaped so no string in the data can close the script tag early.
  const ldScript = `<script type="application/ld+json">${jsonLd(route.path).replace(/</g, "\\u003c")}</script>`;
  const html = withMeta(template, route)
    .replace('<div id="root"></div>', `<div id="root" data-route="${route.path}">${render(route.path)}</div>`)
    .replace("</head>", `  ${ldScript}\n  </head>`);
  const out = path.join(dist, route.file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`prerender: ${route.file} (${(html.length / 1024).toFixed(0)} KB)`);
}

await writeFile(path.join(dist, "llms.txt"), llmsTxt());

const today = new Date().toISOString().slice(0, 10);
const urls = prerenderedRoutes
  .map((r) => `  <url>\n    <loc>${SITE_URL}${r.path === "/" ? "/" : r.path}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);

await rm(ssrDir, { recursive: true, force: true });
console.log("prerender: llms.txt, sitemap.xml");
