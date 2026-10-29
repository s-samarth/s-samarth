/**
 * GET /api/downloads: Desi Dictation's download count and newest version,
 * read from GitHub's public release data (src/lib/releaseStats.ts).
 *
 * Why a function instead of each visitor asking GitHub: GitHub allows 60
 * unauthenticated requests an hour per IP, and many Indian mobile networks
 * put thousands of people behind one IP. Here Vercel's CDN keeps the answer
 * for 10 minutes, so GitHub sees a handful of requests a day whatever the
 * traffic. It reads no visitor data and stores nothing.
 */
import { summarize, type GithubRelease } from "../src/lib/releaseStats";

const RELEASES = "https://api.github.com/repos/s-samarth/desi-dictation/releases?per_page=100";

const json = (status: number, body: unknown, cache: string) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": cache },
  });

export async function GET(): Promise<Response> {
  try {
    const res = await fetch(RELEASES, {
      headers: { accept: "application/vnd.github+json", "user-agent": "samarthsaraswat.com" },
    });
    if (!res.ok) throw new Error(`GitHub answered ${res.status}`);
    const stats = summarize((await res.json()) as GithubRelease[]);
    if (!stats) throw new Error("no published release");
    // Fresh for 10 minutes; after that serve the old answer while refreshing.
    return json(200, stats, "public, max-age=60, s-maxage=600, stale-while-revalidate=86400");
  } catch (error) {
    console.error("downloads:", error instanceof Error ? error.message : error);
    return json(502, { error: "couldn't read GitHub right now" }, "no-store");
  }
}
