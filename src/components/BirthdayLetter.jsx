import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Sparkles, ArrowRight, Heart, Feather } from 'lucide-react';

export default function BirthdayLetter({ onContinue }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.section
      key="birthday-letter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[92vh] max-w-3xl mx-auto px-4 sm:px-6 py-16 z-10 flex flex-col items-center justify-center text-center"
    >
      {/* Section Header */}
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-skyBlue bg-skyBlue/10 border border-skyBlue/20 mb-3">
          <Feather className="w-3.5 h-3.5" />
          Words from the Heart
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-glow text-softWhite mb-2">
          A Letter For Sowmi
        </h2>
        <p className="text-skyBlue/80 text-xs sm:text-sm font-light">
          Written with honest thoughts and genuine gratitude.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* Closed Envelope Screen */
          <motion.div
            key="envelope-closed"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center"
          >
            {/* Interactive Envelope Graphic */}
            <div 
              onClick={() => setIsOpen(true)}
              className="group relative cursor-pointer my-6 transition-transform duration-300 hover:scale-105"
              title="Click to open your letter"
            >
              {/* Outer Envelope Glow */}
              <div className="absolute inset-0 bg-primaryBlue/25 rounded-3xl blur-2xl group-hover:bg-primaryBlue/40 transition-colors" />

              {/* Envelope Body */}
              <div className="relative w-72 h-48 sm:w-88 sm:h-56 bg-gradient-to-br from-[#0F294E] via-[#0B1F3A] to-[#08172C] rounded-2xl border-2 border-skyBlue/40 shadow-glow-md flex flex-col items-center justify-center overflow-hidden">
                {/* Envelope Flap Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 350 220" fill="none">
                  {/* Flap Triangles */}
                  <path d="M0 0 L175 125 L350 0 Z" fill="#143464" stroke="#60A5FA" strokeWidth="1.5" opacity="0.8" />
                  <path d="M0 220 L135 105" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
                  <path d="M350 220 L215 105" stroke="#38BDF8" strokeWidth="1" opacity="0.4" />
                </svg>

                {/* Wax / Constellation Seal */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-primaryBlue to-skyBlue border-2 border-iceBlue flex items-center justify-center shadow-glow-sm group-hover:rotate-12 transition-transform duration-300">
                  <Mail className="w-7 h-7 text-midnightBlue" />
                </div>

                <div className="relative z-10 mt-3 text-center">
                  <span className="font-serif text-sm sm:text-base text-softWhite/90 tracking-wide">
                    For Sowmiya 💙
                  </span>
                </div>
              </div>
            </div>

            {/* Prompt Button */}
            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-4"
            >
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-base font-medium text-midnightBlue bg-gradient-to-r from-iceBlue via-skyBlue to-primaryBlue shadow-candle hover:scale-105 active:scale-95 transition-all duration-300 font-sans"
              >
                Open Your Letter 💌
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* Opened Letter Paper */
          <motion.div
            key="letter-opened"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full text-left"
          >
            {/* Elegant Letter Sheet with Celestial Parchment Styling */}
            <div className="relative glass-card border border-skyBlue/30 rounded-3xl p-6 sm:p-10 md:p-12 shadow-glow-lg overflow-hidden bg-gradient-to-b from-[#0B1F3A]/90 via-[#07172E]/90 to-[#040C18]/95">
              {/* Subtle top decorative ribbon */}
              <div className="flex items-center justify-between pb-6 mb-8 border-b border-skyBlue/20">
                <div className="flex items-center gap-2 text-skyBlue">
                  <Sparkles className="w-4 h-4 text-primaryBlue" />
                  <span className="font-mono text-xs uppercase tracking-widest text-primaryBlue font-semibold">
                    Birthday Letter
                  </span>
                </div>
                <span className="text-xs font-mono text-skyBlue/60">
                  To: Sowmi
                </span>
              </div>

              {/* Exact Letter Content from Requirements */}
              <div className="space-y-6 text-softWhite/90 font-serif leading-relaxed text-base sm:text-lg">
                <p className="font-bold text-xl sm:text-2xl text-softWhite">
                  Dear Sowmi 💙,
                </p>

                <p className="font-semibold text-iceBlue">
                  Happy Birthday!
                </p>

                <p className="font-light">
                  Sometimes, I wonder how we actually became this close.
                  We were in the same school for two years, yet we barely
                  spoke. And then, somehow, a few WhatsApp statuses,
                  random questions, morning wishes, and goodnight messages
                  turned into long conversations and beautiful memories.
                </p>

                <p className="font-light">
                  I don't know exactly when our conversations became
                  something I looked forward to, but I know that your calls
                  could make an ordinary day feel a little happier.
                </p>

                <p className="font-light">
                  We've had our disagreements and misunderstandings, too.
                  But through it all, you've become someone whose presence
                  I genuinely value.
                </p>

                <p className="font-light">
                  I'm really glad our paths crossed the way they did.
                </p>

                <p className="font-light">
                  On your birthday, I wish you happiness, peace, success,
                  beautiful memories, and countless reasons to smile.
                </p>

                <p className="font-light">
                  I hope life brings you closer to all the things you dream of
                  and gives you the strength to achieve everything you work for.
                </p>

                <p className="font-light">
                  Thank you for being a part of my life, Sowmi.
                  We may have started talking without knowing where our
                  conversations would lead, but I'm genuinely happy that they did.
                </p>

                <p className="font-light text-softWhite">
                  Keep smiling, Sowmi.
                  You deserve so many beautiful things. 💙
                </p>

                <p className="font-medium text-iceBlue text-lg sm:text-xl">
                  Happy Birthday once again! ✨
                </p>

                {/* Sign Off */}
                <div className="pt-6 mt-8 border-t border-skyBlue/15 font-sans">
                  <p className="italic text-skyBlue/90 text-sm sm:text-base font-light">
                    — Someone who's really glad to have you in his life.
                  </p>
                </div>
              </div>
            </div>

            {/* Transition to The Final Secret */}
            <div className="mt-12 text-center">
              <button
                onClick={onContinue}
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm sm:text-base font-medium text-softWhite bg-primaryBlue/30 hover:bg-primaryBlue/50 border border-skyBlue/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm"
              >
                One Final Thought...
                <ArrowRight className="w-4 h-4 text-iceBlue" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
