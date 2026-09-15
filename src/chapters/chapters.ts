/**
 * The story, in order. Each chapter owns a section id, a rail label, and the
 * colors the atmosphere and accents cross-fade to when it takes the screen.
 */
export type ChapterId = "hero" | "who" | "now" | "before" | "built" | "writes" | "talk";

export interface Chapter {
  id: ChapterId;
  label: string;
  /** Accent used for eyebrows, emphasis words and buttons. */
  accent: string;
  /** Two atmosphere glows: top-left and bottom-right. */
  glow: [string, string];
}

export const chapters: Chapter[] = [
  { id: "hero", label: "Start", accent: "#F2A33A", glow: ["#2C93B3", "#F2A33A"] },
  { id: "who", label: "Who", accent: "#F2A33A", glow: ["#E8833A", "#3B4CCA"] },
  { id: "now", label: "Now", accent: "#A78BFA", glow: ["#6D5BFF", "#C026D3"] },
  { id: "before", label: "Before", accent: "#60A5FA", glow: ["#2F80ED", "#1FB6A5"] },
  { id: "built", label: "Built", accent: "#34D399", glow: ["#10B981", "#F2A33A"] },
  { id: "writes", label: "Writes", accent: "#FB7185", glow: ["#F43F5E", "#F59E0B"] },
  { id: "talk", label: "Talk", accent: "#F2A33A", glow: ["#F2A33A", "#5CC8E8"] },
];

/** Chapters that appear in the rail and nav (the hero is implicit). */
export const navChapters = chapters.filter((c) => c.id !== "hero");

export const chapterById = (id: ChapterId): Chapter => chapters.find((c) => c.id === id) ?? chapters[0];
