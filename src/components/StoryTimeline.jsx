import React from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  MessageSquare, 
  SunMoon, 
  PhoneCall, 
  Sparkles, 
  ArrowRight,
  Compass
} from 'lucide-react';
import { storyChapters, storyConclusion } from '../data/storyData';

const iconMap = {
  GraduationCap: GraduationCap,
  MessageSquare: MessageSquare,
  SunMoon: SunMoon,
  PhoneCall: PhoneCall,
  Sparkles: Sparkles,
};

export default function StoryTimeline({ onContinue }) {
  return (
    <motion.section
      key="story-timeline"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[92vh] max-w-4xl mx-auto px-4 sm:px-6 py-16 z-10"
    >
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase text-skyBlue bg-skyBlue/10 border border-skyBlue/20 mb-3">
            <Compass className="w-3.5 h-3.5" />
            Chapter by Chapter
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-glow text-softWhite mb-4">
            Our Unexpected Story
          </h2>
          <p className="text-skyBlue/80 text-sm sm:text-base max-w-lg mx-auto font-light">
            Every meaningful bond starts with the simplest, most unforeseen moments.
          </p>
        </motion.div>
      </div>

      {/* Vertical Timeline Container */}
      <div className="relative">
        {/* Central Glowing Timeline Line */}
        <div 
          className="absolute left-4 sm:left-1/2 top-4 bottom-4 -translate-x-1/2 w-[2px] bg-gradient-to-b from-skyBlue/20 via-primaryBlue/50 to-skyBlue/20" 
          aria-hidden="true"
        />

        {/* Chapters */}
        <div className="space-y-12 sm:space-y-16">
          {storyChapters.map((chapter, index) => {
            const Icon = iconMap[chapter.icon] || Sparkles;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={chapter.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className={`relative flex flex-col sm:flex-row items-start ${
                  isEven ? 'sm:flex-row-reverse' : ''
                } gap-6 sm:gap-12`}
              >
                {/* Timeline Node Icon (Center) */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 z-20 flex items-center justify-center w-10 h-10 rounded-full bg-deepNavy border-2 border-primaryBlue shadow-glow-sm">
                  <Icon className="w-4 h-4 text-iceBlue" />
                </div>

                {/* Content Card */}
                <div className="ml-12 sm:ml-0 sm:w-1/2 sm:px-4">
                  <div className="glass-card glass-card-hover p-6 sm:p-7 rounded-2xl relative border border-skyBlue/20">
                    {/* Chapter Tag & Badge */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="font-mono text-primaryBlue font-semibold tracking-wider">
                        CHAPTER {chapter.number}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-skyBlue/10 text-skyBlue border border-skyBlue/20">
                        {chapter.period}
                      </span>
                    </div>

                    {/* Chapter Title */}
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-softWhite mb-3">
                      {chapter.title}
                    </h3>

                    {/* Chapter Body */}
                    <p className="text-softWhite/85 text-sm sm:text-base leading-relaxed font-light">
                      {chapter.content}
                    </p>
                  </div>
                </div>

                {/* Spacer for Alternate Side */}
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Story Concluding Quote */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-16 text-center max-w-xl mx-auto p-8 rounded-3xl glass-card border border-primaryBlue/30 shadow-glow-md"
      >
        <p className="font-serif italic text-lg sm:text-2xl text-softWhite leading-relaxed mb-6">
          "{storyConclusion}"
        </p>

        <button
          onClick={onContinue}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm sm:text-base font-medium text-softWhite bg-primaryBlue/30 hover:bg-primaryBlue/50 border border-skyBlue/40 transition-all duration-300 hover:scale-105 active:scale-95 shadow-glow-sm"
        >
          Explore Our Memories
          <ArrowRight className="w-4 h-4 text-iceBlue" />
        </button>
      </motion.div>
    </motion.section>
  );
}
