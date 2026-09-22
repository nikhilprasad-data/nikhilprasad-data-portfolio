// src/components/projects/ProjectShowcase.tsx
'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { PROJECTS } from '@/data/projects';
import { useProjectAutoplay } from '@/lib/hooks/useProjectAutoplay';
import ProjectDetails from './ProjectDetails';
import ProjectIndicators from './ProjectIndicators';
import styles from './ProjectShowcase.module.css';

// Lazy-load the heavy 3D scene
const ProjectScene = dynamic(() => import('./ProjectScene'), {
  ssr: false,
  loading: () => <div className={styles.sceneLoading} />,
});

export default function ProjectShowcase() {
  const { activeIndex, isPaused, goTo, goNext, goPrev, togglePause } =
    useProjectAutoplay(PROJECTS.length);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNav = (fn: () => void) => {
    setIsTransitioning(true);
    fn();
    setTimeout(() => setIsTransitioning(false), 600);
  };

  const activeProject = PROJECTS[activeIndex];

  return (
    <section
      id="projects"
      className={styles.section}
      aria-label="Featured Projects"
    >
      {/* Section label */}
      <div className={styles.sectionHeader}>
        <span className="eyebrow">— 03 / Featured Projects</span>
        <div className={styles.headerLine} aria-hidden="true" />
      </div>

      {/* 3D canvas fills the section */}
      <div className={styles.canvasWrapper} aria-hidden="true">
        <ProjectScene activeIndex={activeIndex} />
        {/* Green atmospheric glow behind active visual */}
        <div className={styles.atmosphericGlow} aria-hidden="true" />
      </div>

      {/* Bottom overlay — project details */}
      <div className={styles.overlay}>
        {/* Left metadata panel */}
        <div className={styles.metaPanel}>
          <ProjectDetails
            project={activeProject}
            isTransitioning={isTransitioning}
          />
        </div>

        {/* Bottom controls */}
        <div className={styles.bottomBar}>
          <ProjectIndicators
            projects={PROJECTS}
            activeIndex={activeIndex}
            onSelect={(i) => handleNav(() => goTo(i))}
            isPaused={isPaused}
          />
        </div>
      </div>

      {/* Background gradient fades */}
      <div className={styles.topFade} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />
    </section>
  );
}
