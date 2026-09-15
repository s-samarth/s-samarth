import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { ContactForm } from "./ContactForm";

const contactLinks = [
  { label: "Email", value: "samarth.iitg@gmail.com", href: "mailto:samarth.iitg@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/s-samarth", href: "https://linkedin.com/in/s-samarth" },
  { label: "GitHub", value: "github.com/s-samarth", href: "https://github.com/s-samarth" },
  { label: "Phone", value: "+91 70623 03003", href: "tel:+917062303003" },
];

export const ContactSection = () => (
  <section id="contact" className="section-y border-t border-line">
    <div className="container-x">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Raise a ticket"
            title={
              <>
                Let's build <em>something great</em>
              </>
            }
            lede="Open to discussing AI product opportunities, collaborations, or just a friendly chat about the future of AI."
          />

          <Reveal delay={0.15}>
            <dl className="mt-12 border-t border-line">
              {contactLinks.map((link) => {
                const external = link.href.startsWith("http");
                return (
                  <div key={link.label} className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-line py-4">
                    <dt className="eyebrow pt-1">{link.label}</dt>
                    <dd>
                      <a
                        href={link.href}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="link-draw inline-flex items-center gap-1.5 text-bone"
                      >
                        {link.value}
                        {external && <ArrowUpRight size={14} className="text-mist" />}
                      </a>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <ContactForm />
        </Reveal>
      </div>
    </div>
  </section>
);
