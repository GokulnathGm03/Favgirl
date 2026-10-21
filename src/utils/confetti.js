import confetti from 'canvas-confetti';

/**
 * Trigger a gentle, elegant celebration confetti burst
 * Customized with dreamy sky blue, pastel pink, lavender, soft peach, and gold
 */
export const triggerCelebrationConfetti = () => {
  // Check prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const count = 180;
  const defaults = {
    origin: { y: 0.7 },
    colors: [
      '#F9A8D4', // Pastel pink
      '#C4B5FD', // Lavender
      '#FDBA9B', // Soft peach
      '#BFDBFE', // Powder blue
      '#60A5FA', // Primary blue
      '#FDE047', // Soft gold
      '#FFFFFF'  // White star
    ],
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
  const colors = ['#F9A8D4', '#C4B5FD', '#FDBA9B', '#BAE6FD', '#FFFFFF'];

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
