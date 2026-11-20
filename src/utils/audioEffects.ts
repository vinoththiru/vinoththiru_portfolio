// audioEffects.ts - Web Audio API Synthesizer for Interactive UI Feedback
// Zero external assets, zero lag, silky smooth studio-quality acoustic micro-sounds.

class AudioEffectsManager {
  private static instance: AudioEffectsManager;
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private lastHoverTime: number = 0;
  private listeners: Set<(muted: boolean) => void> = new Set();

  private constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vt_sound_muted');
      // Default enabled (muted = false unless explicitly muted by user)
      this.muted = saved === 'true';

      // Lazy initialization on first user interaction to satisfy browser autoplay policies
      const unlockAudio = () => {
        this.getAudioContext();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });
    }
  }

  public static getInstance(): AudioEffectsManager {
    if (!AudioEffectsManager.instance) {
      AudioEffectsManager.instance = new AudioEffectsManager();
    }
    return AudioEffectsManager.instance;
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

  public isMuted(): boolean {
    return this.muted;
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('vt_sound_muted', String(this.muted));
    }
    this.listeners.forEach((listener) => listener(this.muted));

    // If unmuting, play a delightful harmonic chime to confirm sound is active
    if (!this.muted) {
      this.playSuccess();
    }
    return this.muted;
  }

  public subscribe(listener: (muted: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // ── 1. Delicate Micro-Hover Tick ──────────────────────────────────
  // Subtle crystal glass tick on nav links, buttons, and cards
  public playHover(): void {
    if (this.muted) return;
    const nowMs = performance.now();
    // Rate-limit to at least 45ms to avoid sound clutter during rapid mouse movement
    if (nowMs - this.lastHoverTime < 45) return;
    this.lastHoverTime = nowMs;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      // Bandpass filter for soft, airy texture
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2200, now);
      filter.Q.setValueAtTime(3.0, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1760, now); // A6 note
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.028);

      // Very gentle, whisper-quiet volume
      gain.gain.setValueAtTime(0.025, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // AudioContext failsafe
    }
  }

  // ── 2. Tactile Mechanical Click ───────────────────────────────────
  // Refined trackpad-like haptic feedback when clicking buttons or tabs
  public playClick(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.045);

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.048);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.05);
    } catch {
      // AudioContext failsafe
    }
  }

  // ── 3. Harmonic Success Chime ─────────────────────────────────────
  // Uplifting two-tone major third chord (C6 -> E6) for copy, download & submit actions
  public playSuccess(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const notes = [
        { freq: 1046.5, timeOffset: 0, duration: 0.22, vol: 0.06 },     // C6
        { freq: 1318.51, timeOffset: 0.06, duration: 0.26, vol: 0.07 }, // E6
      ];

      notes.forEach(({ freq, timeOffset, duration, vol }) => {
        const start = now + timeOffset;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(vol, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + duration + 0.02);
      });
    } catch {
      // AudioContext failsafe
    }
  }

  // ── 4. Spatial Tab Switch Slide ───────────────────────────────────
  // Smooth acoustic sweep when navigating sections
  public playTab(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.07);

      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // AudioContext failsafe
    }
  }

  // ── 5. Organic Pop ────────────────────────────────────────────────
  // Friendly bubbly pop for interactive badges, toggles and pills
  public playPop(): void {
    if (this.muted) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.05);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.055);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // AudioContext failsafe
    }
  }
}

export const audioEffects = AudioEffectsManager.getInstance();
