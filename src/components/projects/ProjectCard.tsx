'use client';

import { useCallback, useRef } from 'react';
import type { Project } from '@/data/projects';
import ProjectDetails from './ProjectDetails';
import styles from './ProjectShowcase.module.css';

export interface ProjectCardElements {
  card: HTMLElement;
  content: HTMLDivElement;
}

interface Props {
  project: Project;
  projectIndex: number;
  cardWidth: number;
  initialX: number;
  initialContentOpacity: number;
  registerCard: (index: number, elements: ProjectCardElements | null) => void;
}

export default function ProjectCard({
  project,
  projectIndex,
  cardWidth,
  initialX,
  initialContentOpacity,
  registerCard,
}: Props) {
  const cardElementRef = useRef<HTMLElement | null>(null);
  const contentElementRef = useRef<HTMLDivElement | null>(null);

  const syncRegisteredElements = useCallback(() => {
    const { current: card } = cardElementRef;
    const { current: content } = contentElementRef;
    registerCard(projectIndex, card && content ? { card, content } : null);
  }, [projectIndex, registerCard]);

  const setCardRef = useCallback((element: HTMLElement | null) => {
    cardElementRef.current = element;
    syncRegisteredElements();
  }, [syncRegisteredElements]);
  const setContentRef = useCallback((element: HTMLDivElement | null) => {
    contentElementRef.current = element;
    syncRegisteredElements();
  }, [syncRegisteredElements]);
  return (
    <>
      <article
        ref={setCardRef}
        className={styles.projectCard}
        aria-label={`${project.number} ${project.title}`}
        style={{
          width: cardWidth > 0 ? `${cardWidth}px` : undefined,
          transform: `translate3d(${initialX}px, 0, 0)`,
        }}
      >
        <div className={styles.visualViewport} />
        <div
          ref={setContentRef}
          className={styles.cardContent}
          style={{ opacity: initialContentOpacity }}
        >
          <ProjectDetails project={project} />
        </div>
      </article>

    </>
  );
}
