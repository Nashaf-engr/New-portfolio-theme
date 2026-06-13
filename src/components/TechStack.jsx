import React, { useEffect, useRef } from 'react';
import AOS from 'aos';

export default function TechStack() {
  useEffect(() => {
    AOS.init();
  }, []);

  const stackData = {
    programming: [
      { name: 'Python', icon: '/assets/python_logo_icon_168886.png', color: 'hover:shadow-[0_0_30px_rgba(55,115,166,0.3)] hover:border-[#3773a6]/50' },
      { name: 'C++', icon: '/assets/c++.png', color: 'hover:shadow-[0_0_30px_rgba(0,89,156,0.3)] hover:border-[#00599c]/50' },
      { name: 'JavaScript', icon: '/assets/JavaScript-logo.png', color: 'hover:shadow-[0_0_30px_rgba(247,223,30,0.3)] hover:border-[#f7df1e]/50' }
    ],
    web: [
      { name: 'HTML5', icon: '/assets/HTML5.png', color: 'hover:shadow-[0_0_30px_rgba(227,76,38,0.3)] hover:border-[#e34c26]/50' },
      { name: 'CSS3', icon: '/assets/CSS3.png', color: 'hover:shadow-[0_0_30px_rgba(38,77,228,0.3)] hover:border-[#264de4]/50' },
      { name: 'React', icon: '/assets/React.png', color: 'hover:shadow-[0_0_30px_rgba(97,218,251,0.3)] hover:border-[#61dafb]/50' }
    ],
    design: [
      { name: 'Photoshop', icon: '/assets/adobe-photoshop-logo.png', color: 'hover:shadow-[0_0_30px_rgba(49,197,244,0.3)] hover:border-[#31c5f4]/50' },
      { name: 'Illustrator', icon: '/assets/Adobe_Illustrator_CC_icon.svg.png', color: 'hover:shadow-[0_0_30px_rgba(255,154,0,0.3)] hover:border-[#ff9a00]/50' },
      { name: 'Canva', icon: '/assets/canva-icon.png', color: 'hover:shadow-[0_0_30px_rgba(0,194,203,0.3)] hover:border-[#00c2cb]/50' }
    ]
  };

  return (
    <section className="relative w-full py-24 bg-zinc-950 overflow-hidden z-10 flex flex-col items-center">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-16 relative z-10">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80" data-aos="fade-up">
          Capabilities
        </span>
        <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-2" data-aos="fade-up" data-aos-delay="100">
          Tech Stack Ecosystem
        </h3>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        {/* Desktop View: Interactive Grid of Categories */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Programming Cards */}
          <div className="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="100">
            <h4 className="font-display font-bold text-lg text-zinc-400 uppercase tracking-widest text-center border-b border-white/5 pb-3">
              Programming
            </h4>
            <div className="space-y-4">
              {stackData.programming.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </div>
          </div>

          {/* Web Dev Cards */}
          <div className="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="200">
            <h4 className="font-display font-bold text-lg text-zinc-400 uppercase tracking-widest text-center border-b border-white/5 pb-3">
              Web Development
            </h4>
            <div className="space-y-4">
              {stackData.web.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </div>
          </div>

          {/* Design Cards */}
          <div className="flex flex-col gap-6" data-aos="fade-up" data-aos-delay="300">
            <h4 className="font-display font-bold text-lg text-zinc-400 uppercase tracking-widest text-center border-b border-white/5 pb-3">
              Design Tools
            </h4>
            <div className="space-y-4">
              {stackData.design.map((tech) => (
                <TechCard key={tech.name} tech={tech} />
              ))}
            </div>
          </div>

        </div>

        {/* Mobile View: Swipeable Horizontal Carousel */}
        <div className="md:hidden flex overflow-x-auto gap-6 pb-6 px-4 snap-x snap-mandatory scrollbar-none w-full">
          {Object.entries(stackData).map(([category, items]) => (
            <div key={category} className="min-w-[280px] snap-center bg-zinc-900/40 border border-white/5 p-6 rounded-3xl flex flex-col gap-4">
              <h4 className="font-display font-bold text-base text-zinc-400 uppercase tracking-wider border-b border-white/5 pb-2 capitalize">
                {category === 'web' ? 'Web Development' : category}
              </h4>
              <div className="space-y-3">
                {items.map((tech) => (
                  <div key={tech.name} className="flex items-center gap-4 bg-zinc-950/60 p-3 rounded-2xl border border-white/5">
                    <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain" />
                    <span className="font-display font-semibold text-white text-sm">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// 3D Mouse Tilt Interactive Card (Desktop)
function TechCard({ tech }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xc = rect.width / 2;
    const yc = rect.height / 2;

    const angleX = -(y - yc) / 10;
    const angleY = (x - xc) / 10;

    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.02)`;
    // Update local CSS coordinates for mouse-tracking glow
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex items-center gap-5 bg-zinc-900/30 border border-white/5 p-5 rounded-2xl transition-all duration-300 ease-out select-none cursor-pointer overflow-hidden ${tech.color}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Spot radial hover light effect via css variables */}
      <div 
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: 'radial-gradient(150px circle at var(--mouse-x, 0) var(--mouse-y, 0), rgba(255, 255, 255, 0.05), transparent)'
        }}
      />
      
      <img
        src={tech.icon}
        alt={tech.name}
        className="w-12 h-12 object-contain pointer-events-none transition-transform duration-500 ease-out"
        style={{ transform: 'translateZ(20px)' }}
      />
      <span
        className="font-display font-semibold text-lg text-white/90 pointer-events-none"
        style={{ transform: 'translateZ(10px)' }}
      >
        {tech.name}
      </span>
    </div>
  );
}
