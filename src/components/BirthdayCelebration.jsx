import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Wind } from 'lucide-react';
import { triggerCelebrationConfetti, triggerWishSparkles } from '../utils/confetti';

export default function BirthdayCelebration({ onContinue }) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [wishMade, setWishMade] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const handleBlowCandles = () => {
    if (!candlesLit && wishMade) return;
    
    setCandlesLit(false);
    triggerWishSparkles();
    setTimeout(() => {
      triggerCelebrationConfetti();
      setWishMade(true);
    }, 400);
  };

  const handleKeyDownCake = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleBlowCandles();
    }
  };

  return (
    <motion.section
      key="birthday-celebration"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.8 }}
      className="relative min-h-[calc(100dvh-80px)] w-full max-w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 py-8 sm:py-12 z-10 overflow-x-hidden"
    >
      {/* ========================================================
          DECORATIVE BALANCED PASTEL BALLOONS (Framing the Heading)
          Palette:
          - Pastel Pink: #F9A8D4
          - Lavender: #C4B5FD
          - Soft Peach: #FDBA9B
          - Powder Blue: #BFDBFE
          ======================================================== */}
      
      {/* Left Cluster 1: Pastel Pink Balloon (Top-Left) */}
      <div 
        className="absolute left-2 sm:left-8 lg:left-14 top-4 sm:top-8 pointer-events-none opacity-85 animate-balloon-1 z-0"
        aria-hidden="true"
      >
        <svg width="56" height="115" viewBox="0 0 56 115" fill="none" className="w-10 sm:w-14 h-auto overflow-visible">
          <ellipse cx="28" cy="34" rx="24" ry="30" fill="url(#balloonPink)" />
          <path d="M26 64 L30 64 L28 68 Z" fill="#F472B6" />
          <path d="M28 68 Q22 84 30 96 T28 115" stroke="#F9A8D4" strokeWidth="1.2" fill="none" opacity="0.6"/>
          <ellipse cx="20" cy="22" rx="4" ry="9" fill="white" opacity="0.5" transform="rotate(-22 20 22)"/>
        </svg>
      </div>

      {/* Left Cluster 2: Lavender Balloon (Mid-Left) */}
      <div 
        className="absolute left-6 sm:left-20 lg:left-32 top-24 sm:top-28 pointer-events-none opacity-80 animate-balloon-2 z-0 hidden xs:block"
        aria-hidden="true"
      >
        <svg width="46" height="100" viewBox="0 0 46 100" fill="none" className="w-8 sm:w-11 h-auto overflow-visible">
          <ellipse cx="23" cy="28" rx="20" ry="25" fill="url(#balloonLavender)" />
          <path d="M21 53 L25 53 L23 57 Z" fill="#A78BFA" />
          <path d="M23 57 Q26 70 20 82 T23 100" stroke="#C4B5FD" strokeWidth="1.2" fill="none" opacity="0.6"/>
          <ellipse cx="16" cy="18" rx="3.5" ry="7" fill="white" opacity="0.5" transform="rotate(-20 16 18)"/>
        </svg>
      </div>

      {/* Left Cluster 3: Soft Peach Balloon (Lower-Left) */}
      <div 
        className="absolute left-3 sm:left-12 lg:left-20 top-48 sm:top-56 pointer-events-none opacity-75 animate-balloon-1 z-0 hidden md:block"
        aria-hidden="true"
      >
        <svg width="48" height="105" viewBox="0 0 48 105" fill="none" className="w-9 sm:w-12 h-auto overflow-visible">
          <ellipse cx="24" cy="30" rx="21" ry="27" fill="url(#balloonPeach)" />
          <path d="M22 57 L26 57 L24 61 Z" fill="#FB923C" />
          <path d="M24 61 Q20 76 27 88 T24 105" stroke="#FDBA9B" strokeWidth="1.2" fill="none" opacity="0.6"/>
          <ellipse cx="17" cy="20" rx="3.5" ry="8" fill="white" opacity="0.5" transform="rotate(-22 17 20)"/>
        </svg>
      </div>

      {/* Right Cluster 1: Powder Blue Balloon (Top-Right) */}
      <div 
        className="absolute right-2 sm:right-8 lg:right-14 top-4 sm:top-8 pointer-events-none opacity-85 animate-balloon-2 z-0"
        aria-hidden="true"
      >
        <svg width="56" height="115" viewBox="0 0 56 115" fill="none" className="w-10 sm:w-14 h-auto overflow-visible">
          <ellipse cx="28" cy="34" rx="24" ry="30" fill="url(#balloonPowderBlue)" />
          <path d="M26 64 L30 64 L28 68 Z" fill="#93C5FD" />
          <path d="M28 68 Q34 84 26 96 T28 115" stroke="#BFDBFE" strokeWidth="1.2" fill="none" opacity="0.6"/>
          <ellipse cx="21" cy="22" rx="4" ry="9" fill="white" opacity="0.55" transform="rotate(-22 21 22)"/>
        </svg>
      </div>

      {/* Right Cluster 2: Pastel Pink Balloon (Mid-Right) */}
      <div 
        className="absolute right-6 sm:right-20 lg:right-32 top-24 sm:top-28 pointer-events-none opacity-80 animate-balloon-1 z-0 hidden xs:block"
        aria-hidden="true"
      >
        <svg width="46" height="100" viewBox="0 0 46 100" fill="none" className="w-8 sm:w-11 h-auto overflow-visible">
          <ellipse cx="23" cy="28" rx="20" ry="25" fill="url(#balloonPink2)" />
          <path d="M21 53 L25 53 L23 57 Z" fill="#F472B6" />
          <path d="M23 57 Q20 70 26 82 T23 100" stroke="#F9A8D4" strokeWidth="1.2" fill="none" opacity="0.6"/>
          <ellipse cx="17" cy="18" rx="3.5" ry="7" fill="white" opacity="0.5" transform="rotate(-20 17 18)"/>
        </svg>
      </div>

      {/* Right Cluster 3: Lavender Balloon (Lower-Right) */}
      <div 
        className="absolute right-3 sm:right-12 lg:right-20 top-48 sm:top-56 pointer-events-none opacity-75 animate-balloon-2 z-0 hidden md:block"
        aria-hidden="true"
      >
        <svg width="48" height="105" viewBox="0 0 48 105" fill="none" className="w-9 sm:w-12 h-auto overflow-visible">
          <ellipse cx="24" cy="30" rx="21" ry="27" fill="url(#balloonLavender2)" />
          <path d="M22 57 L26 57 L24 61 Z" fill="#A78BFA" />
          <path d="M24 61 Q28 76 21 88 T24 105" stroke="#C4B5FD" strokeWidth="1.2" fill="none" opacity="0.6"/>
          <ellipse cx="18" cy="20" rx="3.5" ry="8" fill="white" opacity="0.5" transform="rotate(-22 18 20)"/>
        </svg>
      </div>

      {/* Header Titles with Floating Ambient Sparkles */}
      <motion.div
        initial={{ y: shouldReduceMotion ? 0 : 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.2 }}
        className="relative z-10 mb-6 sm:mb-8 max-w-2xl mx-auto px-2"
      >
        {/* Celebration Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-iceBlue bg-primaryBlue/15 border border-skyBlue/30 mb-4 shadow-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-iceBlue" />
          A Special Celebration
        </span>

        {/* Large Elegant Serif Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-glow text-softWhite mb-3 break-words">
          Happy Birthday, Sowmiya! <span className="inline-block text-primaryBlue drop-shadow-[0_0_12px_#60A5FA]">💙</span>
        </h2>

        {/* Subtitle */}
        <p className="text-skyBlue/90 text-base sm:text-xl font-light tracking-wide">
          Today is all about celebrating you.
        </p>
      </motion.div>

      {/* ========================================================
          REDESIGNED TWO-TIER BIRTHDAY CAKE (Pastel Palette)
          - Warm cream frosting: #FFF1D6
          - Pastel pink icing drips: #F9A8D4
          - Lavender blossoms: #C4B5FD
          - Soft peach sugar pearls: #FDBA9B
          ======================================================== */}
      <motion.div
        initial={{ scale: shouldReduceMotion ? 1 : 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.35, duration: 0.7 }}
        className="relative z-10 my-2 sm:my-4 cursor-pointer group focus:outline-none"
        onClick={handleBlowCandles}
        onKeyDown={handleKeyDownCake}
        tabIndex={0}
        role="button"
        aria-label={candlesLit ? "Birthday cake with candles lit. Tap or press enter to blow out candles and make a wish." : "Candles extinguished. Wish revealed."}
        title={candlesLit ? "Click the candles or cake to blow them out!" : "Wish made!"}
      >
        <div className="relative w-64 h-60 sm:w-80 sm:h-72 flex flex-col items-center justify-end">
          {/* Soft Pink and Lavender Glow Aura around cake */}
          <div 
            className="absolute inset-x-4 bottom-4 h-44 rounded-full opacity-40 blur-3xl pointer-events-none transition-all duration-700" 
            style={{
              background: 'radial-gradient(circle, rgba(249, 168, 212, 0.45) 0%, rgba(196, 181, 253, 0.35) 50%, rgba(7, 20, 38, 0) 80%)'
            }}
          />

          {/* SVG Two-Tier Birthday Cake Illustration */}
          <svg className="w-full h-full overflow-visible select-none drop-shadow-[0_10px_25px_rgba(7,20,38,0.7)]" viewBox="0 0 280 250" fill="none">
            {/* 1. Luminous Glass/Silver Cake Stand */}
            <ellipse cx="140" cy="222" rx="98" ry="14" fill="#0C2342" stroke="#BAE6FD" strokeWidth="1.8" />
            <ellipse cx="140" cy="220" rx="92" ry="11" fill="url(#standPlateGrad)" />
            {/* Stand Pedestal */}
            <path d="M126 222 L130 238 L150 238 L154 222 Z" fill="#0A1C36" stroke="#93C5FD" strokeWidth="1.2" />
            <ellipse cx="140" cy="238" rx="36" ry="6" fill="#38BDF8" opacity="0.4" />
            <ellipse cx="140" cy="239" rx="38" ry="6" stroke="#BAE6FD" strokeWidth="1" fill="none" opacity="0.6"/>

            {/* 2. TIER 1 (Bottom Tier) - Cream Frosting with Pink Drips & Flowers */}
            {/* Tier 1 Body (Cream) */}
            <path d="M54 168 Q140 186 226 168 L226 210 Q140 228 54 210 Z" fill="url(#creamFrostingBottom)" stroke="#FDBA9B" strokeWidth="1" />
            {/* Tier 1 Shading / Edge Depth */}
            <path d="M54 168 Q140 186 226 168 L226 172 Q140 190 54 172 Z" fill="#FDE68A" opacity="0.3" />

            {/* Pink Icing Drips on Tier 1 */}
            <path 
              d="M54 168 
                 Q68 184 82 172 
                 Q96 190 110 174 
                 Q125 194 140 176 
                 Q155 192 170 174 
                 Q184 188 198 172 
                 Q212 184 226 168 
                 L226 168 Z" 
              fill="url(#pinkIcingGrad)" 
              stroke="#F472B6" 
              strokeWidth="1.2" 
            />

            {/* Tier 1 Top Surface */}
            <ellipse cx="140" cy="168" rx="86" ry="16" fill="#FFF1D6" stroke="#F9A8D4" strokeWidth="1.2" />

            {/* Decorative Lavender Blossom Flowers & Peach Pearls on Bottom Tier */}
            {/* Blossom 1 (Left) */}
            <g transform="translate(78, 186) scale(0.85)">
              <circle cx="-5" cy="0" r="3.8" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="3" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.5" />
            </g>
            {/* Blossom 2 (Center-Left) */}
            <g transform="translate(116, 196) scale(0.9)">
              <circle cx="-5" cy="0" r="3.8" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="3" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.5" />
            </g>
            {/* Blossom 3 (Center-Right) */}
            <g transform="translate(164, 196) scale(0.9)">
              <circle cx="-5" cy="0" r="3.8" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="3" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.5" />
            </g>
            {/* Blossom 4 (Right) */}
            <g transform="translate(202, 186) scale(0.85)">
              <circle cx="-5" cy="0" r="3.8" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="3" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.5" />
            </g>

            {/* Small peach sugar pearls along base */}
            <circle cx="98" cy="198" r="2.2" fill="#FDBA9B" />
            <circle cx="140" cy="204" r="2.8" fill="#FDBA9B" />
            <circle cx="182" cy="198" r="2.2" fill="#FDBA9B" />

            {/* 3. TIER 2 (Top Tier) - Cream Frosting with Pink Drips & Flowers */}
            {/* Tier 2 Body (Cream) */}
            <path d="M78 118 Q140 134 202 118 L202 162 Q140 178 78 162 Z" fill="url(#creamFrostingTop)" stroke="#FDBA9B" strokeWidth="1" />
            
            {/* Pink Icing Drips on Tier 2 */}
            <path 
              d="M78 118 
                 Q92 134 104 122 
                 Q118 140 130 125 
                 Q145 142 160 124 
                 Q174 138 188 122 
                 Q195 130 202 118 
                 L202 118 Z" 
              fill="url(#pinkIcingGrad)" 
              stroke="#F472B6" 
              strokeWidth="1.2" 
            />

            {/* Tier 2 Top Surface */}
            <ellipse cx="140" cy="118" rx="62" ry="14" fill="#FFF1D6" stroke="#F9A8D4" strokeWidth="1.2" />

            {/* Delicate Blossom Accents on Top Tier */}
            <g transform="translate(100, 142) scale(0.8)">
              <circle cx="-5" cy="0" r="3.5" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="3.5" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="3.5" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.5" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="2.8" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.5" />
            </g>
            <g transform="translate(140, 148) scale(0.85)">
              <circle cx="-5" cy="0" r="3.5" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="3.5" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="3.5" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.5" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="2.8" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.5" />
            </g>
            <g transform="translate(180, 142) scale(0.8)">
              <circle cx="-5" cy="0" r="3.5" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="3.5" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="3.5" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.5" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="2.8" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.5" />
            </g>

            {/* Little sugar pearls on top tier surface */}
            <circle cx="106" cy="120" r="2" fill="#FDBA9B" opacity="0.9" />
            <circle cx="124" cy="124" r="2" fill="#C4B5FD" opacity="0.9" />
            <circle cx="156" cy="124" r="2" fill="#C4B5FD" opacity="0.9" />
            <circle cx="174" cy="120" r="2" fill="#FDBA9B" opacity="0.9" />

            {/* 4. THREE ELEGANT CANDLES (Pastel Styling) */}
            {/* Candle 1 (Left - Lavender) */}
            <rect x="110" y="78" width="6.5" height="36" rx="2" fill="url(#candleLavenderGrad)" stroke="#A78BFA" strokeWidth="0.8" />
            <line x1="113.25" y1="78" x2="113.25" y2="72" stroke="#475569" strokeWidth="1.5" />

            {/* Candle 2 (Center - Pastel Pink, slightly taller) */}
            <rect x="136.5" y="68" width="7" height="46" rx="2" fill="url(#candlePinkGrad)" stroke="#F472B6" strokeWidth="0.8" />
            <line x1="140" y1="68" x2="140" y2="61" stroke="#475569" strokeWidth="1.5" />

            {/* Candle 3 (Right - Powder Blue) */}
            <rect x="163" y="78" width="6.5" height="36" rx="2" fill="url(#candleBlueGrad)" stroke="#93C5FD" strokeWidth="0.8" />
            <line x1="166.25" y1="78" x2="166.25" y2="72" stroke="#475569" strokeWidth="1.5" />

            {/* Candle Flames or Smoke Animation */}
            {candlesLit ? (
              <g className="animate-candle-flame">
                {/* Flame 1 (Left) */}
                <ellipse cx="113.25" cy="63" rx="4.5" ry="9.5" fill="url(#flameWarmGrad)" />
                <ellipse cx="113.25" cy="64" rx="2" ry="5.5" fill="#FFFFFF" opacity="0.95" />

                {/* Flame 2 (Center) */}
                <ellipse cx="140" cy="51" rx="5.5" ry="11.5" fill="url(#flameWarmGrad)" />
                <ellipse cx="140" cy="52" rx="2.5" ry="6.5" fill="#FFFFFF" opacity="0.98" />

                {/* Flame 3 (Right) */}
                <ellipse cx="166.25" cy="63" rx="4.5" ry="9.5" fill="url(#flameWarmGrad)" />
                <ellipse cx="166.25" cy="64" rx="2" ry="5.5" fill="#FFFFFF" opacity="0.95" />
              </g>
            ) : (
              <g className="animate-smoke">
                {/* Wispy smoke rising after blowing */}
                <path d="M113.25 70 C109 63 117 56 112 48" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.75"/>
                <path d="M140 59 C136 50 145 42 139 34" stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" fill="none" opacity="0.85"/>
                <path d="M166.25 70 C162 63 170 56 165 48" stroke="#E2E8F0" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.75"/>
              </g>
            )}

            {/* SVG Gradients & Definitions */}
            <defs>
              {/* Balloon Gradients */}
              <radialGradient id="balloonPink" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#FDF2F8" />
                <stop offset="45%" stop-color="#F9A8D4" />
                <stop offset="100%" stop-color="#DB2777" />
              </radialGradient>
              <radialGradient id="balloonPink2" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="50%" stop-color="#FBCFE8" />
                <stop offset="100%" stop-color="#E11D48" />
              </radialGradient>
              <radialGradient id="balloonLavender" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#F5F3FF" />
                <stop offset="45%" stop-color="#C4B5FD" />
                <stop offset="100%" stop-color="#7C3AED" />
              </radialGradient>
              <radialGradient id="balloonLavender2" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="50%" stop-color="#DDD6FE" />
                <stop offset="100%" stop-color="#6D28D9" />
              </radialGradient>
              <radialGradient id="balloonPeach" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#FFF7ED" />
                <stop offset="45%" stop-color="#FDBA9B" />
                <stop offset="100%" stop-color="#EA580C" />
              </radialGradient>
              <radialGradient id="balloonPowderBlue" cx="35%" cy="30%" r="70%">
                <stop offset="0%" stop-color="#EFF6FF" />
                <stop offset="45%" stop-color="#BFDBFE" />
                <stop offset="100%" stop-color="#2563EB" />
              </radialGradient>

              {/* Cake Stand Gradient */}
              <linearGradient id="standPlateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#1E3A8A" />
                <stop offset="50%" stop-color="#38BDF8" />
                <stop offset="100%" stop-color="#1E3A8A" />
              </linearGradient>

              {/* Cream Frosting Gradients */}
              <linearGradient id="creamFrostingBottom" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFF8E7" />
                <stop offset="70%" stop-color="#FFF1D6" />
                <stop offset="100%" stop-color="#FDE68A" />
              </linearGradient>
              <linearGradient id="creamFrostingTop" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFFDF5" />
                <stop offset="70%" stop-color="#FFF1D6" />
                <stop offset="100%" stop-color="#FEEBC8" />
              </linearGradient>

              {/* Pink Icing Drip Gradient */}
              <linearGradient id="pinkIcingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FDF2F8" />
                <stop offset="50%" stop-color="#F9A8D4" />
                <stop offset="100%" stop-color="#F472B6" />
              </linearGradient>

              {/* Candle Pastel Gradients */}
              <linearGradient id="candleLavenderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#EDE9FE" />
                <stop offset="50%" stop-color="#C4B5FD" />
                <stop offset="100%" stop-color="#A78BFA" />
              </linearGradient>
              <linearGradient id="candlePinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#FDF2F8" />
                <stop offset="50%" stop-color="#F9A8D4" />
                <stop offset="100%" stop-color="#F472B6" />
              </linearGradient>
              <linearGradient id="candleBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#EFF6FF" />
                <stop offset="50%" stop-color="#BFDBFE" />
                <stop offset="100%" stop-color="#93C5FD" />
              </linearGradient>

              {/* Candle Flame Radiant Glow */}
              <radialGradient id="flameWarmGrad" cx="50%" cy="65%" r="65%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="25%" stop-color="#FEF08A" />
                <stop offset="65%" stop-color="#F97316" />
                <stop offset="100%" stop-color="#EF4444" stop-opacity="0.2" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Interactive Candle Hint */}
        {candlesLit && (
          <p className="text-xs text-skyBlue/75 group-hover:text-softWhite transition-colors duration-200 mt-2 flex items-center justify-center gap-1.5 font-sans">
            <Wind className="w-3.5 h-3.5 text-iceBlue animate-bounce" />
            <span>Tap the cake or click Make a Wish to blow the candles</span>
          </p>
        )}
      </motion.div>

      {/* ========================================================
          MAKE A WISH BUTTON (Soft Pastel Gradient)
          - Starts with pastel pink: #F9A8D4
          - Blends into lavender: #C4B5FD
          - Powder blue highlight: #BFDBFE
          - Dark navy text for contrast: #071426
          - Soft golden/pastel glow
          ======================================================== */}
      <AnimatePresence mode="wait">
        {!wishMade ? (
          <motion.div
            key="wish-button"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            className="mt-4 sm:mt-6 relative z-10"
          >
            {/* Soft Ambient Golden/Pastel Glow Aura */}
            <div 
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#F9A8D4] via-[#C4B5FD] to-[#BFDBFE] opacity-65 blur-lg pointer-events-none transition-opacity duration-300 group-hover:opacity-90 animate-pulse-glow" 
              aria-hidden="true" 
            />

            <motion.button
              onClick={handleBlowCandles}
              whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="group relative min-h-[50px] sm:min-h-[54px] inline-flex items-center gap-2.5 px-8 sm:px-9 py-3 sm:py-3.5 rounded-full text-base sm:text-lg font-semibold text-[#071426] bg-gradient-to-r from-[#F9A8D4] via-[#C4B5FD] to-[#BFDBFE] border border-white/60 shadow-[0_0_25px_rgba(249,168,212,0.45),0_0_40px_rgba(196,181,253,0.3)] hover:shadow-[0_0_35px_rgba(249,168,212,0.65),0_0_55px_rgba(196,181,253,0.45)] transition-all duration-300 font-sans cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-midnightBlue"
              aria-label="Make a Wish: blows out candles and reveals birthday wish"
            >
              <Sparkles className="w-5 h-5 text-[#071426] group-hover:rotate-12 transition-transform duration-300" />
              <span>Make a Wish ✨</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Wish Revealed Card */
          <motion.div
            key="wish-revealed"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.94, y: shouldReduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto mt-6 px-6 sm:px-8 py-6 rounded-3xl glass-card border border-skyBlue/35 shadow-glow-md relative z-10 bg-gradient-to-b from-[#0B1F3A]/90 via-[#07162C]/90 to-[#040C1A]/95"
          >
            <p className="font-serif italic text-lg sm:text-2xl text-softWhite leading-relaxed mb-6">
              "I hope this new chapter of your life brings you happiness, beautiful memories, and countless reasons to smile."
            </p>

            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full text-sm sm:text-base font-medium text-softWhite bg-primaryBlue/35 hover:bg-primaryBlue/55 border border-skyBlue/45 hover:border-skyBlue transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm cursor-pointer"
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
