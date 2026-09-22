// src/components/footer/Footer.tsx
import styles from './Footer.module.css';

const YEAR = new Date().getFullYear();

const FOOTER_LINKS = [
  { label: 'GitHub', href: 'https://github.com/placeholder' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/placeholder' },
  { label: 'Email', href: 'mailto:hello@placeholder.dev' },
  { label: 'Résumé', href: '/resume-placeholder.pdf' },
];

export default function Footer() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.name}>Dev Portfolio</span>
          <span className={styles.copy}>© {YEAR} — All rights reserved</span>
        </div>

        <nav className={styles.links} aria-label="Footer navigation">
          {FOOTER_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={styles.link}
              target={link.href.startsWith('mailto') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.right}>
          <span className={styles.badge}>
            <span className={styles.badgeDot} aria-hidden="true" />
            Built with Next.js
          </span>
        </div>
      </div>

      <div className={styles.topLine} aria-hidden="true" />
    </footer>
  );
}
