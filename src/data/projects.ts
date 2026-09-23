/**
 * Project copy and spec rows. Everything here is lifted from the repos'
 * READMEs and docs, so the numbers are real, not marketing.
 */
export interface ProjectSpec {
  key: string;
  value: string;
  /** The part of `value` that gets the highlighter: the one number to remember. */
  mark?: string;
}

export interface Project {
  id: "survive-ai" | "desi-dictation" | "study-hub";
  kind: string;
  title: string;
  oneLiner: string;
  body: string[];
  specs: ProjectSpec[];
  github: string;
  live?: { href: string; label: string };
  /** Handwritten margin note next to the animation. Keep it short and true. */
  note: string;
}

export const projects: Project[] = [
  {
    id: "survive-ai",
    kind: "On-device AI · Android",
    title: "Survive AI",
    oneLiner:
      "An offline-first survival assistant that runs a 2B language model and a retrieval pipeline entirely on an Android phone.",
    body: [
      "Emergencies take the network with them. Floods drop cell towers, shutdowns remove the rest, and the moment someone needs to know what to do about a snakebite or a gas leak is the moment they cannot look it up.",
      "Survive AI answers “kutte ne kaata” or “chest pain” with no bars. Eighteen India-specific guides are searched with three retrieval legs (BM25, query expansion with romanised Hindi, and a dense encoder), fused with weighted reciprocal rank fusion, and handed to Gemma 2B through an instruction-last prompt tuned for small models. Every answer cites the paragraph it came from, and an output guard blocks anything the guides forbid.",
    ],
    specs: [
      { key: "Runs on", value: "Android, 6 GB RAM, zero bytes sent at runtime" },
      { key: "Model", value: "Gemma 2B IT, INT4, CPU backend" },
      { key: "Retrieval", value: "Recall@5 89.7% hybrid vs 81.5% keyword-only", mark: "Recall@5 89.7%" },
      { key: "Stack", value: "Flutter, SQLite FTS5, ONNX Runtime, Python build step" },
    ],
    github: "https://github.com/s-samarth/survive-ai",
    note: "works with zero bars!",
  },
  {
    id: "desi-dictation",
    kind: "Local speech · macOS",
    title: "Desi Dictation",
    oneLiner:
      "Local-first Hinglish dictation for macOS. Hold a key, speak the way you actually talk, release, and Roman-script Hinglish lands in whatever app you are typing in.",
    body: [
      "Dictation tools understand English or Hindi. Nobody in Bangalore talks like that. “Kal meeting hai, please deck ready rakhna” is one sentence, and it should land as one sentence.",
      "A global hotkey captures 16 kHz audio, whisper.cpp runs a Hinglish fine-tuned Whisper on Metal, a user dictionary cleans it up, and a pasteboard swap drops the text into the focused app. No cloud, no subscription, runs on a MacBook Air. The current beta ships five curated models with per-language defaults, voice-activity pause handling, chunked transcription for long dictation, and a warm-mic pre-roll so the first word is never lost.",
    ],
    specs: [
      { key: "Runs on", value: "macOS, Apple Silicon, fully local" },
      { key: "Latency", value: "0.21 s English, 1.47 s Hinglish per dictation (M3 Air)", mark: "1.47 s Hinglish" },
      { key: "Models", value: "Oriserve Whisper-Hindi2Hinglish, Parakeet TDT, Vaani" },
      { key: "Stack", value: "Swift, SwiftUI, whisper.cpp, Metal, Silero VAD" },
    ],
    github: "https://github.com/s-samarth/desi-dictation",
    note: "1.47 s on an M3 Air",
  },
  {
    id: "study-hub",
    kind: "Community · Free study hub",
    title: "Data Science Preparation",
    oneLiner: "A free, hosted study hub for anyone preparing for data science and machine learning roles.",
    body: [
      "Seven self-contained knowledge bases, built as independent MkDocs sites and stitched under one landing page: Mathematics, Classical ML, Deep Learning, LLMs, Agentic AI, Productionizing ML, and twenty ML system-design case studies with full interview transcripts.",
      "It also doubles as a knowledge base for AI agents. A machine-readable index maps every topic to its page, with a citation protocol so an agent can say what it already knew versus what it went and looked up.",
    ],
    specs: [
      { key: "Lives at", value: "GitHub Pages, rebuilt on every push" },
      { key: "Format", value: "7 MkDocs Material sites, one hub", mark: "7 MkDocs Material sites" },
      { key: "For", value: "Anyone. No sign-up, no paywall" },
    ],
    github: "https://github.com/s-samarth/DataSciencePreparation",
    live: { href: "https://s-samarth.github.io/DataSciencePreparation/", label: "Open the hub" },
    note: "free. no sign-up. ever.",
  },
];
