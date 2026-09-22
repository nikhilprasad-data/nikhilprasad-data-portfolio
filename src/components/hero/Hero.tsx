// src/components/hero/Hero.tsx
'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';

// Lazy-load the 3D canvas so it doesn't block SSR
const HeroScene = dynamic(() => import('./HeroScene'), {
  ssr: false,
  loading: () => <div className={styles.scenePlaceholder} />,
});

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // GSAP scroll-parallax on headline
    const el = headlineRef.current;
    if (!el) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      el.style.transform = `translateY(${scrollY * 0.18}px)`;
      el.style.opacity = `${Math.max(0, 1 - scrollY / 500)}`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      className={styles.hero}
      aria-label="Hero — introduction"
    >
      {/* 3D Background Scene */}
      <div className={styles.sceneWrapper} aria-hidden="true">
        <HeroScene />
      </div>

      {/* Layered overlays */}
      <div className={styles.gridOverlay} aria-hidden="true" />
      <div className={styles.radialGlow} aria-hidden="true" />
      <div className={styles.bottomFade} aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>

        <h1 ref={headlineRef} className={styles.headline}>
          <span className={styles.headlineLine}>AI &amp; Backend</span>
          <span className={styles.headlineLine}>
            <em className={styles.accent}>Engineer</em>
          </span>
          <span className={styles.headlineSmall}>Building intelligent systems</span>
        </h1>

        <p className={styles.subtext}>
          Specializing in LLM orchestration, backend architecture, and
          <br className={styles.br} /> data-intensive systems. IIT Guwahati, 2025–2029.
        </p>

        <div className={styles.ctas}>
          <a href="#projects" className={`btn btn-primary ${styles.ctaPrimary}`}>
            View Work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 11L11 3M11 3H5M11 3v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          <a href="/resume-placeholder.pdf" className={`btn btn-ghost ${styles.ctaGhost}`} target="_blank" rel="noopener noreferrer">
            Download Résumé
          </a>
        </div>

        {/* Social / contact links */}
        <div className={styles.socials} aria-label="Social and contact links">
          <a
            href="https://github.com/nikhilprasad-data"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nikhilprasad-data/"
            className={styles.socialLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href="mailto:contact.nikhilprasad@gmail.com"
            className={styles.socialLink}
            aria-label="Send email"
          >
            <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="M2 7l10 7 10-7"/>
            </svg>
            Gmail
          </a>
        </div>

        {/* Photo placeholder */}
        <div className={styles.photoPlaceholder} aria-label="Profile photograph placeholder">
          <div className={styles.photoFrame}>
            <div className={styles.photoInner}>
              <span className={styles.photoLabel}>Photo</span>
            </div>
            <div className={styles.photoGlow} aria-hidden="true" />
            <div className={styles.photoBorder} aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={styles.scrollIndicator} aria-hidden="true">
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>scroll</span>
      </div>
    </section>
  );
}
