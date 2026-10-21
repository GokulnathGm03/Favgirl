import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export default function SoundToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const intervalRef = useRef(null);
  const isPlayingRef = useRef(false);
  const audioElemRef = useRef(null);
  const [isUsingAudioFile, setIsUsingAudioFile] = useState(false);

  // Soft celestial pentatonic scale (Eb major / C minor pentatonic: Eb4, F4, G4, Bb4, C5, Eb5, G5)
  const notes = [311.13, 349.23, 392.00, 466.16, 523.25, 622.25, 783.99];

  const playChime = (freq) => {
    if (!audioCtxRef.current || !isPlayingRef.current) return;
    const ctx = audioCtxRef.current;
    if (ctx.state !== 'running') return;

    try {
      const now = ctx.currentTime;

      // Primary Warm Sine Oscillator
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Soft Harmonizer Oscillator
      const oscHarmonic = ctx.createOscillator();
      const gainHarmonic = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      oscHarmonic.type = 'triangle';
      oscHarmonic.frequency.setValueAtTime(freq * 2, now); // 1 octave higher overtone

      // Gentle Celeste Envelope
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.045, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);

      gainHarmonic.gain.setValueAtTime(0.0001, now);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.008, now + 0.06);
      gainHarmonic.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      oscHarmonic.connect(gainHarmonic);
      gainHarmonic.connect(ctx.destination);

      osc.start(now);
      oscHarmonic.start(now);

      osc.stop(now + 2.9);
      oscHarmonic.stop(now + 2.9);
    } catch {
      // Graceful fallback if Web Audio is restricted
    }
  };

  const startCelestialSynth = async () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      if (audioCtxRef.current.state === 'suspended') {
        await audioCtxRef.current.resume();
      }

      isPlayingRef.current = true;
      setIsPlaying(true);

      // Immediate soft welcome chord
      playChime(notes[0]);
      setTimeout(() => playChime(notes[2]), 350);
      setTimeout(() => playChime(notes[4]), 700);

      // Gentle repeating celestial arpeggios
      let step = 0;
      intervalRef.current = setInterval(() => {
        if (!isPlayingRef.current) return;
        const progressions = [
          [0, 2, 4],
          [1, 3, 5],
          [2, 4, 6],
          [3, 5, 0],
        ];
        const chord = progressions[step % progressions.length];
        chord.forEach((noteIdx, i) => {
          setTimeout(() => {
            if (isPlayingRef.current) {
              playChime(notes[noteIdx]);
            }
          }, i * 360);
        });
        step++;
      }, 4200);
    } catch {
      setIsPlaying(false);
      isPlayingRef.current = false;
    }
  };

  const toggleSound = async () => {
    if (!isPlaying) {
      // Try playing the user's provided audio file first
      if (audioElemRef.current) {
        try {
          audioElemRef.current.volume = 0.55;
          await audioElemRef.current.play();
          setIsUsingAudioFile(true);
          isPlayingRef.current = true;
          setIsPlaying(true);
          return;
        } catch {
          // If audio file playback is blocked or fails, fall back to celestial synth
          setIsUsingAudioFile(false);
        }
      }

      // Fallback to synthesized celestial chime
      await startCelestialSynth();
    } else {
      // Turn Off
      isPlayingRef.current = false;
      setIsPlaying(false);

      if (audioElemRef.current) {
        try {
          audioElemRef.current.pause();
        } catch {
          // No-op
        }
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        try {
          audioCtxRef.current.suspend();
        } catch {
          // No-op
        }
      }
    }
  };

  useEffect(() => {
    return () => {
      isPlayingRef.current = false;
      if (audioElemRef.current) {
        try {
          audioElemRef.current.pause();
        } catch {
          // No-op
        }
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return (
    <>
      {/* Hidden audio element for user's instrumental MP3 track */}
      <audio
        ref={audioElemRef}
        src="/audio/Oh%20Shanthi%20Shanthi%20Instrumental.mp3"
        preload="none"
        loop
      />

      <button
        onClick={toggleSound}
        role="switch"
        aria-checked={isPlaying}
        aria-label={isPlaying ? "Music is on. Tap to turn off ambient music" : "Music is off. Tap to play music"}
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
    </>
  );
}
