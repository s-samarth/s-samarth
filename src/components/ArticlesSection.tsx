import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { PageHead } from "./notebook/PageHead";
import { Scribble } from "./notebook/Scribble";
import { articles } from "@/data/articles";

/** Resting tilt per card, so the row looks placed by hand. Hover straightens it. */
const tilts = ["-rotate-[1.4deg]", "rotate-[0.9deg]", "-rotate-[0.5deg]"];

const ArticleCard = ({ article, index }: { article: (typeof articles)[number]; index: number }) => (
  <a
    href={article.url}
    target="_blank"
    rel="noopener noreferrer"
    className={`card group flex h-full flex-col px-6 pb-6 pt-5 transition-transform duration-300 ease-cinematic hover:-translate-y-1.5 hover:rotate-0 ${tilts[index]}`}
  >
    <div className="flex items-start justify-between gap-4">
      <p className="label pt-1">No. {index + 1} · Substack</p>
      <div className="print -mr-2 -mt-9 w-[42%] shrink-0 rotate-[4deg] !p-1.5 transition-transform duration-300 group-hover:rotate-[1deg]">
        <span className="tape -top-3 left-1/2 !h-5 !w-14 -translate-x-1/2 -rotate-6" />
        <img src={article.image} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover" />
      </div>
    </div>
    <h3 className="headline mt-4 text-[1.75rem] leading-[1.1] group-hover:text-biro">{article.title}</h3>
    <p className="mt-3 flex-1 text-[16.5px] leading-relaxed text-graphite-dim">{article.description}</p>
    <span className="btn-pen mt-6 self-start">
      Read it <ArrowUpRight size={14} />
    </span>
  </a>
);

export const ArticlesSection = () => (
  <section id="writes">
    <div className="page-x py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="relative">
          <PageHead
            page="04"
            name="Writes · Substack"
            title="Things I wrote down."
            lede="Product thinking, AI strategy, and metric design."
          />
          <span className="absolute -top-2 right-0 hidden items-center lg:-right-44 lg:flex">
            <Scribble shape="arrow-left" className="h-8 w-20 shrink-0 text-biro" delay={0.4} />
            <span className="hand ml-1 -rotate-6">the fun part</span>
          </span>
        </div>
        <Reveal delay={0.2}>
          <a href="https://samarthsaraswat.substack.com/" target="_blank" rel="noopener noreferrer" className="btn-pen">
            Everything on Substack <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>

      <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal key={article.title} delay={0.1 * i} className="h-full">
            <ArticleCard article={article} index={i} />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
