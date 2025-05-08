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
  onDeleteProject, 
  isAdmin = false 
}: WorkSectionProps) => {
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

  // Fixed the filtering logic to ensure "all" works properly
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
          
          {/* Add New Project Button (Admin only) */}
          {isAdmin && (
            <div className="mt-6">
              <AddEditProjectDialog onSave={onSaveProject} isAdmin={isAdmin} />
            </div>
          )}
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
              <TabsTrigger value="web">Web Design</TabsTrigger>
              <TabsTrigger value="app">App Design</TabsTrigger>
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
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
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
                        <div className="flex justify-between items-start">
                          <CardTitle className="font-heading">{project.title}</CardTitle>
                          {isAdmin && (
                            <AddEditProjectDialog 
                              project={project} 
                              onSave={onSaveProject} 
                              onDelete={onDeleteProject}
                              isAdmin={isAdmin}
                            />
                          )}
                        </div>
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
                                
                                {selectedProject?.gallery && selectedProject.gallery.length > 0 && (
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
                ))
              ) : (
                <div className="col-span-3 text-center py-10">
                  <p className="text-foreground/60 mb-4">No projects found in this category.</p>
                  {isAdmin && (
                    <AddEditProjectDialog 
                      onSave={(project) => {
                        onSaveProject({
                          ...project,
                          category: activeTab === "all" ? project.category : activeTab as any
                        });
                      }} 
                      isAdmin={isAdmin}
                    />
                  )}
                </div>
              )}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default WorkSection;
