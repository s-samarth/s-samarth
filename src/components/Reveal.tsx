import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Scroll-triggered reveal. Wraps children in a motion.div that rises and
 * fades in once, the first time it enters the viewport.
 *
 * Frontend note: `whileInView` uses an IntersectionObserver under the hood,
 * so this costs nothing until the element is near the screen. `once: true`
 * means it never replays when the user scrolls back up, which keeps the page
 * calm.
 */
interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Vertical distance to travel, in px. */
  y?: number;
}

const EASE = [0.22, 1, 0.36, 1] as const;

export const Reveal = ({ children, delay = 0, className, y = 24 }: RevealProps) => {
  const variants: Variants = {
    hidden: { opacity: 0, y },
    shown: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: EASE } },
  };

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
};
