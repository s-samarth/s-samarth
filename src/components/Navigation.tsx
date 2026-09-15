import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navChapters } from "@/chapters/chapters";
import { useChapter } from "@/chapters/ChapterContext";

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { current } = useChapter();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  const close = () => setIsMobileOpen(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        isScrolled && !isMobileOpen ? "border-b border-line bg-ink/70 backdrop-blur-xl" : ""
      }`}
    >
      <div className="container-x">
        <nav className="flex h-16 items-center justify-between">
          <a href="#" className="font-display text-[17px] font-semibold tracking-tight text-bone" onClick={close}>
            Samarth Saraswat
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navChapters.map((chapter) => (
              <a
                key={chapter.id}
                href={`#${chapter.id}`}
                className={`text-[14px] font-medium transition-colors hover:text-bone ${
                  current === chapter.id ? "text-bone" : "text-mist"
                }`}
              >
                {chapter.label}
              </a>
            ))}
            <a href="#talk" className="btn-accent !px-4 !py-2 !text-[13px]">
              Raise a ticket
            </a>
          </div>

          <button
            onClick={() => setIsMobileOpen((v) => !v)}
            className="relative z-[60] p-2 text-bone lg:hidden"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink px-6 pb-12 pt-24 lg:hidden"
          >
            <div className="flex flex-col">
              {navChapters.map((chapter, i) => (
                <motion.a
                  key={chapter.id}
                  href={`#${chapter.id}`}
                  onClick={close}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="display border-b border-line py-4 text-4xl"
                >
                  {chapter.label}
                </motion.a>
              ))}
            </div>
            <a href="#talk" onClick={close} className="btn-accent mt-8 self-start">
              Raise a ticket
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
