/**
 * Post-build step: bakes every prerendered page, its JSON-LD and preview card,
 * a 404 page, llms.txt and the sitemap into dist/. Runs after both
 * `vite build` passes (see package.json).
 */
import { readFile, writeFile, mkdir, rm } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");
const SITE_URL = "https://www.samarthsaraswat.com";

const { render, jsonLd, llmsTxt, prerenderedRoutes, parseSitemap, lastmodFor, sitemapXml } = await import(
  pathToFileURL(path.join(ssrDir, "entry-server.js")).href
);

const template = await readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("prerender: #root placeholder not found");

const escapeAttr = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/** Sets the content of every head tag named in `keys`, and fails the build if one is missing. */
const setTags = (html, keys, value) =>
  keys.reduce((out, key) => {
    const tag = new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*"`);
    if (!tag.test(out)) throw new Error(`prerender: <meta ${key}> not found in index.html`);
    return out.replace(tag, `$1${value}"`);
  }, html);

/** Gives a page its own title, description, canonical URL and preview card. */
const withMeta = (html, route) => {
  const url = `${SITE_URL}${route.path}`;
  let out = setTags(html, ["og:image", "twitter:image"], `${SITE_URL}${route.image.src}`);
  out = setTags(out, ["og:image:alt", "twitter:image:alt"], escapeAttr(route.image.alt));
  out = setTags(out, ["og:url"], url).replace(/(<link rel="canonical" href=")[^"]*"/, `$1${url}"`);
  if (!route.meta) return out;
  const title = escapeAttr(route.meta.title);
  out = out.replace(/<title>[^<]*<\/title>/, `<title>${title}</title>`);
  out = setTags(out, ["og:title", "twitter:title"], title);
  return setTags(out, ["description", "og:description", "twitter:description"], escapeAttr(route.meta.description));
};

/** A short hash of what the page says, for the sitemap's lastmod (src/seo/sitemap.ts). */
const fingerprint = (...parts) => createHash("sha256").update(JSON.stringify(parts)).digest("hex").slice(0, 16);

// The live sitemap remembers each page's last real change; if it can't be
// read (first deploy, offline build), every page is dated today.
const previous = await fetch(`${SITE_URL}/sitemap.xml`, { signal: AbortSignal.timeout(5000) })
  .then((res) => (res.ok ? res.text() : ""))
  .catch(() => "");
const lastSeen = parseSitemap(previous);
const today = new Date().toISOString().slice(0, 10);

const pages = [];
for (const route of prerenderedRoutes) {
  const body = render(route.path);
  const page = { url: `${SITE_URL}${route.path}`, fingerprint: fingerprint(route.meta, route.image, body, jsonLd(route.path)) };
  pages.push(page);
  const ld = jsonLd(route.path, `${lastmodFor(page, lastSeen, today)}T00:00:00Z`);
  // `<` is escaped so no string in the data can close the script tag early.
  const ldScript = `<script type="application/ld+json">${ld.replace(/</g, "\\u003c")}</script>`;
  const html = withMeta(template, route)
    .replace('<div id="root"></div>', `<div id="root" data-route="${route.path}">${body}</div>`)
    .replace("</head>", `  ${ldScript}\n  </head>`);
  const out = path.join(dist, route.file);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`prerender: ${route.file} (${(html.length / 1024).toFixed(0)} KB)`);
}

// Vercel serves dist/404.html, with a 404 status, for any path that matches no
// file or rewrite. It must not claim to be the home page or ask to be indexed.
const notFound = template
  .replace(/<title>[^<]*<\/title>/, "<title>Page not found | Samarth Saraswat</title>")
  .replace(/<meta name="robots" content="[^"]*"/, '<meta name="robots" content="noindex"')
  .replace(/\s*<link rel="canonical"[^>]*>/, "")
  .replace('<div id="root"></div>', `<div id="root" data-route="/404">${render("/404")}</div>`);
await writeFile(path.join(dist, "404.html"), notFound);

await writeFile(path.join(dist, "llms.txt"), llmsTxt());

await writeFile(path.join(dist, "sitemap.xml"), sitemapXml(pages, lastSeen, today));

await rm(ssrDir, { recursive: true, force: true });
console.log(`prerender: 404.html, llms.txt, sitemap.xml (${previous ? "dates carried from the live sitemap" : "no live sitemap, dated today"})`);
