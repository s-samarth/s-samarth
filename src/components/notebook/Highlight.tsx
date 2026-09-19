import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface HighlightProps {
  children: ReactNode;
  /** Seconds to wait after the text scrolls into view. */
  delay?: number;
}

/**
 * A highlighter stroke that swipes across its words the first time they
 * scroll into view.
 *
 * Frontend note: the stroke is a CSS background gradient (see `.hl` in
 * index.css). Animating `backgroundSize` from 0% to 100% "draws" it left to
 * right, and `box-decoration-break: clone` makes each wrapped line get its
 * own stroke instead of one smeared box.
 */
export const Highlight = ({ children, delay = 0 }: HighlightProps) => (
  <motion.span
    className="hl"
    initial={{ backgroundSize: "0% 100%" }}
    whileInView={{ backgroundSize: "100% 100%" }}
    viewport={{ once: true, margin: "-15% 0px" }}
    transition={{ duration: 0.7, delay, ease: [0.65, 0, 0.35, 1] }}
  >
    {children}
  </motion.span>
);
