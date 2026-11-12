import React, { useEffect, useState, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';

// ─── Hero: IA em produção, contada em 4 passos para quem não é da área ──────
// O sensor de um motor → um modelo percebe o padrão estranho → um agente consulta
// o manual e explica → a equipe age e a máquina volta ao normal.
// Cada passo corresponde a um projeto real do portfólio (vibração, RAG, agentes).
// Animação determinística e periódica; com "reduzir movimento" fica parada no passo 3.

const TICK_MS = 100;
const STEP = 40;                 // ticks por passo
const P = STEP * 4;              // 160 ticks = 16 s por ciclo
const MONO = "'JetBrains Mono', monospace";
const mono = (size: number, extra?: CSSProperties): CSSProperties => ({ fontFamily: MONO, fontSize: size, ...extra });
const clamp = (v: number) => Math.max(0, Math.min(1, v));

const TEXT = {
  pt: {
    fig: 'FIG.01 — IA EM PRODUÇÃO · DO SENSOR À SOLUÇÃO',
    live: 'ao vivo',
    aria: 'Animação em quatro passos: o sensor de um motor envia a vibração, um modelo de IA percebe um padrão incomum, um agente de IA consulta o manual técnico e explica a causa, e a equipe age para a máquina voltar ao normal.',
    sensor: 'MOTOR 3 · SENSOR DE VIBRAÇÃO',
    limit: 'limite seguro',
    flag: 'padrão incomum · 96%',
    agent: 'AGENTE DE IA',
    q: 'Por que o motor 3 está vibrando?',
    a: 'Sinal típico de desgaste no rolamento. O manual recomenda inspecionar e lubrificar antes de trocar.',
    src: 'fonte: manual técnico · rolamentos',
    status: 'ESTADO',
    states: ['Normal', 'Alerta', 'Diagnóstico', 'Estável'],
    fixing: 'Em manutenção',
    idle: 'sem alertas no momento',
    waiting: 'aguardando o alerta…',
    actions: ['monitorando 24 h', 'equipe avisada', 'causa explicada', 'manutenção agendada'],
    steps: [
      { t: 'A máquina fala', d: 'Sensores enviam a vibração do motor o tempo todo. É o “pulso” da máquina.' },
      { t: 'A IA percebe', d: 'Um modelo treinado nota um padrão estranho antes de a peça quebrar.' },
      { t: 'A IA explica', d: 'Um agente consulta o manual técnico e responde em linguagem clara, mostrando a fonte.' },
      { t: 'A equipe age', d: 'A manutenção é feita no momento certo e a máquina volta a funcionar normalmente.' },
    ],
    proj: 'projeto',
    stepProject: ['detecção de vibração', 'detecção de vibração', 'RAG sobre manual', 'supervisor multiagente'],
    stepLabel: (i: number) => `Ir para o passo ${i + 1}`,
  },
  en: {
    fig: 'FIG.01 — AI IN PRODUCTION · FROM SENSOR TO SOLUTION',
    live: 'live',
    aria: 'Four-step animation: a motor sensor sends its vibration, an AI model notices an unusual pattern, an AI agent looks up the technical manual and explains the cause, and the team acts so the machine returns to normal.',
    sensor: 'MOTOR 3 · VIBRATION SENSOR',
    limit: 'safe limit',
    flag: 'unusual pattern · 96%',
    agent: 'AI AGENT',
    q: 'Why is motor 3 vibrating?',
    a: 'Typical sign of bearing wear. The manual recommends inspecting and lubricating before replacing the part.',
    src: 'source: technical manual · bearings',
    status: 'STATUS',
    states: ['Normal', 'Alert', 'Diagnosis', 'Stable'],
    fixing: 'Under maintenance',
    idle: 'no alerts right now',
    waiting: 'waiting for the alert…',
    actions: ['monitoring 24/7', 'team notified', 'cause explained', 'maintenance scheduled'],
    steps: [
      { t: 'The machine talks', d: 'Sensors stream the motor’s vibration all the time. It is the machine’s “pulse”.' },
      { t: 'AI notices', d: 'A trained model spots an unusual pattern before the part breaks.' },
      { t: 'AI explains', d: 'An agent looks up the technical manual and answers in plain language, showing its source.' },
      { t: 'The team acts', d: 'Maintenance happens at the right time and the machine goes back to normal.' },
    ],
    proj: 'project',
    stepProject: ['vibration detection', 'vibration detection', 'RAG over a manual', 'multi-agent supervisor'],
    stepLabel: (i: number) => `Go to step ${i + 1}`,
  },
} as const;

// Intensidade da anomalia ao longo do ciclo: sobe no passo 2, some no passo 4
const anomaly = (t: number) => clamp((t - 44) / 14) * (1 - clamp((t - 121) / 9));

// Sinal de vibração (determinístico): base suave + rajadas quando há anomalia
const signal = (u: number, a: number) =>
  7 * Math.sin(u * 0.32) + 2.2 * Math.sin(u * 1.1 + 1) +
  a * 22 * Math.sin(u * 1.9) * Math.pow(Math.abs(Math.sin(u * 0.11)), 1.5);

// Layout do SVG (viewBox 480 × 206)
const WX0 = 14, WX1 = 466, WY = 56, LIM = 19;

export const HeroStory: React.FC<{ lang: Language }> = ({ lang }) => {
  const L = TEXT[lang === 'pt' ? 'pt' : 'en'];
  const [t, setT] = useState(8);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setStill(true); setT(STEP * 2 + 38); return; }
    const id = setInterval(() => setT(v => (v + 1) % P), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const step = Math.min(3, Math.floor(t / STEP));
  const a = anomaly(t);
  const flagged = a > 0.45;
  const phase = t * 3;

  // forma de onda
  const N = 140;
  const pts = Array.from({ length: N }, (_, i) => {
    const x = WX0 + (i / (N - 1)) * (WX1 - WX0);
    // a anomalia entra pela direita (dado mais recente) e atravessa a tela
    const local = clamp((i / (N - 1)) * 1.4 - 0.4) * a;
    return `${x.toFixed(1)},${(WY - signal(i * 2 + phase, local)).toFixed(1)}`;
  }).join(' ');

  // chat do agente
  const qOn = t >= STEP * 2 + 2;
  const typed = clamp((t - (STEP * 2 + 8)) / 26);
  const answer = L.a.slice(0, Math.round(L.a.length * typed));
  const srcOn = t >= STEP * 2 + 34 || step === 3;
  const fixing = step === 3 && a > 0.04;
  const stateColor = fixing ? 'var(--accent)' : ['var(--c-teal)', 'var(--c-red)', 'var(--accent)', 'var(--c-teal)'][step];
  const stateLabel = fixing ? L.fixing : L.states[step];

  // quebra da resposta em linhas para o SVG
  const wrap = (s: string, n: number) => {
    const out: string[] = []; let line = '';
    s.split(' ').forEach(w => { if ((line + ' ' + w).trim().length > n) { out.push(line); line = w; } else line = (line + ' ' + w).trim(); });
    if (line) out.push(line);
    return out;
  };
  const answerLines = wrap(step >= 3 ? L.a : answer, 54);
  const chipY = 161 + Math.max(1, wrap(L.a, 54).length) * 13 - 3;   // selo da fonte logo abaixo da resposta completa

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        position: 'relative', border: '1px solid var(--line)', background: 'var(--hero-panel)',
        padding: '16px 16px 12px', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        marginBottom: 12, ...mono(10.5, { color: 'var(--fg-soft)', letterSpacing: '.08em' }),
      }}>
        <span>{L.fig}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)', whiteSpace: 'nowrap' }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--accent)', animation: still ? undefined : 'livedot 2s ease-out infinite' }} />
          {L.live}
        </span>
      </div>

      {/* Passos: clicáveis, o atual em destaque */}
      <div className="story-steps" role="group">
        {L.steps.map((s, i) => (
          <button key={i} type="button" aria-label={L.stepLabel(i)} aria-current={i === step ? 'step' : undefined}
            className={`story-step${i === step ? ' is-on' : ''}${i < step ? ' is-done' : ''}`}
            onClick={() => setT(i * STEP + (still ? 38 : 1))}>
            <span className="story-step-n">{String(i + 1).padStart(2, '0')}</span>
            <span className="story-step-t">{s.t}</span>
            <span className="story-step-bar" aria-hidden="true">
              <span style={{ width: `${i < step ? 100 : i === step ? ((t % STEP) / (STEP - 1)) * 100 : 0}%` }} />
            </span>
          </button>
        ))}
      </div>

      <svg viewBox="0 0 480 206" width="100%" role="img" aria-label={L.aria}
        style={{ display: 'block', overflow: 'visible', maxHeight: 'clamp(160px,30vh,260px)', marginTop: 10 }}>
        {/* ── Sensor ── */}
        <text x={WX0} y="14" fontFamily={MONO} fontSize="8.5" fill="var(--fg-soft)" letterSpacing="1.2">{L.sensor}</text>
        <rect x={WX0 - 4} y={WY - LIM} width={WX1 - WX0 + 8} height={LIM * 2} fill="var(--c-teal)" opacity="0.06" />
        <path d={`M${WX0 - 4} ${WY - LIM} H ${WX1 + 4} M${WX0 - 4} ${WY + LIM} H ${WX1 + 4}`} stroke="var(--c-teal)" strokeOpacity="0.45" strokeDasharray="3 4" />
        <text x={WX1} y={WY - LIM - 5} fontFamily={MONO} fontSize="7.8" fill="var(--fg-soft)" textAnchor="end">{L.limit}</text>
        <polyline points={pts} fill="none" stroke={flagged ? 'var(--c-red)' : 'var(--accent)'} strokeWidth="1.5" strokeLinejoin="round"
          style={{ transition: 'stroke .4s' }} />
        {flagged && (
          <g>
            <rect x={WX1 - 140} y={WY + LIM + 8} width="140" height="17" fill="var(--node)" stroke="var(--c-red)" />
            <text x={WX1 - 70} y={WY + LIM + 19.8} fontFamily={MONO} fontSize="8.5" fill="var(--c-red)" textAnchor="middle">▲ {L.flag}</text>
          </g>
        )}

        <path d="M10 104 H 470" stroke="var(--line)" />

        {/* ── Agente ── */}
        <text x="14" y="120" fontFamily={MONO} fontSize="8.5" fill="var(--fg-soft)" letterSpacing="1.2">{L.agent}</text>
        {qOn ? (
          <>
            <rect x="14" y="127" width="204" height="19" fill="var(--node)" stroke="var(--line-2)" />
            <text x="22" y="139.8" fontFamily={MONO} fontSize="8.8" fill="var(--fg-muted)">{L.q}</text>
            {answerLines.map((ln, i) => (
              <text key={i} x="14" y={161 + i * 13} fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="10" fill="var(--fg)">
                {i === 0 && <tspan fill="var(--accent)">▸ </tspan>}{ln}
                {i === answerLines.length - 1 && typed < 1 && step === 2 && <tspan fill="var(--accent)" opacity={t % 4 < 2 ? 1 : 0}>▍</tspan>}
              </text>
            ))}
            {srcOn && (
              <g>
                <rect x="14" y={chipY} width="196" height="17" fill="none" stroke="var(--accent)" strokeOpacity="0.7" />
                <text x="22" y={chipY + 11.5} fontFamily={MONO} fontSize="8" fill="var(--accent)">{L.src}</text>
              </g>
            )}
          </>
        ) : (
          <text x="14" y="142" fontFamily={MONO} fontSize="8" fill="var(--fg-soft)">
            {step === 0 ? L.idle : L.waiting}
          </text>
        )}

        {/* ── Estado da máquina ── */}
        <path d="M318 112 V 202" stroke="var(--line)" />
        <text x="334" y="120" fontFamily={MONO} fontSize="8.5" fill="var(--fg-soft)" letterSpacing="1.2">{L.status}</text>
        <circle cx="342" cy="140" r="6" fill={stateColor} style={{ transition: 'fill .4s' }} />
        <circle cx="342" cy="140" r="11" fill="none" stroke={stateColor} strokeOpacity="0.35" />
        <text x="358" y="144.5" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="600" fill="var(--fg)">{stateLabel}</text>
        {L.actions.map((act, i) => (
          <text key={i} x="334" y={166 + i * 12} fontFamily={MONO} fontSize="8.5"
            fill={i <= step ? 'var(--fg-muted)' : 'var(--fg-soft)'} opacity={i <= step ? 1 : 0.35}>
            {i <= step ? '✓' : '○'} {act}
          </text>
        ))}
      </svg>

      {/* Legenda do passo, em linguagem simples, com o projeto que o sustenta */}
      <p style={{ margin: '8px 0 0', paddingTop: 10, borderTop: '1px solid var(--line)', minHeight: 50, fontSize: 13.5, lineHeight: 1.5, color: 'var(--fg-muted)' }}>
        <span style={{ ...mono(11, { color: 'var(--accent)', marginRight: 7 }) }}>{String(step + 1).padStart(2, '0')}</span>
        <strong style={{ color: 'var(--fg)', fontWeight: 600 }}>{L.steps[step].t}.</strong>{' '}{L.steps[step].d}{' '}
        <span style={{ ...mono(10, { color: 'var(--fg-soft)', whiteSpace: 'nowrap' }) }}>· {L.proj}: <span style={{ color: 'var(--accent)' }}>{L.stepProject[step]}</span></span>
      </p>
    </motion.div>
  );
};
