import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import articleDashboard from "@/assets/article-dashboard.jpg";
import articleMetrics from "@/assets/article-metrics.jpg";
import articleInstagram from "@/assets/article-instagram.jpg";

const articles = [
  {
    title: "Your Dashboard Is Lying to You",
    description:
      "There is nothing worse than thinking your product is a hit while every customer out there just hates it, but you don't know it. A guide on how to decide product metrics, so that you have an accurate read.",
    url: "https://open.substack.com/pub/samarthsaraswat/p/your-dashboard-is-lying-to-you-the?r=7ntb71&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
    image: articleDashboard,
  },
  {
    title: "Your Product Has 47 Metrics and Zero Direction",
    description:
      "The metric overload problem and how to focus on what actually matters. An explainer on North Star Metrics.",
    url: "https://open.substack.com/pub/samarthsaraswat/p/your-product-has-47-metrics-and-zero?r=7ntb71&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
    image: articleMetrics,
  },
  {
    title: "Instagram Knows You Better Than Your Parents",
    description:
      "The product metrics Instagram is tracking for its users, and why those metrics are the best indicators of active engagement.",
    url: "https://open.substack.com/pub/samarthsaraswat/p/instagram-knows-you-better-than-your?r=7ntb71&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
    image: articleInstagram,
  },
];

export const ArticlesSection = () => (
  <section id="articles" className="section-y border-t border-line">
    <div className="container-x">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Articles written by me"
          title={
            <>
              Featured <em>articles</em>
            </>
          }
          lede="Product thinking, AI strategy, and metric design on Substack."
        />
        <Reveal delay={0.2}>
          <a
            href="https://samarthsaraswat.substack.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-draw inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-eyebrow text-bone-dim hover:text-bone"
          >
            All articles on Substack <ArrowUpRight size={13} />
          </a>
        </Reveal>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {articles.map((article, i) => (
          <Reveal key={article.title} delay={0.1 * i}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="overflow-hidden rounded-md border border-line bg-ink-2">
                <img
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover brightness-[0.85] transition-all duration-700 ease-cinematic group-hover:scale-[1.03] group-hover:brightness-100"
                />
              </div>
              <h3 className="mt-5 text-xl font-semibold leading-snug text-bone transition-colors group-hover:text-amber">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{article.description}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-eyebrow text-bone-dim">
                Read on Substack <ArrowUpRight size={13} />
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
