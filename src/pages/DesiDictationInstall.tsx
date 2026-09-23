import { Footer } from "@/components/Footer";
import { ProductNav } from "@/components/desi/ProductNav";
import { DownloadStamp } from "@/components/desi/DdHero";
import { InstallSection } from "@/components/desi/InstallSection";
import { StuckSection } from "@/components/desi/StuckSection";
import { DdCta } from "@/components/desi/DdCta";
import { release, requirements } from "@/data/desiDictation";
import { riseDelay } from "@/lib/rise";
import { useRouteTitle } from "@/seo/useRouteTitle";

/** The install guide's first screen: what you're installing and the download. */
const InstallHero = () => (
  <section id="top">
    <div className="page-x pb-4 pt-24 md:pt-28">
      <p className="rise label" style={riseDelay(0.1)}>
        <span className="!text-redpen">p.01 · </span>Desi Dictation · Install guide
      </p>
      <h1 className="rise headline mt-6 max-w-3xl text-[3rem] sm:text-6xl md:text-[4.4rem]" style={riseDelay(0.2)}>
        Install Desi Dictation <em className="text-redpen">on your Mac.</em>
      </h1>
      <div className="rise mt-9" style={riseDelay(0.35)}>
        <DownloadStamp />
        <p className="label mt-4 !text-[11px]">
          v{release.version} · {release.size} DMG · {requirements.slice(0, 2).join(" · ")}
        </p>
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
