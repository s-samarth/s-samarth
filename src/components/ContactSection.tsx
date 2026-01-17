import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Linkedin, Github, Phone, ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";

const contactLinks = [
  {
    label: "Email",
    value: "samarth.iitg@gmail.com",
    href: "mailto:samarth.iitg@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/s-samarth",
    href: "https://linkedin.com/in/s-samarth",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    value: "github.com/samarth",
    href: "https://github.com/samarth",
    icon: Github,
  },
  {
    label: "Phone",
    value: "+91 7062303003",
    href: "tel:+917062303003",
    icon: Phone,
  },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-hero rotate-180" />
      
      <div className="container-narrow relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4">Get in Touch</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let's Build
            <span className="text-gradient"> Something Great</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Open to discussing AI product opportunities, collaborations, or just a friendly chat about the future of AI.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {contactLinks.map((link, index) => (
            <motion.a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="glass-card-hover rounded-xl p-6 group block"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <link.icon className="w-5 h-5 text-primary" />
                </div>
                <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <p className="text-muted-foreground text-sm mb-1">{link.label}</p>
              <p className="text-foreground font-medium text-sm truncate">{link.value}</p>
            </motion.a>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Button variant="hero" size="xl" asChild>
            <a href="mailto:samarth.iitg@gmail.com">
              <Mail className="w-5 h-5 mr-2" />
              Send me an email
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
