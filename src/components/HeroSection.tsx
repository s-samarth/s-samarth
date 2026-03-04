import { motion } from "framer-motion";
import { Button } from "./ui/button";
import profilePhoto from "@/assets/profile-photo.jpg";

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

        {/* Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: "AI Product Thinking", description: "Translating complex problems into scalable AI solutions" },
            { title: "Generative AI & LLMs", description: "Deep expertise in LLM-powered copilots and agents" },
            { title: "End-to-End Execution", description: "From 0→1 ideation to scale-ready deployment" },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="glass-card-hover rounded-2xl p-6 text-center"
            >
              <h3 className="text-foreground font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
