import { useTransform, type MotionValue } from "framer-motion";

/**
 * Maps a pinned section's scroll progress (0 to 1) to one "beat": content
 * that fades and rises in at `start`, holds, and fades out past `end`.
 * Beats are how a pinned chapter tells its story in order.
 */
export const useBeat = (progress: MotionValue<number>, start: number, end: number, fade = 0.07) => {
  const opacity = useTransform(progress, [start - fade, start, end, end + fade], [0, 1, 1, 0]);
  const y = useTransform(progress, [start - fade, start, end, end + fade], [28, 0, 0, -28]);
  return { opacity, y };
};

/** Like useBeat, but the content stays once it has arrived. */
export const useArrive = (progress: MotionValue<number>, at: number, fade = 0.07) => {
  const opacity = useTransform(progress, [at - fade, at], [0.18, 1]);
  const y = useTransform(progress, [at - fade, at], [18, 0]);
  return { opacity, y };
};
