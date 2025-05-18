
import { useState, useEffect } from "react";
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
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { LayoutGrid, Palette, Image } from "lucide-react";
import AddEditProjectDialog from "./AddEditProjectDialog";
import { Project } from "@/types/project";

interface WorkSectionProps {
  projects: Project[];
  onSaveProject: (project: Project) => void;
  onDeleteProject: (id: number) => void;
  isAdmin?: boolean;
}

const WorkSection = ({ 
  projects, 
  onSaveProject, 
  onDeleteProject
}: WorkSectionProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("all");
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);
  
  // Update local projects when parent projects change
  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  // Handle local save to ensure immediate UI updates
  const handleSaveProject = (project: Project) => {
    onSaveProject(project);
    // Update local state immediately for better UX
    setLocalProjects(prev => {
      const existingIndex = prev.findIndex(p => p.id === project.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = project;
        return updated;
      } else {
        return [...prev, project];
      }
    });
  };
  
  // Handle local delete for immediate UI updates
  const handleDeleteProject = (id: number) => {
    onDeleteProject(id);
    // Update local state immediately
    setLocalProjects(prev => prev.filter(p => p.id !== id));
  };

  // Fixed the filtering logic to ensure "all" works properly with local projects
  const filteredProjects = activeTab === "all" 
    ? localProjects 
    : localProjects.filter(project => project.category === activeTab);

  return (
    <section id="work" className="py-24 relative bg-gradient-to-b from-background to-muted/30">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>
      
      {/* Decorative circle */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl opacity-60" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-primary/10 blur-3xl opacity-50" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Palette className="w-4 h-4" /> 
            <span>Featured Projects</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-6 leading-tight">
            Selected <span className="text-gradient">Creative Works</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-xl mx-auto">
            Explore my creative journey through various design disciplines - from branding and logo design to digital experiences that leave a lasting impression.
          </p>
        </motion.div>

        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-12"
        >
          <div className="flex justify-center">
            <TabsList className="mb-12 p-1 bg-background/30 backdrop-blur-md border border-border/50 shadow-sm rounded-full">
              <TabsTrigger value="all" className="rounded-full px-6">All Works</TabsTrigger>
              <TabsTrigger value="logo" className="rounded-full px-6">Branding</TabsTrigger>
              <TabsTrigger value="wedding" className="rounded-full px-6">Print</TabsTrigger>
              <TabsTrigger value="web" className="rounded-full px-6">Web</TabsTrigger>
              <TabsTrigger value="app" className="rounded-full px-6">Mobile</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab} className="focus-visible:outline-none focus-visible:ring-0">
            {filteredProjects.length > 0 ? (
              <>
                <motion.div
                  variants={container}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {filteredProjects.map((project) => (
                    <motion.div key={project.id} variants={item}>
                      <Card className="group overflow-hidden bg-background/60 backdrop-blur-sm border-border/50 hover:border-accent/30 transition-all duration-500 h-full flex flex-col">
                        <div className="aspect-[4/3] relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <Dialog>
                              <Button 
                                variant="secondary" 
                                className="w-full bg-background/70 backdrop-blur-md hover:bg-background/90"
                                onClick={() => setSelectedProject(project)}
                              >
                                View Project
                              </Button>
                            </Dialog>
                          </div>
                        </div>

                        <CardHeader className="p-5">
                          <div className="flex justify-between items-start">
                            <CardTitle className="font-heading text-xl">{project.title}</CardTitle>
                            <AddEditProjectDialog 
                              project={project} 
                              onSave={handleSaveProject} 
                              onDelete={handleDeleteProject}
                            />
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {project.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant={
                                tag.includes("Logo") ? "accent" : 
                                tag.includes("Wedding") ? "outline" : 
                                "secondary"
                              } className="text-xs font-medium">
                                {tag}
                              </Badge>
                            ))}
                            {project.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">+{project.tags.length - 3}</Badge>
                            )}
                          </div>
                        </CardHeader>
                        
                        <CardContent className="px-5 pb-0 flex-grow">
                          <CardDescription className="line-clamp-2 text-foreground/60">
                            {project.description}
                          </CardDescription>
                        </CardContent>
                        
                        <CardFooter className="p-5">
                          <Dialog>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-accent hover:bg-accent/10 hover:text-accent p-0 h-auto"
                              onClick={() => setSelectedProject(project)}
                            >
                              View Details →
                            </Button>
                            
                            <DialogContent className="max-w-4xl p-0 overflow-hidden">
                              <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="bg-muted/20">
                                  {selectedProject?.gallery && selectedProject.gallery.length > 0 ? (
                                    <Carousel className="w-full p-6">
                                      <CarouselContent>
                                        <CarouselItem>
                                          <div className="p-1">
                                            <img 
                                              src={selectedProject?.image} 
                                              alt={selectedProject?.title} 
                                              className="w-full h-auto rounded-lg aspect-video object-cover" 
                                            />
                                          </div>
                                        </CarouselItem>
                                        {selectedProject.gallery.map((img, i) => (
                                          <CarouselItem key={i}>
                                            <div className="p-1">
                                              <img 
                                                src={img} 
                                                alt={`${selectedProject.title} gallery ${i}`}
                                                className="w-full h-auto rounded-lg aspect-video object-cover" 
                                              />
                                            </div>
                                          </CarouselItem>
                                        ))}
                                      </CarouselContent>
                                      <CarouselPrevious className="-left-3" />
                                      <CarouselNext className="-right-3" />
                                    </Carousel>
                                  ) : (
                                    <div className="p-6">
                                      <img 
                                        src={selectedProject?.image} 
                                        alt={selectedProject?.title} 
                                        className="w-full h-auto rounded-lg" 
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="p-8 bg-background">
                                  <DialogHeader>
                                    <DialogTitle className="text-2xl font-heading">{selectedProject?.title}</DialogTitle>
                                    <div className="flex flex-wrap gap-2 mt-3">
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
                                  
                                  <div className="mt-6">
                                    <DialogDescription className="text-foreground/80 leading-relaxed">
                                      {selectedProject?.fullDescription || selectedProject?.description}
                                    </DialogDescription>
                                  </div>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
                
                {filteredProjects.length > 9 && (
                  <div className="mt-16 text-center">
                    <Button variant="outline" size="lg" className="rounded-full px-8">
                      View More Projects
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-32 bg-muted/10 rounded-lg border border-dashed border-border">
                <div className="max-w-md mx-auto">
                  <Image className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No projects found</h3>
                  <p className="text-foreground/60 mb-6">
                    There are no projects in the {activeTab === "all" ? "portfolio" : activeTab} category yet.
                  </p>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default WorkSection;
