import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';

export default function PhotoLightbox({ photo, onClose }) {
  const [imgSrc, setImgSrc] = useState(photo?.src || "");
  const [triedFallback, setTriedFallback] = useState(false);
  const triggerElementRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Save active element on mount to restore focus on unmount
  useEffect(() => {
    triggerElementRef.current = document.activeElement;

    // Lock background body scroll completely and prevent scroll bleed
    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    const originalPaddingRight = document.body.style.paddingRight;

    // Compensate for scrollbar shift if present
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'contain';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
      document.body.style.paddingRight = originalPaddingRight;

      // Restore focus to triggering button
      if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
        triggerElementRef.current.focus();
      }
    };
  }, [onClose]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      {/* Fixed Full-Viewport Overlay with Dedicated Vertical Scroll Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: shouldReduceMotion ? 0.15 : 0.3 }}
        className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-black/90 backdrop-blur-md"
        role="dialog"
        aria-modal="true"
        aria-label={photo.title || "Expanded Photograph"}
        onClick={onClose}
      >
        {/* Floating Fixed Close Button */}
        <button
          onClick={onClose}
          className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full bg-[#0B1F3A]/90 hover:bg-[#163660] text-softWhite border border-skyBlue/40 transition-all duration-200 hover:scale-105 active:scale-95 shadow-glow-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-skyBlue"
          aria-label="Close photo dialog"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6 text-iceBlue" />
        </button>

        {/* Centering Wrapper with Sufficient Top & Bottom Padding so Content Never Clips */}
        <div className="min-h-full flex items-center justify-center p-3 sm:p-6 py-14 sm:py-20 pointer-events-none">
          {/* Modal Content Card */}
          <motion.div
            initial={{ scale: shouldReduceMotion ? 1 : 0.94, opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: shouldReduceMotion ? 1 : 0.94, opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="pointer-events-auto relative max-w-2xl w-full glass-card border border-skyBlue/30 rounded-3xl p-4 sm:p-7 shadow-glow-lg text-left my-auto bg-gradient-to-b from-[#0B1F3A]/95 via-[#07162C]/95 to-[#040C1A]/98"
          >
            {/* Image Frame with Contained Aspect and Vertical Breathing Room */}
            <div className="relative rounded-2xl overflow-hidden bg-black/70 flex items-center justify-center max-h-[52vh] sm:max-h-[64vh] mb-5 border border-skyBlue/20 shadow-inner">
              <img
                src={imgSrc}
                alt={photo.alt || photo.title}
                onError={() => {
                  if (photo.fallbackSrc && !triedFallback) {
                    setTriedFallback(true);
                    setImgSrc(photo.fallbackSrc);
                  }
                }}
                className="max-h-[50vh] sm:max-h-[62vh] w-auto max-w-full object-contain rounded-xl"
              />
            </div>

            {/* Photo Metadata and Reachable Caption */}
            <div className="px-1 sm:px-2 space-y-2">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-[11px] uppercase font-mono tracking-wider text-primaryBlue font-semibold bg-primaryBlue/10 px-2.5 py-0.5 rounded-full border border-primaryBlue/20">
                  {photo.tag || "Memory"}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-skyBlue/70">
                  <Sparkles className="w-3.5 h-3.5 text-iceBlue" />
                  Preserved Moment
                </span>
              </div>

              <h3 className="font-serif text-xl sm:text-2xl font-bold text-softWhite">
                {photo.title}
              </h3>

              {photo.subtitle && (
                <p className="text-xs sm:text-sm text-skyBlue/85 font-light">
                  {photo.subtitle}
                </p>
              )}

              {photo.note && (
                <div className="pt-2 mt-3 border-t border-skyBlue/15">
                  <p className="text-xs sm:text-sm text-softWhite/90 italic font-serif leading-relaxed border-l-2 border-primaryBlue/50 pl-3 py-1">
                    "{photo.note}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Close Button for Touch Accessibility */}
            <div className="mt-6 pt-4 border-t border-skyBlue/15 flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2 rounded-full text-xs sm:text-sm font-medium text-skyBlue hover:text-softWhite bg-white/5 hover:bg-white/10 border border-skyBlue/30 transition-all duration-200 cursor-pointer"
              >
                Close Photo
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
