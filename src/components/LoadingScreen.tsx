import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface LoadingScreenProps {
  onComplete?: () => void;
  minDuration?: number; // minimum loading time in ms (default: 2000ms)
}

export default function LoadingScreen({ onComplete, minDuration = 2200 }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const intervalTime = 25; // updates every 25ms

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      // Calculate realistic ease-out loading progression
      const rawProgress = Math.min((elapsed / minDuration) * 100, 100);
      
      setProgress(Math.round(rawProgress));

      if (elapsed >= minDuration) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => {
          setIsFinished(true);
          if (onComplete) {
            onComplete();
          }
        }, 350);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [minDuration, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          id="app-loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-zinc-950 text-white selection:bg-transparent cursor-wait overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] bg-gradient-to-br from-zinc-700/20 via-zinc-800/10 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Center Stage: Animated Logo & Identity */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo Container with Smooth Pulse & Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 15 }}
              animate={{ 
                scale: 1, 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
              }}
              className="relative group mb-6"
            >
              {/* Outer decorative breathing ring */}
              <motion.div 
                animate={{
                  scale: [1, 1.12, 1],
                  opacity: [0.25, 0.5, 0.25]
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -inset-2.5 rounded-2xl bg-white/10 blur-md pointer-events-none"
              />

              {/* Logo Frame */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-b from-white/30 via-white/10 to-white/5 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)] backdrop-blur-md flex items-center justify-center">
                <motion.img 
                  src="https://res.cloudinary.com/zaunf8hr/image/upload/v1789024716/watermark_nu32sl.png" 
                  alt="James Ramirez Logo"
                  referrerPolicy="no-referrer"
                  initial={{ rotate: -8, scale: 0.9 }}
                  animate={{ 
                    rotate: [0, 2, -2, 0],
                    scale: 1
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut" 
                  }}
                  className="w-full h-full object-contain p-1 rounded-[14px]"
                />
              </div>
            </motion.div>

            {/* Name & Role Reveal */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.6 }}
              className="text-center mb-8 space-y-1"
            >
              <h2 className="text-base sm:text-lg font-serif font-semibold tracking-tight text-zinc-100 flex items-center justify-center gap-2">
                <span>James Ramirez</span>
                <span className="inline-flex items-center rounded-[2px] overflow-hidden border border-white/20 shadow-xs w-4 h-2.5 shrink-0 opacity-85">
                  <svg width="16" height="10" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <rect width="24" height="8" fill="#0038A8" />
                    <rect y="8" width="24" height="8" fill="#CE1126" />
                    <polygon points="0,0 12,8 0,16" fill="#FFFFFF" />
                    <circle cx="4.2" cy="8" r="1.5" fill="#FCD116" />
                    <circle cx="2" cy="3" r="0.5" fill="#FCD116" />
                    <circle cx="2" cy="13" r="0.5" fill="#FCD116" />
                    <circle cx="9" cy="8" r="0.5" fill="#FCD116" />
                  </svg>
                </span>
              </h2>
              <p className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-zinc-400">
                Portfolio Showcase
              </p>
            </motion.div>

            {/* Sleek Modern Loading Bar */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="w-48 sm:w-56 flex flex-col items-center gap-2.5"
            >
              <div className="w-full h-1 bg-zinc-800/80 rounded-full overflow-hidden p-0 border border-white/10 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-zinc-400 via-white to-zinc-200 rounded-full shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.1 }}
                />
              </div>

              {/* Monospaced Progress Percentage */}
              <div className="w-full flex justify-between items-center text-[10px] font-mono text-zinc-400 px-0.5">
                <span className="tracking-wider uppercase text-zinc-400">Loading</span>
                <span className="font-semibold text-zinc-300">{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Minimalist Bottom Footprint */}
          <div className="absolute bottom-6 text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
            Curated Works &bull; 2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
