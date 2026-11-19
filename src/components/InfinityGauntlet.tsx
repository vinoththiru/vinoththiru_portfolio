import { useEffect, useRef, useState } from 'react';

export type GauntletAnimationState = 'idle' | 'snapping' | 'snapped' | 'reversing';

interface InfinityGauntletProps {
  state: GauntletAnimationState;
  onClick?: () => void;
  size?: number;
  className?: string;
  showStoneGlow?: boolean;
}

export function InfinityGauntlet({
  state,
  onClick,
  size = 44,
  className = '',
  showStoneGlow = true,
}: InfinityGauntletProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const rawBase = import.meta.env.BASE_URL || '/';
  const baseUrl = rawBase === '/' ? '' : rawBase.replace(/\/+$/, '');
  const idleImgUrl = `${baseUrl}/assets/thanos/thanos_idle.png`;
  const snapImgUrl = `${baseUrl}/assets/thanos/thanos_snap.png`;
  const timeImgUrl = `${baseUrl}/assets/thanos/thanos_time.png`;

  // Draw sprite frame on canvas
  const drawSpriteFrame = (img: HTMLImageElement, frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, 80, 80);
    const sx = Math.min(Math.max(0, frameIndex), 47) * 80;
    ctx.drawImage(img, sx, 0, 80, 80, 0, 0, 80, 80);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (animFrameRef.current) {
      window.cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }

    if (state === 'idle') {
      const img = new Image();
      img.src = idleImgUrl;
      img.onload = () => {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, 80, 80);
          ctx.drawImage(img, 0, 0, 80, 80);
        }
      };
    } else if (state === 'snapped') {
      // Last frame of snap shows the green Time Stone activated
      const img = new Image();
      img.src = snapImgUrl;
      img.onload = () => {
        drawSpriteFrame(img, 47);
      };
    } else if (state === 'snapping') {
      const img = new Image();
      img.src = snapImgUrl;
      img.onload = () => {
        let frame = 0;
        let lastTime = performance.now();
        // 48 frames at 50ms = ~2.4s cinematic snap sequence
        const frameInterval = 50;

        const step = (now: number) => {
          if (now - lastTime >= frameInterval) {
            drawSpriteFrame(img, frame);
            frame += 1;
            lastTime = now;
          }
          if (frame < 48) {
            animFrameRef.current = window.requestAnimationFrame(step);
          } else {
            drawSpriteFrame(img, 47);
          }
        };

        animFrameRef.current = window.requestAnimationFrame(step);
      };
    } else if (state === 'reversing') {
      const img = new Image();
      img.src = timeImgUrl;
      img.onload = () => {
        let frame = 0;
        let lastTime = performance.now();
        // 48 frames at 50ms = ~2.4s cinematic reversal sequence
        const frameInterval = 50;

        const step = (now: number) => {
          if (now - lastTime >= frameInterval) {
            drawSpriteFrame(img, frame);
            frame += 1;
            lastTime = now;
          }
          if (frame < 48) {
            animFrameRef.current = window.requestAnimationFrame(step);
          } else {
            // Restore back to idle frame
            const idleImg = new Image();
            idleImg.src = idleImgUrl;
            idleImg.onload = () => {
              const ctx = canvas.getContext('2d');
              if (ctx) {
                ctx.clearRect(0, 0, 80, 80);
                ctx.drawImage(idleImg, 0, 0, 80, 80);
              }
            };
          }
        };

        animFrameRef.current = window.requestAnimationFrame(step);
      };
    }

    return () => {
      if (animFrameRef.current) {
        window.cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [state, idleImgUrl, snapImgUrl, timeImgUrl]);

  const isSnapped = state === 'snapped';
  const isSnapping = state === 'snapping';
  const isReversing = state === 'reversing';

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={
        isSnapped
          ? 'Infinity Gauntlet: Time Stone active. Click to reverse snap and restore elements.'
          : 'Hidden Infinity Gauntlet: Click to snap fingers.'
      }
      title={
        isSnapped
          ? 'Click to use Time Stone and reverse the Thanos snap'
          : 'Hidden Easter Egg: The Infinity Gauntlet'
      }
      style={{ width: size, height: size }}
      className={`group relative inline-flex items-center justify-center cursor-pointer select-none rounded-xl transition-all duration-300 ${
        isHovered ? 'scale-110' : 'scale-100'
      } active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${className}`}
    >
      {/* Subtle Golden-Metallic Ambient Aura on hover or snap */}
      <span
        className={`pointer-events-none absolute inset-0 -m-1 rounded-xl transition-opacity duration-300 ${
          isSnapped
            ? 'bg-emerald-500/25 blur-md opacity-100 animate-pulse'
            : isHovered || isSnapping
              ? 'bg-amber-400/25 blur-md opacity-100'
              : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      {/* Six Glowing Infinity Stones Indicator Highlights (Space, Mind, Reality, Power, Time, Soul) */}
      {showStoneGlow && (isHovered || isSnapping) && state === 'idle' && (
        <div className="pointer-events-none absolute -top-1 -right-1 flex gap-0.5" aria-hidden="true">
          <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8] shadow-[0_0_6px_#38BDF8]" title="Space Stone" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15] shadow-[0_0_6px_#FACC15]" title="Mind Stone" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#EF4444] shadow-[0_0_6px_#EF4444]" title="Reality Stone" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#A855F7] shadow-[0_0_6px_#A855F7]" title="Power Stone" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] shadow-[0_0_6px_#10B981]" title="Time Stone" />
          <span className="h-1.5 w-1.5 rounded-full bg-[#FB923C] shadow-[0_0_6px_#FB923C]" title="Soul Stone" />
        </div>
      )}

      {/* Pulsing Green Time Stone Beacon when snapped */}
      {isSnapped && (
        <span
          className="pointer-events-none absolute -top-1 -right-1 flex h-3 w-3"
          aria-hidden="true"
        >
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_8px_#10B981]" />
        </span>
      )}

      {/* Canvas Rendering Google's 48-Frame Metallic Gauntlet Sprite */}
      <canvas
        ref={canvasRef}
        width={80}
        height={80}
        className={`w-full h-full object-contain pointer-events-none drop-shadow-[0_2px_8px_rgba(201,166,107,0.4)] ${
          isReversing ? 'hue-rotate-[90deg]' : ''
        }`}
      />
    </div>
  );
}
