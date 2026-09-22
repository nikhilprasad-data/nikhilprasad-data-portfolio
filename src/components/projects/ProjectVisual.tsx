// src/components/projects/ProjectVisual.tsx
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import type { Project } from '@/data/projects';

// Lazy-load each visual so inactive ones don't pre-render
const visuals = {
  pii:        dynamic(() => import('./visuals/PiiGatewayVisual'),      { ssr: false }),
  commit:     dynamic(() => import('./visuals/CommitValidatorVisual'), { ssr: false }),
  vizosyn:    dynamic(() => import('./visuals/VizoSynVisual'),         { ssr: false }),
  trade:      dynamic(() => import('./visuals/TradeValidatorVisual'),  { ssr: false }),
  multiagent: dynamic(() => import('./visuals/MultiAgentVisual'),      { ssr: false }),
};

interface Props {
  project: Project;
  isActive: boolean;
}

export default function ProjectVisual({ project, isActive }: Props) {
  const Visual = visuals[project.visualType];

  return (
    <Suspense fallback={null}>
      <Visual isActive={isActive} />
    </Suspense>
  );
}
