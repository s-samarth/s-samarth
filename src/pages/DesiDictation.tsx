import { useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { DdHero } from "@/components/desi/DdHero";
import { InstallSection } from "@/components/desi/InstallSection";
import { StuckSection } from "@/components/desi/StuckSection";
import { prerenderedRoutes } from "@/seo/routes";

const meta = prerenderedRoutes.find((r) => r.path === "/desi-dictation")?.meta;

/**
 * /desi-dictation: the product page. Same notebook, its own three pages:
 * what it is and the download, the install, and what to do when stuck.
 */
const DesiDictation = () => {
  // The prerendered HTML already has the right <title>; this covers dev mode.
  useEffect(() => {
    if (meta) document.title = meta.title;
  }, []);

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="relative z-10">
        <DdHero />
        <InstallSection />
        <StuckSection />
      </main>
      <Footer />
    </div>
  );
};

export default DesiDictation;
