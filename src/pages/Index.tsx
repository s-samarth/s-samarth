import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WhoSection } from "@/components/WhoSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { DayJobSection } from "@/components/DayJobSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

/** The notebook, page by page. Projects and writing come before the day job on purpose. */
const Index = () => (
  <div className="min-h-screen">
    <Navigation />
    <main className="relative z-10">
      <HeroSection />
      <WhoSection />
      <ProjectsSection />
      <ArticlesSection />
      <DayJobSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Index;
