import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Reveal } from "../Reveal";
import { Scribble } from "../notebook/Scribble";
import { SurviveAiScene } from "./SurviveAiScene";
import { DesiDictationScene } from "./DesiDictationScene";
import { StudyHubScene } from "./StudyHubScene";

const scenes: Record<Project["id"], () => JSX.Element> = {
  "survive-ai": SurviveAiScene,
  "desi-dictation": DesiDictationScene,
  "study-hub": StudyHubScene,
};

/** A bright wash behind each animation, so every print has its own colour. */
const washes: Record<Project["id"], string> = {
  "survive-ai": "bg-[radial-gradient(ellipse_at_20%_10%,#CFF5E7,transparent_60%),radial-gradient(ellipse_at_90%_90%,#FFE3C2,transparent_55%)] bg-[#EEFAF5]",
  "desi-dictation": "bg-[radial-gradient(ellipse_at_15%_15%,#FFE7B8,transparent_60%),radial-gradient(ellipse_at_85%_85%,#FFD3C9,transparent_55%)] bg-[#FFF6E6]",
  "study-hub": "bg-[radial-gradient(ellipse_at_20%_15%,#D9E8FF,transparent_60%),radial-gradient(ellipse_at_85%_90%,#EADDFF,transparent_55%)] bg-[#F3F7FF]",
};

interface ProjectCardProps {
  project: Project;
  /** Position in the list, written in the margin as the experiment number. */
  index: number;
}

/**
 * The animation, printed and taped into the notebook. The print stays flat
 * and still: rotating or moving a layer that animates inside it makes the
 * browser re-rasterise every frame, which blurs text and stutters.
 */
const Print = ({ project, index }: ProjectCardProps) => {
  const Scene = scenes[project.id];
  return (
    <Reveal className="relative">
      <div className="print">
        <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
        <div className={`relative aspect-[4/5] overflow-hidden font-sans sm:aspect-[5/4] lg:aspect-[4/3] ${washes[project.id]}`}>
          <Scene />
        </div>
        <p className="label mt-2.5 px-1 !text-[10px]">
          fig. {index + 2} · {project.kind}
        </p>
      </div>
      {/* The arrow's head touches the print; its tail sits on the note's baseline. */}
      <div className="absolute left-[12%] top-full z-10 mt-1 flex items-end whitespace-nowrap">
        <Scribble shape="hook-up" className="h-10 w-[100px] shrink-0 text-biro" delay={0.3} />
        <span className="hand -mb-1 ml-1 -rotate-2 text-[24px]">{project.note}</span>
      </div>
    </Reveal>
  );
};

export const ProjectCard = ({ project, index }: ProjectCardProps) => (
  <article className="relative grid items-start gap-16 py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:py-24">
    <span className="label absolute -left-[4.6rem] top-[4.3rem] hidden w-12 text-right !text-redpen md:block lg:top-[6.3rem]">
      Exp.{String(index + 1).padStart(2, "0")}
    </span>
    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
      <Print project={project} index={index} />
    </div>

    <Reveal className={index % 2 === 1 ? "lg:order-1" : ""}>
      <p className="label">
        <span className="!text-redpen md:hidden">Exp.{String(index + 1).padStart(2, "0")} · </span>
        {project.kind}
      </p>
      <h3 className="headline mt-3 text-[2.6rem] md:text-[3.2rem]">{project.title}</h3>
      <p className="mt-5 text-[21px] leading-snug text-graphite md:text-[23px]">{project.oneLiner}</p>
      <div className="mt-5 space-y-4 text-[17px] leading-relaxed text-graphite-dim">
        {project.body.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>

      <dl className="mt-8 border-t-2 border-graphite">
        {project.specs.map((spec) => (
          <div key={spec.key} className="grid grid-cols-[5.5rem_1fr] gap-4 border-b border-dotted border-graphite-soft/60 py-2.5">
            <dt className="label pt-0.5 !text-[11px]">{spec.key}</dt>
            <dd className="font-mono text-[13.5px] leading-relaxed text-graphite">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex flex-wrap items-center gap-6">
        {project.live && (
          <a href={project.live.href} target="_blank" rel="noopener noreferrer" className="btn-stamp">
            {project.live.label} <ArrowUpRight size={15} />
          </a>
        )}
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-pen">
          Code on GitHub <ArrowUpRight size={14} />
        </a>
      </div>
    </Reveal>
  </article>
);
