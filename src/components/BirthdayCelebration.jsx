import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Wind } from 'lucide-react';
import { triggerCelebrationConfetti, triggerWishSparkles } from '../utils/confetti';

const celebrationStars = [
  { id: 1, top: '12%', left: '20%', size: 2.5, delay: '0.4s', duration: '3.6s' },
  { id: 2, top: '16%', right: '22%', size: 2, delay: '1.2s', duration: '4.2s' },
  { id: 3, top: '46%', left: '17%', size: 2, delay: '0.8s', duration: '3.8s' },
  { id: 4, top: '50%', right: '18%', size: 2.5, delay: '1.9s', duration: '4.5s' },
  { id: 5, top: '32%', left: '25%', size: 1.5, delay: '2.3s', duration: '3.2s' },
  { id: 6, top: '35%', right: '26%', size: 1.5, delay: '1.6s', duration: '3.9s' },
];

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
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.98 }}
      transition={{ duration: shouldReduceMotion ? 0.2 : 0.7 }}
      className="relative min-h-[calc(100dvh-80px)] w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-3 sm:px-6 py-4 sm:py-6 z-10 overflow-x-hidden"
    >
      {/* ========================================================
          SOFT TWINKLING STARS AROUND CELEBRATION
          ======================================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {celebrationStars.map((s) => (
          <div
            key={`c-star-${s.id}`}
            className="absolute rounded-full bg-iceBlue animate-twinkle shadow-[0_0_6px_1px_rgba(186,230,253,0.7)]"
            style={{
              top: s.top,
              left: s.left,
              right: s.right,
              width: `${s.size}px`,
              height: `${s.size}px`,
              animationDelay: s.delay,
              animationDuration: s.duration,
            }}
          />
        ))}
      </div>

      {/* ========================================================
          PASTEL BALLOONS FRAMING THE CELEBRATION
          Palette:
          - Pastel Pink: #F9A8D4
          - Lavender: #C4B5FD
          - Soft Peach: #FDBA9B
          - Powder Blue: #BFDBFE
          Positioned as an elegant flanking frame around the center
          ======================================================== */}
      
      {/* LEFT FLANK BALLOONS */}
      {/* 1. Left-Top: Pastel Pink */}
      <div 
        className="absolute left-2 sm:left-6 lg:left-12 xl:left-20 top-2 sm:top-5 pointer-events-none opacity-90 animate-balloon-1 z-0 select-none"
        aria-hidden="true"
      >
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none" className="w-9 xs:w-11 sm:w-13 md:w-14 h-auto overflow-visible">
          <ellipse cx="30" cy="35" rx="25" ry="32" fill="url(#bPink)" />
          {/* Subtle 3D Highlight Curve */}
          <path d="M18 16 Q26 12 36 15" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <ellipse cx="20" cy="24" rx="4" ry="10" fill="white" opacity="0.5" transform="rotate(-24 20 24)" />
          {/* Knot */}
          <path d="M28 67 L32 67 L30 71 Z" fill="#F472B6" />
          {/* Graceful Silk String */}
          <path d="M30 71 Q23 88 33 102 T30 120" stroke="#F9A8D4" strokeWidth="1.3" fill="none" opacity="0.65" />
        </svg>
      </div>

      {/* 2. Left-Mid: Powder Blue */}
      <div 
        className="absolute left-1 sm:left-4 lg:left-8 xl:left-14 top-24 sm:top-32 pointer-events-none opacity-85 animate-balloon-2 z-0 select-none"
        aria-hidden="true"
      >
        <svg width="52" height="110" viewBox="0 0 52 110" fill="none" className="w-8 xs:w-9 sm:w-11 md:w-12 h-auto overflow-visible">
          <ellipse cx="26" cy="32" rx="22" ry="28" fill="url(#bPowderBlue)" />
          <path d="M16 15 Q23 11 32 14" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
          <ellipse cx="18" cy="22" rx="3.5" ry="8.5" fill="white" opacity="0.55" transform="rotate(-22 18 22)" />
          <path d="M24 60 L28 60 L26 64 Z" fill="#60A5FA" />
          <path d="M26 64 Q32 78 22 92 T26 110" stroke="#BFDBFE" strokeWidth="1.2" fill="none" opacity="0.65" />
        </svg>
      </div>

      {/* 3. Left-Lower: Lavender (Tablet/Desktop) */}
      <div 
        className="absolute left-3 sm:left-7 lg:left-14 xl:left-22 top-56 sm:top-64 pointer-events-none opacity-80 animate-balloon-1 z-0 select-none hidden sm:block"
        aria-hidden="true"
      >
        <svg width="50" height="105" viewBox="0 0 50 105" fill="none" className="w-8 sm:w-11 md:w-12 h-auto overflow-visible">
          <ellipse cx="25" cy="30" rx="21" ry="27" fill="url(#bLavender)" />
          <path d="M16 14 Q22 11 30 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <ellipse cx="17" cy="21" rx="3.2" ry="7.5" fill="white" opacity="0.5" transform="rotate(-20 17 21)" />
          <path d="M23 57 L27 57 L25 61 Z" fill="#A78BFA" />
          <path d="M25 61 Q20 74 28 88 T25 105" stroke="#C4B5FD" strokeWidth="1.2" fill="none" opacity="0.6" />
        </svg>
      </div>

      {/* RIGHT FLANK BALLOONS */}
      {/* 4. Right-Top: Lavender */}
      <div 
        className="absolute right-2 sm:right-6 lg:right-12 xl:right-20 top-2 sm:top-5 pointer-events-none opacity-90 animate-balloon-2 z-0 select-none"
        aria-hidden="true"
      >
        <svg width="60" height="120" viewBox="0 0 60 120" fill="none" className="w-9 xs:w-11 sm:w-13 md:w-14 h-auto overflow-visible">
          <ellipse cx="30" cy="35" rx="25" ry="32" fill="url(#bLavender)" />
          <path d="M18 16 Q26 12 36 15" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.65" />
          <ellipse cx="20" cy="24" rx="4" ry="10" fill="white" opacity="0.5" transform="rotate(-24 20 24)" />
          <path d="M28 67 L32 67 L30 71 Z" fill="#A78BFA" />
          <path d="M30 71 Q37 88 27 102 T30 120" stroke="#C4B5FD" strokeWidth="1.3" fill="none" opacity="0.65" />
        </svg>
      </div>

      {/* 5. Right-Mid: Soft Peach */}
      <div 
        className="absolute right-1 sm:right-4 lg:right-8 xl:right-14 top-24 sm:top-32 pointer-events-none opacity-85 animate-balloon-1 z-0 select-none"
        aria-hidden="true"
      >
        <svg width="52" height="110" viewBox="0 0 52 110" fill="none" className="w-8 xs:w-9 sm:w-11 md:w-12 h-auto overflow-visible">
          <ellipse cx="26" cy="32" rx="22" ry="28" fill="url(#bPeach)" />
          <path d="M16 15 Q23 11 32 14" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.65" />
          <ellipse cx="18" cy="22" rx="3.5" ry="8.5" fill="white" opacity="0.55" transform="rotate(-22 18 22)" />
          <path d="M24 60 L28 60 L26 64 Z" fill="#FB923C" />
          <path d="M26 64 Q20 78 30 92 T26 110" stroke="#FDBA9B" strokeWidth="1.2" fill="none" opacity="0.65" />
        </svg>
      </div>

      {/* 6. Right-Lower: Pastel Pink (Tablet/Desktop) */}
      <div 
        className="absolute right-3 sm:right-7 lg:right-14 xl:right-22 top-56 sm:top-64 pointer-events-none opacity-80 animate-balloon-2 z-0 select-none hidden sm:block"
        aria-hidden="true"
      >
        <svg width="50" height="105" viewBox="0 0 50 105" fill="none" className="w-8 sm:w-11 md:w-12 h-auto overflow-visible">
          <ellipse cx="25" cy="30" rx="21" ry="27" fill="url(#bPink)" />
          <path d="M16 14 Q22 11 30 13" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <ellipse cx="17" cy="21" rx="3.2" ry="7.5" fill="white" opacity="0.5" transform="rotate(-20 17 21)" />
          <path d="M23 57 L27 57 L25 61 Z" fill="#F472B6" />
          <path d="M25 61 Q30 74 22 88 T25 105" stroke="#F9A8D4" strokeWidth="1.2" fill="none" opacity="0.6" />
        </svg>
      </div>

      {/* ========================================================
          CENTRAL COMPOSITION: HEADER TITLES
          - Tightened vertical spacing to eliminate empty gaps
          - Balanced typography with subtle glow
          ======================================================== */}
      <motion.div
        initial={{ y: shouldReduceMotion ? 0 : 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.15 }}
        className="relative z-10 mb-1 sm:mb-2 max-w-2xl mx-auto px-2"
      >
        {/* Celebration Badge */}
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase text-iceBlue bg-primaryBlue/15 border border-skyBlue/30 mb-1.5 shadow-glow-sm">
          <Sparkles className="w-3.5 h-3.5 text-iceBlue" />
          A Special Celebration
        </span>

        {/* Large Elegant Serif Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-glow text-softWhite mb-1.5 break-words">
          Happy Birthday, Sowmi ! <span className="inline-block text-primaryBlue drop-shadow-[0_0_12px_#60A5FA]">💙</span>
        </h2>

        {/* Subtitle */}
        <p className="text-skyBlue/90 text-sm sm:text-base md:text-lg font-light tracking-wide">
          Today is all about celebrating you.
        </p>
      </motion.div>

      {/* ========================================================
          ENLARGED & POLISHED TWO-TIER BIRTHDAY CAKE (Pastel Palette)
          - Approximately 25-35% larger visual size, perfectly centered
          - Warm cream frosting with 3D cylindrical lighting
          - Pastel pink icing drips with glossy highlights
          - Lavender and pink flower decorations
          - Three glowing candles with warm ambient halo
          - Subtle realistic shading and gentle warm glow underneath
          ======================================================== */}
      <motion.div
        initial={{ scale: shouldReduceMotion ? 1 : 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: shouldReduceMotion ? 0 : 0.25, duration: 0.6 }}
        className="relative z-10 my-0.5 sm:my-1 cursor-pointer group focus:outline-none flex flex-col items-center"
        onClick={handleBlowCandles}
        onKeyDown={handleKeyDownCake}
        tabIndex={0}
        role="button"
        aria-label={candlesLit ? "Birthday cake with candles lit. Tap or press enter to blow out candles and make a wish." : "Candles extinguished. Wish revealed."}
        title={candlesLit ? "Click the candles or cake to blow them out!" : "Wish made!"}
      >
        {/* Responsive Cake Dimension (Enlarged by ~30% on desktop) */}
        <div className="relative w-[280px] h-[250px] xs:w-[320px] xs:h-[285px] sm:w-[370px] sm:h-[330px] md:w-[410px] md:h-[365px] lg:w-[425px] lg:h-[380px] flex flex-col items-center justify-end">
          
          {/* Gentle Candlelight Warmth (Above Cake) */}
          {candlesLit && (
            <div 
              className="absolute inset-x-12 top-6 h-28 rounded-full opacity-35 blur-2xl pointer-events-none transition-opacity duration-700" 
              style={{
                background: 'radial-gradient(circle, rgba(254, 240, 138, 0.45) 0%, rgba(249, 115, 22, 0.2) 50%, transparent 80%)'
              }}
            />
          )}

          {/* Gentle Warm Underglow (Beneath Cake Stand) */}
          <div 
            className="absolute inset-x-8 bottom-1 h-20 rounded-full opacity-45 blur-2xl pointer-events-none transition-all duration-700" 
            style={{
              background: 'radial-gradient(circle, rgba(253, 186, 155, 0.35) 0%, rgba(249, 168, 212, 0.22) 45%, rgba(196, 181, 253, 0.12) 70%, transparent 100%)'
            }}
          />

          {/* SVG Two-Tier Birthday Cake Illustration */}
          <svg 
            className="w-full h-full overflow-visible select-none drop-shadow-[0_12px_30px_rgba(7,20,38,0.75)]" 
            viewBox="0 0 280 250" 
            fill="none"
          >
            {/* 0. SOFT REALISTIC GROUND SHADOW */}
            <ellipse cx="140" cy="245" rx="88" ry="4.5" fill="#020813" opacity="0.55" />

            {/* 1. LUMINOUS GLASS & SILVER CAKE STAND */}
            {/* Pedestal Foot */}
            <ellipse cx="140" cy="241" rx="42" ry="6.5" fill="#0A1C36" stroke="#93C5FD" strokeWidth="1.2" />
            <ellipse cx="140" cy="239" rx="38" ry="5" fill="url(#standPlateGrad)" />
            {/* Pedestal Stem */}
            <path d="M126 220 L131 240 L149 240 L154 220 Z" fill="#0D2447" stroke="#60A5FA" strokeWidth="1" />
            <line x1="140" y1="220" x2="140" y2="240" stroke="#BAE6FD" strokeWidth="1" opacity="0.6" />
            {/* Under-Plate Ambient Shadow */}
            <ellipse cx="140" cy="223" rx="104" ry="12" fill="#040D1A" opacity="0.6" />
            {/* Plate Rim */}
            <ellipse cx="140" cy="220" rx="102" ry="14" fill="#0C2344" stroke="#BAE6FD" strokeWidth="1.6" />
            {/* Plate Top Surface */}
            <ellipse cx="140" cy="218" rx="96" ry="11" fill="url(#standPlateGrad)" />
            <path d="M58 218 Q140 227 222 218" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.4" fill="none" />

            {/* 2. TIER 1 (Bottom Tier) - Cream Frosting with Pink Drips & Flowers */}
            {/* Tier 1 Body (Cream with 3D Cylindrical Gradient) */}
            <path 
              d="M50 166 Q140 186 230 166 L230 208 Q140 228 50 208 Z" 
              fill="url(#creamFrostingBottom)" 
              stroke="#FDBA9B" 
              strokeWidth="0.8" 
            />
            {/* Subtle right-side cylindrical shadow */}
            <path 
              d="M195 174 Q212 180 230 166 L230 208 Q212 222 195 218 Z" 
              fill="url(#creamShadowRight)" 
              opacity="0.35" 
            />

            {/* Pink Icing Drips on Tier 1 */}
            <path 
              d="M50 166 
                 Q65 184 80 171 
                 Q95 192 110 173 
                 Q125 196 140 176 
                 Q155 194 170 173 
                 Q185 190 200 171 
                 Q215 184 230 166 
                 L230 166 Z" 
              fill="url(#pinkIcingGrad)" 
              stroke="#F472B6" 
              strokeWidth="1.2" 
            />
            {/* Glossy specular gleams on drip lobes */}
            <path d="M78 178 Q80 182 82 178" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />
            <path d="M108 185 Q110 189 112 185" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />
            <path d="M138 188 Q140 193 142 188" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" fill="none" />
            <path d="M168 186 Q170 191 172 186" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />
            <path d="M198 182 Q200 186 202 182" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />

            {/* Tier 1 Top Surface */}
            <ellipse cx="140" cy="166" rx="90" ry="16" fill="#FFF2D9" stroke="#F9A8D4" strokeWidth="1" />
            {/* Soft Ambient Shadow under Tier 2 */}
            <ellipse cx="140" cy="167" rx="68" ry="11" fill="rgba(217, 119, 6, 0.12)" />

            {/* Decorative Lavender & Pink Blossom Flowers on Tier 1 */}
            {/* Blossom 1 (Left - Pink) */}
            <g transform="translate(74, 186) scale(0.9)">
              <circle cx="-5" cy="0" r="4" fill="#FBCFE8" />
              <circle cx="5" cy="0" r="4" fill="#FBCFE8" />
              <circle cx="0" cy="-5" r="4" fill="#FBCFE8" />
              <circle cx="0" cy="5" r="4" fill="#FBCFE8" />
              <circle cx="0" cy="0" r="3.2" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.6" />
            </g>
            {/* Blossom 2 (Center-Left - Lavender) */}
            <g transform="translate(108, 196) scale(0.95)">
              <circle cx="-5" cy="0" r="4" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="4" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="4" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="4" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="3.2" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.6" />
            </g>
            {/* Blossom 3 (Center - Lavender & Pink Double Rosette) */}
            <g transform="translate(140, 199) scale(1.05)">
              <circle cx="-5" cy="0" r="4.2" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="4.2" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="4.2" fill="#F9A8D4" />
              <circle cx="0" cy="5" r="4.2" fill="#F9A8D4" />
              <circle cx="0" cy="0" r="3.4" fill="#FFF1D6" stroke="#F59E0B" strokeWidth="0.7" />
            </g>
            {/* Blossom 4 (Center-Right - Lavender) */}
            <g transform="translate(172, 196) scale(0.95)">
              <circle cx="-5" cy="0" r="4" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="4" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="4" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="4" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="3.2" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.6" />
            </g>
            {/* Blossom 5 (Right - Pink) */}
            <g transform="translate(206, 186) scale(0.9)">
              <circle cx="-5" cy="0" r="4" fill="#FBCFE8" />
              <circle cx="5" cy="0" r="4" fill="#FBCFE8" />
              <circle cx="0" cy="-5" r="4" fill="#FBCFE8" />
              <circle cx="0" cy="5" r="4" fill="#FBCFE8" />
              <circle cx="0" cy="0" r="3.2" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.6" />
            </g>

            {/* Soft Peach Sugar Pearls along Tier 1 Base */}
            <circle cx="92" cy="198" r="2.4" fill="#FDBA9B" />
            <circle cx="91" cy="197" r="0.8" fill="#FFFFFF" opacity="0.8" />
            <circle cx="124" cy="204" r="2.6" fill="#FDBA9B" />
            <circle cx="123" cy="203" r="0.9" fill="#FFFFFF" opacity="0.8" />
            <circle cx="156" cy="204" r="2.6" fill="#FDBA9B" />
            <circle cx="155" cy="203" r="0.9" fill="#FFFFFF" opacity="0.8" />
            <circle cx="188" cy="198" r="2.4" fill="#FDBA9B" />
            <circle cx="187" cy="197" r="0.8" fill="#FFFFFF" opacity="0.8" />

            {/* 3. TIER 2 (Top Tier) - Cream Frosting with Pink Drips & Flowers */}
            {/* Tier 2 Body (Cream with 3D Cylindrical Gradient) */}
            <path 
              d="M74 116 Q140 134 206 116 L206 160 Q140 178 74 160 Z" 
              fill="url(#creamFrostingTop)" 
              stroke="#FDBA9B" 
              strokeWidth="0.8" 
            />
            {/* Subtle right-side cylindrical shadow */}
            <path 
              d="M175 124 Q190 128 206 116 L206 160 Q190 172 175 168 Z" 
              fill="url(#creamShadowRight)" 
              opacity="0.3" 
            />
            
            {/* Pink Icing Drips on Tier 2 */}
            <path 
              d="M74 116 
                 Q88 134 100 121 
                 Q115 142 128 124 
                 Q143 144 158 124 
                 Q172 140 186 121 
                 Q196 130 206 116 
                 L206 116 Z" 
              fill="url(#pinkIcingGrad)" 
              stroke="#F472B6" 
              strokeWidth="1.2" 
            />
            {/* Specular gleams on Tier 2 drip lobes */}
            <path d="M98 128 Q100 132 102 128" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />
            <path d="M126 135 Q128 139 130 135" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" fill="none" />
            <path d="M156 137 Q158 141 160 137" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" fill="none" />
            <path d="M184 133 Q186 137 188 133" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" fill="none" />

            {/* Tier 2 Top Surface */}
            <ellipse cx="140" cy="116" rx="66" ry="14" fill="#FFF6E3" stroke="#F9A8D4" strokeWidth="1" />

            {/* Floral Accents on Top Tier */}
            <g transform="translate(96, 140) scale(0.85)">
              <circle cx="-5" cy="0" r="3.6" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="3.6" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="3.6" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.6" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="2.8" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.5" />
            </g>
            <g transform="translate(140, 146) scale(0.9)">
              <circle cx="-5" cy="0" r="3.8" fill="#F9A8D4" />
              <circle cx="5" cy="0" r="3.8" fill="#F9A8D4" />
              <circle cx="0" cy="-5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.8" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="3" fill="#FFF1D6" stroke="#F59E0B" strokeWidth="0.5" />
            </g>
            <g transform="translate(184, 140) scale(0.85)">
              <circle cx="-5" cy="0" r="3.6" fill="#C4B5FD" />
              <circle cx="5" cy="0" r="3.6" fill="#C4B5FD" />
              <circle cx="0" cy="-5" r="3.6" fill="#C4B5FD" />
              <circle cx="0" cy="5" r="3.6" fill="#C4B5FD" />
              <circle cx="0" cy="0" r="2.8" fill="#FDBA9B" stroke="#F59E0B" strokeWidth="0.5" />
            </g>

            {/* Sugar pearls on top tier surface */}
            <circle cx="104" cy="118" r="2.2" fill="#FDBA9B" opacity="0.95" />
            <circle cx="122" cy="122" r="2.2" fill="#C4B5FD" opacity="0.95" />
            <circle cx="158" cy="122" r="2.2" fill="#C4B5FD" opacity="0.95" />
            <circle cx="176" cy="118" r="2.2" fill="#FDBA9B" opacity="0.95" />

            {/* 4. THREE ELEGANT CANDLES (Pastel Styling with Realistic Shading) */}
            {/* Candle 1 (Left - Lavender) */}
            <rect x="108" y="74" width="7" height="38" rx="2" fill="url(#candleLavenderGrad)" stroke="#A78BFA" strokeWidth="0.8" />
            <rect x="109.5" y="75" width="1.5" height="36" rx="0.5" fill="#FFFFFF" opacity="0.45" />
            <line x1="111.5" y1="74" x2="111.5" y2="67" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="111.5" cy="67" r="1.2" fill="#F97316" />

            {/* Candle 2 (Center - Pastel Pink, slightly taller centerpiece) */}
            <rect x="136" y="62" width="8" height="50" rx="2" fill="url(#candlePinkGrad)" stroke="#F472B6" strokeWidth="0.8" />
            <rect x="137.5" y="63" width="1.8" height="48" rx="0.5" fill="#FFFFFF" opacity="0.45" />
            <line x1="140" y1="62" x2="140" y2="54" stroke="#334155" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="140" cy="54" r="1.4" fill="#F97316" />

            {/* Candle 3 (Right - Powder Blue) */}
            <rect x="165" y="74" width="7" height="38" rx="2" fill="url(#candleBlueGrad)" stroke="#93C5FD" strokeWidth="0.8" />
            <rect x="166.5" y="75" width="1.5" height="36" rx="0.5" fill="#FFFFFF" opacity="0.45" />
            <line x1="168.5" y1="74" x2="168.5" y2="67" stroke="#334155" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="168.5" cy="67" r="1.2" fill="#F97316" />

            {/* Candle Flames or Smoke Animation */}
            {candlesLit ? (
              <g className="animate-candle-flame">
                {/* Global Ambient Flame Halo */}
                <ellipse cx="140" cy="54" rx="55" ry="24" fill="url(#candleHaloGlobal)" opacity="0.55" />

                {/* Flame 1 (Left) */}
                <ellipse cx="111.5" cy="57" rx="7.5" ry="12.5" fill="url(#flameOuterGrad)" opacity="0.4" />
                <ellipse cx="111.5" cy="58" rx="4.8" ry="10" fill="url(#flameWarmGrad)" />
                <ellipse cx="111.5" cy="59" rx="2.2" ry="5.8" fill="#FFFFFF" opacity="0.95" />

                {/* Flame 2 (Center) */}
                <ellipse cx="140" cy="43" rx="9" ry="14.5" fill="url(#flameOuterGrad)" opacity="0.45" />
                <ellipse cx="140" cy="44" rx="6" ry="12" fill="url(#flameWarmGrad)" />
                <ellipse cx="140" cy="45" rx="2.8" ry="7" fill="#FFFFFF" opacity="0.98" />

                {/* Flame 3 (Right) */}
                <ellipse cx="168.5" cy="57" rx="7.5" ry="12.5" fill="url(#flameOuterGrad)" opacity="0.4" />
                <ellipse cx="168.5" cy="58" rx="4.8" ry="10" fill="url(#flameWarmGrad)" />
                <ellipse cx="168.5" cy="59" rx="2.2" ry="5.8" fill="#FFFFFF" opacity="0.95" />
              </g>
            ) : (
              <g className="pointer-events-none select-none">
                {/* Left Candle Smoke Wisp (Wick at 111.5, 67) */}
                <motion.path
                  d="M111.5 67 C109 58 113.5 48 110.5 38 C108 30 112 20 109 10"
                  stroke="#E2E8F0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0, y: 0, x: 0 }}
                  animate={{
                    pathLength: shouldReduceMotion ? 1 : [0, 0.8, 1],
                    opacity: shouldReduceMotion ? 0 : [0, 0.75, 0.4, 0],
                    y: shouldReduceMotion ? 0 : [0, -10, -22],
                    x: shouldReduceMotion ? 0 : [0, -2, 1.5],
                  }}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 1.8, ease: "easeOut" }}
                />

                {/* Center Candle Smoke Wisp (Wick at 140, 54 - centerpiece) */}
                <motion.path
                  d="M140 54 C137 44 142.5 34 139 24 C136.5 16 141 6 138 -4"
                  stroke="#E2E8F0"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0, y: 0, x: 0 }}
                  animate={{
                    pathLength: shouldReduceMotion ? 1 : [0, 0.8, 1],
                    opacity: shouldReduceMotion ? 0 : [0, 0.85, 0.45, 0],
                    y: shouldReduceMotion ? 0 : [0, -12, -26],
                    x: shouldReduceMotion ? 0 : [0, 2, -1.8],
                  }}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 2.0, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.05 }}
                />

                {/* Right Candle Smoke Wisp (Wick at 168.5, 67) */}
                <motion.path
                  d="M168.5 67 C166 58 170.5 48 167.5 38 C165 30 169 20 166 10"
                  stroke="#E2E8F0"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0, y: 0, x: 0 }}
                  animate={{
                    pathLength: shouldReduceMotion ? 1 : [0, 0.8, 1],
                    opacity: shouldReduceMotion ? 0 : [0, 0.75, 0.4, 0],
                    y: shouldReduceMotion ? 0 : [0, -10, -22],
                    x: shouldReduceMotion ? 0 : [0, 1.8, -1.2],
                  }}
                  transition={{ duration: shouldReduceMotion ? 0.2 : 1.8, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.1 }}
                />
              </g>
            )}

            {/* SVG Gradients & Definitions */}
            <defs>
              {/* Balloon 3D Realistic Radial Gradients */}
              <radialGradient id="bPink" cx="30%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FDF2F8" />
                <stop offset="60%" stopColor="#F9A8D4" />
                <stop offset="100%" stopColor="#E11D48" stopOpacity="0.85" />
              </radialGradient>
              <radialGradient id="bLavender" cx="30%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#F5F3FF" />
                <stop offset="60%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#6D28D9" stopOpacity="0.85" />
              </radialGradient>
              <radialGradient id="bPeach" cx="30%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FFF7ED" />
                <stop offset="60%" stopColor="#FDBA9B" />
                <stop offset="100%" stopColor="#EA580C" stopOpacity="0.85" />
              </radialGradient>
              <radialGradient id="bPowderBlue" cx="30%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#EFF6FF" />
                <stop offset="60%" stopColor="#BFDBFE" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.85" />
              </radialGradient>

              {/* Cake Stand Gradients */}
              <linearGradient id="standPlateGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E3A8A" />
                <stop offset="35%" stopColor="#60A5FA" />
                <stop offset="65%" stopColor="#BAE6FD" />
                <stop offset="100%" stopColor="#1E3A8A" />
              </linearGradient>

              {/* Cream Frosting 3D Cylindrical Gradients */}
              <linearGradient id="creamFrostingBottom" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDE5C2" />
                <stop offset="30%" stopColor="#FFF7E8" />
                <stop offset="65%" stopColor="#FFF0D4" />
                <stop offset="100%" stopColor="#F8D3A0" />
              </linearGradient>
              <linearGradient id="creamFrostingTop" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDEBCF" />
                <stop offset="30%" stopColor="#FFFBF0" />
                <stop offset="65%" stopColor="#FFF2D9" />
                <stop offset="100%" stopColor="#F8D7A6" />
              </linearGradient>
              <linearGradient id="creamShadowRight" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>

              {/* Pink Icing Drip Gradient */}
              <linearGradient id="pinkIcingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFF1F2" />
                <stop offset="35%" stopColor="#FBCFE8" />
                <stop offset="75%" stopColor="#F9A8D4" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>

              {/* Candle Pastel Gradients */}
              <linearGradient id="candleLavenderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EDE9FE" />
                <stop offset="50%" stopColor="#C4B5FD" />
                <stop offset="100%" stopColor="#A78BFA" />
              </linearGradient>
              <linearGradient id="candlePinkGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FDF2F8" />
                <stop offset="50%" stopColor="#F9A8D4" />
                <stop offset="100%" stopColor="#F472B6" />
              </linearGradient>
              <linearGradient id="candleBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EFF6FF" />
                <stop offset="50%" stopColor="#BFDBFE" />
                <stop offset="100%" stopColor="#93C5FD" />
              </linearGradient>

              {/* Candle Flame Radiance */}
              <radialGradient id="candleHaloGlobal" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.35" />
                <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="flameOuterGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.6" />
                <stop offset="60%" stopColor="#F97316" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="flameWarmGrad" cx="50%" cy="65%" r="65%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="25%" stopColor="#FEF08A" />
                <stop offset="65%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#EF4444" stopOpacity="0.3" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Interactive Candle Hint */}
        {candlesLit && (
          <p className="text-xs text-skyBlue/80 group-hover:text-softWhite transition-colors duration-200 mt-1 sm:mt-1.5 flex items-center justify-center gap-1.5 font-sans">
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
          - Restrained pastel glow consistent with decorations
          ======================================================== */}
      <AnimatePresence mode="wait">
        {!wishMade ? (
          <motion.div
            key="wish-button"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
            className="mt-2.5 sm:mt-3.5 relative z-10"
          >
            {/* Soft Ambient Golden/Pastel Glow Aura */}
            <div 
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-[#F9A8D4] via-[#C4B5FD] to-[#BFDBFE] opacity-55 blur-md pointer-events-none transition-opacity duration-300 group-hover:opacity-85" 
              aria-hidden="true" 
            />

            <motion.button
              onClick={handleBlowCandles}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              className="group relative min-h-[46px] sm:min-h-[50px] inline-flex items-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-semibold text-[#071426] bg-gradient-to-r from-[#F9A8D4] via-[#C4B5FD] to-[#BFDBFE] border border-white/60 shadow-[0_0_20px_rgba(249,168,212,0.4),0_0_35px_rgba(196,181,253,0.25)] hover:shadow-[0_0_28px_rgba(249,168,212,0.6),0_0_45px_rgba(196,181,253,0.4)] transition-all duration-300 font-sans cursor-pointer focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2 focus:ring-offset-midnightBlue"
              aria-label="Make a Wish: blows out candles and reveals birthday wish"
            >
              <Sparkles className="w-4 h-4 text-[#071426] group-hover:rotate-12 transition-transform duration-300" />
              <span>Make a Wish ✨</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Wish Revealed Card */
          <motion.div
            key="wish-revealed"
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.2 : 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl mx-auto mt-4 px-6 sm:px-8 py-5 sm:py-6 rounded-3xl glass-card border border-skyBlue/35 shadow-glow-md relative z-10 bg-gradient-to-b from-[#0B1F3A]/90 via-[#07162C]/90 to-[#040C1A]/95"
          >
            <p className="font-serif italic text-lg sm:text-2xl text-softWhite leading-relaxed mb-5">
              "I hope this new chapter of your life brings you happiness, beautiful memories, and countless reasons to smile."
            </p>

            <button
              onClick={onContinue}
              className="inline-flex items-center gap-2.5 px-7 py-2.5 sm:py-3 rounded-full text-sm sm:text-base font-medium text-softWhite bg-primaryBlue/35 hover:bg-primaryBlue/55 border border-skyBlue/45 hover:border-skyBlue transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm cursor-pointer"
            >
              <span>Step Into Our Story</span>
              <ArrowRight className="w-4 h-4 text-iceBlue" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
