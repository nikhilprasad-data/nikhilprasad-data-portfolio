// src/components/skills/SkillsSection.tsx
'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { SKILLS } from '@/data/skills';
import styles from './SkillsSection.module.css';

const SkillsScene = dynamic(() => import('./SkillsScene'), {
  ssr: false,
  loading: () => <div className={styles.scenePlaceholder} />,
});

export default function SkillsSection() {
  // Group skills into rings by level
  const rings = useMemo(() => {
    return [1, 2, 3].map((lvl) => SKILLS.filter((s) => s.level === lvl));
  }, []);

  return (
    <section
      id="skills"
      className={styles.section}
      aria-label="Tech Stack"
    >
      {/* Section label */}
      <div className={styles.sectionHeader}>
        <span className="eyebrow">— 05 / Tech Stack</span>
      </div>

      {/* 3D orbital visualization */}
      <div className={styles.sceneWrapper} aria-label="Technology orbital visualization">
        <SkillsScene rings={rings} />
      </div>

      {/* Text overlay */}
      <div className={styles.textOverlay}>
        <h2 className={styles.headline}>
          The tools I
          <br />
          <em className={styles.accent}>use to build.</em>
        </h2>
        <p className={styles.sub}>
          Orbital rings represent depth of use — inner core is daily, outer is extended toolkit.
        </p>
      </div>

      {/* Background fades */}
      <div className={styles.topFade} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />
    </section>
  );
}
