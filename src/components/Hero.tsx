import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, MapPin, Sparkles, Send, MoveDown } from 'lucide-react';
import { motion } from 'motion/react';
import ProjectSlideshow from './ProjectSlideshow';

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  location: string;
  accent: {
    primaryClass: string;
    bgClass: string;
    badgeBg: string;
    hoverBg: string;
    accentHex: string;
  };
}

export default function Hero({ name, title, bio, location, accent }: HeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHoveredImg, setIsHoveredImg] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    const section = sectionRef.current;
    const spotlight = spotlightRef.current;
    if (!section || !spotlight) return;

    let animationFrameId: number;
    let isFirstMove = true;
    
    const tick = () => {
      const ease = 0.12; // Fluid and premium easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * ease;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * ease;

      if (spotlight) {
        spotlight.style.setProperty('--x', `${mouseRef.current.x}px`);
        spotlight.style.setProperty('--y', `${mouseRef.current.y}px`);
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouseRef.current.targetX = x;
      mouseRef.current.targetY = y;
      
      if (isFirstMove) {
        mouseRef.current.x = x;
        mouseRef.current.y = y;
        isFirstMove = false;
      }
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      isFirstMove = true;
    };

    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseenter', handleMouseEnter);
    section.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseenter', handleMouseEnter);
      section.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isReducedMotion]);

  return (
    <section
      id="hero-section"
      ref={sectionRef}
      className="relative min-h-[70vh] sm:min-h-[75vh] flex items-center justify-center overflow-hidden bg-white pt-16 sm:pt-20 pb-8 sm:pb-10"
    >
      {/* Premium Spotlight Pointer Effect (Desktop/Tablet ONLY) */}
      {!isReducedMotion && (
        <>
          <style dangerouslySetInnerHTML={{ __html: `
            #hero-spotlight {
              --spotlight-radius: 350px;
            }
            @media (min-width: 1024px) {
              #hero-spotlight {
                --spotlight-radius: 500px;
              }
            }
            @keyframes glow-pulse {
              0%, 100% {
                transform: scale(0.98);
                opacity: 0.90;
              }
              50% {
                transform: scale(1.02);
                opacity: 1.00;
              }
            }
          `}} />
          <div
            id="hero-spotlight"
            ref={spotlightRef}
            className="absolute inset-0 pointer-events-none z-20 transition-opacity duration-300 hidden md:block"
            style={{
              opacity: isVisible ? 1 : 0,
              background: 'radial-gradient(var(--spotlight-radius) circle at var(--x, 0px) var(--y, 0px), rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0.22) 25%, rgba(255, 255, 255, 0.12) 50%, rgba(255, 255, 255, 0.05) 75%, transparent 100%)',
            }}
          />
        </>
      )}

      {/* Subtle Ribbed Glass Texture Background Layer */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backgroundImage: 'repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0px, rgba(255, 255, 255, 0.05) 1px, rgba(255, 255, 255, 0.03) 1px, rgba(255, 255, 255, 0.03) 11px)',
          opacity: 0.30,
          maskImage: 'radial-gradient(circle at center, black 25%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(circle at center, black 25%, transparent 75%)',
        }}
      />

      {/* Editorial Grid Lines Accent */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="max-w-7xl mx-auto h-full px-6 sm:px-8 grid grid-cols-4 md:grid-cols-12 gap-6">
          <div className="border-l border-zinc-200 h-full col-span-1" />
          <div className="border-l border-zinc-200 h-full col-span-3 hidden md:block" />
          <div className="border-l border-zinc-200 h-full col-span-4 hidden md:block" />
          <div className="border-l border-zinc-200 h-full col-span-4 border-r hidden md:block" />
        </div>
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col items-center justify-center">
        
        {/* Giant Bold Background Name */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex flex-col items-center justify-center -translate-y-12 xs:-translate-y-16 sm:-translate-y-32 md:-translate-y-44 lg:-translate-y-56 xl:-translate-y-64 pointer-events-none select-none z-0 overflow-hidden"
        >
          <h1 
            className="text-[16vw] xs:text-[18vw] sm:text-[22vw] md:text-[24vw] leading-[0.82] tracking-tighter text-black uppercase text-center font-black"
            style={{ 
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              textShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04)'
            }}
          >
            <div>JAMES</div>
            <div>RAMIREZ</div>
          </h1>
        </motion.div>

        {/* Front and Center Image */}
        <div 
          className="relative w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[600px] md:max-w-[800px] aspect-[4/5] z-10 group/img-container"
          onMouseEnter={() => setIsHoveredImg(true)}
          onMouseLeave={() => setIsHoveredImg(false)}
        >
          {/* Premium Ambient Outer Glow Behind the Portrait */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 ease-out z-0"
            style={{
              opacity: isHoveredImg ? 1.15 : 1.0,
            }}
          >
            <div 
              className="w-full h-full"
              style={{
                animation: isReducedMotion ? 'none' : 'glow-pulse 14s ease-in-out infinite',
                transformOrigin: 'center center',
              }}
            >
              {/* Layer 1: rgba(255,255,255,0.20) blur 80px */}
              <div 
                className="absolute inset-10 rounded-full bg-white opacity-20"
                style={{ filter: 'blur(80px)' }}
              />
              {/* Layer 2: rgba(255,255,255,0.12) blur 140px */}
              <div 
                className="absolute inset-4 rounded-full bg-white opacity-12"
                style={{ filter: 'blur(140px)' }}
              />
              {/* Layer 3: rgba(255,255,255,0.06) blur 220px */}
              <div 
                className="absolute -inset-10 rounded-full bg-white opacity-6"
                style={{ filter: 'blur(220px)' }}
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full rounded-xl overflow-hidden group z-10"
            id="hero-image-wrapper"
          >
            <img
              src="https://res.cloudinary.com/zaunf8hr/image/upload/v1788445689/3d_avatar_mwzia8.png"
              alt="James Ramirez"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover grayscale-10 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700 ease-out"
              id="hero-img"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)',
                maskImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 1) 85%, rgba(0, 0, 0, 0) 100%)',
                filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.18)) drop-shadow(0 0 40px rgba(255,255,255,0.08))',
              }}
            />
            {/* Soft white gradient fade at the bottom of the portrait so it naturally blends into the Portfolio Tracker */}
            <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none z-20" />
          </motion.div>
        </div>

        {/* Continuous sliding project placeholders below the image to remove negative space */}
        <ProjectSlideshow />

      </div>
    </section>
  );
}
