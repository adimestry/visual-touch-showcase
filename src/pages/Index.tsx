
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WorkSection from "@/components/WorkSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SpaceAnimation from "@/components/SpaceAnimation";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  
  // Handle dark mode based on user preference
  useEffect(() => {
    // Check user preference from localStorage or system preference
    const darkModePreference = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDark(darkModePreference);
    
    if (darkModePreference) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="min-h-screen w-full">
      <SpaceAnimation />
      
      {/* Theme toggle button */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="icon"
          variant="outline"
          onClick={toggleDarkMode}
          className="rounded-full w-10 h-10 bg-background/50 backdrop-blur-sm border-accent/20 hover:border-accent/50 hover:bg-background/80"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-accent" />
          ) : (
            <Moon className="h-5 w-5 text-accent" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>
      
      <Navbar />
      <HeroSection />
      <WorkSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
