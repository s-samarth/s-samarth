const links = [
  { label: "LinkedIn", href: "https://linkedin.com/in/s-samarth" },
  { label: "GitHub", href: "https://github.com/s-samarth" },
  { label: "Substack", href: "https://samarthsaraswat.substack.com" },
];

export const Footer = () => (
  <footer className="relative z-10 border-t border-line py-10">
    <div className="container-x flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-display text-[17px] font-semibold tracking-tight text-bone">Samarth Saraswat</p>
        <p className="mt-1 text-[14px] text-mist">Bangalore, India · © {new Date().getFullYear()}</p>
      </div>
      <ul className="flex gap-6">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank" rel="noopener noreferrer" className="link-draw text-[14px] font-medium text-bone-dim hover:text-bone">
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </footer>
);
