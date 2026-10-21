import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Camera } from 'lucide-react';

export default function PhotoLightbox({ photo, onClose }) {
  const [imgSrc, setImgSrc] = useState(photo?.src || "");
  const [triedFallback, setTriedFallback] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-label="Expanded Photograph Lightbox"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="fixed top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/25 text-softWhite border border-white/20 transition-transform duration-200 hover:scale-110 active:scale-95 shadow-glow-sm"
          aria-label="Close Lightbox"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Container */}
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-2xl w-full glass-card border border-skyBlue/30 rounded-3xl p-4 sm:p-6 shadow-glow-lg overflow-hidden my-auto"
        >
          {/* Full Image Container */}
          <div className="relative rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center max-h-[70vh] mb-4 border border-skyBlue/20">
            <img
              src={imgSrc}
              alt={photo.alt}
              onError={() => {
                if (photo.fallbackSrc && !triedFallback) {
                  setTriedFallback(true);
                  setImgSrc(photo.fallbackSrc);
                }
              }}
              className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-md"
            />
          </div>

          <div className="text-left px-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs uppercase font-mono tracking-wider text-primaryBlue font-semibold">
                {photo.tag}
              </span>
              <span className="flex items-center gap-1 text-xs text-skyBlue/70">
                <Sparkles className="w-3.5 h-3.5 text-iceBlue" />
                Sowmi's Moments
              </span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-softWhite mb-1">
              {photo.title}
            </h3>
            <p className="text-sm text-skyBlue/90 mb-2 font-light">
              {photo.subtitle}
            </p>
            {photo.note && (
              <p className="text-xs sm:text-sm text-softWhite/85 italic font-light border-l-2 border-primaryBlue/50 pl-3 mt-3 py-0.5">
                "{photo.note}"
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
