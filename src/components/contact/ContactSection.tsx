'use client';

import { useEffect, useRef } from 'react';
import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import styles from './ContactSection.module.css';

type ContactLink = {
  label: string;
  value: string;
  action: string;
  href: string;
  icon: 'email' | 'linkedin' | 'github' | 'resume';
  external?: boolean;
};

const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'EMAIL',
    value: 'contact.nikhilprasad@gmail.com',
    action: 'Send Email',
    href: 'mailto:contact.nikhilprasad@gmail.com?subject=Portfolio%20Inquiry%20%E2%80%94%20Nikhil%20Prasad',
    icon: 'email',
  },
  {
    label: 'LINKEDIN',
    value: 'www.linkedin.com/in/nikhilprasad-data',
    action: 'View Profile',
    href: 'https://www.linkedin.com/in/nikhilprasad-data',
    icon: 'linkedin',
    external: true,
  },
  {
    label: 'GITHUB',
    value: 'github.com/nikhilprasad-data',
    action: 'Explore GitHub',
    href: 'https://github.com/nikhilprasad-data',
    icon: 'github',
    external: true,
  },
  {
    label: 'RESUME',
    value: 'View / Download Resume',
    action: 'Open Resume',
    href: '/resume.pdf',
    icon: 'resume',
    external: true,
  },
];

function ContactIcon({ icon }: { icon: ContactLink['icon'] }) {
  if (icon === 'email') return <Mail aria-hidden="true" />;
  if (icon === 'resume') return <FileText aria-hidden="true" />;

  if (icon === 'github') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    if (!headline) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) headline.classList.add(styles.headlineVisible);
      },
      { threshold: 0.3 }
    );

    observer.observe(headline);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={`${styles.particle} ${styles.particleOne}`} />
        <span className={`${styles.particle} ${styles.particleTwo}`} />
        <span className={`${styles.particle} ${styles.particleThree}`} />
        <span className={`${styles.particle} ${styles.particleFour}`} />
        <span className={`${styles.particle} ${styles.particleFive}`} />
        <span className={`${styles.particle} ${styles.particleSix}`} />
        <span className={`${styles.particle} ${styles.particleSeven}`} />
        <span className={`${styles.particle} ${styles.particleEight}`} />
      </div>

      <div className={styles.inner}>
        <header className={styles.intro}>
          <span className="eyebrow">— 09 / CONTACT</span>

          <h2 id="contact-title" ref={headlineRef} className={styles.headline}>
            <span>Let&apos;s build</span>
            <span><em className={styles.accent}>something.</em></span>
          </h2>

          <p className={styles.availability}>
            Open to AI &amp; Backend Engineering opportunities.
          </p>
          <p className={styles.location}>India · Open to relocate to Delhi NCR</p>
        </header>

        <nav className={styles.linksGrid} aria-label="Contact options">
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              className={styles.contactCard}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              aria-label={`${link.label}: ${link.value}. ${link.action}`}
            >
              <span className={styles.cardTop}>
                <span className={styles.cardLabel}>{link.label}</span>
                <span className={styles.cardIcon}><ContactIcon icon={link.icon} /></span>
              </span>

              <span className={styles.cardValue}>{link.value}</span>

              <span className={styles.cardAction}>
                <span>{link.action}</span>
                <ArrowUpRight className={styles.actionArrow} aria-hidden="true" />
              </span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}
