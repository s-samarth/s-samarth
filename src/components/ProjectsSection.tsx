import { projects } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./projects/ProjectCard";

export const ProjectsSection = () => (
  <section id="projects" className="section-y border-t border-line">
    <div className="container-x">
      <SectionHeading
        eyebrow="Projects · Open source"
        title={
          <>
            Things I built, then <em>gave away</em>
          </>
        }
        lede="Two of these run entirely on the device in your hand or on your desk, with nothing sent anywhere. The third is a free study hub. All three are on GitHub."
      />

      <div className="mt-8 border-t border-line">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  </section>
);
