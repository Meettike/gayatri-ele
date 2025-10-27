import { useEffect, useRef } from "react";

export const ElectricalBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Circuit nodes
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      });
    }

    // Energy particles
    const particles: { x: number; y: number; speed: number; opacity: number }[] = [];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height + Math.random() * 200,
        speed: 0.5 + Math.random() * 1.5,
        opacity: Math.random(),
      });
    }

    let animationFrame: number;
    let time = 0;

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw flowing energy waves
      ctx.strokeStyle = "rgba(0, 217, 255, 0.1)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 5) {
          const y = canvas.height / 2 + 
            Math.sin(x * 0.01 + time * 2 + i * 0.8) * 80 +
            Math.sin(x * 0.005 + time + i) * 40;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0, 217, 255, ${0.15 - i * 0.02})`;
        ctx.stroke();
      }

      // Draw energy spirals
      for (let i = 0; i < 3; i++) {
        const centerX = canvas.width * (0.2 + i * 0.3);
        const centerY = canvas.height * 0.5;
        const radius = 100;
        const spiralSpeed = time + i * 2;
        
        ctx.beginPath();
        for (let angle = 0; angle < Math.PI * 4; angle += 0.1) {
          const r = radius * (angle / (Math.PI * 4));
          const x = centerX + Math.cos(angle + spiralSpeed) * r;
          const y = centerY + Math.sin(angle + spiralSpeed) * r;
          if (angle === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(0, 217, 255, ${0.1 + Math.sin(time + i) * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Update and draw nodes
      nodes.forEach((node, i) => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${0.6 + Math.sin(time + i) * 0.3})`;
        ctx.fill();

        // Draw connections
        nodes.forEach((otherNode, j) => {
          if (i >= j) return;
          const dx = node.x - otherNode.x;
          const dy = node.y - otherNode.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(otherNode.x, otherNode.y);
            const opacity = (1 - distance / 150) * 0.3;
            ctx.strokeStyle = `rgba(0, 217, 255, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();

            // Animated energy flow
            const progress = (time * 2 + i + j) % 1;
            const flowX = node.x + (otherNode.x - node.x) * progress;
            const flowY = node.y + (otherNode.y - node.y) * progress;
            
            ctx.beginPath();
            ctx.arc(flowX, flowY, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, ${0.8 * (1 - distance / 150)})`;
            ctx.fill();
          }
        });
      });

      // Update and draw particles
      particles.forEach((particle) => {
        particle.y -= particle.speed;
        particle.opacity = 0.3 + Math.sin(time * 2 + particle.x) * 0.3;

        if (particle.y < -100) {
          particle.y = canvas.height + 100;
          particle.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 217, 255, ${particle.opacity})`;
        ctx.fill();

        // Particle glow
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          10
        );
        gradient.addColorStop(0, `rgba(0, 217, 255, ${particle.opacity * 0.3})`);
        gradient.addColorStop(1, "rgba(0, 217, 255, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(particle.x - 10, particle.y - 10, 20, 20);
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Flowing energy streams */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs - larger and more dynamic */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-energy-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl animate-energy-pulse" style={{ animationDelay: "1.5s" }} />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl animate-energy-pulse" style={{ animationDelay: "3s" }} />
        
        {/* Flowing organic lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--electric-blue))" stopOpacity="0" />
              <stop offset="50%" stopColor="hsl(var(--electric-blue))" stopOpacity="0.6" />
              <stop offset="100%" stopColor="hsl(var(--electric-blue))" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M 0 300 Q 400 100 800 300 T 1600 300" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-line-glow" />
          <path d="M 0 500 Q 300 700 600 500 T 1200 500" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-line-glow" style={{ animationDelay: "1s" }} />
          <path d="M 200 0 Q 400 300 200 600" stroke="url(#lineGradient)" strokeWidth="2" fill="none" className="animate-line-glow" style={{ animationDelay: "2s" }} />
        </svg>
      </div>

      {/* Canvas for dynamic animation */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
    </>
  );
};
