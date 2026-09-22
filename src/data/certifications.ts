// src/data/certifications.ts

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  url?: string;
  logo?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-01',
    title: 'Certification Title Placeholder',
    issuer: 'Issuing Organization',
    date: '2025',
    credentialId: 'CREDENTIAL-ID-PLACEHOLDER',
    url: '#',
  },
  {
    id: 'cert-02',
    title: 'Certification Title Placeholder',
    issuer: 'Issuing Organization',
    date: '2024',
    credentialId: 'CREDENTIAL-ID-PLACEHOLDER',
    url: '#',
  },
  {
    id: 'cert-03',
    title: 'Certification Title Placeholder',
    issuer: 'Issuing Organization',
    date: '2024',
    credentialId: 'CREDENTIAL-ID-PLACEHOLDER',
    url: '#',
  },
  {
    id: 'cert-04',
    title: 'Certification Title Placeholder',
    issuer: 'Issuing Organization',
    date: '2024',
    credentialId: 'CREDENTIAL-ID-PLACEHOLDER',
    url: '#',
  },
];
