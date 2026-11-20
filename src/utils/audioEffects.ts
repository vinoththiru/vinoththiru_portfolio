// audioEffects.ts - Web Audio API Synthesizer for Interactive UI Feedback
// Zero external assets, zero lag, silky smooth crystal-clear acoustic feedback.

class AudioEffectsManager {
  private static instance: AudioEffectsManager;
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private lastHoverTime: number = 0;
  private lastClickTime: number = 0;
  private listeners: Set<(muted: boolean) => void> = new Set();

  private constructor() {
    if (typeof window !== 'undefined') {
      // Sound active by default
      this.muted = false;

      // Unlock AudioContext on first user interaction to comply with browser autoplay policies
      const unlockAudio = () => {
        this.getAudioContext();
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('keydown', unlockAudio);
      };
      window.addEventListener('pointerdown', unlockAudio, { passive: true });
      window.addEventListener('keydown', unlockAudio, { passive: true });

      // Global capture-phase click listener: ensures crystal clear sound for every click on site
      const handleGlobalClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        if (!target) return;

        // Check if clicked element or any parent is interactive
        const isClickable = target.closest(
          'button, a, input, select, textarea, [role="button"], summary, [tabindex], label, [data-clickable], .cursor-pointer, [onClick]'
        );

        if (isClickable) {
          this.playClick();
        }
      };

      window.addEventListener('click', handleGlobalClick as EventListener, {
        capture: true,
        passive: true,
      });
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
      filter.frequency.setValueAtTime(2400, now);
      filter.Q.setValueAtTime(3.0, now);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1920, now);
      osc.frequency.exponentialRampToValueAtTime(2600, now + 0.026);

      // Gentle, whisper-quiet volume
      gain.gain.setValueAtTime(0.028, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.032);
    } catch {
      // AudioContext failsafe
    }
  }

  // ── 2. Crystal Clear Acoustic Click ───────────────────────────────
  // Pristine high-fidelity crystal tap with harmonic sparkle and zero mud
  public playClick(): void {
    if (this.muted) return;
    const nowMs = performance.now();
    // Throttle to 35ms to ensure responsive distinct clicks without clipping or double-triggers
    if (nowMs - this.lastClickTime < 35) return;
    this.lastClickTime = nowMs;

    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;

      // Master highpass filter: cleanly cuts any low-frequency mud/thud below 1300Hz
      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(1300, now);
      highpass.Q.setValueAtTime(1.1, now);

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.09, now);
      masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.052);

      highpass.connect(masterGain);
      masterGain.connect(ctx.destination);

      // Layer 1: Crystal Fundamental Sine (2800Hz -> 2100Hz) - Pure glass body
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(2800, now);
      osc1.frequency.exponentialRampToValueAtTime(2100, now + 0.038);

      gain1.gain.setValueAtTime(0.085, now);
      gain1.gain.exponentialRampToValueAtTime(0.0005, now + 0.042);

      osc1.connect(gain1);
      gain1.connect(highpass);
      osc1.start(now);
      osc1.stop(now + 0.045);

      // Layer 2: Crystal Harmonic Sparkle (5600Hz -> 4200Hz) - Crystalline overtone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(5600, now);
      osc2.frequency.exponentialRampToValueAtTime(4200, now + 0.024);

      gain2.gain.setValueAtTime(0.05, now);
      gain2.gain.exponentialRampToValueAtTime(0.0002, now + 0.026);

      osc2.connect(gain2);
      gain2.connect(highpass);
      osc2.start(now);
      osc2.stop(now + 0.028);

      // Layer 3: Ultra-Crisp Transient Tap (instantaneous attack, 8ms decay)
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'triangle';
      osc3.frequency.setValueAtTime(3600, now);
      osc3.frequency.exponentialRampToValueAtTime(1800, now + 0.01);

      gain3.gain.setValueAtTime(0.045, now);
      gain3.gain.exponentialRampToValueAtTime(0.0004, now + 0.012);

      osc3.connect(gain3);
      gain3.connect(highpass);
      osc3.start(now);
      osc3.stop(now + 0.014);
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
        { freq: 1046.5, timeOffset: 0, duration: 0.22, vol: 0.07 },     // C6
        { freq: 1318.51, timeOffset: 0.06, duration: 0.26, vol: 0.08 }, // E6
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
