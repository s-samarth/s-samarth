export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container-narrow">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              S
            </div>
            <span className="font-semibold text-foreground">Samarth Saraswat</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Samarth Saraswat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
