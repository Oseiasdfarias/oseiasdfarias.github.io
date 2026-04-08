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
        "Sou Trainee Dev IA na <strong>Verzel</strong>, atuando no desenvolvimento da plataforma <strong>Lunella</strong> — solução de automação de atendimento com IA. Trabalho com backend em Python e Java (Quarkus), integração de serviços AWS (SQS, SNS, EventBridge, Lambda), Vue.js e bancos de dados PostgreSQL, DynamoDB e Redis.",
        "No lado acadêmico, sou pesquisador bolsista no mestrado em <strong>Engenharia Elétrica na UFABC</strong> (Reconfiguração Artificial / Antifragilidade), com desenvolvimento de agentes em Java e simulações em Matlab/HIL. Curso também o mestrado em <strong>Computação Aplicada na UFPA</strong>, com foco em IA e Deep Learning.",
        "Minha trajetória combina engenharia elétrica, ciência de dados e desenvolvimento de software. Busco aliar rigor acadêmico à prática para construir soluções tecnológicas com foco em IA generativa e microsserviços.",
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
        "I'm an AI Dev Trainee at <strong>Verzel</strong>, working on <strong>Lunella</strong> — an AI-powered customer service automation platform. My work covers backend development in Python and Java (Quarkus), AWS integration (SQS, SNS, EventBridge, Lambda), Vue.js support, and databases including PostgreSQL, DynamoDB, and Redis.",
        "On the academic side, I'm a research scholar in the <strong>Electrical Engineering Master's at UFABC</strong> (Artificial Reconfiguration / Antifragility), developing Java agents and Matlab/HIL simulations. I'm also enrolled in the <strong>Applied Computing Master's at UFPA</strong>, focused on AI and Deep Learning.",
        "My background bridges electrical engineering, data science, and software development. I aim to combine academic rigor with practical delivery — building solutions focused on generative AI and microservices architecture.",
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
      ? "Plataforma de automação de atendimento com IA generativa. Backend Python/Java Quarkus, microserviços AWS (SQS, SNS, EventBridge, Lambda), Vue.js e bancos PostgreSQL, DynamoDB e Redis."
      : "AI-powered customer service automation platform. Python/Java Quarkus backend, AWS microservices (SQS, SNS, EventBridge, Lambda), Vue.js and PostgreSQL, DynamoDB, Redis.",
    tags: ["Java", "Quarkus", "Python", "AWS", "Vue.js", "Redis", "DynamoDB"],
    image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2006&auto=format&fit=crop",
    link: "",
    category: "ai",
  },
  {
    title: "Artificial Antifragility System",
    description: lang === 'pt'
      ? "Sistema de controle antifrágil com FPGA/FPAA e agentes Java. Pesquisa de mestrado com ambiente simulado em Matlab integrado via Hardware-in-the-Loop (HIL)."
      : "Antifragile control system with FPGA/FPAA and Java agents. Master's research with Matlab simulation environment integrated via Hardware-in-the-Loop (HIL).",
    tags: ["FPAA", "FPGA", "Java", "Matlab", "HIL", "Python"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    link: "",
    category: "research",
  },
  {
    title: "Hotel Booking REST API",
    description: lang === 'pt'
      ? "API REST completa para sistema de reserva de hotéis com Flask, autenticação JWT, integração com banco de dados e deploy. Desenvolvida como projeto prático do curso REST APIs com Python."
      : "Complete REST API for hotel booking system using Flask, JWT auth, database integration and deployment. Built as a practical project for the REST APIs with Python course.",
    tags: ["Python", "Flask", "JWT", "REST API", "SQLAlchemy"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    link: "https://github.com/Oseiasdfarias/reserva-hoteis-api",
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
    title: "API Fórum Hub",
    description: lang === 'pt'
      ? "API REST com Spring Boot 3, Spring Security, JWT e Flyway. Autenticação stateless, migrações versionadas e testes com JUnit 5. Desafio do programa Oracle ONE."
      : "REST API with Spring Boot 3, Spring Security, JWT and Flyway. Stateless auth, versioned migrations and JUnit 5 tests. Oracle ONE program challenge.",
    tags: ["Java", "Spring Boot", "Spring Security", "MySQL", "JWT"],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    link: "https://github.com/Oseiasdfarias/forum_hub_challenge",
    category: "backend",
  },
  {
    title: "LabVirtual — Simulador de Controle",
    description: lang === 'pt'
      ? "Biblioteca Python com simuladores gráficos 3D (VPython) para estudo de sistemas de controle. Projeto acadêmico UFPA que elimina a necessidade de protótipos físicos no ensino de controle."
      : "Python library with 3D graphical simulators (VPython) for control systems study. UFPA academic project eliminating the need for physical prototypes in control engineering education.",
    tags: ["Python", "VPython", "Control Systems", "Simulation", "UFPA"],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=2070&auto=format&fit=crop",
    link: "https://github.com/Oseiasdfarias/LabVirtual",
    category: "research",
  },
];

// ─── Experience ────────────────────────────────────────────────────────────
export const getExperience = (lang: Language): ExperienceData[] => [
  {
    title:   lang === 'pt' ? "Trainee Dev IA" : "AI Dev Trainee",
    company: "Verzel Soluções em Sistemas · Lunella",
    period:  lang === 'pt' ? "dez 2025 – presente" : "Dec 2025 – Present",
    description: lang === 'pt'
      ? "Desenvolvimento backend com Python e Java Quarkus para plataforma de atendimento com IA generativa. Integração de serviços AWS (SQS, SNS, EventBridge, Lambda), Vue.js e bancos PostgreSQL, DynamoDB e Redis."
      : "Backend development with Python and Java Quarkus for a generative AI customer service platform. AWS integration (SQS, SNS, EventBridge, Lambda), Vue.js, and PostgreSQL, DynamoDB, Redis.",
    type: "industry",
    tags: ["Python", "Java", "Quarkus", "AWS", "Redis", "Vue.js"],
  },
  {
    title:   lang === 'pt' ? "Pesquisador Mestrando (Bolsista FUNDEP)" : "Master's Researcher (FUNDEP Scholar)",
    company: "FUNDEP / UFABC",
    period:  lang === 'pt' ? "abr 2025 – presente" : "Apr 2025 – Present",
    description: lang === 'pt'
      ? "Pesquisa em Antifragilidade Artificial: agentes Java para reconfiguração autônoma de circuitos FPAA, simulação em Matlab integrada via HIL e treinamento de algoritmos de IA para detecção adaptativa de falhas."
      : "Research in Artificial Antifragility: Java agents for autonomous FPAA reconfiguration, Matlab simulation via HIL, and AI algorithm training for adaptive fault detection.",
    type: "research",
    tags: ["Python", "Java", "FPGA", "FPAA", "Matlab", "HIL"],
  },
  {
    title:   lang === 'pt' ? "Oficial de Manutenção" : "Maintenance Officer",
    company: "Dow · Terceirizado",
    period:  lang === 'pt' ? "dez 2024 – mar 2025" : "Dec 2024 – Mar 2025",
    description: lang === 'pt'
      ? "Acompanhamento de equipes de manutenção mecânica e elétrica, elaboração de procedimentos, validação de riscos, gestão de mudanças (MOC) e treinamento de colaboradores."
      : "Supervision of mechanical and electrical maintenance teams, procedure writing, risk validation, change management (MOC) and staff training.",
    type: "industry",
    tags: ["Manutenção", "MOC", "Excel", "Procedimentos"],
  },
  {
    title:   lang === 'pt' ? "Estagiário em Manutenção UHT" : "UHT Maintenance Intern",
    company: "Grupo Piracanjuba",
    period:  lang === 'pt' ? "set 2023 – mar 2024" : "Sep 2023 – Mar 2024",
    description: lang === 'pt'
      ? "Projeto de ciência de dados para otimizar eficiência das linhas UHT. Análise de dados históricos com Pandas, Matplotlib e Seaborn para reduzir paradas não planejadas e padronizar viradas de volume."
      : "Data science project to optimize UHT line efficiency. Analysis of historical data with Pandas, Matplotlib and Seaborn to reduce unplanned downtime and standardize volume changeovers.",
    type: "industry",
    tags: ["Python", "Pandas", "Matplotlib", "Seaborn", "Excel"],
  },
  {
    title:   lang === 'pt' ? "Bolsista de Iniciação Científica" : "Undergraduate Research Scholar",
    company: "LACUT · Universidade Federal do Pará",
    period:  lang === 'pt' ? "set 2022 – ago 2023" : "Sep 2022 – Aug 2023",
    description: lang === 'pt'
      ? "Projeto de construção de um Radiotelescópio Amador no campus de Tucuruí. Levantamento de hardware/software, pesquisa bibliográfica e orçamento de dispositivos. Resultados apresentados no simpósio científico do LACUT."
      : "Amateur Radio Telescope construction project at the Tucuruí campus. Hardware/software survey, bibliographic research and device budgeting. Results presented at the LACUT scientific symposium.",
    type: "research",
    tags: ["Pesquisa", "Hardware", "Radioastronomia", "Python"],
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
      ? "TCC: Gêmeo Digital para Lab. Virtual de Controle · Artigo publicado · Monitor de Instalações Elétricas"
      : "Thesis: Digital Twin for Virtual Control Lab · Published paper · Electrical Installations teaching assistant",
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
export const getCertifications = (_lang: Language): CertificationData[] => [
  {
    title:  "REST APIs com Python e Flask",
    issuer: "Udemy",
    date:   "Out 2025",
    skills: ["Python", "Flask", "REST API"],
    link:   "https://udemy.com/certificate/UC-563dd22a-5969-472b-903f-810314964a90",
  },
  {
    title:  "EBA — Estatística do Básico ao Avançado",
    issuer: "EBA",
    date:   "Abr 2025",
    skills: ["Python", "Estatística", "Pandas", "Data Science"],
    link:   "#",
  },
  {
    title:  "Formação SQL com MySQL Server da Oracle",
    issuer: "Alura / Oracle ONE",
    date:   "Nov 2024",
    skills: ["MySQL", "SQL"],
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
    title:  "Programa Oracle Next Education — Backend Java",
    issuer: "Alura / Oracle ONE",
    date:   "Jul 2024",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
    link:   "#",
  },
  {
    title:  "AWS Lambda com Python e Serverless Framework",
    issuer: "Udemy",
    date:   "Abr 2024",
    skills: ["AWS Lambda", "Serverless", "Python"],
    link:   "https://udemy.com/certificate/UC-e9b6a86d-443f-47a8-81b9-9f4f46a20ef8",
  },
  {
    title:  "Capacitação em Sistemas Embarcados — IoT",
    issuer: "IFMA / SOFTEX",
    date:   "Nov 2024",
    skills: ["Embedded Systems", "IoT", "Microcontrollers", "C/C++"],
    link:   "#",
  },
  {
    title:  "Curso de Capacitação em Inteligência Artificial",
    issuer: "IFAL",
    date:   "Jan 2021",
    skills: ["Inteligência Artificial", "Deep Learning", "Python"],
    link:   "#",
  },
  {
    title:  "AWS Machine Learning Foundations",
    issuer: "Udacity",
    date:   "Out 2021",
    skills: ["AWS", "Machine Learning", "Deep Learning"],
    link:   "#",
  },
  {
    title:  "Machine Learning e Data Science com Python",
    issuer: "Udemy",
    date:   "2021",
    skills: ["Scikit-Learn", "Pandas", "Data Science"],
    link:   "https://udemy.com/certificate/UC-e38f3500-7c76-40d9-aa3d-414dfc3a9d9c",
  },
];
