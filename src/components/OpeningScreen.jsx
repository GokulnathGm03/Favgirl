import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Stars } from 'lucide-react';

export default function OpeningScreen({ onOpenSurprise }) {
  return (
    <motion.section
      key="opening-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 z-10"
    >
      {/* Decorative Moon & Constellation Emblem */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        className="relative mb-8"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-primaryBlue/20 via-skyBlue/15 to-transparent border border-skyBlue/30 flex items-center justify-center shadow-glow-md backdrop-blur-md">
          <Moon className="w-10 h-10 sm:w-12 sm:h-12 text-iceBlue animate-float" />
          <Stars className="w-5 h-5 text-primaryBlue absolute -top-1 -right-1 animate-twinkle" />
        </div>
      </motion.div>

      {/* Main Salutation */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-glow text-softWhite mb-6"
      >
        Hey, Sowmi <span className="inline-block text-primaryBlue">💙</span>
      </motion.h1>

      {/* Tender Subtitle */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.65, duration: 0.9 }}
        className="max-w-xl mx-auto space-y-2 mb-10 text-skyBlue/90 font-light text-base sm:text-xl leading-relaxed"
      >
        <p className="tracking-wide">
          Some people enter our lives quietly...
        </p>
        <p className="text-softWhite/95 font-normal">
          and somehow become a beautiful part of our story.
        </p>
      </motion.div>

      {/* Action Button */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <button
          onClick={onOpenSurprise}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full text-base sm:text-lg font-medium text-softWhite bg-gradient-to-r from-primaryBlue/80 via-skyBlue/70 to-primaryBlue/80 border border-iceBlue/50 shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-skyBlue/50"
        >
          <span className="relative z-10 flex items-center gap-2">
            Open Your Surprise
            <Sparkles className="w-5 h-5 text-iceBlue group-hover:rotate-12 transition-transform duration-300" />
          </span>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        </button>
      </motion.div>

      {/* Gentle Scroll / Explore Cue */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.3, duration: 1 }}
        className="mt-14 text-xs tracking-widest uppercase text-skyBlue/60 font-sans"
      >
        Crafted for someone genuinely special • A Little Universe
      </motion.p>
    </motion.section>
  );
}
