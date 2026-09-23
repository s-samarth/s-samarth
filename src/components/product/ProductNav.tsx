import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useLocation } from "react-router-dom";

/** What a product page's header needs to know. Each product keeps one in its data file. */
export interface ProductNavConfig {
  name: string;
  productPath: string;
  installPath: string;
  /** In-page anchors on the product page, left to right. */
  sections: { id: string; label: string }[];
  download: { href: string; label: string };
}

/**
 * A product's own header: its name, a quiet "by Samarth Saraswat" back to
 * the home notebook, the product's sections, and the download. Same paper
 * and type as the site's nav, so it reads as a page of the same notebook.
 *
 * Frontend note: the product pages share this one component and differ only
 * in the config object they pass. That keeps two headers from drifting apart.
 */
export const ProductNav = ({ config }: { config: ProductNavConfig }) => {
  const { name, productPath, installPath, sections, download } = config;
  const [isScrolled, setIsScrolled] = useState(false);
  // On the install page, section links point back to the product page.
  const base = useLocation().pathname === productPath ? "" : productPath;

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
            {name}
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
            href={installPath}
            className="hidden font-mono text-[12px] font-medium uppercase tracking-[0.12em] text-graphite-soft transition-colors hover:text-graphite md:inline"
          >
            Install
          </a>
          <a href={download.href} className="btn-stamp !gap-1.5 !px-3.5 !py-1.5 !text-[11px]">
            <Download size={13} /> {download.label}
          </a>
        </div>
      </nav>
    </header>
  );
};
