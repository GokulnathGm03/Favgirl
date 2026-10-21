import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Moon, Sparkles, Share2, Check, Send } from 'lucide-react';
import { triggerCelebrationConfetti } from '../utils/confetti';

export default function FinalSecret({ onReplay }) {
  const [copiedShare, setCopiedShare] = useState(false);

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

  return (
    <motion.section
      key="final-secret"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="relative min-h-[92vh] max-w-2xl mx-auto px-4 sm:px-6 py-16 z-10 flex flex-col items-center justify-center text-center"
    >
      {/* Soft Moon Icon */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
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
          transition={{ delay: 0.8, duration: 1 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-skyBlue/90 font-light leading-relaxed"
        >
          Some people become special to us<br />
          <span className="text-softWhite font-normal">without us ever planning it.</span>
        </motion.p>

        {/* Line 2 */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="font-serif text-xl sm:text-2xl md:text-3xl text-softWhite leading-relaxed"
        >
          And maybe that's what makes them<br />
          <span className="text-glow text-iceBlue font-medium">even more special. 💙</span>
        </motion.p>

        {/* Final Line - subtle hint of affection */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.8, duration: 1.2 }}
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
        transition={{ delay: 5.2, duration: 0.9 }}
        className="mb-10"
      >
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-glow text-softWhite mb-3">
          Happy Birthday, Sowmiya! <span className="text-primaryBlue">💙</span>
        </h2>
        <p className="text-xs sm:text-sm text-skyBlue/70 font-light">
          May your year ahead be as bright and peaceful as the stars.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 5.8, duration: 0.8 }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        {/* Replay Button */}
        <button
          onClick={onReplay}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-medium text-softWhite bg-primaryBlue/30 hover:bg-primaryBlue/50 border border-skyBlue/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm"
        >
          <RotateCcw className="w-4 h-4 text-iceBlue" />
          Replay This Little Universe ↺
        </button>

        {/* Optional WhatsApp Share */}
        <button
          onClick={handleShareWhatsApp}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-skyBlue/90 hover:text-softWhite glass-card hover:bg-deepNavy/80 border border-skyBlue/20 transition-all duration-300 hover:scale-105"
          title="Share via WhatsApp"
        >
          <Send className="w-4 h-4 text-skyBlue" />
          <span>Send to Sowmi</span>
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyShare}
          className="inline-flex items-center gap-2 px-4 py-3 rounded-full text-xs font-medium text-skyBlue/80 hover:text-softWhite glass-card hover:bg-deepNavy/80 border border-skyBlue/20 transition-all duration-300"
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
      </motion.div>
    </motion.section>
  );
}
