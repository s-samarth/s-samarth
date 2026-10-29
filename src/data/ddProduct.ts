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
    title: "Checks only when it’s unsure",
    body: "Turn on Review before paste and a clean dictation still pastes at once. When a word is shaky, a panel shows the text with only those words underlined. Press 1 to fix, Enter to paste.",
  },
  {
    title: "Never swaps a word on a guess",
    body: "A name it isn’t sure of is offered, not written over. Only what you told it changes on its own: the words you saved, and um and uh.",
  },
  {
    title: "Ums out, second thoughts caught",
    body: "Um, uh and hmm just go. In Review, “meet at 2, no, make it 3” and “scratch that” show up as a suggestion you accept with one key; with the context checker, “like” and “you know” are offered as fillers too.",
  },
  {
    title: "Learns from your fixes",
    body: "It wrote Rowan, you fix it to Rohan in the text. A small popup asks “Always write Rowan as Rohan?” Nothing is learned without your yes.",
  },
  {
    title: "Claude, but only when it fits",
    body: "Some words are right only sometimes. Set one to When it fits and a small local model reads the sentence: “ask cloud to review it” becomes Claude, “upload to the cloud” stays cloud.",
  },
  {
    title: "Your words, two lists",
    body: "English and Hinglish keep separate word lists, so “nahi” never touches your English. Select any word in any app and right-click → Always write as… to add one.",
  },
  {
    title: "Your Hinglish spelling",
    body: "Hinglish has no fixed spelling. If the chat already says “nahi”, a dictated “nahin” is offered as “nahi”, so the message reads consistent.",
  },
  {
    title: "Per-app language",
    body: "Pin WhatsApp to Hinglish and Mail to English once. It switches by itself, and tells you when a rule kicked in.",
  },
  {
    title: "Models from the menu bar",
    body: "Switch between Parakeet (fastest) and Qwen (most accurate) without opening a window. Each language remembers its own model.",
  },
  {
    title: "Pauses are fine",
    body: "Voice-activity detection handles thinking pauses and long dictations. Transcription runs in chunks while you speak.",
  },
  {
    title: "A day of history",
    body: "The last 24 hours of dictations, searchable, stored only on your Mac. Closing the review panel without pasting still keeps it here. Turn it off if you like.",
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
  "It only goes online when you ask it to: downloading a model, or sending feedback.",
  "Names on screen, if you allow it, are read for one dictation and dropped. Never saved.",
  "The context checker is a model on your Mac too. It reads your sentence; it never sends it.",
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
    a: "Turn on “Suggest words from my corrections”, dictate, then fix a misheard word in the text within 2 minutes. When you stop typing (or press Enter), it asks whether to always write it your way. In Review you can also keep a fix Just this once, When it fits, or Always. It only asks about sound-alike spellings, never grammar or rewrites, and nothing is saved without your yes.",
  },
  {
    q: "Does it ever change my words on its own?",
    a: "Only in ways you set up: the words you saved to Your words, and um and uh (a switch, on by default). Everything else it suspects, a misheard name, a filler, “no, make it 3”, is shown as a suggestion and waits for you.",
  },
  {
    q: "Which underline setting should I pick?",
    a: "Conservative for email and documents, where a wrong name costs you. Moderate (the default) for everyday messages. Liberal when you talk to a coding agent or a chatbot, which reads past a typo anyway. Start stricter, and loosen it as you learn where it slips.",
  },
  {
    q: "Do I need the context checker?",
    a: "No. It’s an optional 397 MB model that adds purple “odd here” underlines, When it fits words and smarter filler suggestions. Everything else works without it. Get it from the Models page if you mostly dictate English with Review on.",
  },
  {
    q: "Does it read my screen?",
    a: "Only if you turn on “Suggest names on screen”. Then, when you start dictating, it reads the names visible in that window so a reply to Rohan isn’t typed as Rowan. The text stays in memory for that one dictation, then it’s gone. All of it is off until you switch it on.",
  },
  {
    q: "How do I send feedback?",
    a: "Menu bar → Send Feedback…. Type what happened; adding your app version or your last dictation is a tick box, off for the dictation, and you see the exact text before it goes. It’s sent to this site only when you press Send, then forwarded to my inbox and not stored. No audio, no IDs. Prefer email? The same window has an Email instead button.",
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
    a: "The app itself is small. Models are separate: about 1.5 GB for Hinglish plus English, another 1 GB if you add शुद्ध हिन्दी, 2 GB more for the most accurate English model, and 397 MB for the optional context checker.",
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
