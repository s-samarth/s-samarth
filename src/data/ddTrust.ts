/**
 * The trust pages on /desi-dictation: Review before paste, its three
 * strictness levels, the optional context checker, and every switch with
 * when to flip it. Facts from the app repo's docs/features/implementation/
 * (REVIEW_BEFORE_PASTE, FILLERS_AND_CORRECTIONS, CONTEXT_FIT) and the app's
 * own defaults; numbers measured on an M3 MacBook Air.
 */

/** Review before paste: Dictation → Review. */
export const reviewModes = [
  { name: "Off", note: "default", what: "Pastes straight away, as it always has." },
  {
    name: "Only when unsure",
    note: "recommended",
    what: "The panel opens only when a word is underlined. A clean dictation pastes with no extra step.",
  },
  { name: "Always", what: "Every dictation stops in the panel first. For when it really matters." },
];

export const underlines = [
  {
    colour: "orange",
    name: "Hard to hear",
    what: "The speech model wasn’t sure of the word, or it sounds like one of your words.",
    needs: "Nothing extra.",
  },
  {
    colour: "purple",
    name: "Odd here",
    what: "Heard clearly, but it doesn’t fit the sentence: “watch one PC”.",
    needs: "The context checker. English and हिन्दी.",
  },
];

export const reviewKeys: [string, string][] = [
  ["Tab", "next underlined word"],
  ["1–5", "pick a suggestion"],
  ["0", "looks right: keeps the word, drops the underline"],
  ["Enter", "paste into the app you were in"],
  ["Esc", "copy instead of pasting"],
  ["✕ or ⌘W", "close: no paste, clipboard untouched, still in History"],
];

export interface Level {
  name: string;
  /** Roughly how many words get underlined. */
  share: string;
  /** English on Parakeet, measured: wrong words caught, and underlines that were real mistakes. */
  caught: string;
  real: string;
  when: string[];
  isDefault?: boolean;
}

/** Underline words: Conservative / Moderate / Liberal. */
export const levels: Level[] = [
  {
    name: "Conservative",
    share: "about 1 word in 7",
    caught: "56%",
    real: "35%",
    when: [
      "Email, documents, anything a person reads with your name on it.",
      "Names and numbers that must be right.",
      "Your first week, while you learn where it slips.",
    ],
  },
  {
    name: "Moderate",
    share: "about 1 word in 12",
    caught: "43%",
    real: "49%",
    when: ["Everyday messages: Slack, WhatsApp, quick replies.", "When you’re not sure. It’s the default."],
    isDefault: true,
  },
  {
    name: "Liberal",
    share: "about 1 word in 25",
    caught: "28%",
    real: "67%",
    when: [
      "Talking to a coding agent or a chatbot. It reads past a typo, so stop only for words that are probably wrong.",
      "Once you trust it and want speed.",
    ],
  },
];

/** The optional 397 MB model, and what it adds. */
export const checker = {
  size: "397 MB",
  memory: "about 0.4 GB while it works",
  what: "A small language model (Qwen3 0.6B) that runs on your Mac. It reads a sentence and judges which words fit. It never writes anything and never sends anything.",
  adds: [
    "Purple “odd here” underlines, for words heard clearly but wrong in context.",
    "“When it fits” words: cloud becomes Claude only when the sentence is about Claude.",
    "Fillers judged: “like” and “you know” are offered for removal only when the sentence reads better without them.",
    "The best suggestion listed first, and which words “no, make it 3” replaces.",
  ],
  without:
    "Everything else works without it: orange underlines, your words, um and uh removal, spoken corrections in review.",
  where: "Models page → Context checker → Get. The same row sits under the Review settings and on the Vocabulary page.",
  worthIt: "Worth it if you mostly dictate English with Review on, or your names sound like everyday words.",
};

export interface Switch {
  name: string;
  where: string;
  starts: string;
  flip: string;
}

/** Every switch that changes what lands at your cursor, with when to flip it. */
export const switches: Switch[] = [
  {
    name: "Review before paste",
    where: "Dictation → Review",
    starts: "Off",
    flip: "Set Only when unsure once getting it right matters more than one keypress.",
  },
  {
    name: "Underline words",
    where: "Dictation → Review",
    starts: "Moderate",
    flip: "Conservative for email and documents, Liberal for chats and coding agents.",
  },
  {
    name: "Remove um and uh",
    where: "Dictation → Clean-up",
    starts: "On",
    flip: "Off if you want a word-for-word transcript.",
  },
  {
    name: "Remove fillers when sure",
    where: "Dictation → Clean-up",
    starts: "Off",
    flip: "On after a week of saying yes to its “Filler?” suggestions. Needs the context checker.",
  },
  {
    name: "Suggest words from my corrections",
    where: "Vocabulary",
    starts: "Off",
    flip: "On if it keeps mishearing the same names. It asks before learning anything.",
  },
  {
    name: "Suggest near-misses of my words",
    where: "Vocabulary",
    starts: "Off",
    flip: "On once you have a few names in Your words: “Saraswath” gets offered as “Saraswat” in Review.",
  },
  {
    name: "Suggest names on screen",
    where: "Vocabulary",
    starts: "Off",
    flip: "On if you reply to people by name. It reads the window for that one dictation, then forgets it.",
  },
  {
    name: "Remember language per app",
    where: "Dictation → Advanced",
    starts: "On",
    flip: "Set a rule from the menu bar’s “For <app>” item: WhatsApp → Hinglish, Mail → English.",
  },
  {
    name: "Keep history",
    where: "History",
    starts: "On",
    flip: "Off if you’d rather nothing is kept, not even for a day.",
  },
];
