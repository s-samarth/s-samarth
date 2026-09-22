/**
 * Who Samarth is, in one place. The page renders from this, and so do the
 * search-engine and AI-crawler files built at deploy time (JSON-LD,
 * llms.txt), so the facts can never drift apart.
 */
export const SITE_URL = "https://www.samarthsaraswat.com";

export const profile = {
  name: "Samarth Saraswat",
  headline: "AI Engineer and AI builder in Bangalore, India",
  email: "samarth.iitg@gmail.com",
  city: "Bengaluru",
  region: "Karnataka",
  country: "IN",
  summary:
    "Samarth Saraswat is an AI Engineer at Tazapay in Bangalore, building AI for fraud detection and anti-money laundering in cross-border payments. Previously a Data Scientist at Microsoft for 3+ years and the builder of Seller Copilot, an AI for enterprise sales that stopped $100M+ a year in revenue leakage. B.Tech in Electronics & Communication from IIT Guwahati (2022). Builds on-device and local-first AI products, writes about product metrics on Substack, and does stand-up comedy.",
};

export const links = {
  linkedin: "https://linkedin.com/in/s-samarth",
  github: "https://github.com/s-samarth",
  substack: "https://samarthsaraswat.substack.com",
};

export interface Job {
  when: string;
  role: string;
  where: string;
  whereUrl: string;
  what: string;
}

export const jobs: Job[] = [
  {
    when: "Now",
    role: "AI Engineer",
    where: "Tazapay",
    whereUrl: "https://tazapay.com",
    what: "AI for fraud detection and anti-money laundering in cross-border payments.",
  },
  {
    when: "Before · 3+ years",
    role: "Data Scientist",
    where: "Microsoft",
    whereUrl: "https://www.microsoft.com",
    what: "Built Seller Copilot, an AI for enterprise sales. Stopped $100M+ a year in revenue leakage.",
  },
];

export interface Fact {
  key: string;
  value: string;
  href?: string;
}

export const facts: Fact[] = [
  { key: "Now", value: "AI Engineer, Tazapay" },
  { key: "Before", value: "Data Scientist, Microsoft · 3+ years" },
  { key: "School", value: "B.Tech, Electronics & Communication, IIT Guwahati, 2022" },
  { key: "Also", value: "YC Startup School, Bangalore · the first edition there, April 2026" },
  { key: "Based in", value: "Bangalore, India" },
  { key: "Writes at", value: "samarthsaraswat.substack.com", href: links.substack },
  { key: "Off hours", value: "Stand-up comedy. The mic is not a prop." },
];

export const skillGroups = [
  { title: "AI systems", skills: ["LLM copilots & agents", "RAG & hybrid retrieval", "On-device inference", "Evals & golden sets", "Fraud & AML detection"] },
  { title: "Machine learning", skills: ["NLP", "Speech recognition", "Anomaly detection", "Model evaluation", "Deep learning"] },
  { title: "Product", skills: ["AI product management", "Experimentation", "OKRs & North Star metrics", "Metric design"] },
  { title: "Tools", skills: ["Python", "PyTorch", "LangGraph", "Claude Code", "Codex", "SQL"] },
];
