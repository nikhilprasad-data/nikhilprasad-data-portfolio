'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PROJECTS } from '@/data/projects';
import { easing } from '@/lib/animation/easing';
import { useProjectAutoplay } from '@/lib/hooks/useProjectAutoplay';
import { useReducedMotion } from '@/lib/hooks/useReducedMotion';
import { useIsSingleCard } from '@/lib/hooks/useIsSingleCard';
import ProjectCard, { type ProjectCardElements } from './ProjectCard';
import ProjectIndicators from './ProjectIndicators';
import styles from './ProjectShowcase.module.css';

const TRANSITION_MS = 800;
const CROSSFADE_MS = 480;
const CARD_GAP = 24;

type CardMotion = {
  projectIndex: number;
  fromSlot: number;
  toSlot: number;
  fromOpacity: number;
  toOpacity: number;
};

interface Transition {
  duration: number;
  cards: CardMotion[];
}

const nextIndex = (index: number) => (index + 1) % PROJECTS.length;
const previousIndex = (index: number) => (index - 1 + PROJECTS.length) % PROJECTS.length;

const getSettledCards = (leadingIndex: number, singleCard: boolean): CardMotion[] => {
  const cards: CardMotion[] = [{
    projectIndex: leadingIndex,
    fromSlot: 0,
    toSlot: 0,
    fromOpacity: 1,
    toOpacity: 1,
  }];

  if (!singleCard) {
    cards.push({
      projectIndex: nextIndex(leadingIndex),
      fromSlot: 1,
      toSlot: 1,
      fromOpacity: 1,
      toOpacity: 1,
    });
  }

  return cards;
};

export default function ProjectShowcase() {
  const singleCard = useIsSingleCard();
  const reducedMotion = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const cardElementsRef = useRef(new Map<number, ProjectCardElements>());
  const animationFrameRef = useRef<number | null>(null);
  const autoplayAdvanceRef = useRef<() => void>(() => undefined);
  const strideRef = useRef(0);
  const previousLayoutRef = useRef(singleCard);
  const [stageWidth, setStageWidth] = useState(0);
  const [transition, setTransition] = useState<Transition | null>(null);
  const isTransitioning = transition !== null;

  const {
    activeIndex,
    setActiveIndex,
    resetAutoplay,
  } = useProjectAutoplay(
    PROJECTS.length,
    isTransitioning,
    () => autoplayAdvanceRef.current()
  );

  const stride = singleCard ? stageWidth : (stageWidth - CARD_GAP) / 2 + CARD_GAP;
  const cardWidth = singleCard ? stageWidth : Math.max(0, (stageWidth - CARD_GAP) / 2);

  useLayoutEffect(() => {
    strideRef.current = stride;
  }, [stride]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const updateWidth = () => setStageWidth(stage.getBoundingClientRect().width);
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (previousLayoutRef.current === singleCard) return;
    previousLayoutRef.current = singleCard;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    const timeout = window.setTimeout(() => setTransition(null), 0);
    return () => window.clearTimeout(timeout);
  }, [singleCard]);

  useEffect(() => {
    if (!reducedMotion || !transition) return;
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    const timeout = window.setTimeout(() => setTransition(null), 0);
    return () => window.clearTimeout(timeout);
  }, [reducedMotion, transition]);

  const registerCard = useCallback((index: number, elements: ProjectCardElements | null) => {
    if (elements) cardElementsRef.current.set(index, elements);
    else cardElementsRef.current.delete(index);
  }, []);

  const startTransition = useCallback((targetIndex: number) => {
    if (targetIndex === activeIndex) {
      resetAutoplay();
      return;
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    const isForward = targetIndex === nextIndex(activeIndex);
    const isBackward = targetIndex === previousIndex(activeIndex);

    if (reducedMotion || stageWidth === 0) {
      setActiveIndex(targetIndex);
      setTransition(null);
      resetAutoplay();
      return;
    }

    let cards: CardMotion[];
    let duration = CROSSFADE_MS;

    if (isForward) {
      duration = TRANSITION_MS;
      if (singleCard) {
        cards = [
          {
            ...getSettledCards(activeIndex, true)[0],
            fromSlot: 0,
            toSlot: -1,
          },
          {
            projectIndex: targetIndex,
            fromSlot: 1,
            toSlot: 0,
            fromOpacity: 1,
            toOpacity: 1,
          },
        ];
      } else {
        cards = [
          {
            projectIndex: activeIndex,
            fromSlot: 0,
            toSlot: -1,
            fromOpacity: 1,
            toOpacity: 1,
          },
          {
            projectIndex: targetIndex,
            fromSlot: 1,
            toSlot: 0,
            fromOpacity: 1,
            toOpacity: 1,
          },
          {
            projectIndex: nextIndex(targetIndex),
            fromSlot: 2,
            toSlot: 1,
            fromOpacity: 1,
            toOpacity: 1,
          },
        ];
      }
    } else if (isBackward) {
      if (singleCard) {
        cards = [
          {
            projectIndex: activeIndex,
            fromSlot: 0,
            toSlot: 0,
            fromOpacity: 1,
            toOpacity: 0,
          },
          {
            projectIndex: targetIndex,
            fromSlot: 0,
            toSlot: 0,
            fromOpacity: 0,
            toOpacity: 1,
          },
        ];
      } else {
        cards = [
          {
            projectIndex: activeIndex,
            fromSlot: 0,
            toSlot: 1,
            fromOpacity: 1,
            toOpacity: 1,
          },
          {
            projectIndex: nextIndex(activeIndex),
            fromSlot: 1,
            toSlot: 1,
            fromOpacity: 1,
            toOpacity: 0,
          },
          {
            projectIndex: targetIndex,
            fromSlot: 0,
            toSlot: 0,
            fromOpacity: 0,
            toOpacity: 1,
          },
        ];
      }
    } else {
      const targetCards = getSettledCards(targetIndex, singleCard);
      cards = [
        {
          projectIndex: activeIndex,
          fromSlot: 0,
          toSlot: 0,
          fromOpacity: 1,
          toOpacity: 0,
        },
        ...targetCards.map((card) => ({
          ...card,
          fromOpacity: 0,
          toOpacity: 1,
        })),
      ];
    }

    setActiveIndex(targetIndex);
    setTransition({
      duration,
      cards,
    });
  }, [activeIndex, reducedMotion, resetAutoplay, setActiveIndex, singleCard, stageWidth]);

  useEffect(() => {
    if (!transition) return;

    const startTime = performance.now();
    const animate = (now: number) => {
      const progress = Math.min(1, (now - startTime) / transition.duration);
      const eased = easing.outExpo(progress);

      for (const card of transition.cards) {
        const elements = cardElementsRef.current.get(card.projectIndex);
        if (!elements) continue;

        const slot = card.fromSlot + (card.toSlot - card.fromSlot) * eased;
        const opacity = card.fromOpacity + (card.toOpacity - card.fromOpacity) * eased;

        elements.card.style.transform = `translate3d(${slot * strideRef.current}px, 0, 0)`;
        elements.content.style.opacity = String(opacity);
      }

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        animationFrameRef.current = null;
        setTransition(null);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [transition]);

  useEffect(() => () => {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
  }, []);

  const selectProject = useCallback((index: number) => {
    if (isTransitioning) return;
    startTransition(index);
  }, [isTransitioning, startTransition]);

  useLayoutEffect(() => {
    autoplayAdvanceRef.current = () => startTransition(nextIndex(activeIndex));
  }, [activeIndex, startTransition]);

  const cards = transition?.cards ?? getSettledCards(activeIndex, singleCard);

  return (
    <section id="projects" className={styles.section} aria-label="Featured Projects">
      <div className={styles.sectionHeader}>
        <span className="eyebrow">— 03 / Featured Projects</span>
        <div className={styles.headerLine} aria-hidden="true" />
      </div>

      <div className={styles.carouselStage} ref={stageRef}>
        {cards.map((card) => {
          const project = PROJECTS[card.projectIndex];
          const initialX = card.fromSlot * stride;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              projectIndex={card.projectIndex}
              cardWidth={cardWidth}
              initialX={initialX}
              initialContentOpacity={card.fromOpacity}
              registerCard={registerCard}
            />
          );
        })}
      </div>

      <div className={styles.bottomBar}>
        <ProjectIndicators
          projects={PROJECTS}
          activeIndex={activeIndex}
          onSelect={selectProject}
          isTransitioning={isTransitioning}
        />
      </div>

      <div className={styles.topFade} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />
    </section>
  );
}
