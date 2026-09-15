import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";
import { Chapter } from "./Chapter";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/** A headline line that rises out of a clipping mask, like a title card. */
const TitleLine = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <span className="block overflow-hidden pb-[0.06em]">
    <motion.span
      className="block"
      initial={{ y: "105%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const HeroSection = () => {
  // Camera move on exit: the photo pushes in and fades, the copy drifts up.
  const { scrollY } = useScroll();
  const photoScale = useTransform(scrollY, [0, 900], [1, 1.12]);
  const photoOpacity = useTransform(scrollY, [0, 700], [1, 0]);
  const copyY = useTransform(scrollY, [0, 900], [0, -120]);
  const copyOpacity = useTransform(scrollY, [0, 550], [1, 0]);

  return (
    <Chapter id="hero" className="min-h-[100svh] overflow-hidden">
      <motion.div style={{ scale: photoScale, opacity: photoOpacity }} className="absolute inset-y-0 right-0 w-full origin-center lg:w-[62%]">
        <motion.div
          className="h-full w-full"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5, ease: EASE }}
        >
          <img
            src={profilePhoto}
            alt="Samarth Saraswat holding a microphone, lit blue on one side and amber on the other"
            className="h-full w-full object-cover object-[68%_20%] lg:object-[62%_center]"
          />
          <div className="absolute inset-0 bg-ink/25" />
          <div className="absolute inset-0 hidden bg-gradient-to-r from-ink via-ink/75 to-transparent to-60% lg:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/85 to-transparent to-75% lg:via-ink/40 lg:to-45%" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/80 to-transparent" />
        </motion.div>
      </motion.div>

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="container-x relative flex min-h-[100svh] flex-col justify-end pb-14 pt-32 lg:justify-center lg:pb-0"
      >
        <motion.p {...rise(0.9)} className="eyebrow !text-amber">
          AI Engineer @ Tazapay · Bangalore
        </motion.p>

        <h1 className="display mt-5 text-[3.4rem] leading-[0.98] sm:text-7xl md:text-8xl lg:text-[6.6rem]">
          <TitleLine delay={0.95}>Samarth Saraswat,</TitleLine>
          <TitleLine delay={1.08}>
            <span className="text-amber">AI Builder</span>
          </TitleLine>
        </h1>

        <motion.p {...rise(1.3)} className="mt-8 max-w-xl text-lg leading-relaxed text-bone-dim md:text-xl">
          Building AI-powered products that balance user impact, business outcomes, and flawless
          execution. Right now, that means AI systems for anti-money laundering and fraud detection
          in cross-border payments.
        </motion.p>

        <motion.div {...rise(1.45)} className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#who" className="btn-accent !bg-amber">
            Get to know me
          </a>
          <a href="#talk" className="btn-ghost">
            Raise a ticket
          </a>
        </motion.div>

        <motion.div
          {...rise(1.7)}
          className="mt-16 flex items-center justify-between text-[13px] font-medium uppercase tracking-[0.14em] text-mist lg:mt-24"
        >
          <span>Formerly Microsoft · IIT Guwahati</span>
          <a href="#who" className="hidden items-center gap-2 hover:text-bone sm:flex">
            Scroll <ArrowDown size={12} />
          </a>
        </motion.div>
      </motion.div>
    </Chapter>
  );
};
