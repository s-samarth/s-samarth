import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const skillColumns = [
  {
    title: "AI systems",
    skills: [
      "LLM copilots & agents",
      "RAG & hybrid retrieval",
      "On-device inference",
      "Prompt engineering for small models",
      "Evals & golden sets",
      "Fraud & AML detection",
    ],
  },
  {
    title: "Machine learning",
    skills: [
      "Natural language processing",
      "Speech recognition",
      "Anomaly detection",
      "Model evaluation",
      "Deep learning",
      "Statistical analysis",
    ],
  },
  {
    title: "Product",
    skills: [
      "AI product management",
      "Experimentation",
      "OKRs & North Star metrics",
      "Metric design",
      "Data science pipelines",
    ],
  },
  {
    title: "Tools",
    skills: [
      "Python, PyTorch",
      "LangGraph, OpenAI APIs",
      "whisper.cpp, ONNX Runtime",
      "Flutter, Swift",
      "SQL",
      "Figma, Jira",
    ],
  },
];

export const SkillsSection = () => (
  <section id="skills" className="section-y border-t border-line">
    <div className="container-x">
      <SectionHeading
        eyebrow="Buzzwords I can back up"
        title={
          <>
            Ask me about <em>any of these</em>
          </>
        }
      />

      <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {skillColumns.map((column, i) => (
          <Reveal key={column.title} delay={0.08 * i}>
            <p className="eyebrow border-b border-line pb-3">{column.title}</p>
            <ul className="mt-1">
              {column.skills.map((skill) => (
                <li key={skill} className="border-b border-line py-3 text-bone-dim">
                  {skill}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);
