import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Chapter } from "./Chapter";
import { CorridorScene } from "./scenes/CorridorScene";
import { useBeat } from "@/hooks/use-beat";

const beats = [
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

const Beat = ({ progress, index }: { progress: ReturnType<typeof useSpring>; index: number }) => {
  const span = 1 / beats.length;
  const { opacity, y } = useBeat(progress, index * span, (index + 1) * span - 0.04);
  const isLast = index === beats.length - 1;
  const last = useBeat(progress, index * span, 2);
  const style = isLast ? last : { opacity, y };

  return (
    <motion.div style={style} className="absolute inset-x-0 top-0">
      <h3 className="display text-3xl md:text-4xl">{beats[index].title}</h3>
      <p className="lede mt-4">{beats[index].body}</p>
    </motion.div>
  );
};

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

              <div className="relative mt-8 h-[190px] sm:h-[180px] lg:mt-10">
                {beats.map((_, i) => (
                  <Beat key={i} progress={progress} index={i} />
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                {beats.map((_, i) => (
                  <BeatBar key={i} progress={progress} index={i} />
                ))}
              </div>
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

const BeatBar = ({ progress, index }: { progress: ReturnType<typeof useSpring>; index: number }) => {
  const span = 1 / beats.length;
  const fill = useTransform(progress, [index * span, (index + 1) * span], ["0%", "100%"]);
  return (
    <span className="relative h-[3px] w-10 overflow-hidden rounded-full bg-white/10">
      <motion.span style={{ width: fill, backgroundColor: "var(--accent)" }} className="absolute inset-y-0 left-0 rounded-full" />
    </span>
  );
};
