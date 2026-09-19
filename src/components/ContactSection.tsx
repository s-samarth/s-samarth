import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { PageHead } from "./notebook/PageHead";
import { Scribble } from "./notebook/Scribble";

const contactLinks = [
  { label: "Email", value: "samarth.iitg@gmail.com", href: "mailto:samarth.iitg@gmail.com" },
  { label: "LinkedIn", value: "linkedin.com/in/s-samarth", href: "https://linkedin.com/in/s-samarth" },
  { label: "GitHub", value: "github.com/s-samarth", href: "https://github.com/s-samarth" },
  { label: "Phone", value: "+91 70623 03003", href: "tel:+917062303003" },
];

export const ContactSection = () => (
  <section id="ticket">
    <div className="page-x grid gap-14 py-24 md:py-32 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
      <div>
        <PageHead
          page="05"
          name="Talk · Raise a ticket"
          title={
            <>
              Got a messy problem? <em className="text-redpen">Raise a ticket.</em>
            </>
          }
          lede="AI product work, collaborations, or a friendly argument about where AI is headed. The ticket lands straight in my inbox."
        />

        <Reveal delay={0.15}>
          <p className="label mt-12">Or the old-fashioned way</p>
          <dl className="mt-3 border-t-2 border-graphite">
            {contactLinks.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <div key={link.label} className="grid grid-cols-[6rem_1fr] gap-4 border-b border-dotted border-graphite-soft/60 py-3">
                  <dt className="label pt-1 !text-[11px]">{link.label}</dt>
                  <dd>
                    <a
                      href={link.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="link-ink inline-flex items-center gap-1.5 text-[17px] text-graphite"
                    >
                      {link.value}
                      {external && <ArrowUpRight size={14} className="text-graphite-soft" />}
                    </a>
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </div>

      <Reveal delay={0.2} className="relative">
        <span className="absolute -top-12 right-4 hidden items-end md:flex">
          <span className="hand mb-1 rotate-[-4deg]">yes, it actually emails me</span>
          <Scribble shape="arrow-down" className="ml-1 h-10 w-8 text-biro" delay={0.5} />
        </span>
        <ContactForm />
      </Reveal>
    </div>
  </section>
);
