import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Chapter } from "./Chapter";
import { Beats, type BeatCopy } from "./Beats";
import { CorridorScene } from "./scenes/CorridorScene";

const beats: BeatCopy[] = [
  {
    title: "Money crossing borders.",
    body: "Every transaction moves through a corridor: countries, currencies, banks. Each one is a decision. Let it through, hold it, or flag it.",
  },
  {
    title: "Anti-money laundering.",
    body: "Building AI systems that help surface the patterns rules alone miss, and explain why they were surfaced, so a human can act on them.",
  },
  {
    title: "Fraud detection.",
    body: "On real money, in real time, where a wrong call costs someone on both sides of the border. That is the job right now.",
  },
];

/**
 * Pinned chapter. The section is tall; the panel inside sticks to the
 * viewport, and scroll progress through the section plays three beats.
 */
export const NowSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const sceneScale = useTransform(progress, [0, 0.2], [0.94, 1]);
  const sceneOpacity = useTransform(progress, [0, 0.15], [0.4, 1]);

  return (
    <Chapter id="now">
      <div ref={ref} className="h-[280vh]">
        <div className="sticky top-0 flex h-screen items-start overflow-hidden pt-24 lg:items-center lg:pt-0">
          <div className="container-x grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Now · Tazapay</p>
              <h2 className="display mt-3 text-[2.1rem] sm:text-5xl md:text-6xl lg:mt-4">
                AI for money that <em>crosses borders.</em>
              </h2>
              <Beats beats={beats} progress={progress} className="mt-8 h-[190px] sm:h-[180px] lg:mt-10" />
            </div>

            <motion.div style={{ scale: sceneScale, opacity: sceneOpacity }} className="panel aspect-[16/10] w-full sm:aspect-[3/2]">
              <CorridorScene />
            </motion.div>
          </div>
        </div>
      </div>
    </Chapter>
  );
};
