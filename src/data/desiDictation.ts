/**
 * Everything the /desi-dictation pages say, lifted from the app repo's
 * install.sh, docs/SETUP_GUIDE.md, docs/TROUBLESHOOTING.md and its releases.
 *
 * Every release publishes the same DMG under three names, each counted
 * separately by GitHub, so downloads per route need no tracking at all:
 *   DesiDictation-mac.dmg   this site's Download button
 *   DesiDictation.dmg       the one-line installer (install.sh)
 *   DesiDictation-<v>.dmg   the GitHub releases page
 * The button and the installer use `releases/latest/download/…`, so a new
 * release needs no change here, and counts add up across releases
 * (`scripts/download_counts.sh` in the app repo prints the totals).
 * `version` and `size` are only the fallback label: the page reads the
 * latest release from GitHub when it loads (useLatestRelease).
 */
/** Where the product and its install guide live on this site. */
export const PRODUCT_PATH = "/desi-dictation";
export const INSTALL_PATH = "/desi-dictation/install";

const REPO = "https://github.com/s-samarth/desi-dictation";
const LATEST = `${REPO}/releases/latest/download`;
/** The copy only this site links to, so its count is the site's downloads. */
const WEB_FILE = "DesiDictation-mac.dmg";

export const release = {
  version: "0.7.0",
  size: "8.3 MB",
  file: WEB_FILE,
  url: `${LATEST}/${WEB_FILE}`,
  checksumUrl: `${LATEST}/${WEB_FILE}.sha256`,
  /** Read on page load (via /api/downloads) for the label and the download count. */
  api: "https://api.github.com/repos/s-samarth/desi-dictation/releases?per_page=100",
  notes: `${REPO}/releases`,
  repo: REPO,
};

export const requirements = ["macOS 14+", "Apple Silicon", "Free beta"];

/** The one-line installer from the app repo. curl sets no quarantine flag, so Gatekeeper never asks. */
export const installer = {
  command: "curl -fsSL https://raw.githubusercontent.com/s-samarth/desi-dictation/main/install.sh | bash",
  source: `${REPO}/blob/main/install.sh`,
  does: [
    "Checks for an Apple Silicon Mac on macOS 14 or newer",
    "Downloads the newest release from GitHub",
    "Verifies its SHA-256 against the published checksum",
    "Puts the app in Applications and opens it",
  ],
};

export const commands = {
  unblock: `xattr -dr com.apple.quarantine "/Applications/Desi Dictation.app"`,
  checksum: `shasum -a 256 ~/Downloads/${release.file}\ncurl -fsSL ${release.checksumUrl}`,
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
  { name: "Hinglish Prime", forWhat: "Hinglish, “kal meeting hai, deck ready rakhna”", size: "1.03 GB", pick: true },
  { name: "Parakeet", forWhat: "English, fastest", size: "416 MB", pick: true },
  { name: "Qwen3-ASR 1.7B", forWhat: "English, most accurate (a little slower)", size: "2.08 GB" },
  { name: "Vaani Hindi", forWhat: "शुद्ध हिन्दी, in Devanagari", size: "1.06 GB", pick: true },
  { name: "Silero VAD", forWhat: "Everyone. Better pauses and long dictations", size: "1 MB", pick: true },
  {
    name: "Context checker",
    forWhat: "Optional. Purple “odd here” underlines, When it fits words, smarter filler suggestions",
    size: "397 MB",
  },
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
    fix: "Run the one-line installer again; it quits the old copy and swaps in the newest. By hand: quit from the menu bar, drag the new app into Applications and choose Replace. Either way, don’t uninstall first: settings, history, dictionary and models are kept.",
  },
];

/** The product header on both Desi Dictation pages. */
export const ddNav = {
  name: "Desi Dictation",
  productPath: PRODUCT_PATH,
  installPath: INSTALL_PATH,
  sections: [
    { id: "watch", label: "Watch" },
    { id: "features", label: "Features" },
    { id: "review", label: "Review" },
    { id: "guide", label: "Guide" },
    { id: "compare", label: "Compare" },
    { id: "pricing", label: "Pricing" },
    { id: "faq", label: "FAQ" },
  ],
  download: { href: release.url, label: "Download" },
};
