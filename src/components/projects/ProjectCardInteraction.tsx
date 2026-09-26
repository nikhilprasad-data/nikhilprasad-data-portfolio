'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className: string;
}

export default function ProjectCardInteraction({ children, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const reset = () => {
      container.style.setProperty('--pointer-light', '0');
      container.style.setProperty('--tilt-x', '0deg');
      container.style.setProperty('--tilt-y', '0deg');
    };

    const isEnabled = () => finePointer.matches && !reducedMotion.matches;

    const handlePointerMove = (event: PointerEvent) => {
      if (!isEnabled() || event.pointerType === 'touch') {
        reset();
        return;
      }

      const bounds = container.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      const tiltX = (0.5 - y) * 1.8;
      const tiltY = (x - 0.5) * 1.8;

      container.style.setProperty('--pointer-x', `${x * 100}%`);
      container.style.setProperty('--pointer-y', `${y * 100}%`);
      container.style.setProperty('--pointer-light', '1');
      container.style.setProperty('--tilt-x', `${tiltX}deg`);
      container.style.setProperty('--tilt-y', `${tiltY}deg`);
    };

    const handlePointerLeave = () => reset();
    const handlePreferenceChange = () => reset();

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerleave', handlePointerLeave);
    finePointer.addEventListener('change', handlePreferenceChange);
    reducedMotion.addEventListener('change', handlePreferenceChange);
    reset();

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      finePointer.removeEventListener('change', handlePreferenceChange);
      reducedMotion.removeEventListener('change', handlePreferenceChange);
    };
  }, []);

  return <div ref={containerRef} className={className}>{children}</div>;
}
