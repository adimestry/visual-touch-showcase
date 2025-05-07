
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center pt-20 pb-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-10 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-accent font-medium">Hi there, I'm</span>
            <h1 className="text-4xl md:text-6xl font-heading font-bold mt-2 mb-4">
              Creative <br />
              <span className="text-accent">Designer</span> & Developer
            </h1>
            <p className="text-foreground/70 text-lg max-w-md mb-8">
              I create engaging visual identities and digital experiences that connect brands with their audience.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white gap-2 text-base"
              >
                <motion.a 
                  href="#work"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View My Work <ArrowRight className="h-4 w-4" />
                </motion.a>
              </Button>
              <Button 
                asChild
                size="lg" 
                variant="outline" 
                className="border-accent text-accent hover:text-accent/90 hover:bg-accent/5 text-base"
              >
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.a>
              </Button>
            </div>
          </motion.div>
        </div>
        
        <div className="w-full md:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full"></div>
              <div className="absolute inset-4 bg-gradient-to-br from-accent to-secondary rounded-full opacity-10"></div>
              <motion.div 
                className="absolute inset-[10%] bg-muted rounded-full overflow-hidden flex items-center justify-center"
                animate={{ 
                  boxShadow: [
                    "0 0 20px 5px rgba(255,255,255,0.1)", 
                    "0 0 30px 8px rgba(255,255,255,0.2)", 
                    "0 0 20px 5px rgba(255,255,255,0.1)"
                  ]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }}
              >
                <img
                  src="/placeholder.svg"
                  alt="Designer portrait"
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  className="absolute top-0 right-0 m-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Star className="text-accent w-8 h-8 opacity-70" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-foreground/50 mb-2">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-10 w-6 border-2 border-foreground/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-2 w-2 bg-accent rounded-full mt-2"
            ></motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
