import { SITE_URL } from "@/data/profile";
import { release, requirements } from "@/data/desiDictation";
import { saRelease, saRequirements } from "@/data/surviveAi";

/**
 * Pages that are prerendered at build time, and the head tags each one needs.
 * The home page keeps the tags already written in index.html (`meta` absent);
 * every other page swaps its own in (scripts/prerender.mjs).
 */
export interface RouteMeta {
  path: string;
  /** Where the HTML lands inside dist/. */
  file: string;
  meta?: { title: string; description: string };
}

export const prerenderedRoutes: RouteMeta[] = [
  { path: "/", file: "index.html" },
  {
    path: "/desi-dictation",
    file: "desi-dictation/index.html",
    meta: {
      title: "Desi Dictation | Local Hinglish dictation for macOS",
      description:
        "Hold a key, speak Hinglish, release. Free, fully local dictation for Apple Silicon Macs, compared with Wispr Flow, MacWhisper and Superwhisper.",
    },
  },
  {
    path: "/desi-dictation/install",
    file: "desi-dictation/install/index.html",
    meta: {
      title: "Install Desi Dictation | Setup guide for macOS",
      description:
        "Download the Desi Dictation DMG, get past Apple's unverified-developer warning, grant three permissions and pick your models. Five minutes, once.",
    },
  },
  {
    path: "/survive-ai",
    file: "survive-ai/index.html",
    meta: {
      title: "Survive AI | Offline emergency answers for Android",
      description:
        "An offline survival assistant for India. Ask in English or Hinglish with no signal and get the first thing to do, cited from 18 guides. Free Android APK.",
    },
  },
  {
    path: "/survive-ai/install",
    file: "survive-ai/install/index.html",
    meta: {
      title: "Install Survive AI | Android APK setup guide",
      description:
        "Get the Survive AI APK by download, USB or Bluetooth, allow the install, and download the model once on Wi-Fi. After that it works with no internet.",
    },
  },
];

/** Normalises "/desi-dictation/" and "/desi-dictation" to one key. */
export const routeKey = (pathname: string) => (pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname);

/** Schema.org SoftwareApplication for the product page, so search engines can show it as an app. */
export const desiDictationLd = () => ({
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Desi Dictation",
  url: `${SITE_URL}/desi-dictation`,
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "macOS 14 or later",
  softwareVersion: release.version,
  downloadUrl: release.url,
  fileSize: release.size,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: prerenderedRoutes.find((r) => r.path === "/desi-dictation")?.meta?.description,
  softwareRequirements: requirements.slice(0, 2).join(", "),
  codeRepository: release.repo,
  author: { "@id": `${SITE_URL}/#person` },
});

/** Schema.org MobileApplication for /survive-ai. */
export const surviveAiLd = () => ({
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  name: "Survive AI",
  url: `${SITE_URL}/survive-ai`,
  applicationCategory: "HealthApplication",
  operatingSystem: "Android 7 or later",
  softwareVersion: saRelease.version,
  downloadUrl: saRelease.url,
  fileSize: saRelease.size,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: prerenderedRoutes.find((r) => r.path === "/survive-ai")?.meta?.description,
  softwareRequirements: saRequirements.slice(0, 2).join(", "),
  codeRepository: saRelease.repo,
  author: { "@id": `${SITE_URL}/#person` },
});
