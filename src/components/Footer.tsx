
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <a href="#hero" className="text-foreground font-heading font-bold text-xl">
              Studio<span className="text-accent">Design</span>
            </a>
            <p className="text-foreground/60 mt-2 max-w-md">
              Creating memorable brand experiences through thoughtful design and creative strategy.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <button 
              onClick={scrollToTop}
              className="mb-4 p-3 bg-accent/10 hover:bg-accent/20 rounded-full transition-colors"
              aria-label="Scroll to top"
            >
              <ArrowUp className="h-5 w-5 text-accent" />
            </button>
            <p className="text-foreground/60 text-sm">
              © {new Date().getFullYear()} StudioDesign. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
