// Audio controller for Thanos Decimation & Iron Man Nano Gauntlet Restoration
// Uses official MP3 assets with Web Audio API synthesis fallback

let isMuted = false;

export function setThanosAudioMuted(muted: boolean) {
  isMuted = muted;
}

export function isThanosAudioMuted(): boolean {
  return isMuted;
}

function getAssetUrl(path: string): string {
  const rawBase = import.meta.env.BASE_URL || '/';
  const baseUrl = rawBase === '/' ? '' : rawBase.replace(/\/+$/, '');
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

export function playOfficialSnapMp3() {
  if (isMuted) return;
  try {
    const audio = new Audio(getAssetUrl('/assets/thanos/thanos_snap_sound.mp3'));
    audio.volume = 0.9;
    audio.play().catch((e) => {
      console.debug('Direct MP3 play fallback:', e);
      playSynthesizedSnap();
    });
  } catch {
    playSynthesizedSnap();
  }
}

export function playOfficialReverseMp3() {
  if (isMuted) return;
  try {
    const audio = new Audio(getAssetUrl('/assets/thanos/thanos_reverse_sound.mp3'));
    audio.volume = 0.9;
    audio.play().catch((e) => {
      console.debug('Direct MP3 play fallback:', e);
      playSynthesizedReverse();
    });
  } catch {
    playSynthesizedReverse();
  }
}

export function playDustSound(index = 1) {
  if (isMuted) return;
  try {
    const num = ((Math.abs(index) - 1) % 4) + 1;
    const audio = new Audio(getAssetUrl(`/assets/thanos/thanos_dust_${num}.mp3`));
    audio.volume = 0.6;
    audio.play().catch(() => {});
  } catch {}
}

export function playSnapSound() {
  playOfficialSnapMp3();
}

export function playTimeStoneSound() {
  playOfficialReverseMp3();
}

// Cinematic Iron Man Snap Sound: Layers the official reverse chime with an Arc Reactor surge & metallic snap!
export function playIronManSnapSound() {
  if (isMuted) return;
  playOfficialReverseMp3();
  playSynthesizedIronManSnap();
}

// Fallback Synthesized Web Audio API sound effects
let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playSynthesizedSnap() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * 0.12;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, now);
    filter.Q.setValueAtTime(3.5, now);

    const gainSnap = ctx.createGain();
    gainSnap.gain.setValueAtTime(1.0, now);
    gainSnap.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    whiteNoise.connect(filter);
    filter.connect(gainSnap);
    gainSnap.connect(ctx.destination);
    whiteNoise.start(now);
  } catch (e) {
    console.debug('Synth audio play inhibited:', e);
  }
}

export function playSynthesizedIronManSnap() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    // 1. Crisp Metallic Snap Attack
    const bufferSize = ctx.sampleRate * 0.15;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.015));
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    const highpass = ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(3200, now);
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(1.2, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    noise.connect(highpass);
    highpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);
    noise.start(now);

    // 2. Arc Reactor Repulsor Energy Surge (Rising resonant sweep)
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.35);

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(400, now);
    bandpass.frequency.exponentialRampToValueAtTime(1800, now + 0.35);
    bandpass.Q.setValueAtTime(4.0, now);

    oscGain.gain.setValueAtTime(0.35, now);
    oscGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(bandpass);
    bandpass.connect(oscGain);
    oscGain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.55);

    // 3. Triumphant Restoration Chimes
    const notes = [440, 554.37, 659.25, 880, 1108.73];
    notes.forEach((freq, idx) => {
      const chime = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chime.type = 'sine';
      chime.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.07);

      chimeGain.gain.setValueAtTime(0.2, now + 0.1 + idx * 0.07);
      chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.07);

      chime.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chime.start(now + 0.1 + idx * 0.07);
      chime.stop(now + 0.9 + idx * 0.07);
    });
  } catch (e) {
    console.debug('Iron man synth audio error:', e);
  }
}

function playSynthesizedReverse() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const notes = [329.63, 415.3, 493.88, 659.25, 830.61];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * 0.7, now + idx * 0.08);
      osc.frequency.exponentialRampToValueAtTime(freq, now + idx * 0.08 + 0.4);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.2, now + idx * 0.08 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.9);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.0);
    });
  } catch (e) {
    console.debug('Synth reverse play inhibited:', e);
  }
}
