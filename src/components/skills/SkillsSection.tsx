import Image from 'next/image';
import { SKILL_CATEGORIES } from '@/data/skills';
import styles from './SkillsSection.module.css';

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className={styles.atmosphere} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <span className="eyebrow">— 05 / TECH STACK</span>
          <h2 id="skills-title" className={styles.sectionTitle}>
            Technologies I work with
          </h2>
        </header>

        <div className={styles.categoryGrid}>
          {SKILL_CATEGORIES.map((category) => (
            <article className={styles.categoryCard} key={category.number}>
              <header className={styles.cardHeader}>
                <span className={styles.categoryNumber}>{category.number}</span>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
              </header>

              <ul className={styles.technologyList}>
                {category.technologies.map((technology) => (
                  <li className={styles.technology} key={technology.name}>
                    {technology.logo ? (
                      <Image
                        className={styles.technologyLogo}
                        src={technology.logo}
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                      />
                    ) : null}
                    <span className={styles.technologyName}>{technology.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
