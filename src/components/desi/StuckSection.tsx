import { commands, fixes } from "@/data/desiDictation";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { TerminalCommand } from "./TerminalCommand";

/** Hand-picked tilts, one per card, so screenshots stay stable. */
const tilts = ["-rotate-[0.6deg]", "rotate-[0.5deg]", "rotate-[0.3deg]", "-rotate-[0.4deg]"];

/** Page three of the install guide: the four things that actually go wrong, then a way to check the file. */
export const StuckSection = () => (
  <section id="stuck">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="03"
        name="Troubleshooting"
        title={
          <>
            Stuck? <em className="text-redpen">Start here.</em>
          </>
        }
      />

      <div className="mt-12 grid grid-cols-[minmax(0,1fr)] items-start gap-8 md:grid-cols-2">
        {fixes.map((f, i) => (
          <Reveal key={f.symptom} delay={0.06 * i} className="min-w-0">
            <div className={`card px-5 pb-5 pt-4 ${tilts[i % tilts.length]}`}>
              <h3 className="border-b-2 border-redpen/50 pb-2 font-serif text-[1.3rem] font-medium leading-snug">
                {f.symptom}
              </h3>
              <p className="mt-3 text-[16.5px] leading-relaxed text-graphite-dim">{f.fix}</p>
              {f.command && (
                <div className="mt-5">
                  <TerminalCommand command={f.command} />
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 max-w-2xl">
        <p className="label">Check the download is mine</p>
        <p className="mt-2 text-[17px] leading-relaxed text-graphite-dim">
          Downloaded the DMG by hand? The first line fingerprints your file, the second prints the fingerprint published
          with the release. If they match, it is exactly the file I built and put on GitHub. The one-line installer does
          this check for you.
        </p>
        <div className="mt-5">
          <TerminalCommand command={commands.checksum} caption="Terminal · optional" />
        </div>
      </Reveal>
    </div>
  </section>
);
