import { ArrowUpRight, Download } from "lucide-react";
import { release, requirements } from "@/data/desiDictation";
import { riseDelay } from "@/lib/rise";
import { Highlight } from "../notebook/Highlight";
import { DesiDictationScene } from "../projects/DesiDictationScene";
import { washes } from "../projects/washes";

/** The primary action, reused at the foot of the page. One per view. */
export const DownloadStamp = () => (
  <a href={release.url} className="btn-stamp !px-6 !py-3 !text-[14px]">
    <Download size={16} /> Download for Mac
  </a>
);

/**
 * Page one of the product page: name, the promise, the download, and the
 * looping scene from the home page printed large. Entrances use CSS `.rise`
 * so the prerendered HTML is readable before JavaScript loads.
 */
export const DdHero = () => (
  <section id="top" className="relative">
    <div className="page-x pb-16 pt-24 md:pb-24 md:pt-28">
      <p className="rise label relative" style={riseDelay(0.1)}>
        <span className="!text-redpen">p.01 · </span>Exp.02 · Local speech · macOS · Free beta
      </p>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div>
          <h1 className="rise headline text-[3.4rem] sm:text-7xl md:text-[5.2rem]" style={riseDelay(0.2)}>
            Desi Dictation
          </h1>
          <p className="rise mt-5 max-w-xl text-[21px] leading-snug text-graphite md:text-[24px]" style={riseDelay(0.3)}>
            Hold a key,{" "}
            <em>
              <Highlight delay={1}>speak the way you actually talk</Highlight>
            </em>
            , release. Roman-script Hinglish lands in whatever app you are typing in.
          </p>
          <p className="rise lede mt-4 max-w-xl" style={riseDelay(0.4)}>
            No cloud, no subscription, no account. Your voice never leaves your Mac.
          </p>

          <div className="rise mt-9" style={riseDelay(0.5)}>
            <DownloadStamp />
            <p className="label mt-4 !text-[11px]">
              v{release.version} · {release.size} DMG · {requirements.slice(0, 2).join(" · ")}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <a href="#install" className="btn-pen">
                How to install
              </a>
              <a href={release.repo} target="_blank" rel="noopener noreferrer" className="btn-pen">
                Code on GitHub <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <p className="rise hand mt-8 -rotate-1 text-[24px]" style={riseDelay(0.7)}>
            not notarised by Apple yet, so do read step 2 ↓
          </p>
        </div>

        <figure className="rise relative" style={riseDelay(0.35)}>
          <div className="print">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
            <div className={`relative aspect-[4/5] overflow-hidden font-sans sm:aspect-[5/4] ${washes["desi-dictation"]}`}>
              <DesiDictationScene />
            </div>
            <figcaption className="label mt-2.5 px-1 !text-[10px]">fig. 1 · Hold right ⌥, speak, release</figcaption>
          </div>
        </figure>
      </div>
    </div>
  </section>
);
