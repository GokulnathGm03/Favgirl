import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Maximize2, Heart } from 'lucide-react';
import { soloMemories } from '../data/galleryData';
import ImageWithFallback from './ImageWithFallback';
import PhotoLightbox from './PhotoLightbox';

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase text-skyBlue bg-skyBlue/10 border border-skyBlue/20 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Her Moments
        </span>
        <h3 className="font-serif text-2xl sm:text-4xl font-bold text-softWhite mb-2">
          Glimpses of Sowmi
        </h3>
        <p className="text-skyBlue/80 text-xs sm:text-sm max-w-md mx-auto font-light">
          Photographs that capture the poise, warmth, and grace you naturally share.
        </p>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {soloMemories.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative"
          >
            {/* Card Shell */}
            <div 
              onClick={() => setSelectedPhoto(photo)}
              className="glass-card glass-card-hover p-4 sm:p-5 rounded-3xl cursor-pointer border border-skyBlue/20 relative overflow-hidden transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative overflow-hidden rounded-2xl mb-4">
                <ImageWithFallback
                  src={photo.src}
                  alt={photo.alt}
                  placeholderTitle={photo.title}
                  expectedPath={photo.src}
                  aspectRatio="aspect-[4/5]"
                />

                {/* Subtle Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-deepNavy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-softWhite bg-black/50 backdrop-blur-sm border border-white/20">
                    <Maximize2 className="w-3.5 h-3.5 text-iceBlue" />
                    Expand Photo
                  </span>
                </div>
              </div>

              {/* Card Meta */}
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="font-mono text-primaryBlue font-semibold uppercase tracking-wider">
                  {photo.tag}
                </span>
                <span className="text-skyBlue/60 text-[11px]">
                  Moment {index + 1} of {soloMemories.length}
                </span>
              </div>

              <h4 className="font-serif text-lg sm:text-xl font-bold text-softWhite group-hover:text-iceBlue transition-colors duration-200">
                {photo.title}
              </h4>
              <p className="text-xs sm:text-sm text-skyBlue/80 font-light mt-0.5">
                {photo.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <PhotoLightbox
          photo={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
    </div>
  );
}
