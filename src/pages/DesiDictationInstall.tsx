import { Footer } from "@/components/Footer";
import { ProductNav } from "@/components/desi/ProductNav";
import { DownloadStamp } from "@/components/desi/DdHero";
import { InstallSection } from "@/components/desi/InstallSection";
import { StuckSection } from "@/components/desi/StuckSection";
import { DdCta } from "@/components/desi/DdCta";
import { OneLineInstall } from "@/components/desi/OneLineInstall";
import { release, requirements } from "@/data/desiDictation";
import { riseDelay } from "@/lib/rise";
import { useRouteTitle } from "@/seo/useRouteTitle";

/**
 * The install guide's first screen: two ways in. The one-line installer is
 * first because it also skips Apple's warning; the DMG is the by-hand route.
 */
const InstallHero = () => (
  <section id="top">
    <div className="page-x pb-4 pt-24 md:pt-28">
      <p className="rise label" style={riseDelay(0.1)}>
        <span className="!text-redpen">p.01 · </span>Desi Dictation · Install guide
      </p>
      <h1 className="rise headline mt-6 max-w-3xl text-[3rem] sm:text-6xl md:text-[4.4rem]" style={riseDelay(0.2)}>
        Install Desi Dictation <em className="text-redpen">on your Mac.</em>
      </h1>
      <div
        className="rise mt-12 grid grid-cols-[minmax(0,1fr)] items-start gap-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]"
        style={riseDelay(0.35)}
      >
        <div className="min-w-0">
          <h2 className="font-serif text-[1.6rem] font-medium">Fastest: one command</h2>
          <p className="mt-1.5 text-[17px] leading-snug text-graphite-dim">
            It does steps 1 and 2 below for you. Then carry on from step 3.
          </p>
          <div className="mt-6">
            <OneLineInstall />
          </div>
        </div>
        <div className="card rotate-[0.6deg] px-6 pb-6 pt-5">
          <span className="tape -top-3 left-8 !h-5 !w-16 -rotate-3" />
          <h2 className="border-b-2 border-redpen/50 pb-2 font-serif text-[1.6rem] font-medium">Or by hand</h2>
          <p className="mt-3 text-[16.5px] leading-snug text-graphite-dim">
            Download the DMG, then follow every step below, starting at 1.
          </p>
          <div className="mt-6">
            <DownloadStamp />
          </div>
          <p className="label mt-4 !text-[10.5px]">
            v{release.version} · {release.size} · {requirements.slice(0, 2).join(" · ")}
          </p>
        </div>
      </div>
    </div>
  </section>
);

/** /desi-dictation/install: the five steps, then troubleshooting. */
const DesiDictationInstall = () => {
  useRouteTitle("/desi-dictation/install");
  return (
    <div className="min-h-screen">
      <ProductNav />
      <main className="relative z-10">
        <InstallHero />
        <InstallSection />
        <StuckSection />
        <DdCta onInstallPage />
      </main>
      <Footer />
    </div>
  );
};

export default DesiDictationInstall;
