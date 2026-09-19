import { Fragment } from "react";
import { Reveal } from "./Reveal";
import { Highlight } from "./notebook/Highlight";
import { PageHead } from "./notebook/PageHead";

/** Wrap a run in *asterisks* to put the highlighter over it. */
const manifesto =
  "I'm Samarth. I’ve got the Heart of a *Product Builder*, Brain of an *Engineer* and Greed of a *Salesperson* because passion doesn't pay the rent. Bring me the messy problem. I'll build the *AI agent*, the *RAG*, the *model*, or talk you out of all three. IIT Guwahati taught me to take problems seriously. Stand-up Comedy taught me not to take myself seriously.";

const facts = [
  { key: "Now", value: "AI Engineer, Tazapay" },
  { key: "Before", value: "Data Scientist, Microsoft · 3+ years" },
  { key: "School", value: "B.Tech, Electronics & Communication, IIT Guwahati, 2022" },
  { key: "Also", value: "YC Startup School, Bangalore · the first edition there, April 2026" },
  { key: "Based in", value: "Bangalore, India" },
  { key: "Writes at", value: "samarthsaraswat.substack.com", href: "https://samarthsaraswat.substack.com" },
  { key: "Off hours", value: "Stand-up comedy. The mic is not a prop." },
];

const skillGroups = [
  { title: "AI systems", skills: ["LLM copilots & agents", "RAG & hybrid retrieval", "On-device inference", "Evals & golden sets", "Fraud & AML detection"] },
  { title: "Machine learning", skills: ["NLP", "Speech recognition", "Anomaly detection", "Model evaluation", "Deep learning"] },
  { title: "Product", skills: ["AI product management", "Experimentation", "OKRs & North Star metrics", "Metric design"] },
  { title: "Tools", skills: ["Python", "PyTorch", "LangGraph", "Claude Code", "Codex", "SQL"] },
];

/** Splits the manifesto into plain and highlighted runs; odd indexes sat inside asterisks. */
const Manifesto = () => {
  const runs = manifesto.split("*");
  let marked = 0;
  return (
    <p className="headline mt-6 max-w-5xl text-[1.85rem] !font-normal leading-[1.32] sm:text-[2.3rem] md:text-[2.75rem] md:leading-[1.28]">
      {runs.map((run, i) =>
        i % 2 === 1 ? <Highlight key={i} delay={0.15 * marked++}>{run}</Highlight> : <Fragment key={i}>{run}</Fragment>,
      )}
    </p>
  );
};

const FactsCard = () => (
  <dl className="card -rotate-[0.6deg] px-6 pb-4 pt-5 md:px-8">
    <span className="tape -top-3 left-8 -rotate-3" />
    <p className="label border-b-2 border-redpen/50 pb-3">Index card · the facts</p>
    {facts.map((fact) => (
      <div key={fact.key} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-rule py-3 last:border-0 md:grid-cols-[7rem_1fr]">
        <dt className="label pt-1 !text-[11px]">{fact.key}</dt>
        <dd className="text-[17px] leading-snug text-graphite">
          {fact.href ? (
            <a href={fact.href} target="_blank" rel="noopener noreferrer" className="link-ink">
              {fact.value}
            </a>
          ) : (
            fact.value
          )}
        </dd>
      </div>
    ))}
  </dl>
);

const SkillsCard = () => (
  <div className="card h-full rotate-[0.5deg] px-6 pb-6 pt-5 md:px-8">
    <p className="label border-b-2 border-redpen/50 pb-3">Buzzwords I can back up</p>
    <div className="mt-5 space-y-5">
      {skillGroups.map((group) => (
        <div key={group.title}>
          <p className="hand mb-2 text-[24px]">{group.title}</p>
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span key={skill} className="rounded-[3px] border border-dashed border-graphite-soft/70 px-2.5 py-1 font-mono text-[12.5px] text-graphite-dim">
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const WhoSection = () => (
  <section id="who">
    <div className="page-x py-24 md:py-32">
      <PageHead page="02" name="Who · the intro, unfiltered" />
      <Manifesto />
      <div className="mt-20 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
        <Reveal>
          <FactsCard />
        </Reveal>
        <Reveal delay={0.1}>
          <SkillsCard />
        </Reveal>
      </div>
    </div>
  </section>
);
