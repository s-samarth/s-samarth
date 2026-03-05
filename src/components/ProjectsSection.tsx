import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Subtitles, Star, TrendingUp } from "lucide-react";

const projects = [
{
  id: "netflix",
  title: "Netflix: AI-Powered Regional Subtitle Expansion",
  tags: ["AI Product", "NLP", "Experimentation"],
  icon: Subtitles,
  problem: "Limited regional subtitles restricting content consumption in emerging markets",
  insight: "Direct impact on watch hours and completion rates for non-English content",
  solution: "AI-powered subtitle pipeline combining ASR + LLM + human-in-loop quality checks",
  metrics: ["Metrics-driven experimentation strategy", "Scalable to 50+ languages"],
  accentColor: "bg-red-500",
  deckEmbed: "https://drive.google.com/file/d/1aXb97wNEsIDs4BMuCn00rqBjZd-tFIJx/preview"
},
{
  id: "bookmyshow",
  title: "BookMyShow: Ratings & Reviews for Live Events",
  tags: ["Product Strategy", "Recommendations", "Trust"],
  icon: Star,
  problem: "Trust gap in live event bookings leading to hesitation",
  insight: "Post-attendance reviews could directly increase monthly bookings and discovery",
  solution: "Designed ratings & reviews system with AI-driven ranking and recommendations",
  metrics: ["Linked to booking conversion", "Enhanced event discovery"],
  accentColor: "bg-blue-500",
  deckEmbed: "https://drive.google.com/file/d/1G5-gwpZ5AFGZ81fBUTmFlpB9ELUNbA_y/preview"
}];


export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding relative">
      <div className="absolute top-20 right-0 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-20 left-0 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      
      <div className="container-narrow relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          
          <p className="text-primary text-sm tracking-widest uppercase mb-4 font-semibold">Case Studies</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured
            <span className="text-gradient"> Projects</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Deep dives into product thinking, from problem discovery to impact measurement
          </p>
        </motion.div>

        <div className="grid gap-10">
          {projects.map((project, index) =>
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            className="glass-card rounded-2xl overflow-hidden">
            
              <div className={`h-1.5 ${project.accentColor}`} />
              
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
                        {project.tags.map((tag) =>
                      <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-secondary text-muted-foreground">
                            {tag}
                          </span>
                      )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Overview */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div>
                      <p className="text-primary text-sm font-semibold mb-1">Problem</p>
                      <p className="text-muted-foreground">{project.problem}</p>
                    </div>
                    <div>
                      <p className="text-primary text-sm font-semibold mb-1">Key Insight</p>
                      <p className="text-muted-foreground">{project.insight}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-primary text-sm font-semibold mb-1">Solution</p>
                      <p className="text-muted-foreground">{project.solution}</p>
                    </div>
                    <div>
                      <p className="text-primary text-sm font-semibold mb-1">Impact</p>
                      <ul className="space-y-1">
                        {project.metrics.map((metric, idx) =>
                      <li key={idx} className="text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-accent shrink-0" />
                            {metric}
                          </li>
                      )}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Slide Viewer */}
                <div>
                  <p className="text-primary text-sm font-semibold mb-3">Case Study Deck</p>
                  <div className="relative rounded-xl overflow-hidden border-2 border-border bg-secondary/30 shadow-lg">
                    <div className="bg-secondary/50 px-4 py-2 flex items-center gap-2 border-b border-border">
                      <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400/60" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                        <div className="w-3 h-3 rounded-full bg-green-400/60" />
                      </div>
                      <span className="text-xs text-muted-foreground ml-2">{project.title.split(":")[0]}</span>
                    </div>
                    <iframe
                    src={project.deckEmbed}
                    className="w-full aspect-[4/3] max-h-[500px]"
                    allow="autoplay"
                    allowFullScreen
                    title={`${project.title} deck`} />
                  
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

};