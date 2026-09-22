// src/components/projects/ProjectIndicators.tsx
'use client';

import type { Project } from '@/data/projects';
import styles from './ProjectShowcase.module.css';

interface Props {
  projects: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
  isPaused: boolean;
}

export default function ProjectIndicators({ projects, activeIndex, onSelect, isPaused }: Props) {
  return (
    <div className={styles.indicators} role="tablist" aria-label="Project selector">
      {projects.map((project, i) => (
        <button
          key={project.id}
          className={`${styles.indicator} ${i === activeIndex ? styles.indicatorActive : ''}`}
          onClick={() => onSelect(i)}
          role="tab"
          aria-selected={i === activeIndex}
          aria-label={`Select project: ${project.title}`}
        >
          <span className={styles.indicatorNum}>{project.number}</span>
          {i === activeIndex && (
            <span
              className={`${styles.indicatorProgress} ${isPaused ? styles.paused : ''}`}
              aria-hidden="true"
            />
          )}
        </button>
      ))}
    </div>
  );
}
