import confetti from 'canvas-confetti';

/**
 * Trigger a gentle, elegant cosmic confetti burst
 * Customized with dreamy sky blue, ice blue, silver, and soft gold colors
 */
export const triggerCelebrationConfetti = () => {
  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const count = 180;
  const defaults = {
    origin: { y: 0.7 },
    colors: ['#60A5FA', '#93C5FD', '#BAE6FD', '#F8FAFC', '#FDE047', '#E0F2FE'],
    disableForReducedMotion: true,
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Gentle phased bursts
  fire(0.25, {
    spread: 30,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

/**
 * Gentle sparkling stars effect
 */
export const triggerWishSparkles = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const end = Date.now() + 1.2 * 1000;
  const colors = ['#93C5FD', '#BAE6FD', '#FFFFFF', '#60A5FA'];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
