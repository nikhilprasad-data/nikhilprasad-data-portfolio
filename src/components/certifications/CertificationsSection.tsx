'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CERTIFICATIONS } from '@/data/certifications';
import styles from './CertificationsSection.module.css';

export default function CertificationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const certification = CERTIFICATIONS[activeIndex];

  if (!certification) return null;

  const number = String(activeIndex + 1).padStart(2, '0');
  const showNext = () => {
    setActiveIndex((current) => (current + 1) % CERTIFICATIONS.length);
  };

  return (
    <section
      id="certifications"
      className={styles.section}
      aria-label="Certifications and achievements"
    >
      <div className={styles.inner}>
        <span className={styles.eyebrow}>&mdash; 07 / CERTIFICATIONS &amp; ACHIEVEMENTS</span>

        <div key={certification.id} className={styles.showcase}>
          <article className={styles.identity}>
            <span className={styles.certIndex}>{number}</span>
            <p className={styles.issuer}>{certification.organization}</p>
            <h2 className={styles.title}>{certification.title}</h2>

            {(certification.date || certification.credential) && (
              <div className={styles.meta}>
                {certification.date && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>DATE</span>
                    <span>{certification.date}</span>
                  </div>
                )}
                {certification.credential && (
                  <div className={styles.metaItem}>
                    <span className={styles.metaLabel}>CREDENTIAL</span>
                    <span>{certification.credential}</span>
                  </div>
                )}
              </div>
            )}
          </article>

          <section className={styles.details} aria-labelledby="certification-details-heading">
            <h3 id="certification-details-heading" className={styles.label}>KEY DETAILS</h3>
            {certification.learned.length > 0 && (
              <ul className={styles.detailsList}>
                {certification.learned.map((item) => <li key={item}>{item}</li>)}
              </ul>
            )}
          </section>

          <div className={styles.certificateArea}>
            <div className={styles.certificateFrame}>
              <Image
                key={certification.image}
                className={styles.certificateImage}
                src={certification.image}
                alt={`${certification.title} certificate issued by ${certification.organization}`}
                fill
                sizes="(max-width: 700px) 92vw, (max-width: 900px) 48vw, 50vw"
              />
            </div>
          </div>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.nextButton}
              onClick={showNext}
              aria-label="Next certification"
            >
              NEXT <span aria-hidden="true">&rarr;</span>
            </button>

            <nav className={styles.pagination} aria-label="Choose certification">
              {CERTIFICATIONS.map((item, index) => {
                const itemNumber = String(index + 1).padStart(2, '0');
                const active = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={styles.pageButton}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Show certification ${itemNumber}: ${item.title || item.organization}`}
                    aria-current={active ? 'step' : undefined}
                  >
                    {itemNumber}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
