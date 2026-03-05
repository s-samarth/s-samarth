import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Play } from "lucide-react";
import { Button } from "./ui/button";

export const BuiltSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="built" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-glow opacity-10" />

      <div className="container-narrow relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          <p className="text-primary text-sm tracking-widest uppercase mb-4">Vibe Coding Skills </p>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary-foreground">
            ​Prototypes
   
            <span className="text-gradient"> Built</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-card-hover rounded-2xl overflow-hidden">
          
          <div className="h-2 bg-gradient-to-r from-yellow-500/20 to-pink-500/20" />

          <div className="p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-foreground">
                  Comedy Connect
                </h3>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  A new platform for discovering comedy shows, browsing upcoming gigs, exploring artists, and booking tickets seamlessly.
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["React", "Full-Stack", "Live Platform"].map((tag) =>
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
                    
                      {tag}
                    </span>
                  )}
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
            <div className="aspect-video rounded-xl overflow-hidden border border-border/50 bg-secondary/20">
              <iframe
                src="https://drive.google.com/file/d/1zRDeiJvZ08DP9MxxVgjP9iApVnlrUt9x/preview"
                className="w-full h-full"
                allow="autoplay"
                allowFullScreen
                title="Comedy Connect Demo" />
              
            </div>
          </div>
        </motion.div>
      </div>
    </section>);

};