import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/5">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-primary-foreground font-bold text-sm">
              S
            </div>
            <span className="font-semibold">Samarth Saraswat</span>
          </div>

          {/* Copyright */}
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Samarth Saraswat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
