import { motion } from "framer-motion";
import cutout from "@/assets/samarth-cutout.webp";
import { Highlight } from "./notebook/Highlight";
import { Scribble } from "./notebook/Scribble";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

/**
 * The photo as a die-cut sticker: the background was removed with macOS
 * subject lifting, and the white border comes from stacked drop-shadows,
 * which follow the image's transparent edge instead of its box.
 */
const stickerOutline =
  "drop-shadow(3px 0 0 #fffdf7) drop-shadow(-3px 0 0 #fffdf7) drop-shadow(0 3px 0 #fffdf7) drop-shadow(0 -3px 0 #fffdf7) drop-shadow(0 14px 18px rgba(29,36,48,0.28))";

const Sticker = () => (
  <motion.figure
    initial={{ opacity: 0, rotate: 9, scale: 1.08, y: -20 }}
    animate={{ opacity: 1, rotate: 3, scale: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
    className="relative mx-auto w-[78%] max-w-[420px] lg:w-full"
  >
    <span className="tape -top-2 left-[38%] rotate-[-4deg]" />
    <img
      src={cutout}
      alt="Samarth Saraswat holding a microphone, lit blue on one side and amber on the other"
      width={792}
      height={675}
      className="w-full"
      style={{ filter: stickerOutline }}
    />
    <figcaption className="hand mt-3 -rotate-2 text-center text-[21px]">fig. 1: the mic is not a prop</figcaption>
  </motion.figure>
);

export const HeroSection = () => (
  <section id="top" className="relative">
    <div className="page-x flex min-h-[100svh] flex-col justify-center pb-16 pt-24 md:pt-28">
      <motion.p {...rise(0.1)} className="label">
        <span className="!text-redpen">p.01 · </span>Notebook Nº 03 · Bangalore · If found, raise a ticket
      </motion.p>

      <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-10">
        <div className="order-2 lg:order-1">
          <motion.h1 {...rise(0.2)} className="headline text-[3.3rem] sm:text-7xl md:text-[5.4rem] lg:text-[5.8rem]">
            Samarth Saraswat,
            <br />
            <em className="font-medium">
              <Highlight delay={0.9}>AI builder.</Highlight>
            </em>
          </motion.h1>

          <motion.p {...rise(0.4)} className="lede mt-8 max-w-xl">
            I build AI agents, RAG and ML systems that people actually use. By day I'm an AI engineer at Tazapay. Before
            that, a data scientist at Microsoft. Off hours, stand-up comedy.
          </motion.p>

          <motion.div {...rise(0.55)} className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#ticket" className="btn-stamp">
              Raise a ticket
            </a>
            <a href="#built" className="btn-pen">
              See what I built
            </a>
            <span className="relative hidden items-center sm:inline-flex">
              <Scribble shape="arrow-left" className="h-8 w-14 text-biro" delay={1.4} />
              <span className="hand ml-1 -rotate-3">it actually emails me</span>
            </span>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Sticker />
        </div>
      </div>
    </div>
  </section>
);
