import { useTicketSent } from "@/lib/ticket-sent";

const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/s-samarth" },
  { label: "GitHub", href: "https://github.com/s-samarth" },
  { label: "Substack", href: "https://samarthsaraswat.substack.com" },
];

/** The set ends with the comic's sign-off, said louder once a ticket has been raised. */
export const Footer = () => {
  const sent = useTicketSent();
  return (
    <footer className="relative">
      <div className="page-x pb-14 pt-6">
        <p className={`hand text-center transition-all duration-500 ${sent ? "text-[34px] text-graphite" : "text-[26px] text-graphite-soft"}`}>
          That's my time. You've been great.
        </p>
        <div className="mt-10 flex flex-col gap-6 border-t-2 border-graphite pt-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-serif text-[19px] font-medium text-graphite">Samarth Saraswat</p>
            <p className="label mt-1 !text-[11px]">Bangalore, India · © {new Date().getFullYear()}</p>
          </div>
          <ul className="flex gap-6">
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer" className="btn-pen">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
