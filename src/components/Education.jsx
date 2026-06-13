import React, { useEffect } from 'react';
import AOS from 'aos';
import { LuGraduationCap } from 'react-icons/lu';

export default function Education() {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <section className="relative w-full py-24 bg-zinc-950 overflow-hidden z-10 flex flex-col items-center">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-6 w-full text-center mb-16 relative z-10">
        <span className="text-xs font-mono uppercase tracking-[0.25em] text-luxury-yellow/80" data-aos="fade-up">
          Academic Path
        </span>
        <h3 className="font-display font-bold text-4xl sm:text-5xl uppercase tracking-tight text-white mt-2" data-aos="fade-up" data-aos-delay="100">
          Education Timeline
        </h3>
      </div>

      <div className="max-w-4xl mx-auto px-6 w-full relative z-10">
        {/* Vertical Center Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-[2px] bg-zinc-800" />

        {/* Timeline Items */}
        <div className="space-y-16 relative">

          {/* Milestone 1 */}
          <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
            <div className="w-full md:w-[45%] text-left md:text-right order-2 md:order-1" data-aos="fade-right">
              <span className="text-xs font-mono text-luxury-yellow tracking-wider font-semibold">2024 - Present</span>
              <h4 className="font-display font-bold text-xl text-white mt-1">Computer Engineering Student</h4>
              <p className="text-sm text-zinc-400 mt-2">Specializing in hardware systems, core software architectures, algorithm designs, and logic syntheses.</p>
            </div>

            {/* Center Node */}
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-luxury-yellow/40 flex items-center justify-center text-luxury-yellow relative z-20 order-1 md:order-2 my-4 md:my-0 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              <LuGraduationCap className="text-lg" />
            </div>

            <div className="w-full md:w-[45%] order-3" />
          </div>

          {/* Milestone 2 */}
          <div className="flex flex-col md:flex-row items-center md:justify-between w-full">
            <div className="w-full md:w-[45%] order-1" />

            {/* Center Node */}
            <div className="w-12 h-12 rounded-full bg-zinc-900 border border-luxury-yellow/40 flex items-center justify-center text-luxury-yellow relative z-20 order-2 my-4 md:my-0 shadow-[0_0_15px_rgba(250,204,21,0.2)]">
              <span className="font-display font-bold text-xs">UOP</span>
            </div>

            <div className="w-full md:w-[45%] text-left order-3" data-aos="fade-left">
              <span className="text-xs font-mono text-luxury-yellow tracking-wider font-semibold">Undergraduate Study</span>
              <h4 className="font-display font-bold text-xl text-white mt-1">University of Peradeniya</h4>
              <p className="text-sm text-zinc-400 mt-2">Pursuing a Bachelor of the Science of Engineering, combining foundational scientific theories with advanced experimental applications.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
