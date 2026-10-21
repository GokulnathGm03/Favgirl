import React from 'react';
import { motion } from 'framer-motion';
import { Image, ArrowRight } from 'lucide-react';
import PhotoGallery from './PhotoGallery';
import MemoryReveal from './MemoryReveal';

export default function MemoriesSection({ onContinue }) {
  return (
    <motion.section
      key="memories-section"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[92vh] max-w-5xl mx-auto px-4 sm:px-6 py-16 z-10"
    >
      {/* Primary Section Header */}
      <div className="text-center mb-14">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-skyBlue bg-skyBlue/10 border border-skyBlue/20 mb-3">
            <Image className="w-3.5 h-3.5" />
            Stage 4 • Memories
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-glow text-softWhite mb-3">
            Our Memories
          </h2>
          <p className="text-skyBlue/85 text-sm sm:text-base max-w-lg mx-auto font-light">
            Moments captured in quiet frames, holding stories we look back on with a genuine smile.
          </p>
        </motion.div>
      </div>

      {/* SECTION A: Her Moments */}
      <PhotoGallery />

      {/* SECTION B: An Unexpected Memory */}
      <MemoryReveal />

      {/* Continue to Letter Button */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 text-center"
      >
        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full text-sm sm:text-base font-medium text-softWhite bg-primaryBlue/30 hover:bg-primaryBlue/50 border border-skyBlue/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm"
        >
          A Letter For Sowmi
          <ArrowRight className="w-4 h-4 text-iceBlue" />
        </button>
      </motion.div>
    </motion.section>
  );
}
