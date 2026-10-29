import { checker } from "@/data/ddTrust";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { SwitchesTable } from "./DdTables";

/**
 * Page six: the reference. The optional context checker on a taped card
 * (what it is, what it adds, what works without it), then every switch with
 * where it lives, how it starts, and when to flip it.
 */
export const GuideSection = () => (
  <section id="guide">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="06"
        name="Guide · Switches"
        title={
          <>
            Every switch, and <em className="text-redpen">when to flip it.</em>
          </>
        }
        lede="Everything past plain dictation is optional, and starts in its most careful state. Here is what each switch does, so you can turn on only what earns its place."
      />

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <Reveal className="min-w-0">
          <div className="card relative -rotate-[0.4deg] px-6 pb-6 pt-5">
            <span className="tape -top-3 left-8 !h-5 !w-16 -rotate-3" />
            <p className="label !text-redpen">Optional download · {checker.size}</p>
            <h3 className="mt-1.5 font-serif text-[1.6rem] font-medium leading-snug">The context checker</h3>
            <p className="mt-3 text-[16.5px] leading-snug text-graphite-dim">{checker.what}</p>
            <p className="label mt-5 !text-[10px]">What it adds</p>
            <ul className="mt-2 space-y-2 text-[15.5px] leading-snug text-graphite-dim">
              {checker.adds.map((a) => (
                <li key={a} className="flex gap-2.5">
                  <span className="font-hand text-[20px] leading-none text-redpen" aria-hidden="true">
                    +
                  </span>
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[15.5px] leading-snug text-graphite-dim">{checker.without}</p>
            <p className="label mt-5 !text-[10px]">Where · cost</p>
            <p className="mt-1.5 text-[15.5px] leading-snug text-graphite-dim">
              {checker.where} It uses {checker.memory}.
            </p>
            <p className="hand mt-5 -rotate-1 text-[21px]">{checker.worthIt}</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <SwitchesTable />
          <p className="hand mt-6 -rotate-1 text-[22px]">
            the app’s Guide page explains these too, next to the switches.
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);
