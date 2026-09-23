import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { PageHead } from "./notebook/PageHead";
import { articles } from "@/data/articles";

/** Resting tilts per article: the cover print, its tape, and the card over it. Hover straightens the print. */
const tilts = [
  { print: "-rotate-3", tape: "-rotate-[5deg]", card: "rotate-[0.6deg]" },
  { print: "rotate-[2.5deg]", tape: "rotate-[4deg]", card: "-rotate-[0.5deg]" },
  { print: "-rotate-[1.5deg]", tape: "-rotate-3", card: "rotate-[0.4deg]" },
];

/**
 * The covers are the fun part, so they're big: a taped print with the index
 * card slid over its bottom edge. `flex-1` on the card makes every card in a
 * row stretch to the same height.
 */
const ArticleCard = ({ article, index }: { article: (typeof articles)[number]; index: number }) => (
  <a href={article.url} target="_blank" rel="noopener noreferrer" className="group flex h-full flex-col">
    <div
      className={`print ml-[11%] w-[78%] !p-[7px] !pb-[9px] transition-transform duration-300 ease-cinematic group-hover:-translate-y-2 group-hover:rotate-0 ${tilts[index].print}`}
    >
      <span className={`tape -top-3 left-1/2 !h-5 !w-16 -translate-x-1/2 ${tilts[index].tape}`} />
      <img src={article.image} alt={article.imageAlt} loading="lazy" className="block aspect-[4/5] w-full object-cover" />
    </div>
    <div className={`card relative z-[2] -mt-14 flex flex-1 flex-col items-start px-6 pb-[22px] pt-5 ${tilts[index].card}`}>
      <p className="label">No. {index + 1} · Substack</p>
      <h3 className="headline mt-2.5 text-[1.7rem] leading-[1.1] transition-colors group-hover:text-biro">{article.title}</h3>
      <p className="mt-2.5 flex-1 text-[16.5px] leading-relaxed text-graphite-dim">{article.description}</p>
      <span className="btn-pen mt-[18px]">
        Read it <ArrowUpRight size={14} />
      </span>
    </div>
  </a>
);

export const ArticlesSection = () => (
  <section id="writes">
    <div className="page-x py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <PageHead page="04" name="Writes · Substack" title="Things I wrote down." lede="Product thinking, AI strategy, and metric design." />
        <Reveal delay={0.2}>
          <a href="https://samarthsaraswat.substack.com/" target="_blank" rel="noopener noreferrer" className="btn-pen">
            Everything on Substack <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>

      <div className="mt-[72px] grid gap-16 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal key={article.title} delay={0.1 * i} className="h-full">
            <ArticleCard article={article} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
