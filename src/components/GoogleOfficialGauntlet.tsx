import { useEffect, useRef } from 'react';

interface Props {
  state: 'idle' | 'snapping' | 'snapped' | 'reversing';
  onClick?: () => void;
  size?: number;
  className?: string;
}

export function GoogleOfficialGauntlet({
  state,
  onClick,
  size = 80,
  className = '',
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  const baseUrl = import.meta.env.BASE_URL.replace(/\/+$/, '');
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
    const sx = Math.min(frameIndex, 47) * 80;
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
      // Last frame of snap shows green Time Stone
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
        const frameInterval = 75; // Slower, dramatic snap pacing (3.6s total)

        const step = (now: number) => {
          if (now - lastTime >= frameInterval) {
            drawSpriteFrame(img, frame);
            frame += 1;
            lastTime = now;
          }
          if (frame < 48) {
            animFrameRef.current = window.requestAnimationFrame(step);
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
        const frameInterval = 75; // Slower, dramatic reversal pacing (3.6s total)

        const step = (now: number) => {
          if (now - lastTime >= frameInterval) {
            drawSpriteFrame(img, frame);
            frame += 1;
            lastTime = now;
          }
          if (frame < 48) {
            animFrameRef.current = window.requestAnimationFrame(step);
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
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-110 active:scale-95 focus:outline-none ${className}`}
      aria-label={
        state === 'snapped'
          ? 'Google Thanos Easter Egg: Time Stone active. Click to restore!'
          : 'Google Thanos Easter Egg: Click to snap fingers!'
      }
      title={
        state === 'snapped'
          ? 'Click to use Time Stone and reverse the snap!'
          : 'Click to play Google Thanos Snap Easter Egg!'
      }
      style={{ width: size, height: size }}
    >
      <canvas
        ref={canvasRef}
        width={80}
        height={80}
        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_12px_rgba(201,166,107,0.4)]"
      />
    </div>
  );
}
