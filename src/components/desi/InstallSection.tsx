import { commands } from "@/data/desiDictation";
import { PageHead } from "../notebook/PageHead";
import { InstallStep, Key } from "./InstallStep";
import { ModelsTable, PermissionsTable } from "./DdTables";
import { TerminalCommand } from "./TerminalCommand";

const strong = "font-medium text-graphite";

/** Step 2 gets two routes side by side: clicks for most people, one command for the rest. */
const UnblockRoutes = () => (
  <div className="!mt-8 grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
    <div className="card -rotate-[0.6deg] px-5 pb-5 pt-4">
      <span className="tape -top-3 left-6 !h-5 !w-16 -rotate-3" />
      <p className="label border-b-2 border-redpen/50 pb-2">The click way</p>
      <ol className="mt-3 list-decimal space-y-2.5 pl-5 text-[16.5px] leading-snug text-graphite-dim marker:font-mono marker:text-[13px] marker:text-redpen">
        <li>
          Double-click the app. macOS says it can’t verify it. Click <span className={strong}>Done</span>, not Move to
          Trash.
        </li>
        <li>
          Open <span className={strong}>System Settings → Privacy &amp; Security</span> and scroll down.
        </li>
        <li>
          Next to “Desi Dictation was blocked”, click <span className={strong}>Open Anyway</span> and confirm.
        </li>
      </ol>
    </div>
    <div>
      <p className="label">The Terminal way</p>
      <p className="mt-2 text-[16.5px] leading-snug">
        After dragging the app into Applications, paste this into Terminal. It removes the quarantine flag macOS puts on
        downloaded apps, so it opens like any other.
      </p>
      <div className="mt-5">
        <TerminalCommand command={commands.unblock} caption="Terminal · run it once" />
      </div>
    </div>
  </div>
);

/** Page two: the five-minute, one-time install, straight from the app's setup guide. */
export const InstallSection = () => (
  <section id="install">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="02"
        name="Install · One time"
        title={
          <>
            Five minutes, <em className="text-redpen">once.</em>
          </>
        }
        lede="The app is tiny. The models are not, so you pick only the ones you need. Everything after this runs on your Mac with nothing sent anywhere."
      />

      <ol className="mt-6 divide-y divide-dashed divide-graphite-soft/50">
        <InstallStep n={1} title="Download it and drag it into Applications.">
          <p>
            Open the DMG and drag <span className={strong}>Desi Dictation</span> onto the Applications folder. It lives
            in your menu bar as a mic icon; there is no Dock icon, by design.
          </p>
        </InstallStep>

        <InstallStep n={2} title={<>Get past Apple’s “could not verify”.</>}>
          <p>
            The beta is signed with my own certificate but not notarised by Apple yet. That costs $99 a year and comes
            before the public launch. Until then macOS blocks the first open. This is expected, not malware, and you
            only do it once.
          </p>
          <UnblockRoutes />
        </InstallStep>

        <InstallStep n={3} title="Grant three permissions, then reopen it.">
          <p>It types your words into other apps, and that needs macOS’s blessing:</p>
          <PermissionsTable />
          <p>
            Then <span className={strong}>quit from the menu bar and open it again</span>. macOS only applies these at
            startup; forgetting this is the number one reason the hotkey seems dead.
          </p>
        </InstallStep>

        <InstallStep n={4} title="Download the models you speak.">
          <p>
            Menu bar → <span className={strong}>Open Desi Dictation… → Models</span>. Get one{" "}
            <span className="text-redpen">★</span> per language you speak, plus the VAD add-on. All free during the
            beta, and every download is SHA256-checked.
          </p>
          <ModelsTable />
          <p>
            Leave <span className={strong}>Model: Auto</span>. Each language remembers its own model and loads it when
            you switch.
          </p>
        </InstallStep>

        <InstallStep n={5} title="Hold a key and talk.">
          <p>
            Click <span className={strong}>Enable Dictation</span> (the first load takes about 8 s). Click into any text
            field: WhatsApp Web, Slack, Notes, your IDE. Then hold <Key>Right ⌥</Key>, speak naturally, and let go.
          </p>
          <p>
            The words land at your cursor and stay on your clipboard. <Key>Esc</Key> throws a dictation away. Prefer
            tap-to-start, or a different key like <Key>Right ⌘</Key> or <Key>F13</Key>? Both are on the Dictation
            screen.
          </p>
        </InstallStep>
      </ol>
    </div>
  </section>
);
