// src/components/about/AboutSection.tsx
'use client';

import { useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';


export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = sectionRef.current?.querySelectorAll(`.${styles.reveal}`);
    els?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className={styles.section}
      aria-label="About"
    >
      <div className={styles.grid}>
        {/* Left — oversized text */}
        <div className={styles.left}>
          <h2 className={`${styles.headline} ${styles.reveal}`}>
            I build systems
            <br />
            that <em className={styles.accent}>think.</em>
          </h2>

          <div ref={lineRef} className={`${styles.divider} ${styles.reveal}`} aria-hidden="true" />

          <p className={`${styles.body} ${styles.reveal}`}>
            A Data Science &amp; AI student at IIT Guwahati, specializing in
            LLM orchestration, multi-agent architectures, and high-throughput
            backend systems. I design software that processes data at scale
            and surfaces intelligence where it matters.
          </p>
          <p className={`${styles.body} ${styles.reveal}`}>
            My work lives at the intersection of rigorous engineering and applied
            AI — where backend performance meets cognitive capability.
          </p>
        </div>

        {/* Right — visual core with external orbital system */}
        <div className={styles.right}>
          {/* coreScene — coordinate system for core box + surrounding orbital.
              .orbitalWrapper is a SIBLING of .contentBox here, not its child.
              Stacking: orbital (z:1) → backgroundPlate (z:2) → contentBox (z:3) */}
          <div className={styles.coreScene}>

            {/* Orbital system — surrounds contentBox externally.
                aria-hidden on wrapper covers all descendants.
                Structure: ringPlane (static tilt) → ringRotation (spin)
                           → nodePosition (circumference anchor) → nodeContent (counter-spin)
                               → nodeDot / nodeLabel (visual) */}
            <div className={styles.orbitalWrapper} aria-hidden="true">
              {/* Ring 1 — inner orbit — Python · FastAPI · LangChain */}
              <div className={styles.ringPlane1}>
                <div className={styles.ringRotation1}>
                  <div className={styles.np0}>
                    <div className={styles.nc1}>
                      <span className={styles.nodeDot} />
                    </div>
                  </div>
                  <div className={styles.np1}>
                    <div className={styles.nc1}>
                      <span className={styles.nodeDot} />
                    </div>
                  </div>
                  <div className={styles.np2}>
                    <div className={styles.nc1}>
                      <span className={styles.nodeDot} />
                    </div>
                  </div>
                </div>
              </div>
              {/* Ring 2 — outer orbit — LangGraph · AI · Data Science */}
              <div className={styles.ringPlane2}>
                <div className={styles.ringRotation2}>
                  <div className={styles.np3}>
                    <div className={styles.nc2}>
                      <span className={styles.nodeDot2} />
                    </div>
                  </div>
                  <div className={styles.np4}>
                    <div className={styles.nc2}>
                      <span className={styles.nodeDot2} />
                    </div>
                  </div>
                  <div className={styles.np5}>
                    <div className={styles.nc2}>
                      <span className={styles.nodeDot2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark occluder — blocks orbital lines visible through box's translucent bg.
                Synchronized to core box dimensions via --core-w / --core-h tokens. */}
            <div className={styles.backgroundPlate} aria-hidden="true" />

            {/* Core box — interior is clean and available for future content */}
            <div className={`${styles.contentBox} ${styles.reveal}`} aria-label="Engineering identity content area">
              <div className={styles.contentBoxCornerTL} aria-hidden="true" />
              <div className={styles.contentBoxCornerBR} aria-hidden="true" />
              <ul className={styles.identitySignals} aria-label="Technical identity markers">
                {['Python', 'FastAPI', 'LangChain', 'LangGraph', 'AI', 'Data Science'].map((technology) => (
                  <li className={styles.identitySignal} key={technology}>
                    <span className={styles.signalDot} aria-hidden="true" />
                    {technology}
                  </li>
                ))}
              </ul>
              {/* Energy particles — 4 per edge + 8 ambient, originate from box perimeter */}
              {Array.from({ length: 24 }, (_, i) => (
                <span
                  key={i}
                  className={`${styles.particle} ${styles[`p${i}`]}`}
                  aria-hidden="true"
                />
              ))}
              {/* Outer energy aura */}
              <span className={styles.energyAura} aria-hidden="true" />
            </div>

          </div>
        </div>
      </div>

      {/* Background geometric elements */}
      <div className={styles.geoBg} aria-hidden="true">
        <div className={styles.geoLine1} />
        <div className={styles.geoLine2} />
        <div className={styles.geoCircle} />
      </div>
    </section>
  );
}
