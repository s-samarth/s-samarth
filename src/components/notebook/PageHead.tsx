import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

interface PageHeadProps {
  /** Margin page number, e.g. "03". */
  page: string;
  /** Typewritten section name next to the page number. */
  name: string;
  title?: ReactNode;
  lede?: ReactNode;
}

/**
 * Opens a notebook page: the page number sits wholly left of the red margin
 * rule on tablets and up, and inline above the headline on phones.
 */
export const PageHead = ({ page, name, title, lede }: PageHeadProps) => (
  <Reveal className="relative max-w-3xl">
    <span className="margin-no top-1">p.{page}</span>
    <p className="label">
      <span className="!text-redpen md:hidden">p.{page} · </span>
      {name}
    </p>
    {title && <h2 className="headline mt-3 text-[2.6rem] sm:text-5xl md:text-[3.6rem]">{title}</h2>}
    {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
  </Reveal>
);
