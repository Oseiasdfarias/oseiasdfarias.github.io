import { Content, ProjectData, ExperienceData, EducationData, CertificationData, Language, ResearchData } from './types';

export const translations: Record<Language, Content> = {
  pt: {
    nav: {
      about:      "Sobre",
      research:   "Pesquisa",
      experience: "Experiência",
      projects:   "Projetos",
      education:  "Formação",
      contact:    "Contato",
    },
    hero: {
      greeting:     "Olá, meu nome é",
      name:         "Oséias Farias.",
      title:        "Desenvolvedor Backend Júnior & Pesquisador.",
      description:  "Backend, IA e pesquisa acadêmica. Mestrando duplo (UFABC / UFPA).",
      btnPrimary:   "Ver Projetos",
      btnOutline:   "Baixar Currículo",
      availability: "UFABC · UFPA · Verzel",
    },
    about: {
      title: "Sobre Mim",
      description: [
        "Sou desenvolvedor backend júnior com formação em Engenharia Elétrica e uma trajetória incomum: comecei na área técnica industrial, migrei para software e hoje combino desenvolvimento com pesquisa acadêmica. Atualmente faço estágio/trainee como Dev IA na <strong>Lunella (Verzel)</strong>, onde aprendo na prática com Python, Java Quarkus e AWS.",
        "No lado acadêmico, curso dois mestrados simultâneos: <strong>Engenharia Elétrica na UFABC</strong> (pesquisa em sistemas FPGA/FPAA) e <strong>Computação Aplicada na UFPA</strong> (Inteligência Artificial & Deep Learning). A pesquisa me força a pensar com profundidade — um hábito que levo para o código.",
        "Ainda estou construindo minha experiência de mercado, mas me dedico intensamente a isso: projetos práticos, cursos, pesquisa e trabalho real. Se você busca alguém que aprende rápido, estuda com seriedade e traz uma visão diferente — vamos conversar.",
      ],
      industryLabel: "Mercado",
      academiaLabel: "Academia",
    },
    research: {
      title:    "Pesquisa",
      subtitle: "Projetos de Pesquisa Acadêmica",
    },
    experience: {
      title:    "Experiência",
      subtitle: "Trajetória Profissional",
    },
    projects: {
      title:    "Projetos",
      subtitle: "Soluções Desenvolvidas",
      viewAll:  "Ver no GitHub",
    },
    education: {
      title: "Formação Acadêmica",
    },
    certifications: {
      title: "Certificações",
    },
    contact: {
      title:       "Vamos Conversar",
      subtitle:    "Estou aberto a novas oportunidades, colaborações em pesquisa ou apenas uma boa conversa sobre tecnologia. Minha caixa de entrada está sempre aberta.",
      formName:    "Nome",
      formEmail:   "Email",
      formMessage: "Mensagem",
      btnSend:     "Enviar Mensagem",
      sending:     "Enviando...",
      success:     "Mensagem recebida! Retorno em breve.",
      error:       "Algo deu errado. Tente novamente.",
    },
    footer: {
      rights:    "© 2026 Oséias Farias",
      builtWith: "Desenvolvido com React & TypeScript",
    },
  },

  en: {
    nav: {
      about:      "About",
      research:   "Research",
      experience: "Experience",
      projects:   "Projects",
      education:  "Education",
      contact:    "Contact",
    },
    hero: {
      greeting:     "Hi, my name is",
      name:         "Oséias Farias.",
      title:        "Junior Backend Developer & Researcher.",
      description:  "Backend, AI and academic research. Dual Master's candidate (UFABC / UFPA).",
      btnPrimary:   "View Projects",
      btnOutline:   "Download CV",
      availability: "UFABC · UFPA · Verzel",
    },
    about: {
      title: "About Me",
      description: [
        "I'm a junior backend developer with a background in Electrical Engineering and an unusual path: I started in industrial maintenance, transitioned into software, and now combine development with academic research. I'm currently an AI Dev Trainee at <strong>Lunella (Verzel)</strong>, learning hands-on with Python, Java Quarkus, and AWS.",
        "On the academic side, I'm pursuing two simultaneous master's degrees: <strong>Electrical Engineering at UFABC</strong> (FPGA/FPAA systems research) and <strong>Applied Computing at UFPA</strong> (Artificial Intelligence & Deep Learning). Research teaches me to think deeply — a habit I carry into my code.",
        "I'm still building my professional experience, but I'm fully committed to it: practical projects, continuous learning, research, and real-world work. If you're looking for someone who learns fast, studies seriously, and brings a different perspective — let's talk.",
      ],
      industryLabel: "Industry",
      academiaLabel: "Academia",
    },
    research: {
      title:    "Research",
      subtitle: "Academic Research Projects",
    },
    experience: {
      title:    "Experience",
      subtitle: "Career Trajectory",
    },
    projects: {
      title:    "Projects",
      subtitle: "Developed Solutions",
      viewAll:  "View on GitHub",
    },
    education: {
      title: "Education",
    },
    certifications: {
      title: "Certifications",
    },
    contact: {
      title:       "Get In Touch",
      subtitle:    "I'm open to new opportunities, research collaborations, or just a good conversation about technology. My inbox is always open.",
      formName:    "Name",
      formEmail:   "Email",
      formMessage: "Message",
      btnSend:     "Send Message",
      sending:     "Sending...",
      success:     "Message received! I'll get back to you soon.",
      error:       "Something went wrong. Please try again.",
    },
    footer: {
      rights:    "© 2026 Oséias Farias",
      builtWith: "Built with React & TypeScript",
    },
  },
};

// ─── Research ──────────────────────────────────────────────────────────────
export const getResearch = (lang: Language): ResearchData[] => [
  {
    title: lang === 'pt'
      ? "Antifragilidade Artificial em Sistemas de Controle"
      : "Artificial Antifragility in Control Systems",
    institution: "UFABC / Fundep",
    period: lang === 'pt' ? "abr 2025 – presente" : "Apr 2025 – Present",
    description: lang === 'pt'
      ? "Desenvolvimento de arquiteturas de controle antifrágeis para sistemas dinâmicos usando FPGA e FPAA. O objetivo é criar sistemas que melhorem de desempenho sob estresse, utilizando reconfiguração artificial e agentes inteligentes em Java/Matlab com Hardware-in-the-Loop."
      : "Development of antifragile control architectures for dynamic systems using FPGA and FPAA. The goal is to create systems that improve under stress by leveraging artificial reconfiguration and intelligent agents in Java/Matlab with Hardware-in-the-Loop.",
    tags: ["FPAA", "FPGA", "Java", "Matlab", "Control Theory", "HIL", "Antifragility"],
    status: "ongoing",
  },
  {
    title: lang === 'pt'
      ? "Deep Learning para Sistemas Inteligentes"
      : "Deep Learning for Intelligent Systems",
    institution: "UFPA – PPGCA",
    period: lang === 'pt' ? "mar 2025 – presente" : "Mar 2025 – Present",
    description: lang === 'pt'
      ? "Pesquisa em redes neurais profundas aplicadas a problemas de controle inteligente e percepção de ambiente. Foco em modelos eficientes para hardware embarcado e integração com sistemas de controle em tempo real."
      : "Research on deep neural networks applied to intelligent control and environment perception. Focus on efficient models for embedded hardware and real-time control system integration.",
    tags: ["Python", "TensorFlow", "PyTorch", "Deep Learning", "Embedded AI", "Real-Time"],
    status: "ongoing",
  },
];

// ─── Projects ──────────────────────────────────────────────────────────────
export const getProjects = (lang: Language): ProjectData[] => [
  {
    title: "Lunella AI Platform",
    description: lang === 'pt'
      ? "Plataforma de automação de atendimento ao cliente com IA generativa. Backend em Python/Java Quarkus, microserviços na AWS (Lambda, SQS, SNS) e interface Vue.js com dados em PostgreSQL/DynamoDB."
      : "AI-powered customer service automation platform. Backend in Python/Java Quarkus, microservices on AWS (Lambda, SQS, SNS) and Vue.js interface with PostgreSQL/DynamoDB.",
    tags: ["Java", "Quarkus", "Python", "AWS Lambda", "Vue.js", "DynamoDB"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
    link: "",
    category: "ai",
  },
  {
    title: "Artificial Antifragility System",
    description: lang === 'pt'
      ? "Sistema de controle antifrágil com FPGA/FPAA e agentes de IA. Pesquisa de mestrado com Hardware-in-the-Loop para validação de sistemas que melhoram sob perturbação."
      : "Antifragile control system with FPGA/FPAA and AI agents. Master's research using Hardware-in-the-Loop to validate systems that improve under disruption.",
    tags: ["FPAA", "FPGA", "Java", "Matlab", "HIL", "Control Systems"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    link: "",
    category: "research",
  },
  {
    title: "API Fórum Hub",
    description: lang === 'pt'
      ? "API REST completa com Spring Boot, JWT, Flyway e MySQL. Autenticação stateless, migrações de banco versionadas e cobertura de testes com JUnit 5."
      : "Complete REST API with Spring Boot, JWT, Flyway, and MySQL. Stateless auth, versioned DB migrations, and test coverage with JUnit 5.",
    tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "JWT"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    link: "https://github.com/Oseiasdfarias/forum_hub_challenge",
    category: "backend",
  },
  {
    title: "Full FastAPI REST",
    description: lang === 'pt'
      ? "Sistema backend moderno com FastAPI, SQLAlchemy, Alembic e PostgreSQL. CI/CD com GitHub Actions, Pytest para cobertura de testes e containerização com Docker."
      : "Modern backend with FastAPI, SQLAlchemy, Alembic, and PostgreSQL. CI/CD with GitHub Actions, Pytest coverage, and Docker containerization.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker", "Pytest", "CI/CD"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop",
    link: "https://github.com/Oseiasdfarias/full_fast_api",
    category: "backend",
  },
  {
    title: "AWS Serverless App",
    description: lang === 'pt'
      ? "Arquitetura serverless escalável com AWS Lambda, API Gateway e DynamoDB. Deploy com Serverless Framework, cold start otimizado e custo zero em idle."
      : "Scalable serverless architecture with AWS Lambda, API Gateway, and DynamoDB. Deployed with Serverless Framework, optimized cold start, zero idle cost.",
    tags: ["Python", "AWS Lambda", "Serverless", "DynamoDB", "API Gateway"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
    link: "https://github.com/Oseiasdfarias/AWS_lambda_com_python_e_serverless_framework",
    category: "backend",
  },
  {
    title: "Catálogo LiteraLura",
    description: lang === 'pt'
      ? "Integração com API Gutendex para catálogo de livros. Spring Data JPA, PostgreSQL e interface CLI interativa para busca, filtragem e persistência de dados literários."
      : "Gutendex API integration for book catalog. Spring Data JPA, PostgreSQL, and interactive CLI for searching, filtering, and persisting literary data.",
    tags: ["Java", "Spring Data JPA", "PostgreSQL", "CLI"],
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2028&auto=format&fit=crop",
    link: "https://github.com/Oseiasdfarias/literalura",
    category: "backend",
  },
];

// ─── Experience ────────────────────────────────────────────────────────────
export const getExperience = (lang: Language): ExperienceData[] => [
  {
    title:   lang === 'pt' ? "Trainee Dev IA" : "AI Dev Trainee",
    company: "Lunella · Verzel Soluções em Sistemas",
    period:  lang === 'pt' ? "dez 2025 – presente" : "Dec 2025 – Present",
    description: lang === 'pt'
      ? "Desenvolvimento backend com Python e Java Quarkus para plataforma de atendimento com IA generativa. Microserviços na AWS (SQS, SNS, Lambda), interfaces com Vue.js e bancos PostgreSQL/DynamoDB."
      : "Backend development with Python and Java Quarkus for a generative AI customer service platform. Microservices on AWS (SQS, SNS, Lambda), Vue.js interfaces, and PostgreSQL/DynamoDB databases.",
    type: "industry",
    tags: ["Python", "Java", "AWS", "Quarkus", "Vue.js"],
  },
  {
    title:   lang === 'pt' ? "Pesquisador Mestrando (Bolsista)" : "Master's Researcher (Scholar)",
    company: "Fundep / UFABC",
    period:  lang === 'pt' ? "abr 2025 – presente" : "Apr 2025 – Present",
    description: lang === 'pt'
      ? "Pesquisa em Antifragilidade Artificial: desenvolvimento de soluções em Python/Java para reconfiguração dinâmica de sistemas de controle em FPAA/FPGA com Hardware-in-the-Loop."
      : "Research in Artificial Antifragility: development of Python/Java solutions for dynamic reconfiguration of control systems in FPAA/FPGA with Hardware-in-the-Loop.",
    type: "research",
    tags: ["Python", "Java", "FPGA", "FPAA", "Matlab", "HIL"],
  },
  {
    title:   lang === 'pt' ? "Estagiário em Manutenção" : "Maintenance Intern",
    company: "Grupo Piracanjuba",
    period:  lang === 'pt' ? "set 2023 – mar 2024" : "Sep 2023 – Mar 2024",
    description: lang === 'pt'
      ? "Análise de dados de produção com Python (Pandas) e Excel para identificação de gargalos e otimização de processos industriais no setor de laticínios."
      : "Production data analysis with Python (Pandas) and Excel to identify bottlenecks and optimize industrial processes in the dairy sector.",
    type: "industry",
    tags: ["Python", "Pandas", "Excel", "Data Analysis"],
  },
  {
    title:   lang === 'pt' ? "Técnico em Eletrotécnica" : "Electrotechnics Technician",
    company: "IFPA",
    period:  "2012 – 2016",
    description: lang === 'pt'
      ? "Manutenção preventiva e corretiva em sistemas elétricos industriais. Eletrônica analógica e digital, programação em C para microcontroladores."
      : "Preventive and corrective maintenance of industrial electrical systems. Analog and digital electronics, C programming for microcontrollers.",
    type: "industry",
    tags: ["C", "Electronics", "Maintenance", "PLC"],
  },
];

// ─── Education ─────────────────────────────────────────────────────────────
export const getEducation = (lang: Language): EducationData[] => [
  {
    title:       lang === 'pt' ? "Mestrado em Engenharia Elétrica" : "M.Sc. Electrical Engineering",
    institution: "UFABC",
    period:      "Apr 2025 – Mar 2028",
    description: "Artificial Anti-fragility · FPGA/FPAA · Control Systems",
    logo:        "https://upload.wikimedia.org/wikipedia/commons/e/ee/Ufabc_logo.png",
  },
  {
    title:       lang === 'pt' ? "Mestrado em Computação Aplicada" : "M.Sc. Applied Computing",
    institution: "UFPA",
    period:      "Mar 2025 – Mar 2027",
    description: "Artificial Intelligence · Deep Learning · Neural Networks",
    logo:        "https://ufpa.br/wp-content/uploads/2023/12/Brasao-UFPA_Sigla-300x281.png",
  },
  {
    title:       lang === 'pt' ? "Especialização – Sistemas Embarcados IoT" : "Specialization – Embedded IoT Systems",
    institution: "IFMA",
    period:      "Nov 2024 – Feb 2025",
    description: "Microcontrollers · C/C++ · IoT · RTOS",
    logo:        "https://images.seeklogo.com/logo-png/33/1/ifma-logo-png_seeklogo-337312.png",
  },
  {
    title:       lang === 'pt' ? "Bacharelado em Engenharia Elétrica" : "B.Sc. Electrical Engineering",
    institution: "UFPA",
    period:      "Jan 2017 – Sep 2024",
    description: lang === 'pt'
      ? "Controle de Sistemas · Gêmeos Digitais · Python/Matlab"
      : "Control Systems · Digital Twins · Python/Matlab",
    logo:        "https://ufpa.br/wp-content/uploads/2023/12/Brasao-UFPA_Sigla-300x281.png",
  },
  {
    title:       lang === 'pt' ? "Desenvolvedor Backend Java" : "Java Backend Developer",
    institution: "Oracle Next Education (ONE)",
    period:      "Nov 2023 – Jun 2024",
    description: "Java · Spring Boot · MySQL · API REST",
    logo:        "https://camo.githubusercontent.com/578d87d661d23e62d9acd12fe9505d95a88aac5f0f6a4073b2fcb5c3c2f7057a/68747470733a2f2f692e696d6775722e636f6d2f77304e76616c4f2e706e67",
  },
];

// ─── Certifications ────────────────────────────────────────────────────────
export const getCertifications = (lang: Language): CertificationData[] => [
  {
    title:  "AWS Machine Learning Foundations",
    issuer: "Udacity",
    date:   "Oct 2021",
    skills: ["AWS", "Machine Learning", "Deep Learning"],
    link:   "#",
  },
  {
    title:  "Deep Learning A-Z™: Hands-On Artificial Neural Networks",
    issuer: "Udemy",
    date:   "2021",
    skills: ["Python", "TensorFlow", "Keras"],
    link:   "#",
  },
  {
    title:  "Formação Java e Orientação a Objetos",
    issuer: "Alura / Oracle ONE",
    date:   "Apr 2024",
    skills: ["Java", "OOP", "Spring"],
    link:   "#",
  },
  {
    title:  "Formação Oracle Cloud Infrastructure",
    issuer: "Alura / Oracle ONE",
    date:   "Nov 2024",
    skills: ["OCI", "Cloud Computing"],
    link:   "#",
  },
  {
    title:  "REST APIs com Python e Flask",
    issuer: "Udemy",
    date:   "Oct 2025",
    skills: ["Python", "Flask", "API Rest"],
    link:   "#",
  },
  {
    title:  "AWS Lambda com Python e Serverless",
    issuer: "Udemy",
    date:   "Apr 2024",
    skills: ["AWS Lambda", "Serverless", "Python"],
    link:   "#",
  },
  {
    title:  "Machine Learning e Data Science com Python",
    issuer: "Udemy",
    date:   "2021",
    skills: ["Scikit-Learn", "Pandas", "Data Science"],
    link:   "#",
  },
];
