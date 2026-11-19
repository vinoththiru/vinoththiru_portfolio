import { useEffect, useRef } from 'react';
import { pixelDisintegrationEngine } from '../utils/PixelDisintegrationEngine';

export { pixelDisintegrationEngine } from '../utils/PixelDisintegrationEngine';

export function DustParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    pixelDisintegrationEngine.setCanvas(canvas);

    const onResize = () => pixelDisintegrationEngine.handleResize();
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      pixelDisintegrationEngine.setCanvas(null);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[120] select-none"
      aria-hidden="true"
    />
  );
}
