import React, { useState } from 'react';
import { Service } from '../types';
import { Code2, Layout, Compass, Calendar, FileText, Share2, Palette, Globe, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ExperienceProps {
  services: Service[];
  accent: {
    primaryClass: string;
    bgClass: string;
    badgeBg: string;
    hoverBg: string;
    accentHex: string;
  };
}

export default function Experience({ services, accent }: ExperienceProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Service configuration
  const iconMap: Record<string, React.ReactNode> = {
    Code2: <Code2 className="w-5 h-5 text-zinc-800" />,
    Layout: <Layout className="w-5 h-5 text-zinc-800" />,
    Compass: <Compass className="w-5 h-5 text-zinc-800" />,
    FileText: <FileText className="w-5 h-5 text-zinc-800" />,
    Share2: <Share2 className="w-5 h-5 text-zinc-800" />,
    Palette: <Palette className="w-5 h-5 text-zinc-800" />,
    Globe: <Globe className="w-5 h-5 text-zinc-800" />
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  return (
    <section id="services-section" className="pt-12 pb-20 sm:pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="mb-10 sm:mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase block mb-2 sm:mb-3">Capabilities & Experience</span>
            <h2 className="text-2xl sm:text-4xl font-serif text-zinc-900 tracking-tight">
              How I can help <span className="font-sans font-extrabold italic">Your Brand</span>
            </h2>
          </div>

          {/* Mobile Deck Controls Badge */}
          <div className="flex md:hidden items-center justify-between bg-zinc-50 border border-zinc-200/80 px-3 py-1.5 rounded-full text-xs text-zinc-600 font-mono">
            <span className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-700">
              <Layers className="w-3.5 h-3.5 text-zinc-500" />
              Swipe deck ({activeIndex + 1}/{services.length})
            </span>
            <div className="flex items-center gap-1 ml-2">
              <button
                onClick={handlePrev}
                className="w-7 h-7 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 active:scale-95 shadow-xs cursor-pointer"
                aria-label="Previous service"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-7 h-7 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-zinc-700 active:scale-95 shadow-xs cursor-pointer"
                aria-label="Next service"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP GRID (Medium & Large screens) */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group p-6 rounded-2xl bg-zinc-50 border border-zinc-150 hover:bg-white hover:border-zinc-200 hover:shadow-xs transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white border border-zinc-150 group-hover:scale-105 transition-transform shrink-0">
                    {iconMap[service.iconName] || <Code2 className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-serif font-medium text-zinc-900 group-hover:text-zinc-700 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-zinc-600 text-sm mt-2 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Deliverables tags */}
              <div className="mt-6 pt-4 border-t border-zinc-200/50">
                <span className="text-[10px] font-mono text-zinc-400 block mb-2">DELIVERABLES</span>
                <div className="flex flex-wrap gap-1.5">
                  {service.deliverables.map((item, i) => (
                    <span key={i} className="text-xs text-zinc-600 bg-white border border-zinc-200/60 px-2.5 py-1 rounded-md flex items-center gap-1 font-sans">
                      <span className="w-1 h-1 rounded-full bg-zinc-300" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MOBILE STACKED SWIPEABLE CARDS (Small screens ONLY) */}
        <div className="block md:hidden relative pt-2 pb-6 px-1">
          {/* Deck background stack visual layers */}
          <div className="relative min-h-[380px] w-full flex items-center justify-center">
            {services.map((service, idx) => {
              const offset = (idx - activeIndex + services.length) % services.length;
              
              if (offset > 2) return null;

              const isTop = offset === 0;

              return (
                <motion.div
                  key={service.id}
                  style={{ zIndex: 30 - offset * 10 }}
                  animate={{
                    scale: 1 - offset * 0.05,
                    y: offset * 14,
                    opacity: 1 - offset * 0.25,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  drag={isTop ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.7}
                  onDragEnd={(e, info) => {
                    if (!isTop) return;
                    if (info.offset.x < -60) {
                      handleNext();
                    } else if (info.offset.x > 60) {
                      handlePrev();
                    }
                  }}
                  className={`absolute top-0 left-0 right-0 p-6 rounded-2xl bg-white border border-zinc-250 shadow-md ${
                    isTop ? 'cursor-grab active:cursor-grabbing border-zinc-300 shadow-xl' : 'pointer-events-none'
                  } flex flex-col justify-between select-none min-h-[350px]`}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start gap-3.5 mb-4">
                      <div className="p-3 rounded-xl bg-zinc-50 border border-zinc-200 shrink-0">
                        {iconMap[service.iconName] || <Code2 className="w-5 h-5" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-semibold tracking-wider text-zinc-400 uppercase">
                            0{idx + 1} / 0{services.length}
                          </span>
                          {isTop && (
                            <span className="text-[9px] font-mono text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-amber-500" /> Swipe ↔
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-serif font-semibold text-zinc-950 mt-1 leading-snug">
                          {service.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Deliverables tags */}
                  <div className="mt-5 pt-3.5 border-t border-zinc-150">
                    <span className="text-[9px] font-mono text-zinc-400 block mb-2 font-semibold uppercase">
                      DELIVERABLES
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {service.deliverables.map((item, i) => (
                        <span
                          key={i}
                          className="text-[11px] text-zinc-700 bg-zinc-50 border border-zinc-200/80 px-2.5 py-1 rounded-md flex items-center gap-1 font-sans"
                        >
                          <span className="w-1 h-1 rounded-full bg-zinc-400" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Pagination Indicators & Swipe Controls */}
          <div className="flex items-center justify-between mt-6 px-2">
            <div className="flex items-center gap-1.5">
              {services.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setActiveIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeIndex === dotIdx ? 'w-6 bg-zinc-900' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                  }`}
                  aria-label={`Go to service ${dotIdx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 active:scale-95 transition-all cursor-pointer border border-zinc-200 shadow-xs"
                aria-label="Previous card"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-full bg-zinc-950 hover:bg-zinc-800 text-white active:scale-95 transition-all cursor-pointer shadow-xs"
                aria-label="Next card"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

