// PixelDisintegrationEngine.ts
// Realistic Pixel-Sampling Disintegration & Reassembly Engine for Thanos & Iron Man Easter Egg
// Captures section DOM elements into offscreen canvas, samples real pixel colors,
// and animates thousands of content fragments breaking off along a travelling wave.

import html2canvas from 'html2canvas';

export interface ContentParticle {
  // Document-space coordinates
  x: number;
  y: number;
  startX: number;
  startY: number;

  // Dispersed endpoint for reverse reconstruction
  dispersedX: number;
  dispersedY: number;

  // Velocity and physics
  vx: number;
  vy: number;
  gravity: number;
  wind: number;
  turbulence: number;

  // Rotation
  rotation: number;
  vRot: number;

  // Size and visual appearance
  size: number;
  r: number;
  g: number;
  b: number;
  alpha: number;
  initialAlpha: number;

  // Timing
  waveThreshold: number; // 0.0 - 1.0 position in the wave
  age: number;
  lifespan: number;
  active: boolean;
  isRestoring: boolean;
}

export interface SectionSnapshot {
  id: string;
  element: HTMLElement;
  canvas: HTMLCanvasElement | null;
  rect: { left: number; top: number; width: number; height: number };
  particles: ContentParticle[];
  state: 'idle' | 'capturing' | 'disintegrating' | 'dusted' | 'restoring' | 'restored';
  startTime: number;
  restoreStartTime: number;
}

export class PixelDisintegrationEngine {
  private static instance: PixelDisintegrationEngine | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private rafId: number | null = null;
  private isRunning: boolean = false;

  private sections: Map<string, SectionSnapshot> = new Map();

  // Durations (Slow, cinematic, enjoyable)
  public static readonly SECTION_DISINTEGRATE_DURATION = 1500; // 1.5s per section
  public static readonly SECTION_RESTORE_DURATION = 1350; // 1.35s per section

  private constructor() {}

  public static getInstance(): PixelDisintegrationEngine {
    if (!PixelDisintegrationEngine.instance) {
      PixelDisintegrationEngine.instance = new PixelDisintegrationEngine();
    }
    return PixelDisintegrationEngine.instance;
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

    this.canvas.width = Math.floor(width * dpr);
    this.canvas.height = Math.floor(height * dpr);
    this.canvas.style.width = `${width}px`;
    this.canvas.style.height = `${height}px`;

    if (this.ctx) {
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }

  // ════════════════════════════════════════════════════════════════════
  // ── 1. ASYNC SECTION CAPTURE & PIXEL SAMPLING ──
  // ════════════════════════════════════════════════════════════════════
  public async captureSection(id: string, element: HTMLElement): Promise<void> {
    if (this.sections.has(id) && this.sections.get(id)?.canvas) {
      return; // Already captured
    }

    const bRect = element.getBoundingClientRect();
    const docLeft = bRect.left + window.scrollX;
    const docTop = bRect.top + window.scrollY;
    const width = Math.max(10, Math.floor(bRect.width));
    const height = Math.max(10, Math.floor(bRect.height));

    const snapshot: SectionSnapshot = {
      id,
      element,
      canvas: null,
      rect: { left: docLeft, top: docTop, width, height },
      particles: [],
      state: 'capturing',
      startTime: 0,
      restoreStartTime: 0,
    };
    this.sections.set(id, snapshot);

    try {
      const capturedCanvas = await html2canvas(element, {
        backgroundColor: null,
        logging: false,
        scale: 1, // CSS 1:1 pixel fidelity
        useCORS: true,
        allowTaint: true,
        ignoreElements: (el) => el.classList.contains('no-dust-capture'),
      });

      snapshot.canvas = capturedCanvas;
      snapshot.rect = {
        left: docLeft,
        top: docTop,
        width: capturedCanvas.width,
        height: capturedCanvas.height,
      };

      // Extract pixel data for direct content sampling
      const cCtx = capturedCanvas.getContext('2d');
      if (!cCtx) return;

      const imgData = cCtx.getImageData(0, 0, capturedCanvas.width, capturedCanvas.height);
      const data = imgData.data;
      const cW = capturedCanvas.width;
      const cH = capturedCanvas.height;

      // Adaptive sampling step: target 1,800 - 2,800 particles per section
      const totalPixels = cW * cH;
      const step = Math.max(4, Math.min(8, Math.floor(Math.sqrt(totalPixels / 2200))));

      const particles: ContentParticle[] = [];

      for (let y = 0; y < cH; y += step) {
        for (let x = 0; x < cW; x += step) {
          const idx = (y * cW + x) * 4;
          const r = data[idx];
          const g = data[idx + 1];
          const b = data[idx + 2];
          const a = data[idx + 3];

          // Skip completely transparent areas
          if (a < 28) continue;

          // Normalized wave threshold across a diagonal wavefront
          // Wave travels diagonally from top-left to bottom-right
          const waveThreshold = (x / cW) * 0.65 + (y / cH) * 0.35;

          const startX = docLeft + x;
          const startY = docTop + y;

          // Physics setup: sideways drift + slight lift + turbulence
          const windDir = 1; // drift to the right
          const speedFactor = 0.8 + Math.random() * 0.6;
          const vx = (2.2 + Math.random() * 2.8) * windDir * speedFactor;
          const vy = -(1.2 + Math.random() * 2.2) * speedFactor; // initial lift
          const gravity = 0.04 + Math.random() * 0.03;
          const wind = 0.08 + Math.random() * 0.06;
          const turbulence = (Math.random() - 0.5) * 0.4;

          const size = step * (0.65 + Math.random() * 0.35); // 2.5px to 4.5px
          const lifespan = 1200 + Math.random() * 600; // 1.2s - 1.8s

          particles.push({
            x: startX,
            y: startY,
            startX,
            startY,
            dispersedX: startX + vx * 35 + (Math.random() - 0.5) * 40,
            dispersedY: startY + vy * 30 + (Math.random() - 0.5) * 30,
            vx,
            vy,
            gravity,
            wind,
            turbulence,
            rotation: (Math.random() - 0.5) * Math.PI,
            vRot: (Math.random() - 0.5) * 0.12,
            size,
            r,
            g,
            b,
            alpha: a / 255,
            initialAlpha: a / 255,
            waveThreshold,
            age: 0,
            lifespan,
            active: false,
            isRestoring: false,
          });

          // 20% extra fine dust specks around medium fragments for genuine Google dust feel
          if (Math.random() < 0.22) {
            particles.push({
              x: startX + (Math.random() - 0.5) * step,
              y: startY + (Math.random() - 0.5) * step,
              startX,
              startY,
              dispersedX: startX + vx * 45 + (Math.random() - 0.5) * 60,
              dispersedY: startY + vy * 40 - 20,
              vx: vx * 1.35,
              vy: vy * 1.4 - 0.8, // lifts higher
              gravity: 0.02,
              wind: 0.12,
              turbulence: (Math.random() - 0.5) * 0.6,
              rotation: Math.random() * Math.PI,
              vRot: (Math.random() - 0.5) * 0.2,
              size: Math.max(1.2, size * 0.45), // fine dust
              r,
              g,
              b,
              alpha: (a / 255) * 0.85,
              initialAlpha: (a / 255) * 0.85,
              waveThreshold: Math.min(1, waveThreshold + (Math.random() - 0.5) * 0.04),
              age: 0,
              lifespan: lifespan * 1.15,
              active: false,
              isRestoring: false,
            });
          }
        }
      }

      snapshot.particles = particles;
      snapshot.state = 'idle';
    } catch (err) {
      console.warn(`[PixelDisintegrationEngine] Failed to capture section ${id}:`, err);
      snapshot.state = 'idle';
    }
  }

  // ════════════════════════════════════════════════════════════════════
  // ── 2. START SECTION DISINTEGRATION ──
  // ════════════════════════════════════════════════════════════════════
  public startDisintegrating(id: string): void {
    const snapshot = this.sections.get(id);
    if (!snapshot) return;

    snapshot.state = 'disintegrating';
    snapshot.startTime = performance.now();

    // Immediately hide the real DOM element (replaced by canvas)
    snapshot.element.style.visibility = 'hidden';

    // Wake up rendering loop if not running
    this.startLoop();
  }

  // ════════════════════════════════════════════════════════════════════
  // ── 3. START SECTION RESTORATION (Iron Man Snap Reverse) ──
  // ════════════════════════════════════════════════════════════════════
  public startRestoring(id: string): void {
    const snapshot = this.sections.get(id);
    if (!snapshot) return;

    snapshot.state = 'restoring';
    snapshot.restoreStartTime = performance.now();

    // Reset particles for reverse trajectory
    for (const p of snapshot.particles) {
      p.isRestoring = true;
      p.active = true;
      // Start from dispersed position
      p.x = p.dispersedX;
      p.y = p.dispersedY;
      p.alpha = 0;
    }

    this.startLoop();
  }

  // ════════════════════════════════════════════════════════════════════
  // ── 4. COMPLETE / RESET SECTION ──
  // ════════════════════════════════════════════════════════════════════
  public markSectionFullyRestored(id: string): void {
    const snapshot = this.sections.get(id);
    if (!snapshot) return;

    snapshot.state = 'restored';
    // Make live DOM element visible and interactive again
    snapshot.element.style.visibility = '';

    for (const p of snapshot.particles) {
      p.active = false;
      p.isRestoring = false;
    }
  }

  public resetAll(): void {
    this.sections.forEach((snapshot) => {
      snapshot.state = 'idle';
      snapshot.element.style.visibility = '';
      for (const p of snapshot.particles) {
        p.active = false;
        p.isRestoring = false;
        p.x = p.startX;
        p.y = p.startY;
        p.alpha = p.initialAlpha;
      }
    });
    this.stop();
  }

  // ════════════════════════════════════════════════════════════════════
  // ── 5. MAIN ANIMATION LOOP (LOCKED 60 FPS) ──
  // ════════════════════════════════════════════════════════════════════
  private startLoop(): void {
    if (this.isRunning) return;
    this.isRunning = true;
    const loop = (now: number) => {
      if (!this.isRunning) return;
      this.renderFrame(now);
      this.rafId = requestAnimationFrame(loop);
    };
    this.rafId = requestAnimationFrame(loop);
  }

  public stop(): void {
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  private renderFrame(now: number): void {
    if (!this.ctx || !this.canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    this.ctx.clearRect(0, 0, width, height);

    let activeCount = 0;

    this.sections.forEach((snapshot) => {
      if (snapshot.state === 'disintegrating') {
        activeCount++;
        this.renderSectionDisintegration(snapshot, now, scrollX, scrollY);
      } else if (snapshot.state === 'restoring') {
        activeCount++;
        this.renderSectionRestoration(snapshot, now, scrollX, scrollY);
      }
    });

    // Auto-pause loop when idle
    if (activeCount === 0) {
      this.stop();
    }
  }

  // ── Render Forward Disintegration ──
  private renderSectionDisintegration(
    snapshot: SectionSnapshot,
    now: number,
    scrollX: number,
    scrollY: number
  ): void {
    if (!this.ctx || !snapshot.canvas) return;

    const elapsed = now - snapshot.startTime;
    const duration = PixelDisintegrationEngine.SECTION_DISINTEGRATE_DURATION;
    const waveProgress = Math.min(1, elapsed / (duration * 0.65)); // Wave passes in ~1.0s

    const screenX = snapshot.rect.left - scrollX;
    const screenY = snapshot.rect.top - scrollY;
    const sW = snapshot.rect.width;
    const sH = snapshot.rect.height;

    // 1. Draw remaining un-eaten portion of the section with razor-sharp polygon clip
    if (waveProgress < 1.0) {
      this.ctx.save();
      this.ctx.beginPath();

      // Slanted boundary from top to bottom
      const slant = 140; // slant offset in pixels
      const boundaryTop = screenX + waveProgress * (sW + slant);
      const boundaryBottom = boundaryTop - slant;

      // Polygon for untouched area: from boundary rightwards
      this.ctx.moveTo(boundaryTop, screenY);
      this.ctx.lineTo(screenX + sW, screenY);
      this.ctx.lineTo(screenX + sW, screenY + sH);
      this.ctx.lineTo(boundaryBottom, screenY + sH);
      this.ctx.closePath();
      this.ctx.clip();

      this.ctx.drawImage(snapshot.canvas, screenX, screenY, sW, sH);
      this.ctx.restore();
    }

    // 2. Animate and draw content fragments that have detached
    for (const p of snapshot.particles) {
      // Activate when wave boundary sweeps past this particle's threshold
      if (!p.active && waveProgress >= p.waveThreshold) {
        p.active = true;
        p.age = 0;
      }

      if (!p.active) continue;

      p.age += 16.6; // ~60fps step
      const ageRatio = Math.min(1, p.age / p.lifespan);

      // Phase 3 & 4: Physics movement (wind + turbulence + lift)
      p.x += p.vx + p.turbulence;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx += p.wind;
      p.rotation += p.vRot;

      // Phase 5: Dissolve opacity
      if (ageRatio > 0.4) {
        const fadeRatio = (ageRatio - 0.4) / 0.6;
        p.alpha = Math.max(0, p.initialAlpha * (1 - fadeRatio));
      }

      if (p.alpha <= 0.01) {
        continue;
      }

      // Convert from document coordinates to screen coordinates
      const pScreenX = p.x - scrollX;
      const pScreenY = p.y - scrollY;

      // Viewport culling
      if (pScreenX < -20 || pScreenX > window.innerWidth + 20 || pScreenY < -20 || pScreenY > window.innerHeight + 20) {
        continue;
      }

      // Draw particle with EXACT original content pixel color
      this.ctx.save();
      this.ctx.translate(pScreenX, pScreenY);
      this.ctx.rotate(p.rotation);

      this.ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha.toFixed(3)})`;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

      this.ctx.restore();
    }

    // Check if section disintegration is complete
    if (elapsed >= duration + 400) {
      snapshot.state = 'dusted';
    }
  }

  // ── Render Reverse Restoration (Iron Man Snap) ──
  private renderSectionRestoration(
    snapshot: SectionSnapshot,
    now: number,
    scrollX: number,
    scrollY: number
  ): void {
    if (!this.ctx || !snapshot.canvas) return;

    const elapsed = now - snapshot.restoreStartTime;
    const duration = PixelDisintegrationEngine.SECTION_RESTORE_DURATION;
    const progress = Math.min(1, elapsed / duration);

    const screenX = snapshot.rect.left - scrollX;
    const screenY = snapshot.rect.top - scrollY;
    const sW = snapshot.rect.width;
    const sH = snapshot.rect.height;

    // Cubic ease out for smooth reassembly
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    // 1. Draw reassembling polygon clip as content comes back
    if (progress > 0.25) {
      const clipRatio = (progress - 0.25) / 0.75;
      this.ctx.save();
      this.ctx.beginPath();

      const slant = 140;
      const boundaryTop = screenX + (1 - clipRatio) * (sW + slant);
      const boundaryBottom = boundaryTop - slant;

      // Area restored: from right boundary inwards
      this.ctx.moveTo(boundaryTop, screenY);
      this.ctx.lineTo(screenX + sW, screenY);
      this.ctx.lineTo(screenX + sW, screenY + sH);
      this.ctx.lineTo(boundaryBottom, screenY + sH);
      this.ctx.closePath();
      this.ctx.clip();

      this.ctx.drawImage(snapshot.canvas, screenX, screenY, sW, sH);
      this.ctx.restore();
    }

    // 2. Fly particles backward from dispersed position to start position
    for (const p of snapshot.particles) {
      // Interpolate from dispersed back to start
      p.x = p.dispersedX + (p.startX - p.dispersedX) * easeProgress;
      p.y = p.dispersedY + (p.startY - p.dispersedY) * easeProgress;
      p.alpha = Math.min(p.initialAlpha, progress * 1.5 * p.initialAlpha);

      if (progress >= 0.95) {
        // Arrived back home: snap to exact pixel
        p.x = p.startX;
        p.y = p.startY;
      }

      const pScreenX = p.x - scrollX;
      const pScreenY = p.y - scrollY;

      if (pScreenX < -20 || pScreenX > window.innerWidth + 20 || pScreenY < -20 || pScreenY > window.innerHeight + 20) {
        continue;
      }

      this.ctx.save();
      this.ctx.translate(pScreenX, pScreenY);
      this.ctx.rotate(p.rotation * (1 - easeProgress));

      this.ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.alpha.toFixed(3)})`;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);

      this.ctx.restore();
    }

    // Check if restoration complete
    if (progress >= 1.0) {
      this.markSectionFullyRestored(snapshot.id);
    }
  }
}

export const pixelDisintegrationEngine = PixelDisintegrationEngine.getInstance();
