import { ArrowUpRight } from "lucide-react";
import { Chapter } from "./Chapter";
import { ChapterIntro } from "./ChapterIntro";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";

const contactLinks = [
  { label: "Email", value: "samarth.iitg@gmail.com", href: "mailto:samarth.iitg@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/s-samarth", href: "https://linkedin.com/in/s-samarth" },
  { label: "GitHub", value: "github.com/s-samarth", href: "https://github.com/s-samarth" },
  { label: "Phone", value: "+91 70623 03003", href: "tel:+917062303003" },
];

export const ContactSection = () => (
  <Chapter id="talk" className="py-28 md:py-40">
    <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
      <div>
        <ChapterIntro
          eyebrow="Talk · Raise a ticket"
          title={
            <>
              Let's build <em>something great.</em>
            </>
          }
          lede="Open to discussing AI product opportunities, collaborations, or just a friendly chat about the future of AI."
        />

        <Reveal delay={0.15}>
          <dl className="panel mt-10 divide-y divide-line px-6">
            {contactLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <div key={link.label} className="grid grid-cols-[6rem_1fr] gap-4 py-4">
                  <dt className="pt-0.5 text-[13px] font-medium uppercase tracking-[0.12em] text-mist">{link.label}</dt>
                  <dd>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="link-draw inline-flex items-center gap-1.5 text-[16px] text-bone"
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
        <div className="panel p-6 md:p-8">
          <ContactForm />
        </div>
      </Reveal>
    </div>
  </Chapter>
);
