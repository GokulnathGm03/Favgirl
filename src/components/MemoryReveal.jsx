import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lock, Maximize2 } from 'lucide-react';
import { weddingMemory } from '../data/galleryData';
import ImageWithFallback from './ImageWithFallback';
import PhotoLightbox from './PhotoLightbox';

export default function MemoryReveal() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="w-full mt-20">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-skyBlue bg-skyBlue/10 border border-skyBlue/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Section B • An Unexpected Memory
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-softWhite mb-2">
          At The Wedding
        </h3>
        <p className="text-skyBlue/80 text-xs sm:text-sm max-w-md mx-auto font-light">
          A memory that happened effortlessly, just like the rest of our story.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            /* Pre-Reveal Locked Card */
            <motion.div
              key="wedding-pre-reveal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, filter: 'blur(6px)' }}
              transition={{ duration: 0.5 }}
              className="glass-card rounded-3xl p-8 sm:p-12 text-center border border-skyBlue/30 shadow-glow-md flex flex-col items-center justify-center relative overflow-hidden"
            >
              {/* Soft decorative background circles */}
              <div className="w-20 h-20 rounded-full bg-primaryBlue/15 border border-skyBlue/30 flex items-center justify-center mb-6 shadow-glow-sm">
                <Lock className="w-8 h-8 text-skyBlue animate-pulse" />
              </div>

              <h4 className="font-serif italic text-xl sm:text-2xl text-softWhite mb-4">
                "{weddingMemory.preRevealText}"
              </h4>

              <p className="text-xs sm:text-sm text-skyBlue/70 max-w-sm mb-8 font-light">
                One spontaneous moment captured in time, preserved in this little universe.
              </p>

              <button
                onClick={() => setIsRevealed(true)}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-medium text-midnightBlue bg-gradient-to-r from-iceBlue via-skyBlue to-primaryBlue shadow-candle hover:scale-105 active:scale-95 transition-all duration-300 font-sans cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-midnightBlue" />
                {weddingMemory.buttonText}
              </button>
            </motion.div>
          ) : (
            /* Revealed Memory Card */
            <motion.div
              key="wedding-post-reveal"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-5 sm:p-7 rounded-3xl border border-skyBlue/35 shadow-glow-lg text-center"
            >
              {/* Framed Picture Container */}
              <div 
                onClick={() => setLightboxOpen(true)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl mb-6 border-2 border-skyBlue/30 shadow-inner"
              >
                <ImageWithFallback
                  src={weddingMemory.src}
                  fallbackSrc={weddingMemory.fallbackSrc}
                  alt={weddingMemory.alt}
                  placeholderTitle="Wedding Photograph Placeholder"
                  expectedPath={weddingMemory.src}
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

              {/* Exact Caption from requirements */}
              <div className="p-4 rounded-2xl bg-midnightBlue/60 border border-skyBlue/15">
                <p className="font-serif italic text-base sm:text-lg text-softWhite leading-relaxed mb-2">
                  "{weddingMemory.caption}"
                </p>
                <span className="text-[11px] uppercase tracking-wider font-mono text-skyBlue/60">
                  Unplanned Moments • The Best Kind
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox for Wedding Memory */}
      {lightboxOpen && (
        <PhotoLightbox
          photo={{
            src: weddingMemory.src,
            fallbackSrc: weddingMemory.fallbackSrc,
            alt: weddingMemory.alt,
            title: "Our Wedding Memory",
            subtitle: "Unplanned and worth keeping",
            tag: "Together",
            note: weddingMemory.caption
          }}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
