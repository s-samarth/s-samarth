import { Reveal } from "./Reveal";
import { PageHead } from "./notebook/PageHead";
import { facts, skillGroups } from "@/data/profile";

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
      <PageHead page="02" name="Who" title="The fine print." />
      <div className="mt-14 grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
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
