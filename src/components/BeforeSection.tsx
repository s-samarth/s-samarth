import { useRef } from "react";
import { motion, useScroll, useSpring, type MotionValue } from "framer-motion";
import { Chapter } from "./Chapter";
import { useArrive } from "@/hooks/use-beat";

const stats = [
  { big: "15 → 2 days", caption: "Enterprise deal cycle time, via an LLM-powered Seller Copilot." },
  { big: "Thousands", caption: "of sellers adopted it, with strong feedback and evaluation loops." },
  { big: "CSAT, up", caption: "through multi-metric quality and reliability frameworks." },
  { big: "Leakage, caught", caption: "with an explainable anomaly detection system preventing large-scale revenue loss." },
];

const Stat = ({ progress, index }: { progress: MotionValue<number>; index: number }) => {
  const at = 0.18 + index * 0.22;
  const { opacity, y } = useArrive(progress, at);
  return (
    <motion.li style={{ opacity, y }} className="border-t border-line py-4 first:border-t-0 md:py-7">
      <p className="display text-[1.75rem] sm:text-4xl md:text-5xl">{stats[index].big}</p>
      <p className="mt-1.5 max-w-md text-[15px] leading-relaxed text-mist md:mt-2 md:text-[17px]">{stats[index].caption}</p>
    </motion.li>
  );
};

/**
 * Pinned chapter. The headline holds while four outcomes arrive one at a
 * time as the reader scrolls, and stay lit once they have arrived.
 */
export const BeforeSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <Chapter id="before">
      <div ref={ref} className="h-[300vh]">
        <div className="sticky top-0 flex h-screen items-start overflow-hidden pt-24 lg:items-center lg:pt-0">
          <div className="container-x grid gap-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="eyebrow">Before · Microsoft</p>
              <h2 className="display mt-3 text-[2.1rem] sm:text-5xl md:text-6xl lg:mt-4">
                Three years shipping <em>copilots.</em>
              </h2>
              <p className="lede mt-6 hidden max-w-lg sm:block">
                Data &amp; Applied Scientist. Built and scaled AI copilots for enterprise customers and
                third-party sellers, translating business problems into scalable AI-first product
                solutions.
              </p>
            </div>

            <ul className="lg:pt-2">
              {stats.map((_, i) => (
                <Stat key={i} progress={progress} index={i} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
};
