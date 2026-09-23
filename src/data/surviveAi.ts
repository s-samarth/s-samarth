/**
 * Release, install and troubleshooting copy for /survive-ai, lifted from the
 * app repo's README, docs/INSTALLATION.md and the GitHub release.
 * To ship a new version, update `release` and nothing else.
 *
 * Note: from the next tag on, release.yml names the asset
 * `survive-ai-v<version>-arm64.apk` and attaches a .sha256 beside it.
 */
/** Where the product and its install guide live on this site. */
export const SA_PATH = "/survive-ai";
export const SA_INSTALL_PATH = "/survive-ai/install";

const REPO = "https://github.com/s-samarth/survive-ai";
const VERSION = "2.0.0";
const FILE = "app-release.apk";

/** The APK is served straight from the GitHub release, so the repo stays the one source of builds. */
export const saRelease = {
  version: VERSION,
  file: FILE,
  size: "358 MB",
  sha256: "a65a1155ec936425a3b83c0d6bc1e4c505f4696d33d93e11319de31b8a765cf7",
  url: `${REPO}/releases/download/v${VERSION}/${FILE}`,
  notes: `${REPO}/releases`,
  repo: REPO,
};

export const saRequirements = ["Android 7+", "6 GB RAM", "Free"];

/** The product header on both Survive AI pages. */
export const saNav = {
  name: "Survive AI",
  productPath: SA_PATH,
  installPath: SA_INSTALL_PATH,
  sections: [
    { id: "why", label: "Why" },
    { id: "how", label: "How" },
    { id: "compare", label: "Compare" },
    { id: "faq", label: "FAQ" },
  ],
  download: { href: saRelease.url, label: "APK" },
};

export const saCommands = {
  checksumMac: `shasum -a 256 ~/Downloads/${FILE}`,
  serve: "python3 -m http.server 8080",
  adbInstall: `adb install ${FILE}`,
};

export interface ShareRoute {
  how: string;
  detail: string;
}

/** The APK is meant to travel hand to hand, so the install guide lists every way. */
export const shareRoutes: ShareRoute[] = [
  { how: "Download", detail: "Open the GitHub release in the phone’s browser and tap the APK." },
  { how: "USB", detail: "Copy the APK over a cable, or from a pen drive with an OTG adapter." },
  { how: "Bluetooth", detail: "Send the file from any phone that already has it. Nearby Share and Wi-Fi Direct work too." },
  { how: "Local network", detail: "Serve it from a laptop and open the address on the phone. No internet needed." },
];

export interface SaFix {
  symptom: string;
  fix: string;
}

export const saFixes: SaFix[] = [
  {
    symptom: "“App not installed” or it won’t open the file",
    fix: "Allow installs from the app you opened it with (Settings → Apps → Special app access → Install unknown apps). Also check the phone is 64-bit: the APK is arm64 only.",
  },
  {
    symptom: "Play Protect warns about it",
    fix: "Expected for any app from outside the Play Store. Check the SHA-256 below first, then tap Install anyway.",
  },
  {
    symptom: "The model download stopped",
    fix: "It resumes. Get back on Wi-Fi and tap Retry; it carries on from where it stopped and checks the file when it finishes.",
  },
  {
    symptom: "The model won’t load",
    fix: "It needs about 1.5 GB of free RAM. Close the other apps and open it again. Phones under 6 GB of RAM aren’t supported.",
  },
];
