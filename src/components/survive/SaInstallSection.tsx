import { saCommands, shareRoutes } from "@/data/surviveAi";
import { PageHead } from "../notebook/PageHead";
import { InstallStep } from "../desi/InstallStep";
import { TerminalCommand } from "../desi/TerminalCommand";

const strong = "font-medium text-graphite";

/** Step 1's four routes, as a small grid of index cards. */
const ShareRoutes = () => (
  <div className="!mt-7 grid grid-cols-[minmax(0,1fr)] gap-5 sm:grid-cols-2">
    {shareRoutes.map((r, i) => (
      <div key={r.how} className={`card px-5 pb-4 pt-3.5 ${i % 2 ? "rotate-[0.4deg]" : "-rotate-[0.4deg]"}`}>
        <p className="label border-b-2 border-redpen/50 pb-1.5">{r.how}</p>
        <p className="mt-2.5 text-[16px] leading-snug text-graphite-dim">{r.detail}</p>
      </div>
    ))}
  </div>
);

/** Page two of the install guide: four steps, straight from docs/INSTALLATION.md. */
export const SaInstallSection = () => (
  <section id="install">
    <div className="page-x py-20 md:py-28">
      <PageHead
        page="02"
        name="Install · One time"
        title={
          <>
            Once on Wi-Fi, <em className="text-redpen">then never again.</em>
          </>
        }
        lede="Do this on a normal day, not during the emergency. The one download that needs the internet is the model, and it happens once."
      />

      <ol className="mt-6 divide-y divide-dashed divide-graphite-soft/50">
        <InstallStep n={1} title="Get the APK, however it reaches you.">
          <p>
            It isn’t on the Play Store on purpose, so it can travel where the store can’t. Download it, or take it from
            someone who already has it:
          </p>
          <ShareRoutes />
          <p>For the local-network route, run this in the folder holding the APK, then open the laptop’s address on the phone, port 8080:</p>
          <TerminalCommand command={saCommands.serve} caption="Laptop · same Wi-Fi, no internet needed" />
        </InstallStep>

        <InstallStep n={2} title="Let the phone install apps from outside the store.">
          <p>
            Open <span className={strong}>Settings → Apps → Special app access → Install unknown apps</span>, pick the app
            you’ll open the APK with (your browser or Files), and allow it. Older Android versions keep this under{" "}
            <span className={strong}>Security</span>.
          </p>
        </InstallStep>

        <InstallStep n={3} title="Tap the APK and install.">
          <p>
            Open <span className={strong}>Files → Downloads</span> and tap the APK, then{" "}
            <span className={strong}>Install</span>. Play Protect may warn you, as it does for any app from outside the
            store. If someone handed you the file, check its fingerprint first (below), then tap{" "}
            <span className={strong}>Install anyway</span>.
          </p>
        </InstallStep>

        <InstallStep n={4} title="Open it on Wi-Fi, once.">
          <p>
            Accept the safety note, then let it download the model: about 1.3 GB, over Wi-Fi only, with a progress
            bar. If the Wi-Fi drops, tap <span className={strong}>Retry</span>; it picks up where it stopped and checks the file at the
            end.
          </p>
          <p>
            Then the real test: <span className={strong}>turn on airplane mode</span> and ask it something. From here on
            it never needs the internet. When Wi-Fi is around, it quietly fetches any updated guides.
          </p>
          <p>
            Optional: <span className={strong}>Settings</span> offers a 175 MB search model that helps with questions
            phrased in your own words. Without it, the app searches by keywords alone.
          </p>
        </InstallStep>
      </ol>
    </div>
  </section>
);
