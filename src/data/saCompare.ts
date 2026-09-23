/**
 * The comparison table on /survive-ai. The columns are kinds of help, not
 * named apps: what someone actually has in hand when the network goes. The
 * Survive AI column comes from the app repo (README, PRODUCT_OVERVIEW).
 *
 * To add a row, add an entry to `rows`; to add a column, add it to
 * `saProducts` and give every row a cell for it.
 */
import type { CompareRow } from "@/components/product/CompareTable";

export const saProducts = ["Survive AI", "A printed guide", "Offline survival apps", "ChatGPT / Gemini"] as const;
export type SaProduct = (typeof saProducts)[number];

export const saChecked = "September 2026";

export const saRows: CompareRow<SaProduct>[] = [
  {
    label: "Works with zero bars",
    cells: {
      "Survive AI": { text: "Yes, after one Wi-Fi setup", tone: "yes" },
      "A printed guide": { text: "Yes", tone: "yes" },
      "Offline survival apps": { text: "Yes", tone: "yes" },
      "ChatGPT / Gemini": { text: "No", tone: "no" },
    },
  },
  {
    label: "Getting to the right step",
    cells: {
      "Survive AI": { text: "Ask. It finds the paragraph", tone: "yes" },
      "A printed guide": { text: "Index, chapter, skim", tone: "no" },
      "Offline survival apps": { text: "Browse menus", tone: "meh" },
      "ChatGPT / Gemini": { text: "Ask, with signal", tone: "meh" },
    },
  },
  {
    label: "Understands “kutte ne kaata”",
    cells: {
      "Survive AI": { text: "Built for it", tone: "yes" },
      "A printed guide": { text: "No", tone: "no" },
      "Offline survival apps": { text: "Usually not", tone: "no" },
      "ChatGPT / Gemini": { text: "Yes", tone: "yes" },
    },
  },
  {
    label: "Where answers come from",
    cells: {
      "Survive AI": { text: "The guides, with the paragraph cited", tone: "yes" },
      "A printed guide": { text: "It is the source", tone: "yes" },
      "Offline survival apps": { text: "Fixed text", tone: "yes" },
      "ChatGPT / Gemini": { text: "Anything it learned. Can make things up", tone: "meh" },
    },
  },
  {
    label: "Written for India",
    cells: {
      "Survive AI": { text: "112, 1906, ASV, LPG, monsoon", tone: "yes" },
      "A printed guide": { text: "Depends on the book", tone: "meh" },
      "Offline survival apps": { text: "Mostly generic", tone: "meh" },
      "ChatGPT / Gemini": { text: "If you ask", tone: "meh" },
    },
  },
  {
    label: "Needs",
    cells: {
      "Survive AI": { text: "Android, 6 GB RAM", tone: "meh" },
      "A printed guide": { text: "Nothing. Not even a battery", tone: "yes" },
      "Offline survival apps": { text: "Almost any phone", tone: "yes" },
      "ChatGPT / Gemini": { text: "Signal and a working server", tone: "no" },
    },
  },
  {
    label: "Cost",
    cells: {
      "Survive AI": { text: "Free. No paid tier, ever" },
      "A printed guide": { text: "The price of the book" },
      "Offline survival apps": { text: "Free to a few hundred rupees" },
      "ChatGPT / Gemini": { text: "Free tier, paid plans" },
    },
  },
];

/** Said plainly, because a comparison that only lists wins isn't worth reading. */
export const saTheyWin = [
  "A printed guide never runs out of battery, needs no 6 GB phone, and can’t misread your question.",
  "ChatGPT and Gemini are far more capable, and answer anything in any language, as long as there is signal.",
  "Plain offline survival apps are lighter and run on almost any phone.",
];
