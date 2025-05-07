
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Palette, Sparkles, Wand } from "lucide-react";

const HeroSection = () => {
  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center pt-20 pb-20 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-10 w-72 h-72 bg-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div 
          className="w-full md:w-1/2 mb-12 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <motion.div
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 2, 0] 
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 5,
                ease: "easeInOut"
              }}
              className="absolute -top-20 -left-10 text-accent/20"
            >
              <Palette size={80} />
            </motion.div>
            
            <motion.span 
              className="text-accent font-medium inline-block"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi there, I'm
            </motion.span>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold mt-2 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Creative <br />
              <span className="text-gradient">Designer</span> & <span className="relative">
                Developer
                <motion.span 
                  className="absolute -right-12 -top-12 text-accent"
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { repeat: Infinity, duration: 8, ease: "linear" },
                    scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                  }}
                >
                  <Sparkles size={32} />
                </motion.span>
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-foreground/70 text-lg max-w-md mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              I create engaging visual identities and digital experiences that connect brands with their audience through creative design solutions.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <Button 
                asChild 
                size="lg" 
                className="bg-accent hover:bg-accent/90 text-white gap-2 text-base hover-shine"
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
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div
          className="w-full md:w-1/2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-accent to-primary rounded-full opacity-20"
              animate={{ 
                scale: [1, 1.05, 1],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            
            <motion.div 
              className="absolute inset-[5%] bg-gradient-to-tr from-primary/30 to-accent/30 rounded-full"
              animate={{ 
                scale: [1, 1.03, 1],
                rotate: [0, -3, 0]
              }}
              transition={{ 
                duration: 6, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
            
            <motion.div 
              className="absolute inset-[15%] bg-muted rounded-full overflow-hidden flex items-center justify-center shadow-lg"
              animate={{ 
                boxShadow: [
                  "0 0 20px 5px rgba(255,255,255,0.1)", 
                  "0 0 40px 10px rgba(255,255,255,0.2)", 
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
                className="absolute -top-6 -right-6 text-accent"
                animate={{ 
                  rotate: 360,
                  y: [0, 5, 0]
                }}
                transition={{ 
                  rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Wand className="w-12 h-12" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
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
            className="h-10 w-6 border-2 border-accent/30 rounded-full flex justify-center"
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
