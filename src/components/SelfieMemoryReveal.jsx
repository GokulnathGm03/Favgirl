import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Maximize2, Sparkles, Smile } from 'lucide-react';
import { selfieMemory } from '../data/galleryData';
import ImageWithFallback from './ImageWithFallback';
import PhotoLightbox from './PhotoLightbox';

export default function SelfieMemoryReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="w-full mt-24">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-iceBlue bg-iceBlue/10 border border-iceBlue/25 mb-3">
          <Smile className="w-3.5 h-3.5 text-iceBlue" />
          Section C • Special Moment
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-softWhite mb-2">
          {selfieMemory.title}
        </h3>
        <p className="text-skyBlue/80 text-xs sm:text-sm max-w-md mx-auto font-light">
          A spontaneous selfie that captures our bond in the simplest, most genuine way.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Pre-Reveal Card: Visually distinct with ice-blue subtle starlight aura */
            <motion.div
              key="selfie-pre-reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 sm:p-12 text-center border border-iceBlue/30 shadow-glow-sm flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#092244]/80 via-[#07172E]/80 to-[#040C1A]/90"
            >
              {/* Decorative Camera / Star Aura */}
              <div className="w-20 h-20 rounded-full bg-iceBlue/15 border border-iceBlue/30 flex items-center justify-center mb-6 shadow-glow-sm">
                <Camera className="w-8 h-8 text-iceBlue animate-float" />
              </div>

              <h4 className="font-serif italic text-xl sm:text-2xl text-softWhite mb-3">
                "{selfieMemory.preRevealText}"
              </h4>

              <p className="text-xs sm:text-sm text-skyBlue/70 max-w-sm mb-8 font-light">
                Two smiles, one moment, and a memory worth keeping forever.
              </p>

              {/* Required Button: "Reveal This Memory" */}
              <button
                onClick={() => setIsRevealed(true)}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full text-base font-medium text-midnightBlue bg-gradient-to-r from-iceBlue via-skyBlue to-primaryBlue shadow-candle hover:scale-105 active:scale-95 transition-all duration-300 font-sans cursor-pointer focus:outline-none focus:ring-2 focus:ring-skyBlue"
                aria-label="Reveal this selfie memory"
              >
                <Sparkles className="w-4 h-4 text-midnightBlue group-hover:rotate-12 transition-transform duration-300" />
                <span>{selfieMemory.buttonText}</span>
              </button>
            </motion.div>
          ) : (
            /* Revealed Photo Card */
            <motion.div
              key="selfie-post-reveal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-5 sm:p-7 rounded-3xl border border-iceBlue/40 shadow-glow-md text-center bg-gradient-to-b from-[#092244]/90 via-[#07172E]/90 to-[#040C1A]/95"
            >
              {/* Framed Picture Container */}
              <div 
                onClick={() => setLightboxOpen(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxOpen(true);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label="View full selfie photo"
                className="group relative cursor-pointer overflow-hidden rounded-2xl mb-6 border-2 border-iceBlue/35 shadow-inner focus:outline-none focus:ring-2 focus:ring-skyBlue"
              >
                <ImageWithFallback
                  src={selfieMemory.src}
                  fallbackSrc={selfieMemory.fallbackSrc}
                  alt={selfieMemory.alt}
                  placeholderTitle="Selfie Photograph Placeholder"
                  expectedPath={selfieMemory.src}
                  aspectRatio="aspect-[4/3] sm:aspect-[16/10]"
                  objectPosition="object-center"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-softWhite bg-black/60 backdrop-blur-sm border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5 text-iceBlue" />
                    Click to view full photo
                  </span>
                </div>
              </div>

              {/* Required Exact Caption */}
              <div className="p-4 rounded-2xl bg-midnightBlue/70 border border-iceBlue/20">
                <p className="font-serif italic text-base sm:text-lg text-softWhite leading-relaxed mb-2">
                  "{selfieMemory.caption}"
                </p>
                <span className="text-[11px] uppercase tracking-wider font-mono text-iceBlue/70">
                  A Moment Just for Us • Preserved With Care
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox for Selfie Memory */}
      {lightboxOpen && (
        <PhotoLightbox
          photo={{
            src: selfieMemory.src,
            fallbackSrc: selfieMemory.fallbackSrc,
            alt: selfieMemory.alt,
            title: selfieMemory.title,
            subtitle: selfieMemory.subtitle,
            tag: "Just For Us",
            note: selfieMemory.caption
          }}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
