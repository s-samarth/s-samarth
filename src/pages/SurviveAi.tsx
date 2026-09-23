import { Footer } from "@/components/Footer";
import { ProductNav } from "@/components/product/ProductNav";
import { FaqSection } from "@/components/product/FaqSection";
import { SaHero } from "@/components/survive/SaHero";
import { WhySection } from "@/components/survive/WhySection";
import { SituationsSection } from "@/components/survive/SituationsSection";
import { HowSection } from "@/components/survive/HowSection";
import { HonestSection } from "@/components/survive/HonestSection";
import { SaCompareSection } from "@/components/survive/SaCompareSection";
import { FreeSection } from "@/components/survive/FreeSection";
import { SaCta } from "@/components/survive/SaCta";
import { saFaqs } from "@/data/saProduct";
import { saNav } from "@/data/surviveAi";
import { useRouteTitle } from "@/seo/useRouteTitle";

/**
 * /survive-ai: the product's own page, in the same notebook and with the
 * same shape as /desi-dictation. The install steps live on their own page
 * (/survive-ai/install).
 */
const SurviveAi = () => {
  useRouteTitle("/survive-ai");
  return (
    <div className="min-h-screen">
      <ProductNav config={saNav} />
      <main className="relative z-10">
        <SaHero />
        <WhySection />
        <SituationsSection />
        <HowSection />
        <HonestSection />
        <SaCompareSection />
        <FreeSection />
        <FaqSection page="08" faqs={saFaqs} />
        <SaCta />
      </main>
      <Footer />
    </div>
  );
};

export default SurviveAi;
