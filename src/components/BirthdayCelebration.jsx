import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Wind } from 'lucide-react';
import { triggerCelebrationConfetti, triggerWishSparkles } from '../utils/confetti';

export default function BirthdayCelebration({ onContinue }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesLit && wishMade) return;
    
    setCandlesLit(false);
    triggerWishSparkles();
    setTimeout(() => {
      triggerCelebrationConfetti();
      setWishMade(true);
    }, 400);
  };

  return (
    <motion.section
      key="birthday-celebration"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 py-12 z-10 overflow-hidden"
    >
      {/* Floating Dreamy Blue Balloons */}
      <div className="absolute left-3 sm:left-12 top-10 pointer-events-none opacity-80 animate-balloon-1">
        <svg width="60" height="110" viewBox="0 0 60 110" fill="none">
          <ellipse cx="30" cy="35" rx="25" ry="32" fill="url(#balloonBlue1)" />
          <path d="M28 67 L32 67 L30 71 Z" fill="#60A5FA" />
          <path d="M30 71 Q25 85 32 95 T30 110" stroke="#93C5FD" strokeWidth="1.2" fill="none" opacity="0.6"/>
          <ellipse cx="23" cy="24" rx="4" ry="9" fill="white" opacity="0.35" transform="rotate(-20 23 24)"/>
          <defs>
            <radialGradient id="balloonBlue1" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#BAE6FD"/>
              <stop offset="60%" stop-color="#60A5FA"/>
              <stop offset="100%" stop-color="#1E40AF"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute right-4 sm:right-16 top-16 pointer-events-none opacity-75 animate-balloon-2">
        <svg width="50" height="100" viewBox="0 0 50 100" fill="none">
          <ellipse cx="25" cy="30" rx="20" ry="26" fill="url(#balloonBlue2)" />
          <path d="M23 56 L27 56 L25 60 Z" fill="#93C5FD" />
          <path d="M25 60 Q28 72 22 82 T25 98" stroke="#93C5FD" strokeWidth="1.2" fill="none" opacity="0.6"/>
          <ellipse cx="19" cy="20" rx="3" ry="7" fill="white" opacity="0.4" transform="rotate(-20 19 20)"/>
          <defs>
            <radialGradient id="balloonBlue2" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stop-color="#E0F2FE"/>
              <stop offset="60%" stop-color="#93C5FD"/>
              <stop offset="100%" stop-color="#2563EB"/>
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Header Titles */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-skyBlue bg-skyBlue/10 border border-skyBlue/20 mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          A Special Celebration
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-glow text-softWhite mb-3">
          Happy Birthday, Sowmiya! <span className="text-primaryBlue">💙</span>
        </h2>
        <p className="text-skyBlue/90 text-base sm:text-xl font-light">
          Today is all about celebrating you.
        </p>
      </motion.div>

      {/* Birthday Cake Illustration & Interactive Candles */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="relative my-4 cursor-pointer group"
        onClick={handleBlowCandles}
        title={candlesLit ? "Click the candles to make a wish!" : "Wish made!"}
      >
        <div className="relative w-72 h-64 sm:w-80 sm:h-72 flex flex-col items-center justify-end">
          {/* Subtle Cake Glow Aura */}
          <div className="absolute inset-x-8 bottom-6 h-36 bg-primaryBlue/20 rounded-full blur-2xl pointer-events-none" />

          {/* SVG Birthday Cake */}
          <svg className="w-full h-full overflow-visible" viewBox="0 0 280 240" fill="none">
            {/* Cake Stand */}
            <ellipse cx="140" cy="216" rx="90" ry="12" fill="#0E274A" stroke="#38BDF8" strokeWidth="1.5" />
            <path d="M120 216 L124 232 L156 232 L160 216 Z" fill="#0B1F3A" stroke="#38BDF8" strokeWidth="1.2" />
            <ellipse cx="140" cy="232" rx="32" ry="5" fill="#38BDF8" opacity="0.3" />

            {/* Bottom Tier */}
            <path d="M50 170 Q140 186 230 170 L230 205 Q140 222 50 205 Z" fill="url(#cakeBottomGrad)" stroke="#60A5FA" strokeWidth="1.5" />
            {/* Frosting drips bottom tier */}
            <path d="M50 170 Q70 184 90 174 Q110 188 135 174 Q160 188 185 174 Q205 186 230 170" fill="none" stroke="#BAE6FD" strokeWidth="3" opacity="0.8" />

            {/* Top Tier */}
            <path d="M75 125 Q140 138 205 125 L205 165 Q140 178 75 165 Z" fill="url(#cakeTopGrad)" stroke="#60A5FA" strokeWidth="1.5" />
            {/* Frosting drips top tier */}
            <path d="M75 125 Q95 136 115 127 Q140 139 165 128 Q185 137 205 125" fill="none" stroke="#BAE6FD" strokeWidth="3" opacity="0.85" />

            {/* Top Surface */}
            <ellipse cx="140" cy="125" rx="65" ry="14" fill="#1E3A8A" stroke="#93C5FD" strokeWidth="1.5" />

            {/* Little pearl accents */}
            <circle cx="95" cy="128" r="2.5" fill="#FFFFFF" opacity="0.9" />
            <circle cx="120" cy="132" r="2.5" fill="#BAE6FD" opacity="0.9" />
            <circle cx="140" cy="133" r="3" fill="#FFFFFF" opacity="0.9" />
            <circle cx="160" cy="132" r="2.5" fill="#BAE6FD" opacity="0.9" />
            <circle cx="185" cy="128" r="2.5" fill="#FFFFFF" opacity="0.9" />

            {/* Candle 1 (Left) */}
            <rect x="110" y="82" width="6" height="34" rx="2" fill="url(#candleGrad)" stroke="#60A5FA" strokeWidth="0.8" />
            {/* Candle 2 (Center - taller) */}
            <rect x="137" y="74" width="6.5" height="42" rx="2" fill="url(#candleGrad)" stroke="#93C5FD" strokeWidth="0.8" />
            {/* Candle 3 (Right) */}
            <rect x="164" y="82" width="6" height="34" rx="2" fill="url(#candleGrad)" stroke="#60A5FA" strokeWidth="0.8" />

            {/* Candle Wicks */}
            <line x1="113" y1="82" x2="113" y2="76" stroke="#475569" strokeWidth="1.5" />
            <line x1="140.25" y1="74" x2="140.25" y2="67" stroke="#475569" strokeWidth="1.5" />
            <line x1="167" y1="82" x2="167" y2="76" stroke="#475569" strokeWidth="1.5" />

            {/* Candle Flames or Smoke */}
            {candlesLit ? (
              <g className="animate-candle-flame">
                {/* Flame 1 */}
                <ellipse cx="113" cy="67" rx="4.5" ry="9" fill="url(#flameGrad)" />
                <ellipse cx="113" cy="68" rx="2" ry="5" fill="#FFFFFF" opacity="0.9" />

                {/* Flame 2 (Center) */}
                <ellipse cx="140.25" cy="57" rx="5.5" ry="11" fill="url(#flameGrad)" />
                <ellipse cx="140.25" cy="58" rx="2.5" ry="6" fill="#FFFFFF" opacity="0.95" />

                {/* Flame 3 */}
                <ellipse cx="167" cy="67" rx="4.5" ry="9" fill="url(#flameGrad)" />
                <ellipse cx="167" cy="68" rx="2" ry="5" fill="#FFFFFF" opacity="0.9" />
              </g>
            ) : (
              <g className="animate-smoke">
                {/* Gentle Wispy Smoke */}
                <path d="M113 74 C110 68 116 62 112 55" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
                <path d="M140.25 65 C137 57 144 50 139 42" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7"/>
                <path d="M167 74 C164 68 170 62 166 55" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6"/>
              </g>
            )}

            {/* Gradients */}
            <defs>
              <linearGradient id="cakeBottomGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#1E3A8A"/>
                <stop offset="100%" stop-color="#0F172A"/>
              </linearGradient>
              <linearGradient id="cakeTopGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#2563EB"/>
                <stop offset="100%" stop-color="#172554"/>
              </linearGradient>
              <linearGradient id="candleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#BAE6FD"/>
                <stop offset="50%" stop-color="#F0F9FF"/>
                <stop offset="100%" stop-color="#7DD3FC"/>
              </linearGradient>
              <radialGradient id="flameGrad" cx="50%" cy="65%" r="65%">
                <stop offset="0%" stop-color="#FFFFFF"/>
                <stop offset="25%" stop-color="#FDE047"/>
                <stop offset="70%" stop-color="#F97316"/>
                <stop offset="100%" stop-color="#EF4444" stop-opacity="0.2"/>
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Interactive Candle Hint */}
        {candlesLit && (
          <p className="text-xs text-skyBlue/70 group-hover:text-softWhite transition-colors duration-200 mt-2 flex items-center justify-center gap-1">
            <Wind className="w-3.5 h-3.5 text-iceBlue animate-bounce" />
            Tap the cake or click Make a Wish to blow the candles
          </p>
        )}
      </motion.div>

      {/* Button to Make a Wish */}
      <AnimatePresence mode="wait">
        {!wishMade ? (
          <motion.div
            key="wish-button"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mt-6"
          >
            <button
              onClick={handleBlowCandles}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-base font-medium text-midnightBlue bg-gradient-to-r from-iceBlue via-skyBlue to-primaryBlue shadow-candle hover:scale-105 active:scale-95 transition-all duration-300 font-sans"
            >
              <Sparkles className="w-5 h-5 text-midnightBlue animate-spin-slow" />
              Make a Wish ✨
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="wish-revealed"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto mt-6 px-6 py-6 rounded-2xl glass-card border border-skyBlue/30 shadow-glow-md"
          >
            <p className="font-serif italic text-lg sm:text-2xl text-softWhite leading-relaxed mb-6">
              "I hope this new chapter of your life brings you happiness, beautiful memories, and countless reasons to smile."
            </p>

            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm sm:text-base font-medium text-softWhite bg-primaryBlue/40 hover:bg-primaryBlue/60 border border-skyBlue/40 hover:border-skyBlue transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm"
            >
              Step Into Our Story
              <ArrowRight className="w-4 h-4 text-iceBlue" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
