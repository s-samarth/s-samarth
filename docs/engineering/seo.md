# Search and link previews

How the site gets read by Google, AI crawlers and chat apps, and the mistakes
already made here so they are not made again.

## How it works

- **Prerendered HTML.** `npm run build` runs `vite build`, an SSR build of
  `src/entry-server.tsx`, then `scripts/prerender.mjs`. Every route in
  `src/seo/routes.ts` becomes a real HTML file with its words, its own
  `<title>`, description, canonical URL, JSON-LD and preview card. React
  hydrates that HTML in the browser (`src/main.tsx`).
- **Routing on Vercel** (`vercel.json`). Each product path is rewritten to its
  HTML file. Anything else that matches no file gets `dist/404.html` with a
  real 404 status. There is deliberately no catch-all rewrite.
- **Preview cards** (`og:image`, `twitter:image`). One per product, set per
  route in `routes.ts`; the install pages reuse their product's card. The
  images live in `src/assets/og/` and are imported, so Vite names them by
  content hash (`/assets/home-BjfPQDrK.jpg`). Designs and how to re-render
  them: [Design.md, "Link previews"](../../Design.md#7-link-previews).
- **Sitemap** (`src/seo/sitemap.ts`). `lastmod` changes only when a page's
  content does. Each entry carries a fingerprint (a hash of the page's words,
  head tags and JSON-LD) in an XML comment; the build fetches the live
  sitemap and keeps the old date for pages whose fingerprint matches. The home
  page's JSON-LD `dateModified` uses the same date.
- **robots.txt** allows everyone, AI crawlers by name. `llms.txt` is a
  Markdown summary for AI assistants (`src/seo/llmsTxt.ts`).

## Adding a page

1. Add the route to `AppRoutes` in `src/App.tsx`.
2. Add it to `prerenderedRoutes` in `src/seo/routes.ts` with `meta` and an
   `image` (a new card, or an existing one).
3. Add a rewrite for it in `vercel.json`, or Vercel will answer 404.

## Build log: failure modes

**Stale link preview (fixed 2026-11).** After the notebook redesign, pasting
the link into WhatsApp or LinkedIn still showed the dark "cinematic" design.
The site was fine; `public/og-image.png` had been made in July, redrawn in
September for pass two, and never redrawn for the notebook. Every page also
shared that one image, so a Desi Dictation link showed the portfolio card.
Two lessons: a redesign is not done until the preview cards are redrawn, and
chat apps cache a preview by image URL for days or weeks, which is why the
cards now have hashed filenames. After changing a card, re-scrape with
LinkedIn's Post Inspector; WhatsApp picks up the new URL on its own.
Keep cards under 300 KB (JPEG): WhatsApp tends to drop larger ones. The old
PNG was 392 KB.

**Soft 404s (fixed 2026-11).** A catch-all rewrite (`/(.*)` to `/`) served the
home page, with status 200 and a canonical pointing home, for any URL at all.
Google files these as duplicates ("Alternate page with proper canonical tag")
or soft 404s and spends crawl time on them. Unknown paths now get a real 404.

**lastmod that always moved (fixed 2026-11).** The sitemap stamped every page
with the build date, and the home JSON-LD stamped `dateModified` with the
build time, on every deploy. Google learns to ignore a `lastmod` that changes
when nothing else does. Both now move only with the content. If the
fingerprint changes on two builds of the same commit, something in a page
renders non-deterministically (a `new Date()`, `Math.random()`); fix that
rather than dropping it from the hash.

## Reading Search Console

| Status | Usually means here |
| --- | --- |
| Page with redirect | `http://`, the bare domain and `http://www` redirecting to `https://www`. Expected. |
| Alternate page with proper canonical tag | A duplicate URL pointing at the real page. Expected in small numbers. |
| Discovered, currently not indexed | Google knows the page and hasn't crawled it yet. Not an error: it is a priority call. What helps is links from elsewhere (GitHub READMEs, LinkedIn) and "Request indexing" in URL Inspection. |
