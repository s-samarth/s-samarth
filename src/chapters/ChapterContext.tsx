import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { chapterById, type ChapterId } from "./chapters";

interface ChapterState {
  current: ChapterId;
  setCurrent: (id: ChapterId) => void;
}

const ChapterContext = createContext<ChapterState | null>(null);

/**
 * Tracks which chapter currently owns the screen and writes its accent color
 * to a CSS variable on <html>, so plain CSS (eyebrows, emphasis, buttons)
 * follows the story without every component subscribing to React state.
 *
 * Frontend note: this is the "lift state up + CSS variable" pattern. React
 * owns the source of truth; the DOM variable is a cheap broadcast channel.
 */
export const ChapterProvider = ({ children }: { children: ReactNode }) => {
  const [current, setCurrent] = useState<ChapterId>("hero");

  useEffect(() => {
    document.documentElement.style.setProperty("--accent", chapterById(current).accent);
  }, [current]);

  const value = useMemo(() => ({ current, setCurrent }), [current]);
  return <ChapterContext.Provider value={value}>{children}</ChapterContext.Provider>;
};

export const useChapter = (): ChapterState => {
  const ctx = useContext(ChapterContext);
  if (!ctx) throw new Error("useChapter must be used inside ChapterProvider");
  return ctx;
};
