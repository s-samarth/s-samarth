import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Linkedin, Github, Phone, ArrowUpRight, Send, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import emailjs from "@emailjs/browser";

const contactLinks = [
  { label: "Email", value: "samarth.iitg@gmail.com", href: "mailto:samarth.iitg@gmail.com", icon: Mail },
  { label: "LinkedIn", value: "linkedin.com/in/s-samarth", href: "https://linkedin.com/in/s-samarth", icon: Linkedin },
  { label: "GitHub", value: "github.com/s-samarth", href: "https://github.com/s-samarth", icon: Github },
  { label: "Phone", value: "+91 7062303003", href: "tel:+917062303003", icon: Phone },
];

export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);
    setShowSuccess(false);
    try {
      await emailjs.send("service_eo3ck3c", "template_va2byvf", {
        to_name: "Samarth",
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }, "tGHLrscykSp5T6HoO");
      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setErrorMessage("Failed to send message. Please try again.");
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute inset-0 dot-grid opacity-15" />
      
      <div className="container-narrow relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-sm tracking-widest uppercase mb-4 font-semibold">Raise A Ticket</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Let's Build
            <span className="text-gradient"> Something Great</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Open to discussing AI product opportunities, collaborations, or just a friendly chat about the future of AI.
          </p>
        </motion.div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-green-50 border border-green-300 rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <CheckCircle className="w-5 h-5 text-green-600" />
              <p className="text-green-700 font-medium">Message sent successfully! I'll get back to you soon.</p>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {showError && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 bg-red-50 border border-red-300 rounded-xl px-6 py-4 flex items-center gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 font-medium">{errorMessage}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <form onSubmit={handleSubmit} className="glass-card rounded-2xl p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Name</Label>
                <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required className="bg-background border-border focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required className="bg-background border-border focus:border-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-foreground">Subject</Label>
              <Input id="subject" name="subject" placeholder="What's this about?" value={formData.subject} onChange={handleChange} required className="bg-background border-border focus:border-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">Message</Label>
              <Textarea id="message" name="message" placeholder="Your message..." value={formData.message} onChange={handleChange} required rows={5} className="bg-background border-border focus:border-primary resize-none" />
            </div>
            <Button type="submit" variant="default" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : (<><Send className="w-4 h-4 mr-2" />Send Message</>)}
            </Button>
          </form>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
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
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
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
      </div>
    </section>
  );
};
