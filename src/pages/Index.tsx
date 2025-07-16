
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ForestHero from "@/components/ForestHero";
import FeaturedProjects from "@/components/FeaturedProjects";
import Footer from "@/components/Footer";
import ForestAnimation from "@/components/ForestAnimation";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/types/project";

// Forest-themed demo projects
const initialProjects: Project[] = [
  {
    id: 1,
    title: "Woodland Spirits Logo",
    description: "Mystical logo design for eco-friendly startup featuring ancient tree symbolism and ethereal elements.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
    tags: ["Logo Design", "Branding", "Nature"],
    category: "logo",
    fullDescription: "This enchanting logo captures the essence of woodland magic, combining ancient tree wisdom with modern design principles. The organic curves and natural color palette create a timeless brand identity.",
    gallery: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 2,
    title: "Forest Guardian Campaign",
    description: "Environmental awareness campaign materials featuring wildlife photography and organic typography.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
    tags: ["Campaign Design", "Print", "Environmental"],
    category: "printing",
    fullDescription: "A comprehensive campaign celebrating forest guardians - the animals that protect our woodland ecosystems. This project combines stunning wildlife photography with hand-crafted typography.",
    gallery: [
      "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1439886183900-e79ec0057170?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 3,
    title: "WildTrack App Design",
    description: "Mobile app for wildlife tracking and forest exploration with intuitive nature-inspired interface.",
    image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    tags: ["App Design", "UI/UX", "Wildlife"],
    category: "app",
    fullDescription: "WildTrack helps nature enthusiasts document their forest adventures. The interface mimics natural textures and uses organic navigation patterns inspired by animal trails.",
    gallery: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80"
    ]
  },
  {
    id: 4,
    title: "Pine & Pixel Studio Website",
    description: "Portfolio website for nature photographer with seamless forest-to-digital transitions.",
    image: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80",
    tags: ["Web Design", "Photography", "Nature"],
    category: "web",
    fullDescription: "A stunning portfolio website that blends digital artistry with natural beauty. Features parallax scrolling that mimics walking through a forest canopy.",
    gallery: [
      "https://images.unsplash.com/photo-1466721591366-2d5fba72006d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=800&q=80"
    ]
  }
];

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [projects] = useState<Project[]>(initialProjects);
  
  useEffect(() => {
    const darkModePreference = localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    setIsDark(darkModePreference);
    
    if (darkModePreference) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

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

  const featuredProjects = projects.slice(0, 4);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900">
      <ForestAnimation />
      
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
          className="rounded-full w-12 h-12 bg-background/80 backdrop-blur-sm border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 hover:bg-background/90 shadow-lg"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-amber-500" />
          ) : (
            <Moon className="h-5 w-5 text-emerald-600" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </motion.div>
      
      <Navbar />
      <ForestHero />
      <FeaturedProjects projects={featuredProjects} />
      <Footer />
    </div>
  );
};

export default Index;
