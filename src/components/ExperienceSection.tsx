import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

interface Role {
  when: string;
  company: string;
  place: string;
  title: string;
  description: string;
  tags: string[];
  highlights: string[];
}

const roles: Role[] = [
  {
    when: "Now",
    company: "Tazapay",
    place: "Bangalore",
    title: "AI Engineer",
    description:
      "Building AI systems that help with anti-money laundering and fraud detection in cross-border payments.",
    tags: ["Fintech", "Cross-border payments", "AML", "Fraud detection"],
    highlights: [],
  },
  {
    when: "Before",
    company: "Microsoft",
    place: "3+ years",
    title: "Data & Applied Scientist",
    description:
      "Built and scaled AI copilots for enterprise customers and third-party sellers. Focus on translating business problems into scalable AI-first product solutions.",
    tags: ["LLM copilots", "AI agents", "Anomaly detection"],
    highlights: [
      "Reduced enterprise deal cycle time from 15 days to 2 days via an LLM-powered Seller Copilot",
      "Drove adoption across thousands of sellers with strong feedback and evaluation loops",
      "Improved CSAT through multi-metric quality and reliability frameworks",
      "Built an explainable anomaly detection system preventing large-scale revenue leakage",
    ],
  },
];

export const ExperienceSection = () => (
  <section id="experience" className="section-y border-t border-line">
    <div className="container-x">
      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            Where I've made <em>impact</em>
          </>
        }
      />

      <div className="mt-16 border-t border-line">
        {roles.map((role, i) => (
          <Reveal key={role.company} delay={0.05 * i}>
            <article className="grid gap-6 border-b border-line py-12 md:grid-cols-[10rem_1fr] md:gap-12">
              <div className="font-mono text-[11px] uppercase tracking-eyebrow">
                <p className="text-amber">{role.when}</p>
                <p className="mt-2 text-bone">{role.company}</p>
                <p className="mt-1 text-mist">{role.place}</p>
              </div>

              <div>
                <h3 className="display text-3xl md:text-4xl">{role.title}</h3>
                <p className="mt-4 max-w-2xl text-lg leading-relaxed text-mist">{role.description}</p>

                {role.highlights.length > 0 && (
                  <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-bone-dim">
                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-amber" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] uppercase tracking-eyebrow text-mist">
                  {role.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
