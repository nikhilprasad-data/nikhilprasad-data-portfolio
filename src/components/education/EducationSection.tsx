import Image from 'next/image';
import { EDUCATION } from '@/data/education';
import styles from './EducationSection.module.css';

export default function EducationSection() {
  const education = EDUCATION[0];

  return (
    <section id="education" className={styles.section} aria-labelledby="education-heading">
      <div className={styles.atmosphere} aria-hidden="true">
        <span className={`${styles.particle} ${styles.particleOne}`} />
        <span className={`${styles.particle} ${styles.particleTwo}`} />
        <span className={`${styles.particle} ${styles.particleThree}`} />
        <span className={`${styles.particle} ${styles.particleFour}`} />
        <span className={`${styles.particle} ${styles.particleFive}`} />
        <span className={`${styles.particle} ${styles.particleSix}`} />
      </div>

      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <span className="eyebrow">— 06 / EDUCATION</span>
          <h2 id="education-heading" className={styles.heading}>
            <span>Academic foundation.</span>
            <span className={styles.headingAccent}>Engineering trajectory.</span>
          </h2>
        </header>

        <article className={styles.institutionPanel} aria-labelledby="institution-name">
          <header className={styles.institutionIdentity}>
            {education.logoPath && (
              <Image
                className={styles.institutionLogo}
                src={education.logoPath}
                alt={`${education.fullInstitution} logo`}
                width={76}
                height={76}
              />
            )}
            <div className={styles.institutionNames}>
              <h3 id="institution-name" className={styles.institutionName}>
                {education.institution}
              </h3>
              <p className={styles.fullInstitution}>{education.fullInstitution}</p>
            </div>
          </header>

          <div className={styles.educationDetails}>
            <div className={styles.degreeBlock}>
              <p className={styles.degree}>{education.degree}</p>
              <p className={styles.field}>{education.field}</p>
            </div>

            <dl className={styles.metadata}>
              <div className={styles.metadataItem}>
                <dt>Period</dt>
                <dd>{education.startYear} — {education.endYear}</dd>
              </div>
              <div className={styles.metadataItem}>
                <dt>Location</dt>
                <dd>{education.location}</dd>
              </div>
            </dl>
          </div>
        </article>

        <ol className={styles.trajectory} aria-label="Academic and engineering trajectory">
          {education.trajectory.map((step) => (
            <li className={styles.trajectoryStep} key={step.number}>
              <p className={styles.stepTitle}>
                <span>{step.number}</span>
                <span aria-hidden="true"> — </span>
                {step.title}
              </p>
              <h3 className={styles.stepFocus}>{step.focus}</h3>
              <p className={styles.stepAreas}>{step.supportingAreas}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
