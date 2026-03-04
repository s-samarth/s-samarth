import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Subtitles, Star, TrendingUp, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const projects = [
  {
    id: "netflix",
    title: "Netflix — AI-Powered Regional Subtitle Expansion",
    tags: ["AI Product", "NLP", "Experimentation"],
    icon: Subtitles,
    problem: "Limited regional subtitles restricting content consumption in emerging markets",
    insight: "Direct impact on watch hours and completion rates for non-English content",
    solution: "AI-powered subtitle pipeline combining ASR + LLM + human-in-loop quality checks",
    metrics: ["Metrics-driven experimentation strategy", "Scalable to 50+ languages"],
    gradient: "from-red-500/20 to-orange-500/20",
    deckPdf: "/decks/netflix-case-study.pdf",
    caseStudyDeck: [
      { slide: 1, title: "Problem Statement", content: "Regional content lacks subtitles in local languages, limiting accessibility and watch time." },
      { slide: 2, title: "Market Opportunity", content: "500M+ potential viewers in emerging markets with language barriers." },
      { slide: 3, title: "Proposed Solution", content: "AI-powered pipeline: ASR → LLM Translation → Human QA → Deployment." },
      { slide: 4, title: "Technical Architecture", content: "Whisper ASR + GPT-4 Translation + Human-in-loop validation system." },
      { slide: 5, title: "Success Metrics", content: "Watch time increase, completion rates, user satisfaction scores." },
    ],
  },
  {
    id: "bookmyshow",
    title: "BookMyShow — Ratings & Reviews for Live Events",
    tags: ["Product Strategy", "Recommendations", "Trust"],
    icon: Star,
    problem: "Trust gap in live event bookings leading to hesitation",
    insight: "Post-attendance reviews could directly increase monthly bookings and discovery",
    solution: "Designed ratings & reviews system with AI-driven ranking and recommendations",
    metrics: ["Linked to booking conversion", "Enhanced event discovery"],
    gradient: "from-blue-500/20 to-purple-500/20",
    deckPdf: "/decks/bookmyshow-case-study.pdf",
    caseStudyDeck: [
      { slide: 1, title: "Problem Statement", content: "Users hesitate to book live events due to lack of trust signals and reviews." },
      { slide: 2, title: "User Research", content: "78% of users want to see reviews before booking live events." },
      { slide: 3, title: "Proposed Solution", content: "Post-attendance rating system with AI-powered recommendation engine." },
      { slide: 4, title: "Feature Design", content: "Star ratings, written reviews, photo uploads, helpful votes." },
      { slide: 5, title: "Expected Impact", content: "15% increase in booking conversion, improved event discovery." },
    ],
  },
];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<Record<string, string>>({});

  const getActiveTab = (projectId: string) => activeTab[projectId] || "overview";

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

                {/* Tabs */}
                <Tabs 
                  value={getActiveTab(project.id)} 
                  onValueChange={(value) => setActiveTab(prev => ({ ...prev, [project.id]: value }))}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="overview" className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      <span className="hidden sm:inline">Overview</span>
                    </TabsTrigger>
                    <TabsTrigger value="deck" className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <span className="hidden sm:inline">Case Study Deck</span>
                    </TabsTrigger>
                  </TabsList>

                  {/* Overview Tab */}
                  <TabsContent value="overview">
                    <div className="grid md:grid-cols-2 gap-6">
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
                  </TabsContent>

                  {/* Case Study Deck Tab */}
                  <TabsContent value="deck">
                    <div className="space-y-4">
                      <div className="grid gap-3">
                        {project.caseStudyDeck.map((slide) => (
                          <div 
                            key={slide.slide}
                            className="bg-secondary/50 rounded-lg p-4 border border-border/50"
                          >
                            <div className="flex items-center gap-3 mb-2">
                              <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
                                {slide.slide}
                              </span>
                              <h4 className="font-semibold text-foreground">{slide.title}</h4>
                            </div>
                            <p className="text-muted-foreground text-sm pl-11">{slide.content}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-center pt-4">
                        <a 
                          href={project.deckPdf} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          View Full Deck
                        </a>
                      </div>
                    </div>
                  </TabsContent>

                </Tabs>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
