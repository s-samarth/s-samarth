import { motion } from "framer-motion";

type Shape = "arrow-left" | "hook-up" | "arrow-down" | "underline" | "circle";

/**
 * Hand-drawn paths, drawn once in a 100 x 40 box so they share one viewBox.
 * Size the element at the same 5:2 ratio (e.g. w-20 h-8, w-[100px] h-10) or
 * the stroke is stretched and the arrow drifts away from its note.
 */
const paths: Record<Shape, string[]> = {
  "arrow-left": ["M96 22 C 70 6, 36 8, 8 20", "M18 10 L 7 20 L 19 28"],
  // Tail at the bottom right (beside the note), curling up to a head at the top left.
  "hook-up": ["M97 33 C 62 38, 26 32, 13 5", "M5 14 L 13 4 L 23 12"],
  "arrow-down": ["M50 2 C 58 14, 44 24, 50 36", "M42 28 L 50 37 L 57 27"],
  underline: ["M3 26 C 30 20, 64 30, 97 22"],
  circle: ["M50 4 C 90 2, 98 30, 60 36 C 24 40, 0 30, 8 14 C 14 4, 40 2, 70 8"],
};

interface ScribbleProps {
  shape: Shape;
  className?: string;
  delay?: number;
}

/**
 * A pen stroke that draws itself when it scrolls into view.
 *
 * Frontend note: framer-motion's `pathLength` maps to SVG stroke-dasharray
 * under the hood, so 0 -> 1 reveals the path along its own length, like a
 * pen moving. `vectorEffect` keeps the line weight constant when the SVG is
 * stretched to fit its box.
 */
export const Scribble = ({ shape, className = "", delay = 0 }: ScribbleProps) => (
  <svg viewBox="0 0 100 40" preserveAspectRatio="none" className={`pointer-events-none ${className}`} aria-hidden="true">
    {paths[shape].map((d, i) => (
      <motion.path
        key={d}
        d={d}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: delay + i * 0.45, ease: "easeInOut" }}
      />
    ))}
  </svg>
);
