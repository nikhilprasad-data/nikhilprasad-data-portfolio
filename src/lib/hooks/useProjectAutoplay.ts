// src/lib/hooks/useProjectAutoplay.ts
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const AUTOPLAY_INTERVAL = 5000;

interface UseProjectAutoplayReturn {
  activeIndex: number;
  isPaused: boolean;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  pause: () => void;
  resume: () => void;
  togglePause: () => void;
}

export function useProjectAutoplay(total: number): UseProjectAutoplayReturn {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Single source of truth for the timer
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPausedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (isPausedRef.current) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_INTERVAL);
  }, [clearTimer, total]);

  // Start on mount
  useEffect(() => {
    startTimer();
    return () => clearTimer();
  }, [startTimer, clearTimer]);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(index);
      startTimer(); // reset timer on manual navigation
    },
    [startTimer]
  );

  const goNext = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev + 1) % total;
      return next;
    });
    startTimer();
  }, [startTimer, total]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => {
      const next = (prev - 1 + total) % total;
      return next;
    });
    startTimer();
  }, [startTimer, total]);

  const pause = useCallback(() => {
    isPausedRef.current = true;
    setIsPaused(true);
    clearTimer();
  }, [clearTimer]);

  const resume = useCallback(() => {
    isPausedRef.current = false;
    setIsPaused(false);
    startTimer();
  }, [startTimer]);

  const togglePause = useCallback(() => {
    if (isPausedRef.current) {
      resume();
    } else {
      pause();
    }
  }, [pause, resume]);

  return {
    activeIndex,
    isPaused,
    goTo,
    goNext,
    goPrev,
    pause,
    resume,
    togglePause,
  };
}
