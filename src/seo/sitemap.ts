/**
 * sitemap.xml with honest <lastmod> dates.
 *
 * Search note: Google only trusts lastmod if it moves when the page's content
 * does. Stamping every page with the build date on every deploy teaches it to
 * ignore the field. So each entry carries a fingerprint of what the page says
 * (in an XML comment, which crawlers skip), and the next build reads the
 * live sitemap back: same fingerprint, same date; new fingerprint, today.
 */

export interface SitemapPage {
  /** Absolute URL, as it goes in <loc>. */
  url: string;
  /** A hash of the page's words and head tags, not of its JS and CSS bundles. */
  fingerprint: string;
}

export interface SitemapRecord {
  lastmod: string;
  fingerprint: string;
}

const entry = /<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>\s*<!-- content ([0-9a-f]+) -->/g;

/** Reads the date and fingerprint the previous sitemap recorded for each URL. */
export const parseSitemap = (xml: string): Map<string, SitemapRecord> => {
  const records = new Map<string, SitemapRecord>();
  for (const [, url, lastmod, fingerprint] of xml.matchAll(entry)) records.set(url, { lastmod, fingerprint });
  return records;
};

/** A page keeps its previous date unless what it says has changed. */
export const lastmodFor = (page: SitemapPage, previous: Map<string, SitemapRecord>, today: string) => {
  const before = previous.get(page.url);
  return before && before.fingerprint === page.fingerprint ? before.lastmod : today;
};

/** The sitemap itself, given the previous one's records (empty on a first build). */
export const sitemapXml = (pages: SitemapPage[], previous: Map<string, SitemapRecord>, today: string) => {
  const urls = pages.map(
    (page) =>
      `  <url>\n    <loc>${page.url}</loc>\n    <lastmod>${lastmodFor(page, previous, today)}</lastmod>\n    <!-- content ${page.fingerprint} -->\n  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
};
