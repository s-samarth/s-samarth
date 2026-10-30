import { ArrowUpRight } from "lucide-react";
import { installer } from "@/data/desiDictation";
import { DmgWarning } from "./DmgWarning";
import { DownloadStamp, ReleaseLabel } from "./DdHero";
import { TerminalCommand } from "./TerminalCommand";

/**
 * The hero's two ways in, side by side, Terminal first. The one-liner is the
 * recommended route because curl sets no quarantine flag, so Apple's warning
 * never shows; the DMG comes second, with the heads-up and its fix attached.
 */
export const GetIt = () => (
  <div
    id="get"
    className="grid scroll-mt-24 grid-cols-[minmax(0,1fr)] gap-x-16 gap-y-14 border-t-2 border-graphite pt-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
  >
    <div className="min-w-0">
      <p className="label">
        <span className="!text-redpen">Recommended · </span>One line in Terminal
      </p>
      <h2 className="headline mt-3 text-[2rem] md:text-[2.4rem]">
        Paste one line. <em className="text-redpen">No warnings.</em>
      </h2>
      <p className="mt-3 max-w-xl text-[17px] leading-snug text-graphite-dim">
        Open Terminal (⌘ Space, type Terminal), paste this and press Enter. It downloads the newest release, checks its
        SHA-256, puts it in Applications and opens it. Apple’s “could not verify” never shows up this way.
      </p>
      <div className="mt-6 max-w-xl">
        <TerminalCommand command={installer.command} caption="Terminal · paste, press Enter · run again to update" />
      </div>
      <a href={installer.source} target="_blank" rel="noopener noreferrer" className="btn-pen mt-5">
        Read the script first <ArrowUpRight size={14} />
      </a>
      <p className="hand mt-7 -rotate-1 text-[23px]">same app, same checksum, zero clicks.</p>
    </div>

    <div className="min-w-0">
      <p className="label">Or the DMG</p>
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <DownloadStamp />
        <span className="label !text-[11px]">
          <ReleaseLabel suffix=" DMG" />
        </span>
      </div>
      <div className="mt-8">
        <DmgWarning />
      </div>
    </div>
  </div>
);
