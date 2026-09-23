import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

interface InstallStepProps {
  n: number;
  /** One sentence: what the reader gets done in this step. */
  title: ReactNode;
  /** A small red stamp above the title, e.g. "DMG route only". */
  tag?: string;
  children: ReactNode;
}

/**
 * One numbered step of the install: a big red-pen numeral, then the step.
 * Rendered as an <li> so the whole list reads as an ordered list to
 * screen readers; the visible numeral is decorative (aria-hidden).
 */
export const InstallStep = ({ n, title, tag, children }: InstallStepProps) => (
  <li className="py-12 md:py-14">
    <Reveal className="grid grid-cols-[minmax(0,1fr)] gap-x-8 gap-y-3 md:grid-cols-[4.5rem_minmax(0,1fr)]">
      <span className="headline text-[3.4rem] italic leading-none text-redpen md:text-[4.2rem]" aria-hidden="true">
        {n}
      </span>
      <div className="min-w-0">
        {tag && (
          <p className="mb-2 inline-block -rotate-1 border-2 border-redpen/70 px-1.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-redpen md:mt-2">
            {tag}
          </p>
        )}
        <h3 className="headline text-[1.9rem] leading-tight md:mt-2 md:text-[2.3rem]">{title}</h3>
        <div className="mt-4 max-w-[54rem] space-y-4 text-[18px] leading-relaxed text-graphite-dim [&>p]:max-w-2xl [&>table]:max-w-3xl">
          {children}
        </div>
      </div>
    </Reveal>
  </li>
);

/** A keyboard key, drawn as a small paper keycap. */
export const Key = ({ children }: { children: ReactNode }) => (
  <kbd className="mx-0.5 inline-flex min-w-[1.9em] items-center justify-center border-2 border-b-[3px] border-graphite/70 bg-paper-card px-1.5 font-mono text-[0.8em] font-medium text-graphite">
    {children}
  </kbd>
);
