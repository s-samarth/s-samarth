import { commands } from "@/data/desiDictation";
import { TerminalCommand } from "./TerminalCommand";

const strong = "font-medium text-graphite";

/**
 * The heads-up for anyone who takes the DMG: macOS will call the app
 * unverified and offer Move to Trash. Says why (no $99 notarisation), gives
 * the one command that clears it, and what that command touches.
 */
export const DmgWarning = () => (
  <div className="card -rotate-[0.4deg] px-5 pb-6 pt-4">
    <span className="tape -top-3 left-8 !h-5 !w-16 -rotate-3" />
    <p className="label border-b-2 border-redpen/50 pb-2">
      <span className="!text-redpen">Heads up · </span>macOS will cry wolf
    </p>
    <p className="mt-3 text-[16.5px] leading-snug text-graphite-dim">
      Open the DMG copy and macOS says Apple <span className={strong}>“could not verify”</span> it, and offers{" "}
      <span className={strong}>Move to Trash</span>. Don’t. That warning is a bit bogus: macOS shows it for every app
      whose maker hasn’t paid Apple <span className={strong}>$99 a year</span> for notarisation. This is a free,
      open-source side project, so I haven’t, yet.
    </p>
    <p className="mt-3 text-[16.5px] leading-snug text-graphite-dim">
      Drag the app into Applications, then paste this into Terminal once:
    </p>
    <div className="mt-4">
      <TerminalCommand command={commands.unblock} caption="Terminal · once, after dragging it to Applications" />
    </div>
    <p className="mt-4 text-[16.5px] leading-snug text-graphite-dim">
      It removes the “downloaded from the internet” flag from Desi Dictation and nothing else: no password, no system
      setting changed. Not sure? Paste it into Claude or any AI assistant and ask whether it’s safe.
    </p>
    <p className="hand mt-4 -rotate-1 !text-[21px]">$99 a year is a lot of chai.</p>
  </div>
);
