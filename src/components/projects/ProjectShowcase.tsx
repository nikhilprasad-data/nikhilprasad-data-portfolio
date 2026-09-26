import { PROJECTS } from '@/data/projects';
import ProjectCard from './ProjectCard';
import styles from './ProjectShowcase.module.css';

const FEATURED_PROJECTS = PROJECTS.filter((project) => project.featured);

export default function ProjectShowcase() {
  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <header className={styles.sectionHeader}>
        <div>
          <h2 id="projects-title" className={styles.sectionTitle}>Selected work</h2>
        </div>
        <div className={styles.headerLine} aria-hidden="true" />
        <a className={styles.moreWork} href="https://github.com/nikhilprasad-data" target="_blank" rel="noopener noreferrer">
          More work on GitHub
          <svg className={styles.ctaArrow} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3.5 8h9m0 0L8.5 4m4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </header>

      <div className={styles.projectGrid}>
        {FEATURED_PROJECTS.map((project) => <ProjectCard key={project.id} project={project} />)}
      </div>
    </section>
  );
}
