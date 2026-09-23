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
    model: "Oriserve Hinglish Apex",
  },
  {
    name: "English",
    said: "send the invoice by friday, and cc finance",
    typed: "Send the invoice by Friday, and cc finance.",
    model: "NVIDIA Parakeet",
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
    title: "Per-app language",
    body: "Pin WhatsApp to Hinglish and Mail to English once. It switches by itself, and tells you when a rule kicked in.",
  },
  {
    title: "Your words, your spellings",
    body: "Teach it names, brands and code terms once: saraswath becomes Saraswat, gpt becomes GPT. Right-click any past dictation to add one.",
  },
  {
    title: "Pauses are fine",
    body: "Voice-activity detection handles thinking pauses and long dictations. Transcription runs in chunks while you speak.",
  },
  {
    title: "Speak desi, write English",
    body: "Say it in Hindi or Hinglish, get polished English pasted. If the AI step fails, your original words paste instead.",
    ai: true,
  },
  {
    title: "Structure my thoughts",
    body: "Ramble for as long as you like, then pick Notes, Action list, Email draft or Outline. In beta.",
    ai: true,
  },
  {
    title: "Tone, with Faithful by default",
    body: "Faithful never rewrites what you said. Casual, Professional and Respectful are there when you want them.",
    ai: true,
  },
  {
    title: "A day of history",
    body: "The last 24 hours of dictations, searchable, stored only on your Mac. Turn it off if you like.",
  },
];

export interface Speed {
  value: string;
  what: string;
}

export const speeds: Speed[] = [
  { value: "0.21 s", what: "per English dictation, on an M3 MacBook Air" },
  { value: "1.47 s", what: "per Hinglish dictation, same Mac" },
  { value: "0 bytes", what: "of your voice sent anywhere" },
];

export const privacyPoints = [
  "No account, no sign-in, no email.",
  "No cloud transcription. Audio never leaves your Mac.",
  "No telemetry, not even the anonymous kind.",
  "It only goes online when you ask it to, like downloading a model.",
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Is it really offline?",
    a: "Yes. Once the models are downloaded, dictation works with Wi-Fi off. The optional AI features use Ollama, which also runs on your Mac.",
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
    a: "It needs an Apple Silicon Mac (M1 or newer) on macOS 14 or later. Intel Macs aren’t supported. On an 8 GB Mac, pick the lighter Hinglish Swift model.",
  },
  {
    q: "How much space does it take?",
    a: "The app is under 2 MB. Models are separate: about 1 GB for Hinglish plus English, and another 1 GB if you add शुद्ध हिन्दी.",
  },
  {
    q: "Does it cost anything?",
    a: "Not during the beta. Every model and feature is free, and there are no word limits.",
  },
  {
    q: "Is it open source?",
    a: "The app code is on GitHub. The Hinglish models are Oriserve’s, released under Apache 2.0, and run on whisper.cpp.",
  },
];
