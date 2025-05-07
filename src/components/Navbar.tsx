
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "py-2 bg-background/90 backdrop-blur-lg shadow-sm"
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#hero" className="text-foreground font-heading font-bold text-xl md:text-2xl">
          Studio<span className="text-accent">Design</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#work"
            className="text-foreground/80 hover:text-accent transition-colors font-medium"
          >
            Work
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#about"
            className="text-foreground/80 hover:text-accent transition-colors font-medium"
          >
            About
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="text-foreground/80 hover:text-accent transition-colors font-medium"
          >
            Contact
          </motion.a>
          <Button 
            asChild
            className="bg-accent hover:bg-accent/90 text-white"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
            >
              Hire Me
            </motion.a>
          </Button>
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span
                className={`block h-0.5 bg-foreground transition-transform duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-foreground transition-opacity duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-foreground transition-transform duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-background/95 backdrop-blur-lg"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <a
              href="#work"
              className="text-foreground/80 hover:text-accent py-2 transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Work
            </a>
            <a
              href="#about"
              className="text-foreground/80 hover:text-accent py-2 transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="text-foreground/80 hover:text-accent py-2 transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
            <Button 
              asChild
              className="bg-accent hover:bg-accent/90 text-white w-full mt-2"
            >
              <a href="#contact" onClick={() => setMenuOpen(false)}>Hire Me</a>
            </Button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Navbar;
