import { useEffect, useRef, type ReactNode } from 'react';
import { useThanos } from '../context/ThanosContext';

interface ThanosDustedItemProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function ThanosDustedItem({
  id,
  children,
  className = '',
}: ThanosDustedItemProps) {
  const { isDusted, registerItem, unregisterItem } = useThanos();
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerItem(id, elementRef);
    return () => {
      unregisterItem(id);
    };
  }, [id, registerItem, unregisterItem]);

  const dusted = isDusted(id);

  return (
    <div
      ref={elementRef}
      data-thanos-id={id}
      className={`relative ${
        dusted ? 'pointer-events-none select-none' : ''
      } ${className}`}
      style={{
        transitionProperty: 'opacity, transform, filter',
        transitionDuration: dusted ? '2.0s' : '1.4s',
        transitionTimingFunction: dusted
          ? 'cubic-bezier(0.25, 1, 0.5, 1)'
          : 'cubic-bezier(0.16, 1, 0.3, 1)',
        opacity: dusted ? 0 : 1,
        transform: dusted
          ? 'translate(28px, -18px) rotate(1.2deg) skewX(1deg)'
          : 'translate(0px, 0px) rotate(0deg) skewX(0deg)',
        filter: dusted ? 'blur(6px) grayscale(90%)' : 'blur(0px)',
      }}
      aria-hidden={dusted ? true : undefined}
    >
      {children}
    </div>
  );
}
