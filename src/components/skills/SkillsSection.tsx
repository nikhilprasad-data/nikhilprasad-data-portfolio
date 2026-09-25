import Image from 'next/image';
import { SKILL_CATEGORIES, type Technology } from '@/data/skills';
import styles from './SkillsSection.module.css';

function groupTechnologies(technologies: Technology[]) {
  const groups = new Map<string, Technology[]>();

  technologies.forEach((technology) => {
    const groupName = technology.group ?? 'TECHNOLOGIES';
    const group = groups.get(groupName) ?? [];
    group.push(technology);
    groups.set(groupName, group);
  });

  return Array.from(groups.entries());
}

function TechnologyList({ technologies, isToolsGroup = false }: {
  technologies: Technology[];
  isToolsGroup?: boolean;
}) {
  return (
    <ul className={styles.technologyList} data-group={isToolsGroup ? 'tools' : undefined}>
      {technologies.map((technology) => (
        <li
          className={`${styles.technology} ${technology.logo ? '' : styles.withoutLogo}`}
          key={technology.name}
        >
          {technology.logo ? (
            <span className={styles.logoFrame} aria-hidden="true">
              <Image
                className={styles.technologyLogo}
                src={technology.logo}
                alt=""
                width={24}
                height={24}
              />
            </span>
          ) : null}
          <span className={styles.technologyCopy}>
            <span className={styles.technologyName}>{technology.name}</span>
            <span className={styles.technologyDescription}>{technology.description}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className={styles.atmosphere} aria-hidden="true" />

      <div className={styles.inner}>
        <header className={styles.sectionHeader}>
          <span className={styles.eyebrow}>05 / TECH STACK</span>
          <h2 id="skills-title" className={styles.sectionTitle}>
            Technologies I work with
          </h2>
        </header>

        <div className={styles.categoryGrid}>
          {SKILL_CATEGORIES.map((category) => (
            <article
              className={styles.categoryCard}
              data-category={category.number}
              key={category.number}
            >
              <header className={styles.cardHeader}>
                <span className={styles.categoryNumber} aria-hidden="true">
                  {category.number}
                </span>
                <div className={styles.categoryIdentity}>
                  <span className={styles.categoryLabel}>DISCIPLINE</span>
                  <h3 className={styles.categoryTitle}>{category.title}</h3>
                </div>
                <span className={styles.categoryMarker} aria-hidden="true" />
              </header>

              {category.number === '04' ? (
                <div className={styles.technologyGroups}>
                  {groupTechnologies(category.technologies).map(([groupName, technologies]) => (
                    <section className={styles.technologyGroup} key={groupName}>
                      <h4 className={styles.groupTitle}>{groupName}</h4>
                      <TechnologyList
                        technologies={technologies}
                        isToolsGroup={groupName === 'DEVELOPER TOOLS'}
                      />
                    </section>
                  ))}
                </div>
              ) : (
                <TechnologyList technologies={category.technologies} />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
