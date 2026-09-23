import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Highlight } from "../notebook/Highlight";
import { riseDelay } from "@/lib/rise";

/**
 * The owner's intro, word for word, laid out the way a comic writes a bit:
 * setup, setup, setup, then the punchline in red pen. The SETUP / PUNCH tags
 * hang in the margin on tablets and up, and sit above the lines on phones.
 */
export const BitTag = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <span
    className={`label mb-1.5 block !text-[11px] !text-redpen md:absolute md:right-[calc(100%+2.25rem+7px)] md:m-0 md:whitespace-nowrap md:!text-[10.5px] md:!tracking-[0.1em] ${className}`}
  >
    {children}
  </span>
);

/**
 * The red pen underline. Its own SVG rather than <Scribble>, because it is
 * stretched wide and flat: with `non-scaling-stroke` a stretched `pathLength`
 * dash breaks into dashes, so this one lets the stroke scale instead.
 */
const PunchUnderline = () => (
  <svg
    viewBox="0 0 300 12"
    preserveAspectRatio="none"
    className="pointer-events-none absolute -bottom-3.5 -left-1 h-4 w-[calc(100%+8px)] overflow-visible text-redpen"
    aria-hidden="true"
  >
    <motion.path
      d="M2 8 C 80 3, 190 11, 298 5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 2.2, ease: "easeInOut" }}
    />
  </svg>
);

const setup = [
  { before: "I’ve got the Heart of a ", mark: "Product Builder", after: "," },
  { before: "Brain of an ", mark: "Engineer", after: "" },
  { before: "and Greed of a ", mark: "Salesperson", after: "" },
];

export const TheBit = () => (
  <div className="rise relative mt-11" style={riseDelay(0.4)}>
    <p className="relative text-[24px] leading-[1.35] text-graphite md:text-[28px]">
      <BitTag className="md:top-2">Setup</BitTag>
      {setup.map((line, i) => (
        <span key={line.mark} className="block">
          {line.before}
          <Highlight delay={1.3 + 0.2 * i}>{line.mark}</Highlight>
          {line.after}
        </span>
      ))}
    </p>
    <p className="relative mt-[18px]">
      <BitTag className="md:top-2.5">Punch</BitTag>
      <span className="relative inline-block font-serif text-[28px] font-medium italic leading-[1.2] text-redpen md:text-[34px]">
        because passion doesn't pay the rent.
        <PunchUnderline />
      </span>
    </p>
  </div>
);
