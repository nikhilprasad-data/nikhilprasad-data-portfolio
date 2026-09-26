// src/data/projects.ts

export interface Project {
  id: string;
  number: string;
  featured?: boolean;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github: string;
  live: string;
  visualType: 'pii' | 'commit' | 'vizosyn' | 'trade' | 'multiagent';
  thumbnail?: string;
  thumbnailAlt?: string;
  accentColor: string;
  category: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'pii-compliance-gateway',
    number: '01',
    featured: true,
    title: 'PII Compliance Gateway',
    shortTitle: 'PII Gateway',
    description:
      'A FastAPI gateway that detects and redacts sensitive data before it reaches logs or downstream systems.',
    longDescription:
      'A FastAPI gateway uses a LangGraph workflow to identify sensitive values before Python applies redactions. Identical inputs are cached in Redis, while PostgreSQL stores sanitized audit metadata without retaining raw input.',
    technologies: ['Python', 'FastAPI', 'LangGraph', 'Gemini', 'Redis', 'PostgreSQL'],
    github: 'https://github.com/nikhilprasad-data/pii-compliance-gateway-api',
    live: 'https://pii-compliance-gateway-client.vercel.app/',
    visualType: 'pii',
    thumbnail: '/projects/pii-compliance-gateway_thumbnail.png',
    thumbnailAlt: 'PII Compliance Gateway interface showing sensitive data detection and redaction.',
    accentColor: '#3dffa0',
    category: 'AI · Backend · Data Privacy',
  },
  {
    id: 'commit-message-validator',
    number: '02',
    title: 'Commit Message Validator',
    shortTitle: 'Commit Validator',
    description:
      'NLP-powered CI tool that classifies commit messages for convention compliance, toxicity, and semantic quality at every push.',
    longDescription:
      'Integrates as a GitHub Action and pre-commit hook. Uses a fine-tuned transformer to classify messages against Conventional Commits, flag low-quality signals, and block merges that fail policy — with actionable suggestions fed back to the developer.',
    technologies: ['Python', 'Transformers', 'FastAPI', 'GitHub Actions', 'Docker'],
    github: 'https://github.com/placeholder/commit-validator',
    live: '',
    visualType: 'commit',
    accentColor: '#3dffa0',
    category: 'ML · DevTools · NLP',
  },
  {
    id: 'vizosyn',
    number: '03',
    featured: true,
    title: 'VizoSyn',
    shortTitle: 'VizoSyn',
    description:
      'Helps hackathon participants find teammates with complementary skills and project interests under tight deadlines.',
    longDescription:
      'A developer matchmaking platform built with FastAPI and PostgreSQL. JWT-protected profiles and team dashboards use relational constraints to handle duplicate requests and conflicting team membership actions.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'SQLAlchemy', 'JWT', 'React'],
    github: 'https://github.com/nikhilprasad-data/vizosyn_backend',
    live: 'https://vizosyn-frontend.vercel.app/',
    visualType: 'vizosyn',
    thumbnail: '/projects/vizosyn_thumbnail.png',
    thumbnailAlt: 'VizoSyn interface showing developer profiles and team matching screens.',
    accentColor: '#3dffa0',
    category: 'Backend · Full Stack · Collaboration',
  },
  {
    id: 'trade-validator',
    number: '04',
    title: 'Trade Validator',
    shortTitle: 'Trade Validator',
    description:
      'Real-time trading signal validation engine that cross-references technical indicators against configurable risk policies before order execution.',
    longDescription:
      'Ingests OHLCV market data via WebSocket, computes a set of technical indicators in parallel, and runs each computed signal through a rules engine that enforces position-size limits, drawdown constraints, and signal confidence thresholds — rejecting non-conformant orders before they reach the broker.',
    technologies: ['Python', 'FastAPI', 'Redis', 'WebSocket', 'PostgreSQL', 'Docker'],
    github: 'https://github.com/placeholder/trade-validator',
    live: '',
    visualType: 'trade',
    accentColor: '#3dffa0',
    category: 'Backend · FinTech · Real-time',
  },
  {
    id: 'multi-agent-rag',
    number: '05',
    title: 'Multi-Agent RAG System',
    shortTitle: 'Multi-Agent RAG',
    description:
      'Orchestrated multi-agent retrieval-augmented generation framework where specialized agents collaborate to answer complex domain queries.',
    longDescription:
      'Built on LangGraph, the system routes user queries through a planner agent that delegates to domain-specific retrieval agents. Each agent pulls from a dedicated vector store, synthesizes context, and passes structured evidence to a synthesis agent — producing traceable, citation-backed answers.',
    technologies: ['Python', 'LangGraph', 'LangChain', 'FastAPI', 'PostgreSQL', 'pgvector'],
    github: 'https://github.com/placeholder/multi-agent-rag',
    live: '',
    visualType: 'multiagent',
    accentColor: '#3dffa0',
    category: 'AI · LLM · Agents',
  },
];
