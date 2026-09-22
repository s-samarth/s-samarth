/**
 * Post-build step: bakes the rendered page, JSON-LD, llms.txt and a fresh
 * sitemap into dist/. Runs after both `vite build` passes (see package.json).
 */
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const SITE_URL = "https://www.samarthsaraswat.com";

const { render, jsonLd, llmsTxt } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

// `<` is escaped so no string in the data can close the script tag early.
const ldScript = `<script type="application/ld+json">${jsonLd().replace(/</g, "\\u003c")}</script>`;

const template = await readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("prerender: #root placeholder not found");
const html = template
  .replace('<div id="root"></div>', `<div id="root">${render()}</div>`)
  .replace("</head>", `  ${ldScript}\n  </head>`);
await writeFile(path.join(dist, "index.html"), html);

await writeFile(path.join(dist, "llms.txt"), llmsTxt());

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: index.html (${(html.length / 1024).toFixed(0)} KB), llms.txt, sitemap.xml`);
