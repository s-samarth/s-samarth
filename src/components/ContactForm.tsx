import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

// Editorial field: no box, just a hairline that turns amber on focus.
const fieldClass =
  "h-11 rounded-none border-0 border-b border-bone/20 bg-transparent px-0 text-base text-bone placeholder:text-mist/70 focus:border-amber focus-visible:ring-0 focus-visible:ring-offset-0";

const emptyForm = { name: "", email: "", subject: "", message: "" };

export const ContactForm = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    try {
      await emailjs.send(
        "service_eo3ck3c",
        "template_va2byvf",
        {
          to_name: "Samarth",
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        "tGHLrscykSp5T6HoO",
      );
      setStatus("sent");
      setFormData(emptyForm);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <AnimatePresence>
        {status !== "idle" && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className={`fixed left-1/2 top-24 z-[90] flex -translate-x-1/2 items-center gap-3 rounded-full border px-5 py-3 text-sm ${
              status === "sent"
                ? "border-cyan/40 bg-ink-2 text-cyan"
                : "border-destructive/50 bg-ink-2 text-destructive"
            }`}
          >
            {status === "sent" ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {status === "sent"
              ? "Ticket raised. I'll get back to you soon."
              : "Failed to send. Please try again, or email me directly."}
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name" className="eyebrow">Name</Label>
            <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required className={fieldClass} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="eyebrow">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@company.com" value={formData.email} onChange={handleChange} required className={fieldClass} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject" className="eyebrow">Subject</Label>
          <Input id="subject" name="subject" placeholder="What's this about?" value={formData.subject} onChange={handleChange} required className={fieldClass} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="eyebrow">Message</Label>
          <Textarea id="message" name="message" placeholder="Your message" value={formData.message} onChange={handleChange} required rows={4} className={`${fieldClass} h-auto resize-none py-2`} />
        </div>
        <button type="submit" className="btn-amber disabled:opacity-60" disabled={isSubmitting}>
          {isSubmitting ? "Sending…" : (<><Send size={14} /> Raise the ticket</>)}
        </button>
      </form>
    </>
  );
};
