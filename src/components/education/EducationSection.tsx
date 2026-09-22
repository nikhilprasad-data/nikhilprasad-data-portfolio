// src/components/education/EducationSection.tsx
'use client';

import { EDUCATION } from '@/data/education';
import styles from './EducationSection.module.css';

export default function EducationSection() {
  const edu = EDUCATION[0];

  return (
    <section
      id="education"
      className={styles.section}
      aria-label="Education"
    >
      <div className={styles.inner}>
        {/* Label */}
        <span className="eyebrow">— 06 / Education</span>

        {/* Main composition */}
        <div className={styles.composition}>
          {/* Institution — oversized */}
          <div className={styles.institutionBlock}>
            <h2 className={styles.institution}>{edu.institution}</h2>
            <div className={styles.institutionLine} aria-hidden="true" />
          </div>

          {/* Details */}
          <div className={styles.details}>
            <div className={styles.degreeBlock}>
              <span className={styles.degree}>{edu.degree}</span>
              <span className={styles.field}>{edu.field}</span>
            </div>

            <div className={styles.metaBlock}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Location</span>
                <span className={styles.metaValue}>{edu.location}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Period</span>
                <span className={`${styles.metaValue} ${styles.yearAccent}`}>
                  {edu.startYear} — {edu.endYear}
                </span>
              </div>
            </div>
          </div>

          {/* Highlights */}
          <ul className={styles.highlights} aria-label="Education highlights">
            {edu.highlights.map((h, i) => (
              <li key={i} className={styles.highlight}>
                <span className={styles.highlightDot} aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Background grid lines */}
      <div className={styles.bgLines} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className={styles.bgLine} />
        ))}
      </div>

      {/* Green radial glow */}
      <div className={styles.glow} aria-hidden="true" />
    </section>
  );
}
