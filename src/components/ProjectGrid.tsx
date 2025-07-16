
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
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
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <Leaf className="w-16 h-16 mx-auto text-emerald-400 mb-4" />
        <h3 className="text-xl font-semibold mb-2">No projects found</h3>
        <p className="text-muted-foreground">Try selecting a different category.</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={item}>
          <Card className="group overflow-hidden bg-background/60 backdrop-blur-sm border-emerald-200/50 dark:border-emerald-700/50 hover:border-emerald-400/50 transition-all duration-500 h-full shadow-lg hover:shadow-xl">
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                <Button 
                  asChild
                  variant="secondary" 
                  className="w-full bg-background/80 backdrop-blur-md hover:bg-background/90"
                >
                  <Link to={`/project/${project.id}`}>
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>

            <CardHeader className="p-5">
              <CardTitle className="text-lg font-bold text-emerald-800 dark:text-emerald-200">
                {project.title}
              </CardTitle>
              <div className="flex flex-wrap gap-2 mt-3">
                {project.tags.slice(0, 3).map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-300 text-xs"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className="px-5 pb-5">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProjectGrid;
