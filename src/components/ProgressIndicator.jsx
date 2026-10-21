import React from 'react';
import { Sparkles, Cake, Compass, Image, Mail, Moon } from 'lucide-react';

const stages = [
  { id: 1, name: "Opening", icon: Sparkles },
  { id: 2, name: "Celebration", icon: Cake },
  { id: 3, name: "Our Story", icon: Compass },
  { id: 4, name: "Memories", icon: Image },
  { id: 5, name: "A Letter", icon: Mail },
  { id: 6, name: "A Secret", icon: Moon },
];

export default function ProgressIndicator({ currentStage, onSelectStage, maxUnlockedStage }) {
  return (
    <nav 
      aria-label="Universe Navigation"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-3 py-2 rounded-full glass-card border border-skyBlue/20 shadow-glow-sm flex items-center gap-1.5 sm:gap-2 backdrop-blur-md max-w-[94vw] overflow-x-auto"
    >
      {stages.map((stage) => {
        const Icon = stage.icon;
        const isActive = currentStage === stage.id;
        const isUnlocked = stage.id <= maxUnlockedStage;

        return (
          <button
            key={stage.id}
            onClick={() => isUnlocked && onSelectStage(stage.id)}
            disabled={!isUnlocked}
            aria-label={`Go to ${stage.name}`}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs transition-all duration-300 ${
              isActive
                ? 'bg-primaryBlue/25 text-softWhite border border-skyBlue/50 shadow-glow-sm font-medium'
                : isUnlocked
                ? 'text-skyBlue/70 hover:text-softWhite hover:bg-white/5 cursor-pointer'
                : 'text-white/20 cursor-not-allowed opacity-40'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-iceBlue animate-pulse' : ''}`} />
            <span className={`text-[11px] sm:text-xs whitespace-nowrap ${isActive ? 'inline' : 'hidden md:inline'}`}>
              {stage.name}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
