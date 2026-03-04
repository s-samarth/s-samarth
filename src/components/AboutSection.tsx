import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Sparkles, Target, Zap } from "lucide-react";

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const highlights = [
    { icon: Sparkles, text: "3+ years at Microsoft as Data & Applied Scientist" },
    { icon: Target, text: "Expert in LLM-powered copilots and AI agents" },
    { icon: Zap, text: "Passionate about user value and business impact" },
    { icon: GraduationCap, text: "IIT Guwahati Graduate" },
  ];

  return (
    <section id="about" className="section-padding relative">
      {/* Geometric accents */}
      <div className="absolute top-20 right-0 w-64 h-64 rounded-full bg-accent/5 blur-2xl" />
      <div className="absolute bottom-10 left-0 w-48 h-48 rounded-full bg-primary/5 blur-2xl" />
      
      <div className="container-narrow relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4 font-semibold">README.md</p>
          <h2 className="text-3xl md:text-5xl font-bold">
            Building the Future of
            <span className="text-gradient"> AI Products</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-muted-foreground text-lg leading-relaxed">
              I'm an <span className="text-foreground font-medium">AI Product Manager</span> with 3+ years of experience 
              as a Data & Applied Scientist at <span className="text-foreground font-medium">Microsoft</span>, where I've 
              built and scaled LLM-powered copilots and AI agents that drive real business outcomes.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              With a strong problem-solving mindset honed at <span className="text-foreground font-medium">IIT Guwahati</span>, 
              I specialize in translating complex business problems into scalable AI-first product solutions. My approach 
              combines <span className="text-foreground font-medium">futuristic vision</span> with <span className="text-foreground font-medium">high-precision execution</span>.
            </p>

            <div className="glass-card rounded-xl p-5 mt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-foreground font-semibold">B.Tech in Electronics & Communication Engineering</p>
                  <p className="text-muted-foreground text-sm">Indian Institute of Technology Guwahati, 2022</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="glass-card-hover rounded-xl p-5 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-foreground">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
