export type Language = 'pt' | 'en';

export interface Content {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    experience: string;
    education: string;
    contact: string;
  };
  hero: {
    badge: string;
    description: string;
    btnPrimary: string;
    btnOutline: string;
    typed: string[];
  };
  about: {
    title: string;
    subtitle: string;
    description: string;
  };
  skills: {
    title: string;
    subtitle: string;
  };
  projects: {
    title: string;
    subtitle: string;
  };
  experience: {
    title: string;
    subtitle: string;
  };
  education: {
    title: string;
    subtitle: string;
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
  };
}

export interface ProjectData {
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
}

export interface ExperienceData {
  title: string;
  company: string;
  period: string;
  description: string;
  icon: 'work' | 'research';
}

export interface EducationData {
  title: string;
  institution: string;
  period: string;
  description: string;
  logo: string;
}