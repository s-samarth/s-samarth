import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import profilePhoto from "@/assets/profile-photo.jpg";

const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: EASE },
});

/** A headline line that rises out of a clipping mask, like a title card. */
const TitleLine = ({ children, delay }: { children: React.ReactNode; delay: number }) => (
  <span className="block overflow-hidden pb-[0.08em]">
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

export const HeroSection = () => (
  <section className="relative min-h-[100svh] overflow-hidden">
    {/* Photo, full bleed, faded into the ink on the left and bottom. */}
    <motion.div
      className="absolute inset-y-0 right-0 w-full lg:w-[62%]"
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

    <div className="container-x relative flex min-h-[100svh] flex-col justify-end pb-14 pt-32 lg:justify-center lg:pb-0">
      <motion.p {...rise(0.9)} className="eyebrow">
        AI Engineer @ Tazapay · Bangalore
      </motion.p>

      <h1 className="display mt-6 text-[3.4rem] sm:text-7xl md:text-8xl lg:text-[7.25rem]">
        <TitleLine delay={0.95}>Samarth Saraswat,</TitleLine>
        <TitleLine delay={1.08}>
          <em>AI Builder</em>
        </TitleLine>
      </h1>

      <motion.p {...rise(1.3)} className="mt-8 max-w-xl text-lg leading-relaxed text-bone-dim md:text-xl">
        Building AI-powered products that balance user impact, business outcomes, and flawless
        execution. Right now, that means AI systems for anti-money laundering and fraud detection
        in cross-border payments.
      </motion.p>

      <motion.div {...rise(1.45)} className="mt-10 flex flex-wrap items-center gap-4">
        <a href="#projects" className="btn-amber">
          See the work
        </a>
        <a href="#contact" className="btn-ghost">
          Raise a ticket
        </a>
      </motion.div>

      <motion.div
        {...rise(1.7)}
        className="mt-16 flex items-center justify-between font-mono text-[11px] uppercase tracking-eyebrow text-mist lg:mt-24"
      >
        <span>Formerly Microsoft · IIT Guwahati</span>
        <a href="#about" className="hidden items-center gap-2 hover:text-bone sm:flex">
          Scroll <ArrowDown size={12} />
        </a>
      </motion.div>
    </div>
  </section>
);
