import { motion } from "framer-motion";
import { Button } from "./ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";
import { User, Briefcase, FolderOpen, Code2, PenLine, Brain, ArrowRight } from "lucide-react";

const snapshotCards = [
  {
    title: "ABOUT ME",
    subtitle: "Quick Background",
    icon: User,
    href: "#about",
    linkText: "Go to About",
    points: [
      "3+ years at Microsoft as Data & Applied Scientist",
      "Expert in LLM copilots & AI agents",
      "IIT Guwahati (ECE, 2022) Graduate",
    ],
  },
  {
    title: "EXPERIENCE",
    subtitle: "Key MSFT Impact (2022–2025)",
    icon: Briefcase,
    href: "#experience",
    linkText: "Go to Experience",
    points: [
      "Reduced deal cycle from 15 to 2 days",
      "Drove adoption across thousands of sellers",
      "Scalable anomaly detection preventing revenue leakage",
    ],
  },
  {
    title: "CASE STUDIES",
    subtitle: "Featured Projects",
    icon: FolderOpen,
    href: "#projects",
    linkText: "Go to Case Studies",
    points: [
      "Netflix AI Regional Subtitles -> scalable to 50+ languages",
      "BookMyShow Ratings & Reviews -> linked to conversion impact",
      "Focus: Metrics-driven experimentation",
    ],
  },
  {
    title: "PROTOTYPES",
    subtitle: "Vibe Coding & Full-Stack",
    icon: Code2,
    href: "#built",
    linkText: "Go to Prototypes",
    points: [
      "Comedy Connect Platform (React / Full-Stack)",
      "Built for comedy show discovery and booking",
    ],
  },
  {
    title: "ARTICLES WRITTEN BY ME",
    subtitle: "Metrics & Product Strategy (Substack)",
    icon: PenLine,
    href: "#articles",
    linkText: "Go to Articles",
    points: [
      '"Your Dashboard Is Lying to You" -> Metric design',
      '"Your Product Has 47 Metrics" -> Metric overload',
      '"Instagram Knows You Better" -> User behavior',
    ],
  },
  {
    title: "EXPERTISE",
    subtitle: "Core Competencies",
    icon: Brain,
    href: "#skills",
    linkText: "Go to Expertise",
    points: [
      "AI & Product: RAG Systems, OKRs & Metrics, Experimentation",
      "Tech Stack: Python, PyTorch, LangGraph, Figma",
    ],
  },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background geometric accents */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 rounded-full border-2 border-primary/10" />
      <div className="absolute bottom-1/4 left-1/6 w-24 h-24 rounded-full bg-accent/8" />
      
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-40" />

      <div className="container-narrow relative z-10 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex-shrink-0"
          >
            <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-72 lg:h-72">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl scale-110" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-card shadow-xl">
                <img
                  src={profilePhoto}
                  alt="Samarth Saraswat"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="text-center lg:text-left flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-sm md:text-base tracking-widest uppercase mb-4"
            >
              Welcome to
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4"
            >
              <span className="text-foreground">Samarth Saraswat,</span>
              <br />
              <span className="text-gradient">AI Product Manager</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mb-8"
            >
              Building AI-powered products that balance user impact, business outcomes, and flawless execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="default" size="xl" asChild>
                <a href="#projects">View Work</a>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <a href="#contact">Contact</a>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Profile Snapshot Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-24"
        >
          <p className="text-muted-foreground text-xs tracking-[0.2em] uppercase font-semibold mb-6">
            Profile Snapshots
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {snapshotCards.map((card, index) => (
              <motion.a
                key={card.title}
                href={card.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.08 }}
                className="group glass-card rounded-2xl p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-md hover:border-primary/30 hover:bg-card/80 cursor-pointer"
              >
                {/* Card Header */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <card.icon className="w-4.5 h-4.5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-bold text-sm tracking-wide">{card.title}</h3>
                    <p className="text-muted-foreground text-xs">{card.subtitle}</p>
                  </div>
                </div>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-1.5 flex-1">
                  {card.points.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-foreground text-xs leading-relaxed">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-primary shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="flex items-center gap-1.5 text-primary text-xs font-semibold mt-1 group-hover:gap-2.5 transition-all duration-300">
                  {card.linkText}
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
