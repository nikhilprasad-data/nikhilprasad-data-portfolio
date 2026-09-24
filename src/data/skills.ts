export interface Technology {
  name: string;
  logo?: string;
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
      { name: 'Python', logo: '/tech-logos/python.svg' },
      { name: 'C', logo: '/tech-logos/c.svg' },
      { name: 'SQL' },
    ],
  },
  {
    number: '02',
    title: 'AI & LLM',
    technologies: [
      { name: 'LangChain', logo: '/tech-logos/langchain.svg' },
      { name: 'LangGraph', logo: '/tech-logos/langgraph.svg' },
      { name: 'Gemini', logo: '/tech-logos/gemini.svg' },
      { name: 'Claude', logo: '/tech-logos/claude.svg' },
      { name: 'OpenAI', logo: '/tech-logos/openai.svg' },
    ],
  },
  {
    number: '03',
    title: 'FRAMEWORKS & BACKEND',
    technologies: [
      { name: 'FastAPI', logo: '/tech-logos/fastapi.svg' },
      { name: 'Flask', logo: '/tech-logos/flask.svg' },
      { name: 'SQLAlchemy', logo: '/tech-logos/sqlalchemy.svg' },
    ],
  },
  {
    number: '04',
    title: 'DATABASE, CLOUD & DEVELOPER TOOLS',
    technologies: [
      { name: 'PostgreSQL', logo: '/tech-logos/postgresql.svg' },
      { name: 'Redis', logo: '/tech-logos/redis.svg' },
      { name: 'Docker', logo: '/tech-logos/docker.svg' },
      { name: 'Render', logo: '/tech-logos/render.svg' },
      { name: 'Vercel', logo: '/tech-logos/vercel.svg' },
      { name: 'Neon', logo: '/tech-logos/neon.svg' },
      { name: 'Upstash', logo: '/tech-logos/upstash.svg' },
      { name: 'Git', logo: '/tech-logos/git.svg' },
      { name: 'GitHub', logo: '/tech-logos/github.svg' },
      { name: 'Cursor', logo: '/tech-logos/cursor.svg' },
      { name: 'Codex' },
      { name: 'Antigravity', logo: '/tech-logos/antigravity.png' },
      { name: 'VS Code', logo: '/tech-logos/vscode.svg' },
    ],
  },
];
