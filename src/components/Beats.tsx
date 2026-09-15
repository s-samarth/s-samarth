import { motion, useTransform, type MotionValue } from "framer-motion";
import { useBeat } from "@/hooks/use-beat";

export type BeatCopy = { title: string; body: string };

type BeatProps = { beats: BeatCopy[]; progress: MotionValue<number>; index: number };

/**
 * One beat of a pinned chapter. Beats are stacked in the same spot and take
 * turns as scroll progress moves through their slice; the last one stays.
 */
const Beat = ({ beats, progress, index }: BeatProps) => {
  const span = 1 / beats.length;
  const isLast = index === beats.length - 1;
  const { opacity, y } = useBeat(progress, index * span, isLast ? 2 : (index + 1) * span - 0.04);

  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0">
      <h3 className="display text-3xl md:text-4xl">{beats[index].title}</h3>
      <p className="lede mt-4">{beats[index].body}</p>
    </motion.div>
  );
};

const BeatBar = ({ beats, progress, index }: BeatProps) => {
  const span = 1 / beats.length;
  const fill = useTransform(progress, [index * span, (index + 1) * span], ["0%", "100%"]);
  return (
    <span className="relative h-[3px] w-10 overflow-hidden rounded-full bg-white/10">
      <motion.span style={{ width: fill, backgroundColor: "var(--accent)" }} className="absolute inset-y-0 left-0 rounded-full" />
    </span>
  );
};

type BeatsProps = { beats: BeatCopy[]; progress: MotionValue<number>; className: string };

/** The beat stack plus its progress bars. `className` sets the stack's height. */
export const Beats = ({ beats, progress, className }: BeatsProps) => (
  <>
    <div className={`relative ${className}`}>
      {beats.map((_, i) => (
        <Beat key={i} beats={beats} progress={progress} index={i} />
      ))}
    </div>
    <div className="mt-6 flex gap-2">
      {beats.map((_, i) => (
        <BeatBar key={i} beats={beats} progress={progress} index={i} />
      ))}
    </div>
  </>
);
