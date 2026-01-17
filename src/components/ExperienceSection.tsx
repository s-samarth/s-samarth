import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, TrendingUp, Users, Shield, Clock } from "lucide-react";

const experiences = [
  {
    title: "Data & Applied Scientist",
    company: "Microsoft",
    period: "June 2022 – Sept 2025",
    icon: Building2,
    highlights: [
      {
        icon: Clock,
        text: "Reduced enterprise deal cycle time from 15 days to 2 days via LLM-powered Seller Copilot",
      },
      {
        icon: Users,
        text: "Drove adoption across thousands of sellers with strong feedback and evaluation loops",
      },
      {
        icon: TrendingUp,
        text: "Improved CSAT through multi-metric quality and reliability frameworks",
      },
      {
        icon: Shield,
        text: "Built an explainable anomaly detection system preventing large-scale revenue leakage",
      },
    ],
    description:
      "Built and scaled AI copilots for enterprise customers and third-party sellers. Focus on translating business problems into scalable AI-first product solutions.",
  },
];

export const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding bg-card/30">
      <div className="container-narrow" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">Experience</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Where I've Made
            <span className="text-gradient"> Impact</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary to-primary/50" />

          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.2 }}
              className="relative pl-8 md:pl-0 md:grid md:grid-cols-2 gap-8 mb-12"
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 top-0 w-3 h-3 -ml-1.5 md:-ml-1.5 rounded-full bg-primary shadow-lg shadow-primary/50" />

              {/* Content */}
              <div className={`md:pr-12 ${index % 2 === 1 ? "md:col-start-2" : ""}`}>
                <div className="glass-card-hover rounded-2xl p-8">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center shrink-0">
                      <exp.icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                      <p className="text-muted-foreground text-sm mt-1">{exp.period}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6">{exp.description}</p>

                  {/* Highlights */}
                  <div className="space-y-3">
                    {exp.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                          <highlight.icon className="w-4 h-4 text-primary" />
                        </div>
                        <p className="text-foreground text-sm">{highlight.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
