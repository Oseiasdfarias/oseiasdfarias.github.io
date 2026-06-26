import { Content, ProjectData, ExperienceData, EducationData, CertificationData, Language, ResearchData, PublicationData, OpenSourceData } from './types';

export const translations: Record<Language, Content> = {
  pt: {
    nav: {
      about:      "Sobre",
      focus:      "Foco",
      experience: "Trajetória",
      projects:   "Projetos",
      opensource: "Open Source",
      research:   "Pesquisa",
      education:  "Formação",
      contact:    "Contato",
    },
    hero: {
      kicker:       "Disponível para novas oportunidades",
      name:         "Oséias Farias",
      role:         "Engenheiro de Machine Learning | MLOps & IA na Nuvem",
      lede:         "Construo e opero pipelines de ML/NLP e arquiteturas serverless orientadas a eventos em produção na AWS. Dois mestrados em andamento em IA aplicada a sistemas de controle. Autor do Synapsys (PyPI) e criador de conteúdo técnico.",
      ctaPrimary:   "Ver projetos",
      ctaSecondary: "Baixar currículo",
      location:     "Brasil · Remoto",
    },
    about: {
      title: "Sobre",
      lede:  "Engenheiro eletricista que migrou para software. Hoje meu trabalho vive na interseção entre ML em produção, arquiteturas serverless na AWS e pesquisa em IA aplicada a sistemas de controle.",
      paras: [
        "Atuei como <strong>Desenvolvedor de IA na Verzel</strong>, na plataforma <strong>Lunella/RosanaDesk</strong> — SaaS multi-tenant com 9+ microsserviços em produção. Arquitetei pipelines de ML/NLP em Python na AWS Lambda para extração e classificação de tópicos conversacionais, integrei agentes LLM (TaskingAI) e assistente de voz (VAPI, pipeline STT→LLM→TTS), e construí backend Java reativo (Quarkus, PostgreSQL, Redis, Keycloak).",
        "Em paralelo, sou pesquisador de mestrado em <strong>Engenharia Elétrica (UFABC)</strong> — antifragilidade artificial com controle adaptativo (PI, LQR, H∞), detecção de falhas (FDI/EKF/UKF/CUSUM) e agentes LLM (CrewAI) integrados via ZeroMQ em Hardware-in-the-Loop. Também pesquisador na <strong>UFPA</strong> em controle preditivo model-free e Deep RL/DQN para conversores de potência.",
        "Busco uma posição de <strong>ML Engineer</strong> ou <strong>MLOps</strong> em um time estruturado, onde eu possa aprofundar engenharia de sistemas de ML em produção.",
      ],
    },
    focus: {
      title:    "No que sou forte",
      subtitle: "Quatro frentes que se reforçam",
      pillars: [
        {
          k: "ML/NLP",
          t: "Modelos em produção",
          d: "Pipelines de ML/NLP em Python na AWS Lambda — extração de tópicos, classificação de conversas, consolidação multi-tenant e relatórios automatizados. MLflow, FastAPI, drift monitoring e model serving.",
          tags: ["Python", "NLP", "MLflow", "FastAPI", "Scikit-Learn", "AWS Lambda"],
        },
        {
          k: "MLOps",
          t: "Infraestrutura de ML",
          d: "Containerização com Docker, CI/CD com GitHub Actions, funções serverless na AWS, Pytest e cobertura de testes. Deploy confiável de modelos com rastreabilidade e monitoramento de qualidade.",
          tags: ["Docker", "CI/CD", "Serverless", "Pytest", "MLflow"],
        },
        {
          k: "Cloud",
          t: "Arquitetura AWS event-driven",
          d: "Sistemas desacoplados: API Gateway → SNS → SQS FIFO → Lambda → EventBridge. Bancos relacionais, NoSQL e vetoriais — PostgreSQL, DynamoDB, Redis, pgvector, Qdrant.",
          tags: ["AWS", "SQS", "SNS", "EventBridge", "pgvector", "Redis"],
        },
        {
          k: "LLMs & IA",
          t: "Agentes e GenAI",
          d: "RAG, agentes (LangGraph, CrewAI), engenharia de prompts, MCP e observabilidade (Langfuse). Integração de LLMs com ferramentas customizadas e pipelines de voz (STT→LLM→TTS).",
          tags: ["LangGraph", "CrewAI", "RAG", "LangFuse", "VAPI"],
        },
      ],
    },
    research: {
      title:        "Pesquisa",
      subtitle:     "Onde aprofundo método e teoria",
      publications: "Publicações",
    },
    experience: {
      title:    "Trajetória",
      subtitle: "Da bancada de engenharia ao ML em produção",
    },
    projects: {
      title:    "Projetos",
      subtitle: "Problema → solução → impacto",
      viewAll:  "Ver tudo no GitHub",
      labels:   { problem: "Problema", solution: "Solução", impact: "Impacto" },
    },
    opensource: {
      title:    "Open Source",
      subtitle: "Biblioteca mantida por mim",
    },
    education: {
      title:          "Formação",
      certifications: "Certificações",
    },
    contact: {
      title:    "Vamos conversar",
      subtitle: "Estou aberto a oportunidades de ML Engineer ou MLOps, colaborações e boas conversas sobre engenharia. Minha caixa de entrada está sempre aberta.",
      name:     "Nome",
      email:    "Email",
      message:  "Mensagem",
      send:     "Enviar mensagem",
      sending:  "Enviando…",
      success:  "Mensagem recebida! Retorno em breve.",
      error:    "Algo deu errado. Tente novamente.",
    },
    footer: {
      rights: "© 2026 Oséias Farias",
      built:  "ML Engineer & MLOps",
    },
    status: {
      ongoing: "Em andamento",
    },
  },

  en: {
    nav: {
      about:      "About",
      focus:      "Focus",
      experience: "Path",
      projects:   "Projects",
      opensource: "Open Source",
      research:   "Research",
      education:  "Education",
      contact:    "Contact",
    },
    hero: {
      kicker:       "Open to new opportunities",
      name:         "Oséias Farias",
      role:         "Machine Learning Engineer | MLOps & Cloud AI (AWS)",
      lede:         "I build and operate ML/NLP pipelines and event-driven serverless architectures in production on AWS. Pursuing two master's degrees in AI applied to control systems. Author of Synapsys (PyPI) and technical content creator.",
      ctaPrimary:   "View projects",
      ctaSecondary: "Download CV",
      location:     "Brazil · Remote",
    },
    about: {
      title: "About",
      lede:  "An electrical engineer who moved into software. My work today sits at the intersection of ML in production, serverless AWS architectures, and research in AI applied to control systems.",
      paras: [
        "I worked as an <strong>AI Developer at Verzel</strong>, on the <strong>Lunella/RosanaDesk</strong> platform — a multi-tenant SaaS with 9+ microservices in production. I architected ML/NLP pipelines in Python on AWS Lambda for topic extraction and classification from conversational data, integrated LLM agents (TaskingAI) and a voice assistant (VAPI, STT→LLM→TTS pipeline), and built a reactive Java backend (Quarkus, PostgreSQL, Redis, Keycloak).",
        "In parallel I'm a Master's researcher in <strong>Electrical Engineering (UFABC)</strong> — artificial antifragility with adaptive control (PI, LQR, H∞), fault detection and isolation (FDI/EKF/UKF/CUSUM) and LLM agents (CrewAI) integrated via ZeroMQ in Hardware-in-the-Loop. Also a researcher at <strong>UFPA</strong> in model-free predictive control and Deep RL/DQN for power converters.",
        "I'm looking for an <strong>ML Engineer</strong> or <strong>MLOps</strong> role in a structured team where I can go deep on production ML systems engineering.",
      ],
    },
    focus: {
      title:    "What I'm strong at",
      subtitle: "Four reinforcing fronts",
      pillars: [
        {
          k: "ML/NLP",
          t: "Models in production",
          d: "ML/NLP pipelines in Python on AWS Lambda — topic extraction, conversation classification, multi-tenant consolidation and automated reporting. MLflow, FastAPI, drift monitoring and model serving.",
          tags: ["Python", "NLP", "MLflow", "FastAPI", "Scikit-Learn", "AWS Lambda"],
        },
        {
          k: "MLOps",
          t: "ML infrastructure",
          d: "Docker containerization, CI/CD with GitHub Actions, serverless functions on AWS, Pytest and test coverage. Reliable model deployment with traceability and quality monitoring.",
          tags: ["Docker", "CI/CD", "Serverless", "Pytest", "MLflow"],
        },
        {
          k: "Cloud",
          t: "AWS event-driven architecture",
          d: "Decoupled systems: API Gateway → SNS → SQS FIFO → Lambda → EventBridge. Relational, NoSQL and vector databases — PostgreSQL, DynamoDB, Redis, pgvector, Qdrant.",
          tags: ["AWS", "SQS", "SNS", "EventBridge", "pgvector", "Redis"],
        },
        {
          k: "LLMs & AI",
          t: "Agents and GenAI",
          d: "RAG, agents (LangGraph, CrewAI), prompt engineering, MCP and observability (Langfuse). LLM integration with custom tools and voice pipelines (STT→LLM→TTS).",
          tags: ["LangGraph", "CrewAI", "RAG", "LangFuse", "VAPI"],
        },
      ],
    },
    research: {
      title:        "Research",
      subtitle:     "Where I deepen method and theory",
      publications: "Publications",
    },
    experience: {
      title:    "Path",
      subtitle: "From the engineering bench to ML in production",
    },
    projects: {
      title:    "Projects",
      subtitle: "Problem → solution → impact",
      viewAll:  "See all on GitHub",
      labels:   { problem: "Problem", solution: "Solution", impact: "Impact" },
    },
    opensource: {
      title:    "Open Source",
      subtitle: "A library I maintain",
    },
    education: {
      title:          "Education",
      certifications: "Certifications",
    },
    contact: {
      title:    "Let's talk",
      subtitle: "I'm open to ML Engineer or MLOps opportunities, collaborations and good conversations about engineering. My inbox is always open.",
      name:     "Name",
      email:    "Email",
      message:  "Message",
      send:     "Send message",
      sending:  "Sending…",
      success:  "Message received! I'll get back to you soon.",
      error:    "Something went wrong. Please try again.",
    },
    footer: {
      rights: "© 2026 Oséias Farias",
      built:  "ML Engineer & MLOps",
    },
    status: {
      ongoing: "Ongoing",
    },
  },
};

// ─── Open Source ───────────────────────────────────────────────────────────
export const getOpenSource = (lang: Language): OpenSourceData => ({
  name:        "Synapsys",
  version:     "v0.2.1",
  license:     "MIT",
  tagline:     lang === 'pt'
    ? "Framework Python para sistemas de controle + ML"
    : "Python framework for control systems + ML",
  description: lang === 'pt'
    ? "Une controle clássico e ML — modelos PyTorch/Keras/JAX como controladores, simulação distribuída multi-agente (memória compartilhada + ZeroMQ), algoritmos de controle (PID com anti-windup, LQR via Riccati), API compatível com MATLAB (tf, ss, bode), simuladores físicos com visualização 3D (PyVista) e fluxos MIL/SIL/HIL."
    : "Bridges classical control and ML — PyTorch/Keras/JAX models as controllers, distributed multi-agent simulation (shared memory + ZeroMQ), control algorithms (PID with anti-windup, LQR via Riccati), MATLAB-compatible API (tf, ss, bode), physical simulators with 3D visualization (PyVista), and MIL/SIL/HIL workflows.",
  tags:  ["Python", "PyTorch", "ZeroMQ", "SciPy", "NumPy", "PyVista"],
  stats: [
    { label: lang === 'pt' ? "Testes"    : "Tests",    value: "501"       },
    { label: lang === 'pt' ? "Cobertura" : "Coverage", value: "100%"      },
    { label: "Python",                                  value: "3.10–3.12" },
  ],
  demo: {
    title: lang === 'pt'
      ? "Quadricóptero 3D com Neural-LQR"
      : "3D Quadcopter with Neural-LQR",
    description: lang === 'pt'
      ? "Simulação em tempo real de um quadricóptero com modelo de hover de 12 estados, controle MIMO LQR e arquitetura Neural-LQR residual, visualizado em 3D a 50 Hz."
      : "Real-time simulation of a quadcopter with a 12-state hover model, MIMO LQR control and residual Neural-LQR architecture, visualized in 3D at 50 Hz.",
    media: [
      { src: "/gifs/06_quadcopter_3d.gif",        caption: lang === 'pt' ? "Visualização 3D com trajetória em figura-8" : "3D visualization with figure-8 trajectory" },
      { src: "/gifs/06_quadcopter_telemetry.gif", caption: lang === 'pt' ? "Telemetria em tempo real"                   : "Real-time telemetry" },
      { src: "/gifs/03_sil_ai_controller.gif",    caption: lang === 'pt' ? "Controlador Neural-LQR em SIL"              : "Neural-LQR controller in SIL" },
    ],
  },
  github: "https://github.com/synapsys-lab/synapsys",
  pypi:   "https://pypi.org/project/synapsys/",
});

// ─── Research ──────────────────────────────────────────────────────────────
export const getResearch = (lang: Language): ResearchData[] => [
  {
    title: lang === 'pt'
      ? "Antifragilidade Artificial em Sistemas de Controle"
      : "Artificial Antifragility in Control Systems",
    institution: "UFABC · FUNDEP",
    period:      lang === 'pt' ? "abr 2025 — presente" : "Apr 2025 — Present",
    ongoing:     true,
    description: lang === 'pt'
      ? "Controle adaptativo orientado por IA em conversor Buck: algoritmos PI, LQR e H∞ com detecção e isolamento de falhas (FDI) via filtros de Kalman (EKF/UKF) e CUSUM. Supervisor com agentes LLM (CrewAI) e integração planta-controlador via ZeroMQ em Software/Hardware-in-the-Loop (Simulink, FPGA/FPAA)."
      : "AI-driven adaptive control on a Buck converter: PI, LQR and H∞ algorithms with fault detection and isolation (FDI) via Kalman filters (EKF/UKF) and CUSUM. LLM agent supervisor (CrewAI) with plant-controller integration via ZeroMQ in Software/Hardware-in-the-Loop (Simulink, FPGA/FPAA).",
    tags: ["Python", "CrewAI", "EKF/UKF", "CUSUM", "ZeroMQ", "FPGA", "HIL"],
  },
  {
    title: lang === 'pt'
      ? "Controle Preditivo e Deep RL para Eletrônica de Potência"
      : "Predictive Control and Deep RL for Power Electronics",
    institution: "UFPA · PPGCA",
    period:      lang === 'pt' ? "2025 — presente" : "2025 — Present",
    ongoing:     true,
    description: lang === 'pt'
      ? "Controle preditivo model-free e Aprendizado por Reforço profundo (DQN) para conversores de eletrônica de potência. Abrange identificação de sistemas, inteligência computacional e visão computacional aplicada a sistemas de controle embarcados."
      : "Model-free predictive control and deep Reinforcement Learning (DQN) for power-electronics converters. Covers system identification, computational intelligence and computer vision applied to embedded control systems.",
    tags: ["PyTorch", "Deep RL", "DQN", "TensorFlow", "Embedded AI"],
  },
];

// ─── Projects ──────────────────────────────────────────────────────────────
export const getProjects = (lang: Language): ProjectData[] => {
  const pt = lang === 'pt';
  return [
    {
      title:    pt ? "Lunella/RosanaDesk — Plataforma de IA" : "Lunella/RosanaDesk — AI Platform",
      year:     "2025–2026",
      category: pt ? "ML/NLP · Backend · IA" : "ML/NLP · Backend · AI",
      problem:  pt
        ? "Plataforma SaaS multi-tenant de atendimento precisa automatizar análise conversacional com ML, escalar por demanda e gerar relatórios acionáveis."
        : "Multi-tenant SaaS customer service platform needs to automate conversational ML analysis, scale on demand and generate actionable reports.",
      solution: pt
        ? "Arquitetura serverless event-driven na AWS (API Gateway → SNS → SQS FIFO → Lambda → EventBridge) com 9+ microsserviços. Pipelines de ML/NLP em Python para extração de tópicos, agentes LLM (TaskingAI) e assistente de voz (VAPI). Backend Java reativo (Quarkus, PostgreSQL, Redis, Keycloak)."
        : "Event-driven serverless architecture on AWS (API Gateway → SNS → SQS FIFO → Lambda → EventBridge) with 9+ microservices. Python ML/NLP pipelines for topic extraction, LLM agents (TaskingAI) and voice assistant (VAPI). Reactive Java backend (Quarkus, PostgreSQL, Redis, Keycloak).",
      impact: pt
        ? "Pipeline de NLP em produção com consolidação multi-tenant diária/mensal e relatórios automatizados (PDF, Slack). Arquitetura desacoplada que escala por demanda."
        : "NLP pipeline in production with daily/monthly multi-tenant consolidation and automated reports (PDF, Slack). Decoupled architecture that scales on demand.",
      tags:  ["Python", "NLP", "AWS Lambda", "SQS", "Java", "Quarkus", "Redis"],
      link:  "",
    },
    {
      title:    pt ? "Pipeline NLP Serverless — Extração de Tópicos" : "Serverless NLP Pipeline — Topic Extraction",
      year:     "2026",
      category: pt ? "ML/NLP · AWS" : "ML/NLP · AWS",
      problem:  pt
        ? "Classificar e extrair tópicos de grandes volumes de conversas em tempo real, com consolidação multi-tenant e geração automatizada de relatórios."
        : "Classify and extract topics from large volumes of conversations in real time, with multi-tenant consolidation and automated report generation.",
      solution: pt
        ? "Pipeline de NLP em Python disparado por eventos SQS, rodando em AWS Lambda. Consolida análises diárias e mensais por tenant, gerando relatórios estruturados em PDF e notificações no Slack. Dados persistidos no PostgreSQL."
        : "Python NLP pipeline triggered by SQS events, running on AWS Lambda. Consolidates daily and monthly analyses per tenant, generating structured PDF reports and Slack notifications. Data persisted in PostgreSQL.",
      impact: pt
        ? "Pipeline em produção classificando conversas de múltiplos tenants com entrega automatizada de insights. Zero intervenção manual no fluxo de extração e reporte."
        : "Pipeline in production classifying conversations across multiple tenants with automated insight delivery. Zero manual intervention in the extraction and reporting flow.",
      tags:  ["Python", "NLP", "AWS Lambda", "SQS", "PostgreSQL"],
      link:  "",
    },
    {
      title:    "Full FastAPI REST",
      year:     "2024",
      category: pt ? "Backend · MLOps" : "Backend · MLOps",
      problem:  pt
        ? "Como entregar uma API de inferência de modelos ML com qualidade de produção: testes, deploy reprodutível e integração contínua."
        : "How to ship an ML model inference API with production quality: tests, reproducible deploys and continuous integration.",
      solution: pt
        ? "API com FastAPI e SQLAlchemy sobre PostgreSQL para serving de modelos Scikit-Learn, containerizada com Docker, testes em Pytest e CI/CD com GitHub Actions."
        : "API with FastAPI and SQLAlchemy over PostgreSQL for Scikit-Learn model serving, containerized with Docker, Pytest tests and CI/CD with GitHub Actions.",
      impact: pt
        ? "Base reutilizável para serving de modelos com migrações versionadas e pipeline automatizado de build e testes."
        : "Reusable foundation for model serving with versioned migrations and an automated build-and-test pipeline.",
      tags:  ["Python", "FastAPI", "Scikit-Learn", "PostgreSQL", "Docker", "Pytest"],
      link:  "https://github.com/Oseiasdfarias/full_fast_api",
    },
    {
      title:    "API Fórum Hub",
      year:     "2024",
      category: "Backend",
      problem:  pt
        ? "Um fórum precisa de autenticação segura e stateless e de um esquema de banco evolutivo e versionado."
        : "A forum needs secure stateless auth and an evolving, versioned database schema.",
      solution: pt
        ? "API REST em Spring Boot 3 com Spring Security e JWT, migrações com Flyway e testes em JUnit 5."
        : "REST API in Spring Boot 3 with Spring Security and JWT, Flyway migrations and JUnit 5 tests.",
      impact: pt
        ? "Desafio do programa Oracle ONE concluído com autenticação stateless e histórico de schema rastreável."
        : "Oracle ONE program challenge delivered with stateless auth and a traceable schema history.",
      tags:  ["Java", "Spring Boot", "Spring Security", "MySQL", "JWT"],
      link:  "https://github.com/Oseiasdfarias/forum_hub_challenge",
    },
    {
      title:    "LabVirtual",
      year:     "2023",
      category: pt ? "Open Source · Educação" : "Open Source · Education",
      problem:  pt
        ? "Ensinar sistemas de controle depende de protótipos físicos caros e pouco acessíveis."
        : "Teaching control systems depends on expensive, hard-to-access physical prototypes.",
      solution: pt
        ? "Biblioteca Python com simuladores gráficos 3D em VPython, publicada no PyPI para uso em sala."
        : "Python library with 3D graphical simulators in VPython, published on PyPI for classroom use.",
      impact: pt
        ? "Projeto acadêmico da UFPA que democratiza o acesso a ferramentas de simulação no ensino de engenharia."
        : "UFPA academic project that democratizes access to simulation tools in engineering education.",
      tags:  ["Python", "VPython", "Simulation", "PyPI", "UFPA"],
      link:  "https://github.com/Oseiasdfarias/LabVirtual",
    },
  ];
};

// ─── Experience ────────────────────────────────────────────────────────────
export const getExperience = (lang: Language): ExperienceData[] => {
  const pt = lang === 'pt';
  return [
    {
      title:       pt ? "Desenvolvedor de IA"                           : "AI Developer",
      company:     "Verzel · Lunella/RosanaDesk",
      period:      pt ? "dez 2025 — jun 2026"                          : "Dec 2025 — Jun 2026",
      type:        "industry",
      current:     true,
      description: pt
        ? "Arquitetei arquitetura serverless event-driven na AWS (API Gateway → SNS → SQS FIFO → Lambda → EventBridge) com 9+ microsserviços em produção. Desenvolvi pipelines de ML/NLP em Python para extração e classificação de tópicos conversacionais com consolidação multi-tenant e relatórios automatizados (PDF, Slack). Integrei agentes LLM (TaskingAI) e assistente de voz (VAPI, STT→LLM→TTS). Backend Java reativo: Quarkus, Hibernate Panache, PostgreSQL, Flyway, Keycloak, Redis."
        : "Architected an event-driven serverless architecture on AWS (API Gateway → SNS → SQS FIFO → Lambda → EventBridge) with 9+ microservices in production. Developed Python ML/NLP pipelines for topic extraction and classification from conversational data with multi-tenant consolidation and automated reports (PDF, Slack). Integrated LLM agents (TaskingAI) and voice assistant (VAPI, STT→LLM→TTS). Reactive Java backend: Quarkus, Hibernate Panache, PostgreSQL, Flyway, Keycloak, Redis.",
      tags: ["Python", "NLP", "AWS Lambda", "SQS", "Java", "Quarkus", "Redis", "LLM"],
    },
    {
      title:       pt ? "Pesquisador de Mestrado (Bolsista FUNDEP)"    : "Master's Researcher (FUNDEP Scholar)",
      company:     "FUNDEP · UFABC",
      period:      pt ? "abr 2025 — presente"                         : "Apr 2025 — Present",
      type:        "research",
      current:     true,
      description: pt
        ? "Controle adaptativo (PI, LQR, H∞) e detecção/isolamento de falhas (FDI) com filtros de Kalman (EKF/UKF) e CUSUM para reconfiguração autônoma de conversor Buck antifrágil. Supervisor com agentes LLM (CrewAI; OpenAI/Claude/Gemini) e integração via ZeroMQ em Software/Hardware-in-the-Loop (Simulink, FPGA/FPAA)."
        : "Adaptive control (PI, LQR, H∞) and fault detection and isolation (FDI) with Kalman filters (EKF/UKF) and CUSUM for autonomous reconfiguration of an antifragile Buck converter. LLM agent supervisor (CrewAI; OpenAI/Claude/Gemini) and ZeroMQ integration in Software/Hardware-in-the-Loop (Simulink, FPGA/FPAA).",
      tags: ["Python", "CrewAI", "EKF/UKF", "ZeroMQ", "FPGA", "HIL", "Simulink"],
    },
    {
      title:       pt ? "Estagiário — Análise de Dados"               : "Intern — Data Analysis",
      company:     "Grupo Piracanjuba",
      period:      pt ? "set 2023 — mar 2024"                         : "Sep 2023 — Mar 2024",
      type:        "industry",
      current:     false,
      description: pt
        ? "Automatizei extração e geração de relatórios de dados industriais com Python (Pandas), integrando exportações do SAP em pipelines com dashboards de KPIs, reduzindo o esforço manual de reporte."
        : "Automated extraction and reporting of industrial data with Python (Pandas), integrating SAP exports into pipelines with KPI dashboards, reducing manual reporting effort.",
      tags: ["Python", "Pandas", "SAP", "Dashboards"],
    },
    {
      title:       pt ? "Bolsista de Iniciação Científica"            : "Undergraduate Research Scholar",
      company:     "LACUT · UFPA",
      period:      pt ? "set 2022 — ago 2023"                         : "Sep 2022 — Aug 2023",
      type:        "research",
      current:     false,
      description: pt
        ? "Construção de um radiotelescópio amador: levantamento de hardware e software, pesquisa bibliográfica e apresentação no simpósio científico do LACUT."
        : "Building an amateur radio telescope: hardware and software survey, bibliographic research and presentation at the LACUT scientific symposium.",
      tags: ["Hardware", "Python", "Radioastronomia"],
    },
    {
      title:       pt ? "Aluno Pesquisador — LabVirtual"              : "Research Student — LabVirtual",
      company:     "UFPA",
      period:      pt ? "mar 2022 — mar 2023"                         : "Mar 2022 — Mar 2023",
      type:        "research",
      current:     false,
      description: pt
        ? "Desenvolvimento de simuladores interativos open-source em Python/VPython para o ensino prático de sistemas de controle, publicados no PyPI."
        : "Development of open-source interactive simulators in Python/VPython for hands-on control systems teaching, published on PyPI.",
      tags: ["Python", "VPython", "Open-Source", "PyPI"],
    },
  ];
};

// ─── Education ─────────────────────────────────────────────────────────────
export const getEducation = (lang: Language): EducationData[] => {
  const pt = lang === 'pt';
  return [
    {
      title:       pt ? "Mestrado em Engenharia Elétrica e de Informação" : "M.Sc. Electrical and Information Engineering",
      institution: "UFABC",
      period:      "2025 — 2027",
      description: pt
        ? "Antifragilidade artificial · controle adaptativo (LQR, H∞) · FDI/Kalman · agentes LLM (CrewAI) · ZeroMQ · FPGA/FPAA (HIL)"
        : "Artificial antifragility · adaptive control (LQR, H∞) · FDI/Kalman · LLM agents (CrewAI) · ZeroMQ · FPGA/FPAA (HIL)",
    },
    {
      title:       pt ? "Mestrado em Computação Aplicada"               : "M.Sc. Applied Computing",
      institution: "UFPA",
      period:      "2025 — 2027",
      description: pt
        ? "Controle preditivo model-free · Deep RL/DQN · eletrônica de potência · identificação de sistemas · visão computacional"
        : "Model-free predictive control · Deep RL/DQN · power electronics · system identification · computer vision",
    },
    {
      title:       pt ? "Bacharelado em Engenharia Elétrica"            : "B.Sc. Electrical Engineering",
      institution: "UFPA",
      period:      "2017 — 2024",
      description: pt
        ? "TCC: gêmeo digital para laboratório virtual de controle de sistemas dinâmicos"
        : "Thesis: digital twin for a virtual control lab for dynamic systems",
    },
    {
      title:       pt ? "Especialização — Sistemas Embarcados IoT"      : "Specialization — Embedded IoT Systems",
      institution: "IFMA",
      period:      "2024 — 2025",
      description: "Microcontrollers · C/C++ · IoT · RTOS",
    },
    {
      title:       pt ? "Desenvolvedor Backend Java"                     : "Java Backend Developer",
      institution: "Oracle Next Education",
      period:      "2023 — 2024",
      description: "Java · Spring Boot · MySQL · REST API",
    },
  ];
};

// ─── Publications ──────────────────────────────────────────────────────────
export const getPublications = (_lang: Language): PublicationData[] => [
  {
    title:       "Gêmeo Digital como ferramenta para um Laboratório Virtual de modelagem e controle de sistemas dinâmicos",
    venue:       "BDM · UFPA",
    date:        "2023",
    description: "Laboratório virtual combinando protótipo físico do Aeropêndulo, simulador 3D e interface interativa, validado com PID em malha fechada.",
  },
  {
    title:       "Laboratório Virtual de Controle de Sistemas com VPython no ensino de Engenharia",
    venue:       "ABENGE",
    date:        "2023",
    description: "Simulações de MAGLEV e Aeropêndulo demonstrando a efetividade do VPython no ensino de engenharia.",
  },
  {
    title:       "SMART HOUSE — Automação Residencial com Arduino",
    venue:       "ENESEE · Even3",
    date:        "2018",
    description: "Automação residencial com Arduino, app Android e sensores de luminosidade, temperatura e gás.",
  },
];

// ─── Certifications ────────────────────────────────────────────────────────
export const getCertifications = (_lang: Language): CertificationData[] => [
  { title: "REST APIs com Python e Flask",               issuer: "Udemy",              date: "2025", link: "https://udemy.com/certificate/UC-563dd22a-5969-472b-903f-810314964a90" },
  { title: "AWS Lambda com Python e Serverless",         issuer: "Udemy",              date: "2024", link: "https://udemy.com/certificate/UC-e9b6a86d-443f-47a8-81b9-9f4f46a20ef8" },
  { title: "Estatística do Básico ao Avançado",          issuer: "EBA",                date: "2025" },
  { title: "Formação SQL com MySQL Server",              issuer: "Alura · Oracle ONE", date: "2024" },
  { title: "Oracle Cloud Infrastructure",                issuer: "Alura · Oracle ONE", date: "2024" },
  { title: "Backend Java — Oracle Next Education",       issuer: "Alura · Oracle ONE", date: "2024" },
  { title: "Sistemas Embarcados — IoT",                  issuer: "IFMA · SOFTEX",      date: "2024" },
  { title: "AWS Machine Learning Foundations",           issuer: "Udacity",            date: "2021" },
  { title: "Machine Learning e Data Science com Python", issuer: "Udemy",              date: "2021", link: "https://udemy.com/certificate/UC-e38f3500-7c76-40d9-aa3d-414dfc3a9d9c" },
];
