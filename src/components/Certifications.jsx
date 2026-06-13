import React, { useState, useEffect } from 'react';
import gsap from 'gsap';

const certificationsData = [
  {
    provider: "Google via Coursera",
    title: "Introduction to AI",
    category: "ai",
    url: "https://www.coursera.org/account/accomplishments/verify/7IT9T9F4FSG1"
  },
  {
    provider: "Google via Coursera",
    title: "Maximize Productivity With AI Tools",
    category: "productivity",
    url: "https://www.coursera.org/account/accomplishments/verify/WLLSOTNRZLZX"
  },
  {
    provider: "Google via Coursera",
    title: "Discover the Art of Prompting",
    category: "ai",
    url: "https://www.coursera.org/account/accomplishments/verify/UAZDU6PM0CVF"
  },
  {
    provider: "Coursera",
    title: "Use Canva to Design Digital Course Collateral",
    category: "design",
    url: "https://www.coursera.org/account/accomplishments/verify/YOLIMSTGFCNV"
  },
  {
    provider: "Canva",
    title: "Canva Essentials",
    category: "design",
    url: "https://www.canva.com/design-school/certification-award/443c0855-46ad-4663-8080-4788524b044e"
  },
  {
    provider: "Alison",
    title: "Graphic Design - Visual and Graphic Design",
    category: "design",
    url: "https://alison.com/verify/d54a627364"
  },
  {
    provider: "LinkedIn Learning",
    title: "Introduction to Prompt Engineering for Generative AI",
    category: "ai",
    url: "https://www.linkedin.com/learning/certificates/713d8e25dbae9e47d16c06ece518b322a5902b2759fb89682e2b17d3027ce693"
  },
  {
    provider: "LinkedIn Learning",
    title: "Tips to Work with Difficult People",
    category: "professional",
    url: "https://www.linkedin.com/learning/certificates/3fb23e40ab005ed1cdaea9350672f877911a27aadc3f6e4a0b101cf69d6ad53c"
  }
];

export default function Certifications() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filterChips = [
    { label: 'All', id: 'all' },
    { label: 'AI', id: 'ai' },
    { label: 'Design', id: 'design' },
    { label: 'Productivity', id: 'productivity' },
    { label: 'Professional', id: 'professional' }
  ];

  // Apply smooth scale animations when filters change
  useEffect(() => {
    gsap.fromTo('.cert-card-animate',
      { opacity: 0, scale: 0.95, y: 15 },
      { opacity: 1, scale: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeFilter]);

  const filteredCerts = certificationsData.filter((cert) => {
    return activeFilter === 'all' || cert.category === activeFilter;
  });

  return (
    <section
      id="certifications"
      className="relative w-full py-24 bg-zinc-950 overflow-hidden z-10 flex flex-col items-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-12">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80">
          Recognition
        </span>
        <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-2">
          Certificates & Courses
        </h3>
      </div>

      {/* Filter Chips Bar */}
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-wrap justify-center gap-3 mb-10 z-10">
        {filterChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setActiveFilter(chip.id)}
            className={`font-display text-xs font-semibold uppercase tracking-wider px-5 py-3 rounded-full border transition-all duration-300 ${
              activeFilter === chip.id
                ? 'bg-luxury-yellow text-zinc-950 border-transparent shadow-[0_0_15px_rgba(250,204,21,0.3)] scale-105'
                : 'bg-zinc-900/40 text-zinc-400 border-white/5 hover:border-luxury-yellow/30 hover:text-white'
            }`}
          >
            {chip.label}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 z-10">
        {filteredCerts.map((cert, idx) => (
          <a
            key={idx}
            href={cert.url}
            target="_blank"
            rel="noreferrer"
            className="cert-card-animate glassmorphism p-6 rounded-2xl border border-white/5 hover:border-luxury-yellow/40 flex flex-col justify-between min-h-[160px] shadow-lg transition-all duration-300 hover:-translate-y-1 group"
          >
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                {cert.provider}
              </span>
              <h4 className="font-display font-bold text-white text-base leading-snug group-hover:text-luxury-yellow transition-colors">
                {cert.title}
              </h4>
            </div>
            
            <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-6">
              <span className="text-[9px] font-mono uppercase text-zinc-500 tracking-wider">
                {cert.category}
              </span>
              <span className="text-[10px] font-display font-semibold text-luxury-yellow group-hover:underline">
                Verify Link
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
