import { describe, expect, it } from "vitest";
import { parseSitemap, sitemapXml, type SitemapPage } from "@/seo/sitemap";

const home: SitemapPage = { url: "https://example.com/", fingerprint: "aaa111" };
const app: SitemapPage = { url: "https://example.com/app", fingerprint: "bbb222" };

describe("sitemapXml", () => {
  it("dates every page today on a first build", () => {
    const xml = sitemapXml([home, app], new Map(), "2026-11-18");
    expect(xml.match(/<lastmod>2026-11-18<\/lastmod>/g)).toHaveLength(2);
  });

  it("keeps the old date for a page whose content did not change", () => {
    const before = sitemapXml([home, app], new Map(), "2026-11-01");
    const after = sitemapXml([home, { ...app, fingerprint: "ccc333" }], parseSitemap(before), "2026-11-18");
    const dates = parseSitemap(after);
    expect(dates.get(home.url)).toEqual({ lastmod: "2026-11-01", fingerprint: "aaa111" });
    expect(dates.get(app.url)).toEqual({ lastmod: "2026-11-18", fingerprint: "ccc333" });
  });

  it("treats a sitemap without fingerprints as no history", () => {
    const old = "<url><loc>https://example.com/</loc><lastmod>2026-01-01</lastmod></url>";
    expect(parseSitemap(old).size).toBe(0);
  });
});
