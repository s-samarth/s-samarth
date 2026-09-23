/**
 * Everything the /desi-dictation page says, lifted from the app repo's
 * docs/SETUP_GUIDE.md, docs/TROUBLESHOOTING.md and the GitHub release.
 * To ship a new version, update `release` and nothing else.
 */
/** Where the product and its install guide live on this site. */
export const PRODUCT_PATH = "/desi-dictation";
export const INSTALL_PATH = "/desi-dictation/install";

const REPO = "https://github.com/s-samarth/desi-dictation";
const VERSION = "0.6.2";
const FILE = `DesiDictation-${VERSION}.dmg`;

/** The DMG is served straight from the GitHub release, so the repo stays the one source of builds. */
export const release = {
  version: VERSION,
  file: FILE,
  size: "1.8 MB",
  sha256: "54840a77a46fa918a7ed90ac0c59254999dd016b1f25b69daf39887df450a2fe",
  url: `${REPO}/releases/download/v${VERSION}/${FILE}`,
  notes: `${REPO}/releases`,
  repo: REPO,
};

export const requirements = ["macOS 14+", "Apple Silicon", "Free beta"];

export const commands = {
  unblock: `xattr -dr com.apple.quarantine "/Applications/Desi Dictation.app"`,
  checksum: `shasum -a 256 ~/Downloads/${release.file}`,
  resetGrants: "tccutil reset Accessibility com.desi.dictation\ntccutil reset ListenEvent com.desi.dictation",
};

export interface Permission {
  name: string;
  why: string;
  where: string;
}

export const permissions: Permission[] = [
  { name: "Microphone", why: "to hear you", where: "a prompt on first launch, click Allow" },
  { name: "Accessibility", why: "to paste the text into the app you are using", where: "Privacy & Security → Accessibility" },
  { name: "Input Monitoring", why: "to catch the hotkey from anywhere", where: "Privacy & Security → Input Monitoring" },
];

export interface Model {
  name: string;
  forWhat: string;
  size: string;
  /** One of these per language you speak. */
  pick?: boolean;
}

export const models: Model[] = [
  { name: "Hinglish Apex", forWhat: "Hinglish, “kal meeting hai, deck ready rakhna”", size: "547 MB", pick: true },
  { name: "Hinglish Swift", forWhat: "Hinglish on older or 8 GB Macs", size: "141 MB" },
  { name: "Parakeet", forWhat: "English, fastest and most accurate", size: "416 MB", pick: true },
  { name: "Whisper Large v3 Turbo", forWhat: "English fallback, older Macs", size: "574 MB" },
  { name: "Vaani Hindi", forWhat: "शुद्ध हिन्दी, in Devanagari", size: "1.06 GB", pick: true },
  { name: "Silero VAD", forWhat: "Everyone. Better pauses and long dictations", size: "1 MB", pick: true },
];

export interface Fix {
  symptom: string;
  fix: string;
  command?: string;
}

export const fixes: Fix[] = [
  {
    symptom: "“Desi Dictation can’t be opened”",
    fix: "Usually the Gatekeeper block from step 2. If Open Anyway doesn’t appear, check the Apple menu → About This Mac: Intel Macs and macOS 13 or older aren’t supported.",
  },
  {
    symptom: "The hotkey does nothing",
    fix: "Grant Input Monitoring and Accessibility, then quit and reopen the app. macOS only applies grants at startup. If a toggle shows on but it still fails, the grant is stale: reset it and grant again.",
    command: commands.resetGrants,
  },
  {
    symptom: "It records, but nothing gets pasted",
    fix: "Accessibility is missing, or you clicked away mid-dictation. The text is on your clipboard anyway, so ⌘V still works.",
  },
  {
    symptom: "Updating to a new version",
    fix: "Quit from the menu bar, drag the new app into Applications and choose Replace. Don’t uninstall first: your settings, history, dictionary and models are kept.",
  },
];
