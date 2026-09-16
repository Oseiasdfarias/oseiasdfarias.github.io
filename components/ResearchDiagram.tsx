import React from 'react';

interface ResearchDiagramProps {
  type: 'ufabc' | 'ufpa';
  lang?: 'pt' | 'en';
}

export const ResearchDiagram: React.FC<ResearchDiagramProps> = ({ type, lang = 'pt' }) => {
  const pt = lang === 'pt';

  // 1. UFABC: Antifragilidade, Conversor Buck, Controle Adaptativo (LQR/H∞), Kalman FDI e Supervisão CrewAI via ZeroMQ
  if (type === 'ufabc') {
    return (
      <svg viewBox="0 0 420 220" width="100%" height="100%" style={{ display: 'block', background: 'var(--bg2)' }}>
        <defs>
          <marker id="arr-res" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
            <path d="M0 0 L 5 3 L 0 6" fill="none" stroke="var(--accent)" strokeWidth="1.2" />
          </marker>
        </defs>

        {/* Fundo técnico em cor sólida uniforme */}
        <rect x="0" y="0" width="420" height="220" fill="var(--bg2)" />

        {/* Fundo grid técnico */}
        <g stroke="var(--line)" strokeWidth="0.5" opacity="0.4">
          {[35, 90, 145, 200, 255, 310, 365].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" />)}
          {[35, 75, 115, 155, 195].map(y => <line key={y} x1="0" y1={y} x2="420" y2={y} />)}
        </g>

        {/* Planta: Conversor Buck / Hardware in the loop */}
        <g transform="translate(16, 25)">
          <rect x="0" y="20" width="105" height="108" rx="4" fill="var(--panel)" stroke="var(--line-2)" strokeWidth="1.2" />
          <text x="52" y="42" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="8" fill="var(--fg-soft)" textAnchor="middle">PLANTA (HIL)</text>
          <text x="52" y="58" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="8.5" fill="var(--fg)" textAnchor="middle" fontWeight="600">Conversor Buck</text>
          <rect x="10" y="70" width="85" height="22" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="52" y="85" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7.5" fill="var(--accent-2)" textAnchor="middle">FPGA / FPAA</text>
          <rect x="10" y="96" width="85" height="22" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="52" y="111" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7" fill="var(--fg-muted)" textAnchor="middle">Simulink SIL</text>

          {/* Seta via ZeroMQ */}
          <path d="M 105 74 L 138 74" stroke="var(--accent-2)" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arr-res)" />
          <text x="122" y="66" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="6.5" fill="var(--accent-2)" textAnchor="middle">ZeroMQ</text>

          {/* Controle Adaptativo + FDI */}
          <rect x="140" y="10" width="130" height="128" rx="4" fill="var(--panel)" stroke="var(--accent)" strokeWidth="1.4" />
          <text x="205" y="32" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="8.5" fill="var(--fg)" textAnchor="middle" fontWeight="600">CONTROL & FDI</text>
          <rect x="150" y="44" width="110" height="24" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="205" y="60" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7.5" fill="var(--fg)" textAnchor="middle">PI, LQR & H∞</text>
          <rect x="150" y="72" width="110" height="24" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="205" y="88" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7.5" fill="var(--accent-2)" textAnchor="middle">EKF / UKF Kalman</text>
          <rect x="150" y="100" width="110" height="24" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="205" y="116" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7.5" fill="var(--fg-muted)" textAnchor="middle">CUSUM Fault Det.</text>

          {/* Seta para Supervisor de IA */}
          <path d="M 270 74 L 298 74" stroke="var(--accent-2)" strokeWidth="1.3" strokeDasharray="3 3" markerEnd="url(#arr-res)" />

          {/* Supervisor com Agentes LLM */}
          <rect x="300" y="20" width="95" height="108" rx="4" fill="var(--panel)" stroke="var(--line-2)" strokeWidth="1.2" />
          <text x="347" y="42" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="8" fill="var(--accent-2)" textAnchor="middle" fontWeight="600">AI SUPERVISOR</text>
          <rect x="308" y="56" width="79" height="28" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="347" y="73" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7.5" fill="var(--fg)" textAnchor="middle">CrewAI Agents</text>
          <rect x="308" y="88" width="79" height="30" rx="3" fill="var(--bg)" stroke="var(--line)" />
          <text x="347" y="102" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="6.5" fill="var(--fg-soft)" textAnchor="middle">Reconfiguração</text>
          <text x="347" y="112" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="6.5" fill="var(--fg-muted)" textAnchor="middle">Autônoma</text>
        </g>

        <text x="210" y="195" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7.5" fill="var(--fg-soft)" textAnchor="middle" letterSpacing="0.04em">
          {pt ? 'ANTIFRAGILIDADE ARTIFICIAL · CONVERSOR BUCK + HIL + CREWAI' : 'ARTIFICIAL ANTIFRAGILITY · BUCK CONVERTER + HIL + CREWAI'}
        </text>
      </svg>
    );
  }

  // 2. UFPA: Controle Preditivo Model-Free, Deep Reinforcement Learning (DQN), Eletrônica de Potência
  return (
    <svg viewBox="0 0 420 220" width="100%" height="100%" style={{ display: 'block', background: 'var(--bg2)' }}>
      {/* Fundo técnico em cor sólida uniforme */}
      <rect x="0" y="0" width="420" height="220" fill="var(--bg2)" />

      {/* Grid de fundo */}
      <g stroke="var(--line)" strokeWidth="0.5" opacity="0.4">
        {[35, 90, 145, 200, 255, 310, 365].map(x => <line key={x} x1={x} y1="0" x2={x} y2="220" />)}
        {[35, 75, 115, 155, 195].map(y => <line key={y} x1="0" y1={y} x2="420" y2={y} />)}
      </g>

      {/* Diagrama de Aprendizado por Reforço / Controle Preditivo */}
      <g transform="translate(18, 20)">
        {/* Agente / Rede Neural DQN */}
        <rect x="0" y="12" width="175" height="126" rx="4" fill="var(--panel)" stroke="var(--accent)" strokeWidth="1.3" />
        <text x="87" y="34" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="8.5" fill="var(--fg)" textAnchor="middle" fontWeight="600">DEEP RL AGENT (DQN)</text>
        <text x="87" y="48" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7" fill="var(--fg-soft)" textAnchor="middle">Model-Free Predictive Control</text>

        {/* Nós da Rede Neural ilustrativa */}
        <g transform="translate(32, 60)">
          {[12, 28, 44].map(y => <circle key={'in-' + y} cx="15" cy={y} r="4" fill="var(--accent-2)" />)}
          {[6, 20, 34, 48].map(y => <circle key={'h1-' + y} cx="55" cy={y} r="4" fill="var(--fg)" />)}
          {[14, 38].map(y => <circle key={'out-' + y} cx="95" cy={y} r="4" fill="var(--accent-2)" />)}
          <line x1="19" y1="28" x2="51" y2="20" stroke="var(--line-2)" strokeWidth="0.8" />
          <line x1="19" y1="28" x2="51" y2="34" stroke="var(--line-2)" strokeWidth="0.8" />
          <line x1="59" y1="20" x2="91" y2="14" stroke="var(--line-2)" strokeWidth="0.8" />
          <line x1="59" y1="34" x2="91" y2="38" stroke="var(--line-2)" strokeWidth="0.8" />
        </g>

        {/* Setas de feedback (Estado, Ação, Recompensa) */}
        {/* Ação -> Ambiente */}
        <path d="M 175 52 L 210 52" stroke="var(--accent-2)" strokeWidth="1.3" strokeDasharray="3 3" />
        <text x="192" y="45" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="6.5" fill="var(--accent-2)" textAnchor="middle">Ação a(t)</text>

        {/* Conversor de Potência / Ambiente */}
        <rect x="210" y="12" width="175" height="126" rx="4" fill="var(--panel)" stroke="var(--line-2)" strokeWidth="1.3" />
        <text x="297" y="34" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="8.5" fill="var(--fg)" textAnchor="middle" fontWeight="600">POWER ELECTRONICS</text>
        <rect x="222" y="46" width="150" height="26" rx="3" fill="var(--bg)" stroke="var(--line)" />
        <text x="297" y="63" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7.5" fill="var(--fg)" textAnchor="middle">PWM / Conversores CC-CC</text>
        <rect x="222" y="78" width="150" height="48" rx="3" fill="var(--bg)" stroke="var(--line)" />
        <text x="297" y="96" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7.5" fill="var(--accent-2)" textAnchor="middle">Sensorização & Visão</text>
        <text x="297" y="112" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="6.5" fill="var(--fg-soft)" textAnchor="middle">Identificação Dinâmica</text>

        {/* Feedback: Estado & Recompensa */}
        <path d="M 210 98 L 175 98" stroke="var(--accent-2)" strokeWidth="1.3" strokeDasharray="3 3" />
        <text x="192" y="92" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="6.5" fill="var(--accent-2)" textAnchor="middle">Estado s(t+1)</text>
      </g>

      <text x="210" y="195" fontFamily="JetBrains Mono, IBM Plex Mono, monospace" fontSize="7.5" fill="var(--fg-soft)" textAnchor="middle" letterSpacing="0.04em">
        {pt ? 'CONTROLE PREDITIVO MODEL-FREE · DEEP RL (DQN) + CONVERSORES DE POTÊNCIA' : 'MODEL-FREE PREDICTIVE CONTROL · DEEP RL (DQN) + POWER ELECTRONICS'}
      </text>
    </svg>
  );
};

