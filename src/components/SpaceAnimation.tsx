
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const SpaceAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars: { x: number; y: number; radius: number; vx: number; vy: number; opacity: number }[] = [];
    
    // Create stars
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.7 + 0.3
      });
    }
    
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Move stars
        star.x += star.vx;
        star.y += star.vy;
        
        // If star goes off screen, reposition it
        if (star.x < 0 || star.x > canvas.width) {
          star.x = Math.random() * canvas.width;
        }
        if (star.y < 0 || star.y > canvas.height) {
          star.y = Math.random() * canvas.height;
        }
      });
      
      requestAnimationFrame(drawStars);
    };
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener("resize", handleResize);
    drawStars();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
      className="fixed inset-0 w-full h-full -z-20 overflow-hidden"
    >
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/80" />
    </motion.div>
  );
};

export default SpaceAnimation;
