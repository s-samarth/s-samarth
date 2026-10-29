/**
 * Desi Dictation's public numbers, worked out from GitHub's own release
 * data: the newest version, its DMG size, and how many times any DMG has
 * been downloaded, across every release. GitHub counts each release file, so
 * this needs no tracking on the site or in the app.
 *
 * Used by api/downloads.ts (cached for every visitor) and, as a fallback, by
 * the page itself, so both always agree. No "@/" imports: the API function
 * imports this file by a relative path, with ".js" (Node ESM needs it).
 */

export interface GithubRelease {
  tag_name: string;
  draft?: boolean;
  prerelease?: boolean;
  assets: { name: string; size: number; download_count: number }[];
}

export interface ReleaseStats {
  /** "0.7.1", from the newest published release. */
  version: string;
  /** The DMG behind the site's button, e.g. "8.3 MB". */
  size: string;
  /** Every DMG download of every release. */
  downloads: number;
  /** The same total by route: this site, the Terminal installer, GitHub. */
  byRoute: { website: number; terminal: number; releasesPage: number };
}

/** The copy only this site's button fetches (see data/desiDictation.ts). */
export const WEB_FILE = "DesiDictation-mac.dmg";
/** The copy install.sh fetches. Any other .dmg is a releases-page download. */
export const TERMINAL_FILE = "DesiDictation.dmg";

/** Sums every release; null when there is no published release to read. */
export function summarize(releases: GithubRelease[]): ReleaseStats | null {
  const published = releases.filter((r) => !r.draft && !r.prerelease);
  const latest = published[0];
  if (!latest) return null;
  const byRoute = { website: 0, terminal: 0, releasesPage: 0 };
  for (const asset of published.flatMap((r) => r.assets)) {
    if (!asset.name.endsWith(".dmg")) continue;
    if (asset.name === WEB_FILE) byRoute.website += asset.download_count;
    else if (asset.name === TERMINAL_FILE) byRoute.terminal += asset.download_count;
    else byRoute.releasesPage += asset.download_count;
  }
  const dmg = latest.assets.find((a) => a.name === WEB_FILE) ?? latest.assets.find((a) => a.name.endsWith(".dmg"));
  return {
    version: latest.tag_name.replace(/^v/, ""),
    size: dmg ? `${(dmg.size / 1e6).toFixed(1)} MB` : "",
    downloads: byRoute.website + byRoute.terminal + byRoute.releasesPage,
    byRoute,
  };
}
