
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForestAnimation from "@/components/ForestAnimation";
import { TreePine, Mountain, Leaf, Camera } from "lucide-react";

const About = () => {
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
              <Mountain className="w-4 h-4" />
              <span>My Story</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-400 dark:to-green-500 bg-clip-text text-transparent">
              Where Nature Meets Design
            </h1>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1485833077593-4278bba3f11f?auto=format&fit=crop&w=600&q=80"
                  alt="Forest designer portrait"
                  className="rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500 rounded-full opacity-20"></div>
                <div className="absolute -top-6 -left-6 w-16 h-16 border-4 border-amber-400 rounded-full opacity-60"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-emerald-800 dark:text-emerald-200">
                Rooted in Nature, Crafted with Passion
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Deep in the heart of the Pacific Northwest, surrounded by towering evergreens and misty mountain peaks, I discovered my calling. The ancient wisdom of old-growth forests taught me that the most powerful designs emerge from understanding natural patterns.
                </p>
                <p>
                  My journey began with childhood sketches of woodland creatures and has evolved into a comprehensive design philosophy that honors the wild beauty of our natural world. Every project is an opportunity to bridge the gap between digital innovation and timeless natural principles.
                </p>
                <p>
                  I believe that great design, like a thriving ecosystem, must be sustainable, purposeful, and beautiful. This philosophy guides every pixel I place and every story I tell through visual design.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-20"
          >
            <h3 className="text-2xl font-bold text-center mb-12 text-emerald-800 dark:text-emerald-200">
              Skills Grown in the Wild
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: TreePine,
                  title: "Brand Identity",
                  skills: ["Logo Design", "Visual Identity", "Brand Guidelines", "Nature-Inspired Branding"]
                },
                {
                  icon: Leaf,
                  title: "Digital Design",
                  skills: ["Web Design", "App Interfaces", "User Experience", "Responsive Design"]
                },
                {
                  icon: Camera,
                  title: "Visual Storytelling",
                  skills: ["Photography Direction", "Illustration", "Print Design", "Environmental Graphics"]
                }
              ].map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="nature-card p-6 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50"
                >
                  <category.icon className="w-8 h-8 text-emerald-600 mb-4" />
                  <h4 className="text-lg font-semibold mb-3 text-emerald-800 dark:text-emerald-200">
                    {category.title}
                  </h4>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
