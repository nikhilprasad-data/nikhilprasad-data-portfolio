'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const AUTOPLAY_INTERVAL = 5000;

interface UseProjectAutoplayReturn {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  resetAutoplay: () => void;
}

export function useProjectAutoplay(
  total: number,
  isTransitioning: boolean,
  onAdvance: () => void
): UseProjectAutoplayReturn {
  const [activeIndex, updateActiveIndex] = useState(0);
  const [timerVersion, setTimerVersion] = useState(0);
  const onAdvanceRef = useRef(onAdvance);

  useLayoutEffect(() => {
    onAdvanceRef.current = onAdvance;
  }, [onAdvance]);

  const setActiveIndex = useCallback((index: number) => {
    updateActiveIndex(((index % total) + total) % total);
  }, [total]);

  const resetAutoplay = useCallback(() => {
    setTimerVersion((version) => version + 1);
  }, []);

  useEffect(() => {
    if (isTransitioning || total < 2) return;

    const timeout = window.setTimeout(() => onAdvanceRef.current(), AUTOPLAY_INTERVAL);
    return () => window.clearTimeout(timeout);
  }, [isTransitioning, timerVersion, total]);

  return { activeIndex, setActiveIndex, resetAutoplay };
}
