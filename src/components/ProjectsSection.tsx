import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Play, Subtitles, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "./ui/button";

const projects = [
  {
    title: "Netflix — AI-Powered Regional Subtitle Expansion",
    tags: ["AI Product", "NLP", "Experimentation"],
    icon: Subtitles,
    problem: "Limited regional subtitles restricting content consumption in emerging markets",
    insight: "Direct impact on watch hours and completion rates for non-English content",
    solution: "AI-powered subtitle pipeline combining ASR + LLM + human-in-loop quality checks",
    metrics: ["Metrics-driven experimentation strategy", "Scalable to 50+ languages"],
    gradient: "from-red-500/20 to-orange-500/20",
  },
  {
    title: "BookMyShow — Ratings & Reviews for Live Events",
    tags: ["Product Strategy", "Recommendations", "Trust"],
    icon: Star,
    problem: "Trust gap in live event bookings leading to hesitation",
    insight: "Post-attendance reviews could directly increase monthly bookings and discovery",
    solution: "Designed ratings & reviews system with AI-driven ranking and recommendations",
    metrics: ["Linked to booking conversion", "Enhanced event discovery"],
    gradient: "from-blue-500/20 to-purple-500/20",
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-20" />
      
      <div className="container-narrow relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">Case Studies</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured
            <span className="text-gradient"> Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Deep dives into product thinking, from problem discovery to impact measurement
          </p>
        </motion.div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              className="glass-card-hover rounded-2xl overflow-hidden group"
            >
              {/* Gradient Header */}
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              
              <div className="p-8">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <project.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground">{project.title}</h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Problem & Insight */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-primary text-sm font-medium mb-1">Problem</p>
                      <p className="text-muted-foreground">{project.problem}</p>
                    </div>
                    <div>
                      <p className="text-primary text-sm font-medium mb-1">Key Insight</p>
                      <p className="text-muted-foreground">{project.insight}</p>
                    </div>
                  </div>

                  {/* Solution & Metrics */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-primary text-sm font-medium mb-1">Solution</p>
                      <p className="text-muted-foreground">{project.solution}</p>
                    </div>
                    <div>
                      <p className="text-primary text-sm font-medium mb-1">Impact</p>
                      <ul className="space-y-1">
                        {project.metrics.map((metric, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                            {metric}
                          </li>
                        ))}
                      </ul>
                    </div>
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
