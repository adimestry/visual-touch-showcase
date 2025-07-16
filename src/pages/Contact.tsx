
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForestAnimation from "@/components/ForestAnimation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { TreeDeciduous, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent! I'll respond within the forest whispers...");
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <TreeDeciduous className="w-4 h-4" />
              <span>Get In Touch</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-green-700 dark:from-emerald-400 dark:to-green-500 bg-clip-text text-transparent">
              Let's Create Something Wild
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ready to bring your vision to life with nature-inspired design? Let's start a conversation.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="nature-card p-8 rounded-2xl border border-emerald-200/50 dark:border-emerald-700/50">
                <h3 className="text-2xl font-bold mb-6 text-emerald-800 dark:text-emerald-200">
                  Connect Through Nature's Network
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">Email</h4>
                      <p className="text-muted-foreground">hello@wildpixels.design</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">Phone</h4>
                      <p className="text-muted-foreground">+1 (555) 123-WILD</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-emerald-800 dark:text-emerald-200">Location</h4>
                      <p className="text-muted-foreground">Pacific Northwest, USA</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80"
                  alt="Forest workspace"
                  className="rounded-2xl shadow-lg w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent rounded-2xl"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-emerald-800 dark:text-emerald-200">Your Name</Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Forest Explorer"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-emerald-800 dark:text-emerald-200">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="explorer@wilderness.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-500"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-emerald-800 dark:text-emerald-200">Project Type</Label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Brand Identity / Web Design / Campaign"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-500"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-emerald-800 dark:text-emerald-200">Tell Me About Your Vision</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Share your project dreams and let's explore how nature can inspire your design..."
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="border-emerald-200 dark:border-emerald-700 focus:border-emerald-500"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-6 text-base rounded-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending Through the Forest..." : "Send Message"}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
