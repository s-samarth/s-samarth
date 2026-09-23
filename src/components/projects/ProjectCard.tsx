import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project, ProjectSpec } from "@/data/projects";
import { Reveal } from "../Reveal";
import { Highlight } from "../notebook/Highlight";
import { ProjectPrint } from "./ProjectPrint";
import { LabNotes } from "./LabNotes";

interface ProjectCardProps {
  project: Project;
  /** Position in the list, written in the margin as the experiment number. */
  index: number;
}

/** Off-site links open in a new tab; pages on this site open in place. */
const external = (href: string) => (href.startsWith("/") ? {} : { target: "_blank", rel: "noopener noreferrer" });

/** A spec value, with the highlighter over its one number to remember. */
const SpecValue = ({ spec }: { spec: ProjectSpec }) => {
  if (!spec.mark) return <>{spec.value}</>;
  const [before, after] = spec.value.split(spec.mark);
  return (
    <>
      {before}
      <Highlight delay={0.4}>{spec.mark}</Highlight>
      {after}
    </>
  );
};

/**
 * One experiment. Results come first: the one-liner, then the print beside
 * the lab results and links. The long story is folded into "lab notes" for
 * anyone who wants it. Prints alternate sides on large screens.
 */
export const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const exp = `Exp.${String(index + 1).padStart(2, "0")}`;
  const flip = index % 2 === 1;
  return (
    <article className="relative py-16 lg:py-[72px]">
      <span className="margin-no top-[4.3rem] lg:top-[4.8rem]">{exp}</span>
      <Reveal className="max-w-[46rem]">
        <p className="label">
          <span className="!text-redpen md:hidden">{exp} · </span>
          {project.kind}
        </p>
        <h3 className="headline mt-2.5 text-[2.6rem] md:text-[3.4rem]">{project.title}</h3>
        <p className="mt-4 text-[21px] leading-snug text-graphite md:text-[23px]">{project.oneLiner}</p>
      </Reveal>

      <div className="mt-11 grid grid-cols-[minmax(0,1fr)] items-start gap-[88px] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-16">
        <div className={flip ? "lg:order-2" : ""}>
          <ProjectPrint project={project} index={index} />
        </div>

        <Reveal delay={0.1} className={flip ? "lg:order-1" : ""}>
          <p className="label">Lab results</p>
          <dl className="mt-3 border-t-2 border-graphite">
            {project.specs.map((spec) => (
              <div key={spec.key} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-dotted border-graphite-soft/60 py-2.5">
                <dt className="label pt-0.5 !text-[11px]">{spec.key}</dt>
                <dd className="font-mono text-[13.5px] leading-relaxed text-graphite">
                  <SpecValue spec={spec} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 flex flex-wrap items-center gap-6">
            {project.live && (
              <a href={project.live.href} {...external(project.live.href)} className="btn-stamp">
                {project.live.label} {project.live.href.startsWith("/") ? <ArrowRight size={15} /> : <ArrowUpRight size={15} />}
              </a>
            )}
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-pen">
              Code on GitHub <ArrowUpRight size={14} />
            </a>
          </div>

          <LabNotes paragraphs={project.body} />
        </Reveal>
      </div>
    </article>
  );
};
