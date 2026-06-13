import React from 'react';
import { LuX, LuGithub, LuGlobe } from 'react-icons/lu';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glassmorphism w-full max-w-2xl rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-9 h-9 rounded-full border border-white/10 hover:border-luxury-yellow/50 flex items-center justify-center transition-colors bg-zinc-950/40 z-35"
        >
          <LuX className="text-zinc-400 hover:text-white" />
        </button>

        {/* Left Side (Image) */}
        <div className="w-full md:w-1/2 h-[200px] md:h-auto overflow-hidden relative border-b md:border-b-0 md:border-r border-white/5">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side (Details) */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-between min-h-[300px]">
          <div>
            <h3 className="font-display font-bold text-2xl text-white mb-2 leading-tight">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-400 leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Tags/Tech Stack list */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono tracking-wider px-3 py-1 rounded-full border border-white/5 bg-white/5 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action buttons (Preserving links exactly) */}
          <div className="flex items-center gap-4 border-t border-white/5 pt-6 mt-auto">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-zinc-200 text-zinc-950 font-display font-semibold py-3 rounded-xl transition-all shadow-md text-sm"
            >
              <LuGithub />
              GitHub
            </a>
            
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-luxury-yellow hover:bg-yellow-400 text-zinc-950 font-display font-semibold py-3 rounded-xl transition-all shadow-md text-sm"
              >
                <LuGlobe />
                Live Demo
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
