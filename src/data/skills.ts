// src/data/skills.ts

export interface Skill {
  name: string;
  category: 'lang' | 'framework' | 'infra' | 'tool' | 'ai';
  level: number; // 1–3 (ring assignment)
}

export const SKILLS: Skill[] = [
  // Core — ring 1 (inner)
  { name: 'Python', category: 'lang', level: 1 },
  { name: 'FastAPI', category: 'framework', level: 1 },
  { name: 'LangChain', category: 'ai', level: 1 },
  { name: 'PostgreSQL', category: 'infra', level: 1 },

  // Mid — ring 2
  { name: 'LangGraph', category: 'ai', level: 2 },
  { name: 'Redis', category: 'infra', level: 2 },
  { name: 'Docker', category: 'infra', level: 2 },
  { name: 'Git', category: 'tool', level: 2 },
  { name: 'SQL', category: 'lang', level: 2 },
  { name: 'pgvector', category: 'infra', level: 2 },

  // Outer — ring 3
  { name: 'GitHub Actions', category: 'tool', level: 3 },
  { name: 'TypeScript', category: 'lang', level: 3 },
  { name: 'React', category: 'framework', level: 3 },
  { name: 'Next.js', category: 'framework', level: 3 },
  { name: 'Linux', category: 'infra', level: 3 },
  { name: 'REST APIs', category: 'framework', level: 3 },
];
