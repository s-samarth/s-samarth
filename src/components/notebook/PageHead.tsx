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
 * Opens a notebook page: the page number sits in the red-ruled margin on
 * tablets and up, and inline above the headline on phones.
 */
export const PageHead = ({ page, name, title, lede }: PageHeadProps) => (
  <Reveal className="relative max-w-3xl">
    <span className="label absolute -left-[4.6rem] top-1 hidden w-12 text-right !text-redpen md:block">p.{page}</span>
    <p className="label">
      <span className="!text-redpen md:hidden">p.{page} · </span>
      {name}
    </p>
    {title && <h2 className="headline mt-3 text-[2.6rem] sm:text-5xl md:text-[3.6rem]">{title}</h2>}
    {lede && <p className="lede mt-5 max-w-2xl">{lede}</p>}
  </Reveal>
);
