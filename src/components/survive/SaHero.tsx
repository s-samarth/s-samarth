import { ArrowRight, Download } from "lucide-react";
import { SA_INSTALL_PATH, saRelease, saRequirements } from "@/data/surviveAi";
import { riseDelay } from "@/lib/rise";
import { Highlight } from "../notebook/Highlight";
import { SurviveAiScene } from "../projects/SurviveAiScene";
import { washes } from "../projects/washes";

/** The primary action, reused down the page. One per view. */
export const ApkStamp = () => (
  <a href={saRelease.url} className="btn-stamp !px-6 !py-3 !text-[14px]">
    <Download size={16} /> Download for Android
  </a>
);

/** Version, size and floor under every download button. */
export const ApkMeta = () => (
  <p className="label mt-4 !text-[11px]">
    v{saRelease.version} · {saRelease.size} APK · {saRequirements.slice(0, 2).join(" · ")}
  </p>
);

/**
 * The product page's first screen: name, the promise, the download, and the
 * looping scene from the home page printed large. Entrances use CSS `.rise`
 * so the prerendered HTML is readable before JavaScript loads.
 */
export const SaHero = () => (
  <section id="top" className="relative">
    <div className="page-x pb-16 pt-24 md:pb-24 md:pt-28">
      <p className="rise label relative" style={riseDelay(0.1)}>
        <span className="!text-redpen">p.01 · </span>Offline survival assistant · Android · Free
      </p>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-center gap-x-16 gap-y-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div>
          <h1 className="rise headline text-[3.4rem] sm:text-7xl md:text-[5.2rem]" style={riseDelay(0.2)}>
            Survive AI
          </h1>
          <p
            className="rise mt-5 max-w-xl text-[21px] leading-snug text-graphite md:text-[24px]"
            style={riseDelay(0.3)}
          >
            When the network goes,{" "}
            <em>
              <Highlight delay={1}>the answer shouldn’t</Highlight>
            </em>
            . Say what’s happening, in English or Hinglish, and get the first thing to do.
          </p>
          <p className="rise lede mt-4 max-w-xl" style={riseDelay(0.4)}>
            A small AI model and eighteen guides written for India, all on the phone. No signal, no account, no cloud.
          </p>

          <div className="rise mt-9" style={riseDelay(0.5)}>
            <ApkStamp />
            <ApkMeta />
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <a href={SA_INSTALL_PATH} className="btn-pen">
                Install guide <ArrowRight size={14} />
              </a>
              <a href="#why" className="btn-pen">
                Why offline
              </a>
            </div>
          </div>

          <p className="rise hand mt-8 -rotate-1 text-[24px]" style={riseDelay(0.7)}>
            set it up on Wi-Fi once. it never needs the internet again
          </p>
        </div>

        <figure className="rise relative" style={riseDelay(0.35)}>
          <div className="print">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
            <div
              className={`relative aspect-[4/5] overflow-hidden font-sans sm:aspect-[5/4] ${washes["survive-ai"]}`}
            >
              <SurviveAiScene />
            </div>
            <figcaption className="label mt-2.5 px-1 !text-[10px]">fig. 1 · Zero bars, 03:12, a dog bite</figcaption>
          </div>
        </figure>
      </div>
    </div>
  </section>
);
