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
      kicker:       "Aberto a vagas remotas",
      name:         "Oséias Farias",
      role:         "Machine Learning & AI Engineer · MLOps",
      lede:         "Construo sistemas de IA que mantêm sistemas físicos funcionando: detectam quando algo falha e ajudam a corrigir, em produção. Engenheiro eletricista que migrou para software e IA, com agentes LLM, MLOps e arquiteturas serverless na AWS.",
      ctaPrimary:   "Ver projetos",
      ctaSecondary: "Currículo",
      location:     "Brasil · Remoto",
    },
    about: {
      title: "Sobre",
      lede:  "Engenheiro eletricista que migrou para software e nunca largou o hardware. Comecei em plantas industriais, por isso me importo com o sistema em volta do modelo, não só com o modelo.",
      paras: [
        "<strong>Pesquisa aplicada (UFABC, projeto financiado pela AFOSR):</strong> construí um <strong>supervisor multiagente</strong> que detecta falhas num conversor de energia e reconfigura o controlador sozinho, e o software que liga a planta simulada e real (Simulink, hardware-in-the-loop) ao supervisor. Primeiro autor do artigo aceito no <strong>CBA 2026</strong>.",
        "<strong>Produção (Verzel):</strong> como <strong>Desenvolvedor Backend & IA</strong>, entreguei funções de voz com IA e integrações multi-tenant na plataforma de agentes de IA <strong>Lunella</strong>, com Java (Quarkus), Vue.js e serviços serverless na AWS.",
        "<strong>Open source:</strong> autor do <strong>Synapsys</strong> (PyPI), framework que une controle e machine learning, com 501 testes e 100% de cobertura, e do <strong>Youfy</strong>, laboratório de MLOps com DVC, MLflow e registro de modelos.",
        "<strong>IoT (Otensor):</strong> plataforma de automação que liga ESP32 e Raspberry Pi a um painel em tempo real e a um motor de automações, validada de ponta a ponta em hardware real.",
      ],
    },
    focus: {
      title:    "No que sou forte",
      subtitle: "Quatro frentes de engenharia que se conectam",
      pillars: [
        { k: "MLOps", t: "Ciclo de vida de modelos", d: "Dados versionados (DVC), treino reprodutível rastreado no MLflow, registro de modelos com portão de promoção e serving que recusa entradas fora da especificação. Testes automatizados e CI.", tags: ["Python", "DVC", "MLflow", "PyTorch", "Pytest", "Docker"] },
        { k: "AI & Agentes", t: "Agentes LLM com ferramentas", d: "Agentes que chamam APIs reais (CRM, agenda), funções de voz com IA (ElevenLabs, VAPI, Twilio) e plataforma de agentes multi-tenant em produção.", tags: ["LLM agents", "TaskingAI", "OpenAI API", "VAPI", "ElevenLabs", "FastAPI"] },
        { k: "Cloud & Back-end", t: "Serverless e microsserviços na AWS", d: "Serviços orientados a eventos com Lambda, SQS e DynamoDB, back-end Java reativo (Quarkus), GraphQL, PostgreSQL e Redis, com infraestrutura como código e CI/CD.", tags: ["AWS Lambda", "SQS", "Quarkus", "GraphQL", "PostgreSQL", "Redis"] },
        { k: "Sistemas físicos", t: "Do sensor à nuvem", d: "Controle e detecção de falhas (LQR, H∞, Kalman, CUSUM), Simulink com software-in-the-loop e hardware-in-the-loop, firmware em ESP32 e telemetria MQTT.", tags: ["Simulink", "HIL", "ZeroMQ", "ESP32", "MQTT", "FPGA/FPAA"] },
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
      subtitle: "Estou aberto a oportunidades em Machine Learning Engineering, MLOps e AI Engineering, parcerias técnicas e projetos de engenharia. Minha caixa de entrada está sempre aberta.",
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
      built:  "Machine Learning & AI Engineer · MLOps",
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
      kicker:       "Open to remote roles",
      name:         "Oséias Farias",
      role:         "Machine Learning & AI Engineer · MLOps",
      lede:         "I build AI systems that keep physical systems running: they detect when something fails and help fix it, in production. Electrical engineer turned software and AI engineer, working with LLM agents, MLOps and serverless architectures on AWS.",
      ctaPrimary:   "View projects",
      ctaSecondary: "CV",
      location:     "Brazil · Remote",
    },
    about: {
      title: "About",
      lede:  "Electrical engineer who moved into software and never left the hardware behind. I started in industrial plants, so I care about the system around the model, not only the model.",
      paras: [
        "<strong>Applied research (UFABC, AFOSR-funded project):</strong> I built a <strong>multi-agent supervisor</strong> that detects faults in a power converter and reconfigures its controller on its own, plus the software that connects the simulated and real plant (Simulink, hardware-in-the-loop) to the supervisor. First author of the paper accepted at <strong>CBA 2026</strong>.",
        "<strong>Production (Verzel):</strong> as a <strong>Backend & AI Developer</strong>, I delivered voice AI features and multi-tenant integrations for <strong>Lunella</strong>, an AI agent platform, with Java (Quarkus), Vue.js and AWS serverless services.",
        "<strong>Open source:</strong> author of <strong>Synapsys</strong> (PyPI), a framework that joins control systems and machine learning, with 501 tests and 100% coverage, and of <strong>Youfy</strong>, an MLOps lab with DVC, MLflow and a model registry.",
        "<strong>IoT (Otensor):</strong> an automation platform that connects ESP32 and Raspberry Pi devices to a real-time dashboard and an automation engine, validated end to end on real hardware.",
      ],
    },
    focus: {
      title:    "What I'm strong at",
      subtitle: "Four interconnected engineering fronts",
      pillars: [
        { k: "MLOps", t: "Model lifecycle", d: "Versioned data (DVC), reproducible training tracked in MLflow, a model registry with a promotion gate and serving that rejects inputs outside the spec. Automated tests and CI.", tags: ["Python", "DVC", "MLflow", "PyTorch", "Pytest", "Docker"] },
        { k: "AI & Agents", t: "LLM agents with tools", d: "Agents that call real APIs (CRM, calendar), voice AI features (ElevenLabs, VAPI, Twilio) and a multi-tenant AI agent platform in production.", tags: ["LLM agents", "TaskingAI", "OpenAI API", "VAPI", "ElevenLabs", "FastAPI"] },
        { k: "Cloud & Back end", t: "Serverless and microservices on AWS", d: "Event-driven services with Lambda, SQS and DynamoDB, a reactive Java back end (Quarkus), GraphQL, PostgreSQL and Redis, with infrastructure as code and CI/CD.", tags: ["AWS Lambda", "SQS", "Quarkus", "GraphQL", "PostgreSQL", "Redis"] },
        { k: "Physical systems", t: "From sensor to cloud", d: "Control and fault detection (LQR, H∞, Kalman, CUSUM), Simulink with software-in-the-loop and hardware-in-the-loop, ESP32 firmware and MQTT telemetry.", tags: ["Simulink", "HIL", "ZeroMQ", "ESP32", "MQTT", "FPGA/FPAA"] },
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
      subtitle: "I'm open to Machine Learning Engineering, MLOps, and AI Engineering opportunities, technical collaborations, and engineering discussions. My inbox is always open.",
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
      built:  "Machine Learning & AI Engineer · MLOps",
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
    institution: "UFABC · AFOSR",
    period:      lang === 'pt' ? "abr 2025 — presente" : "Apr 2025 — Present",
    ongoing:     true,
    description: lang === 'pt'
      ? "Supervisão adaptativa de um conversor Buck: um sistema multiagente (JADE) detecta anomalias (observador de Luenberger, CUSUM adaptativo), identifica o modelo online e reconfigura o controlador (LQR ou H∞) com troca a quente sem salto. Planta no Simulink ligada ao Python por software-in-the-loop e validação em hardware-in-the-loop (FPGA/FPAA). Projeto financiado pela AFOSR (Força Aérea dos EUA)."
      : "Adaptive supervision of a buck converter: a multi-agent system (JADE) detects anomalies (Luenberger observer, adaptive CUSUM), identifies the model online and reconfigures the controller (LQR or H∞) with a bumpless hot swap. Simulink plant coupled to Python by software-in-the-loop, with hardware-in-the-loop validation (FPGA/FPAA). Funded by the U.S. Air Force Office of Scientific Research (AFOSR).",
    tags: ["Python", "JADE", "CUSUM", "LQR / H∞", "Simulink", "ZeroMQ", "HIL"],
  },
  {
    id:          "ufpa",
    title: lang === 'pt'
      ? "Controle Preditivo e Deep RL para Eletrônica de Potência"
      : "Predictive Control and Deep RL for Power Electronics",
    institution: "UFPA · PPCA",
    period:      lang === 'pt' ? "2025 — presente" : "2025 — Present",
    ongoing:     true,
    description: lang === 'pt'
      ? "Controle preditivo e aprendizado por reforço profundo (DQN) para conversores de eletrônica de potência, com identificação de sistemas online (ARX via RLS). Artigo aceito no CBA 2026 sobre FCS-MPC robusto a variações paramétricas em inversores conectados à rede."
      : "Predictive control and deep reinforcement learning (DQN) for power electronics converters, with online system identification (ARX via RLS). Paper accepted at CBA 2026 on FCS-MPC robust to parameter variations in grid-connected inverters.",
    tags: ["PyTorch", "Deep RL", "DQN", "TensorFlow", "Embedded AI"],
  },
];

// ─── Projects ──────────────────────────────────────────────────────────────
export const getProjects = (lang: Language): ProjectData[] => {
  const pt = lang === 'pt';
  return [
    {
      id:       "youfy",
      title:    pt ? "Youfy: laboratório de MLOps" : "Youfy: MLOps lab",
      year:     "2026",
      category: pt ? "MLOps · ML · Áudio" : "MLOps · ML · Audio",
      featured: true,
      status:   pt ? "em andamento" : "in progress",
      image:    "/assets/youfy_pipeline.svg",
      metrics: [
        { label: pt ? "Testes" : "Tests", value: "109 no CI" },
        { label: pt ? "Rastreamento" : "Tracking", value: "MLflow + DVC" },
        { label: pt ? "Promoção" : "Promotion", value: pt ? "Portão automático" : "Automated gate" },
      ],
      problem:  pt
        ? "Modelos de ML costumam funcionar no notebook e falhar em produção: vazamento entre treino e teste, diferença entre treino e serving e modelos novos substituindo os bons por acaso."
        : "ML models often work in a notebook and fail in production: leakage between train and test, training/serving skew, and new models replacing good ones by chance.",
      solution: pt
        ? "Um app de música que existe para dar trabalho real aos modelos: dados versionados com DVC, divisão por artista verificada por testes de propriedade, treino determinístico rastreado no MLflow, registro de modelos com portão de promoção e serving que valida a especificação de features."
        : "A music app that exists to give models a real job: DVC-versioned data, artist-disjoint splits verified by property tests, deterministic training tracked in MLflow, a model registry with a promotion gate and serving that validates the feature spec.",
      impact: pt
        ? "Ciclo de dados e treino fechado, com 109 testes no CI. Próximos passos: API de inferência e monitoramento de drift."
        : "Data and training loop closed, with 109 tests in CI. Next: an inference API and drift monitoring.",
      tags:  ["Python", "PyTorch", "MLflow", "DVC", "Hypothesis", "PostgreSQL"],
      link:  "https://oseiasdfarias.github.io/youfy/",
      github: "https://github.com/Oseiasdfarias/youfy",
    },
    {
      id:       "sdr-agent",
      title:    pt ? "sdr-agent: agente LLM com ferramentas" : "sdr-agent: LLM agent with tools",
      year:     "2025",
      category: pt ? "Agentes LLM · Serverless" : "LLM agents · Serverless",
      featured: true,
      status:   "open source",
      image:    "/assets/sdr_agent_pipeline.svg",
      metrics: [
        { label: "Tools", value: pt ? "CRM + agenda" : "CRM + calendar" },
        { label: pt ? "Sessão" : "Session", value: "Redis" },
        { label: "Deploy", value: "Vercel" },
      ],
      problem:  pt
        ? "Qualificar leads e marcar reuniões exige um vendedor repetindo as mesmas perguntas e alternando entre CRM e agenda."
        : "Qualifying leads and booking meetings means a person repeating the same questions and switching between a CRM and a calendar.",
      solution: pt
        ? "Agente de vendas na API de Assistentes da OpenAI que conversa num chat web, registra o lead no Pipefy, busca horários livres e marca a reunião no Cal.com por chamadas de ferramentas. Back-end FastAPI serverless e sessão em Redis."
        : "A sales agent on the OpenAI Assistants API that talks in a web chat, records the lead in Pipefy, finds free slots and books the meeting in Cal.com through tool calls. Serverless FastAPI back end and Redis sessions.",
      impact: pt
        ? "Fluxo completo do primeiro contato à reunião marcada, sem intervenção humana (vídeo de demonstração no repositório)."
        : "Full flow from first message to a booked meeting with no human in the loop (demo video in the repository).",
      tags:  ["Python", "FastAPI", "OpenAI API", "Redis", "React"],
      link:  "",
      github: "https://github.com/Oseiasdfarias/oseias_desafio_elite_dev_ia",
    },
    {
      id:       "lab-virtual",
      title:    pt ? "Laboratório Virtual: aeropêndulo e gêmeo digital" : "Virtual Lab: aeropendulum and digital twin",
      year:     "2023–2026",
      category: pt ? "Hardware · Gêmeo Digital 3D · Controle" : "Hardware · 3D Digital Twin · Control",
      featured: true,
      status:   pt ? "concluído / docs" : "shipped / docs",
      image:    "/assets/aeropendulo_gemeo_digital.png",
      metrics: [
        { label: "Hardware", value: pt ? "ESP32 + planta real" : "ESP32 + real plant" },
        { label: pt ? "Ambiente 3D" : "3D engine", value: "VPython & Three.js" },
        { label: pt ? "Publicação" : "Thesis", value: "BDM / UFPA" },
      ],
      problem:  pt
        ? "O ensino de controle costuma ficar só na teoria, sem uma planta real e barata para testar leis de controle em malha fechada."
        : "Control courses often stay on paper, without a real, low-cost plant to test closed-loop control laws.",
      solution: pt
        ? "Plataforma aberta com protótipo físico (aeropêndulo com ESP32), firmware com PID rodando na placa, interface para ensaios em tempo real e um gêmeo digital 3D que acompanha o movimento medido."
        : "An open platform with a physical prototype (ESP32 aeropendulum), PID firmware running on the board, a desktop interface for real-time tests and a 3D digital twin that follows the measured motion.",
      impact: pt
        ? "Monografia na biblioteca da UFPA, artigo no COBENGE 2023 e documentação online com modelagem, identificação e controle."
        : "Thesis at the UFPA library, a COBENGE 2023 paper and online docs covering modeling, identification and control.",
      tags:  ["ESP32", "C++", "Python", "VPython", "PID", "Three.js"],
      link:  "https://oseiasdfarias.github.io/lab-virtual/",
      github: "https://github.com/Oseiasdfarias/lab-virtual",
    },
    {
      id:       "otensor",
      title:    pt ? "Otensor: plataforma de automação IoT" : "Otensor: IoT automation platform",
      year:     "2026",
      category: pt ? "IoT · Edge · Cloud" : "IoT · Edge · Cloud",
      featured: false,
      status:   pt ? "MVP" : "MVP",
      metrics: [
        { label: pt ? "Hardware validado" : "Hardware validated", value: "RPi 5 + Sense HAT" },
        { label: pt ? "Protocolo" : "Protocol", value: "MQTT" },
        { label: "Deploy", value: "Docker & AWS SAM" },
      ],
      problem:  pt
        ? "Sensores de maker e de indústria costumam ficar ligados a brokers MQTT soltos, sem orquestração e presos a plataformas que cobram por mensagem."
        : "Maker and industrial sensors often talk to ad-hoc MQTT brokers, with no orchestration and locked into platforms that charge per message.",
      solution: pt
        ? "Plataforma multi-tenant que liga dispositivos (ESP32, Raspberry Pi) a um painel em tempo real e a um motor de automações orientado a eventos. Roda 100% local em Docker e usa AWS SAM e Lambda na nuvem."
        : "A multi-tenant platform that connects devices (ESP32, Raspberry Pi) to a real-time dashboard and an event-driven automation engine. Runs fully local in Docker and uses AWS SAM and Lambda in the cloud.",
      impact: pt
        ? "Ciclo validado em hardware real: telemetria ao vivo, automação disparada por limiar e acionamento refletido no painel."
        : "Loop validated on real hardware: live telemetry, threshold-triggered automation and device actuation reflected in the dashboard.",
      tags:  ["Python", "ESP32", "Raspberry Pi", "MQTT", "AWS SAM", "Docker"],
      link:  "https://docs.otensor.com.br",
    },
    {
      id:       "animaflow",
      title:    pt ? "animaflow: diagramas de arquitetura como código" : "animaflow: architecture diagrams as code",
      year:     "2025–2026",
      category: "Open Source · Developer Tools · Python",
      featured: false,
      status:   "open source",
      image:    "/assets/animaflow_stream.gif",
      metrics: [
        { label: "Render", value: "Manim, SVG & Canvas" },
        { label: pt ? "Publicação" : "Package", value: "PyPI" },
      ],
      problem:  pt
        ? "Diagramas de arquitetura animados exigem edição manual de vídeo, que não dá para versionar no Git."
        : "Animated architecture diagrams usually need manual video editing that cannot be versioned in Git.",
      solution: pt
        ? "Biblioteca Python declarativa: descreva o fluxo uma vez em código e renderize com Manim (MP4/GIF) ou como HTML/SVG interativo."
        : "A declarative Python library: describe the flow once in code and render it with Manim (MP4/GIF) or as interactive HTML/SVG.",
      impact: pt
        ? "Publicada no PyPI, com documentação online e exemplos de pipelines orientados a eventos, multiagentes e RAG."
        : "Published on PyPI, with online docs and examples of event-driven, multi-agent and RAG pipelines.",
      tags:  ["Python", "Manim", "SVG", "JavaScript", "PyPI"],
      link:  "https://oseiasdfarias.github.io/animaflow/",
      github: "https://github.com/Oseiasdfarias/animaflow",
    },
  ];
};

// ─── Experience ────────────────────────────────────────────────────────────
export const getExperience = (lang: Language): ExperienceData[] => {
  const pt = lang === 'pt';
  return [
    {
      title:       pt ? "Engenheiro de IA e Pesquisador"                 : "AI Engineer & Researcher",
      company:     pt ? "UFABC · projeto financiado pela AFOSR"          : "UFABC · AFOSR-funded project",
      period:      pt ? "abr 2025 a presente"                            : "Apr 2025 to Present",
      type:        "research",
      current:     true,
      description: pt
        ? "Supervisor multiagente (JADE) que detecta anomalias num conversor de energia e reconfigura o controlador sozinho, com troca a quente sem salto (1º autor, CBA 2026). Software que liga a planta no Simulink e o hardware-in-the-loop (FPGA/FPAA) ao supervisor, com detecção de falhas em Python. Componentes distribuídos com ZeroMQ, memória compartilhada, contratos Pydantic e testes Pytest. Ponte entre o time de software e IA e o de hardware e controle."
        : "Multi-agent supervisor (JADE) that detects anomalies in a power converter and reconfigures its controller on its own, with a bumpless hot swap (first author, CBA 2026). Software that connects the Simulink plant and hardware-in-the-loop (FPGA/FPAA) to the supervisor, with fault detection in Python. Distributed components with ZeroMQ, shared memory, Pydantic contracts and Pytest suites. Bridge between the software and AI team and the hardware and control team.",
      tags: ["Python", "JADE", "Simulink", "HIL", "ZeroMQ", "Pydantic", "Pytest"],
    },
    {
      title:       pt ? "Fundador e Engenheiro Líder"                    : "Founder & Lead Engineer",
      company:     "Otensor IoT",
      period:      pt ? "jun 2026 a presente"                            : "Jun 2026 to Present",
      type:        "industry",
      current:     true,
      description: pt
        ? "Plataforma multi-tenant de automação IoT: dispositivos ESP32 e Raspberry Pi ligados a um painel em tempo real e a um motor de automações orientado a eventos, com AWS SAM e Lambda (Python). Ciclo completo validado em hardware real. Fase de MVP, documentação pública em docs.otensor.com.br."
        : "Multi-tenant IoT automation platform: ESP32 and Raspberry Pi devices connected to a real-time dashboard and an event-driven automation engine, with AWS SAM and Lambda (Python). Full loop validated on real hardware. MVP stage, public docs at docs.otensor.com.br.",
      tags: ["Python", "ESP32", "Raspberry Pi", "MQTT", "AWS SAM", "Docker"],
    },
    {
      title:       pt ? "Desenvolvedor Backend & IA"                     : "Backend & AI Developer",
      company:     "Verzel · Lunella",
      period:      pt ? "dez 2025 a jun 2026"                            : "Dec 2025 to Jun 2026",
      type:        "industry",
      current:     false,
      description: pt
        ? "Funcionalidades de ponta a ponta na Lunella, plataforma de agentes de IA: funções de voz em que cada empresa cliente conecta a própria conta de IA de voz, com chave guardada criptografada e prévia das vozes; integração com uma plataforma de agentes de voz para atendimento por telefone, com cadastro de números e transferência entre agentes especialistas. Plataforma com 9+ microsserviços: agentes LLM (TaskingAI), Java reativo (Quarkus, PostgreSQL, Redis, Keycloak), Vue.js, GraphQL e serviços serverless na AWS."
        : "End-to-end features for Lunella, an AI agent platform: voice features where each customer company connects its own voice AI account, with encrypted key storage and voice previews; integration with a voice-agent platform so customers run their agents over the phone, with phone number setup and call routing between specialist agents. A 9+ microservice platform: LLM agents (TaskingAI), reactive Java (Quarkus, PostgreSQL, Redis, Keycloak), Vue.js, GraphQL and AWS serverless services.",
      tags: ["Java", "Quarkus", "Vue.js", "GraphQL", "AWS Lambda", "LLM agents", "Voice AI"],
    },
    {
      title:       pt ? "Instrutor"                                       : "Instructor",
      company:     "Udemy",
      period:      pt ? "autônomo"                                       : "Self-employed",
      type:        "industry",
      current:     false,
      description: pt
        ? "2 cursos de Python para iniciantes, com mais de 2.100 alunos e notas 4,4 e 4,7."
        : "2 Python courses for beginners, with 2,100+ students and ratings of 4.4 and 4.7.",
      tags: ["Python", pt ? "Ensino" : "Teaching"],
    },
    {
      title:       pt ? "Estagiário em Engenharia Elétrica"              : "Electrical Engineering Intern",
      company:     "Grupo Piracanjuba",
      period:      pt ? "set 2023 a mar 2024"                            : "Sep 2023 to Mar 2024",
      type:        "industry",
      current:     false,
      description: pt
        ? "Manutenção UHT. Conduzi um projeto de análise de dados históricos de paradas (Python, Pandas) para achar as causas de paradas não programadas e propus gabaritos de baixo custo para padronizar as trocas de linha."
        : "UHT maintenance. Led a data analysis project on historical downtime (Python, Pandas) to find the root causes of unplanned stops and proposed low-cost jigs to standardize line changeovers.",
      tags: ["Python", "Pandas", "Root cause analysis"],
    },
    {
      title:       pt ? "Bolsista de Iniciação Científica"               : "Undergraduate Research Scholar",
      company:     "LACUT · UFPA",
      period:      pt ? "set 2022 a ago 2023"                            : "Sep 2022 to Aug 2023",
      type:        "research",
      current:     false,
      description: pt
        ? "Radiotelescópio amador: levantamento de hardware e software, orçamento e palestra no simpósio de divulgação científica do LACUT."
        : "Amateur radio telescope: hardware and software survey, budget and a talk at the LACUT science outreach symposium.",
      tags: ["Hardware", pt ? "Radioastronomia" : "Radio astronomy"],
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
        ? "Antifragilidade artificial (AFOSR) · supervisão multiagente · detecção de falhas · SIL/HIL · previsão de defesa: 2027"
        : "Artificial antifragility (AFOSR) · multi-agent supervision · fault detection · SIL/HIL · expected 2027",
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
      title:       pt ? "Capacitação em Sistemas Embarcados e IoT (160 h)" : "Professional Training in Embedded Systems and IoT (160 h)",
      institution: "IFMA · SOFTEX",
      period:      "2024 — 2025",
      description: pt ? "Microcontroladores · C/C++ · IoT" : "Microcontrollers · C/C++ · IoT",
    },
    {
      id:          "oracle",
      title:       pt ? "Programa de formação Back-end Java"            : "Back-end Java Training Program",
      institution: "Oracle Next Education",
      period:      "2023 — 2024",
      description: "Java · Spring Boot · MySQL · REST API",
    },
  ];
};

// ─── Publications ──────────────────────────────────────────────────────────
export const getPublications = (_lang: Language): PublicationData[] => [
  {
    title:       "Supervisão Adaptativa de Conversor Buck por Sistema Multiagente com Ciclo Percepção-Raciocínio-Ação e Reconfiguração Autônoma de Controladores",
    venue:       "CBA 2026 · aceito / accepted",
    date:        "2026",
    description: "Farias, O. D. (1º autor), Estrada Martínez, E., Lescano, J. C. O. S., Potts, A. S. Supervisor multiagente JADE que detecta falhas e reconfigura o controlador de um conversor Buck.",
  },
  {
    title:       "FCS-MPC com ARX Adaptativo via RLS para Controle P-Q Robusto a Variações Paramétricas em Inversores Trifásicos Conectados à Rede",
    venue:       "CBA 2026 · aceito / accepted",
    date:        "2026",
    description: "Farias, O. D. (1º autor), Teixeira, R. B. Controle preditivo com modelo identificado online para inversores conectados à rede.",
  },
  {
    title:       "Gêmeo Digital como ferramenta para um Laboratório Virtual de modelagem e controle de sistemas dinâmicos",
    venue:       "BDM · UFPA",
    date:        "2023",
    description: "Laboratório virtual combinando protótipo físico do Aeropêndulo, simulador 3D e interface interativa, validado com PID em malha fechada.",
  },
  {
    title:       "Laboratório Virtual de Controle de Sistemas com VPython no ensino de Engenharia",
    venue:       "COBENGE 2023",
    date:        "2023",
    description: "Simulações de MAGLEV e Aeropêndulo demonstrando a efetividade do VPython no ensino de engenharia.",
  },
  {
    title:       "SMART HOUSE — Automação Residencial com Arduino",
    venue:       "ENEEL 2018 · Even3",
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
  { title: "AWS para Iniciantes (curso preparatório)",                   issuer: "Udemy",              date: "dez 2023", category: "cloud", link: "https://udemy.com/certificate/UC-e5431d02-ba73-4cde-ab87-ce987e558d55" },
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
];
