import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Chapter } from "./Chapter";
import { Beats, type BeatCopy } from "./Beats";
import { CopilotScene } from "./scenes/CopilotScene";
import { LeakageScene } from "./scenes/LeakageScene";

const beats: BeatCopy[] = [
  {
    title: "Deals closed in 2 days, not 15.",
    body: "Seller Copilot. Upload the proposal; a RAG and multi-agent system finds what's missing and chases approvals itself. Sellers rated it higher, and at Microsoft's scale, billions stopped sitting idle for days.",
  },
  {
    title: "$100M+ in leakage, stopped.",
    body: "An explainable anomaly detection product over $70B+ in global invoices. Revenue loss stopped being an ops clean-up and became a risk you see coming.",
  },
];

/**
 * Pinned chapter. Two beats, each with its own scene; the scenes are stacked
 * in one frame and cross-fade as the reader scrolls from the first to the second.
 */
export const BeforeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const sceneScale = useTransform(progress, [0, 0.2], [0.94, 1]);
  const sceneOpacity = useTransform(progress, [0, 0.15], [0.4, 1]);
  const copilotOpacity = useTransform(progress, [0.42, 0.52], [1, 0]);
  const leakageOpacity = useTransform(progress, [0.42, 0.52], [0, 1]);

  return (
    <Chapter id="before">
      <div ref={ref} className="h-[220vh]">
        <div className="sticky top-0 flex h-screen items-start overflow-hidden pt-24 lg:items-center lg:pt-0">
          <div className="container-x grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">Before · Microsoft</p>
              <h2 className="display mt-3 text-[2.1rem] sm:text-5xl md:text-6xl lg:mt-4">
                Three years shipping <em>copilots.</em>
              </h2>
              <Beats beats={beats} progress={progress} className="mt-8 h-[270px] sm:h-[200px] lg:mt-10" />
            </div>

            <motion.div
              style={{ scale: sceneScale, opacity: sceneOpacity }}
              className="panel relative aspect-[16/10] w-full overflow-hidden sm:aspect-[3/2]"
            >
              <motion.div style={{ opacity: copilotOpacity }} className="absolute inset-0">
                <CopilotScene />
              </motion.div>
              <motion.div style={{ opacity: leakageOpacity }} className="absolute inset-0">
                <LeakageScene />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </Chapter>
  );
};
