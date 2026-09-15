import { motion } from "framer-motion";
import { useChapter } from "@/chapters/ChapterContext";
import { navChapters } from "@/chapters/chapters";

/**
 * Right-edge story rail. Shows where the reader is in the chapters and lets
 * them jump. Desktop only; the phone menu covers navigation there.
 */
export const ChapterRail = () => {
  const { current } = useChapter();
  const visible = current !== "hero";

  return (
    <motion.nav
      aria-label="Chapters"
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 12 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 lg:flex"
    >
      {navChapters.map((chapter) => {
        const active = chapter.id === current;
        return (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            className="group flex items-center justify-end gap-3"
            aria-current={active ? "location" : undefined}
          >
            <span
              className={`hidden text-[12px] font-medium uppercase tracking-[0.14em] transition-all duration-500 2xl:inline ${
                active ? "translate-x-0 text-bone opacity-100" : "translate-x-1 text-mist opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {chapter.label}
            </span>
            <span
              className="h-1.5 w-1.5 rounded-full transition-all duration-500"
              style={{
                backgroundColor: active ? "var(--accent)" : "rgba(245,245,247,0.3)",
                transform: active ? "scale(1.6)" : "scale(1)",
              }}
            />
          </a>
        );
      })}
    </motion.nav>
  );
};
