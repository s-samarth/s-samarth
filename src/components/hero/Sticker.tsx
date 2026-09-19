import { motion } from "framer-motion";
import cutout from "@/assets/samarth-cutout.webp";

/**
 * The photo as a die-cut sticker: the background was removed with macOS
 * subject lifting, and the white border comes from stacked drop-shadows,
 * which follow the image's transparent edge instead of its box.
 */
const stickerOutline =
  "drop-shadow(3px 0 0 #fffdf7) drop-shadow(-3px 0 0 #fffdf7) drop-shadow(0 3px 0 #fffdf7) drop-shadow(0 -3px 0 #fffdf7) drop-shadow(0 14px 18px rgba(29,36,48,0.28))";

export const Sticker = () => (
  <motion.figure
    initial={{ opacity: 0, rotate: 9, scale: 1.08, y: -20 }}
    animate={{ opacity: 1, rotate: 3, scale: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    className="relative mx-auto w-[78%] max-w-[400px] lg:w-full"
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
    <figcaption className="hand mt-3 -rotate-2 text-center text-[21px]">fig. 1: the only good photo I have</figcaption>
  </motion.figure>
);
