import Image from 'next/image';
import type { Project } from '@/data/projects';
import ProjectDetails from './ProjectDetails';
import ProjectParticles from './ProjectParticles';
import ProjectCardInteraction from './ProjectCardInteraction';
import styles from './ProjectShowcase.module.css';

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <ProjectCardInteraction className={styles.cardInteraction}>
      <article className={styles.projectCard}>
        <div className={styles.visualViewport}>
          <div className={styles.thumbnailFrame}>
            {project.thumbnail ? (
              <Image
                className={styles.thumbnail}
                src={project.thumbnail}
                alt={project.thumbnailAlt ?? `${project.title} project thumbnail`}
                fill
                sizes="(max-width: 860px) calc(100vw - 32px), (max-width: 1400px) 50vw, 660px"
                style={{ objectFit: 'contain', objectPosition: 'center' }}
              />
            ) : null}
          </div>
          <ProjectParticles kind={project.visualType === 'pii' ? 'pii' : 'teams'} />
        </div>

        <div className={styles.cardContent}>
          <ProjectDetails project={project} />
        </div>
      </article>
    </ProjectCardInteraction>
  );
}
