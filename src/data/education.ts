// src/data/education.ts

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  location: string;
  gpa?: string;
  highlights: string[];
}

export const EDUCATION: Education[] = [
  {
    id: 'iitg',
    institution: 'IIT Guwahati',
    degree: 'B.Sc. (Hons.)',
    field: 'Data Science & Artificial Intelligence',
    startYear: '2025',
    endYear: '2029',
    location: 'Guwahati, Assam, India',
    highlights: [
      'Placeholder highlight — will be updated',
      'Placeholder highlight — will be updated',
      'Placeholder highlight — will be updated',
    ],
  },
];
