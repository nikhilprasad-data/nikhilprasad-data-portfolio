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
  const learned = certification.learned ?? [];

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % CERTIFICATIONS.length);
  };

  return (
    <section
      id="certifications"
      className={styles.section}
      aria-label="Certifications"
    >
      <div className={styles.inner}>
        <span className={styles.eyebrow}>— 07 / CERTIFICATIONS</span>

        <div key={certification.id} className={styles.showcase}>
          <article className={styles.identity}>
            <span className={styles.certIndex}>{number}</span>

            <p
              className={styles.issuer}
              data-placeholder={certification.issuer === 'Issuing Organization' ? 'true' : undefined}
            >
              {certification.issuer}
            </p>
            <h2 className={styles.title}>{certification.title}</h2>
            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>DATE / YEAR</span>
                <span>{certification.date}</span>
              </div>
              {certification.credentialId && (
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>CREDENTIAL</span>
                  <span>{certification.credentialId}</span>
                </div>
              )}
            </div>
          </article>

          <div className={styles.certificateArea}>
            <div
              className={styles.certificateFrame}
              role="group"
              aria-label={`Certificate image area for ${certification.title}`}
            >
              {certification.image ? (
                <Image
                  src={certification.image}
                  alt={`${certification.title}, issued by ${certification.issuer}`}
                  fill
                  sizes="(max-width: 700px) 92vw, 58vw"
                  className={styles.certificateImage}
                />
              ) : (
                <span className={styles.imageLabel}>CERTIFICATE IMAGE</span>
              )}
            </div>
          </div>

          <section className={styles.learned} aria-labelledby="certification-learned-heading">
            <h3 id="certification-learned-heading" className={styles.label}>WHAT I LEARNED</h3>
            {learned.length > 0 ? (
              <ul className={styles.points}>
                {learned.map((item) => <li key={item}>{item}</li>)}
              </ul>
            ) : (
              <p className={styles.emptyDetails}>Learning details not provided.</p>
            )}
          </section>

          <div className={styles.controls}>
            <button
              type="button"
              className={styles.nextButton}
              onClick={showNext}
              aria-label="Next certification"
            >
              NEXT <span aria-hidden="true">→</span>
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
                    aria-label={`Show certification ${itemNumber}: ${item.title}`}
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
