import { Reveal } from "./Reveal";
import { PageHead } from "./notebook/PageHead";

const jobs = [
  {
    when: "Now",
    role: "AI Engineer",
    where: "Tazapay",
    what: "AI systems for fraud detection and anti-money laundering in cross-border payments.",
    note: "bg-[#FCE58A] -rotate-[1.2deg]",
  },
  {
    when: "Before · 3+ years",
    role: "Data Scientist",
    where: "Microsoft",
    what: "Seller Copilot took deal cycles from 15 days to 2. An anomaly detection product stopped $100M+ a year in revenue leakage.",
    note: "bg-paper-card rotate-[0.8deg]",
  },
];

/** The day job, kept to two sticky notes on purpose. The projects are the point. */
export const DayJobSection = () => (
  <section id="day-job">
    <div className="page-x py-24 md:py-28">
      <PageHead page="05" name="Day job" title="The day job, briefly." />
      <div className="mt-14 grid max-w-4xl gap-10 md:grid-cols-2 md:gap-8">
        {jobs.map((job, i) => (
          <Reveal key={job.where} delay={0.1 * i}>
            <article className={`relative px-6 pb-7 pt-6 shadow-[0_1px_2px_rgba(29,36,48,0.1),0_16px_28px_-18px_rgba(29,36,48,0.45)] ${job.note}`}>
              <span className="tape -top-3 left-6 -rotate-3" />
              <p className="label">{job.when}</p>
              <h3 className="headline mt-3 text-[2rem] leading-tight">
                {job.role}, <em>{job.where}</em>
              </h3>
              <p className="mt-3 text-[17px] leading-relaxed text-graphite-dim">{job.what}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
