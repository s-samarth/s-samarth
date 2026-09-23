import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { pages } from "@/content/pages";
import { useActivePage } from "@/hooks/use-active-page";

const pageIds = pages.map((p) => p.id);

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const active = useActivePage(pageIds);

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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled && !isMobileOpen ? "border-b border-graphite/15 bg-paper/90 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between px-5 md:pl-24 md:pr-10">
        <a href="#top" className="font-serif text-[20px] font-medium tracking-tight text-graphite" onClick={close}>
          Samarth Saraswat
        </a>

        <div className="hidden items-center gap-6 lg:flex">
          {pages.map((page) => (
            <a
              key={page.id}
              href={`#${page.id}`}
              className={`font-mono text-[12px] font-medium uppercase tracking-[0.12em] transition-colors hover:text-graphite ${
                active === page.id ? "text-graphite underline decoration-marker decoration-[3px] underline-offset-[6px]" : "text-graphite-soft"
              }`}
            >
              {page.label}
            </a>
          ))}
          <a href="#ticket" className="btn-stamp !px-3.5 !py-1.5 !text-[11px]">
            Raise a ticket
          </a>
        </div>

        <button
          onClick={() => setIsMobileOpen((v) => !v)}
          className="relative z-[60] p-2 text-graphite lg:hidden"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col justify-end bg-paper px-6 pb-12 pt-24 lg:hidden"
          >
            <div className="flex flex-col">
              {pages.map((page, i) => (
                <motion.a
                  key={page.id}
                  href={`#${page.id}`}
                  onClick={close}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.4 }}
                  className="flex items-baseline gap-4 border-b border-graphite/15 py-4"
                >
                  <span className="label !text-redpen">p.{page.page}</span>
                  <span className="headline text-4xl">{page.label}</span>
                </motion.a>
              ))}
            </div>
            <a href="#ticket" onClick={close} className="btn-stamp mt-8 self-start">
              Raise a ticket
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
