import type { Project } from "@/data/projects";

/** A bright wash behind each animation, so every print has its own colour. */
export const washes: Record<Project["id"], string> = {
  "survive-ai": "bg-[radial-gradient(ellipse_at_20%_10%,#CFF5E7,transparent_60%),radial-gradient(ellipse_at_90%_90%,#FFE3C2,transparent_55%)] bg-[#EEFAF5]",
  "desi-dictation": "bg-[radial-gradient(ellipse_at_15%_15%,#FFE7B8,transparent_60%),radial-gradient(ellipse_at_85%_85%,#FFD3C9,transparent_55%)] bg-[#FFF6E6]",
  "study-hub": "bg-[radial-gradient(ellipse_at_20%_15%,#D9E8FF,transparent_60%),radial-gradient(ellipse_at_85%_90%,#EADDFF,transparent_55%)] bg-[#F3F7FF]",
};
