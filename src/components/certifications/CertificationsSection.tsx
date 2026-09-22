// src/components/certifications/CertificationsSection.tsx
'use client';

import { CERTIFICATIONS } from '@/data/certifications';
import styles from './CertificationsSection.module.css';

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className={styles.section}
      aria-label="Certifications"
    >
      <div className={styles.inner}>
        <span className="eyebrow">— 07 / Certifications</span>

        <div className={styles.header}>
          <h2 className={styles.headline}>
            Verified
            <br />
            <em className={styles.accent}>expertise.</em>
          </h2>
        </div>

        <div className={styles.grid} role="list">
          {CERTIFICATIONS.map((cert, i) => (
            <article
              key={cert.id}
              className={styles.certCard}
              role="listitem"
            >
              {/* Certificate document frame */}
              <div className={styles.certFrame}>
                <div className={styles.certFrameCornerTL} aria-hidden="true" />
                <div className={styles.certFrameCornerBR} aria-hidden="true" />

                <div className={styles.certContent}>
                  <span className={styles.certIndex}>
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className={styles.certBody}>
                    <h3 className={styles.certTitle}>{cert.title}</h3>
                    <p className={styles.certIssuer}>{cert.issuer}</p>

                    <div className={styles.certMeta}>
                      <span className={styles.certDate}>{cert.date}</span>
                      {cert.credentialId && (
                        <span className={styles.certId}>
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>

                  {cert.url && cert.url !== '#' && (
                    <a
                      href={cert.url}
                      className={styles.certLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${cert.title} credential`}
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Shimmer glow */}
              <div className={styles.certGlow} aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>

      <div className={styles.bgGlow} aria-hidden="true" />
    </section>
  );
}
