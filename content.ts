import { Content, ProjectData, ExperienceData, EducationData, Language } from './types';

export const translations: Record<Language, Content> = {
  pt: {
    nav: {
      home: "Home",
      about: "Sobre",
      skills: "Skills",
      projects: "Projetos",
      experience: "Experiência",
      education: "Formação",
      contact: "Contato",
    },
    hero: {
      badge: "Desenvolvedor Backend Java/Python",
      description: "Desenvolvedor Backend e Mestrando em Engenharia Elétrica (UFABC) e Computação Aplicada (UFPA). Unindo o desenvolvimento de APIs robustas (Spring Boot/FastAPI) à pesquisa acadêmica em Inteligência Artificial e Antifragilidade.",
      btnPrimary: "Vamos Conversar",
      btnOutline: "Baixar CV",
      typed: ["Java & Spring Boot", "Python & FastAPI", "Pesquisador de IA", "Engenheiro de Dados"],
    },
    about: {
      title: "Sobre Mim",
      subtitle: "Desenvolvedor, Pesquisador e Criador de Conteúdo",
      description: "Sou Desenvolvedor Backend e pesquisador, atualmente cursando dois mestrados simultâneos: Engenharia Elétrica na UFABC (foco em Antifragilidade Artificial) e Computação Aplicada na UFPA (foco em Deep Learning para Veículos Elétricos).\n\nMinha base técnica é sólida em Java (Spring Boot, Security, Data JPA) e Python (FastAPI, Flask, Pandas), com experiência em bancos de dados relacionais (PostgreSQL, MySQL) e Cloud (AWS). Graduado no programa ONE (Oracle Next Education), atuei ativamente no Comitê AlumniOne, organizando eventos e escrevendo artigos técnicos.\n\nAlém disso, sou instrutor na Udemy com mais de 1.900 alunos e crio conteúdo técnico no YouTube e Medium, compartilhando conhecimento sobre Software e IA.",
    },
    skills: {
      title: "Habilidades Técnicas",
      subtitle: "Tecnologias, Frameworks e Ferramentas",
    },
    projects: {
      title: "Projetos em Destaque",
      subtitle: "Soluções em APIs, IA e Sistemas Distribuídos",
    },
    experience: {
      title: "Experiência Profissional",
      subtitle: "Minha jornada no mercado e na academia",
    },
    education: {
      title: "Formação Acadêmica",
      subtitle: "Base sólida em Engenharia e Computação",
    },
    contact: {
      title: "Entre em Contato",
      subtitle: "Vamos conversar sobre tecnologia e inovação",
      formName: "Nome Completo",
      formEmail: "E-mail",
      formMessage: "Mensagem",
      btnSend: "Enviar Mensagem",
      sending: "Enviando...",
      success: "Mensagem enviada com sucesso!",
      error: "Erro ao enviar mensagem.",
    },
    footer: {
      rights: "© 2025 Oséias Farias. Todos os direitos reservados.",
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
      badge: "Backend Developer Java/Python",
      description: "Backend Developer and Master's Student in Electrical Engineering (UFABC) and Applied Computing (UFPA). Merging robust API development (Spring Boot/FastAPI) with academic research in AI and Antifragility.",
      btnPrimary: "Let's Talk",
      btnOutline: "Download CV",
      typed: ["Java & Spring Boot", "Python & FastAPI", "AI Researcher", "Data Engineer"],
    },
    about: {
      title: "About Me",
      subtitle: "Developer, Researcher, and Content Creator",
      description: "I am a Backend Developer and researcher, currently pursuing two Master's degrees simultaneously: Electrical Engineering at UFABC (focused on Artificial Antifragility) and Applied Computing at UFPA (focused on Deep Learning for EVs).\n\nMy technical foundation is solid in Java (Spring Boot, Security, Data JPA) and Python (FastAPI, Flask, Pandas), with experience in relational databases (PostgreSQL, MySQL) and Cloud (AWS). A graduate of the ONE (Oracle Next Education) program, I was an active member of the AlumniOne Committee, organizing events and writing technical articles.\n\nAdditionally, I am an instructor on Udemy with over 1,900 students and create technical content on YouTube and Medium, sharing knowledge about Software and AI.",
    },
    skills: {
      title: "Technical Skills",
      subtitle: "Technologies, Frameworks, and Tools",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Solutions in APIs, AI, and Distributed Systems",
    },
    experience: {
      title: "Professional Experience",
      subtitle: "My journey in the market and academia",
    },
    education: {
      title: "Academic Education",
      subtitle: "Solid foundation in Engineering and Computing",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Let's talk about technology and innovation",
      formName: "Full Name",
      formEmail: "E-mail",
      formMessage: "Message",
      btnSend: "Send Message",
      sending: "Sending...",
      success: "Message sent successfully!",
      error: "Error sending message.",
    },
    footer: {
      rights: "© 2025 Oséias Farias. All rights reserved.",
    },
  },
};

export const getProjects = (lang: Language): ProjectData[] => [
  {
    title: "API Fórum Hub",
    description: lang === 'pt' 
      ? "API REST com Spring Boot, JWT, Flyway e MySQL. Autenticação e gerenciamento de tópicos."
      : "REST API with Spring Boot, JWT, Flyway, and MySQL. Authentication and topic management.",
    tags: ["Java", "Spring Boot", "Spring Security", "MySQL"],
    image: "https://github.com/Oseiasdfarias/forum_hub_challenge/blob/main/utils/Badge-Spring.png?raw=true",
    link: "https://github.com/Oseiasdfarias/forum_hub_challenge"
  },
  {
    title: "Full FastAPI REST",
    description: lang === 'pt'
      ? "Sistema completo com FastAPI, SQLAlchemy, Pytest e integração contínua."
      : "Complete system with FastAPI, SQLAlchemy, Pytest, and continuous integration.",
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    image: "https://github.com/Oseiasdfarias/full_fast_api/blob/main/utils/fast_api_logo1.png?raw=true",
    link: "https://github.com/Oseiasdfarias/full_fast_api"
  },
  {
    title: "Catálogo Literalura",
    description: lang === 'pt' 
      ? "Consumo de API Gutendex e persistência com Spring Data JPA e PostgreSQL." 
      : "Gutendex API consumption and persistence with Spring Data JPA and PostgreSQL.",
    tags: ["Java", "Spring Data JPA", "PostgreSQL"],
    image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
    link: "https://github.com/Oseiasdfarias/literalura"
  },
  {
    title: lang === 'pt' ? "Agente SDR com IA" : "SDR AI Agent",
    description: lang === 'pt' 
      ? "Agente automatizado com OpenAI, FastAPI, React e Redis. Integração com Cal.com."
      : "Automated agent with OpenAI, FastAPI, React, and Redis. Cal.com integration.",
    tags: ["OpenAI", "FastAPI", "React", "Redis"],
    image: "https://github.com/Oseiasdfarias/oseias_desafio_elite_dev_ia/blob/main/util/logo.png?raw=true",
    link: "https://github.com/Oseiasdfarias/oseias_desafio_elite_dev_ia"
  },
  {
    title: "API de Hotéis (Flask)",
    description: lang === 'pt'
      ? "Gerenciamento de reservas com Python, Flask-RESTful e SQLAlchemy."
      : "Reservation management with Python, Flask-RESTful, and SQLAlchemy.",
    tags: ["Python", "Flask", "SQLAlchemy"],
    image: "https://github.com/Oseiasdfarias/reserva-hoteis-api/blob/main/utils/logo.png?raw=true",
    link: "https://github.com/Oseiasdfarias/reserva-hoteis-api"
  },
  {
    title: "AWS Serverless",
    description: lang === 'pt'
      ? "Aplicação escalável com AWS Lambda, API Gateway e DynamoDB."
      : "Scalable application with AWS Lambda, API Gateway, and DynamoDB.",
    tags: ["Python", "AWS Lambda", "Serverless"],
    image: "https://camo.githubusercontent.com/7cb06152294bf4db61e9131fa31614d45cfd9dc84c21c5e70dfa0add4c4884a0/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f76322f726573697a653a6669743a3634302f666f726d61743a776562702f302a756f526b4e6e687175336436315a67782e706e67",
    link: "https://github.com/Oseiasdfarias/AWS_lambda_com_python_e_serverless_framework"
  }
];

export const getExperience = (lang: Language): ExperienceData[] => [
  {
    title: lang === 'pt' ? "Pesquisador de Mestrado (Bolsista)" : "Master's Researcher (Scholar)",
    company: "UFABC / FUNDEP",
    period: lang === 'pt' ? "abr 2025 - presente" : "Apr 2025 - Present",
    description: lang === 'pt' 
      ? "Pesquisa em 'Artificial Anti-fragility'. Implementação de controle em FPAA/FPGA, agentes de IA e simulação HIL com Matlab/Python."
      : "Research on 'Artificial Anti-fragility'. Control implementation on FPAA/FPGA, AI agents, and HIL simulation with Matlab/Python.",
    icon: 'research'
  },
  {
    title: lang === 'pt' ? "Membro do Comitê AlumniOne" : "AlumniOne Committee Member",
    company: "Oracle Next Education",
    period: lang === 'pt' ? "ago 2024 - mar 2025" : "Aug 2024 - Mar 2025",
    description: lang === 'pt' 
      ? "Voluntariado. Organização de eventos e escrita de artigos técnicos sobre IA e Desenvolvimento para a comunidade de ex-alunos."
      : "Volunteering. Event organization and technical writing on AI and Development for the alumni community.",
    icon: 'work'
  },
  {
    title: lang === 'pt' ? "Instrutor & Criador de Conteúdo" : "Instructor & Content Creator",
    company: "Udemy / YouTube / Medium",
    period: lang === 'pt' ? "2023 - presente" : "2023 - Present",
    description: lang === 'pt' 
      ? "Instrutor de Python na Udemy (1.900+ alunos). Produção de tutoriais de Engenharia de Software e IA no YouTube e Medium."
      : "Python Instructor on Udemy (1,900+ students). Production of Software Engineering and AI tutorials on YouTube and Medium.",
    icon: 'work'
  },
  {
    title: lang === 'pt' ? "Estagiário em Manutenção" : "Maintenance Intern",
    company: "Grupo Piracanjuba",
    period: lang === 'pt' ? "set 2023 - mar 2024" : "Sep 2023 - Mar 2024",
    description: lang === 'pt' 
      ? "Otimização de linhas de produção utilizando análise de dados com Python (Pandas) e Excel."
      : "Optimization of production lines using data analysis with Python (Pandas) and Excel.",
    icon: 'work'
  }
];

export const getEducation = (lang: Language): EducationData[] => [
  {
    title: lang === 'pt' ? "Mestrado em Eng. Elétrica" : "Master's in Electrical Eng.",
    institution: "UFABC",
    period: "2025 - 2027",
    description: lang === 'pt' ? "Pesquisa: Antifragilidade Artificial, FPGA, IA." : "Research: Artificial Antifragility, FPGA, AI.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/e/ee/Ufabc_logo.png"
  },
  {
    title: lang === 'pt' ? "Mestrado em Comp. Aplicada" : "Master's in Applied Computing",
    institution: "UFPA",
    period: "2025 - 2027",
    description: lang === 'pt' ? "Ênfase em IA e Deep Learning para Veículos Elétricos." : "Emphasis on AI and Deep Learning for Electric Vehicles.",
    logo: "https://ascom.ufpa.br/images/Brasao/UFPA.png"
  },
  {
    title: lang === 'pt' ? "Especialização Backend Java" : "Backend Java Specialization",
    institution: "Oracle ONE & Alura",
    period: "2024",
    description: "Spring Boot, JPA, Security, API REST.",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"
  },
  {
    title: lang === 'pt' ? "Bacharelado em Eng. Elétrica" : "Bachelor's in Electrical Eng.",
    institution: "UFPA",
    period: "2017 - 2024",
    description: lang === 'pt' ? "TCC: Gêmeos Digitais e Sistemas Dinâmicos." : "Thesis: Digital Twins and Dynamic Systems.",
    logo: "https://ascom.ufpa.br/images/Brasao/UFPA.png"
  },
  {
    title: lang === 'pt' ? "Técnico em Eletrotécnica" : "Technical Degree in Electrotechnics",
    institution: "IFPA",
    period: "2012 - 2016",
    description: "Arduino, C/C++, Microcontroladores.",
    logo: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Instituto_Federal_do_Par%C3%A1_-_Marca_Vertical_2015.svg"
  }
];