// src/data/projects.ts

export interface Project {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  technologies: string[];
  github: string;
  live: string;
  visualType: 'pii' | 'commit' | 'vizosyn' | 'trade' | 'multiagent';
  accentColor: string;
  category: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'pii-compliance-gateway',
    number: '01',
    title: 'PII Compliance Gateway',
    shortTitle: 'PII Gateway',
    description:
      'Automated pipeline that detects, classifies, and redacts personally identifiable information from unstructured data streams in real time.',
    longDescription:
      'A high-throughput compliance engine built with FastAPI and LangChain. Ingests raw documents, runs multi-stage NLP detection, applies field-level redaction policies, and emits audit-ready protected output — all at sub-200ms p99 latency.',
    technologies: ['Python', 'FastAPI', 'LangChain', 'PostgreSQL', 'Docker', 'Redis'],
    github: 'https://github.com/placeholder/pii-gateway',
    live: '',
    visualType: 'pii',
    accentColor: '#3dffa0',
    category: 'Backend · AI · Compliance',
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
    title: 'VizoSyn',
    shortTitle: 'VizoSyn',
    description:
      'Skill-based developer matchmaking platform that visualizes professional networks and surfaces compatible collaborators through graph analysis.',
    longDescription:
      'A full-stack graph application backed by PostgreSQL and a custom graph traversal engine. Profiles are skill-node vectors; the matching algorithm finds structural similarity across the collaboration graph and ranks potential collaborators by compatibility score.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Graph DB', 'React', 'Docker'],
    github: 'https://github.com/placeholder/vizosyn',
    live: '',
    visualType: 'vizosyn',
    accentColor: '#3dffa0',
    category: 'Full Stack · Graph · Social',
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
