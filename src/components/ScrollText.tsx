import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

interface ScrollTextProps {
  /** Plain text. Wrap a run in *asterisks* to color it with the chapter accent. */
  text: string;
  className?: string;
}

interface WordProps {
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
  children: string;
}

const Word = ({ progress, range, accent, children }: WordProps) => {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="mr-[0.26em] inline-block">
      <motion.span style={{ opacity, color: accent ? "var(--accent)" : undefined }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
};

/** Splits text into words, remembering which ones sit inside *accent* runs. */
const tokenize = (text: string) => {
  const out: { word: string; accent: boolean }[] = [];
  let accent = false;
  for (const raw of text.split(/\s+/)) {
    if (!raw) continue;
    let word = raw;
    if (word.startsWith("*")) {
      accent = true;
      word = word.slice(1);
    }
    let closes = false;
    if (word.endsWith("*") || /\*[.,;:!?]$/.test(word)) {
      closes = true;
      word = word.replace("*", "");
    }
    out.push({ word, accent });
    if (closes) accent = false;
  }
  return out;
};

/**
 * A paragraph whose words brighten one by one as it scrolls through the
 * middle of the viewport, and dim again if the reader scrolls back. Scroll
 * position drives it directly, so it never runs ahead of the reader.
 */
export const ScrollText = ({ text, className = "" }: ScrollTextProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const tokens = tokenize(text);

  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / tokens.length, (i + 1) / tokens.length]} accent={t.accent}>
          {t.word}
        </Word>
      ))}
    </p>
  );
};
