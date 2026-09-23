import { Highlight } from "./notebook/Highlight";
import { Marked } from "./notebook/Marked";
import { Sticker } from "./hero/Sticker";
import { DayJobNotes } from "./hero/DayJobNotes";
import { SetList } from "./hero/SetList";
import { BitTag, TheBit } from "./hero/TheBit";
import { riseDelay } from "@/lib/rise";

/** The rest of the owner's intro, verbatim. The tag line is the bit's closer. */
const offer = "Bring me the messy problem. I'll build the *AI agent*, the *RAG*, the *model*, or talk you out of all three.";
const tag = "IIT Guwahati taught me to take problems seriously. Stand-up Comedy taught me not to take myself seriously.";

/**
 * Page one, written like a set. On large screens: the bit on the left; the
 * photo, set list and day-job notes stacked on the right. On phones the photo
 * comes first, then the bit, then the set list, then the notes.
 *
 * Frontend notes:
 * - CSS grid lets the visual order differ from the source order. `order-*`
 *   sets the phone sequence; `lg:col-start-*` and `lg:row-start-*` place the
 *   same blocks explicitly on desktop.
 * - `minmax(0, 1fr)` instead of `1fr` lets a column shrink below its widest
 *   unbreakable content (the set list never wraps), so phones don't scroll
 *   sideways.
 * - Entrances use the CSS `.rise` class, not framer-motion's `initial`, so the
 *   prerendered HTML is readable before any JavaScript loads.
 */
export const HeroSection = () => (
  <section id="top" className="relative">
    <div className="page-x pb-20 pt-24 md:pt-28">
      <p className="rise label" style={riseDelay(0.1)}>
        <span className="!text-redpen">p.01 · </span>Notebook Nº 03 · Bangalore · Tonight's set
      </p>

      <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div className="order-2 lg:order-none lg:col-start-1 lg:row-span-3 lg:row-start-1">
          <h1 className="rise headline text-[3.3rem] sm:text-7xl md:text-[5.2rem] lg:text-[5.4rem]" style={riseDelay(0.2)}>
            Samarth Saraswat,{" "}
            <br />
            <em className="font-medium">
              <Highlight delay={0.9}>AI builder.</Highlight>
            </em>
          </h1>

          <TheBit />

          <h2 className="rise mt-12 font-serif text-[1.55rem] font-medium italic text-graphite md:text-[1.75rem]" style={riseDelay(0.55)}>
            What can I do for you?
          </h2>
          <p className="rise mt-2.5 max-w-xl text-[19px] leading-relaxed text-graphite-dim md:text-[20px]" style={riseDelay(0.6)}>
            <Marked text={offer} delay={2.5} />
          </p>
          <p className="rise relative mt-5 max-w-xl text-[19px] leading-relaxed text-graphite-dim" style={riseDelay(0.65)}>
            <BitTag className="md:top-1.5">Tag</BitTag>
            {tag}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center gap-6" style={riseDelay(0.75)}>
            <a href="#ticket" className="btn-stamp">
              Raise a ticket
            </a>
            <a href="#built" className="btn-pen">
              See what I built
            </a>
          </div>
        </div>

        <div className="order-1 lg:order-none lg:col-start-2 lg:row-start-1">
          <Sticker />
        </div>
        <div className="order-3 lg:order-none lg:col-start-2 lg:row-start-2 lg:-mt-6">
          <SetList />
        </div>
        <div className="order-4 lg:order-none lg:col-start-2 lg:row-start-3">
          <DayJobNotes />
        </div>
      </div>
    </div>
  </section>
);
