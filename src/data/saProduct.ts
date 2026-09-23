/**
 * Product copy for /survive-ai. Every claim comes from the app repo (README,
 * docs/PRODUCT_OVERVIEW.md, docs/RESULTS.md, the guides themselves), and the
 * numbers are the ones RESULTS.md records, including the ones that fail.
 */
import type { FaqItem } from "@/components/product/FaqSection";

export interface Ask {
  /** What someone types, the way they'd actually type it. */
  typed: string;
  /** The guide and section retrieval lands on. */
  found: string;
  /** The first action, condensed from that section. */
  first: string;
}

export const asks: Ask[] = [
  {
    typed: "kutte ne kaata",
    found: "Snakebite & Animals → Rabies",
    first: "Wash it with soap and running water for a full 15 minutes. Then get the anti-rabies vaccine today.",
  },
  {
    typed: "gas ki smell aa rahi hai",
    found: "Fire & Gas → LPG cylinder",
    first: "Don’t touch any switch, on or off. Open the windows, turn off the regulator, call 1906.",
  },
  {
    typed: "hot dry skin, confused, not sweating",
    found: "Heatwave & Cold Wave → Heat stroke",
    first: "Treat it as heat stroke. Shade, clothes off, pour water and fan hard. Cooling is the treatment.",
  },
];

/** The 18 situations, in the app's own order and names (lib/models/doc_topic.dart). */
export const situations = [
  "First Response",
  "No Network",
  "Medical Emergency",
  "Earthquake & Collapse",
  "Flood & Drowning",
  "Cyclone & Tsunami",
  "Landslide & Mountains",
  "Fire & Gas",
  "Stampede & Crowds",
  "Riot & Curfew",
  "Blast & Attack",
  "War & Air Raid",
  "Chemical & Industrial",
  "Heatwave & Cold Wave",
  "Snakebite & Animals",
  "Water, Food & Disease",
  "Shelter & Stranded",
  "Children & Elderly",
];

export interface SaFeature {
  title: string;
  body: string;
}

export const saFeatures: SaFeature[] = [
  {
    title: "Type the way you panic",
    body: "English, romanised Hindi, or two words. “khoon nikal raha hai” finds the bleeding guide; a Hinglish dictionary bridges the words the guides don’t use.",
  },
  {
    title: "Three searches, one answer",
    body: "Keyword search, the same search with expanded words, and a small meaning-based model, fused into one ranking. Five passages go to the model.",
  },
  {
    title: "Shows its source",
    body: "Every answer cites the paragraph it came from, so you can open the guide and read the full steps yourself.",
  },
  {
    title: "Checks its own answer",
    body: "If the model says something the guide forbids, the answer is blocked and the guide’s own words are shown instead.",
  },
  {
    title: "Says no when it should",
    body: "Ask about something outside the 18 situations and it declines instead of guessing, and tells you what it does cover.",
  },
  {
    title: "Guides you can just read",
    body: "Every guide is in the app as plain text, browsable by situation, even before the model has downloaded.",
  },
  {
    title: "Updates on Wi-Fi only",
    body: "When Wi-Fi is back it fetches only the guides that changed, checks each file, and re-indexes. Offline, nothing changes.",
  },
  {
    title: "Travels without a store",
    body: "A plain APK, so it can be passed on by USB, Bluetooth or a pen drive where the Play Store isn’t reachable.",
  },
];

export interface Measure {
  value: string;
  what: string;
}

/** The sticky note: what holds up. */
export const measured: Measure[] = [
  { value: "89.7%", what: "of 382 test questions find the right passage in the top five" },
  { value: "98.4%", what: "of answers pass the safety checks, on the model that ships" },
  { value: "0 bytes", what: "sent anywhere once it’s set up" },
];

/** Said plainly, next to the note: what doesn't hold up yet. */
export const stillOpen: string[] = [
  "Romanised Hindi is the weak spot: 60.7% of Hinglish questions find the right passage, against 92% in English.",
  "The first word of an answer takes about 6 seconds on a laptop, against a 3-second target. A phone will be slower.",
  "Two answers out of 62 broke a safety rule. One told a dog-bite victim to apply turmeric, which the guide forbids. The output guard exists because of cases like that.",
];

export const saPrivacy = [
  "No account, no sign-in, no email.",
  "No telemetry, no analytics, no location tracking.",
  "Your questions never leave the phone.",
  "It only goes online on Wi-Fi, never mobile data, to fetch the model or updated guides.",
];

/** From the README's “What we will not build”. */
export const neverBuild = [
  "Paid features",
  "Location tracking",
  "Telemetry",
  "Real-time messaging",
  "Medicine prescriptions",
  "Political content",
];

export const saFaqs: FaqItem[] = [
  {
    q: "Does it really work with no signal?",
    a: "Yes. It needs Wi-Fi once, to download the model (about 1.3 GB). After that, airplane mode is fine: the model, the guides and the search all live on the phone.",
  },
  {
    q: "Is it a replacement for a doctor or 112?",
    a: "No. It is general guidance from written guides, for the minutes before help arrives or when help can’t be reached. In a life-threatening emergency, call 112, and the app says so.",
  },
  {
    q: "Where do the answers come from?",
    a: "Eighteen guides written for India: its emergency numbers, its snakes, its LPG cylinders, its monsoon. The model only rephrases what search finds in them, and every answer cites the paragraph.",
  },
  {
    q: "Will it run on my phone?",
    a: "It needs a 64-bit Android phone on Android 7 or later with at least 6 GB of RAM; 8 GB is better. Budget about 2 GB of free storage for the app and the model.",
  },
  {
    q: "Why isn’t it on the Play Store?",
    a: "On purpose. A plain APK can be passed on by USB or Bluetooth where the store is blocked or there’s no internet. Check the SHA-256 before installing one someone handed you.",
  },
  {
    q: "Is it open source?",
    a: "Yes. The app, the search pipeline, the evaluation sets and the guides are on GitHub under Apache 2.0. The Gemma models are Google’s, under Gemma’s own terms.",
  },
  {
    q: "Is there an iPhone version?",
    a: "The iOS app builds from the same code and is tested on every release, but iPhones can’t install apps from outside the App Store, so it needs TestFlight first. Not yet.",
  },
  {
    q: "Does it cost anything?",
    a: "No, and it won’t. It’s open source under Apache 2.0, with no ads, no account and no paid tier.",
  },
];
