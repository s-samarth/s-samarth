import { asks } from "@/data/saProduct";
import { PageHead } from "../notebook/PageHead";
import { Highlight } from "../notebook/Highlight";
import { Reveal } from "../Reveal";

const tilts = ["-rotate-[0.8deg]", "rotate-[0.5deg]", "-rotate-[0.3deg]"];

/**
 * Page two: the idea. The guides already hold the answer; what an emergency
 * takes away is the time to find it. Each card reads top to bottom as
 * "what you type (biro), where it looked (typewriter), what to do (print)".
 */
export const WhySection = () => (
  <section id="why">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="02"
        name="Why offline"
        title={
          <>
            Anyone can read the book. <em className="text-redpen">Nobody has time to.</em>
          </>
        }
        lede="In a flood, a fire, or a dog bite at 3 a.m., the knowledge already exists, written down. What’s missing is the half hour to find the right page, and the signal to look it up."
      />

      <Reveal className="mt-8 max-w-2xl" delay={0.1}>
        <p className="text-[19px] leading-relaxed text-graphite">
          So Survive AI doesn’t try to be a genius. It reads your question, finds the paragraph that answers it, and
          tells you the first thing to do, with no network at all. That is{" "}
          <Highlight delay={0.3}>good retrieval, on a phone</Highlight>, and sometimes that is all you need.
        </p>
      </Reveal>

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-3 md:gap-8">
        {asks.map((ask, i) => (
          <Reveal key={ask.typed} delay={0.08 * i} className="min-w-0">
            <div className={`card h-full px-5 pb-6 pt-4 ${tilts[i]}`}>
              <span className="tape -top-3 left-1/2 !h-5 !w-16 -translate-x-1/2 rotate-2" />
              <p className="label !text-[10px]">You type</p>
              <p className="hand mt-1 border-b-2 border-redpen/50 pb-3 text-[25px]">“{ask.typed}”</p>
              <p className="label mt-4 !text-[10px]">It finds</p>
              <p className="mt-1 font-mono text-[12.5px] leading-snug text-graphite-dim">{ask.found}</p>
              <p className="label mt-5 !text-[10px]">First thing to do</p>
              <p className="mt-1 font-sans text-[16px] font-medium leading-snug text-graphite">{ask.first}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="label mt-8 !text-[10.5px]">
        Condensed from the guides. The app’s wording varies, and every answer cites its section.
      </p>
      <p className="hand mt-6 max-w-2xl -rotate-1 text-[23px]">
        the guides run to about 35,000 words, a 140-page book. finding the paragraph takes a blink.
      </p>
    </div>
  </section>
);
