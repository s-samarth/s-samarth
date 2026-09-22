import { motion } from "framer-motion";
import { Highlight } from "./notebook/Highlight";
import { Marked } from "./notebook/Marked";
import { Scribble } from "./notebook/Scribble";
import { Sticker } from "./hero/Sticker";
import { DayJobNotes } from "./hero/DayJobNotes";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

/** The owner's intro, verbatim, split where the "what can I do for you" subheading sits. */
const intro =
  "I’ve got the Heart of a *Product Builder*, Brain of an *Engineer* and Greed of a *Salesperson* because passion doesn't pay the rent.";
const offer =
  "Bring me the messy problem. I'll build the *AI agent*, the *RAG*, the *model*, or talk you out of all three. IIT Guwahati taught me to take problems seriously. Stand-up Comedy taught me not to take myself seriously.";

/**
 * Page one. On large screens: copy on the left, photo and day-job notes on
 * the right. On phones the photo comes first, then the copy, then the notes.
 *
 * Frontend note: CSS grid lets the visual order differ from the source
 * order. `order-*` sets the phone sequence; `lg:col-start-*` and
 * `lg:row-start-*` place the same three blocks explicitly on desktop.
 */
export const HeroSection = () => (
  <section id="top" className="relative">
    <div className="page-x pb-20 pt-24 md:pt-28">
      <motion.p {...rise(0.1)} className="label">
        <span className="!text-redpen">p.01 · </span>Notebook Nº 03 · Bangalore · If found, raise a ticket
      </motion.p>

      <div className="mt-10 grid gap-x-14 gap-y-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="order-2 lg:order-none lg:col-start-1 lg:row-span-2 lg:row-start-1">
          <motion.h1 {...rise(0.2)} className="headline text-[3.3rem] sm:text-7xl md:text-[5.2rem] lg:text-[5.4rem]">
            Samarth Saraswat,{" "}
            <br />
            <em className="font-medium">
              <Highlight delay={0.9}>AI builder.</Highlight>
            </em>
          </motion.h1>

          <motion.p {...rise(0.4)} className="mt-9 max-w-xl text-[22px] leading-[1.45] text-graphite md:text-[25px]">
            <Marked text={intro} delay={1.3} />
          </motion.p>

          <motion.div {...rise(0.55)}>
            <h2 className="mt-10 font-serif text-[1.55rem] font-medium italic text-redpen md:text-[1.75rem]">What can I do for you?</h2>
            <p className="mt-3 max-w-xl text-[19px] leading-relaxed text-graphite-dim md:text-[20px]">
              <Marked text={offer} delay={1.9} />
            </p>
          </motion.div>

          <motion.div {...rise(0.7)} className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#ticket" className="btn-stamp">
              Raise a ticket
            </a>
            <a href="#built" className="btn-pen">
              See what I built
            </a>
          </motion.div>
          {/* Hook arrow: head points up at the middle of "Raise a ticket", tail meets the note. */}
          <span className="ml-20 mt-1 hidden items-end sm:flex">
            <Scribble shape="hook-up" className="h-10 w-[100px] shrink-0 text-biro" delay={1.6} />
            <span className="hand -mb-1 ml-1 -rotate-2">it actually emails me</span>
          </span>
        </div>

        <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1">
          <Sticker />
        </div>
        <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2">
          <DayJobNotes />
        </div>
      </div>
    </div>
  </section>
);
