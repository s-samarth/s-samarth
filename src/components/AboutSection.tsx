import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const facts = [
  { key: "Now", value: "AI Engineer, Tazapay" },
  { key: "Before", value: "Data & Applied Scientist, Microsoft, 3+ years" },
  { key: "School", value: "B.Tech, Electronics & Communication, IIT Guwahati, 2022" },
  { key: "Based in", value: "Bangalore, India" },
  { key: "Writes at", value: "samarthsaraswat.substack.com", href: "https://samarthsaraswat.substack.com" },
  { key: "Off hours", value: "Stand-up comedy. The mic is not a prop." },
];

const Em = ({ children }: { children: React.ReactNode }) => (
  <span className="font-medium text-bone">{children}</span>
);

export const AboutSection = () => (
  <section id="about" className="section-y">
    <div className="container-x">
      <SectionHeading
        eyebrow="README.md"
        title={
          <>
            Building the future of <em>AI products</em>
          </>
        }
      />

      <div className="mt-16 grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
        <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed text-mist">
          <p>
            I'm an <Em>AI Builder</Em>. Today I'm an AI Engineer at <Em>Tazapay</Em>, building AI
            systems that help with anti-money laundering and fraud detection in cross-border
            payments, where a wrong call costs real money on both sides of the border.
          </p>
          <p>
            Before that I spent 3+ years at <Em>Microsoft</Em> as a Data &amp; Applied Scientist,
            where I built and scaled LLM-powered copilots and AI agents that drive real business
            outcomes.
          </p>
          <p>
            With a strong problem-solving mindset honed at <Em>IIT Guwahati</Em>, I specialize in
            translating complex business problems into scalable AI-first product solutions. My
            approach combines <Em>futuristic vision</Em> with <Em>high-precision execution</Em>.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <dl className="border-t border-line">
            {facts.map((fact) => (
              <div key={fact.key} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
                <dt className="eyebrow pt-1">{fact.key}</dt>
                <dd className="text-bone-dim">
                  {fact.href ? (
                    <a href={fact.href} target="_blank" rel="noopener noreferrer" className="link-draw text-bone">
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
      </div>
    </div>
  </section>
);
