import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out-cubic'
    });
  }, []);

  return (
    <section
      id="about"
      className="relative w-full py-24 bg-zinc-950 overflow-hidden z-10 flex items-center justify-center"
    >
      {/* Background Watermark */}
      <div className="absolute right-[-5%] top-[10%] pointer-events-none select-none opacity-[0.01] z-0 font-display font-extrabold text-[28vw] tracking-tighter text-white uppercase leading-none">
        ABOUT
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-start relative z-10">
        
        {/* Left Side: Storytelling Column */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <span 
              className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80"
              data-aos="fade-up"
            >
              About Me
            </span>
            <h3 
              className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white leading-tight"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Engineering discipline <br />
              with a <span className="text-gradient-yellow">designer's eye</span>.
            </h3>
          </div>

          <div 
            className="space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <p>
              I enjoy turning ideas into polished, useful experiences. My background in computer engineering helps me think structurally, while my design practice helps me shape interfaces that feel expressive and human.
            </p>
            <p>
              I am especially interested in responsive websites, visual storytelling, and practical projects that mix software, creativity, and real-world problem solving.
            </p>
          </div>
        </div>

        {/* Right Side: Metrics Panel Glass Cards */}
        <div className="lg:col-span-5 space-y-6">
          
          <div 
            className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-luxury-yellow/20 hover:shadow-[0_15px_30px_rgba(250,204,21,0.02)] transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <span className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Focus</span>
            <span className="font-display font-bold text-lg text-white">
              Modern front-end experiences
            </span>
          </div>

          <div 
            className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-luxury-yellow/20 hover:shadow-[0_15px_30px_rgba(250,204,21,0.02)] transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <span className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Tools</span>
            <span className="font-display font-bold text-lg text-white">
              HTML, CSS, JavaScript, React
            </span>
          </div>

          <div 
            className="glassmorphism p-8 rounded-3xl border border-white/5 hover:border-luxury-yellow/20 hover:shadow-[0_15px_30px_rgba(250,204,21,0.02)] transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <span className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Creative Stack</span>
            <span className="font-display font-bold text-lg text-white">
              Photoshop, Illustrator, Canva
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
