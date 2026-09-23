import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useLocation } from "react-router-dom";
import { INSTALL_PATH, PRODUCT_PATH, release } from "@/data/desiDictation";

const sections = [
  { id: "features", label: "Features" },
  { id: "compare", label: "Compare" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

/**
 * The product's own header: its name, a quiet "by Samarth Saraswat" back to
 * the home notebook, the product's sections, and the download. Same paper
 * and type as the site's nav, so it reads as a page of the same notebook.
 */
export const ProductNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  // On the install page, section links point back to the product page.
  const base = useLocation().pathname === PRODUCT_PATH ? "" : PRODUCT_PATH;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled ? "border-b border-graphite/15 bg-paper/90 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-14 w-full max-w-[1180px] items-center justify-between gap-4 px-5 md:pl-24 md:pr-10">
        <div className="flex min-w-0 items-baseline gap-3">
          <a
            href={base || "#top"}
            className="whitespace-nowrap font-serif text-[20px] font-medium tracking-tight text-graphite"
          >
            Desi Dictation
          </a>
          <a href="/" className="label hidden !text-[10.5px] transition-colors hover:!text-redpen sm:inline">
            by Samarth Saraswat
          </a>
        </div>

        <div className="flex items-center gap-6">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`${base}#${s.id}`}
              className="hidden font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-graphite-soft transition-colors hover:text-graphite lg:inline"
            >
              {s.label}
            </a>
          ))}
          <a
            href={INSTALL_PATH}
            className="hidden font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-graphite-soft transition-colors hover:text-graphite md:inline"
          >
            Install
          </a>
          <a href={release.url} className="btn-stamp !gap-1.5 !px-3.5 !py-1.5 !text-[11px]">
            <Download size={13} /> Download
          </a>
        </div>
      </nav>
    </header>
  );
};
