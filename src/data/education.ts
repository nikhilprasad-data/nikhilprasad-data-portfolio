export interface EducationTrajectory {
  number: string;
  title: string;
  focus: string;
  supportingAreas: string;
}

export interface Education {
  id: string;
  institution: string;
  fullInstitution: string;
  logoPath?: string;
  degree: string;
  field: string;
  startYear: string;
  endYear: string;
  location: string;
  trajectory: EducationTrajectory[];
}

export const EDUCATION: Education[] = [
  {
    id: 'iitg',
    institution: 'IIT GUWAHATI',
    fullInstitution: 'Indian Institute of Technology Guwahati',
    logoPath: '/iitg-logo.svg',
    degree: 'B.Sc. (Hons.)',
    field: 'Data Science & Artificial Intelligence',
    startYear: '2025',
    endYear: '2029',
    location: 'Guwahati, Assam, India',
    trajectory: [
      {
        number: '01',
        title: 'ACADEMIC FOUNDATION',
        focus: 'Data Science & Artificial Intelligence',
        supportingAreas: 'Programming · Data Systems · Software Engineering',
      },
      {
        number: '02',
        title: 'ENGINEERING DIRECTION',
        focus: 'AI & Backend Engineering',
        supportingAreas: 'LLM Applications · Backend Systems · Applied AI',
      },
    ],
  },
];
