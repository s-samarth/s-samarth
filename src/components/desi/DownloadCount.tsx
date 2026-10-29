import { useLatestRelease } from "@/hooks/use-latest-release";

/** Indian digit grouping (1,23,456) for an Indian audience. */
const format = (n: number) => n.toLocaleString("en-IN");

/**
 * The live download count at the top of the product page: every download of
 * every release, as GitHub counts them (lib/releaseStats.ts). It shows only a
 * real number: nothing in the prerendered HTML, nothing if GitHub can't be
 * read, never a made-up or rounded-up figure.
 *
 * Frontend note: the row keeps its height while empty (`min-h`), so when the
 * number fades in the headline below doesn't jump (no layout shift).
 */
export const DownloadCount = () => {
  const { downloads } = useLatestRelease();
  const ready = downloads !== null;
  return (
    <div className="min-h-[64px]" aria-live="polite">
      <div className={`transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
        <p className="flex items-baseline gap-3">
          <span className="headline text-[2.6rem] leading-none tabular-nums text-redpen">
            {ready ? format(downloads) : "0"}
          </span>
          <span className="font-serif text-[1.25rem] text-graphite">
            {downloads === 1 ? "download" : "downloads"} so far
          </span>
        </p>
        <p className="label mt-1.5 !text-[10px]">
          live from GitHub · every release ·{" "}
          <a href="#faq" className="underline decoration-dotted underline-offset-2 hover:text-redpen">
            how we count
          </a>
        </p>
      </div>
    </div>
  );
};
