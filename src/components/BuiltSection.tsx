import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "./ui/button";

export const BuiltSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="built" className="section-padding relative">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="container-narrow relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4 font-semibold">Side Project</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-gradient">Prototypes</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl overflow-hidden"
        >
          <div className="h-1.5 bg-accent" />

          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  Comedy Connect
                </h3>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  A new platform for discovering comedy shows — browse upcoming gigs, explore artists, and book tickets seamlessly.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["React", "Full-Stack", "Live Platform"].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://comedyconnect.in" target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4" />
                    Live Site
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com/s-samarth/comedy-connect" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    GitHub
                  </a>
                </Button>
              </div>
            </div>

            {/* Video Embed */}
            <div className="relative rounded-xl overflow-hidden border-2 border-border bg-secondary/30 shadow-lg">
              <div className="bg-secondary/50 px-4 py-2 flex items-center gap-2 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400/60" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                  <div className="w-3 h-3 rounded-full bg-green-400/60" />
                </div>
                <span className="text-xs text-muted-foreground ml-2">Demo Video</span>
              </div>
              <iframe
                src="https://drive.google.com/file/d/1zRDeiJvZ08DP9MxxVgjP9iApVnlrUt9x/preview"
                className="w-full aspect-video"
                allow="autoplay"
                allowFullScreen
                title="Comedy Connect Demo"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
