import { saCommands, saFixes, saRelease } from "@/data/surviveAi";
import { PageHead } from "../notebook/PageHead";
import { Reveal } from "../Reveal";
import { TerminalCommand } from "../desi/TerminalCommand";

/** Hand-picked tilts, one per card, so screenshots stay stable. */
const tilts = ["-rotate-[0.6deg]", "rotate-[0.5deg]", "rotate-[0.3deg]", "-rotate-[0.4deg]"];

/**
 * Page three of the install guide: what goes wrong, how to check a file
 * someone handed you, and how to set up many phones at once.
 */
export const SaStuckSection = () => (
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
        {saFixes.map((f, i) => (
          <Reveal key={f.symptom} delay={0.06 * i} className="min-w-0">
            <div className={`card px-5 pb-5 pt-4 ${tilts[i % tilts.length]}`}>
              <h3 className="border-b-2 border-redpen/50 pb-2 font-serif text-[1.3rem] font-medium leading-snug">
                {f.symptom}
              </h3>
              <p className="mt-3 text-[16.5px] leading-relaxed text-graphite-dim">{f.fix}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-[minmax(0,1fr)] gap-14 lg:grid-cols-2">
        <Reveal className="min-w-0">
          <p className="label">Check a file someone handed you</p>
          <p className="mt-2 text-[17px] leading-relaxed text-graphite-dim">
            An app that spreads hand to hand is an app nobody checks. On a laptop, run this and compare it with the
            fingerprint below. If they match, it’s exactly the file on GitHub.
          </p>
          <div className="mt-5">
            <TerminalCommand command={saCommands.checksumMac} caption="Mac · on Linux, sha256sum" />
          </div>
          <p className="mt-4 break-all font-mono text-[12.5px] leading-relaxed text-graphite">
            <span className="label !text-[10.5px]">SHA-256 · v{saRelease.version} · </span>
            {saRelease.sha256}
          </p>
        </Reveal>

        <Reveal className="min-w-0" delay={0.1}>
          <p className="label">Setting up many phones</p>
          <p className="mt-2 text-[17px] leading-relaxed text-graphite-dim">
            For an NGO or a family, install over USB with Android’s developer tools. Each phone still downloads the
            model once on first launch.
          </p>
          <div className="mt-5">
            <TerminalCommand command={saCommands.adbInstall} caption="Laptop · USB debugging on" />
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);
