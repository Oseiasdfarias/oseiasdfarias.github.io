import { Content, ProjectData, ExperienceData, EducationData, CertificationData, Language } from './types';

export const translations: Record<Language, Content> = {
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      skills: "Habilidades",
      projects: "Projetos",
      experience: "Experiência",
      education: "Formação",
      contact: "Contato",
    },
    hero: {
      badge: "Engenheiro de Software & Pesquisador de IA",
      description: "Especialista em Backend e IA, unindo rigor acadêmico com soluções industriais escaláveis. Foco em Sistemas Embarcados, Antifragilidade e Deep Learning.",
      btnPrimary: "Ver Projetos",
      btnOutline: "Baixar Currículo",
      typed: ["Engenharia de Software", "Inteligência Artificial", "Sistemas Embarcados", "Pesquisa & Inovação"],
    },
    about: {
      title: "Bio Profissional",
      subtitle: "Minha Jornada",
      description: "Sou Trainee em IA na Lunella e Pesquisador de Mestrado com dupla titulação (UFABC/UFPA). Tenho paixão por resolver problemas complexos usando tecnologias de ponta como Java, Python, AWS e Machine Learning. Minha carreira combina desenvolvimento prático de sistemas robustos com pesquisa avançada em antifragilidade e controle inteligente.",
    },
    skills: {
      title: "Expertise Técnica",
      subtitle: "Stack & Ferramentas",
    },
    projects: {
      title: "Portfólio de Projetos",
      subtitle: "Soluções Desenvolvidas",
    },
    experience: {
      title: "Trajetória Profissional",
      subtitle: "Experiência de Mercado e Pesquisa",
    },
    education: {
      title: "Formação Acadêmica",
      subtitle: "Base Teórica e Certificações",
    },
    certifications: {
      title: "Licenças & Certificados",
      subtitle: "Aprendizado Contínuo",
    },
    contact: {
      title: "Vamos Trabalhar Juntos",
      subtitle: "Estou aberto a novas oportunidades e colaborações.",
      formName: "Nome",
      formEmail: "Email",
      formMessage: "Mensagem",
      btnSend: "Enviar",
      sending: "Enviando...",
      success: "Recebido! Entrarei em contato em breve.",
      error: "Ocorreu um erro. Tente novamente.",
    },
    footer: {
      rights: "© 2026 Oséias Farias. Inovação e Tecnologia.",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      education: "Education",
      contact: "Contact",
    },
    hero: {
      badge: "Software Engineer & AI Researcher",
      description: "Backend & AI Specialist merging academic rigor with scalable industrial solutions. Focused on Embedded Systems, Antifragility, and Deep Learning.",
      btnPrimary: "View Projects",
      btnOutline: "Download CV",
      typed: ["Software Engineering", "Artificial Intelligence", "Embedded Systems", "R&D"],
    },
    about: {
      title: "Professional Bio",
      subtitle: "My Journey",
      description: "I am an AI Trainee at Lunella and a Dual Master's Researcher (UFABC/UFPA). I am passionate about solving complex problems using cutting-edge technologies like Java, Python, AWS, and Machine Learning. My career blends practical robust system development with advanced research in antifragility and intelligent control.",
    },
    skills: {
      title: "Technical Expertise",
      subtitle: "Stack & Tools",
    },
    projects: {
      title: "Project Portfolio",
      subtitle: "Developed Solutions",
    },
    experience: {
      title: "Career Trajectory",
      subtitle: "Market & Research Experience",
    },
    education: {
      title: "Academic Background",
      subtitle: "Education & Certifications",
    },
    certifications: {
      title: "Licenses & Certifications",
      subtitle: "Continuous Learning",
    },
    contact: {
      title: "Let's Work Together",
      subtitle: "Open to new opportunities and collaborations.",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      btnSend: "Send",
      sending: "Sending...",
      success: "Received! I'll get back to you soon.",
      error: "Something went wrong. Please try again.",
    },
    footer: {
      rights: "© 2026 Oséias Farias. Innovation & Technology.",
    },
  },
};

export const getProjects = (lang: Language): ProjectData[] => [
  {
    title: "Lunella AI Platform",
    description: lang === 'pt' 
      ? "Plataforma de automação de atendimento ao cliente com IA. Backend em Python/Java (Quarkus) e AWS."
      : "AI customer service automation platform. Backend in Python/Java (Quarkus) and AWS.",
    tags: ["Java", "Quarkus", "Python", "AWS Lambda", "Vue.js", "DynamoDB"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
    link: ""
  },
  {
    title: "Artificial Antifragility System",
    description: lang === 'pt'
      ? "Sistema de controle antifrágil com FPGA/FPAA e agentes de IA em Java/Matlab."
      : "Antifragile control system with FPGA/FPAA and AI agents in Java/Matlab.",
    tags: ["FPAA", "FPGA", "Java", "Matlab", "HIL", "Control Systems"],
    image: "https://onekeyresources.milwaukeetool.com/hubfs/undefined-4.jpeg",
    link: ""
  },
  {
    title: "API Fórum Hub",
    description: lang === 'pt' 
      ? "API REST completa com Spring Boot, JWT, Flyway e MySQL."
      : "Complete REST API with Spring Boot, JWT, Flyway, and MySQL.",
    tags: ["Java", "Spring Boot", "Spring Security", "MySQL"],
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
    link: "https://github.com/Oseiasdfarias/forum_hub_challenge"
  },
  {
    title: "Full FastAPI REST",
    description: lang === 'pt'
      ? "Sistema moderno com FastAPI, SQLAlchemy, Pytest e CI/CD."
      : "Modern system with FastAPI, SQLAlchemy, Pytest, and CI/CD.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "Pytest"],
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
    link: "https://github.com/Oseiasdfarias/full_fast_api"
  },
   {
    title: "Catálogo Literalura",
    description: lang === 'pt' 
      ? "Integração API Gutendex com Spring Data JPA e PostgreSQL." 
      : "Gutendex API integration with Spring Data JPA and PostgreSQL.",
    tags: ["Java", "Spring Data JPA", "PostgreSQL"],
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    link: "https://github.com/Oseiasdfarias/literalura"
  },
  {
    title: "AWS Serverless App",
    description: lang === 'pt'
      ? "Arquitetura escalável com AWS Lambda, API Gateway e DynamoDB."
      : "Scalable architecture with AWS Lambda, API Gateway, and DynamoDB.",
    tags: ["Python", "AWS Lambda", "Serverless", "DynamoDB"],
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
    link: "https://github.com/Oseiasdfarias/AWS_lambda_com_python_e_serverless_framework"
  }
];

export const getExperience = (lang: Language): ExperienceData[] => [
  {
    title: lang === 'pt' ? "Trainee Dev IA | Lunella" : "AI Dev Trainee | Lunella",
    company: "Verzel Soluções em Sistemas",
    period: lang === 'pt' ? "dez 2025 - o momento" : "Dec 2025 - Present",
    description: lang === 'pt' 
      ? "Desenvolvimento backend (Python/Java Quarkus), microserviços, IA generativa e AWS (SQS, SNS, Lambda). Interfaces com Vue.js e bancos PostgreSQL/DynamoDB."
      : "Backend development (Python/Java Quarkus), microservices, Generative AI, and AWS. Interfaces with Vue.js and PostgreSQL/DynamoDB databases.",
    icon: 'work'
  },
  {
    title: lang === 'pt' ? "Pesquisador Mestrando (Bolsista)" : "Master's Researcher (Scholar)",
    company: "Fundação de Apoio da UFMG - Fundep / UFABC",
    period: lang === 'pt' ? "abr 2025 - o momento" : "Apr 2025 - Present",
    description: lang === 'pt' 
      ? "Pesquisa em Artificial Anti-fragility. Desenvolvimento de soluções em Python/Java para reconfiguração artificial e controle em FPAA/FPGA com Hardware-in-the-Loop."
      : "Research in Artificial Anti-fragility. Development of Python/Java solutions for artificial reconfiguration and control in FPAA/FPGA with Hardware-in-the-Loop.",
    icon: 'research'
  },
  {
    title: lang === 'pt' ? "Estagiário em Manutenção" : "Maintenance Intern",
    company: "Grupo Piracanjuba",
    period: lang === 'pt' ? "set 2023 - mar 2024" : "Sep 2023 - Mar 2024",
    description: lang === 'pt' 
      ? "Análise de dados com Python (Pandas) e Excel para otimização de produção."
      : "Data analysis with Python (Pandas) and Excel for production optimization.",
    icon: 'work'
  },
   {
    title: lang === 'pt' ? "Técnico em Eletrotécnica" : "Electrotechnics Technician",
    company: "IFPA",
    period: "2012 - 2016",
    description: lang === 'pt' 
      ? "Manutenção preventiva/corretiva, Eletrônica analógica/digital e programação em C."
      : "Preventive/corrective maintenance, Analog/Digital Electronics, and C programming.",
    icon: 'work'
  }
];

export const getEducation = (lang: Language): EducationData[] => [
  {
    title: lang === 'pt' ? "Mestrado em Engenharia Elétrica" : "Master's in Electrical Engineering",
    institution: "UFABC",
    period: "Apr 2025 - Mar 2028",
    description: "Artificial Anti-fragility (Reconfiguração Artificial).",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Ufabc_logo.png"
  },
  {
    title: lang === 'pt' ? "Mestrado em Computação Aplicada" : "Master's in Applied Computing",
    institution: "UFPA",
    period: "Mar 2025 - Mar 2027",
    description: "Inteligência Artificial & Deep Learning.",
    logo: "https://ufpa.br/wp-content/uploads/2023/12/Brasao-UFPA_Sigla-300x281.png"
  },
  {
    title: lang === 'pt' ? "Especialização em Sistemas Embarcados IoT" : "Specialization in Embedded Systems IoT",
    institution: "IFMA",
    period: "Nov 2024 - Fev 2025",
    description: "Microcontroladores, C/C++, IoT.",
    logo: "https://images.seeklogo.com/logo-png/33/1/ifma-logo-png_seeklogo-337312.png"
  },
  {
    title: lang === 'pt' ? "Bacharelado em Engenharia Elétrica" : "Bachelor's in Electrical Engineering",
    institution: "UFPA",
    period: "Jan 2017 - Set 2024",
    description: "Controle de Sistemas, Gêmeos Digitais, Python/Matlab.",
    logo: "https://ufpa.br/wp-content/uploads/2023/12/Brasao-UFPA_Sigla-300x281.png"
  },
  {
    title: lang === 'pt' ? "Desenvolvedor Backend Java" : "Java Backend Developer",
    institution: "Oracle Next Education (ONE)",
    period: "Nov 2023 - Jun 2024",
    description: "Java, Spring Boot, MySQL, API REST.",
    logo: "https://camo.githubusercontent.com/578d87d661d23e62d9acd12fe9505d95a88aac5f0f6a4073b2fcb5c3c2f7057a/68747470733a2f2f692e696d6775722e636f6d2f77304e76616c4f2e706e67"
  }
];

export const getCertifications = (lang: Language): CertificationData[] => [
  {
    title: "AWS Machine Learning Foundations",
    issuer: "Udacity",
    date: "Oct 2021",
    skills: ["AWS", "Machine Learning", "Deep Learning"],
    link: "#"
  },
  {
    title: "Deep Learning A-Z™: Hands-On Artificial Neural Networks",
    issuer: "Udemy",
    date: "2021",
    skills: ["Python", "TensorFlow", "Keras"],
    link: "#"
  },
  {
    title: "Formação Java e Orientação a Objetos",
    issuer: "Alura / Oracle ONE",
    date: "Apr 2024",
    skills: ["Java", "OOP", "Spring"],
    link: "#"
  },
  {
    title: "Formação Oracle Cloud Infrastructure",
    issuer: "Alura / Oracle ONE",
    date: "Nov 2024",
    skills: ["OCI", "Cloud Computing"],
    link: "#"
  },
  {
    title: "REST APIs com Python e Flask",
    issuer: "Udemy",
    date: "Oct 2025",
    skills: ["Python", "Flask", "API Rest"],
    link: "#"
  },
    {
    title: "AWS Lambda com Python e Serverless",
    issuer: "Udemy",
    date: "Apr 2024",
    skills: ["AWS Lambda", "Serverless", "Python"],
    link: "#"
  },
  {
    title: "Machine Learning e Data Science com Python",
    issuer: "Udemy",
    date: "2021",
    skills: ["Scikit-Learn", "Pandas", "Data Science"],
    link: "#"
  }
];