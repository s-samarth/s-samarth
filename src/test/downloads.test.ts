import { afterEach, describe, expect, it, vi } from "vitest";
import { GET } from "../../api/downloads";
import { summarize, type GithubRelease } from "@/lib/releaseStats";

const dmg = (name: string, download_count: number, size = 8_300_000) => ({ name, size, download_count });

const releases: GithubRelease[] = [
  { tag_name: "v0.8.0-rc1", prerelease: true, assets: [dmg("DesiDictation.dmg", 50)] },
  {
    tag_name: "v0.7.1",
    assets: [dmg("DesiDictation-mac.dmg", 3), dmg("DesiDictation.dmg", 4), dmg("DesiDictation-0.7.1.dmg", 1), dmg("DesiDictation.dmg.sha256", 9)],
  },
  { tag_name: "v0.6.2", assets: [dmg("DesiDictation.dmg", 6), dmg("DesiDictation-0.6.2.dmg", 4)] },
];

describe("summarize", () => {
  it("adds every published release's DMGs, by route", () => {
    expect(summarize(releases)).toEqual({
      version: "0.7.1",
      size: "8.3 MB",
      downloads: 18,
      byRoute: { website: 3, terminal: 10, releasesPage: 5 },
    });
  });

  it("skips pre-releases, drafts and checksum files", () => {
    expect(summarize(releases)?.downloads).toBe(18);
  });

  it("returns null with nothing published", () => {
    expect(summarize([releases[0]])).toBeNull();
  });
});

describe("GET /api/downloads", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("answers with the totals and lets the CDN cache them", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify(releases))));
    const res = await GET();
    expect(res.status).toBe(200);
    expect((await res.json()).downloads).toBe(18);
    expect(res.headers.get("cache-control")).toContain("s-maxage=600");
  });

  it("says so, uncached, when GitHub fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("rate limited", { status: 403 })));
    vi.spyOn(console, "error").mockImplementation(() => {});
    const res = await GET();
    expect(res.status).toBe(502);
    expect(res.headers.get("cache-control")).toBe("no-store");
  });
});
