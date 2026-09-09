import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    // Disable scroll while preloader is active
    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 1800; // 1.8 seconds smooth animation

    const updateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const calculatedProgress = Math.min(Math.floor((elapsed / duration) * 100), 100);

      // Smooth easing curve
      const easedProgress = Math.min(
        Math.floor(100 * Math.sin((calculatedProgress / 100) * (Math.PI / 2))),
        100
      );

      setProgress(easedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      } else {
        setProgress(100);
        setTimeout(() => {
          setIsDone(true);
          document.body.style.overflow = '';
          if (onComplete) onComplete();
        }, 300);
      }
    };

    const animId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animId);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  // Dynamic status message based on progress
  const getStatusMessage = (p) => {
    if (p < 30) return 'Loading Engineering Workflows...';
    if (p < 65) return 'Initializing CAD & BIM Curriculums...';
    if (p < 95) return 'Preparing Placement & Alumni Network...';
    return 'Welcome to CADD Centre Perinthalmanna!';
  };

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[99999] bg-[#070D18] text-white flex flex-col items-center justify-center font-['Plus_Jakarta_Sans',sans-serif] select-none p-4"
        >
          {/* Background Ambient Glow Circles */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#E94B3C]/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 bg-[#3B82F6]/10 blur-[120px] rounded-full pointer-events-none" />

          {/* Center Card Container */}
          <div className="relative flex flex-col items-center text-center max-w-sm w-full z-10">
            
            {/* CADD Centre Logo */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <img
                src="/logo-color.png"
                alt="CADD Centre Perinthalmanna"
                className="h-10 sm:h-12 w-auto object-contain filter drop-shadow-[0_4px_20px_rgba(233,75,60,0.3)]"
              />
            </motion.div>

            {/* Glowing Spinner Ring + 100% Counter Container */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center mb-6">
              
              {/* Outer Counter-Rotating Ring */}
              <svg className="absolute inset-0 w-full h-full animate-[spin_6s_linear_infinite]" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="3"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="url(#spinnerGradient)"
                  strokeWidth="3.5"
                  strokeDasharray="280"
                  strokeDashoffset={280 - (280 * progress) / 100}
                  strokeLinecap="round"
                  className="transition-[stroke-dashoffset] duration-150 ease-out"
                />
                <defs>
                  <linearGradient id="spinnerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E94B3C" />
                    <stop offset="50%" stopColor="#FF7A6C" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Inner Reverse Glow Ring */}
              <div className="absolute inset-3 rounded-full border border-white/10 border-t-[#E94B3C]/80 animate-[spin_3s_linear_infinite_reverse]" />

              {/* Center 0% -> 100% Count Display */}
              <div className="flex flex-col items-center justify-center z-10">
                <motion.span
                  key={progress}
                  initial={{ opacity: 0.8, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-4xl sm:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-[#E94B3C]"
                >
                  {progress}<span className="text-xl sm:text-2xl font-bold text-[#E94B3C]">%</span>
                </motion.span>
              </div>

            </div>

            {/* Horizontal Progress Bar */}
            <div className="w-48 sm:w-56 h-1.5 bg-white/10 rounded-full overflow-hidden mb-4 p-0.5 shadow-inner">
              <motion.div
                className="h-full bg-gradient-to-r from-[#E94B3C] via-[#FF7A6C] to-[#3B82F6] rounded-full shadow-[0_0_12px_rgba(233,75,60,0.8)]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeOut" }}
              />
            </div>

            {/* Status Text Message */}
            <p className="text-xs sm:text-sm font-semibold text-slate-300 transition-all duration-300 h-5">
              {getStatusMessage(progress)}
            </p>

            {/* Sub-label */}
            <span className="mt-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              PERINTHALMANNA CAMPUS
            </span>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
