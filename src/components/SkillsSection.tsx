import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Code, Wrench } from "lucide-react";

const skillCategories = [
  {
    title: "AI & Product",
    icon: Brain,
    skills: ["AI Product Management", "LLMs & Generative AI", "AI Agents & Copilots", "RAG Systems", "Experimentation", "OKRs & Metrics"],
  },
  {
    title: "Machine Learning",
    icon: Code,
    skills: ["Natural Language Processing", "Anomaly Detection", "Model Evaluation", "Data Science Pipelines", "Deep Learning", "Statistical Analysis"],
  },
  {
    title: "Tools & Tech",
    icon: Wrench,
    skills: ["Python", "PyTorch", "LangGraph", "OpenAI APIs", "SQL", "Figma", "Jira", "Google Analytics"],
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative">
      <div className="absolute inset-0 dot-grid opacity-15" />
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />

      <div className="container-narrow relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4 font-semibold">Expertise</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Buzzwords I Can
            <span className="text-gradient"> Back Up</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
              className="glass-card-hover rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium rounded-lg bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
