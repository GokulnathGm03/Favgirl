import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audioManager';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(audioManager.getIsPlaying());

  useEffect(() => {
    // Subscribe to centralized audio manager for accurate playback state sync
    const unsubscribe = audioManager.subscribe((playingState) => {
      setIsPlaying(playingState);
    });
    return () => unsubscribe();
  }, []);

  const handleToggle = () => {
    audioManager.toggle();
  };

  return (
    <button
      onClick={handleToggle}
      role="switch"
      aria-checked={isPlaying}
      aria-label={isPlaying ? "Music is playing. Tap to mute music" : "Music is off. Tap to play instrumental music"}
      className={`min-h-[44px] flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-skyBlue/50 cursor-pointer shadow-sm select-none ${
        isPlaying
          ? 'bg-primaryBlue/25 text-softWhite border border-skyBlue/60 shadow-glow-sm'
          : 'glass-card hover:bg-deepNavy/90 text-skyBlue/80 hover:text-softWhite border border-skyBlue/25'
      }`}
    >
      {isPlaying ? (
        <>
          <div className="relative flex items-center justify-center">
            <Volume2 className="w-4 h-4 text-iceBlue animate-pulse" />
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          </div>
          <span className="text-[11px] sm:text-xs font-medium tracking-wide">
            Music: <strong className="text-iceBlue">On</strong>
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-skyBlue/60" />
          <span className="text-[11px] sm:text-xs font-normal tracking-wide text-softWhite/70">
            Music: <span className="text-softWhite/50">Off</span>
          </span>
        </>
      )}
    </button>
  );
}
