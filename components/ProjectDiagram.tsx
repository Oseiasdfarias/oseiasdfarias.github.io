import React from 'react';

interface ProjectDiagramProps {
  type: string;
  lang?: 'pt' | 'en';
}

export const ProjectDiagram: React.FC<ProjectDiagramProps> = ({ type, lang = 'pt' }) => {
  const pt = lang === 'pt';

  // 1. Otensor: Hardware de borda (ESP32 / RPi) -> MQTT Broker -> Automação / IA / Nuvem
  if (type === 'otensor') {
    return (
      <svg viewBox="0 0 420 220" width="100%" height="100%" style={{ display: 'block', background: 'var(--bg2)' }}>
        <defs>
          <marker id="arr" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0 0 L 5 3 L 0 6" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
          </marker>
        </defs>

        {/* Fundo técnico sólido uniforme */}
        <rect x="0" y="0" width="420" height="220" fill="var(--bg2)" />
        <g stroke="var(--line)" strokeWidth="0.5" opacity="0.4">
          {[40, 90, 140, 190, 240, 290, 340, 390].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" />)}
          {[35, 75, 115, 155, 195].map(y => <line key={y} x1="0" y1={y} x2="420" y2={y} />)}
        </g>

        {/* Bloco 1: Hardware Borda */}
        <rect x="18" y="45" width="105" height="130" rx="3" fill="var(--panel)" stroke="var(--line-2)" strokeWidth="1.2" />
        <text x="70" y="70" fontFamily="IBM Plex Mono" fontSize="9" fill="var(--accent)" textAnchor="middle" fontWeight="600">EDGE LAYER</text>
        <rect x="28" y="85" width="85" height="32" rx="2" fill="var(--bg)" stroke="var(--line)" />
        <text x="70" y="104" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg)" textAnchor="middle">ESP32 Firmware</text>
        <rect x="28" y="125" width="85" height="32" rx="2" fill="var(--bg)" stroke="var(--line)" />
        <text x="70" y="144" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg)" textAnchor="middle">RPi Gateway</text>

        {/* Conexão Borda -> Broker */}
        <path d="M 123 110 L 160 110" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 3" markerEnd="url(#arr)" />
        <text x="142" y="103" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg-soft)" textAnchor="middle">MQTT</text>

        {/* Bloco 2: Orquestrador / Broker Central */}
        <rect x="160" y="32" width="100" height="156" rx="3" fill="var(--panel)" stroke="var(--accent)" strokeWidth="1.4" />
        <circle cx="210" cy="55" r="12" fill="none" stroke="var(--accent-2)" strokeWidth="2" />
        <circle cx="210" cy="55" r="4" fill="var(--accent-2)" />
        <text x="210" y="82" fontFamily="IBM Plex Mono" fontSize="9" fill="var(--fg)" textAnchor="middle" fontWeight="600">OTENSOR CORE</text>
        <rect x="170" y="96" width="80" height="26" rx="2" fill="var(--bg)" stroke="var(--line)" />
        <text x="210" y="112" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--fg-muted)" textAnchor="middle">Rule Engine</text>
        <rect x="170" y="130" width="80" height="42" rx="2" fill="var(--bg)" stroke="var(--line)" />
        <text x="210" y="146" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--accent)" textAnchor="middle">LLM / STT / TTS</text>
        <text x="210" y="160" fontFamily="IBM Plex Mono" fontSize="6.5" fill="var(--fg-soft)" textAnchor="middle">Autonomous Decisions</text>

        {/* Conexão Core -> Nuvem */}
        <path d="M 260 110 L 296 110" fill="none" stroke="var(--accent-2)" strokeWidth="1.4" strokeDasharray="3 3" markerEnd="url(#arr)" />
        <text x="278" y="103" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--accent-2)" textAnchor="middle">Events</text>

        {/* Bloco 3: Nuvem / Deploy */}
        <rect x="296" y="45" width="105" height="130" rx="3" fill="var(--panel)" stroke="var(--line-2)" strokeWidth="1.2" />
        <text x="348" y="70" fontFamily="IBM Plex Mono" fontSize="9" fill="var(--accent-2)" textAnchor="middle" fontWeight="600">CLOUD & SCALE</text>
        <rect x="306" y="85" width="85" height="32" rx="2" fill="var(--bg)" stroke="var(--line)" />
        <text x="348" y="104" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg)" textAnchor="middle">AWS Lambda</text>
        <rect x="306" y="125" width="85" height="32" rx="2" fill="var(--bg)" stroke="var(--line)" />
        <text x="348" y="144" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg)" textAnchor="middle">Docker Dev Local</text>

        <text x="210" y="206" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--fg-soft)" textAnchor="middle" letterSpacing="0.05em">
          {pt ? 'ARQUITETURA DE TELEMETRIA E DECISÃO DE BORDA' : 'EDGE TELEMETRY & DECISION ARCHITECTURE'}
        </text>
      </svg>
    );
  }

  // 2. Lunella/RosanaDesk: Arquitetura Serverless 9+ Microsserviços
  if (type === 'lunella') {
    return (
      <svg viewBox="0 0 420 220" width="100%" height="100%" style={{ display: 'block', background: 'var(--bg2)' }}>
        {/* Fundo técnico sólido uniforme */}
        <rect x="0" y="0" width="420" height="220" fill="var(--bg2)" />

        {/* Fundo grid */}
        <g stroke="var(--line)" strokeWidth="0.5" opacity="0.4">
          {[30, 80, 130, 180, 230, 280, 330, 380].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" />)}
          {[35, 75, 115, 155, 195].map(y => <line key={y} x1="0" y1={y} x2="420" y2={y} />)}
        </g>

        {/* Pipeline Serverless Horizontal */}
        <g transform="translate(15, 25)">
          {/* Ingress */}
          <rect x="0" y="45" width="70" height="50" rx="3" fill="var(--bg2)" stroke="var(--line-2)" />
          <text x="35" y="68" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--accent)" textAnchor="middle">API GW</text>
          <text x="35" y="82" fontFamily="IBM Plex Mono" fontSize="6.5" fill="var(--fg-soft)" textAnchor="middle">REST / WS</text>

          {/* Seta */}
          <path d="M 70 70 L 95 70" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* SNS / SQS */}
          <rect x="95" y="40" width="85" height="60" rx="3" fill="var(--bg2)" stroke="var(--line-2)" />
          <text x="137" y="62" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg)" textAnchor="middle">SNS → SQS</text>
          <text x="137" y="76" fontFamily="IBM Plex Mono" fontSize="6.5" fill="var(--accent)" textAnchor="middle">FIFO Queues</text>
          <text x="137" y="88" fontFamily="IBM Plex Mono" fontSize="6" fill="var(--fg-soft)" textAnchor="middle">Multi-Tenant</text>

          {/* Seta */}
          <path d="M 180 70 L 205 70" stroke="var(--accent)" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* Lambda Core */}
          <rect x="205" y="25" width="95" height="90" rx="3" fill="var(--bg2)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="252" y="48" fontFamily="IBM Plex Mono" fontSize="8.5" fill="var(--accent)" textAnchor="middle" fontWeight="600">AWS LAMBDA</text>
          <rect x="213" y="58" width="80" height="20" rx="2" fill="var(--bg)" stroke="var(--line)" />
          <text x="253" y="71" fontFamily="IBM Plex Mono" fontSize="6.5" fill="var(--fg)" textAnchor="middle">Python NLP Worker</text>
          <rect x="213" y="84" width="80" height="22" rx="2" fill="var(--bg)" stroke="var(--line)" />
          <text x="253" y="98" fontFamily="IBM Plex Mono" fontSize="6.5" fill="var(--accent-2)" textAnchor="middle">TaskingAI + VAPI</text>

          {/* Seta */}
          <path d="M 300 70 L 325 70" stroke="var(--accent-2)" strokeWidth="1.2" strokeDasharray="2 2" />

          {/* Backend Quarkus + DB */}
          <rect x="325" y="40" width="75" height="60" rx="3" fill="var(--bg2)" stroke="var(--line-2)" />
          <text x="362" y="62" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--accent-2)" textAnchor="middle">QUARKUS</text>
          <text x="362" y="76" fontFamily="IBM Plex Mono" fontSize="6.5" fill="var(--fg)" textAnchor="middle">Postgres / Redis</text>
          <text x="362" y="88" fontFamily="IBM Plex Mono" fontSize="6" fill="var(--fg-soft)" textAnchor="middle">Keycloak IAM</text>
        </g>

        {/* Métricas e status da arquitetura */}
        <g transform="translate(20, 160)">
          <rect x="0" y="0" width="380" height="34" rx="2" fill="var(--bg2)" stroke="var(--line)" />
          <text x="65" y="16" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg-soft)">SERVICES</text>
          <text x="65" y="27" fontFamily="IBM Plex Mono" fontSize="9" fill="var(--accent)" fontWeight="600">9+ Serverless</text>

          <text x="190" y="16" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg-soft)" textAnchor="middle">VOICE PIPELINE</text>
          <text x="190" y="27" fontFamily="IBM Plex Mono" fontSize="9" fill="var(--fg)" textAnchor="middle" fontWeight="600">STT → LLM → TTS</text>

          <text x="320" y="16" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg-soft)" textAnchor="middle">INSIGHTS</text>
          <text x="320" y="27" fontFamily="IBM Plex Mono" fontSize="9" fill="var(--accent-2)" textAnchor="middle" fontWeight="600">Slack & PDF Auto</text>
        </g>
      </svg>
    );
  }

  // 3. Calculadora Científica: Claude AI Pairing / Superpower Architecture
  if (type === 'calculator') {
    return (
      <svg viewBox="0 0 420 220" width="100%" height="100%" style={{ display: 'block', background: 'var(--bg2)' }}>
        {/* Fundo técnico sólido uniforme */}
        <rect x="0" y="0" width="420" height="220" fill="var(--bg2)" />

        {/* Mockup da interface de calculadora moderna */}
        <g transform="translate(60, 20)">
          {/* Caixa da calculadora */}
          <rect x="0" y="0" width="300" height="175" rx="4" fill="var(--panel)" stroke="var(--line-2)" strokeWidth="1.2" />

          {/* Visor digital */}
          <rect x="12" y="12" width="276" height="42" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="280" y="28" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg-soft)" textAnchor="end">sin(45°) + ∫(x² dx) = </text>
          <text x="280" y="46" fontFamily="Newsreader, serif" fontSize="16" fill="var(--accent)" textAnchor="end">3.14159265</text>

          {/* Grade de teclas científicas */}
          <g transform="translate(12, 62)">
            {['sin', 'cos', 'tan', 'log', 'ln', '√x', 'x²', 'π', '(', ')'].map((k, i) => {
              const x = (i % 5) * 56;
              const y = Math.floor(i / 5) * 24;
              return (
                <g key={k} transform={`translate(${x}, ${y})`}>
                  <rect width="50" height="20" rx="2" fill="var(--bg)" stroke="var(--line)" />
                  <text x="25" y="14" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--accent-2)" textAnchor="middle">{k}</text>
                </g>
              );
            })}
          </g>

          {/* Teclas numéricas */}
          <g transform="translate(12, 116)">
            {['7', '8', '9', '÷', '4', '5', '6', '×', '1', '2'].map((k, i) => {
              const x = (i % 5) * 56;
              const y = Math.floor(i / 5) * 24;
              return (
                <g key={k} transform={`translate(${x}, ${y})`}>
                  <rect width="50" height="20" rx="2" fill="var(--bg)" stroke="var(--line)" />
                  <text x="25" y="14" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg)" textAnchor="middle">{k}</text>
                </g>
              );
            })}
          </g>
        </g>

        {/* Badge inferior de AI Engineering */}
        <text x="210" y="210" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg-soft)" textAnchor="middle">
          {pt ? 'ENGENHARIA ASSISTIDA POR IA · CLAUDE & SUPERPOWERS' : 'AI-ASSISTED ENGINEERING · CLAUDE & SUPERPOWERS'}
        </text>
      </svg>
    );
  }

  // 4. Pipeline NLP Serverless: Extração de tópicos e sumarização
  if (type === 'nlp-pipeline') {
    return (
      <svg viewBox="0 0 420 220" width="100%" height="100%" style={{ display: 'block', background: 'var(--bg2)' }}>
        {/* Fundo técnico sólido uniforme */}
        <rect x="0" y="0" width="420" height="220" fill="var(--bg2)" />
        <g stroke="var(--line)" strokeWidth="0.5" opacity="0.4">
          {[40, 100, 160, 220, 280, 340, 400].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" />)}
          {[40, 85, 130, 175].map(y => <line key={y} x1="0" y1={y} x2="420" y2={y} />)}
        </g>

        {/* Fluxo de dados NLP */}
        <g transform="translate(20, 35)">
          {/* Mensagens de entrada */}
          <rect x="0" y="25" width="85" height="90" rx="3" fill="var(--panel)" stroke="var(--line-2)" />
          <text x="42" y="46" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg-soft)" textAnchor="middle">INPUT</text>
          <text x="42" y="60" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--fg)" textAnchor="middle">Streaming</text>
          <path d="M 12 75 L 72 75 M 12 85 L 60 85 M 12 95 L 68 95" stroke="var(--accent)" strokeWidth="1.2" opacity="0.7" />

          {/* Seta */}
          <path d="M 85 70 L 115 70" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 3" />

          {/* Lambda Worker */}
          <rect x="115" y="15" width="130" height="110" rx="3" fill="var(--panel)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="180" y="38" fontFamily="IBM Plex Mono" fontSize="9" fill="var(--accent)" textAnchor="middle" fontWeight="600">AWS LAMBDA</text>
          <text x="180" y="52" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg-soft)" textAnchor="middle">Python Worker / SQS</text>
          <rect x="127" y="62" width="106" height="24" rx="2" fill="var(--bg)" stroke="var(--line)" />
          <text x="180" y="77" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--accent-2)" textAnchor="middle">Topic Classifier</text>
          <rect x="127" y="92" width="106" height="24" rx="2" fill="var(--bg)" stroke="var(--line)" />
          <text x="180" y="107" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg)" textAnchor="middle">Intent Extraction</text>

          {/* Seta */}
          <path d="M 245 70 L 275 70" stroke="var(--accent-2)" strokeWidth="1.4" strokeDasharray="3 3" />

          {/* Saída automatizada */}
          <rect x="275" y="25" width="105" height="90" rx="3" fill="var(--panel)" stroke="var(--line-2)" />
          <text x="327" y="46" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--accent-2)" textAnchor="middle" fontWeight="600">DELIVERY</text>
          <rect x="285" y="58" width="85" height="22" rx="2" fill="var(--bg)" stroke="var(--line)" />
          <text x="327" y="72" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg)" textAnchor="middle">PDF Multi-Tenant</text>
          <rect x="285" y="86" width="85" height="22" rx="2" fill="var(--bg)" stroke="var(--line)" />
          <text x="327" y="100" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--accent)" textAnchor="middle">Slack Webhooks</text>
        </g>

        <text x="210" y="195" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--fg-soft)" textAnchor="middle">
          {pt ? 'PIPELINE SERVERLESS EM TEMPO REAL · ZERO OPERAÇÃO MANUAL' : 'REAL-TIME SERVERLESS PIPELINE · ZERO MANUAL EFFORT'}
        </text>
      </svg>
    );
  }

  // 5. FastAPI REST & MLOps Foundation
  if (type === 'fastapi') {
    return (
      <svg viewBox="0 0 420 220" width="100%" height="100%" style={{ display: 'block', background: 'var(--bg2)' }}>
        {/* Terminal frame */}
        <g transform="translate(30, 20)">
          <rect x="0" y="0" width="360" height="175" rx="3" fill="var(--panel)" stroke="var(--line-2)" strokeWidth="1.2" />
          <rect x="0" y="0" width="360" height="24" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <circle cx="14" cy="12" r="3.5" fill="var(--accent)" />
          <circle cx="26" cy="12" r="3.5" fill="var(--accent-2)" />
          <circle cx="38" cy="12" r="3.5" fill="var(--fg-soft)" opacity="0.6" />
          <text x="180" y="16" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg-soft)" textAnchor="middle">fastapi-mlops — bash</text>

          <g transform="translate(16, 42)" fontFamily="IBM Plex Mono" fontSize="8.5">
            <text x="0" y="10" fill="var(--accent)">$ pytest tests/ -v --cov=app</text>
            <text x="0" y="26" fill="var(--accent-2)">tests/test_inference.py::test_model_predict PASSED [ 50%]</text>
            <text x="0" y="42" fill="var(--accent-2)">tests/test_endpoints.py::test_auth_routes  PASSED [100%]</text>
            <text x="0" y="60" fill="var(--fg-muted)">----------------------------------------------------</text>
            <text x="0" y="76" fill="var(--fg)">TOTAL: 42 passed in 1.12s (Coverage: 100%)</text>
            <text x="0" y="98" fill="var(--accent)">$ docker compose up --build -d</text>
            <text x="0" y="114" fill="var(--fg-soft)">[+] Running 2/2: Container fastapi-app Started</text>
          </g>
        </g>
        <text x="210" y="210" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--fg-soft)" textAnchor="middle">
          {pt ? 'FASTAPI · PYTEST · DOCKER · SCIKIT-LEARN SERVING' : 'FASTAPI · PYTEST · DOCKER · SCIKIT-LEARN SERVING'}
        </text>
      </svg>
    );
  }

  // 6. Java Spring Boot & Fórum Hub
  return (
    <svg viewBox="0 0 420 220" width="100%" height="100%" style={{ display: 'block', background: 'var(--bg2)' }}>
      <g transform="translate(30, 25)">
        <rect x="0" y="0" width="360" height="165" rx="3" fill="var(--panel)" stroke="var(--line-2)" strokeWidth="1.2" />
        <g transform="translate(20, 20)">
          {/* Spring Boot Core */}
          <rect x="0" y="25" width="90" height="75" rx="3" fill="var(--bg)" stroke="var(--accent)" strokeWidth="1.2" />
          <text x="45" y="50" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--accent)" textAnchor="middle" fontWeight="600">SPRING BOOT 3</text>
          <text x="45" y="66" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg)" textAnchor="middle">REST Controller</text>
          <text x="45" y="80" fontFamily="IBM Plex Mono" fontSize="6.5" fill="var(--fg-soft)" textAnchor="middle">Validation DTOs</text>

          {/* Seta */}
          <path d="M 90 62 L 125 62" stroke="var(--line-2)" strokeWidth="1.4" strokeDasharray="3 3" />

          {/* Security & JWT */}
          <rect x="125" y="20" width="100" height="85" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="175" y="44" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--accent-2)" textAnchor="middle" fontWeight="600">SECURITY</text>
          <text x="175" y="60" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg)" textAnchor="middle">JWT Stateless</text>
          <text x="175" y="74" fontFamily="IBM Plex Mono" fontSize="6.5" fill="var(--accent)" textAnchor="middle">BCrypt Hashing</text>
          <text x="175" y="88" fontFamily="IBM Plex Mono" fontSize="6" fill="var(--fg-soft)" textAnchor="middle">Filter Chain</text>

          {/* Seta */}
          <path d="M 225 62 L 260 62" stroke="var(--line-2)" strokeWidth="1.4" strokeDasharray="3 3" />

          {/* Database / Flyway */}
          <rect x="260" y="25" width="75" height="75" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="297" y="50" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg)" textAnchor="middle">FLYWAY</text>
          <text x="297" y="66" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg-muted)" textAnchor="middle">MySQL DB</text>
          <text x="297" y="80" fontFamily="IBM Plex Mono" fontSize="6.5" fill="var(--accent-2)" textAnchor="middle">V1__create</text>
        </g>
      </g>
      <text x="210" y="206" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--fg-soft)" textAnchor="middle">
        {pt ? 'ARQUITETURA BACKEND JAVA · AUTENTICAÇÃO E MIGRAÇÕES' : 'JAVA BACKEND ARCHITECTURE · AUTH & MIGRATIONS'}
      </text>
    </svg>
  );
};

