import Image from 'next/image';
import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import styles from './ContactSection.module.css';

type ContactLink = {
  label: string;
  value: string;
  href: string;
  icon: 'email' | 'linkedin' | 'resume';
  external?: boolean;
};

const CONTACT_LINKS: ContactLink[] = [
  {
    label: 'LinkedIn',
    value: '/in/nikhilprasad-data',
    href: 'https://www.linkedin.com/in/nikhilprasad-data',
    icon: 'linkedin',
    external: true,
  },
  {
    label: 'Email',
    value: 'contact.nikhilprasad@gmail.com',
    href: 'mailto:contact.nikhilprasad@gmail.com',
    icon: 'email',
  },
  {
    label: 'Resume',
    value: 'View / Download',
    href: '/resume.pdf',
    icon: 'resume',
  },
];

function ContactIcon({ icon }: { icon: ContactLink['icon'] }) {
  if (icon === 'email') return <Mail aria-hidden="true" />;
  if (icon === 'resume') return <FileText aria-hidden="true" />;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={`${styles.particle} ${styles.particleOne}`} />
        <span className={`${styles.particle} ${styles.particleTwo}`} />
        <span className={`${styles.particle} ${styles.particleThree}`} />
        <span className={`${styles.particle} ${styles.particleFour}`} />
        <span className={`${styles.particle} ${styles.particleFive}`} />
        <span className={`${styles.particle} ${styles.particleSix}`} />
      </div>

      <div className={styles.inner}>
        <header className={styles.intro}>
          <h2 id="contact-title" className={styles.headline}>
            Let&apos;s build <span>something.</span>
          </h2>

          <p className={styles.availability}>
            Open to AI &amp; Backend Engineering opportunities.
          </p>
          <p className={styles.location}>India · Open to relocate to Delhi NCR</p>
        </header>

        <div className={styles.content}>
          <a
            className={styles.githubVisual}
            href="https://github.com/nikhilprasad-data"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Nikhil Prasad's GitHub profile"
          >
            <span className={styles.visualGlow} aria-hidden="true" />
            <Image
              className={styles.visualImage}
              src="/contact/github-contact-visual.png"
              alt="GitHub at the center of an orbital composition of development and AI tools"
              width={1672}
              height={941}
              sizes="(max-width: 680px) 100vw, (max-width: 1050px) 48vw, 560px"
              priority
            />
            <span className={styles.githubCta}>
              <span className={styles.githubBrand}>
                <span className={styles.githubIcon} aria-hidden="true">
                  <Image src="/tech-logos/github.svg" alt="" width={22} height={22} />
                </span>
                <span>GitHub</span>
              </span>
              <ArrowUpRight className={styles.githubArrow} aria-hidden="true" />
            </span>
          </a>

          <nav className={styles.linksStack} aria-label="Contact options">
            {CONTACT_LINKS.map((link) => (
              <a
                key={link.label}
                className={styles.contactCard}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
                aria-label={`${link.label}: ${link.value}`}
              >
                <span className={styles.cardIcon}>
                  <ContactIcon icon={link.icon} />
                </span>
                <span className={styles.cardCopy}>
                  <span className={styles.cardLabel}>{link.label}</span>
                  <span className={styles.cardValue}>{link.value}</span>
                </span>
                <ArrowUpRight className={styles.actionArrow} aria-hidden="true" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
