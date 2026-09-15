import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * One-time cinema reveal: two black bars retract from the middle of the
 * screen on first paint, then unmount so they cost nothing afterwards.
 *
 * Frontend note: animating `scaleY` instead of `height` keeps this on the
 * compositor thread, so it stays smooth even while fonts and the hero image
 * are still loading.
 */
const EASE = [0.76, 0, 0.24, 1] as const;

export const Letterbox = () => {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  if (reduce || done) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[80]">
      <motion.div
        className="absolute inset-x-0 top-0 h-1/2 origin-top bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
        onAnimationComplete={() => setDone(true)}
      />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-1/2 origin-bottom bg-ink"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 1.3, delay: 0.35, ease: EASE }}
      />
    </div>
  );
};
