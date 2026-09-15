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

  return (
    <Reveal>
      <article className="grid items-center gap-10 border-b border-line py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Scene frame */}
        <div
          className={`relative aspect-[4/5] overflow-hidden rounded-md border border-line bg-ink-2 sm:aspect-[5/4] lg:aspect-[4/3] ${
            flip ? "lg:order-2" : ""
          }`}
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(92,200,232,0.10),transparent_55%),radial-gradient(ellipse_at_80%_90%,rgba(242,163,58,0.12),transparent_55%)]" />
          <div className="relative h-full w-full">
            <Scene />
          </div>
        </div>

        {/* Copy */}
        <div className={flip ? "lg:order-1" : ""}>
          <p className="eyebrow">{project.kind}</p>
          <h3 className="display mt-4 text-4xl md:text-5xl">{project.title}</h3>
          <p className="mt-5 text-xl leading-relaxed text-bone">{project.oneLiner}</p>
          <div className="mt-5 space-y-4 text-mist">
            {project.body.map((para) => (
              <p key={para.slice(0, 24)} className="leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          <dl className="mt-8 border-t border-line">
            {project.specs.map((spec) => (
              <div key={spec.key} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-line py-2.5 text-sm">
                <dt className="eyebrow pt-0.5">{spec.key}</dt>
                <dd className="text-bone-dim">{spec.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="link-draw inline-flex items-center gap-1.5 text-sm font-medium text-bone"
            >
              View on GitHub <ArrowUpRight size={15} />
            </a>
            {project.live && (
              <a
                href={project.live.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-draw inline-flex items-center gap-1.5 text-sm font-medium text-amber"
              >
                {project.live.label} <ArrowUpRight size={15} />
              </a>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
};
