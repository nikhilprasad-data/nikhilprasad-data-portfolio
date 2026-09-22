// src/components/contact/ContactSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './ContactSection.module.css';

const LINKS = [
  { label: 'Email', value: 'hello@placeholder.dev', href: 'mailto:hello@placeholder.dev', icon: '✉' },
  { label: 'LinkedIn', value: '/in/placeholder', href: 'https://linkedin.com/in/placeholder', icon: '↗' },
  { label: 'GitHub', value: '@placeholder', href: 'https://github.com/placeholder', icon: '↗' },
  { label: 'Résumé', value: 'Download PDF', href: '/resume-placeholder.pdf', icon: '↓' },
];

export default function ContactSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add(styles.headlineVisible);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="contact"
      className={styles.section}
      aria-label="Contact"
    >
      <div className={styles.inner}>
        <span className="eyebrow">— 09 / Contact</span>

        <h2 ref={headlineRef} className={styles.headline}>
          <span className={styles.headlineWord}>Let&apos;s build</span>
          <span className={styles.headlineWord}>
            <em className={styles.accent}>something.</em>
          </span>
        </h2>

        <p className={styles.tagline}>
          Open to full-time roles, internships, and technical collaborations.
        </p>

        <div className={styles.linksGrid} role="list" aria-label="Contact links">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.linkItem}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
              role="listitem"
              aria-label={`${link.label}: ${link.value}`}
            >
              <span className={styles.linkLabel}>{link.label}</span>
              <div className={styles.linkValueRow}>
                <span className={styles.linkValue}>{link.value}</span>
                <span className={styles.linkIcon} aria-hidden="true">{link.icon}</span>
              </div>
              <div className={styles.linkUnderline} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Large decorative text */}
      <div className={styles.decoText} aria-hidden="true">BUILD</div>

      {/* Atmospheric glow */}
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.gridOverlay} aria-hidden="true" />
    </section>
  );
}
