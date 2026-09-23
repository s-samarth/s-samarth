import { ArrowUpRight } from "lucide-react";
import { installer } from "@/data/desiDictation";
import { TerminalCommand } from "./TerminalCommand";

interface OneLineInstallProps {
  /** The full version lists what the script does; the compact one is just the command. */
  compact?: boolean;
}

/**
 * The one-line installer from the app repo, taped in as a terminal slip.
 * The full version says exactly what it does and links to the script,
 * because piping a script into bash should never be a leap of faith.
 */
export const OneLineInstall = ({ compact = false }: OneLineInstallProps) => (
  <div className="min-w-0">
    <TerminalCommand
      command={installer.command}
      caption={compact ? "Or in Terminal · no Apple warning" : "Terminal · paste, press Enter"}
    />
    {!compact && (
      <>
        <p className="label mt-7 !text-[10.5px]">What it does</p>
        <ol className="mt-2.5 list-decimal space-y-1.5 pl-5 text-[16.5px] leading-snug text-graphite-dim marker:font-mono marker:text-[12px] marker:text-redpen">
          {installer.does.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <p className="mt-4 text-[16.5px] leading-snug text-graphite-dim">
          macOS only shows “Apple could not verify” for files a browser downloaded, so this route skips that step. Run
          the same command again any time to update.
        </p>
        <a href={installer.source} target="_blank" rel="noopener noreferrer" className="btn-pen mt-5">
          Read the script <ArrowUpRight size={14} />
        </a>
      </>
    )}
  </div>
);
