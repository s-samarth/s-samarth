import { reviewKeys, reviewModes, underlines } from "@/data/ddTrust";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { Key } from "./InstallStep";
import { StrictnessCards } from "./StrictnessCards";

const dot = { orange: "decoration-[#f08a24]", purple: "decoration-[#9b5de5]" } as const;

/**
 * Page five: the trust pitch made concrete. How Review before paste decides
 * to stop you, what its two underline colours mean, its keys, and then the
 * three strictness levels with when to use each.
 */
export const ReviewSection = () => (
  <section id="review">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="05"
        name="Review · Trust"
        title={
          <>
            It asks only when <em className="text-redpen">it’s unsure.</em>
          </>
        }
        lede="Dictation you can trust isn’t dictation that’s never wrong. It’s dictation that tells you where it might be, before it pastes, and never swaps a word on a guess."
      />

      <div className="mt-14 grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-3">
        <Reveal className="min-w-0">
          <h3 className="font-serif text-[1.4rem] font-medium">When the panel opens</h3>
          <p className="label mt-1 !text-[10px]">Dictation → Review → Review before paste</p>
          <ul className="mt-4 space-y-3">
            {reviewModes.map((m) => (
              <li key={m.name} className="text-[16.5px] leading-snug text-graphite-dim">
                <span className="font-medium text-graphite">{m.name}</span>
                {m.note && <span className="label ml-2 !text-[9.5px] !text-redpen">{m.note}</span>}
                <br />
                {m.what}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.08} className="min-w-0">
          <h3 className="font-serif text-[1.4rem] font-medium">What the underlines mean</h3>
          <ul className="mt-4 space-y-4">
            {underlines.map((u) => (
              <li key={u.name} className="text-[16.5px] leading-snug text-graphite-dim">
                <span
                  className={`font-medium text-graphite underline decoration-dotted decoration-[3px] underline-offset-4 ${dot[u.colour as keyof typeof dot]}`}
                >
                  {u.name}
                </span>{" "}
                ({u.colour}). {u.what}
                <span className="label mt-1 block !text-[10px]">Needs: {u.needs}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[15.5px] leading-snug text-graphite-dim">
            Nothing is changed for you. Hinglish uses orange only.
          </p>
        </Reveal>

        <Reveal delay={0.16} className="min-w-0">
          <h3 className="font-serif text-[1.4rem] font-medium">Keys</h3>
          <dl className="mt-4 space-y-2.5">
            {reviewKeys.map(([key, what]) => (
              <div key={key} className="flex items-baseline gap-3 text-[16px] leading-snug">
                <dt className="shrink-0">
                  <Key>{key}</Key>
                </dt>
                <dd className="text-graphite-dim">{what}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <StrictnessCards />
    </div>
  </section>
);
