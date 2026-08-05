import React from 'react';
import { motion } from 'motion/react';

export default function WaveDivider() {
  return (
    <div className="w-full overflow-hidden leading-none bg-white py-0 my-0 select-none pointer-events-none relative">
      <div className="w-full h-[140px] sm:h-[160px] md:h-[180px] relative">
        <svg
          className="w-full h-full block"
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Back Wave - Layered motion, lower opacity */}
          <motion.path
            fill="#f4f4f5"
            fillOpacity="0.65"
            animate={{
              d: [
                "M0,90 Q 360,40 720,100 T 1440,90 L1440,180 L0,180 Z",
                "M0,110 Q 360,130 720,70 T 1440,115 L1440,180 L0,180 Z",
                "M0,80 Q 360,100 720,120 T 1440,85 L1440,180 L0,180 Z",
                "M0,90 Q 360,40 720,100 T 1440,90 L1440,180 L0,180 Z"
              ]
            }}
            transition={{
              duration: 22,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />

          {/* Front Wave - Main smooth organic curve */}
          <motion.path
            fill="#e4e4e7"
            fillOpacity="0.45"
            animate={{
              d: [
                "M0,120 Q 360,150 720,95 T 1440,125 L1440,180 L0,180 Z",
                "M0,95 Q 360,75 720,135 T 1440,100 L1440,180 L0,180 Z",
                "M0,110 Q 360,130 720,85 T 1440,115 L1440,180 L0,180 Z",
                "M0,120 Q 360,150 720,95 T 1440,125 L1440,180 L0,180 Z"
              ]
            }}
            transition={{
              duration: 18,
              ease: "easeInOut",
              repeat: Infinity
            }}
          />
        </svg>
      </div>
    </div>
  );
}
