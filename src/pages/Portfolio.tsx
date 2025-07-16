
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForestAnimation from "@/components/ForestAnimation";
import ProjectGrid from "@/components/ProjectGrid";
import { Project } from "@/types/project";
import { TreePine, Filter } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Portfolio = () => {
  const [projects] = useState<Project[]>([
    {
      id: 1,
      title: "Woodland Spirits Logo",
      description: "Mystical logo design for eco-friendly startup featuring ancient tree symbolism and ethereal elements.",
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      tags: ["Logo Design", "Branding", "Nature"],
      category: "logo",
      fullDescription: "This enchanting logo captures the essence of woodland magic, combining ancient tree wisdom with modern design principles. The organic curves and natural color palette create a timeless brand identity.",
      gallery: ["https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80"]
    },
    {
      id: 2,
      title: "Forest Guardian Campaign",
      description: "Environmental awareness campaign materials featuring wildlife photography and organic typography.",
      image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80",
      tags: ["Campaign Design", "Print", "Environmental"],
      category: "printing",
      fullDescription: "A comprehensive campaign celebrating forest guardians - the animals that protect our woodland ecosystems.",
      gallery: ["https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=800&q=80"]
    },
    // Add more projects...
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = activeFilter === "all" 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900">
      <ForestAnimation />
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TreePine className="w-4 h-4" />
              <span>Complete Portfolio</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-400 dark:to-green-500 bg-clip-text text-transparent">
              Wild Creativity Unleashed
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore the full spectrum of nature-inspired design projects, from mystical branding to wildlife campaigns.
            </p>
          </motion.div>

          <Tabs defaultValue="all" value={activeFilter} onValueChange={setActiveFilter} className="mb-12">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-background/50 backdrop-blur-md border border-emerald-200/50 dark:border-emerald-700/50 rounded-full p-1">
                <TabsTrigger value="all" className="rounded-full px-6">All Projects</TabsTrigger>
                <TabsTrigger value="logo" className="rounded-full px-6">Branding</TabsTrigger>
                <TabsTrigger value="printing" className="rounded-full px-6">Print Design</TabsTrigger>
                <TabsTrigger value="web" className="rounded-full px-6">Web Design</TabsTrigger>
                <TabsTrigger value="app" className="rounded-full px-6">App Design</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={activeFilter}>
              <ProjectGrid projects={filteredProjects} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
