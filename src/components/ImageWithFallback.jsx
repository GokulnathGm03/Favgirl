import React, { useState } from 'react';
import { Camera, Sparkles } from 'lucide-react';

export default function ImageWithFallback({ 
  src, 
  fallbackSrc,
  alt, 
  className = "", 
  placeholderTitle = "Photograph Placeholder", 
  expectedPath = "/images/sowmi-01.jpg",
  aspectRatio = "aspect-[3/4]",
  objectPosition = "object-center"
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [triedFallback, setTriedFallback] = useState(false);

  const handleError = () => {
    if (fallbackSrc && !triedFallback && currentSrc !== fallbackSrc) {
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  };

  return (
    <div className={`relative overflow-hidden ${aspectRatio} w-full rounded-2xl bg-deepNavy/80 border border-skyBlue/20 ${className}`}>
      {!hasError ? (
        <>
          <img
            src={currentSrc}
            alt={alt}
            loading="lazy"
            onLoad={() => setIsLoading(false)}
            onError={handleError}
            className={`w-full h-full object-cover ${objectPosition} transition-all duration-700 ${
              isLoading ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'
            }`}
          />
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-deepNavy/70 backdrop-blur-sm animate-pulse">
              <Camera className="w-8 h-8 text-skyBlue/50 mb-2" />
              <span className="text-xs text-skyBlue/70">Loading memory...</span>
            </div>
          )}
        </>
      ) : (
        /* Elegant celestial placeholder when real photo is not yet placed */
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#0B1F3A] to-[#071426] border border-dashed border-skyBlue/40">
          <div className="w-14 h-14 rounded-full bg-primaryBlue/15 border border-skyBlue/30 flex items-center justify-center mb-4 shadow-glow-sm">
            <Camera className="w-6 h-6 text-iceBlue animate-float" />
          </div>

          <h4 className="font-serif text-lg font-semibold text-softWhite mb-1">
            {placeholderTitle}
          </h4>

          <p className="text-xs text-skyBlue/80 mb-3 max-w-xs leading-relaxed font-light">
            Ready for Sowmi's photograph. Add your image file to see it here!
          </p>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-skyBlue/25 text-[11px] font-mono text-iceBlue">
            <span>public{expectedPath}</span>
          </div>

          <div className="mt-3 flex items-center gap-1 text-[10px] text-skyBlue/60">
            <Sparkles className="w-3 h-3 text-primaryBlue" />
            <span>Preserving authentic memories</span>
          </div>
        </div>
      )}
    </div>
  );
}
