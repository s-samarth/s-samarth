import { useEffect, useState } from "react";
import { release } from "@/data/desiDictation";

export interface ReleaseLabel {
  version: string;
  size: string;
}

/**
 * The newest Desi Dictation version and DMG size, read from GitHub when the
 * page loads, so the label under the Download button stays right after a new
 * release without editing this site. Until the answer arrives (and in the
 * prerendered HTML, or if GitHub is unreachable) it shows the values in
 * data/desiDictation.ts.
 *
 * Frontend note: the fetch runs in useEffect, after the first paint, so it
 * never delays the page; `cancelled` stops a late answer from updating a
 * component that has already gone.
 */
export function useLatestRelease(): ReleaseLabel {
  const [label, setLabel] = useState<ReleaseLabel>({ version: release.version, size: release.size });

  useEffect(() => {
    let cancelled = false;
    fetch(release.api)
      .then((res) => (res.ok ? res.json() : null))
      .then((latest: { tag_name?: string; assets?: { name: string; size: number }[] } | null) => {
        if (cancelled || !latest?.tag_name) return;
        const asset = latest.assets?.find((a) => a.name === release.file);
        setLabel({
          version: latest.tag_name.replace(/^v/, ""),
          size: asset ? `${(asset.size / 1e6).toFixed(1)} MB` : release.size,
        });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return label;
}
