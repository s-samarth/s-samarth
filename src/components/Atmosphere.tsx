import { motion, useScroll, useTransform } from "framer-motion";
import { useChapter } from "@/chapters/ChapterContext";
import { chapterById } from "@/chapters/chapters";

/**
 * The continuous surface behind every chapter: two large blurred glows whose
 * colors cross-fade with the current chapter and drift slowly with scroll.
 *
 * Frontend note: `background-color` transitions are cheap and animatable,
 * unlike gradients, so each glow is a plain colored circle with a big blur.
 * `will-change: transform` keeps the blur on its own compositor layer.
 */
export const Atmosphere = () => {
  const { current } = useChapter();
  const [a, b] = chapterById(current).glow;
  const { scrollYProgress } = useScroll();

  const yA = useTransform(scrollYProgress, [0, 1], ["0vh", "-30vh"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["0vh", "20vh"]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={{ y: yA, backgroundColor: a, transitionDuration: "1600ms" }}
        className="absolute -left-[20vw] -top-[25vh] h-[70vh] w-[70vw] rounded-full opacity-[0.16] blur-[90px] transition-colors ease-out will-change-transform md:blur-[140px]"
      />
      <motion.div
        style={{ y: yB, backgroundColor: b, transitionDuration: "1600ms" }}
        className="absolute -bottom-[30vh] -right-[15vw] h-[70vh] w-[60vw] rounded-full opacity-[0.13] blur-[90px] transition-colors ease-out will-change-transform md:blur-[140px]"
      />
    </div>
  );
};
