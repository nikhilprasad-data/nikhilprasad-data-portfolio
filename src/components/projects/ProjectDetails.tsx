// src/components/projects/ProjectDetails.tsx
'use client';

import { useEffect, useRef } from 'react';
import type { Project } from '@/data/projects';
import styles from './ProjectShowcase.module.css';

interface Props {
  project: Project;
  isTransitioning: boolean;
}

export default function ProjectDetails({ project, isTransitioning }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.classList.remove(styles.detailsVisible);
    void el.offsetWidth; // force reflow
    el.classList.add(styles.detailsVisible);
  }, [project.id]);

  return (
    <div
      ref={containerRef}
      className={`${styles.details} ${isTransitioning ? styles.detailsFading : ''}`}
    >
      <div className={styles.projectNumber}>{project.number}</div>
      <div className={styles.projectCategory}>{project.category}</div>

      <h2 className={styles.projectTitle}>{project.title}</h2>
      <p className={styles.projectDesc}>{project.description}</p>

      <div className={styles.techList} aria-label="Technologies used">
        {project.technologies.map((tech) => (
          <span key={tech} className={styles.techBadge}>{tech}</span>
        ))}
      </div>

      <div className={styles.projectLinks}>
        <a
          href={project.github}
          className={styles.projectLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${project.title} on GitHub`}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>

        {project.live && (
          <a
            href={project.live}
            className={`${styles.projectLink} ${styles.projectLinkLive}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} live demo`}
          >
            Live Demo
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        )}
      </div>
    </div>
  );
}
