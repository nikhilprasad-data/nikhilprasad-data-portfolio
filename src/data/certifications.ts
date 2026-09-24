export interface Certification {
  id: string;
  organization: string;
  title: string;
  date?: string;
  credential?: string;
  image: string;
  learned: string[];
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'bcgx',
    organization: 'BCGX',
    title: 'GenAI Job Simulation',
    date: 'September 24, 2026',
    credential: 'User verification code: 6aa73dfc2e1d09f9fd1cd',
    image: '/certificates/BCGX-Certificate.png',
    learned: [
      'Data extraction and initial analysis',
      'Developing an AI-powered financial chatbot',
    ],
  },
  {
    id: 'deloitte-technology-simulation',
    organization: 'DELOITTE / FORAGE',
    title: 'Deloitte Australia Technology Job Simulation',
    date: 'September 17, 2026',
    credential: 'User verification code: 6aa73dfc2e1d09f9fd1cd',
    image: '/certificates/Deloitte-Certificate.png',
    learned: [
      'Completed practical coding and development tasks',
    ],
  },
];
