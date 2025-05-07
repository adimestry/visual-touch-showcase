
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
    
    // Create more stars with varying properties for a richer background
    const stars: {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      opacity: number;
      hue: number;
    }[] = [];
    
    // Create stars with color variations
    for (let i = 0; i < 200; i++) {
      const radius = Math.random() * 2.2;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        opacity: Math.random() * 0.7 + 0.3,
        hue: Math.random() * 60 + 200 // Blue to purple range
      });
    }
    
    // Add some larger, special stars
    for (let i = 0; i < 20; i++) {
      const radius = Math.random() * 2.5 + 1.5;
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: radius,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.5 + 0.5,
        hue: Math.random() * 60 + 50 // Warm color range
      });
    }
    
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Add a subtle gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, "rgba(20, 10, 40, 0.2)");
      gradient.addColorStop(1, "rgba(10, 10, 30, 0.2)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        // Pulsating effect
        const pulse = Math.sin(Date.now() * 0.001 + star.x + star.y) * 0.1 + 0.9;
        
        // Draw glow effect
        const glow = ctx.createRadialGradient(
          star.x, star.y, 0, 
          star.x, star.y, star.radius * 4
        );
        glow.addColorStop(0, `hsla(${star.hue}, 80%, 80%, ${star.opacity * 0.5 * pulse})`);
        glow.addColorStop(1, `hsla(${star.hue}, 80%, 80%, 0)`);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        
        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue}, 80%, 80%, ${star.opacity})`;
        ctx.fill();
        
        // Move stars
        star.x += star.vx;
        star.y += star.vy;
        
        // If star goes off screen, reposition it
        if (star.x < -star.radius * 4) star.x = canvas.width + star.radius * 4;
        if (star.x > canvas.width + star.radius * 4) star.x = -star.radius * 4;
        if (star.y < -star.radius * 4) star.y = canvas.height + star.radius * 4;
        if (star.y > canvas.height + star.radius * 4) star.y = -star.radius * 4;
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/90" />
    </motion.div>
  );
};

export default SpaceAnimation;
