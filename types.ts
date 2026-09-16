export type Language = 'pt' | 'en';

export interface FocusPillar {
  k: string;
  t: string;
  d: string;
  tags: string[];
}

export interface OpenSourceData {
  name: string;
  version: string;
  license: string;
  tagline: string;
  description: string;
  tags: string[];
  stats: { label: string; value: string }[];
  demo: {
    title: string;
    description: string;
    media: { src: string; caption: string }[];
  };
  github: string;
  pypi: string;
}

export interface Content {
  nav: {
    about: string;
    focus: string;
    experience: string;
    projects: string;
    opensource: string;
    research: string;
    education: string;
    contact: string;
  };
  hero: {
    kicker: string;
    name: string;
    role: string;
    lede: string;
    ctaPrimary: string;
    ctaSecondary: string;
    location: string;
  };
  about: {
    title: string;
    lede: string;
    paras: string[];
  };
  focus: {
    title: string;
    subtitle: string;
    pillars: FocusPillar[];
  };
  research: {
    title: string;
    subtitle: string;
    publications: string;
  };
  experience: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
    viewAll: string;
    labels: { problem: string; solution: string; impact: string };
  };
  opensource: {
    title: string;
    subtitle: string;
  };
  education: {
    title: string;
    certifications: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: {
    rights: string;
    built: string;
  };
  status: {
    ongoing: string;
  };
}

export interface ProjectData {
  id?: string;
  title: string;
  year: string;
  category: string;
  featured?: boolean;
  status?: string;
  image?: string;
  metrics?: { label: string; value: string }[];
  problem: string;
  solution: string;
  impact: string;
  tags: string[];
  link: string;
  github?: string;
}

export interface ExperienceData {
  title: string;
  company: string;
  period: string;
  description: string;
  type: 'industry' | 'research' | 'volunteer';
  current?: boolean;
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
  id?: string;
  title: string;
  institution: string;
  period: string;
  description: string;
}

export interface CertificationData {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  category?: 'ai' | 'cloud' | 'embedded' | 'backend' | 'dev';
}

export interface ResearchData {
  id?: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  tags: string[];
  ongoing: boolean;
}
