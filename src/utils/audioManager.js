/**
 * Centralized Audio Manager for "A Little Universe Called Sowmi"
 * 
 * - Manages a single persistent HTML5 Audio instance
 * - Never autoplays on initial page load
 * - Unlocks playback only upon user interaction ("Open Your Surprise" or Music Toggle)
 * - Smooth fade-in (1.5s) on start/resume and gentle fade-out (0.6s) on pause/mute
 * - Prevents multiple audio instances
 * - Continuous playback across section navigation
 * - Synchronizes state with UI controls
 * - Graceful fallback to celestial Web Audio synthesizer if audio file fails
 */

class BackgroundAudioManager {
  constructor() {
    this.audio = null;
    this.isPlaying = false;
    this.listeners = new Set();
    this.targetVolume = 0.55;
    this.fadeInterval = null;
    this.audioSources = [
      '/audio/oh-shanthi-bgm.mp3',
      '/audio/Oh%20Shanthi%20Shanthi%20Instrumental.mp3'
    ];
    this.currentSourceIndex = 0;
    this.isSynthFallback = false;
    this.synthCtx = null;
    this.synthInterval = null;
  }

  // Initialize the single audio element
  initAudio() {
    if (this.audio) return this.audio;

    try {
      this.audio = new Audio();
      this.audio.src = this.audioSources[this.currentSourceIndex];
      this.audio.loop = true;
      this.audio.preload = 'auto';
      this.audio.volume = 0;

      // Event Listeners for accurate synchronization
      this.audio.addEventListener('play', () => {
        this.isPlaying = true;
        this.notifyListeners();
      });

      this.audio.addEventListener('pause', () => {
        // Only set playing to false if we aren't in the middle of a fade
        if (this.audio && this.audio.volume <= 0.05) {
          this.isPlaying = false;
          this.notifyListeners();
        }
      });

      this.audio.addEventListener('error', (e) => {
        console.warn('Audio file source error, trying fallback source or celestial synth...', e);
        if (this.currentSourceIndex < this.audioSources.length - 1) {
          this.currentSourceIndex++;
          this.audio.src = this.audioSources[this.currentSourceIndex];
          if (this.isPlaying) {
            this.audio.play().catch(() => this.fallbackToSynth());
          }
        } else {
          this.fallbackToSynth();
        }
      });
    } catch (err) {
      console.warn('HTML5 Audio initialization failed, enabling synth fallback:', err);
    }

    return this.audio;
  }

  subscribe(callback) {
    this.listeners.add(callback);
    callback(this.isPlaying);
    return () => this.listeners.delete(callback);
  }

  notifyListeners() {
    this.listeners.forEach(cb => {
      try {
        cb(this.isPlaying);
      } catch {
        // No-op
      }
    });
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  // Fade In Volume smoothly
  fadeIn(durationMs = 1500) {
    if (!this.audio) return;
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    const steps = 30;
    const stepTime = durationMs / steps;
    const volumeIncrement = this.targetVolume / steps;

    this.audio.volume = 0.01;
    let currentVol = 0.01;

    this.fadeInterval = setInterval(() => {
      currentVol = Math.min(this.targetVolume, currentVol + volumeIncrement);
      if (this.audio) {
        this.audio.volume = parseFloat(currentVol.toFixed(3));
      }
      if (currentVol >= this.targetVolume) {
        clearInterval(this.fadeInterval);
        this.fadeInterval = null;
      }
    }, stepTime);
  }

  // Fade Out Volume smoothly before pausing
  fadeOut(durationMs = 700) {
    if (!this.audio) return Promise.resolve();
    if (this.fadeInterval) clearInterval(this.fadeInterval);

    return new Promise((resolve) => {
      const steps = 20;
      const stepTime = durationMs / steps;
      let currentVol = this.audio.volume;
      const volumeDecrement = currentVol / steps;

      this.fadeInterval = setInterval(() => {
        currentVol = Math.max(0, currentVol - volumeDecrement);
        if (this.audio) {
          this.audio.volume = parseFloat(currentVol.toFixed(3));
        }
        if (currentVol <= 0.01) {
          clearInterval(this.fadeInterval);
          this.fadeInterval = null;
          if (this.audio) {
            this.audio.pause();
          }
          this.isPlaying = false;
          this.notifyListeners();
          resolve();
        }
      }, stepTime);
    });
  }

  // Play / Resume with smooth fade-in
  async play() {
    if (this.isPlaying && this.audio && !this.audio.paused) return;

    this.initAudio();

    if (this.audio) {
      try {
        await this.audio.play();
        this.isPlaying = true;
        this.fadeIn(1600);
        this.notifyListeners();
        return;
      } catch (err) {
        console.warn('Direct audio file play was prevented or failed:', err);
        // Fallback to synth if audio file cannot be played
        this.fallbackToSynth();
      }
    } else {
      this.fallbackToSynth();
    }
  }

  // Pause / Mute with gentle fade-out
  async pause() {
    if (this.isSynthFallback) {
      this.stopSynth();
      this.isPlaying = false;
      this.notifyListeners();
      return;
    }

    if (this.audio && !this.audio.paused) {
      await this.fadeOut(650);
    } else {
      this.isPlaying = false;
      this.notifyListeners();
    }
  }

  // Toggle Play / Pause
  async toggle() {
    if (this.isPlaying) {
      await this.pause();
    } else {
      await this.play();
    }
  }

  // Celestial Synth Fallback (Pentatonic chimes)
  fallbackToSynth() {
    this.isSynthFallback = true;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!this.synthCtx) {
      this.synthCtx = new AudioContext();
    }
    if (this.synthCtx.state === 'suspended') {
      this.synthCtx.resume();
    }

    this.isPlaying = true;
    this.notifyListeners();

    const notes = [311.13, 349.23, 392.00, 466.16, 523.25, 622.25, 783.99];
    let step = 0;

    const playChime = (freq) => {
      if (!this.synthCtx || !this.isPlaying) return;
      try {
        const now = this.synthCtx.currentTime;
        const osc = this.synthCtx.createOscillator();
        const gain = this.synthCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        osc.connect(gain);
        gain.connect(this.synthCtx.destination);
        osc.start(now);
        osc.stop(now + 2.6);
      } catch {
        // No-op
      }
    };

    // Play immediate welcoming chime
    playChime(notes[0]);
    setTimeout(() => playChime(notes[2]), 350);

    this.synthInterval = setInterval(() => {
      if (!this.isPlaying) return;
      const chord = [notes[step % notes.length], notes[(step + 2) % notes.length]];
      chord.forEach((n, idx) => {
        setTimeout(() => playChime(n), idx * 300);
      });
      step++;
    }, 4000);
  }

  stopSynth() {
    this.isSynthFallback = false;
    if (this.synthInterval) {
      clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    if (this.synthCtx && this.synthCtx.state === 'running') {
      try {
        this.synthCtx.suspend();
      } catch {
        // No-op
      }
    }
  }
}

// Export singleton instance
export const audioManager = new BackgroundAudioManager();
export default audioManager;
