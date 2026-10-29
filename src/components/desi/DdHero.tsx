import { ArrowRight, Download } from "lucide-react";
import { INSTALL_PATH, release, requirements } from "@/data/desiDictation";
import { riseDelay } from "@/lib/rise";
import { useLatestRelease } from "@/hooks/use-latest-release";
import { Highlight } from "../notebook/Highlight";
import { DesiDictationScene } from "../projects/DesiDictationScene";
import { DownloadCount } from "./DownloadCount";
import { OneLineInstall } from "./OneLineInstall";
import { washes } from "../projects/washes";

/** "v0.7.0 · 8.3 MB · macOS 14+ · Apple Silicon", kept current from GitHub. */
export const ReleaseLabel = ({ suffix = "" }: { suffix?: string }) => {
  const latest = useLatestRelease();
  return (
    <>
      v{latest.version} · {latest.size}
      {suffix} · {requirements.slice(0, 2).join(" · ")}
    </>
  );
};

/** The primary action, reused at the foot of the page. One per view. */
export const DownloadStamp = () => (
  <a href={release.url} className="btn-stamp !px-6 !py-3 !text-[14px]">
    <Download size={16} /> Download for Mac
  </a>
);

/**
 * The product page's first screen: name, the promise, the download, and the
 * looping scene from the home page printed large. Entrances use CSS `.rise`
 * so the prerendered HTML is readable before JavaScript loads.
 */
export const DdHero = () => (
  <section id="top" className="relative">
    <div className="page-x pb-16 pt-24 md:pb-24 md:pt-28">
      <p className="rise label relative" style={riseDelay(0.1)}>
        <span className="!text-redpen">p.01 · </span>Dictation you can trust · Mac · Free beta
      </p>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div>
          <div className="rise mb-6" style={riseDelay(0.15)}>
            <DownloadCount />
          </div>
          <h1 className="rise headline text-[3.4rem] sm:text-7xl md:text-[5.2rem]" style={riseDelay(0.2)}>
            Desi Dictation
          </h1>
          <p
            className="rise mt-5 max-w-xl text-[21px] leading-snug text-graphite md:text-[24px]"
            style={riseDelay(0.3)}
          >
            Hold a key,{" "}
            <em>
              <Highlight delay={1}>speak the way you actually talk</Highlight>
            </em>
            , release. English, Roman-script Hinglish or हिन्दी lands in whatever app you are typing in.
          </p>
          <p className="rise lede mt-4 max-w-xl" style={riseDelay(0.4)}>
            It checks with you only when it’s unsure, and never swaps a word on a guess. No cloud, no account: your
            voice never leaves your Mac.
          </p>

          <div className="rise mt-9" style={riseDelay(0.5)}>
            <DownloadStamp />
            <p className="label mt-4 !text-[11px]">
              <ReleaseLabel suffix=" DMG" />
            </p>
            <div className="mt-8 max-w-xl">
              <OneLineInstall compact />
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <a href={INSTALL_PATH} className="btn-pen">
                Install guide <ArrowRight size={14} />
              </a>
              <a href="#watch" className="btn-pen">
                Watch the film
              </a>
              <a href="#compare" className="btn-pen">
                How it compares
              </a>
            </div>
          </div>

          <p className="rise hand mt-8 -rotate-1 text-[24px]" style={riseDelay(0.7)}>
            the Terminal way skips Apple’s “could not verify” warning
          </p>
        </div>

        <figure className="rise relative" style={riseDelay(0.35)}>
          <div className="print">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
            <div
              className={`relative aspect-[4/5] overflow-hidden font-sans sm:aspect-[5/4] ${washes["desi-dictation"]}`}
            >
              <DesiDictationScene />
            </div>
            <figcaption className="label mt-2.5 px-1 !text-[10px]">fig. 1 · Hold right ⌥, speak, release</figcaption>
          </div>
        </figure>
      </div>
    </div>
  </section>
);
