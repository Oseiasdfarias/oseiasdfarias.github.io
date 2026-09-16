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
      community:  "Comunidade",
      contact:    "Contato",
    },
    hero: {
      kicker:       "Disponível para novas oportunidades",
      name:         "Oséias Farias",
      role:         "AI Engineer · IoT Systems & Cloud AI (AWS)",
      lede:         "Conecto hardware de borda a IA em produção: firmware ESP32 e Raspberry Pi, MQTT e arquiteturas serverless orientadas a eventos na AWS. Construo o Otensor, plataforma SaaS de automação IoT com IA. Dois mestrados em andamento em IA aplicada a sistemas de controle.",
      ctaPrimary:   "Ver projetos",
      ctaSecondary: "Baixar currículo",
      location:     "Brasil · Remoto",
    },
    about: {
      title: "Sobre",
      lede:  "Engenheiro eletricista que migrou para software — e que nunca largou o hardware. Hoje meu trabalho vive na interseção entre sistemas embarcados, IA em produção e arquiteturas serverless na AWS.",
      paras: [
        "Construo o <strong>Otensor</strong>, plataforma SaaS multi-tenant de automação IoT com IA — o \"Arduino do IoT com IA\". Firmware ESP32 e agente em Raspberry Pi publicando telemetria por MQTT, motor de automação inteligente e integração com LLM/STT/TTS, tudo rodando local em Docker ou na AWS. MVP validado ponta a ponta em hardware físico.",
        "Atuei como <strong>Desenvolvedor de IA na Verzel</strong>, na plataforma <strong>Lunella/RosanaDesk</strong> — SaaS multi-tenant com 9+ microsserviços em produção. Arquitetei pipelines de ML/NLP em Python na AWS Lambda para extração e classificação de tópicos conversacionais, integrei agentes LLM (TaskingAI) e assistente de voz (VAPI, pipeline STT→LLM→TTS), e construí backend Java reativo (Quarkus, PostgreSQL, Redis, Keycloak).",
        "Em paralelo, sou pesquisador de mestrado em <strong>Engenharia Elétrica (UFABC)</strong> — antifragilidade artificial com controle adaptativo (PI, LQR, H∞), detecção de falhas (FDI/EKF/UKF/CUSUM) e agentes LLM (CrewAI) integrados via ZeroMQ em Hardware-in-the-Loop. Também pesquisador na <strong>UFPA</strong> em controle preditivo model-free e Deep RL/DQN para conversores de potência.",
        "Busco uma posição de <strong>AI Engineer</strong> ou <strong>IoT/Edge AI</strong> em um time estruturado, onde eu possa aprofundar engenharia de sistemas inteligentes que conversam com o mundo físico.",
      ],
    },
    focus: {
      title:    "No que sou forte",
      subtitle: "Quatro frentes que se reforçam",
      pillars: [
        {
          k: "IoT & Edge",
          t: "Hardware que fala com a nuvem",
          d: "Firmware ESP32 e agentes em Raspberry Pi publicando telemetria por MQTT, com reconexão resiliente e automação disparada na borda. Da leitura do sensor ao dashboard em tempo real, validado em hardware físico.",
          tags: ["ESP32", "Raspberry Pi", "MQTT", "C/C++", "RTOS", "Docker"],
        },
        {
          k: "ML/NLP",
          t: "Modelos em produção",
          d: "Pipelines de ML/NLP em Python na AWS Lambda — extração de tópicos, classificação de conversas, consolidação multi-tenant e relatórios automatizados. MLflow, FastAPI, drift monitoring e model serving.",
          tags: ["Python", "NLP", "MLflow", "FastAPI", "Scikit-Learn", "AWS Lambda"],
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
      subtitle: "Da bancada de engenharia à IA na borda",
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
      subtitle: "Estou aberto a oportunidades de AI Engineer ou IoT/Edge AI, colaborações e boas conversas sobre engenharia. Minha caixa de entrada está sempre aberta.",
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
      built:  "AI Engineer & IoT Systems",
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
      community:  "Community",
      contact:    "Contact",
    },
    hero: {
      kicker:       "Open to new opportunities",
      name:         "Oséias Farias",
      role:         "AI Engineer · IoT Systems & Cloud AI (AWS)",
      lede:         "I connect edge hardware to AI in production: ESP32 and Raspberry Pi firmware, MQTT and event-driven serverless architectures on AWS. I'm building Otensor, a SaaS platform for intelligent IoT automation. Pursuing two master's degrees in AI applied to control systems.",
      ctaPrimary:   "View projects",
      ctaSecondary: "Download CV",
      location:     "Brazil · Remote",
    },
    about: {
      title: "About",
      lede:  "An electrical engineer who moved into software — and never let go of the hardware. My work today sits at the intersection of embedded systems, AI in production and serverless AWS architectures.",
      paras: [
        "I'm building <strong>Otensor</strong>, a multi-tenant SaaS platform for intelligent IoT automation — the \"Arduino of IoT with AI\". ESP32 firmware and a Raspberry Pi agent publishing telemetry over MQTT, an intelligent automation engine and LLM/STT/TTS integration, all running locally in Docker or on AWS. MVP validated end to end on physical hardware.",
        "I worked as an <strong>AI Developer at Verzel</strong>, on the <strong>Lunella/RosanaDesk</strong> platform — a multi-tenant SaaS with 9+ microservices in production. I architected ML/NLP pipelines in Python on AWS Lambda for topic extraction and classification from conversational data, integrated LLM agents (TaskingAI) and a voice assistant (VAPI, STT→LLM→TTS pipeline), and built a reactive Java backend (Quarkus, PostgreSQL, Redis, Keycloak).",
        "In parallel I'm a Master's researcher in <strong>Electrical Engineering (UFABC)</strong> — artificial antifragility with adaptive control (PI, LQR, H∞), fault detection and isolation (FDI/EKF/UKF/CUSUM) and LLM agents (CrewAI) integrated via ZeroMQ in Hardware-in-the-Loop. Also a researcher at <strong>UFPA</strong> in model-free predictive control and Deep RL/DQN for power converters.",
        "I'm looking for an <strong>AI Engineer</strong> or <strong>IoT/Edge AI</strong> role in a structured team where I can go deep on engineering intelligent systems that talk to the physical world.",
      ],
    },
    focus: {
      title:    "What I'm strong at",
      subtitle: "Four reinforcing fronts",
      pillars: [
        {
          k: "IoT & Edge",
          t: "Hardware that talks to the cloud",
          d: "ESP32 firmware and Raspberry Pi agents publishing telemetry over MQTT, with resilient reconnection and automations firing at the edge. From sensor reading to live dashboard, validated on physical hardware.",
          tags: ["ESP32", "Raspberry Pi", "MQTT", "C/C++", "RTOS", "Docker"],
        },
        {
          k: "ML/NLP",
          t: "Models in production",
          d: "ML/NLP pipelines in Python on AWS Lambda — topic extraction, conversation classification, multi-tenant consolidation and automated reporting. MLflow, FastAPI, drift monitoring and model serving.",
          tags: ["Python", "NLP", "MLflow", "FastAPI", "Scikit-Learn", "AWS Lambda"],
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
      subtitle: "From the engineering bench to AI at the edge",
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
      subtitle: "I'm open to AI Engineer or IoT/Edge AI opportunities, collaborations and good conversations about engineering. My inbox is always open.",
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
      built:  "AI Engineer & IoT Systems",
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
    id:          "ufabc",
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
    id:          "ufpa",
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
      id:       "otensor",
      title:    pt ? "Otensor — Plataforma IoT com IA" : "Otensor — IoT Platform with AI",
      year:     "2026",
      category: pt ? "IoT · Edge · IA · Cloud" : "IoT · Edge · AI · Cloud",
      featured: true,
      status:   pt ? "em construção" : "building",
      metrics: [
        { label: pt ? "Hardware Validado" : "Hardware Validated", value: "ESP32 & RPi" },
        { label: pt ? "Protocolo" : "Protocol", value: "MQTT Event-Driven" },
        { label: pt ? "Deploy" : "Deploy", value: "Docker & AWS" },
      ],
      problem:  pt
        ? "O maker e a indústria frequentemente têm sensores e microcontroladores falando com brokers MQTT soltos, sem orquestração inteligente de dados e com plataformas em nuvem que cobram caro por mensagem e tratam IA como recurso externo."
        : "Makers and industry face disconnected sensors talking to ad-hoc MQTT brokers, lacking smart orchestration and locked into cloud platforms that charge per message with AI as an expensive add-on.",
      solution: pt
        ? "Plataforma SaaS multi-tenant que une firmware de borda (ESP32/RPi), broker MQTT, motor de automação inteligente e integração LLM/STT/TTS. Opera 100% local em Docker durante desenvolvimento e escala transparentemente para AWS Lambda em produção."
        : "Multi-tenant SaaS platform integrating edge firmware (ESP32/RPi), an MQTT broker, an intelligent automation engine, and LLM/STT/TTS integration. Runs 100% locally in Docker and scales smoothly to AWS Lambda in production.",
      impact: pt
        ? "MVP validado ponta a ponta com hardware físico: telemetria em tempo real, automação com decisão autônoma de borda e documentação técnica pública ativa."
        : "MVP validated end-to-end on physical hardware: live telemetry, edge-driven autonomous decision-making, and active public documentation.",
      tags:  ["Python", "ESP32", "Raspberry Pi", "MQTT", "AWS Lambda", "Docker", "LLMs"],
      link:  "https://docs.otensor.com.br",
    },
    {
      id:       "animaflow",
      title:    "animaflow — Visualização Declarativa de Arquitetura",
      year:     "2025–2026",
      category: pt ? "Open Source · Developer Tools · Python" : "Open Source · Developer Tools · Python",
      featured: true,
      status:   "open source",
      image:    "/assets/animaflow_stream.gif",
      metrics: [
        { label: pt ? "Render" : "Render", value: "Manim, SVG & Canvas" },
        { label: pt ? "Publicação" : "Package", value: "PyPI Package" },
        { label: pt ? "Docs" : "Docs", value: "Material MkDocs" },
      ],
      problem:  pt
        ? "Criar diagramas de arquitetura animados (como pipelines orientados a eventos, enxames multi-agente e RAG) exige ferramentas manuais ou pós-produção em vídeo pesada e não versionável em Git."
        : "Creating animated architecture diagrams (event-driven pipelines, multi-agent swarms, RAG) requires manual video editing tools that cannot be versioned as code in Git.",
      solution: pt
        ? "Framework Python para diagramas e fluxogramas declarativos, animados e programáveis. Projete o fluxo técnico uma única vez em código e renderize para animação matemática com Manim (MP4/GIF), Web Canvas/SVG interativo ou Remotion."
        : "Declarative Python framework for animated, programmable technical architecture diagrams. Design workflows once in code and render to Manim (MP4/GIF), interactive Web Canvas/SVG, or Remotion.",
      impact: pt
        ? "Publicado no PyPI com documentação interativa completa e suporte a streaming contínuo de partículas e orquestração multi-agente."
        : "Published on PyPI with complete interactive documentation and native support for continuous particle streaming and multi-agent DAGs.",
      tags:  ["Python", "Manim", "PyPI", "SVG", "Dataflow", "Multi-Agent"],
      link:  "https://oseiasdfarias.github.io/animaflow/",
      github: "https://github.com/Oseiasdfarias/animaflow",
    },
    {
      id:       "lab-virtual",
      title:    pt ? "Laboratório Virtual — Aeropêndulo & Gêmeo Digital" : "Virtual Lab — Aeropendulum & Digital Twin",
      year:     "2023–2026",
      category: pt ? "Hardware · Gêmeo Digital 3D · Controle" : "Hardware · 3D Digital Twin · Control",
      featured: true,
      status:   pt ? "concluído / docs" : "shipped / docs",
      image:    "/assets/aeropendulo_gemeo_digital.png",
      metrics: [
        { label: pt ? "Hardware" : "Hardware", value: "ESP32 + Planta Real" },
        { label: pt ? "Ambiente 3D" : "3D Engine", value: "VPython & Three.js" },
        { label: pt ? "Publicação" : "Paper", value: "BDM / UFPA" },
      ],
      problem:  pt
        ? "O ensino de engenharia de controle frequentemente carece de experimentos físicos interativos e acessíveis remotamente para validação de leis de controle em malha fechada."
        : "Control engineering education lacks accessible, remote-friendly dynamic experimental platforms for validating closed-loop control laws.",
      solution: pt
        ? "Plataforma aberta completa com protótipo físico (aeropêndulo instrumentado com ESP32), interface gráfica para aquisição de sinais de ensaio em tempo real e Gêmeo Digital 3D que espelha o movimento e dinâmica angular do braço mecânico."
        : "Complete open-source platform uniting a physical instrumented aeropendulum (ESP32), a real-time signal acquisition GUI, and a 3D Digital Twin reproducing the mechanical arm dynamics in real time.",
      impact: pt
        ? "Monografia oficial na biblioteca da UFPA e documentação técnica detalhada no ar, abrangendo equacionamento físico, identificação de sistemas e simulações interativas."
        : "Official engineering thesis at UFPA library and active online documentation covering mathematical modeling, system identification, and live simulations.",
      tags:  ["ESP32", "Python", "VPython", "Gêmeo Digital", "Controle", "C++", "Three.js"],
      link:  "https://oseiasdfarias.github.io/lab-virtual/",
      github: "https://github.com/Oseiasdfarias/lab-virtual",
    },
    {
      id:       "lunella",
      title:    pt ? "Lunella/RosanaDesk — Plataforma de IA Conversacional" : "Lunella/RosanaDesk — Conversational AI Platform",
      year:     "2025–2026",
      category: pt ? "ML/NLP · Serverless · Cloud AWS" : "ML/NLP · Serverless · AWS Cloud",
      featured: true,
      status:   pt ? "em produção" : "in production",
      metrics: [
        { label: pt ? "Microsserviços" : "Microservices", value: "9+ em Prod" },
        { label: pt ? "Arquitetura" : "Architecture", value: "AWS Serverless" },
        { label: pt ? "IA & Voz" : "AI & Voice", value: "STT→LLM→TTS" },
      ],
      problem:  pt
        ? "Plataforma SaaS multi-tenant de alto volume com necessidade de extrair tópicos conversacionais, detectar intenções e reter histórico operacional com latência reduzida."
        : "High-volume multi-tenant SaaS platform needing real-time topic extraction, intent detection, and actionable intelligence with low operational latency.",
      solution: pt
        ? "Arquitetura serverless event-driven desacoplada na AWS (API Gateway → SNS → SQS FIFO → Lambda → EventBridge). Pipelines de ML/NLP em Python, orquestração de agentes LLM (TaskingAI) e integração de voz bidirecional (VAPI). Backend reativo com Java Quarkus, PostgreSQL, Redis e Keycloak."
        : "Decoupled event-driven serverless architecture on AWS (API Gateway → SNS → SQS FIFO → Lambda → EventBridge). Python ML/NLP pipelines, LLM agent orchestration (TaskingAI), and real-time voice integration (VAPI). Reactive backend with Quarkus, PostgreSQL, Redis, and Keycloak.",
      impact: pt
        ? "Pipelines em produção processando relatórios automatizados diários/mensais por tenant com zero intervenção manual e escalabilidade elástica por demanda."
        : "Production pipelines generating automated tenant insights and reports daily/monthly with zero manual intervention and elastic auto-scaling.",
      tags:  ["Python", "AWS Lambda", "SQS FIFO", "NLP", "Java Quarkus", "Redis", "PostgreSQL"],
      link:  "",
    },
    {
      id:       "calculator",
      title:    "Scientific Calculator — AI-Assisted Architecture MVP",
      year:     "2025",
      category: pt ? "GenAI Engineering · TypeScript · UI" : "GenAI Engineering · TypeScript · UI",
      featured: false,
      status:   "open source",
      problem:  pt
        ? "Demonstrar na prática a velocidade, precisão e viabilidade técnica no desenvolvimento de software e MVPs completos orquestrados com agentes avançados de IA (Claude e superpoderes)."
        : "Demonstrate practical speed, rigor, and software architecture viability when bootstrapping complex functional MVPs with AI agent workflows (Claude and superpowers).",
      solution: pt
        ? "Calculadora científica completa construída através de engenharia assistida por LLM: renderização precisa de operações matemáticas avançadas, histórico de cálculos, design responsivo moderno e arquitetura modular em TypeScript."
        : "Full-featured scientific calculator engineered via LLM agent pairing: advanced mathematical parsing, persistent calculation logs, modern responsive UI, and modular TypeScript architecture.",
      impact: pt
        ? "Case prático de produtividade extrema e desenvolvimento acelerado mantendo código limpo, componentização escalável e publicação aberta."
        : "Practical case study showcasing accelerated development velocity and clean code architecture produced with advanced agentic pairing.",
      tags:  ["TypeScript", "React", "TailwindCSS", "Claude AI", "Agentic Coding"],
      link:  "https://github.com/Oseiasdfarias/scientific-calculator",
      github: "https://github.com/Oseiasdfarias/scientific-calculator",
    },
    {
      id:       "nlp-pipeline",
      title:    pt ? "Pipeline NLP Serverless — Análise em Tempo Real" : "Serverless NLP Pipeline — Real-Time Analysis",
      year:     "2026",
      category: pt ? "ML/NLP · Cloud AI" : "ML/NLP · Cloud AI",
      featured: false,
      status:   pt ? "em produção" : "in production",
      metrics: [
        { label: pt ? "Processamento" : "Processing", value: "Event-Driven" },
        { label: pt ? "Saída" : "Output", value: "Slack & PDF" },
      ],
      problem:  pt
        ? "Necessidade de classificação e sumarização contínua de diálogos em streaming sem sobrecarregar a infraestrutura central de banco de dados."
        : "Need for continuous stream dialog classification and summarization without stressing the central database infrastructure.",
      solution: pt
        ? "Consumo assíncrono de filas SQS via funções AWS Lambda otimizadas, executando modelos leves de NLP, persistência seletiva no PostgreSQL e envio automatizado de insights."
        : "Asynchronous consumption of SQS queues via optimized AWS Lambda functions running lightweight NLP models with selective PostgreSQL persistence and Slack notifications.",
      impact: pt
        ? "Automação total de relatórios de métricas e extração de padrões conversacionais com economia substancial de custos de computação serverless."
        : "Total automation of conversational pattern extraction and metric reporting with significant serverless computing cost savings.",
      tags:  ["Python", "AWS Lambda", "SQS", "NLP", "PostgreSQL"],
      link:  "",
    },
    {
      id:       "fastapi",
      title:    "Full FastAPI REST & MLOps Foundation",
      year:     "2024",
      category: pt ? "Backend · MLOps" : "Backend · MLOps",
      featured: false,
      status:   "open source",
      problem:  pt
        ? "Entregar inferência de modelos de Machine Learning com padrões enterprise de robustez, cobertura de testes e CI/CD reprodutível."
        : "Delivering ML model inference with enterprise-grade robustness, test coverage, and reproducible CI/CD pipelines.",
      solution: pt
        ? "API REST com FastAPI e SQLAlchemy, suporte a migrações com Alembic, containerização Docker multi-stage e automação de testes com Pytest no GitHub Actions."
        : "REST API with FastAPI and SQLAlchemy, Alembic migrations, multi-stage Docker builds, and automated Pytest workflows via GitHub Actions.",
      impact: pt
        ? "Template estruturado para serving de modelos de ML com garantia de contratos de dados e integração contínua."
        : "Structured template for ML model serving with data contracts and automated continuous integration.",
      tags:  ["Python", "FastAPI", "Docker", "PostgreSQL", "Pytest", "CI/CD"],
      link:  "https://github.com/Oseiasdfarias/full_fast_api",
      github: "https://github.com/Oseiasdfarias/full_fast_api",
    },
    {
      id:       "forum-hub",
      title:    "API Fórum Hub & Arquitetura Spring Boot",
      year:     "2024",
      category: "Backend · Java",
      featured: false,
      status:   pt ? "concluído" : "shipped",
      problem:  pt
        ? "Arquitetura backend stateless com autenticação segura JWT e versionamento rigoroso de esquema de banco de dados relacional."
        : "Stateless backend architecture requiring secure JWT auth and strict relational database schema versioning.",
      solution: pt
        ? "API em Spring Boot 3 com Spring Security, controle de acessos via JWT, migrações versionadas com Flyway e testes unitários em JUnit 5."
        : "Spring Boot 3 API with Spring Security, JWT access control, Flyway schema migrations, and JUnit 5 testing.",
      impact: pt
        ? "Concluído como projeto de destaque da trilha Oracle Next Education com arquitetura limpa e rastreabilidade total."
        : "Completed as standout project in the Oracle Next Education track with clean architecture and schema traceability.",
      tags:  ["Java", "Spring Boot", "Spring Security", "MySQL", "Flyway", "JWT"],
      link:  "https://github.com/Oseiasdfarias/forum_hub_challenge",
      github: "https://github.com/Oseiasdfarias/forum_hub_challenge",
    },
  ];
};

// ─── Experience ────────────────────────────────────────────────────────────
export const getExperience = (lang: Language): ExperienceData[] => {
  const pt = lang === 'pt';
  return [
    {
      title:       pt ? "Fundador & Engenheiro IoT / IA"                 : "Founder & Lead IoT / AI Engineer",
      company:     "Otensor",
      period:      pt ? "2025 — presente"                               : "2025 — Present",
      type:        "industry",
      current:     true,
      description: pt
        ? "Concepção, arquitetura e desenvolvimento da plataforma SaaS multi-tenant Otensor. Firmware C/C++ e Python em ESP32 e Raspberry Pi com telemetria MQTT resiliente, motor de automação inteligente disparado na borda e orquestração de LLMs/voz (STT→LLM→TTS). Infraestrutura híbrida local em Docker e em nuvem serverless na AWS."
        : "Design, architecture, and engineering of the Otensor multi-tenant SaaS platform. C/C++ and Python firmware on ESP32 and Raspberry Pi with resilient MQTT telemetry, edge-triggered intelligent rule engine, and LLM/voice orchestration (STT→LLM→TTS). Hybrid infrastructure spanning local Docker environments and AWS serverless cloud.",
      tags: ["Python", "ESP32", "Raspberry Pi", "MQTT", "AWS", "Docker", "LLM", "RTOS"],
    },
    {
      title:       pt ? "Desenvolvedor de IA"                           : "AI Developer",
      company:     "Verzel · Lunella/RosanaDesk",
      period:      pt ? "dez 2025 — jun 2026"                          : "Dec 2025 — Jun 2026",
      type:        "industry",
      current:     false,
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
      id:          "ufabc",
      title:       pt ? "Mestrado em Engenharia Elétrica e de Informação" : "M.Sc. Electrical and Information Engineering",
      institution: "UFABC",
      period:      "2025 — 2027",
      description: pt
        ? "Antifragilidade artificial · controle adaptativo (LQR, H∞) · FDI/Kalman · agentes LLM (CrewAI) · ZeroMQ · FPGA/FPAA (HIL)"
        : "Artificial antifragility · adaptive control (LQR, H∞) · FDI/Kalman · LLM agents (CrewAI) · ZeroMQ · FPGA/FPAA (HIL)",
    },
    {
      id:          "ufpa",
      title:       pt ? "Mestrado em Computação Aplicada"               : "M.Sc. Applied Computing",
      institution: "UFPA",
      period:      "2025 — 2027",
      description: pt
        ? "Controle preditivo model-free · Deep RL/DQN · eletrônica de potência · identificação de sistemas · visão computacional"
        : "Model-free predictive control · Deep RL/DQN · power electronics · system identification · computer vision",
    },
    {
      id:          "ufpa",
      title:       pt ? "Bacharelado em Engenharia Elétrica"            : "B.Sc. Electrical Engineering",
      institution: "UFPA",
      period:      "2017 — 2024",
      description: pt
        ? "TCC: gêmeo digital para laboratório virtual de controle de sistemas dinâmicos"
        : "Thesis: digital twin for a virtual control lab for dynamic systems",
    },
    {
      id:          "ifma",
      title:       pt ? "Especialização — Sistemas Embarcados IoT"      : "Specialization — Embedded IoT Systems",
      institution: "IFMA",
      period:      "2024 — 2025",
      description: "Microcontrollers · C/C++ · IoT · RTOS",
    },
    {
      id:          "oracle",
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
  // ML / IA / Cloud — mais recentes e relevantes primeiro
  { title: "REST APIs com Python e Flask",                              issuer: "Udemy",              date: "out 2025", category: "backend", link: "https://udemy.com/certificate/UC-563dd22a-5969-472b-903f-810314964a90" },
  { title: "EBA — Estatística do Básico ao Avançado",                  issuer: "EBA",                date: "abr 2025", category: "ai" },
  { title: "AWS Lambda com Python e Serverless Framework",              issuer: "Udemy",              date: "abr 2024", category: "cloud", link: "https://udemy.com/certificate/UC-e9b6a86d-443f-47a8-81b9-9f4f46a20ef8" },
  { title: "AWS Machine Learning Foundations",                          issuer: "Udacity",            date: "out 2021", category: "cloud" },
  { title: "Aprendizagem por Reforço com Deep Learning, PyTorch e Python", issuer: "Udemy",          date: "2021", category: "ai", link: "https://udemy.com/certificate/UC-0e7a0cc8-54f6-4720-bd15-740088404273" },
  { title: "Machine Learning e Data Science com Python de A a Z",      issuer: "Udemy",              date: "2021", category: "ai", link: "https://udemy.com/certificate/UC-e38f3500-7c76-40d9-aa3d-414dfc3a9d9c" },
  { title: "Deep Learning com Python de A a Z — O Curso Completo",     issuer: "Udemy",              date: "2021", category: "ai", link: "https://udemy.com/certificate/UC-63c2f666-44e2-4525-a0f3-a6a05df483b6" },
  { title: "Manual Prático do Deep Learning — Redes Neurais Profundas",issuer: "Udemy",              date: "2021", category: "ai", link: "https://udemy.com/certificate/UC-c7e188bb-d877-401e-b7de-b2d7e21ba584" },
  { title: "Redes Neurais Artificiais em Python",                       issuer: "Udemy",              date: "2021", category: "ai", link: "https://udemy.com/certificate/UC-26899d66-2d96-474d-8194-dccdee108035" },
  { title: "Machine Learning com Spark e PySpark: o Curso Completo",   issuer: "Udemy",              date: "2021", category: "ai", link: "https://udemy.com/certificate/UC-d57f72b3-2a1f-480b-8294-5c6fcbdca523" },
  { title: "Detecção de Objetos com YOLO, Darknet, OpenCV e Python",   issuer: "Udemy",              date: "2021", category: "ai", link: "https://udemy.com/certificate/UC-328f4454-77d0-44de-b032-8d1e5a4cc923" },
  { title: "Capacitação em Inteligência Artificial",                    issuer: "IFAL",               date: "jan 2021", category: "ai" },
  // Cloud / Backend
  { title: "Certificação Amazon AWS para Iniciantes",                   issuer: "Udemy",              date: "dez 2023", category: "cloud", link: "https://udemy.com/certificate/UC-e5431d02-ba73-4cde-ab87-ce987e558d55" },
  { title: "Formação Oracle Cloud Infrastructure — ONE",                issuer: "Alura · Oracle ONE", date: "nov 2024", category: "cloud", link: "https://cursos.alura.com.br/certificate/72a32952-7dba-444c-bc8b-844b66bbd79f" },
  { title: "Programa Oracle Next Education — Back-end",                 issuer: "Alura · Oracle ONE", date: "jul 2024", category: "backend", link: "https://cursos.alura.com.br/certificate/deb0e367-c4ec-486d-9572-9eeb41e2bb63" },
  { title: "Formação Java Web: Spring Boot",                            issuer: "Alura",              date: "jun 2024", category: "backend", link: "https://cursos.alura.com.br/certificate/55e5774e-576a-4bf4-859e-db5ee59c35da" },
  { title: "Formação Java e Orientação a Objetos — ONE",                issuer: "Alura · Oracle ONE", date: "abr 2024", category: "backend", link: "https://cursos.alura.com.br/certificate/ad767b4a-af1d-4cd8-829b-90ec96db2e83" },
  { title: "Formação SQL com MySQL Server da Oracle",                   issuer: "Alura · Oracle ONE", date: "nov 2024", category: "backend", link: "https://cursos.alura.com.br/certificate/509b46f9-e68c-4e9b-b41f-06f3889f1f8b" },
  // Sistemas Embarcados
  { title: "Capacitação Profissional em Sistemas Embarcados (160h)",    issuer: "IFMA · SOFTEX",      date: "nov 2024", category: "embedded" },
  // Fundamentos de programação
  { title: "Python 3 do Básico ao Avançado (com projetos reais)",       issuer: "Udemy",              date: "jan 2021", category: "dev", link: "https://udemy.com/certificate/UC-a3b4a8cd-1d0d-4238-ba05-b92c0558d1e8" },
  { title: "Curso de Shell Script do Iniciante ao Avançado",            issuer: "Udemy",              date: "2021", category: "dev", link: "https://udemy.com/certificate/UC-f7ab28e8-928a-4b9f-a672-bf722c0c5493" },
  { title: "Aprendendo C++ — Básico ao Avançado",                       issuer: "Udemy",              date: "2021", category: "dev", link: "https://udemy.com/certificate/UC-54fbb592-d496-45ef-879f-55530fa29b96" },
  { title: "Programação Orientada a Objetos em C++",                    issuer: "Udemy",              date: "2021", category: "dev", link: "https://udemy.com/certificate/UC-a926438a-7437-4633-8339-75bb7d7c7f0b" },
  { title: "Introdução à Ciência da Computação com Python — Parte 2",   issuer: "Coursera · IME USP", date: "nov 2020", category: "dev", link: "https://coursera.org/verify/H6MVL62HNL2M" },
  { title: "Introdução à Ciência da Computação com Python — Parte 1",   issuer: "Coursera · IME USP", date: "abr 2020", category: "dev", link: "https://coursera.org/verify/HYE73UXFY7G4" },
  { title: "Git e GitHub: compartilhando e colaborando em projetos",    issuer: "Alura",              date: "jan 2024", category: "dev", link: "https://cursos.alura.com.br/certificate/95e10d93-4b98-4e9a-8d99-6e8b524c91f4" },
];
