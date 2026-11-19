import { useEffect, useRef, type ReactNode } from 'react';
import { useThanos } from '../context/ThanosContext';

interface SectionDisintegrationProps {
  id: string;
  children: ReactNode;
  className?: string;
}

export function SectionDisintegration({
  id,
  children,
  className = '',
}: SectionDisintegrationProps) {
  const { registerSectionRef, unregisterSectionRef } = useThanos();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    registerSectionRef(id, ref);
    return () => unregisterSectionRef(id);
  }, [id, registerSectionRef, unregisterSectionRef]);

  return (
    <div
      ref={ref}
      id={`section-shell-${id}`}
      data-section-id={id}
      className={`relative ${className}`}
    >
      {children}
    </div>
  );
}
