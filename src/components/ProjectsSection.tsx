import { projects } from "@/data/projects";
import { Chapter } from "./Chapter";
import { ChapterIntro } from "./ChapterIntro";
import { ProjectCard } from "./projects/ProjectCard";

export const ProjectsSection = () => (
  <Chapter id="built" className="py-28 md:py-40">
    <div className="container-x">
      <ChapterIntro
        eyebrow="Built · Open source"
        title={
          <>
            Things I built, then <em>gave away.</em>
          </>
        }
        lede="Two of these run entirely on the device in your hand or on your desk, with nothing sent anywhere. The third is a free study hub. All three are on GitHub."
      />

      <div className="mt-8 divide-y divide-line">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  </Chapter>
);
