import { measured, saPrivacy, stillOpen } from "@/data/saProduct";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";

/**
 * Page five: privacy as a ticked list, the numbers that hold up on a yellow
 * sticky note, and underneath, the ones that don't yet, in red pen. For a
 * safety app, the failures are part of the pitch.
 */
export const HonestSection = () => (
  <section id="numbers">
    <div className="page-x py-20 md:py-28">
      <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div>
          <PageHead
            page="05"
            name="Privacy · Numbers"
            title={
              <>
                Nothing leaves <em className="text-redpen">the phone.</em>
              </>
            }
          />
          <Reveal delay={0.1}>
            <ul className="mt-9 space-y-4">
              {saPrivacy.map((point) => (
                <li key={point} className="flex gap-4 text-[19px] leading-snug text-graphite">
                  <span className="mt-0.5 font-hand text-[26px] leading-none text-redpen" aria-hidden="true">
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="relative mx-auto w-full max-w-[400px] rotate-[1.5deg] bg-[#FCE58A] px-7 pb-7 pt-8 shadow-[0_1px_2px_rgba(29,36,48,0.1),0_18px_30px_-18px_rgba(29,36,48,0.5)]">
            <span className="tape -top-3 left-1/2 -translate-x-1/2 -rotate-2" />
            <p className="label !text-graphite-dim">Measured, not promised</p>
            <dl className="mt-4 divide-y divide-dashed divide-graphite/25">
              {measured.map((m) => (
                <div key={m.value} className="py-4">
                  <dt className="headline text-[3rem] leading-none">{m.value}</dt>
                  <dd className="mt-1.5 text-[15.5px] leading-snug text-graphite-dim">{m.what}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </div>

      <Reveal className="mt-16 max-w-3xl">
        <p className="hand text-[26px]">and what isn’t good enough yet:</p>
        <ul className="mt-4 space-y-3 text-[17.5px] leading-relaxed text-graphite-dim">
          {stillOpen.map((line) => (
            <li key={line} className="flex gap-3">
              <span className="font-hand text-[22px] leading-none text-redpen" aria-hidden="true">
                ✕
              </span>
              {line}
            </li>
          ))}
        </ul>
        <p className="label mt-6 !text-[10px] leading-relaxed !tracking-[0.1em]">
          From the repo’s evaluation: 382 search questions, 62 answer cases, recorded baselines. Laptop timings.
        </p>
      </Reveal>
    </div>
  </section>
);
