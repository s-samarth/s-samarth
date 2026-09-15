import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Left-aligned by default; center for the contact section. */
  align?: "left" | "center";
}

/**
 * Editorial section opener: mono eyebrow with a hairline, then a Bodoni
 * headline. Use <em> inside `title` for the amber italic emphasis word.
 */
export const SectionHeading = ({ eyebrow, title, lede, align = "left" }: SectionHeadingProps) => {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "mx-auto max-w-2xl text-center" : "max-w-3xl"}>
      <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
        <span className="eyebrow">{eyebrow}</span>
        {!centered && <span className="rule max-w-16" />}
      </div>
      <h2 className="display mt-5 text-[2.5rem] sm:text-5xl md:text-6xl">{title}</h2>
      {lede && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{lede}</p>}
    </Reveal>
  );
};
