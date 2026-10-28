/**
 * Product copy for /desi-dictation: languages, features, speed and FAQ.
 * Every claim comes from the app repo (README, docs/PRODUCT.md, SETUP_GUIDE,
 * USAGE, PERFORMANCE); numbers are measured on an M3 MacBook Air.
 */
export interface LanguageMode {
  name: string;
  /** What you'd say. */
  said: string;
  /** What lands at the cursor. */
  typed: string;
  model: string;
}

export const languageModes: LanguageMode[] = [
  {
    name: "Hinglish",
    said: "kal meeting hai, please deck ready rakhna",
    typed: "Kal meeting hai, please deck ready rakhna.",
    model: "Oriserve Hinglish Prime",
  },
  {
    name: "English",
    said: "send the invoice by friday, and cc finance",
    typed: "Send the invoice by Friday, and cc finance.",
    model: "NVIDIA Parakeet · Qwen3-ASR",
  },
  { name: "हिन्दी", said: "kal meeting hai", typed: "कल मीटिंग है", model: "Vaani Hindi" },
];

export interface Feature {
  title: string;
  body: string;
  /** Needs the free Ollama app, which also runs on your Mac. */
  ai?: boolean;
}

export const features: Feature[] = [
  {
    title: "Works in every app",
    body: "WhatsApp Web, Slack, Mail, Notes, your IDE. If it has a text cursor, the words land there, and on your clipboard too.",
  },
  {
    title: "Learns from your fixes",
    body: "It wrote Rowan, you fix it to Rohan right there in the text. A small popup asks “Always write Rowan as Rohan?” Nothing is learned without your yes.",
  },
  {
    title: "Names right the first time",
    body: "Saraswath becomes Saraswat because it sounds and looks almost the same. Names visible on screen count too, read locally and forgotten after. Every fix is shown, and undoing one stops it for good.",
  },
  {
    title: "Your words, two lists",
    body: "English and Hinglish keep separate word lists, so “nahi” never touches your English. Select any word in any app and right-click → Always write as… to add one.",
  },
  {
    title: "Your Hinglish spelling",
    body: "Hinglish has no fixed spelling. If the chat already says “nahi”, a dictated “nahin” comes out “nahi”, so the message reads consistent.",
  },
  {
    title: "Per-app language",
    body: "Pin WhatsApp to Hinglish and Mail to English once. It switches by itself, and tells you when a rule kicked in.",
  },
  {
    title: "Pauses are fine",
    body: "Voice-activity detection handles thinking pauses and long dictations. Transcription runs in chunks while you speak.",
  },
  {
    title: "A day of history",
    body: "The last 24 hours of dictations, searchable, stored only on your Mac, with every automatic fix marked. Turn it off if you like.",
  },
];

export interface Speed {
  value: string;
  what: string;
}

export const speeds: Speed[] = [
  { value: "0.1 s", what: "per English dictation, on an M3 MacBook Air" },
  { value: "1.8 s", what: "per Hinglish dictation, same Mac" },
  { value: "0 bytes", what: "of your voice sent anywhere" },
];

export const privacyPoints = [
  "No account, no sign-in, no email.",
  "No cloud transcription. Audio never leaves your Mac.",
  "No telemetry, not even the anonymous kind.",
  "It only goes online when you ask it to, like downloading a model.",
  "Names on screen, if you allow it, are read for one dictation and dropped. Never saved.",
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Is it really offline?",
    a: "Yes. Once the models are downloaded, dictation works with Wi-Fi off, vocabulary learning included.",
  },
  {
    q: "How does it learn my words?",
    a: "Dictate, then fix a misheard word in the text within 30 seconds. When you stop typing (or press Enter), it asks whether to always write it your way. It only asks about sound-alike spellings, never grammar or rewrites, and nothing is saved without your yes. The app’s Guide page explains every switch next to the switch itself.",
  },
  {
    q: "Does it read my screen?",
    a: "Only if you turn on “Use names on screen”. Then, when you start dictating, it reads the names visible in that window so a reply to Rohan isn’t typed as Rowan. The text stays in memory for that one dictation, then it’s gone. All of it is off until you switch it on.",
  },
  {
    q: "Why does macOS say it can’t verify the app?",
    a: "The beta is signed with my own certificate but not notarised by Apple yet; that comes before the public launch. Install with the one-line Terminal command and you never see the warning. From the DMG, the install guide shows the one-time fix.",
  },
  {
    q: "How do I update?",
    a: "Run the one-line installer again: it quits the running copy and installs the newest release. Your settings, history, dictionary and models are kept.",
  },
  {
    q: "Will it run on my Mac?",
    a: "It needs an Apple Silicon Mac (M1 or newer) on macOS 14 or later. Intel Macs aren’t supported.",
  },
  {
    q: "How much space does it take?",
    a: "The app itself is small. Models are separate: about 1.5 GB for Hinglish plus English, another 1 GB if you add शुद्ध हिन्दी, and 2 GB more for the most accurate English model.",
  },
  {
    q: "Does it cost anything?",
    a: "Not during the beta. Every model and feature is free, and there are no word limits.",
  },
  {
    q: "Is it open source?",
    a: "The app code is on GitHub. The Hinglish models are Oriserve’s, released under Apache 2.0, and run on whisper.cpp; English runs NVIDIA’s Parakeet or Alibaba’s Qwen3-ASR.",
  },
];
