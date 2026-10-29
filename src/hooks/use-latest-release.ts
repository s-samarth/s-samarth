import { useEffect, useState } from "react";
import { release } from "@/data/desiDictation";
import { summarize, type GithubRelease, type ReleaseStats } from "@/lib/releaseStats";

export interface ReleaseLabel {
  version: string;
  size: string;
  /** Downloads of every release; null until the count arrives (or if it can't). */
  downloads: number | null;
}

/** Asks our cached endpoint; in `vite dev` (no /api) or if it fails, GitHub directly. */
async function load(): Promise<ReleaseStats | null> {
  try {
    const res = await fetch("/api/downloads");
    if (res.ok) return (await res.json()) as ReleaseStats;
  } catch {
    // fall through to GitHub
  }
  const res = await fetch(release.api);
  return res.ok ? summarize((await res.json()) as GithubRelease[]) : null;
}

/** One request per page view, however many components ask. */
let pending: Promise<ReleaseStats | null> | null = null;

/**
 * The newest Desi Dictation version, DMG size and total downloads, read when
 * the page loads, so the label and the count stay right after a new release
 * without editing this site. Until the answer arrives (and in the
 * prerendered HTML) the label shows the values in data/desiDictation.ts and
 * the count is null, so nothing made-up is ever shown.
 *
 * Frontend note: the fetch runs in useEffect, after the first paint, so it
 * never delays the page. `pending` is shared at module level, so the hero,
 * the counter and the install page reuse one request. `cancelled` stops a
 * late answer from updating a component that has already gone.
 */
export function useLatestRelease(): ReleaseLabel {
  const [label, setLabel] = useState<ReleaseLabel>({ version: release.version, size: release.size, downloads: null });

  useEffect(() => {
    let cancelled = false;
    pending ??= load().catch(() => null);
    pending.then((stats) => {
      if (cancelled || !stats) return;
      setLabel({ version: stats.version, size: stats.size || release.size, downloads: stats.downloads });
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return label;
}
