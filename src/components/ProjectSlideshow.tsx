import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { PROJECTS } from '../data';

export default function ProjectSlideshow() {
  // Triple the projects list to ensure a seamless infinite scrolling sequence
  const duplicatedProjects = [...PROJECTS, ...PROJECTS, ...PROJECTS];

  return (
    <div 
      className="w-full -mt-12 sm:-mt-16 md:-mt-20 overflow-hidden relative py-6 select-none z-20" 
      id="hero-slideshow-container"
    >
      {/* Decorative Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-zinc-200" />
      
      {/* Section Subtitle */}
      <div className="flex justify-between items-center px-4 max-w-7xl mx-auto mb-4 sm:mb-6">
        <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.2em] sm:tracking-[0.3em] text-black uppercase flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-500 animate-pulse" />
          Live Projects Portfolio Tracker
        </span>
        <span className="text-[9px] sm:text-[10px] font-mono tracking-wider text-black uppercase hidden xs:inline">
          Continuous Left-to-Right Loop
        </span>
      </div>

      {/* Marquee Track Container */}
      <div className="relative w-full overflow-hidden flex flex-row">
        {/* Subtle Fade-out Gradients on Left and Right Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />

        {/* Infinite Animation Track (Left to Right) */}
        <motion.div
          className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 whitespace-nowrap cursor-grab active:cursor-grabbing"
          animate={{
            x: ["-50%", "0%"]
          }}
          transition={{
            ease: "linear",
            duration: 35,
            repeat: Infinity,
          }}
          whileHover={{ transition: { duration: 60 } }} // Slows down slightly on hover for editorial inspection
        >
          {duplicatedProjects.map((project, idx) => (
            <div
              key={`${project.id}-${idx}`}
              className="inline-block w-[220px] sm:w-[340px] md:w-[400px] shrink-0 bg-white border border-zinc-200 p-2 rounded-xl shadow-xs group/card transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:hover:border-zinc-350 md:hover:shadow-[0_20px_40px_rgba(0,0,0,0.12)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] bg-zinc-50 border border-zinc-100 rounded-lg overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-all duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:group-hover/card:scale-110 md:group-hover/card:brightness-105 md:group-hover/card:contrast-[1.03]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Decorative Bottom Border Line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-zinc-200" />
    </div>
  );
}

