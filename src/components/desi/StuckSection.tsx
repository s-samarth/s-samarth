import { commands, fixes, release } from "@/data/desiDictation";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { DownloadStamp } from "./DdHero";
import { TerminalCommand } from "./TerminalCommand";

/** Hand-picked tilts, one per card, so screenshots stay stable. */
const tilts = ["-rotate-[0.6deg]", "rotate-[0.5deg]", "rotate-[0.3deg]", "-rotate-[0.4deg]"];

/** Page three: the four things that actually go wrong, then a way to check the file, then the download again. */
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
          <Reveal key={f.symptom} delay={0.06 * i} className={`card min-w-0 px-5 pb-5 pt-4 ${tilts[i % tilts.length]}`}>
            <h3 className="border-b-2 border-redpen/50 pb-2 font-serif text-[1.3rem] font-medium leading-snug">{f.symptom}</h3>
            <p className="mt-3 text-[16.5px] leading-relaxed text-graphite-dim">{f.fix}</p>
            {f.command && (
              <div className="mt-5">
                <TerminalCommand command={f.command} />
              </div>
            )}
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 max-w-2xl">
        <p className="label">Check the download is mine</p>
        <p className="mt-2 text-[17px] leading-relaxed text-graphite-dim">
          Run this and compare it with the fingerprint below. If they match, the file is exactly the one I built and put on
          GitHub.
        </p>
        <div className="mt-5">
          <TerminalCommand command={commands.checksum} caption="Terminal · optional" />
        </div>
        <p className="mt-4 break-all font-mono text-[12.5px] leading-relaxed text-graphite">
          <span className="label !text-[10.5px]">SHA-256 · </span>
          {release.sha256}
        </p>
      </Reveal>

      <Reveal className="mt-20 border-t-2 border-graphite pt-10">
        <h2 className="headline text-[2.4rem] md:text-[3rem]">
          Ready? <em>Kal meeting hai.</em>
        </h2>
        <div className="mt-7 flex flex-wrap items-center gap-6">
          <DownloadStamp />
          <a href={release.notes} target="_blank" rel="noopener noreferrer" className="btn-pen">
            All releases
          </a>
          <a href="/#built" className="btn-pen">
            Back to the notebook
          </a>
        </div>
        <p className="hand mt-6 -rotate-1 text-[23px]">
          questions?{" "}
          <a href="/#ticket" className="text-redpen underline decoration-2 underline-offset-4 hover:text-graphite">
            raise a ticket
          </a>{" "}
          on the home page.
        </p>
      </Reveal>
    </div>
  </section>
);
