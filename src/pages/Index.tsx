import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WhoSection } from "@/components/WhoSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

/** The notebook, page by page. The day job is two sticky notes on page one, on purpose. */
const Index = () => (
  <div className="min-h-screen">
    <Navigation />
    <main className="relative z-10">
      <HeroSection />
      <WhoSection />
      <ProjectsSection />
      <ArticlesSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Index;
