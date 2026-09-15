import { useEffect, useRef, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { useChapter } from "@/chapters/ChapterContext";
import type { ChapterId } from "@/chapters/chapters";

interface ChapterProps {
  id: ChapterId;
  children: ReactNode;
  className?: string;
  /** How much of the viewport the section must cover before it takes over. */
  amount?: number;
}

/**
 * A section that announces itself to the ChapterProvider when it fills
 * enough of the viewport. Pinned chapters are taller than the screen, so we
 * watch a thin sentinel band near the top of the viewport instead of the
 * whole section.
 */
export const Chapter = ({ id, children, className = "" }: ChapterProps) => {
  const ref = useRef<HTMLElement>(null);
  const { setCurrent } = useChapter();
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) setCurrent(id);
  }, [inView, id, setCurrent]);

  return (
    <section id={id} ref={ref} className={`relative ${className}`}>
      {children}
    </section>
  );
};
