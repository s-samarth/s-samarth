import { projects } from "@/data/projects";
import { PageHead } from "./notebook/PageHead";
import { ProjectCard } from "./projects/ProjectCard";

export const ProjectsSection = () => (
  <section id="built">
    <div className="page-x py-24 md:py-32">
      <PageHead
        page="03"
        name="Built · Open source"
        title={
          <>
            Things I built, then <em className="text-redpen">gave away.</em>
          </>
        }
        lede="Two of these run entirely on the device in your hand or on your desk, with nothing sent anywhere. The third is a free study hub. All three are on GitHub."
      />
      <div className="mt-8 divide-y divide-dashed divide-graphite-soft/50">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  </section>
);
