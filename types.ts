export type Language = 'pt' | 'en';

export interface Content {
  nav: {
    about: string;
    research: string;
    experience: string;
    projects: string;
    education: string;
    contact: string;
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
  type: 'industry' | 'research';
  tags: string[];
}

export interface EducationData {
  title: string;
  institution: string;
  period: string;
  description: string;
  logo: string;
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
