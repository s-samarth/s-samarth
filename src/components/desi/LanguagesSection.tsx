import { languageModes } from "@/data/ddProduct";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";

const tilts = ["-rotate-[0.8deg]", "rotate-[0.5deg]", "-rotate-[0.3deg]"];

/**
 * Page two: the three language modes as index cards. What you say is in
 * biro handwriting, what it types is in print, so the card reads as
 * "spoken, then written".
 */
export const LanguagesSection = () => (
  <section id="languages">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="02"
        name="Languages"
        title={
          <>
            Three languages, <em className="text-redpen">one key.</em>
          </>
        }
        lede="Dictation tools understand English or Hindi. Nobody in Bangalore talks like that. “Kal meeting hai, please deck ready rakhna” is one sentence, and it should land as one sentence."
      />

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-10 md:grid-cols-3 md:gap-8">
        {languageModes.map((mode, i) => (
          <Reveal key={mode.name} delay={0.08 * i} className="min-w-0">
            <div className={`card h-full px-5 pb-6 pt-4 ${tilts[i]}`}>
              <span className="tape -top-3 left-1/2 !h-5 !w-16 -translate-x-1/2 rotate-2" />
              <p className="border-b-2 border-redpen/50 pb-2 font-serif text-[1.5rem] font-medium text-graphite">
                {mode.name}
              </p>
              <p className="label mt-4 !text-[10px]">You say</p>
              <p className="hand mt-1 text-[25px]">“{mode.said}”</p>
              <p className="label mt-5 !text-[10px]">It types</p>
              <p className="mt-1 font-sans text-[16px] font-medium leading-snug text-graphite">{mode.typed}</p>
              <p className="label mt-6 !text-[10px] !tracking-[0.1em]">Model · {mode.model}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="label mt-8 !text-[10.5px]">Examples are illustrative. Every mode runs fully on your Mac.</p>
    </div>
  </section>
);
