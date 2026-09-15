import { Chapter } from "./Chapter";
import { Reveal } from "./Reveal";
import { ScrollText } from "./ScrollText";

const manifesto =
  "I'm Samarth, A *Product Builder* at Heart, *Engineer* at Core and *Sales* because I am usually broke. Bring me the messy problem. I'll build the *AI agent*, the *RAG*, the *model*, or talk you out of all three. IIT Guwahati made me. Stand-up Comedy keeps me honest.";

const facts = [
  { key: "Now", value: "AI Engineer, Tazapay" },
  { key: "Before", value: "Data & Applied Scientist, Microsoft · 3+ years" },
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

export const WhoSection = () => (
  <Chapter id="who" className="py-28 md:py-40">
    <div className="container-x">
      <Reveal>
        <p className="eyebrow">Who</p>
      </Reveal>
      <ScrollText
        text={manifesto}
        className="display mt-6 max-w-5xl text-[1.9rem] font-medium leading-[1.25] sm:text-4xl md:text-[3.1rem] md:leading-[1.2]"
      />

      <div className="mt-24 grid gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
        <Reveal>
          <dl className="panel divide-y divide-line px-6 md:px-8">
            {facts.map((fact) => (
              <div key={fact.key} className="grid grid-cols-[6.5rem_1fr] gap-4 py-4 md:grid-cols-[7.5rem_1fr]">
                <dt className="pt-0.5 text-[13px] font-medium uppercase tracking-[0.12em] text-mist">{fact.key}</dt>
                <dd className="text-[16px] leading-relaxed text-bone md:text-[17px]">
                  {fact.href ? (
                    <a href={fact.href} target="_blank" rel="noopener noreferrer" className="link-draw">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="panel h-full px-6 py-6 md:px-8">
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-mist">Buzzwords I can back up</p>
            <div className="mt-5 space-y-5">
              {skillGroups.map((group) => (
                <div key={group.title}>
                  <p className="mb-2 text-[15px] font-semibold text-bone">{group.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-[14px] text-bone-dim">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </Chapter>
);
