import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StarryBackground from './components/StarryBackground';
import SoundToggle from './components/SoundToggle';
import NavigationSidebar from './components/NavigationSidebar';
import OpeningScreen from './components/OpeningScreen';
import BirthdayCelebration from './components/BirthdayCelebration';
import StoryTimeline from './components/StoryTimeline';
import MemoriesSection from './components/MemoriesSection';
import BirthdayLetter from './components/BirthdayLetter';
import FinalSecret from './components/FinalSecret';
import { audioManager } from './utils/audioManager';

export default function App() {
  const [currentStage, setCurrentStage] = useState(1);
  const [maxUnlockedStage, setMaxUnlockedStage] = useState(1);

  // Scroll to top on stage change
  const navigateToStage = (stageNum) => {
    setCurrentStage(stageNum);
    if (stageNum > maxUnlockedStage) {
      setMaxUnlockedStage(stageNum);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenSurprise = () => {
    // Start background music with smooth fade-in when Sowmi opens the surprise
    audioManager.play();
    navigateToStage(2);
  };

  const handleReplay = () => {
    setCurrentStage(1);
    setMaxUnlockedStage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Keyboard navigation shortcuts: Left / Right arrow keys for unlocked stages
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentStage < maxUnlockedStage) {
        navigateToStage(currentStage + 1);
      } else if (e.key === 'ArrowLeft' && currentStage > 1) {
        navigateToStage(currentStage - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStage, maxUnlockedStage]);

  return (
    <div className="relative min-h-[100dvh] bg-[#071426] text-[#F8FAFC] overflow-x-hidden flex flex-col justify-between selection:bg-primaryBlue/30 selection:text-white">
      {/* Fixed Ambient Cosmos Background */}
      <StarryBackground />

      {/* Top Bar Header & Controls */}
      <header className="relative z-40 w-full px-4 sm:px-8 py-3.5 sm:py-4 flex items-center justify-between gap-3 max-w-full">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full bg-primaryBlue animate-pulse shadow-glow-sm flex-shrink-0" />
          <span className="font-serif tracking-wide text-xs sm:text-sm text-softWhite/85 truncate">
            A Little Universe Called Sowmi <span className="text-primaryBlue">💙</span>
          </span>
        </div>

        {/* Audio Toggle (Never autoplays, starts muted) */}
        <SoundToggle />
      </header>

      {/* Floating Vertical Navigation Sidebar (Left side, replaces bottom navbar) */}
      <AnimatePresence>
        {maxUnlockedStage > 1 && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <NavigationSidebar
              currentStage={currentStage}
              maxUnlockedStage={maxUnlockedStage}
              onSelectStage={navigateToStage}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Stage Display Area:
          Includes subtle left padding on laptops (lg:pl-16 xl:pl-0) to maintain a generous visible gap
          between the left sidebar and central cards without shifting mobile layout */}
      <main className="relative z-10 flex-grow flex items-center justify-center w-full px-4 sm:px-6 lg:pl-16 xl:pl-0 pb-16 sm:pb-20">
        <AnimatePresence mode="wait">
          {currentStage === 1 && (
            <OpeningScreen
              key="stage-1"
              onOpenSurprise={handleOpenSurprise}
            />
          )}

          {currentStage === 2 && (
            <BirthdayCelebration
              key="stage-2"
              onContinue={() => navigateToStage(3)}
            />
          )}

          {currentStage === 3 && (
            <StoryTimeline
              key="stage-3"
              onContinue={() => navigateToStage(4)}
            />
          )}

          {currentStage === 4 && (
            <MemoriesSection
              key="stage-4"
              onContinue={() => navigateToStage(5)}
            />
          )}

          {currentStage === 5 && (
            <BirthdayLetter
              key="stage-5"
              onContinue={() => navigateToStage(6)}
            />
          )}

          {currentStage === 6 && (
            <FinalSecret
              key="stage-6"
              onReplay={handleReplay}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
