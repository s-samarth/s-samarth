import { features } from "@/data/ddProduct";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";

/** Hand-picked tilts, cycled, so no two neighbours lean the same way. */
const tilts = ["-rotate-[0.5deg]", "rotate-[0.4deg]", "rotate-[0.2deg]", "-rotate-[0.3deg]"];

/**
 * Page three: what the app does beyond the words, as a grid of index cards.
 * The on-device AI features wear a small red stamp saying they need Ollama.
 */
export const FeaturesSection = () => (
  <section id="features">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="03"
        name="Features"
        title={
          <>
            Everything around <em className="text-redpen">the words.</em>
          </>
        }
        lede="Dictation is the core. The rest is what makes it yours: per-app language, your own spellings, and an optional AI layer that also runs on your Mac."
      />

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => (
          <Reveal key={f.title} delay={0.05 * (i % 4)} className="min-w-0">
            <div className={`card h-full px-5 pb-5 pt-4 ${tilts[i % tilts.length]}`}>
              <p className="label !text-[10px] !text-redpen">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-1.5 font-serif text-[1.3rem] font-medium leading-snug text-graphite">{f.title}</h3>
              <p className="mt-2.5 text-[15.5px] leading-relaxed text-graphite-dim">{f.body}</p>
              {f.ai && (
                <p className="mt-4 inline-block -rotate-2 border-2 border-redpen/70 px-1.5 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-redpen">
                  Local AI · needs Ollama
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
      <p className="hand mt-10 -rotate-1 text-[23px]">
        Ollama is a free app that runs AI models on your Mac. The AI tab sets it up.
      </p>
    </div>
  </section>
);
