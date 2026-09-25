export interface Technology {
  name: string;
  logo?: string;
  description: string;
  group?: string;
}

export interface SkillCategory {
  number: string;
  title: string;
  technologies: Technology[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: '01',
    title: 'CORE PROGRAMMING',
    technologies: [
      { name: 'Python', logo: '/tech-logos/python.svg', description: 'Backend / AI/ML' },
      { name: 'C', logo: '/tech-logos/c.svg', description: 'Systems programming' },
      { name: 'SQL', description: 'Relational queries' },
    ],
  },
  {
    number: '02',
    title: 'BACKEND & FRAMEWORKS',
    technologies: [
      { name: 'FastAPI', logo: '/tech-logos/fastapi.svg', description: 'Async APIs' },
      { name: 'Flask', logo: '/tech-logos/flask.svg', description: 'Python web apps' },
      { name: 'SQLAlchemy', logo: '/tech-logos/sqlalchemy.svg', description: 'Python ORM' },
    ],
  },
  {
    number: '03',
    title: 'AI & LLM',
    technologies: [
      { name: 'LangChain', logo: '/tech-logos/langchain.svg', description: 'LLM applications' },
      { name: 'LangGraph', logo: '/tech-logos/langgraph.svg', description: 'Agent workflows' },
      { name: 'Gemini', logo: '/tech-logos/gemini.svg', description: 'Google AI models' },
      { name: 'Claude', logo: '/tech-logos/claude.svg', description: 'Anthropic AI models' },
      { name: 'OpenAI', logo: '/tech-logos/openai.svg', description: 'AI models & APIs' },
    ],
  },
  {
    number: '04',
    title: 'DATA, CLOUD & DEVELOPER TOOLS',
    technologies: [
      {
        name: 'PostgreSQL',
        logo: '/tech-logos/postgresql.svg',
        description: 'Relational database',
        group: 'DATA / INFRASTRUCTURE',
      },
      {
        name: 'Redis',
        logo: '/tech-logos/redis.svg',
        description: 'In-memory data store',
        group: 'DATA / INFRASTRUCTURE',
      },
      {
        name: 'Docker',
        logo: '/tech-logos/docker.svg',
        description: 'Containerization',
        group: 'DATA / INFRASTRUCTURE',
      },
      { name: 'Render', logo: '/tech-logos/render.svg', description: 'Cloud deployment', group: 'CLOUD' },
      { name: 'Vercel', logo: '/tech-logos/vercel.svg', description: 'Cloud deployment', group: 'CLOUD' },
      { name: 'Neon', logo: '/tech-logos/neon.svg', description: 'Serverless Postgres', group: 'CLOUD' },
      { name: 'Upstash', logo: '/tech-logos/upstash.svg', description: 'Serverless data', group: 'CLOUD' },
      { name: 'Git', logo: '/tech-logos/git.svg', description: 'Version control', group: 'DEVELOPER TOOLS' },
      { name: 'GitHub', logo: '/tech-logos/github.svg', description: 'Code hosting', group: 'DEVELOPER TOOLS' },
      { name: 'VS Code', logo: '/tech-logos/vscode.svg', description: 'Code editor', group: 'DEVELOPER TOOLS' },
      { name: 'Cursor', logo: '/tech-logos/cursor.svg', description: 'AI code editor', group: 'DEVELOPER TOOLS' },
      { name: 'Codex', logo: '/tech-logos/openai.svg', description: 'AI coding agent', group: 'DEVELOPER TOOLS' },
      { name: 'Antigravity', logo: '/tech-logos/antigravity.png', description: 'AI development', group: 'DEVELOPER TOOLS' },
    ],
  },
];
