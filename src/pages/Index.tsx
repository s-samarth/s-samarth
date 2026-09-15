import { Letterbox } from "@/components/Letterbox";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ArticlesSection } from "@/components/ArticlesSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-ink">
    <Letterbox />
    <Navigation />
    <main>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ArticlesSection />
      <SkillsSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
);

export default Index;
