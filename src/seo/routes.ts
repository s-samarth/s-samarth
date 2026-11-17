import { SITE_URL } from "@/data/profile";
import { release, requirements } from "@/data/desiDictation";
import { saRelease, saRequirements } from "@/data/surviveAi";
import homeCard from "@/assets/og/home.jpg";
import ddCard from "@/assets/og/desi-dictation.jpg";
import saCard from "@/assets/og/survive-ai.jpg";

/**
 * The card a chat app or social site shows when someone pastes the link
 * (og:image). The source designs are scripts/og/*.html. They are imported, so
 * Vite gives each a content-hashed URL: change the picture and the URL
 * changes with it, which is what makes WhatsApp and LinkedIn drop their
 * cached copy of the old one.
 */
export interface PreviewCard {
  src: string;
  alt: string;
}

const cards = {
  home: { src: homeCard, alt: "A notebook page: Samarth Saraswat, AI builder, beside a cut-out photo of Samarth holding a microphone" },
  desi: { src: ddCard, alt: "Desi Dictation: hold a key, speak the way you actually talk, release. A Notes window filling with Hinglish." },
  survive: { src: saCard, alt: "Survive AI answering \u201ckutte ne kaata\u201d offline: wash it with soap and water for 15 minutes, then get the anti-rabies vaccine" },
} satisfies Record<string, PreviewCard>;

/**
 * Pages that are prerendered at build time, and the head tags each one needs.
 * The home page keeps the title and description written in index.html
 * (`meta` absent); every other page swaps its own in. Every page sets its
 * own preview card (scripts/prerender.mjs).
 */
export interface RouteMeta {
  path: string;
  /** Where the HTML lands inside dist/. */
  file: string;
  meta?: { title: string; description: string };
  image: PreviewCard;
}

export const prerenderedRoutes: RouteMeta[] = [
  { path: "/", file: "index.html", image: cards.home },
  {
    path: "/desi-dictation",
    image: cards.desi,
    file: "desi-dictation/index.html",
    meta: {
      title: "Desi Dictation | Dictation you can trust, for macOS",
      description:
        "Hold a key, speak English, Hinglish or Hindi, release. Free, fully local dictation for Apple Silicon Macs that checks the words it's unsure of before it pastes and never swaps a word on a guess. Compared with Wispr Flow, MacWhisper and Superwhisper.",
    },
  },
  {
    path: "/desi-dictation/install",
    image: cards.desi,
    file: "desi-dictation/install/index.html",
    meta: {
      title: "Install Desi Dictation | Setup guide for macOS",
      description:
        "Download the Desi Dictation DMG, get past Apple's unverified-developer warning, grant three permissions, pick your models and choose how much it checks with you. Five minutes, once.",
    },
  },
  {
    path: "/survive-ai",
    image: cards.survive,
    file: "survive-ai/index.html",
    meta: {
      title: "Survive AI | Offline emergency answers for Android",
      description:
        "An offline survival assistant for India. Ask in English or Hinglish with no signal and get the first thing to do, cited from 18 guides. Free Android APK.",
    },
  },
  {
    path: "/survive-ai/install",
    image: cards.survive,
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
