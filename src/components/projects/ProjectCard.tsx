import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { Reveal } from "../Reveal";
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
  /** Alternate which side the scene sits on. */
  flip: boolean;
}

export const ProjectCard = ({ project, flip }: ProjectCardProps) => {
  const Scene = scenes[project.id];
  const ref = useRef<HTMLElement>(null);

  // The scene frame grows into place as the card scrolls into the middle.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.3, 1]);

  return (
    <article ref={ref} className="grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
      <motion.div
        style={{ scale, opacity }}
        className={`panel relative aspect-[4/5] overflow-hidden sm:aspect-[5/4] lg:aspect-[4/3] ${flip ? "lg:order-2" : ""}`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(92,200,232,0.10),transparent_55%),radial-gradient(ellipse_at_80%_90%,rgba(242,163,58,0.12),transparent_55%)]" />
        <div className="relative h-full w-full">
          <Scene />
        </div>
      </motion.div>

      <Reveal className={flip ? "lg:order-1" : ""}>
        <p className="eyebrow">{project.kind}</p>
        <h3 className="display mt-4 text-4xl md:text-5xl">{project.title}</h3>
        <p className="mt-5 text-xl leading-relaxed text-bone md:text-2xl md:leading-snug">{project.oneLiner}</p>
        <div className="mt-5 space-y-4 text-[16px] leading-relaxed text-mist md:text-[17px]">
          {project.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>

        <dl className="panel mt-8 divide-y divide-line px-5">
          {project.specs.map((spec) => (
            <div key={spec.key} className="grid grid-cols-[5.5rem_1fr] gap-4 py-3 text-[15px]">
              <dt className="pt-0.5 text-[12px] font-medium uppercase tracking-[0.12em] text-mist">{spec.key}</dt>
              <dd className="text-bone-dim">{spec.value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
            View on GitHub <ArrowUpRight size={15} />
          </a>
          {project.live && (
            <a href={project.live.href} target="_blank" rel="noopener noreferrer" className="btn-accent">
              {project.live.label} <ArrowUpRight size={15} />
            </a>
          )}
        </div>
      </Reveal>
    </article>
  );
};
