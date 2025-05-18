
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { LayoutGrid, Palette, Image, PlusCircle } from "lucide-react";
import AddEditProjectDialog from "./AddEditProjectDialog";
import { Project } from "@/types/project";

interface WorkSectionProps {
  projects: Project[];
  onSaveProject: (project: Project) => void;
  onDeleteProject: (id: number) => void;
  isAdmin?: boolean; // Kept for backward compatibility
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
    console.log("Projects updated in WorkSection:", projects);
  }, [projects]);

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
    <section id="work" className="py-20 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center gap-2 bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium mb-4">
            <Palette className="w-4 h-4" /> 
            <span>Creative Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold mt-2 mb-6">
            Selected <span className="text-gradient">Works</span>
          </h2>
          <p className="text-foreground/70 text-lg max-w-xl mx-auto">
            Explore my creative projects spanning various design disciplines,
            from logo design to wedding stationery and large-format printing.
          </p>
          
          {/* Add New Project Button (available to everyone) */}
          <div className="mt-8">
            <AddEditProjectDialog onSave={handleSaveProject}>
              <Button size="lg" className="group hover-shine">
                <PlusCircle className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
                Add New Work
              </Button>
            </AddEditProjectDialog>
          </div>
        </motion.div>

        <Tabs 
          defaultValue="all" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-12"
        >
          <div className="flex justify-center">
            <TabsList className="mb-12 p-1 bg-background/50 backdrop-blur-sm border border-border/50 shadow-sm">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" /> All Works
              </TabsTrigger>
              <TabsTrigger value="logo" className="flex items-center gap-2">
                <Palette className="w-4 h-4" /> Logo Design
              </TabsTrigger>
              <TabsTrigger value="wedding" className="flex items-center gap-2">
                <Image className="w-4 h-4" /> Wedding Cards
              </TabsTrigger>
              <TabsTrigger value="printing" className="flex items-center gap-2">
                <Image className="w-4 h-4" /> Printing
              </TabsTrigger>
              <TabsTrigger value="web" className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" /> Web Design
              </TabsTrigger>
              <TabsTrigger value="app" className="flex items-center gap-2">
                <LayoutGrid className="w-4 h-4" /> App Design
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value={activeTab}>
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
                      <Card className="group overflow-hidden backdrop-blur-sm border-border/50 hover:border-accent/50 transition-all duration-300 card-shadow">
                        <div className="aspect-video relative overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  variant="secondary" 
                                  className="w-full bg-background/60 backdrop-blur-md hover:bg-background/80"
                                  onClick={() => setSelectedProject(project)}
                                >
                                  View Details
                                </Button>
                              </DialogTrigger>
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
                        <CardContent className="px-5 pb-0">
                          <CardDescription className="line-clamp-2 text-foreground/60">
                            {project.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter className="p-5 pt-4">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="text-accent hover:text-accent/90 hover:bg-accent/5 p-0 h-auto"
                                onClick={() => setSelectedProject(project)}
                              >
                                View Project
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl p-0 overflow-hidden">
                              <div className="grid grid-cols-1 lg:grid-cols-2">
                                <div className="bg-muted/30">
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
                                <div className="p-6 bg-background">
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
                                    <DialogDescription className="text-foreground/80">
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
                
                {/* Add a "Load More" button if needed in the future */}
                {filteredProjects.length > 9 && (
                  <div className="mt-12 text-center">
                    <Button variant="outline" size="lg">
                      Load More Projects
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20 bg-muted/20 rounded-lg border border-dashed border-border">
                <div className="max-w-md mx-auto">
                  <Image className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No projects found</h3>
                  <p className="text-foreground/60 mb-6">
                    There are no projects in the {activeTab === "all" ? "portfolio" : activeTab} category yet.
                    Add your first project to get started.
                  </p>
                  
                  {/* Add New Project button available when no projects exist in category */}
                  <AddEditProjectDialog 
                    onSave={(project) => {
                      handleSaveProject({
                        ...project,
                        category: activeTab === "all" ? project.category : activeTab as any
                      });
                    }}
                  >
                    <Button size="lg" className="hover-shine">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Add Your First Project
                    </Button>
                  </AddEditProjectDialog>
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
