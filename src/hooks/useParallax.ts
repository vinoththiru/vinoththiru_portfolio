import { useTransform, useScroll, MotionValue } from 'framer-motion';
import { useRef } from 'react';

export function useParallax(offset: number = 50): {
  ref: React.RefObject<HTMLElement>;
  y: MotionValue<number>;
} {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  return { ref, y };
}
