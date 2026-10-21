import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Moon, Stars } from 'lucide-react';

export default function OpeningScreen({ onOpenSurprise }) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants respecting accessibility preferences
  const fadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: (customDelay = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: shouldReduceMotion ? 0 : customDelay,
        duration: shouldReduceMotion ? 0.2 : 0.85,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <motion.section
      key="opening-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: shouldReduceMotion ? 1 : 0.98, 
        filter: shouldReduceMotion ? 'none' : 'blur(6px)' 
      }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.75, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[calc(100dvh-80px)] w-full max-w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-12 z-10 overflow-x-hidden"
    >
      {/* Decorative Moon & Constellation Emblem */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.15}
        className="relative mb-6 sm:mb-8"
      >
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-primaryBlue/20 via-skyBlue/15 to-transparent border border-skyBlue/35 flex items-center justify-center shadow-glow-md backdrop-blur-md">
          <Moon className="w-9 h-9 sm:w-12 sm:h-12 text-iceBlue animate-float" />
          <Stars className="w-4 h-4 sm:w-5 sm:h-5 text-primaryBlue absolute -top-1 -right-1 animate-twinkle" />
        </div>
      </motion.div>

      {/* Main Salutation */}
      <motion.h1
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.35}
        className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-glow text-softWhite mb-6 max-w-full break-words px-2"
      >
        Hey, Sowmi <span className="inline-block text-primaryBlue">💙</span>
      </motion.h1>

      {/* Tender Subtitle with Cinematic Spacing */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.6}
        className="max-w-xl mx-auto mb-10 px-2"
      >
        {/* Line 1 */}
        <p className="text-skyBlue/85 font-light text-base sm:text-xl tracking-wide leading-relaxed">
          Some people enter our lives quietly...
        </p>

        {/* Line 2 with breathing room */}
        <p className="text-softWhite/95 font-normal text-lg sm:text-2xl tracking-wide leading-relaxed mt-3 sm:mt-4">
          and somehow become a beautiful part of our story.
        </p>

        {/* Subtle Line: Muted-blue elegant typography */}
        <p className="text-xs sm:text-sm text-skyBlue/70 font-sans tracking-wide italic mt-6 flex items-center justify-center gap-1.5">
          <span>A little blue universe, made just for your day. ✨</span>
        </p>
      </motion.div>

      {/* Primary Action Button: "Open Your Surprise ✨" */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0.85}
        className="relative"
      >
        {/* Soft Ambient Radial Glow Behind Button */}
        <div 
          className="absolute -inset-1 rounded-full bg-gradient-to-r from-primaryBlue/40 via-skyBlue/50 to-iceBlue/40 opacity-70 blur-md pointer-events-none transition-opacity duration-500 group-hover:opacity-100 animate-pulse-glow" 
          aria-hidden="true"
        />

        <motion.button
          onClick={onOpenSurprise}
          whileHover={shouldReduceMotion ? {} : { scale: 1.04, boxShadow: "0 0 35px rgba(96, 165, 250, 0.55)" }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
          className="group relative min-h-[52px] sm:min-h-[56px] inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full text-base sm:text-lg font-medium text-softWhite bg-gradient-to-r from-primaryBlue/85 via-skyBlue/75 to-primaryBlue/85 border border-iceBlue/60 shadow-glow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-skyBlue/60 focus:ring-offset-2 focus:ring-offset-midnightBlue cursor-pointer"
          aria-label="Open your birthday surprise"
        >
          <span className="relative z-10 flex items-center gap-2 font-sans tracking-wide">
            Open Your Surprise
            <Sparkles className="w-5 h-5 text-iceBlue group-hover:rotate-12 transition-transform duration-300" />
          </span>
          {/* Subtle Shimmer Overlay on Hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </motion.button>
      </motion.div>

      {/* Gentle Bottom Aesthetic Cue */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ delay: shouldReduceMotion ? 0 : 1.2, duration: 0.8 }}
        className="mt-12 sm:mt-16 text-[11px] sm:text-xs tracking-widest uppercase text-skyBlue/55 font-sans"
      >
        Crafted for someone genuinely special • A Little Universe
      </motion.p>
    </motion.section>
  );
}
