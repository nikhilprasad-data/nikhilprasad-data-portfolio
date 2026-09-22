// src/components/github/GitHubSection.tsx
'use client';

import styles from './GitHubSection.module.css';

// Placeholder repo entries
const REPOS = [
  {
    name: 'pii-compliance-gateway',
    desc: 'Real-time PII detection, classification and redaction pipeline',
    lang: 'Python',
    topics: ['fastapi', 'langchain', 'nlp'],
  },
  {
    name: 'commit-message-validator',
    desc: 'NLP-powered CI tool for semantic commit quality analysis',
    lang: 'Python',
    topics: ['transformers', 'github-actions', 'devtools'],
  },
  {
    name: 'vizosyn',
    desc: 'Skill-graph matchmaking platform for developer collaboration',
    lang: 'Python',
    topics: ['graph', 'fastapi', 'postgresql'],
  },
  {
    name: 'trade-validator',
    desc: 'Real-time trading signal validation and risk policy engine',
    lang: 'Python',
    topics: ['websocket', 'redis', 'fintech'],
  },
];

// Contribution grid placeholder — purely decorative pattern
function ContribGrid() {
  const weeks = 52;
  const days = 7;
  const cells = Array.from({ length: weeks * days }, (_, i) => {
    const r = Math.random();
    return r < 0.55 ? 0 : r < 0.75 ? 1 : r < 0.9 ? 2 : 3;
  });

  return (
    <div className={styles.contribGrid} role="img" aria-label="GitHub contribution activity placeholder">
      {cells.map((level, i) => (
        <div
          key={i}
          className={styles.contribCell}
          data-level={level}
        />
      ))}
    </div>
  );
}

export default function GitHubSection() {
  return (
    <section
      id="github"
      className={styles.section}
      aria-label="GitHub — Proof of Work"
    >
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <span className="eyebrow">— 08 / Proof of Work</span>
          <a
            href="https://github.com/placeholder"
            className={styles.githubHandle}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit GitHub profile"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            @github-handle
          </a>
        </div>

        <div className={styles.content}>
          <div className={styles.left}>
            <h2 className={styles.headline}>
              Real code.
              <br />
              <em className={styles.accent}>Real commits.</em>
            </h2>
            <p className={styles.sub}>
              Every project is backed by a public or private repository.
              The contribution graph below is a placeholder — replace with
              the live GitHub chart after deployment.
            </p>

            {/* Contribution grid */}
            <div className={styles.contribWrapper}>
              <ContribGrid />
              <p className={styles.contribNote}>
                * Contribution activity — placeholder pattern. Real data on GitHub profile.
              </p>
            </div>
          </div>

          {/* Repo list */}
          <div className={styles.repoList} role="list" aria-label="Featured repositories">
            {REPOS.map((repo) => (
              <a
                key={repo.name}
                href={`https://github.com/placeholder/${repo.name}`}
                className={styles.repoCard}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                aria-label={`Repository: ${repo.name}`}
              >
                <div className={styles.repoHeader}>
                  <span className={styles.repoName}>{repo.name}</span>
                  <svg className={styles.repoArrow} width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 10L10 2M10 2H4M10 2v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className={styles.repoDesc}>{repo.desc}</p>
                <div className={styles.repoMeta}>
                  <span className={styles.repoLang}>
                    <span className={styles.langDot} aria-hidden="true" />
                    {repo.lang}
                  </span>
                  {repo.topics.map((t) => (
                    <span key={t} className={styles.repoTopic}>{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.bgLines} aria-hidden="true" />
    </section>
  );
}
