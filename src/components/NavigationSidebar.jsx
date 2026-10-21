import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Sparkles, 
  Cake, 
  Compass, 
  Image as ImageIcon, 
  Mail, 
  Moon, 
  ChevronRight, 
  Menu, 
  X 
} from 'lucide-react';

const navigationStages = [
  { id: 1, name: "Opening", icon: Sparkles, hint: "Hey, Sowmi" },
  { id: 2, name: "Celebration", icon: Cake, hint: "Make a wish" },
  { id: 3, name: "Our Story", icon: Compass, hint: "Chapters 1 to 5" },
  { id: 4, name: "Memories", icon: ImageIcon, hint: "Moments & photographs" },
  { id: 5, name: "A Letter", icon: Mail, hint: "Words from the heart" },
  { id: 6, name: "A Secret", icon: Moon, hint: "One final thought" },
];

export default function NavigationSidebar({ currentStage, onSelectStage, maxUnlockedStage }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const sidebarRef = useRef(null);
  const mobileDrawerRef = useRef(null);

  // Close mobile drawer when pressing Escape or clicking outside
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (mobileOpen && mobileDrawerRef.current && !mobileDrawerRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [mobileOpen]);

  const handleStageClick = (stageId) => {
    onSelectStage(stageId);
    setMobileOpen(false);
  };

  return (
    <>
      {/* ========================================================
          DESKTOP LEFT SIDEBAR (Screen width >= 1024px)
          - Collapsed width: 60px
          - Expanded width on hover: 185px (stops well before content)
          - Vertically centered
          - Dark navy translucent glassmorphism
          ======================================================== */}
      <aside
        ref={sidebarRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="hidden lg:block fixed left-3 sm:left-4 top-1/2 -translate-y-1/2 z-40 transition-all duration-300 ease-out select-none"
        style={{
          width: isHovered ? '185px' : '60px',
        }}
        aria-label="Universe Stage Navigation"
      >
        <nav
          className="relative glass-card border border-skyBlue/25 rounded-2xl py-3 px-2 shadow-glow-sm bg-[#0B1F3A]/85 backdrop-blur-md overflow-hidden transition-all duration-300"
          style={{
            boxShadow: isHovered 
              ? '0 0 25px rgba(96, 165, 250, 0.35), 0 10px 30px -5px rgba(7, 20, 38, 0.8)' 
              : '0 0 15px rgba(96, 165, 250, 0.2)',
          }}
        >
          {/* Subtle Accent Glow Trail */}
          <div 
            className="absolute left-0 top-0 bottom-0 w-[2.5px] bg-gradient-to-b from-skyBlue/20 via-primaryBlue/60 to-skyBlue/20 pointer-events-none" 
            aria-hidden="true" 
          />

          <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
            {navigationStages.map((stage) => {
              const Icon = stage.icon;
              const isActive = currentStage === stage.id;
              const isUnlocked = stage.id <= maxUnlockedStage;

              return (
                <li key={stage.id} className="relative">
                  <button
                    onClick={() => isUnlocked && handleStageClick(stage.id)}
                    disabled={!isUnlocked}
                    title={!isHovered ? `${stage.name} (${stage.hint})` : undefined}
                    aria-label={`Navigate to ${stage.name}`}
                    aria-current={isActive ? "step" : undefined}
                    className={`w-full h-11 rounded-xl flex items-center transition-all duration-200 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-skyBlue/60 ${
                      isActive
                        ? 'bg-primaryBlue/30 text-softWhite border border-skyBlue/50 shadow-glow-sm font-medium'
                        : isUnlocked
                        ? 'text-skyBlue/75 hover:text-softWhite hover:bg-white/10 hover:border-skyBlue/30 border border-transparent'
                        : 'text-white/20 cursor-not-allowed opacity-35 border border-transparent'
                    }`}
                  >
                    {/* Fixed Icon Container (ensures icons stay aligned at 44px offset) */}
                    <div className="w-11 h-11 flex-shrink-0 flex items-center justify-center">
                      <Icon 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive 
                            ? 'text-iceBlue scale-110 drop-shadow-[0_0_8px_rgba(186,230,253,0.8)]' 
                            : 'text-skyBlue/80 group-hover:text-softWhite'
                        }`} 
                      />
                    </div>

                    {/* Smoothly Revealed Label beside Icon */}
                    <div
                      className={`overflow-hidden transition-all duration-300 flex items-center justify-between flex-grow pr-2.5 ${
                        isHovered 
                          ? 'opacity-100 max-w-[125px] translate-x-0' 
                          : 'opacity-0 max-w-0 -translate-x-2 pointer-events-none'
                      }`}
                    >
                      <span className="text-xs font-sans tracking-wide whitespace-nowrap truncate font-medium">
                        {stage.name}
                      </span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-iceBlue shadow-[0_0_6px_#BAE6FD] flex-shrink-0 ml-1.5" />
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* ========================================================
          MOBILE COMPACT NAVIGATION (Screen width < 1024px)
          - Floating compact toggle button on left
          - Tap to expand compact slide-out navigation rail
          - Tap outside or item to collapse
          - Does not block central content or photo captions
          ======================================================== */}
      <div className="lg:hidden">
        {/* Floating Toggle Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-expanded={mobileOpen}
          aria-label="Toggle stage navigation menu"
          className={`fixed left-3 top-20 z-40 min-h-[44px] min-w-[44px] px-3 py-2 rounded-full glass-card border border-skyBlue/35 text-skyBlue shadow-glow-sm flex items-center gap-1.5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-skyBlue active:scale-95 cursor-pointer ${
            mobileOpen ? 'bg-primaryBlue/35 text-softWhite' : 'hover:bg-deepNavy/80'
          }`}
        >
          {mobileOpen ? (
            <X className="w-4 h-4 text-iceBlue" />
          ) : (
            <Compass className="w-4 h-4 text-iceBlue animate-pulse" />
          )}
          <span className="text-[11px] font-medium tracking-wide">
            {navigationStages.find(s => s.id === currentStage)?.name || "Stages"}
          </span>
        </button>

        {/* Mobile Slide-Out Navigation Drawer */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.1 : 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            >
              <motion.div
                ref={mobileDrawerRef}
                initial={{ x: -220, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -220, opacity: 0 }}
                transition={{ duration: shouldReduceMotion ? 0.1 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="absolute left-3 top-36 w-[200px] glass-card border border-skyBlue/30 rounded-2xl p-3 shadow-glow-lg bg-[#0B1F3A]/95 backdrop-blur-xl"
                role="dialog"
                aria-label="Mobile Stage Navigation"
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-skyBlue/20 px-1">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-primaryBlue font-semibold">
                    Journey Stages
                  </span>
                  <span className="text-[10px] text-skyBlue/60">
                    {currentStage} / {navigationStages.length}
                  </span>
                </div>

                <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
                  {navigationStages.map((stage) => {
                    const Icon = stage.icon;
                    const isActive = currentStage === stage.id;
                    const isUnlocked = stage.id <= maxUnlockedStage;

                    return (
                      <li key={stage.id}>
                        <button
                          onClick={() => isUnlocked && handleStageClick(stage.id)}
                          disabled={!isUnlocked}
                          className={`w-full min-h-[44px] px-2.5 py-2 rounded-xl flex items-center justify-between text-left transition-all duration-200 cursor-pointer ${
                            isActive
                              ? 'bg-primaryBlue/30 text-softWhite border border-skyBlue/50 shadow-glow-sm font-medium'
                              : isUnlocked
                              ? 'text-skyBlue/85 hover:text-softWhite hover:bg-white/10'
                              : 'text-white/20 cursor-not-allowed opacity-35'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <Icon className={`w-4 h-4 ${isActive ? 'text-iceBlue' : 'text-skyBlue/70'}`} />
                            <span className="text-xs font-sans tracking-wide">
                              {stage.name}
                            </span>
                          </div>
                          {isActive && (
                            <div className="w-1.5 h-1.5 rounded-full bg-iceBlue shadow-[0_0_6px_#BAE6FD]" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
