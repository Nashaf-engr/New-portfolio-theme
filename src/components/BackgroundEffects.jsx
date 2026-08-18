import { useEffect, useRef } from 'react';

export default function BackgroundEffects() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.25 + 0.05;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        if (this.y < -10) {
          this.reset();
        }
      }

      draw() {
        ctx.fillStyle = `rgba(31, 223, 100, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const count = Math.min(30, Math.floor(window.innerWidth / 45));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
      particles[i].y = Math.random() * canvas.height;
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* Ambient Glow Spheres with subtle green/indigo blend */}
      <div className="absolute top-[10%] left-[-10%] w-[45vw] h-[45vw] max-w-[500px] rounded-full bg-accent/5 blur-[140px] animate-pulse duration-[8000ms] ease-in-out" />
      <div className="absolute bottom-[20%] right-[-10%] w-[40vw] h-[40vw] max-w-[450px] rounded-full bg-indigo-600/5 blur-[130px]" />
      <div className="absolute top-[50%] left-[35%] w-[30vw] h-[30vw] max-w-[350px] rounded-full bg-accent/3 blur-[150px]" />

      {/* Floating Canvas Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 z-5" />
    </div>
  );
}
