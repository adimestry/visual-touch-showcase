
import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: "logo" | "wedding" | "printing" | "web" | "app" | "other";
  fullDescription?: string;
  gallery?: string[];
}

const projects: Project[] = [
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
    title: "Vintage-Inspired Restaurant Logo",
    description: "A handcrafted logo design for an upscale restaurant blending vintage aesthetics with modern elements.",
    image: "/placeholder.svg",
    tags: ["Logo Design", "Restaurant", "Vintage"],
    category: "logo",
    fullDescription: "This restaurant logo design draws inspiration from classic emblems while incorporating contemporary design principles. Hand-drawn elements give it an authentic feel that resonates with the restaurant's farm-to-table concept.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 5,
    title: "Seasonal Retail Banners",
    description: "A series of coordinated retail banners designed for a fashion brand's summer collection launch.",
    image: "/placeholder.svg",
    tags: ["Retail Graphics", "Banner Set", "Campaign"],
    category: "printing",
    fullDescription: "This coordinated set of retail banners was designed to create a cohesive shopping experience throughout the store while highlighting key seasonal products and promotions.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  },
  {
    id: 6,
    title: "Rustic Wedding Suite",
    description: "Complete wedding stationery package featuring natural textures and botanical illustrations.",
    image: "/placeholder.svg",
    tags: ["Wedding", "Stationery Set", "Illustration"],
    category: "wedding",
    fullDescription: "This comprehensive wedding suite included save-the-dates, invitations, RSVP cards, programs, menus, and thank you cards. The unified design used botanical elements and natural textures to reflect the outdoor venue and rustic theme.",
    gallery: ["/placeholder.svg", "/placeholder.svg"]
  }
];

const WorkSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("all");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const filteredProjects = activeTab === "all" 
    ? projects 
    : projects.filter(project => project.category === activeTab);

  return (
    <section id="work" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <span className="text-accent font-medium">Portfolio</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-4">Selected Works</h2>
          <p className="text-foreground/70 max-w-xl mx-auto">
            Explore my creative projects spanning various design disciplines,
            from logo design to wedding stationery and large-format printing.
          </p>
        </motion.div>

        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-8"
        >
          <div className="flex justify-center">
            <TabsList className="mb-8">
              <TabsTrigger value="all">All Works</TabsTrigger>
              <TabsTrigger value="logo">Logo Design</TabsTrigger>
              <TabsTrigger value="wedding">Wedding Cards</TabsTrigger>
              <TabsTrigger value="printing">Printing & Banners</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab}>
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border border-border/50">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardHeader className="p-4">
                      <CardTitle className="font-heading">{project.title}</CardTitle>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.tags.map((tag, index) => (
                          <Badge key={index} variant={
                            tag.includes("Logo") ? "accent" : 
                            tag.includes("Wedding") ? "outline" : 
                            "secondary"
                          } className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="ghost" 
                            className="text-accent hover:text-accent/90 hover:bg-accent/5 p-0"
                            onClick={() => setSelectedProject(project)}
                          >
                            View Project
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-heading">{selectedProject?.title}</DialogTitle>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {selectedProject?.tags.map((tag, index) => (
                                <Badge key={index} variant={
                                  tag.includes("Logo") ? "accent" : 
                                  tag.includes("Wedding") ? "outline" : 
                                  "secondary"
                                }>
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </DialogHeader>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                            <div>
                              <img 
                                src={selectedProject?.image} 
                                alt={selectedProject?.title} 
                                className="w-full h-auto rounded-lg" 
                              />
                            </div>
                            <div>
                              <DialogDescription className="mb-4 text-foreground/80">
                                {selectedProject?.fullDescription || selectedProject?.description}
                              </DialogDescription>
                              
                              {selectedProject?.gallery && (
                                <div className="mt-6">
                                  <h4 className="font-medium mb-2">Project Gallery</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    {selectedProject.gallery.map((img, i) => (
                                      <img 
                                        key={i} 
                                        src={img} 
                                        alt={`${selectedProject.title} gallery ${i}`}
                                        className="rounded-md object-cover aspect-video" 
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default WorkSection;
