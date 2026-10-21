import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);

  // Soft pentatonic frequencies (Dreamy Celestial / Music Box tones)
  // Eb major / C minor pentatonic: Eb4, F4, G4, Bb4, C5, Eb5, G5
  const notes = [311.13, 349.23, 392.00, 466.16, 523.25, 622.25, 783.99];

  const playChime = (freq) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    
    // Oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Warm sine wave with subtle triangle harmonic
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    // Envelope
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 2.6);
  };

  const toggleSound = () => {
    if (!isPlaying) {
      // Start ambient synth
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      setIsPlaying(true);
      
      // Play a soft chord right away
      playChime(notes[0]);
      setTimeout(() => playChime(notes[2]), 400);
      setTimeout(() => playChime(notes[4]), 800);

      // Play soft ambient arpeggios every few seconds
      let step = 0;
      intervalRef.current = setInterval(() => {
        const pattern = [
          [0, 2, 4],
          [1, 3, 5],
          [2, 4, 6],
          [3, 5, 0],
        ];
        const chord = pattern[step % pattern.length];
        chord.forEach((noteIdx, i) => {
          setTimeout(() => {
            playChime(notes[noteIdx]);
          }, i * 380);
        });
        step++;
      }, 4000);
    } else {
      // Mute / stop
      setIsPlaying(false);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      className="fixed top-4 right-4 z-50 flex items-center gap-2 px-3.5 py-2 rounded-full glass-card hover:bg-deepNavy/80 border border-skyBlue/30 text-skyBlue text-xs font-medium tracking-wide transition-all duration-300 hover:scale-105 shadow-glow-sm"
      title={isPlaying ? "Mute celestial ambient chime" : "Play subtle celestial ambient chime"}
      aria-label={isPlaying ? "Mute ambient music" : "Play ambient music"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-primaryBlue animate-pulse" />
          <span className="hidden sm:inline text-softWhite/90">Music On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-softWhite/60" />
          <span className="hidden sm:inline text-softWhite/60">Music Off</span>
        </>
      )}
    </button>
  );
}
