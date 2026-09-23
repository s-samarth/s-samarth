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

interface ProjectPrintProps {
  project: Project;
  /** Position in the list; the first project is fig. 2 (the photo is fig. 1). */
  index: number;
}

/**
 * The animation, printed and taped into the notebook. The print stays flat
 * and still: rotating or moving a layer that animates inside it makes the
 * browser re-rasterise every frame, which blurs text and stutters.
 */
export const ProjectPrint = ({ project, index }: ProjectPrintProps) => {
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
