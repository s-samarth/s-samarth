import { ChapterProvider } from "@/chapters/ChapterContext";
import { Atmosphere } from "@/components/Atmosphere";
import { ChapterRail } from "@/components/ChapterRail";
import { Letterbox } from "@/components/Letterbox";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { WhoSection } from "@/components/WhoSection";
import { NowSection } from "@/components/NowSection";
import { BeforeSection } from "@/components/BeforeSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => (
  <ChapterProvider>
    <div className="min-h-screen bg-ink">
      <Letterbox />
      <Atmosphere />
      <Navigation />
      <ChapterRail />
      <main className="relative z-10">
        <HeroSection />
        <WhoSection />
        <NowSection />
        <BeforeSection />
        <ProjectsSection />
        <ArticlesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  </ChapterProvider>
);

export default Index;
