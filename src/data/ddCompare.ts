/**
 * The comparison table on /desi-dictation. Competitor facts come from the app
 * repo's docs/competitors/ (their public pages and 2026 reviews, researched
 * July 2026). Prices change: re-check before quoting, and bump `checked`.
 *
 * To add a row, add an entry to `rows`; to add a product, add it to
 * `products` and give every row a cell for it. `tone` colours the cell:
 * "yes" is a win for the reader, "no" a gap, "meh" in between, undefined neutral.
 */
export type Tone = "yes" | "no" | "meh";

export interface Cell {
  text: string;
  tone?: Tone;
}

export const products = ["Desi Dictation", "Wispr Flow", "MacWhisper", "Superwhisper"] as const;
export type Product = (typeof products)[number];

export interface Row {
  label: string;
  cells: Record<Product, Cell>;
}

export const checked = "July 2026";

export const rows: Row[] = [
  {
    label: "Hinglish in Roman script",
    cells: {
      "Desi Dictation": { text: "Built for it", tone: "yes" },
      "Wispr Flow": { text: "Not specialised", tone: "no" },
      MacWhisper: { text: "Not specialised", tone: "no" },
      Superwhisper: { text: "Not specialised", tone: "no" },
    },
  },
  {
    label: "Where your voice goes",
    cells: {
      "Desi Dictation": { text: "Stays on your Mac", tone: "yes" },
      "Wispr Flow": { text: "Their cloud", tone: "no" },
      MacWhisper: { text: "Stays on your Mac", tone: "yes" },
      Superwhisper: { text: "Stays on your Mac", tone: "yes" },
    },
  },
  {
    label: "Works with no internet",
    cells: {
      "Desi Dictation": { text: "Yes", tone: "yes" },
      "Wispr Flow": { text: "No", tone: "no" },
      MacWhisper: { text: "Yes", tone: "yes" },
      Superwhisper: { text: "Yes", tone: "yes" },
    },
  },
  {
    label: "AI rewrite and translate",
    cells: {
      "Desi Dictation": { text: "On-device, optional", tone: "yes" },
      "Wispr Flow": { text: "In the cloud", tone: "meh" },
      MacWhisper: { text: "Cloud, with your own key", tone: "meh" },
      Superwhisper: { text: "Cloud LLMs, optional", tone: "meh" },
    },
  },
  {
    label: "Free tier",
    cells: {
      "Desi Dictation": { text: "Everything, during the beta", tone: "yes" },
      "Wispr Flow": { text: "2,000 words a week", tone: "meh" },
      MacWhisper: { text: "Smaller models only", tone: "meh" },
      Superwhisper: { text: "Limited, short history", tone: "meh" },
    },
  },
  {
    label: "Paid plans",
    cells: {
      "Desi Dictation": { text: "None yet. No subscription." },
      "Wispr Flow": { text: "$12–15 a month" },
      MacWhisper: { text: "€59 once" },
      Superwhisper: { text: "$8.49 a month, or $249.99 once" },
    },
  },
  {
    label: "Languages",
    cells: {
      "Desi Dictation": { text: "Hinglish, English, हिन्दी", tone: "meh" },
      "Wispr Flow": { text: "100+", tone: "yes" },
      MacWhisper: { text: "100+", tone: "yes" },
      Superwhisper: { text: "100+", tone: "yes" },
    },
  },
  {
    label: "Runs on",
    cells: {
      "Desi Dictation": { text: "Apple Silicon Macs", tone: "meh" },
      "Wispr Flow": { text: "Mac, Windows, iPhone, Android", tone: "yes" },
      MacWhisper: { text: "Mac (Intel too), iOS app", tone: "yes" },
      Superwhisper: { text: "Mac, Windows, iOS", tone: "yes" },
    },
  },
];

/** Said plainly, because a comparison that only lists wins isn't worth reading. */
export const theyWin = [
  "Wispr Flow is on every platform, including Android, and its polish is the category benchmark.",
  "MacWhisper is years more mature and far better at transcribing files and meetings.",
  "Superwhisper has the deepest system of custom modes and runs on Windows.",
];
