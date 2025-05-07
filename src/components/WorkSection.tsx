
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

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Brand Identity for Tech Startup",
    description: "A complete visual identity system for an emerging tech company, including logo design, color palette, typography, and brand guidelines.",
    image: "/placeholder.svg",
    tags: ["Branding", "Identity", "Logo Design"]
  },
  {
    id: 2,
    title: "E-Commerce Website Redesign",
    description: "Completely redesigned user interface for a fashion e-commerce platform, focusing on improved user experience and conversion rate optimization.",
    image: "/placeholder.svg",
    tags: ["UI/UX", "Web Design", "E-Commerce"]
  },
  {
    id: 3,
    title: "Mobile App for Fitness Tracking",
    description: "Designed a modern, intuitive mobile application for fitness enthusiasts to track workouts, nutrition, and progress over time.",
    image: "/placeholder.svg",
    tags: ["Mobile", "UI Design", "Product Design"]
  },
  {
    id: 4,
    title: "Packaging Design for Organic Food",
    description: "Created distinctive packaging design for a line of organic food products, emphasizing sustainability and natural ingredients.",
    image: "/placeholder.svg",
    tags: ["Packaging", "Print Design", "Illustration"]
  },
  {
    id: 5,
    title: "Social Media Campaign for Fashion Brand",
    description: "Developed a cohesive visual strategy for social media platforms, including post templates, stories, and advertising materials.",
    image: "/placeholder.svg",
    tags: ["Social Media", "Digital Marketing", "Content Creation"]
  },
  {
    id: 6,
    title: "Annual Report Design",
    description: "Designed a visually compelling annual report for a multinational corporation, translating complex data into accessible visuals.",
    image: "/placeholder.svg",
    tags: ["Print", "Editorial", "Data Visualization"]
  }
];

const WorkSection = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
            Explore a collection of my creative projects spanning various design disciplines.
            Each project represents a unique challenge and creative solution.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
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
                      <Badge key={index} variant="outline" className="text-xs">
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
                  <Button 
                    variant="ghost" 
                    className="text-accent hover:text-accent/90 hover:bg-accent/5 p-0"
                    onClick={() => setSelectedProject(project)}
                  >
                    View Project
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
