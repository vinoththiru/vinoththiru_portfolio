// SoundManager.ts - Professional Audio Controller for Thanos & Iron Man Sequences
// Uses Web Audio API synthesis layered with local sound assets

class SoundManager {
  private static instance: SoundManager;
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private baseUrl: string = '';

  private constructor() {
    const rawBase = import.meta.env.BASE_URL || '/';
    this.baseUrl = rawBase === '/' ? '' : rawBase.replace(/\/+$/, '');
  }

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager();
    }
    return SoundManager.instance;
  }

  public setMuted(muted: boolean) {
    this.muted = muted;
  }

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private playAssetAudio(path: string, volume: number = 0.85): Promise<void> {
    if (this.muted) return Promise.resolve();
    return new Promise((resolve) => {
      try {
        const audio = new Audio(`${this.baseUrl}${path}`);
        audio.volume = Math.max(0, Math.min(1, volume));
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
        audio.play().catch(() => resolve());
      } catch {
        resolve();
      }
    });
  }

  // ════════════════════════════════════════════════════════════════
  // ── THANOS SEQUENCE SOUNDS ──
  // ════════════════════════════════════════════════════════════════

  // 1. Infinity Stone Activation: 6 ascending crystal bell harmonics (Space, Mind, Reality, Power, Time, Soul)
  public playStoneActivation() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // 6 stone frequencies: Blue, Yellow, Red, Purple, Green, Orange
    const stoneNotes = [523.25, 659.25, 783.99, 880.0, 1046.5, 1174.66];

    stoneNotes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.12);

      gain.gain.setValueAtTime(0, now + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.18, now + i * 0.12 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.12);
      osc.stop(now + i * 0.12 + 0.65);
    });
  }

  // 2. Energy Charging: Resonant building rumble before the snap
  public playEnergyCharging() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(240, now + 1.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(150, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + 1.2);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.9);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 1.35);
  }

  // 3. Finger Snap: Authentic snap audio with crisp acoustic transient
  public playFingerSnap() {
    if (this.muted) return;
    // Play official snap MP3
    this.playAssetAudio('/assets/thanos/thanos_snap_sound.mp3', 0.95);

    // Layer with synthesized sharp acoustic snap attack
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.1);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2800, now);
    filter.Q.setValueAtTime(3.0, now);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(1.0, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  }

  // 4. Dust Disintegration Ambience: Wind rustle & crumbling ash
  public playDustDisintegration(index: number = 1) {
    if (this.muted) return;
    const num = ((Math.abs(index) - 1) % 4) + 1;
    this.playAssetAudio(`/assets/thanos/thanos_dust_${num}.mp3`, 0.6);

    // Synthesized wind rustle
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.4);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.3;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.linearRampToValueAtTime(1600, now + 0.35);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  }

  // ════════════════════════════════════════════════════════════════
  // ── IRON MAN SEQUENCE SOUNDS ──
  // ════════════════════════════════════════════════════════════════

  // 5. Arc Reactor Activation: Futuristic mechanical powering-up hum
  public playArcReactorActivation() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.6);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.75);
  }

  // 6. Repulsor Charging: High-tech rising repulsor whine (180Hz -> 1400Hz)
  public playRepulsorCharging() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.7);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(400, now);
    filter.frequency.exponentialRampToValueAtTime(2200, now + 0.7);
    filter.Q.setValueAtTime(5.0, now);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.9);
  }

  // 7. Energy Pulse: Blinding gamma shockwave & metallic snap
  public playEnergyPulse() {
    if (this.muted) return;
    // Play reverse chime asset
    this.playAssetAudio('/assets/thanos/thanos_reverse_sound.mp3', 0.9);

    // Layer with crisp metallic snap attack & repulsor blast
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // High impact metallic click
    const bufferSize = Math.floor(ctx.sampleRate * 0.12);
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.012));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(3200, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.1, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
    noise.connect(highpass);
    highpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);
  }

  // 8. Universe Restoration Ambience: Harmonic celestial chime resolution
  public playUniverseRestoration() {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Triumphant C-major / F-major harmonic crystal chords
    const notes = [261.63, 329.63, 392.0, 523.25, 659.25, 783.99, 1046.5];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.08 + 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.3);
    });
  }
}

export const soundManager = SoundManager.getInstance();
