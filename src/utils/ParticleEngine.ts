// ParticleEngine.ts - High-Performance Object-Pooled Canvas 2D Dust Particle Engine
// Recreates Google's Thanos dust disintegration with zero memory allocations during runtime

interface PooledParticle {
  active: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  wobbleSpeed: number;
  wobblePhase: number;
  wobbleAmp: number;
  rotation: number;
  vRot: number;
  isReverse: boolean;
  targetX: number;
  targetY: number;
}

const DUST_PALETTE = [
  '#C9A66B', // Champagne Gold
  '#DFC495', // Warm Gold
  '#F59E0B', // Amber
  '#A855F7', // Power Purple
  '#5B1E35', // Primary Burgundy
  '#EAD9DE', // Soft Blush
  '#9CA3AF', // Ash Grey
  '#6B7280', // Charcoal Smoke
];

const RESTORE_PALETTE = [
  '#38BDF8', // Arc Reactor Cyan
  '#E0F2FE', // Repulsor White
  '#10B981', // Time Stone Emerald
  '#34D399', // Mint Sparkle
  '#C9A66B', // Champagne Gold
];

export class ParticleEngine {
  private static instance: ParticleEngine | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private rafId: number | null = null;
  private isRunning = false;

  // Pre-allocated object pool to prevent garbage collection spikes
  private readonly MAX_PARTICLES = 250;
  private pool: PooledParticle[] = [];

  private constructor() {
    // Pre-allocate pool
    for (let i = 0; i < this.MAX_PARTICLES; i++) {
      this.pool.push({
        active: false,
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        size: 0,
        color: '#C9A66B',
        alpha: 0,
        decay: 0,
        wobbleSpeed: 0,
        wobblePhase: 0,
        wobbleAmp: 0,
        rotation: 0,
        vRot: 0,
        isReverse: false,
        targetX: 0,
        targetY: 0,
      });
    }
  }

  public static getInstance(): ParticleEngine {
    if (!ParticleEngine.instance) {
      ParticleEngine.instance = new ParticleEngine();
    }
    return ParticleEngine.instance;
  }

  public setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
    if (canvas) {
      this.ctx = canvas.getContext('2d', { alpha: true });
      this.handleResize();
    } else {
      this.ctx = null;
      this.stop();
    }
  }

  public handleResize() {
    if (!this.canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = width * dpr;
    this.canvas.height = height * dpr;
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }
  }

  // Acquire an inactive particle from the pre-allocated pool
  private acquireParticle(): PooledParticle | null {
    for (let i = 0; i < this.MAX_PARTICLES; i++) {
      if (!this.pool[i].active) {
        this.pool[i].active = true;
        return this.pool[i];
      }
    }
    return null;
  }

  // Emit Google-style progressive section dust
  public emitSectionDust(rect: DOMRect) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Viewport intersection
    const left = Math.max(0, rect.left);
    const right = Math.min(window.innerWidth, rect.right);
    const top = Math.max(0, rect.top);
    const bottom = Math.min(window.innerHeight, rect.bottom);

    if (bottom <= top || right <= left) return;

    const visibleWidth = right - left;
    const visibleHeight = bottom - top;

    // Number of particles budgeted per section (~70 to 110 max)
    const isMobile = window.innerWidth < 768;
    const count = isMobile
      ? Math.min(60, Math.max(25, Math.round((visibleWidth * visibleHeight) / 3500)))
      : Math.min(110, Math.max(45, Math.round((visibleWidth * visibleHeight) / 2000)));

    for (let i = 0; i < count; i++) {
      const p = this.acquireParticle();
      if (!p) break;

      p.x = left + Math.random() * visibleWidth;
      p.y = top + Math.random() * visibleHeight;

      // Google-style directional movement: drift sideways (+x) and upward (-y)
      p.vx = 1.4 + Math.random() * 3.6;
      p.vy = -(0.8 + Math.random() * 2.8);
      p.size = 1.2 + Math.random() * 2.6;
      p.color = DUST_PALETTE[Math.floor(Math.random() * DUST_PALETTE.length)];
      p.alpha = 0.9;
      p.decay = 0.012 + Math.random() * 0.014;
      p.wobbleSpeed = 0.05 + Math.random() * 0.05;
      p.wobblePhase = Math.random() * Math.PI * 2;
      p.wobbleAmp = 0.4 + Math.random() * 0.8;
      p.rotation = Math.random() * Math.PI * 2;
      p.vRot = (Math.random() - 0.5) * 0.08;
      p.isReverse = false;
    }

    this.start();
  }

  // Emit reverse restoration particles converging back into section
  public emitSectionRestore(rect: DOMRect) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const left = Math.max(0, rect.left);
    const right = Math.min(window.innerWidth, rect.right);
    const top = Math.max(0, rect.top);
    const bottom = Math.min(window.innerHeight, rect.bottom);

    if (bottom <= top || right <= left) return;

    const visibleWidth = right - left;
    const visibleHeight = bottom - top;
    const centerX = left + visibleWidth * 0.5;
    const centerY = top + visibleHeight * 0.5;

    const count = Math.min(70, Math.max(30, Math.round((visibleWidth * visibleHeight) / 3000)));

    for (let i = 0; i < count; i++) {
      const p = this.acquireParticle();
      if (!p) break;

      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 140;

      p.x = centerX + Math.cos(angle) * radius;
      p.y = centerY + Math.sin(angle) * radius;
      p.targetX = left + Math.random() * visibleWidth;
      p.targetY = top + Math.random() * visibleHeight;
      p.vx = 0;
      p.vy = 0;
      p.size = 1.4 + Math.random() * 2.4;
      p.color = RESTORE_PALETTE[Math.floor(Math.random() * RESTORE_PALETTE.length)];
      p.alpha = 0.95;
      p.decay = 0.02 + Math.random() * 0.015;
      p.wobbleSpeed = 0.05;
      p.wobblePhase = Math.random() * Math.PI * 2;
      p.wobbleAmp = 0.5;
      p.rotation = Math.random() * Math.PI * 2;
      p.vRot = (Math.random() - 0.5) * 0.1;
      p.isReverse = true;
    }

    this.start();
  }

  private start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.rafId = requestAnimationFrame(this.render);
    }
  }

  public stop() {
    this.isRunning = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    // Deactivate all particles
    for (let i = 0; i < this.MAX_PARTICLES; i++) {
      this.pool[i].active = false;
    }
    if (this.canvas && this.ctx) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  // 60 FPS Render Tick
  private render = () => {
    if (!this.canvas || !this.ctx) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    this.ctx.clearRect(0, 0, width, height);

    let activeCount = 0;

    for (let i = 0; i < this.MAX_PARTICLES; i++) {
      const p = this.pool[i];
      if (!p.active) continue;

      activeCount++;

      if (p.isReverse) {
        // Inward restoration vortex
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx += dx * 0.09;
        p.vy += dy * 0.09;
        p.vx *= 0.82;
        p.vy *= 0.82;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;
      } else {
        // Natural Google dust drift
        p.wobblePhase += p.wobbleSpeed;
        const wobble = Math.sin(p.wobblePhase) * p.wobbleAmp;

        p.x += p.vx + wobble;
        p.y += p.vy;
        p.vx *= 0.99;
        p.vy *= 0.99;
        p.rotation += p.vRot;
        p.alpha -= p.decay;
      }

      if (p.alpha <= 0.02) {
        p.active = false;
        continue;
      }

      // Draw particle
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.fillStyle = p.color;

      if (p.size > 2.2) {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size * 0.5, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.size * 0.5, -p.size * 0.5, p.size, p.size);
      }

      this.ctx.restore();
    }

    if (activeCount > 0) {
      this.rafId = requestAnimationFrame(this.render);
    } else {
      this.isRunning = false;
      this.rafId = null;
      this.ctx.clearRect(0, 0, width, height);
    }
  };
}

export const particleEngine = ParticleEngine.getInstance();
