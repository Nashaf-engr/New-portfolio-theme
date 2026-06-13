import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LuFolderOpen, LuArrowUpRight } from 'react-icons/lu';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: "Portfolio Website",
    image: "/assets/portfolio-website.png",
    description: "A personal portfolio focused on responsive layout, clean sections, and clear storytelling.",
    github: "https://github.com/Nashaf-engr/Portfolio",
    demo: "https://github.com/Nashaf-engr/Portfolio",
    tags: ["React", "TailwindCSS", "HTML", "JavaScript"]
  },
  {
    id: 2,
    title: "Smart Plant Monitoring System",
    image: "/assets/smart-plantation.png",
    description: "An Arduino-based monitoring concept for temperature, humidity, and soil moisture with a practical hardware focus.",
    github: "https://smart-plant-monitoring-a-v2npbp4.gamma.site/",
    demo: "https://smart-plant-monitoring-a-v2npbp4.gamma.site/",
    tags: ["Arduino", "Sensors", "IoT", "C++"]
  },
  {
    id: 3,
    title: "BMI Calculator",
    image: "/assets/bmi web.png",
    description: "A modern calculator UI for quick health metric checks.",
    github: "https://github.com/Nashaf-engr/BMI-Calculator",
    demo: "https://github.com/Nashaf-engr/BMI-Calculator",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 4,
    title: "Restaurant Website",
    image: "/assets/resturant-website.png",
    description: "A concept site designed to present food, atmosphere, and menu-driven content.",
    github: "https://github.com/Nashaf-engr/Sample-website-for-resturant",
    demo: "https://github.com/Nashaf-engr/Sample-website-for-resturant",
    tags: ["HTML", "CSS", "Responsive Design"]
  },
  {
    id: 5,
    title: "Travel Agency Website",
    image: "/assets/travel agency.png",
    description: "A tourism-focused web design with destination-led presentation and booking intent.",
    github: "https://github.com/Nashaf-engr/Travel-agency-website",
    demo: "https://github.com/Nashaf-engr/Travel-agency-website",
    tags: ["HTML", "CSS", "UX Design"]
  }
];

export default function Projects({ onSelectProject }) {
  const sectionRef = useRef(null);
  const folderRef = useRef(null);
  const [folderOpen, setFolderOpen] = useState(false);

  useEffect(() => {
    // Desktop folder opening ScrollTrigger
    const folderTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 40%',
      end: 'bottom 20%',
      onToggle: (self) => {
        setFolderOpen(self.isActive);
      }
    });

    // Animate cards rise and spread when folder opens
    if (folderOpen) {
      gsap.to('.project-card-3d', {
        y: (i) => -150 - (i % 2) * 50,
        x: (i) => (i - 2) * 160,
        rotationZ: (i) => (i - 2) * 5,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
      });
    } else {
      // Return cards inside the folder
      gsap.to('.project-card-3d', {
        y: 0,
        x: 0,
        rotationZ: 0,
        opacity: 0,
        scale: 0.85,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power3.in'
      });
    }

    return () => {
      folderTrigger.kill();
    };
  }, [folderOpen]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full min-h-screen py-24 bg-zinc-900/20 overflow-hidden z-10 flex flex-col items-center justify-center"
    >
      {/* Background Watermark */}
      <div className="absolute left-[-5%] top-[10%] pointer-events-none select-none opacity-[0.01] z-0 font-display font-extrabold text-[22vw] tracking-tighter text-white uppercase leading-none">
        MY WORK
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-16 relative z-10">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80">
          Selected Work
        </span>
        <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-2">
          Projects Showcase
        </h3>
      </div>

      {/* Desktop Layout: 3D Folder Explosion System */}
      <div className="hidden md:flex relative w-full h-[600px] flex-col items-center justify-end z-10">
        {/* Floating Cards (positioned relative to folder) */}
        <div className="absolute bottom-[240px] flex items-center justify-center w-full h-0">
          {projectsData.map((project, index) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="project-card-3d absolute w-[260px] h-[340px] rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl cursor-pointer opacity-0 scale-85 transition-all duration-300 hover:border-luxury-yellow/50 hover:shadow-[0_15px_40px_rgba(250,204,21,0.1)] hover:scale-105 active:scale-95"
              style={{ transformOrigin: 'bottom center' }}
            >
              <div className="w-full h-[150px] overflow-hidden border-b border-white/5 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 flex flex-col justify-between h-[190px]">
                <div>
                  <h4 className="font-display font-bold text-white text-base leading-tight">
                    {project.title}
                  </h4>
                  <p className="text-zinc-400 text-xs mt-2 line-clamp-3">
                    {project.description}
                  </p>
                </div>
                <div className="flex items-center justify-between text-xs text-luxury-yellow font-display font-semibold border-t border-white/5 pt-3">
                  <span>View Details</span>
                  <LuArrowUpRight className="text-base" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Paper Archive Folder Graphic (Hinged system) */}
        <div
          ref={folderRef}
          onClick={() => setFolderOpen(!folderOpen)}
          className="relative w-[340px] h-[220px] rounded-t-3xl bg-yellow-600/20 border-2 border-dashed border-luxury-yellow/30 p-6 flex flex-col items-center justify-center text-center cursor-pointer shadow-2xl hover:bg-yellow-600/30 transition-colors"
        >
          {/* Dashboard corner bracket accents */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-luxury-yellow" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-luxury-yellow" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-luxury-yellow" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-luxury-yellow" />

          <LuFolderOpen className={`text-5xl text-luxury-yellow mb-3 transition-transform duration-500 ${folderOpen ? 'scale-110' : 'scale-100'}`} />
          <span className="font-display font-bold text-white uppercase tracking-wider text-sm">
            {folderOpen ? 'Archive Open' : 'Open Project Vault'}
          </span>
          <span className="text-[10px] font-mono text-zinc-500 mt-1 uppercase">
            {folderOpen ? 'Scroll down to close' : 'Click / Scroll to explore'}
          </span>
        </div>
      </div>

      {/* Mobile Layout: Snap Carousel */}
      <div className="md:hidden flex overflow-x-auto gap-6 px-6 pb-8 snap-x snap-mandatory scrollbar-none w-full">
        {projectsData.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="min-w-[80vw] snap-center rounded-3xl bg-zinc-900 border border-white/5 overflow-hidden shadow-xl"
          >
            <div className="w-full h-[180px] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 flex flex-col justify-between min-h-[180px]">
              <div>
                <h4 className="font-display font-bold text-white text-lg">{project.title}</h4>
                <p className="text-zinc-400 text-xs mt-2 line-clamp-3">{project.description}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-luxury-yellow font-display font-semibold border-t border-white/5 pt-4 mt-4">
                <span>View Details</span>
                <LuArrowUpRight />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
