
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, TreePine, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForestAnimation from "@/components/ForestAnimation";

const ProjectDetail = () => {
  const { id } = useParams();
  
  // Mock project data - in a real app, this would be fetched based on ID
  const project = {
    id: 1,
    title: "Woodland Spirits Logo",
    description: "Mystical logo design for eco-friendly startup featuring ancient tree symbolism and ethereal elements.",
    image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80",
    tags: ["Logo Design", "Branding", "Nature"],
    category: "logo",
    fullDescription: "This enchanting logo captures the essence of woodland magic, combining ancient tree wisdom with modern design principles. The organic curves and natural color palette create a timeless brand identity that speaks to both environmental consciousness and innovative thinking.",
    gallery: [
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80"
    ],
    process: [
      "Research and concept development",
      "Sketching and ideation",
      "Digital refinement",
      "Color palette exploration",
      "Final implementation"
    ],
    tools: ["Adobe Illustrator", "Photoshop", "Figma"],
    year: "2024",
    client: "EcoTech Innovations"
  };

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
            className="mb-8"
          >
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/portfolio" className="flex items-center gap-2 text-emerald-600">
                <ArrowLeft className="w-4 h-4" />
                Back to Portfolio
              </Link>
            </Button>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-2xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">
                <TreePine className="w-4 h-4" />
                <span>{project.category}</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-400 dark:to-green-500 bg-clip-text text-transparent">
                {project.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <Badge 
                    key={index} 
                    variant="outline"
                    className="border-emerald-300 text-emerald-700 dark:border-emerald-600 dark:text-emerald-300"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Client</h3>
                  <p className="text-muted-foreground">{project.client}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-2">Year</h3>
                  <p className="text-muted-foreground">{project.year}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-emerald-800 dark:text-emerald-200 mb-3">Tools Used</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, index) => (
                    <Badge key={index} variant="secondary">
                      {tool}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                <ExternalLink className="w-4 h-4" />
                View Live Project
              </Button>
            </motion.div>
          </div>

          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-8">Project Gallery</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={image}
                    alt={`${project.title} - Image ${index + 1}`}
                    className="w-full aspect-[4/3] object-cover rounded-xl shadow-lg"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="nature-card p-8 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50"
          >
            <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-200 mb-6">Design Process</h2>
            <div className="space-y-4">
              {project.process.map((step, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProjectDetail;
