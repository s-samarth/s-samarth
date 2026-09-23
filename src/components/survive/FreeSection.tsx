import { neverBuild } from "@/data/saProduct";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { ApkMeta, ApkStamp } from "./SaHero";

const included = [
  "The model, every guide, every update",
  "No account, no ads, no word limits",
  "Pass it on to anyone, as many times as you like",
];

/**
 * Page seven: the price, as a torn ticket stub, and beside it the list of
 * things the project has ruled out, struck through in red pen.
 */
export const FreeSection = () => (
  <section id="free">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="07"
        name="Price · Promises"
        title={
          <>
            Free, <em className="text-redpen">and staying that way.</em>
          </>
        }
      />
      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-start gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
        <Reveal className="max-w-xl">
          <div className="card relative -rotate-[0.6deg] border-l-4 border-dashed border-redpen/50 px-7 pb-7 pt-6">
            <span className="tape -top-3 right-10 rotate-3" />
            <div className="flex items-baseline justify-between gap-4 border-b-2 border-graphite pb-3">
              <p className="font-serif text-[1.5rem] font-medium">Everything</p>
              <p className="headline text-[3rem] leading-none">₹0</p>
            </div>
            <ul className="mt-5 space-y-2.5 text-[17px] leading-snug text-graphite-dim">
              {included.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-hand text-[22px] leading-none text-redpen" aria-hidden="true">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <ApkStamp />
            </div>
            <ApkMeta />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="label">What it will never build</p>
          <ul className="mt-4 space-y-2">
            {neverBuild.map((item) => (
              <li
                key={item}
                className="font-serif text-[1.45rem] text-graphite-dim line-through decoration-redpen decoration-2"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="hand mt-6 -rotate-1 text-[23px]">straight from the README. a safety app has no business with them.</p>
        </Reveal>
      </div>
    </div>
  </section>
);
