import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function AmbientGlow() {
  const shouldReduceMotion = useReducedMotion();
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    // Only enable on pointer-capable devices (desktop/laptop)
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isHovering) setIsHovering(true);
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [shouldReduceMotion, isHovering]);

  if (shouldReduceMotion || !isHovering) return null;

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
      style={{
        opacity: isHovering ? 1 : 0,
        background: `radial-gradient(650px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(201, 166, 107, 0.045), transparent 80%)`,
      }}
      aria-hidden="true"
    />
  );
}
