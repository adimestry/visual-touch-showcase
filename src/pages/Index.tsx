
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
import { Toaster } from "@/components/ui/toaster";
import { Project, User } from "@/types/project";

// Demo projects data with more examples
const initialProjects: Project[] = [
  {
    id: 1,
    title: "Clean Minimalist Logo",
    description: "A modern, minimalist logo design for a tech startup with custom typography and iconic elements.",
    image: "/placeholder.svg",
    tags: ["Logo Design", "Branding", "Typography"],
    category: "logo",
    fullDescription: "This minimalist logo design represents the client's vision for clean, forward-thinking brand identity. The design process involved several iterations to achieve perfect balance between simplicity and recognition.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 2,
    title: "Luxury Wedding Invitation",
    description: "Elegant wedding card design with gold foil accents and custom calligraphy for a luxury event.",
    image: "/placeholder.svg",
    tags: ["Wedding Card", "Print Design", "Calligraphy"],
    category: "wedding",
    fullDescription: "This luxury wedding invitation set features handcrafted elements including custom calligraphy, gold foil details, and premium paper selection. The design reflects the couple's sophisticated style and the elegance of their event.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 3,
    title: "Corporate Event Banner",
    description: "Large format banner design for annual tech conference with dynamic visuals and clear information hierarchy.",
    image: "/placeholder.svg",
    tags: ["Banner Design", "Event Graphics", "Large Format"],
    category: "printing",
    fullDescription: "This banner was designed for the main entrance of a major tech conference. The design focuses on visibility from a distance while maintaining brand consistency and communicating key information about the event.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 4,
    title: "Furniture E-commerce Website",
    description: "Modern e-commerce website for a premium furniture brand featuring product showcase and shopping cart functionality.",
    image: "/placeholder.svg",
    tags: ["Web Design", "E-commerce", "UI/UX"],
    category: "web",
    fullDescription: "This e-commerce platform was designed with a focus on showcasing high-quality furniture photography and providing an intuitive shopping experience. The design emphasizes clean lines and ample white space to let the products shine.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 5,
    title: "Fitness Tracking Mobile App",
    description: "User-friendly mobile app for tracking workouts, monitoring progress, and setting fitness goals.",
    image: "/placeholder.svg",
    tags: ["App Design", "UI/UX", "Mobile"],
    category: "app",
    fullDescription: "This fitness tracking app features an intuitive interface that makes it easy for users to log workouts, track progress over time, and set achievable fitness goals. The design includes customizable dashboards and motivational elements.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 6,
    title: "Coffee Brand Identity",
    description: "Complete brand identity for an artisan coffee roaster including logo, packaging, and marketing materials.",
    image: "/placeholder.svg",
    tags: ["Logo Design", "Branding", "Packaging"],
    category: "logo",
    fullDescription: "This comprehensive brand identity project for an artisan coffee roaster included logo design, packaging for different coffee varieties, in-store signage, and marketing materials. The design captures the artisanal nature of the brand.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 7,
    title: "Fashion Lookbook Design",
    description: "Seasonal lookbook design for fashion brand showcasing new collection through editorial photography and typography.",
    image: "/placeholder.svg",
    tags: ["Print Design", "Editorial", "Fashion"],
    category: "printing",
    fullDescription: "This seasonal lookbook design for a fashion brand combines editorial photography with dynamic layouts and typography. The design embraces white space and strategic pacing to create an engaging presentation of the collection.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 8,
    title: "Music Streaming App",
    description: "Mobile app design for a music streaming service with personalized recommendations and playlist creation.",
    image: "/placeholder.svg",
    tags: ["App Design", "UI/UX", "Entertainment"],
    category: "app",
    fullDescription: "This music streaming app features a dark-themed interface optimized for browsing and discovering music. The design includes intuitive playlist creation, personalized recommendations, and a seamless listening experience.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  }
];

const Index = () => {
  const [isDark, setIsDark] = useState(false);
  const [projects, setProjects] = useState<Project[]>(() => {
    // Try to load projects from localStorage
    const savedProjects = localStorage.getItem('portfolioProjects');
    return savedProjects ? JSON.parse(savedProjects) : initialProjects;
  });
  
  // State for user authentication
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('portfolioUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
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

  // Save projects to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
  }, [projects]);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('portfolioUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('portfolioUser');
    }
  }, [user]);

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

  // Handle project operations
  const handleSaveProject = (project: Project) => {
    setProjects(prev => {
      const existingIndex = prev.findIndex(p => p.id === project.id);
      if (existingIndex >= 0) {
        // Update existing project
        const updatedProjects = [...prev];
        updatedProjects[existingIndex] = project;
        return updatedProjects;
      } else {
        // Add new project
        return [...prev, project];
      }
    });
  };

  const handleDeleteProject = (id: number) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // Handle login and logout
  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="min-h-screen w-full">
      <SpaceAnimation />
      
      {/* Admin Mode Indicator */}
      {user?.isAdmin && (
        <div className="fixed top-6 right-20 z-50 bg-accent/90 text-white px-3 py-1 rounded-md text-sm font-medium animate-pulse">
          Admin Mode
        </div>
      )}
      
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
      
      <Navbar 
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
      <HeroSection />
      <WorkSection 
        projects={projects} 
        onSaveProject={handleSaveProject}
        onDeleteProject={handleDeleteProject}
        isAdmin={user?.isAdmin}
      />
      <AboutSection />
      <ContactSection />
      <Footer />
      <Toaster />
    </div>
  );
};

export default Index;
