export type Language = 'pt' | 'en';

export interface OpenSourceFeature {
  title: string;
  description: string;
  docLink: string;
}

export interface OpenSourceData {
  name: string;
  version: string;
  tagline: string;
  description: string;
  features: OpenSourceFeature[];
  demo: {
    title: string;
    description: string;
    tags: string[];
    media: { src: string; caption: string }[];
  };
  github: string;
  pypi: string;
  tags: string[];
  stats: { label: string; value: string }[];
}

export interface Content {
  nav: {
    about: string;
    research: string;
    experience: string;
    projects: string;
    opensource: string;
    education: string;
    contact: string;
  };
  opensource: {
    title: string;
    subtitle: string;
  };
  hero: {
    greeting: string;
    name: string;
    title: string;
    description: string;
    btnPrimary: string;
    btnOutline: string;
    availability: string;
  };
  about: {
    title: string;
    description: string[];
    industryLabel: string;
    academiaLabel: string;
  };
  research: {
    title: string;
    subtitle: string;
  };
  experience: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewAll: string;
  };
  education: {
    title: string;
  };
  certifications: {
    title: string;
  };
  contact: {
    title: string;
    subtitle: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    btnSend: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: {
    rights: string;
    builtWith: string;
  };
}

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  category: 'backend' | 'ai' | 'research' | 'embedded';
}

export interface ExperienceData {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'industry' | 'research' | 'volunteer';
  tags: string[];
}

export interface PublicationData {
  title: string;
  venue: string;
  date: string;
  description: string;
  link?: string;
  authors?: string;
}

export interface EducationData {
  title: string;
  institution: string;
  period: string;
  description: string;
  logo: string;
  logoScale?: number;
}

export interface CertificationData {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
  skills: string[];
}

export interface ResearchData {
  title: string;
  institution: string;
  period: string;
  description: string;
  tags: string[];
  link?: string;
  status: 'ongoing' | 'completed';
}
