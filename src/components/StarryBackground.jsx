import React, { useMemo } from 'react';

export default function StarryBackground() {
  // Generate a deterministic array of starry points
  const stars = useMemo(() => {
    return Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      x: (i * 17 + 23) % 100,
      y: (i * 29 + 11) % 100,
      size: (i % 3 === 0 ? 3 : i % 2 === 0 ? 2 : 1.5),
      opacity: 0.2 + ((i * 7) % 80) / 100,
      animationDelay: `${((i * 1.3) % 5).toFixed(1)}s`,
      animationDuration: `${3 + ((i * 1.7) % 4).toFixed(1)}s`,
    }));
  }, []);

  const floatingParticles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      x: (i * 23 + 5) % 95,
      y: (i * 37 + 13) % 95,
      size: 4 + (i % 4) * 2,
      duration: 8 + (i % 5) * 3,
      delay: (i * 0.9) % 6,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Deep Cosmos Radial Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#071426] via-[#0B1F3A] to-[#050D1A]" />
      
      {/* Moonlight Radial Glow in top right */}
      <div 
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full opacity-40 blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(147,197,253,0.35) 0%, rgba(96,165,250,0.15) 50%, rgba(7,20,38,0) 80%)'
        }}
      />

      {/* Secondary Soft Nebula Glow in lower left */}
      <div 
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, rgba(30,58,138,0.1) 60%, rgba(7,20,38,0) 90%)'
        }}
      />

      {/* Ambient Twinkling Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-softWhite animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
            boxShadow: star.size > 2 ? '0 0 6px 1px rgba(186, 230, 253, 0.8)' : 'none',
          }}
        />
      ))}

      {/* Gentle Floating Cosmic Dust / Particles */}
      {floatingParticles.map((p) => (
        <div
          key={`particle-${p.id}`}
          className="absolute rounded-full bg-skyBlue/30 blur-[1px] animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

      {/* Subtle Shooting Star */}
      <div 
        className="absolute top-[18%] left-[-100px] w-24 h-[1.5px] bg-gradient-to-r from-transparent via-skyBlue to-softWhite opacity-0 pointer-events-none"
        style={{
          transform: 'rotate(-32deg)',
          animation: 'shootingStar 14s ease-in-out infinite 4s'
        }}
      />

      <style>{`
        @keyframes shootingStar {
          0% {
            transform: translateX(0) translateY(0) rotate(-32deg);
            opacity: 0;
          }
          4% {
            opacity: 0.9;
          }
          8% {
            transform: translateX(70vw) translateY(45vh) rotate(-32deg);
            opacity: 0;
          }
          100% {
            transform: translateX(70vw) translateY(45vh) rotate(-32deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
