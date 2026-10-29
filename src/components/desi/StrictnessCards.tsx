import { levels } from "@/data/ddTrust";
import { Reveal } from "../Reveal";

const tilts = ["-rotate-[0.5deg]", "rotate-[0.3deg]", "-rotate-[0.2deg]"];

/**
 * The three "Underline words" levels as index cards: how much each one
 * underlines, what it caught when measured, and when to pick it. The
 * default wears a red stamp.
 */
export const StrictnessCards = () => (
  <div className="mt-20">
    <h3 className="headline text-[2rem] leading-tight md:text-[2.4rem]">
      How strict? <em className="text-redpen">Match it to the stakes.</em>
    </h3>
    <p className="lede mt-3 max-w-2xl">
      Dictation → Review → Underline words. Stricter catches more mistakes but asks about more fine words. Start
      stricter, and loosen it as you learn where it slips.
    </p>

    <div className="mt-10 grid grid-cols-[minmax(0,1fr)] gap-8 md:grid-cols-3">
      {levels.map((l, i) => (
        <Reveal key={l.name} delay={0.06 * i} className="min-w-0">
          <div className={`card h-full px-5 pb-6 pt-4 ${tilts[i]}`}>
            <div className="flex items-baseline justify-between gap-3 border-b-2 border-redpen/50 pb-2">
              <p className="font-serif text-[1.5rem] font-medium text-graphite">{l.name}</p>
              {l.isDefault && (
                <span className="-rotate-2 border-2 border-redpen/70 px-1.5 py-0.5 font-mono text-[9.5px] font-medium uppercase tracking-[0.12em] text-redpen">
                  Default
                </span>
              )}
            </div>
            <p className="mt-3 text-[16.5px] font-medium text-graphite">Underlines {l.share}</p>
            <p className="label mt-1.5 !text-[10px] !tracking-[0.08em]">
              Caught {l.caught} of wrong words · {l.real} of underlines were real mistakes
            </p>
            <p className="label mt-5 !text-[10px]">Pick it for</p>
            <ul className="mt-2 space-y-2 text-[15.5px] leading-snug text-graphite-dim">
              {l.when.map((w) => (
                <li key={w} className="flex gap-2.5">
                  <span className="font-hand text-[20px] leading-none text-redpen" aria-hidden="true">
                    →
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
    <p className="label mt-6 max-w-3xl !text-[10px] leading-relaxed !tracking-[0.08em]">
      Measured on English dictation with Parakeet on an M3 MacBook Air, context checker installed. Other models and
      languages land nearby; Qwen gives no confidence, so its underlines come from the context checker alone.
    </p>
    <p className="hand mt-6 max-w-2xl -rotate-1 text-[23px]">a review that cries wolf gets switched off, so Moderate is the default.</p>
  </div>
);
