import { saFeatures } from "@/data/saProduct";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";

/** Hand-picked tilts, cycled, so no two neighbours lean the same way. */
const tilts = ["-rotate-[0.5deg]", "rotate-[0.4deg]", "rotate-[0.2deg]", "-rotate-[0.3deg]"];

/** Page four: how it gets from two panicked words to a cited answer, as index cards. */
export const HowSection = () => (
  <section id="how">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="04"
        name="How it works"
        title={
          <>
            Built for the worst <em className="text-redpen">five minutes.</em>
          </>
        }
        lede="A 2B model can’t know everything, so it isn’t asked to. Search finds the passages first, the model only puts them into words, and a check reads its answer before you do."
      />

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {saFeatures.map((f, i) => (
          <Reveal key={f.title} delay={0.05 * (i % 4)} className="min-w-0">
            <div className={`card h-full px-5 pb-5 pt-4 ${tilts[i % tilts.length]}`}>
              <p className="label !text-[10px] !text-redpen">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1.5 font-serif text-[1.3rem] font-medium leading-snug text-graphite">{f.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-graphite-dim">{f.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="hand mt-10 -rotate-1 text-[23px]">
        the model is Google’s Gemma 2B. the search, the guard and the guides are the work.
      </p>
    </div>
  </section>
);
