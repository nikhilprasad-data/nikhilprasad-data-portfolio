// src/components/projects/ProjectIndicators.tsx
'use client';

import type { Project } from '@/data/projects';
import styles from './ProjectShowcase.module.css';

interface Props {
  projects: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
  isTransitioning: boolean;
}

export default function ProjectIndicators({ projects, activeIndex, onSelect, isTransitioning }: Props) {
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
          disabled={isTransitioning}
        >
          <span className={styles.indicatorNum}>{project.number}</span>
          {i === activeIndex && (
            <span
              className={`${styles.indicatorProgress} ${isTransitioning ? styles.paused : ''}`}
              aria-hidden="true"
            />
          )}
        </button>
      ))}
    </div>
  );
}
