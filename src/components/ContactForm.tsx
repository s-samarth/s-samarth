import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { PriorityTicks, type Priority } from "./ticket/PriorityTicks";
import { announceTicketSent } from "@/lib/ticket-sent";

const emptyForm = { name: "", email: "", subject: "", message: "" };
const fieldClass =
  "w-full border-0 border-b-2 border-graphite/25 bg-transparent px-0 py-2 font-serif text-[19px] text-graphite placeholder:text-graphite-soft/70 focus:border-biro focus:outline-none focus:ring-0";

/** A four-digit ticket number, fixed until the ticket is sent. */
const newTicketNo = () => String(Math.floor(1000 + Math.random() * 9000));

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <label className="block">
    <span className="label !text-[11px]">{label}</span>
    {children}
  </label>
);

/**
 * "Raise a ticket": sends through EmailJS exactly as before. The priority
 * tick-box and ticket number are prefixed onto the subject, so the email
 * template needs no change. A sent ticket also crosses "crowd work" off the
 * set list (see lib/ticket-sent.ts).
 *
 * The ticket number is picked after mount, not during render: the page is
 * prerendered at build time, and a random number there would differ from the
 * browser's and break hydration.
 */
export const ContactForm = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [priority, setPriority] = useState<Priority>("This week");
  const [ticketNo, setTicketNo] = useState("····");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");

  useEffect(() => setTicketNo(newTicketNo()), []);

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
          subject: `[${priority}] #${ticketNo} ${formData.subject}`,
          message: formData.message,
        },
        "tGHLrscykSp5T6HoO",
      );
      setStatus("sent");
      setFormData(emptyForm);
      announceTicketSent();
      setTimeout(() => {
        setStatus("idle");
        setTicketNo(newTicketNo());
      }, 6000);
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="card relative grid -rotate-[0.4deg] overflow-hidden sm:grid-cols-[1fr_72px]">
      {/* perforated tear line along the top */}
      <div className="absolute inset-x-0 top-0 h-2 bg-[radial-gradient(circle,theme(colors.paper.DEFAULT)_3px,transparent_3.5px)] bg-[length:14px_14px] bg-[position:0_-7px]" />

      <div className="px-6 pb-8 pt-7 md:px-9">
        <div className="flex items-baseline justify-between border-b-2 border-redpen/50 pb-3">
          <p className="label">Support ticket</p>
          <p className="font-mono text-[15px] font-medium text-redpen">Nº {ticketNo}</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Raised by">
              <input name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required className={fieldClass} />
            </Field>
            <Field label="Reply to">
              <input name="email" type="email" placeholder="you@company.com" value={formData.email} onChange={handleChange} required className={fieldClass} />
            </Field>
          </div>
          <Field label="Subject">
            <input name="subject" placeholder="The messy problem, in one line" value={formData.subject} onChange={handleChange} required className={fieldClass} />
          </Field>

          <PriorityTicks value={priority} onChange={setPriority} />

          <Field label="Details">
            <textarea name="message" placeholder="What's going on, and what would good look like?" value={formData.message} onChange={handleChange} required rows={4} className={`${fieldClass} resize-none`} />
          </Field>

          <div className="flex flex-wrap items-center gap-5 pt-2">
            <button type="submit" className="btn-stamp disabled:opacity-60" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Raise the ticket"}
            </button>
            <p role="status" aria-live="polite" className="hand text-[22px]">
              {status === "sent" && "Got it. I'll get back to you soon."}
              {status === "error" && (
                <span className="text-redpen">
                  That didn't send. Email me at{" "}
                  <a href="mailto:samarth.iitg@gmail.com" className="underline">
                    samarth.iitg@gmail.com
                  </a>
                </span>
              )}
            </p>
          </div>
        </form>
      </div>

      {/* the tear-off stub, with the same number written sideways */}
      <div aria-hidden="true" className="hidden items-center justify-center gap-[18px] border-l-2 border-dashed border-graphite/30 bg-paper-2 [writing-mode:vertical-rl] sm:flex">
        <span className="font-mono text-[18px] font-medium tracking-[0.1em] text-redpen">Nº {ticketNo}</span>
        <span className="label">keep this stub</span>
      </div>

      <AnimatePresence>
        {status === "sent" && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: -12 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
            className="pointer-events-none absolute right-6 top-16 border-[3px] border-redpen px-4 py-1 font-mono text-[26px] font-medium uppercase tracking-[0.2em] text-redpen/85 mix-blend-multiply sm:right-[100px]"
          >
            Received
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
