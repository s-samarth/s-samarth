import { Footer } from "@/components/Footer";
import { ProductNav } from "@/components/product/ProductNav";
import { ApkMeta, ApkStamp } from "@/components/survive/SaHero";
import { SaInstallSection } from "@/components/survive/SaInstallSection";
import { SaStuckSection } from "@/components/survive/SaStuckSection";
import { SaCta } from "@/components/survive/SaCta";
import { saNav } from "@/data/surviveAi";
import { riseDelay } from "@/lib/rise";
import { useRouteTitle } from "@/seo/useRouteTitle";

/** The install guide's first screen: what you're installing and the download. */
const InstallHero = () => (
  <section id="top">
    <div className="page-x pb-4 pt-24 md:pt-28">
      <p className="rise label" style={riseDelay(0.1)}>
        <span className="!text-redpen">p.01 · </span>Survive AI · Install guide
      </p>
      <h1 className="rise headline mt-6 max-w-3xl text-[3rem] sm:text-6xl md:text-[4.4rem]" style={riseDelay(0.2)}>
        Install Survive AI <em className="text-redpen">on your phone.</em>
      </h1>
      <div className="rise mt-9" style={riseDelay(0.35)}>
        <ApkStamp />
        <ApkMeta />
      </div>
    </div>
  </section>
);

/** /survive-ai/install: the four steps, then troubleshooting. */
const SurviveAiInstall = () => {
  useRouteTitle("/survive-ai/install");
  return (
    <div className="min-h-screen">
      <ProductNav config={saNav} />
      <main className="relative z-10">
        <InstallHero />
        <SaInstallSection />
        <SaStuckSection />
        <SaCta onInstallPage />
      </main>
      <Footer />
    </div>
  );
};

export default SurviveAiInstall;
