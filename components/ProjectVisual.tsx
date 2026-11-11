import React from 'react';
import { Language } from '../types';
import { BrandMark } from './BrandMark';

// ─── Visual dos cards de projeto ─────────────────────────────────────────────
// Em cima, uma ilustração simples do problema resolvido (traço fino, cores do tema);
// embaixo, os logos da stack principal. Substitui os diagramas de pipeline, que
// ficavam ilegíveis a 220 px de altura.

const MONO = "'JetBrains Mono', monospace";
const INK = 'var(--fg-soft)';
const LINE = 'var(--line-2)';
const ACC = 'var(--accent)';

const Label: React.FC<{ x: number; y: number; children: React.ReactNode; color?: string; anchor?: 'start' | 'middle' | 'end' }> = ({
  x, y, children, color = INK, anchor = 'start',
}) => (
  <text x={x} y={y} fill={color} fontFamily={MONO} fontSize={9.5} letterSpacing=".1em" textAnchor={anchor}>{children}</text>
);

const Arrow: React.FC<{ x1: number; x2: number; y: number }> = ({ x1, x2, y }) => (
  <g stroke={ACC} strokeWidth={1.4} fill="none">
    <path className="pv-flow" d={`M${x1} ${y} H${x2 - 4}`} />
    <path d={`M${x2 - 7} ${y - 4} L${x2} ${y} L${x2 - 7} ${y + 4}`} />
  </g>
);

// Sinal sintético determinístico: senoides somadas, com um trecho anômalo
const wave = (n: number, x0: number, x1: number, y0: number, amp: (t: number) => number) => {
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const v = Math.sin(t * 92) * 0.55 + Math.sin(t * 211 + 1.3) * 0.3 + Math.sin(t * 37 + 0.4) * 0.15;
    pts.push(`${(x0 + (x1 - x0) * t).toFixed(1)},${(y0 - v * amp(t)).toFixed(1)}`);
  }
  return pts.join(' ');
};

const Vibration: React.FC<{ pt: boolean }> = ({ pt }) => {
  const a0 = 0.62, a1 = 0.84; // trecho anômalo (fração do eixo)
  const amp = (t: number) => (t > a0 && t < a1 ? 34 : 11);
  const X0 = 24, X1 = 376, Y = 78;
  const xa = X0 + (X1 - X0) * a0, xb = X0 + (X1 - X0) * a1;
  return (
    <>
      <Label x={24} y={22}>{pt ? 'VELOCIDADE RMS · SENSOR 07' : 'RMS VELOCITY · SENSOR 07'}</Label>
      <rect x={xa} y={30} width={xb - xa} height={96} fill={ACC} opacity={0.09} className="pv-pulse" />
      <line x1={X0} x2={X1} y1={Y - 22} y2={Y - 22} stroke={LINE} strokeDasharray="3 4" />
      <line x1={X0} x2={X1} y1={Y + 22} y2={Y + 22} stroke={LINE} strokeDasharray="3 4" />
      <Label x={X1} y={Y - 27} anchor="end">{pt ? 'limiar z = 3,5' : 'z = 3.5'}</Label>
      <polyline points={wave(260, X0, X1, Y, amp)} fill="none" stroke="var(--fg-muted)" strokeWidth={1.1} strokeLinejoin="round" />
      <g transform={`translate(${(xa + xb) / 2}, 30)`}>
        <rect x={-30} y={-13} width={60} height={17} rx={2} fill={ACC} />
        <text y={-1.5} textAnchor="middle" fill="var(--bg)" fontFamily={MONO} fontSize={8.5} fontWeight={600} letterSpacing=".14em">{pt ? 'ALERTA' : 'ALERT'}</text>
      </g>
      <Label x={24} y={140}>{pt ? 'normal' : 'normal'}</Label>
      <Label x={(xa + xb) / 2} y={140} anchor="middle" color={ACC}>{pt ? 'falha persistente' : 'persistent fault'}</Label>
    </>
  );
};

const Youfy: React.FC<{ pt: boolean }> = ({ pt }) => {
  const bars = Array.from({ length: 22 }, (_, i) => 10 + Math.abs(Math.sin(i * 1.7) * 26 + Math.sin(i * 0.6) * 12));
  const models = [
    { v: 'v1', tag: pt ? 'produção' : 'production', ok: false },
    { v: 'v2', tag: pt ? 'reprovado' : 'rejected', ok: false },
    { v: 'v3', tag: pt ? 'aprovado' : 'approved', ok: true },
  ];
  return (
    <>
      <Label x={24} y={22}>{pt ? 'ÁUDIO' : 'AUDIO'}</Label>
      {bars.map((h, i) => (
        <rect key={i} x={24 + i * 5.2} y={86 - h / 2} width={3} height={h} rx={1} fill="var(--fg-muted)" opacity={0.75} />
      ))}
      <Label x={24} y={140}>{pt ? 'dados versionados' : 'versioned data'}</Label>
      <Arrow x1={146} x2={180} y={86} />
      <Label x={190} y={22}>{pt ? 'MODELOS' : 'MODELS'}</Label>
      {models.map((m, i) => {
        const y = 40 + i * 34;
        return (
          <g key={m.v}>
            <rect x={190} y={y} width={92} height={24} rx={3} fill="none" stroke={m.ok ? ACC : LINE} />
            <text x={200} y={y + 15.5} fill={m.ok ? 'var(--fg)' : INK} fontFamily={MONO} fontSize={9.5}>{m.v}</text>
            <text x={272} y={y + 15.5} fill={m.ok ? ACC : INK} fontFamily={MONO} fontSize={9} textAnchor="end">{m.tag}</text>
          </g>
        );
      })}
      <Arrow x1={290} x2={318} y={116} />
      <g transform="translate(346, 116)">
        <circle r={20} fill="none" stroke={ACC} strokeWidth={1.4} />
        <path d="M-8 0 L-2 6 L9 -6" fill="none" stroke={ACC} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Label x={346} y={84} anchor="middle" color={ACC}>{pt ? 'PROMOVE' : 'PROMOTE'}</Label>
      <Label x={190} y={140}>{pt ? 'portão de promoção' : 'promotion gate'}</Label>
    </>
  );
};

const Sdr: React.FC<{ pt: boolean }> = ({ pt }) => {
  const days = pt ? ['S', 'T', 'Q', 'Q', 'S'] : ['M', 'T', 'W', 'T', 'F'];
  return (
    <>
      <Label x={24} y={22}>CHAT</Label>
      <rect x={24} y={34} width={118} height={22} rx={11} fill="none" stroke={LINE} />
      <text x={36} y={48.5} fill={INK} fontFamily={MONO} fontSize={8.5}>{pt ? 'Quero uma demo' : 'I want a demo'}</text>
      <rect x={48} y={64} width={128} height={22} rx={11} fill="color-mix(in srgb, var(--accent) 14%, transparent)" stroke={ACC} />
      <text x={60} y={78.5} fill="var(--fg)" fontFamily={MONO} fontSize={8.5}>{pt ? 'Quinta às 10h?' : 'Thursday 10am?'}</text>
      <rect x={24} y={94} width={70} height={22} rx={11} fill="none" stroke={LINE} />
      <text x={36} y={108.5} fill={INK} fontFamily={MONO} fontSize={8.5}>{pt ? 'Fechado' : 'Deal'}</text>
      <Label x={24} y={140}>{pt ? 'agente LLM' : 'LLM agent'}</Label>
      <Arrow x1={188} x2={222} y={75} />
      <Label x={234} y={22}>{pt ? 'CRM + AGENDA' : 'CRM + CALENDAR'}</Label>
      <rect x={234} y={34} width={142} height={20} rx={3} fill="none" stroke={LINE} />
      <text x={244} y={47.5} fill={INK} fontFamily={MONO} fontSize={8.5}>{pt ? 'lead registrado ✓' : 'lead recorded ✓'}</text>
      {days.map((d, i) => (
        <g key={i}>
          <text x={248 + i * 28} y={70} fill={INK} fontFamily={MONO} fontSize={8} textAnchor="middle">{d}</text>
          {[0, 1].map(r => {
            const booked = i === 3 && r === 0;
            return (
              <rect key={r} x={236 + i * 28} y={76 + r * 22} width={24} height={18} rx={2}
                fill={booked ? ACC : 'none'} stroke={booked ? ACC : LINE} className={booked ? 'pv-pulse' : undefined} />
            );
          })}
        </g>
      ))}
      <Label x={376} y={140} color={ACC} anchor="end">{pt ? 'reunião marcada' : 'meeting booked'}</Label>
    </>
  );
};

const Otensor: React.FC<{ pt: boolean }> = ({ pt }) => {
  const chip = (x: number, y: number, label: string) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={58} height={26} rx={3} fill="none" stroke={LINE} />
      {[8, 18, 28, 38, 48].map(px => <line key={px} x1={px + 2} x2={px + 2} y1={-4} y2={0} stroke={LINE} />)}
      <text x={29} y={16.5} fill={INK} fontFamily={MONO} fontSize={8} textAnchor="middle">{label}</text>
    </g>
  );
  const spark = Array.from({ length: 30 }, (_, i) => `${262 + i * 3.8},${96 - (Math.sin(i * 0.5) * 9 + (i > 21 ? (i - 21) * 3.2 : 0))}`).join(' ');
  return (
    <>
      <Label x={24} y={22}>{pt ? 'DISPOSITIVOS' : 'DEVICES'}</Label>
      {chip(24, 40, 'ESP32')}
      {chip(24, 88, 'RPi 5')}
      <Arrow x1={90} x2={132} y={53} />
      <Arrow x1={90} x2={132} y={101} />
      <circle cx={160} cy={77} r={22} fill="none" stroke={ACC} strokeWidth={1.4} />
      <text x={160} y={80} fill={ACC} fontFamily={MONO} fontSize={8.5} textAnchor="middle" letterSpacing=".1em">MQTT</text>
      <Arrow x1={188} x2={246} y={77} />
      <Label x={254} y={22}>{pt ? 'PAINEL AO VIVO' : 'LIVE DASHBOARD'}</Label>
      <rect x={254} y={34} width={122} height={84} rx={3} fill="none" stroke={LINE} />
      <line x1={262} x2={368} y1={70} y2={70} stroke={ACC} strokeDasharray="3 3" opacity={0.7} />
      <polyline points={spark} fill="none" stroke="var(--fg-muted)" strokeWidth={1.2} />
      <circle cx={262 + 29 * 3.8} cy={96 - (Math.sin(29 * 0.5) * 9 + 8 * 3.2)} r={3} fill={ACC} className="pv-pulse" />
      <text x={264} y={50} fill={INK} fontFamily={MONO} fontSize={8}>{pt ? 'temperatura' : 'temperature'}</text>
      <Label x={376} y={140} color={ACC} anchor="end">{pt ? 'limiar → automação' : 'threshold → automation'}</Label>
      <Label x={24} y={140}>{pt ? 'borda' : 'edge'}</Label>
    </>
  );
};

// ── Pesquisa ──────────────────────────────────────────────────────────────

// Tensão de saída do Buck: falha → CUSUM detecta → troca PI → LQR → recupera
const Buck: React.FC<{ pt: boolean }> = ({ pt }) => {
  const X0 = 24, X1 = 376, REF = 62;
  const tF = 0.3, tD = 0.42, tS = 0.5; // falha, detecção, troca
  const pts: string[] = [];
  for (let i = 0; i <= 220; i++) {
    const t = i / 220;
    let y = REF + Math.sin(t * 140) * 1.2;
    if (t > tF && t <= tS) y += 26 * (1 - Math.exp(-(t - tF) * 30)) + Math.sin(t * 90) * 4;
    if (t > tS) y += 26 * Math.exp(-(t - tS) * 28) * Math.cos((t - tS) * 60);
    pts.push(`${(X0 + (X1 - X0) * t).toFixed(1)},${y.toFixed(1)}`);
  }
  const x = (t: number) => X0 + (X1 - X0) * t;
  const cus = Array.from({ length: 60 }, (_, i) => {
    const t = i / 59, tt = tF + (tD - tF) * 1.6 * t;
    const v = tt < tF ? 0 : Math.min(1, (tt - tF) / (tD - tF));
    return `${x(tt).toFixed(1)},${(128 - v * 18).toFixed(1)}`;
  }).join(' ');
  return (
    <>
      <Label x={24} y={22}>{pt ? 'TENSÃO DE SAÍDA · BUCK' : 'OUTPUT VOLTAGE · BUCK'}</Label>
      <line x1={X0} x2={X1} y1={REF} y2={REF} stroke={LINE} strokeDasharray="3 4" />
      <Label x={X1} y={REF - 6} anchor="end">{pt ? 'referência' : 'reference'}</Label>
      <rect x={x(tF)} y={30} width={x(tS) - x(tF)} height={74} fill={ACC} opacity={0.08} />
      <polyline points={pts.join(' ')} fill="none" stroke="var(--fg-muted)" strokeWidth={1.2} strokeLinejoin="round" />
      <line x1={x(tF)} x2={x(tF)} y1={30} y2={104} stroke={LINE} />
      <Label x={x(tF) - 4} y={42} anchor="end">{pt ? 'falha' : 'fault'}</Label>
      <line x1={x(tS)} x2={x(tS)} y1={30} y2={132} stroke={ACC} strokeDasharray="2 3" />
      <g transform={`translate(${x(tS) + 6}, 36)`}>
        <rect width={84} height={16} rx={2} fill={ACC} className="pv-pulse" />
        <text x={42} y={11} textAnchor="middle" fill="var(--bg)" fontFamily={MONO} fontSize={8.5} fontWeight={600} letterSpacing=".08em">PI → LQR</text>
      </g>
      <polyline points={cus} fill="none" stroke={ACC} strokeWidth={1.4} />
      <Label x={24} y={142}>{pt ? 'CUSUM detecta' : 'CUSUM detects'}</Label>
      <Label x={X1} y={142} anchor="end" color={ACC}>{pt ? 'troca sem salto' : 'bumpless swap'}</Label>
    </>
  );
};

// Corrente do inversor seguindo a referência; variação paramétrica; RLS reidentifica
const Inverter: React.FC<{ pt: boolean }> = ({ pt }) => {
  const X0 = 24, X1 = 376, Y = 72, tP = 0.45, tR = 0.62;
  const x = (t: number) => X0 + (X1 - X0) * t;
  const ref: string[] = [], meas: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const t = i / 240, w = t * Math.PI * 9;
    ref.push(`${x(t).toFixed(1)},${(Y - Math.sin(w) * 28).toFixed(1)}`);
    let err = 0;
    if (t > tP && t < tR) err = 9 * Math.sin((t - tP) / (tR - tP) * Math.PI);
    meas.push(`${x(t).toFixed(1)},${(Y - Math.sin(w - err * 0.03) * (28 - err)).toFixed(1)}`);
  }
  return (
    <>
      <Label x={24} y={22}>{pt ? 'CORRENTE DE REDE · FCS-MPC' : 'GRID CURRENT · FCS-MPC'}</Label>
      <rect x={x(tP)} y={30} width={x(tR) - x(tP)} height={84} fill={ACC} opacity={0.08} />
      <polyline points={ref.join(' ')} fill="none" stroke={LINE} strokeWidth={1.2} strokeDasharray="3 3" />
      <polyline points={meas.join(' ')} fill="none" stroke="var(--fg-muted)" strokeWidth={1.2} />
      <line x1={x(tP)} x2={x(tP)} y1={30} y2={132} stroke={LINE} />
      <Label x={x(tP) - 4} y={40} anchor="end">{pt ? 'parâmetros mudam' : 'parameters drift'}</Label>
      <g transform={`translate(${x(tR) + 6}, 30)`}>
        <rect width={96} height={16} rx={2} fill={ACC} className="pv-pulse" />
        <text x={48} y={11} textAnchor="middle" fill="var(--bg)" fontFamily={MONO} fontSize={8.5} fontWeight={600} letterSpacing=".06em">{pt ? 'ARX via RLS' : 'ARX via RLS'}</text>
      </g>
      <Label x={24} y={142}>{pt ? '- - ref  — medida' : '- - ref  — measured'}</Label>
      <Label x={X1} y={142} anchor="end" color={ACC}>{pt ? 'reidentifica online' : 're-identified online'}</Label>
    </>
  );
};

// glassllm: do token ao próximo token, com a atenção causal à mostra
const Glass: React.FC<{ pt: boolean }> = ({ pt }) => {
  const toks = ['Alice', 'was', 'begin', 'ning', 'to'];
  const N = toks.length, C = 17, X0 = 78, Y0 = 34;
  // pesos de atenção ilustrativos (a linha da última posição é a que prevê o próximo token)
  const w = [[1], [.7, .3], [.2, .15, .65], [.1, .1, .6, .2], [.35, .08, .12, .15, .3]];
  return (
    <>
      <Label x={24} y={22}>{pt ? 'ATENÇÃO CAUSAL' : 'CAUSAL ATTENTION'}</Label>
      {toks.map((t, i) => (
        <text key={t} x={X0 - 8} y={Y0 + i * C + 11} fill={i === N - 1 ? 'var(--fg)' : INK} fontFamily={MONO} fontSize={9} textAnchor="end">{t}</text>
      ))}
      {w.map((row, i) => row.map((v, j) => (
        <rect key={`${i}-${j}`} x={X0 + j * C} y={Y0 + i * C} width={C - 3} height={C - 3} rx={2}
          fill={ACC} opacity={0.12 + v * 0.8} className={i === N - 1 ? 'pv-pulse' : undefined} />
      )))}
      {Array.from({ length: N }).map((_, i) => Array.from({ length: N - 1 - i }).map((__, k) => {
        const j = i + 1 + k;
        return <rect key={`m${i}-${j}`} x={X0 + j * C} y={Y0 + i * C} width={C - 3} height={C - 3} rx={2} fill="none" stroke={LINE} strokeDasharray="2 3" />;
      }))}
      <rect x={X0 - 4} y={Y0 + (N - 1) * C - 3} width={N * C + 2} height={C + 3} rx={3} fill="none" stroke={ACC} />
      <Arrow x1={X0 + N * C + 12} x2={X0 + N * C + 50} y={Y0 + (N - 1) * C + 9} />
      <Label x={290} y={22}>SOFTMAX</Label>
      {[44, 26, 18, 10, 6].map((h, i) => (
        <rect key={i} x={290 + i * 17} y={110 - h} width={11} height={h} rx={1.5} fill={i === 0 ? ACC : 'var(--fg-muted)'} opacity={i === 0 ? 1 : 0.55} />
      ))}
      <Label x={290} y={126}>{pt ? 'próximo token' : 'next token'}</Label>
      <Label x={24} y={142}>{pt ? 'só NumPy · cada cálculo à mostra' : 'NumPy only · every step visible'}</Label>
    </>
  );
};

// Manual com trechos, um deles recuperado, e a resposta citando a página
const Rag: React.FC<{ pt: boolean }> = ({ pt }) => {
  const rows = [0, 1, 2, 3, 4, 5];
  const hit = 3;
  return (
    <>
      <Label x={24} y={22}>{pt ? 'MANUAL · P. 42' : 'MANUAL · P. 42'}</Label>
      <rect x={24} y={30} width={112} height={98} rx={3} fill="none" stroke={LINE} />
      {rows.map(i => (
        <rect key={i} x={34} y={40 + i * 14} width={i === hit ? 92 : 70 + ((i * 17) % 22)} height={7} rx={2}
          fill={i === hit ? ACC : 'var(--fg-muted)'} opacity={i === hit ? 1 : 0.35}
          className={i === hit ? 'pv-pulse' : undefined} />
      ))}
      <Label x={24} y={142}>{pt ? 'busca vetorial + BM25' : 'vector + BM25 search'}</Label>
      <Arrow x1={150} x2={196} y={79} />
      <Label x={210} y={22}>{pt ? 'RESPOSTA' : 'ANSWER'}</Label>
      <rect x={210} y={34} width={166} height={58} rx={6} fill="color-mix(in srgb, var(--accent) 14%, transparent)" stroke={ACC} />
      <text x={222} y={52} fill="var(--fg)" fontFamily={MONO} fontSize={8.5}>{pt ? 'Segundo o manual,' : 'According to the'}</text>
      <text x={222} y={66} fill="var(--fg)" fontFamily={MONO} fontSize={8.5}>{pt ? 'o procedimento é…' : 'manual, the step is…'}</text>
      <text x={222} y={82} fill={ACC} fontFamily={MONO} fontSize={8.5}>(p. 42)</text>
      <rect x={210} y={100} width={166} height={20} rx={3} fill="none" stroke={LINE} />
      <text x={220} y={113.5} fill={INK} fontFamily={MONO} fontSize={8.5}>{pt ? 'sem fonte? "não encontrei"' : 'no source? "not found"'}</text>
      <Label x={376} y={142} color={ACC} anchor="end">hit@3 12/13</Label>
    </>
  );
};

const VISUALS: Record<string, { art: React.FC<{ pt: boolean }>; stack: string[] }> = {
  'vibration-anomaly': { art: Vibration, stack: ['python', 'fastapi', 'redis', 'docker', 'pytest'] },
  'rag-manual':        { art: Rag,       stack: ['python', 'pytorch', 'ollama', 'pytest'] },
  'youfy':             { art: Youfy,     stack: ['python', 'pytorch', 'mlflow', 'dvc', 'postgresql'] },
  'sdr-agent':         { art: Sdr,       stack: ['openai', 'fastapi', 'redis', 'react'] },
  'glassllm':          { art: Glass,     stack: ['python', 'numpy', 'pytorch', 'pypi'] },
  'otensor':           { art: Otensor,   stack: ['espressif', 'raspberrypi', 'mqtt', 'docker', 'aws'] },
  'research:ufabc':    { art: Buck,      stack: ['ufabc', 'afosr', 'python', 'crewai', 'matlab'] },
  'research:ufpa':     { art: Inverter,  stack: ['ufpa', 'python', 'pytorch', 'matlab', 'scipy'] },
};

export const hasProjectVisual = (id?: string) => !!id && id in VISUALS;

export const ProjectVisual: React.FC<{ id: string; lang: Language }> = ({ id, lang }) => {
  const v = VISUALS[id];
  if (!v) return null;
  const Art = v.art;
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true"
        style={{ flex: 1, minHeight: 0, width: '100%', display: 'block' }}>
        <Art pt={lang === 'pt'} />
      </svg>
      <div className="pv-stack">
        {v.stack.map(b => (
          <span key={b} className="brand-host" style={{ display: 'inline-flex' }}>
            <BrandMark id={b} height={({ aws: 24, ufabc: 30, ufpa: 30, afosr: 24 } as Record<string, number>)[b] ?? 20} maxWidth={64} />
          </span>
        ))}
      </div>
    </div>
  );
};
