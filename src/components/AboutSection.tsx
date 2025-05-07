
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const skills = [
  "Brand Identity Design",
  "UI/UX Design",
  "Web Design",
  "Mobile App Design",
  "Package Design",
  "Typography",
  "Illustration",
  "Motion Graphics"
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="aspect-[4/5] rounded-lg overflow-hidden">
                <img 
                  src="/placeholder.svg" 
                  alt="Designer portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-accent rounded-full -z-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-secondary rounded-full -z-10"></div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-accent font-medium">About Me</span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-2 mb-6">
              Passionate designer creating meaningful experiences
            </h2>
            <div className="space-y-4 text-foreground/70">
              <p>
                I'm a graphic designer and visual storyteller with over 8 years of experience. My passion lies in creating designs that not only look beautiful but also solve real-world problems and connect with audiences on a deeper level.
              </p>
              <p>
                My approach combines strategic thinking with creative execution. I believe that great design should be both visually striking and functionally effective, serving both the client's objectives and the end user's needs.
              </p>
              <p>
                When I'm not designing, you'll find me exploring new creative techniques, attending design workshops, or seeking inspiration in nature and architecture.
              </p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-heading font-semibold mb-4">My Skills</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="flex items-center gap-2"
                  >
                    <CheckCircle className="h-5 w-5 text-accent" />
                    <span>{skill}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
