import { SITE_URL } from "@/data/profile";
import { release, requirements } from "@/data/desiDictation";

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
        "Hold a key, speak Hinglish, release. Free, fully local dictation for Apple Silicon Macs. Download the DMG and install it in five minutes.",
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
  description: prerenderedRoutes[1].meta?.description,
  softwareRequirements: requirements.slice(0, 2).join(", "),
  codeRepository: release.repo,
  author: { "@id": `${SITE_URL}/#person` },
});
