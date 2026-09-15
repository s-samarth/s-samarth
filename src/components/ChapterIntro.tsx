import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface ChapterIntroProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
}

/**
 * Chapter opener: small accent label, big legible headline, optional lede.
 * Use <em> inside `title` for the word that takes the chapter accent.
 */
export const ChapterIntro = ({ eyebrow, title, lede }: ChapterIntroProps) => (
  <Reveal className="max-w-3xl">
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl">{title}</h2>
    {lede && <p className="lede mt-6 max-w-2xl">{lede}</p>}
  </Reveal>
);
