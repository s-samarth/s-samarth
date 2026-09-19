import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

interface ProjectCardProps {
  project: Project;
  /** Position in the list, written in the margin as the experiment number. */
  index: number;
}

/** The animation, printed and taped into the notebook. It settles as you scroll to it. */
const Print = ({ project, index }: ProjectCardProps) => {
  const Scene = scenes[project.id];
  const ref = useRef<HTMLDivElement>(null);
  const tilt = index % 2 === 0 ? -1 : 1;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [tilt * 5, tilt * 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={ref} className="relative">
      <motion.div style={{ rotate, y }} className="print">
        <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-2" />
        <div className="relative aspect-[4/5] overflow-hidden bg-ink font-sans sm:aspect-[5/4] lg:aspect-[4/3]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(92,200,232,0.10),transparent_55%),radial-gradient(ellipse_at_80%_90%,rgba(242,163,58,0.12),transparent_55%)]" />
          <div className="relative h-full w-full">
            <Scene />
          </div>
        </div>
        <p className="label mt-2.5 px-1 !text-[10px]">fig. {index + 2} · {project.kind}</p>
      </motion.div>
      <div className="absolute -bottom-14 right-2 z-10 flex items-end md:-right-4">
        <Scribble shape="arrow-up" className="mb-5 h-10 w-12 text-biro" delay={0.3} />
        <span className="hand -rotate-3 text-[24px]">{project.note}</span>
      </div>
    </div>
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
