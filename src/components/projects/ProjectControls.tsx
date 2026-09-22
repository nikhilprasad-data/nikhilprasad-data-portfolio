// src/components/projects/ProjectControls.tsx
'use client';

import styles from './ProjectShowcase.module.css';

interface Props {
  isPaused: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePause: () => void;
}

export default function ProjectControls({ isPaused, onPrev, onNext, onTogglePause }: Props) {
  return (
    <div className={styles.controls} role="group" aria-label="Project navigation controls">
      <button
        className={styles.controlBtn}
        onClick={onPrev}
        aria-label="Previous project"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M11 14L6 9l5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <button
        className={`${styles.controlBtn} ${styles.pauseBtn}`}
        onClick={onTogglePause}
        aria-label={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
        aria-pressed={isPaused}
      >
        {isPaused ? (
          // Play icon
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <path d="M3 2.5L11 7L3 11.5V2.5Z" />
          </svg>
        ) : (
          // Pause icon
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
            <rect x="3" y="2" width="3" height="10" rx="0.5" />
            <rect x="8" y="2" width="3" height="10" rx="0.5" />
          </svg>
        )}
      </button>

      <button
        className={styles.controlBtn}
        onClick={onNext}
        aria-label="Next project"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M7 4L12 9l-5 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}
