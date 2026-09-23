import { Footer } from "@/components/Footer";
import { ProductNav } from "@/components/desi/ProductNav";
import { DdHero } from "@/components/desi/DdHero";
import { LanguagesSection } from "@/components/desi/LanguagesSection";
import { FeaturesSection } from "@/components/desi/FeaturesSection";
import { PrivacySection } from "@/components/desi/PrivacySection";
import { CompareSection } from "@/components/desi/CompareSection";
import { FaqSection, PricingSection } from "@/components/desi/PricingFaqSection";
import { DdCta } from "@/components/desi/DdCta";
import { useRouteTitle } from "@/seo/useRouteTitle";

/**
 * /desi-dictation: the product's own page, inside the same notebook. Its
 * header is the product's, and "by Samarth Saraswat" leads back home.
 * The install steps live on their own page (/desi-dictation/install).
 */
const DesiDictation = () => {
  useRouteTitle("/desi-dictation");
  return (
    <div className="min-h-screen">
      <ProductNav />
      <main className="relative z-10">
        <DdHero />
        <LanguagesSection />
        <FeaturesSection />
        <PrivacySection />
        <CompareSection />
        <PricingSection />
        <FaqSection />
        <DdCta />
      </main>
      <Footer />
    </div>
  );
};

export default DesiDictation;
