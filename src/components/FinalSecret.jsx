import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { RotateCcw, Moon, Sparkles, Share2, Check, Send } from 'lucide-react';

const finalStars = [
  { id: 1, top: '22%', left: '16%', size: 3, delay: '0.2s', duration: '3.5s' },
  { id: 2, top: '26%', right: '18%', size: 2.5, delay: '1.1s', duration: '4.2s' },
  { id: 3, top: '68%', left: '22%', size: 2, delay: '0.7s', duration: '3.8s' },
  { id: 4, top: '72%', right: '20%', size: 3, delay: '1.8s', duration: '4.5s' },
  { id: 5, top: '46%', left: '10%', size: 2, delay: '2.1s', duration: '3.2s' },
  { id: 6, top: '50%', right: '12%', size: 2.5, delay: '1.5s', duration: '4.0s' },
];

const finalParticles = [
  { id: 1, top: '32%', left: '20%', size: 5, delay: '0s', duration: '9s' },
  { id: 2, top: '62%', right: '22%', size: 6, delay: '2s', duration: '11s' },
  { id: 3, top: '24%', right: '30%', size: 4, delay: '1.5s', duration: '8s' },
  { id: 4, top: '76%', left: '28%', size: 5, delay: '3s', duration: '10s' },
];

export default function FinalSecret({ onReplay }) {
  const [showFinalScreen, setShowFinalScreen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const shareText = "Happy Birthday, Sowmi! 💙🎂\nI made a little something for you.\nOpen it whenever you're free. ✨\n" + window.location.origin;

  const handleCopyShare = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleShareWhatsApp = () => {
    const encoded = encodeURIComponent("Happy Birthday, Sowmi! 💙🎂\nI made a little something for you.\nOpen it whenever you're free. ✨\n" + window.location.href);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  // Auto-transition to final screen after the birthday message has been displayed (~13.7s total)
  // unless user clicks earlier
  useEffect(() => {
    if (showFinalScreen) return;
    const timer = setTimeout(() => {
      setShowFinalScreen(true);
    }, 13700);
    return () => clearTimeout(timer);
  }, [showFinalScreen]);

  const handleReplayClick = () => {
    setShowFinalScreen(false);
    if (onReplay) {
      onReplay();
    }
  };

  return (
    <AnimatePresence mode="wait">
      {!showFinalScreen ? (
        <motion.section
          key="final-secret-intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.8, ease: "easeInOut" }}
          className="relative min-h-[92vh] max-w-2xl mx-auto px-4 sm:px-6 py-16 z-10 flex flex-col items-center justify-center text-center"
        >
          {/* Soft Moon Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0.2 : 0.8 }}
            className="w-20 h-20 rounded-full bg-gradient-to-tr from-primaryBlue/20 via-skyBlue/15 to-transparent border border-skyBlue/30 flex items-center justify-center mb-8 shadow-glow-md backdrop-blur-md"
          >
            <Moon className="w-9 h-9 text-iceBlue animate-float" />
          </motion.div>

          {/* Sequential Thought Reveals */}
          <div className="space-y-8 mb-12">
            {/* Line 1 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.8, duration: shouldReduceMotion ? 0.2 : 1 }}
              className="font-serif text-xl sm:text-2xl md:text-3xl text-skyBlue/90 font-light leading-relaxed"
            >
              Some people become special to us<br />
              <span className="text-softWhite font-normal">without us ever planning it.</span>
            </motion.p>

            {/* Line 2 */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: shouldReduceMotion ? 0 : 2.2, duration: shouldReduceMotion ? 0.2 : 1 }}
              className="font-serif text-xl sm:text-2xl md:text-3xl text-softWhite leading-relaxed"
            >
              And maybe that's what makes them<br />
              <span className="text-glow text-iceBlue font-medium">even more special. 💙</span>
            </motion.p>

            {/* Final Line - subtle hint of affection */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: shouldReduceMotion ? 0 : 3.8, duration: shouldReduceMotion ? 0.2 : 1.2 }}
              className="py-4 px-6 rounded-2xl glass-card border border-primaryBlue/30 max-w-xl mx-auto shadow-glow-sm"
            >
              <p className="font-serif text-lg sm:text-xl text-softWhite italic leading-relaxed">
                "Some people become our favourites without even trying.<br className="hidden sm:inline" />
                You just happen to be one of mine. 🌙"
              </p>
            </motion.div>
          </div>

          {/* Happy Birthday Finale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 5.2, duration: shouldReduceMotion ? 0.2 : 0.9 }}
            className="mb-8"
          >
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-glow text-softWhite mb-3">
              Happy Birthday, CA Sowmiya! <span className="text-primaryBlue">💙</span>
            </h2>
            <p className="text-xs sm:text-sm text-skyBlue/70 font-light">
              May your year ahead be as bright and peaceful as the stars.
            </p>
          </motion.div>

          {/* Call-to-action to proceed to the Final Cinematic Screen */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: shouldReduceMotion ? 0 : 6.0, duration: shouldReduceMotion ? 0.2 : 0.8 }}
            className="flex flex-col items-center gap-4"
          >
            {/* Primary Action Button */}
            <button
              onClick={() => setShowFinalScreen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm sm:text-base font-medium text-softWhite bg-primaryBlue/30 hover:bg-primaryBlue/50 border border-skyBlue/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm cursor-pointer"
            >
              <span>One Final Whisper</span>
              <Sparkles className="w-4 h-4 text-iceBlue animate-pulse" />
            </button>

            {/* Optional Share Controls (Disabled for now) */}
            {false && (
              <div className="flex flex-wrap items-center justify-center gap-3 mt-1">
                {/* WhatsApp Share */}
                <button
                  onClick={handleShareWhatsApp}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-skyBlue/90 hover:text-softWhite glass-card hover:bg-deepNavy/80 border border-skyBlue/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                  title="Share via WhatsApp"
                >
                  <Send className="w-3.5 h-3.5 text-skyBlue" />
                  <span>Send to Sowmi</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={handleCopyShare}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium text-skyBlue/80 hover:text-softWhite glass-card hover:bg-deepNavy/80 border border-skyBlue/20 transition-all duration-300 cursor-pointer"
                  title="Copy link to clipboard"
                >
                  {copiedShare ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-300">Link Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </motion.div>
        </motion.section>
      ) : (
        /* ========================================================
           FINAL CINEMATIC SCREEN
           - Midnight-blue starry background
           - Softly glowing stars and subtle blue particles
           - Centered elegant typography: "Epdithanoo… 💙"
           - Fades in after a short pause
           - Minimal layout with generous spacing
           - Subtle "Replay the Surprise" option below
           ======================================================== */
        <motion.section
          key="final-cinematic-screen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 1.2, ease: "easeInOut" }}
          className="relative min-h-[92vh] w-full max-w-4xl mx-auto px-4 sm:px-6 py-20 z-10 flex flex-col items-center justify-center text-center select-none"
          aria-label="Final Message"
        >
          {/* Subtle Ambient Glowing Stars Specific to the Final Screen */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {finalStars.map((s) => (
              <div
                key={`star-${s.id}`}
                className="absolute rounded-full bg-iceBlue animate-twinkle shadow-[0_0_8px_2px_rgba(186,230,253,0.7)]"
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

            {/* Subtle Blue Floating Particles */}
            {finalParticles.map((p) => (
              <div
                key={`particle-${p.id}`}
                className="absolute rounded-full bg-skyBlue/35 blur-[1px] animate-float"
                style={{
                  top: p.top,
                  left: p.left,
                  right: p.right,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.duration}s`,
                }}
              />
            ))}
          </div>

          {/* Centered Word Reveal: "Epdithanoo… 💙" (Exactly 2-second celestial pause) */}
          <motion.div
            initial={{ 
              opacity: 0, 
              y: shouldReduceMotion ? 0 : 16, 
              scale: shouldReduceMotion ? 1 : 0.95 
            }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1 
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 2.0,
              duration: shouldReduceMotion ? 0.3 : 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="my-auto py-12 flex flex-col items-center justify-center"
          >
            <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-iceBlue drop-shadow-[0_0_35px_rgba(186,230,253,0.7)]">
              Epdithanoo… <span className="inline-block text-primaryBlue animate-pulse">💙</span>
            </h1>
          </motion.div>

          {/* Subtle "Replay the Surprise" Option (Appears after the word has been revealed) */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0.1 : 4.0,
              duration: shouldReduceMotion ? 0.3 : 1.0,
              ease: "easeOut",
            }}
            className="mt-12 sm:mt-16 z-20"
          >
            <button
              onClick={handleReplayClick}
              className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs sm:text-sm font-light text-skyBlue/85 hover:text-softWhite bg-white/5 hover:bg-white/10 border border-skyBlue/20 hover:border-skyBlue/45 transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm cursor-pointer"
              aria-label="Replay the Surprise"
            >
              <RotateCcw className="w-3.5 h-3.5 text-iceBlue/80" />
              <span>Replay the Surprise</span>
            </button>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
