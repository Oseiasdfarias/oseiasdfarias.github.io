import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { BrandMark } from './BrandMark';

// ─── Visual dos cards de projeto ─────────────────────────────────────────────
// Em cima, uma ilustração simples do problema resolvido (traço fino, cores do tema),
// animada como uma pequena cena que conta a história do projeto em loop;
// embaixo, os logos da stack principal.
// Cada cena recebe t ∈ [0, 1) de uma linha do tempo de CYCLE_MS que só roda com o
// card visível. Com "reduzir movimento", a cena fica parada no quadro final.

const MONO = "'JetBrains Mono', monospace";
const INK = 'var(--fg-soft)';
const LINE = 'var(--line-2)';
const ACC = 'var(--accent)';
const CYCLE_MS = 7000;
const STILL_T = 0.9;

// ── tempo ──
const seg = (t: number, a: number, b: number) => Math.max(0, Math.min(1, (t - a) / (b - a)));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);
const pop = (x: number) => (x <= 0 ? 0 : x < 0.6 ? ease(x / 0.6) * 1.15 : 1.15 - 0.15 * ease((x - 0.6) / 0.4)); // passa e assenta
const fadeEnd = (t: number) => 1 - seg(t, 0.93, 1);   // tudo que foi revelado some no fim do ciclo
const frac = (x: number) => x - Math.floor(x);

const useCycle = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(STILL_T);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = ref.current; if (!el) return;
    let raf = 0, last = 0, t0 = performance.now(), on = false;
    const tick = (now: number) => {
      if (now - last > 33) { last = now; setT(((now - t0) % CYCLE_MS) / CYCLE_MS); }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !on) { on = true; t0 = performance.now(); raf = requestAnimationFrame(tick); }
      else if (!e.isIntersecting && on) { on = false; cancelAnimationFrame(raf); }
    });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return [ref, t] as const;
};

type ArtProps = { pt: boolean; t: number };

const Label: React.FC<{ x: number; y: number; children: React.ReactNode; color?: string; anchor?: 'start' | 'middle' | 'end'; o?: number }> = ({
  x, y, children, color = INK, anchor = 'start', o = 1,
}) => (
  <text x={x} y={y} fill={color} fontFamily={MONO} fontSize={9.5} letterSpacing=".1em" textAnchor={anchor} opacity={o}>{children}</text>
);

const Arrow: React.FC<{ x1: number; x2: number; y: number }> = ({ x1, x2, y }) => (
  <g stroke={ACC} strokeWidth={1.4} fill="none">
    <path className="pv-flow" d={`M${x1} ${y} H${x2 - 4}`} />
    <path d={`M${x2 - 7} ${y - 4} L${x2} ${y} L${x2 - 7} ${y + 4}`} />
  </g>
);

// pacote que atravessa uma seta (p ∈ [0, 1])
const Packet: React.FC<{ x1: number; x2: number; y: number; p: number }> = ({ x1, x2, y, p }) =>
  p > 0 && p < 1 ? (
    <g opacity={Math.sin(p * Math.PI)}>
      <circle cx={x1 + (x2 - x1) * p} cy={y} r={5} fill={ACC} opacity={0.25} />
      <circle cx={x1 + (x2 - x1) * p} cy={y} r={2.2} fill={ACC} />
    </g>
  ) : null;

// grupo que aparece subindo de leve
const Appear: React.FC<{ k: number; children: React.ReactNode; dy?: number }> = ({ k, children, dy = 5 }) => (
  <g opacity={k} transform={`translate(0 ${((1 - k) * dy).toFixed(2)})`}>{children}</g>
);

// grupo que "pula" ao aparecer, centrado em (cx, cy)
const Pop: React.FC<{ k: number; cx: number; cy: number; children: React.ReactNode }> = ({ k, cx, cy, children }) => {
  const s = pop(k);
  return k <= 0 ? null : <g opacity={Math.min(1, k * 2)} transform={`translate(${cx} ${cy}) scale(${s.toFixed(3)}) translate(${-cx} ${-cy})`}>{children}</g>;
};

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

// recorte horizontal que revela um traço da esquerda até x
const Reveal: React.FC<{ id: string; x0: number; x: number; children: React.ReactNode }> = ({ id, x0, x, children }) => (
  <>
    <clipPath id={id}><rect x={0} y={0} width={Math.max(0, x)} height={150} /></clipPath>
    <g clipPath={`url(#${id})`}>{children}</g>
    {x > x0 && <line x1={x} x2={x} y1={28} y2={128} stroke={ACC} strokeOpacity={0.6} />}
  </>
);

// ── Projetos ──────────────────────────────────────────────────────────────

const Vibration: React.FC<ArtProps> = ({ pt, t }) => {
  const a0 = 0.62, a1 = 0.84; // trecho anômalo (fração do eixo)
  const amp = (u: number) => (u > a0 && u < a1 ? 34 : 11);
  const X0 = 24, X1 = 376, Y = 78;
  const xa = X0 + (X1 - X0) * a0, xb = X0 + (X1 - X0) * a1;
  const p = seg(t, 0.04, 0.72), f = fadeEnd(t), xr = X0 + (X1 - X0) * p;
  const hot = seg(p, a0, a0 + 0.04) * f, alert = seg(p, a0 + 0.06, a0 + 0.16) * f;
  return (
    <>
      <Label x={24} y={22}>{pt ? 'VELOCIDADE RMS · SENSOR 07' : 'RMS VELOCITY · SENSOR 07'}</Label>
      <rect x={xa} y={30} width={xb - xa} height={96} fill={ACC} opacity={0.11 * hot} />
      <line x1={X0} x2={X1} y1={Y - 22} y2={Y - 22} stroke={LINE} strokeDasharray="3 4" />
      <line x1={X0} x2={X1} y1={Y + 22} y2={Y + 22} stroke={LINE} strokeDasharray="3 4" />
      <Label x={X1} y={Y - 27} anchor="end">{pt ? 'limiar z = 3,5' : 'z = 3.5'}</Label>
      <g opacity={f}>
        <Reveal id="pv-vib" x0={X0} x={p < 1 ? xr : -1}>
          <polyline points={wave(260, X0, X1, Y, amp)} fill="none" stroke="var(--fg-muted)" strokeWidth={1.1} strokeLinejoin="round" />
        </Reveal>
        {p >= 1 && <polyline points={wave(260, X0, X1, Y, amp)} fill="none" stroke="var(--fg-muted)" strokeWidth={1.1} strokeLinejoin="round" />}
      </g>
      <Pop k={alert} cx={(xa + xb) / 2} cy={22}>
        <rect x={(xa + xb) / 2 - 30} y={17} width={60} height={17} rx={2} fill={ACC} />
        <text x={(xa + xb) / 2} y={28.5} textAnchor="middle" fill="var(--bg)" fontFamily={MONO} fontSize={8.5} fontWeight={600} letterSpacing=".14em">{pt ? 'ALERTA' : 'ALERT'}</text>
      </Pop>
      <Label x={24} y={140}>normal</Label>
      <Label x={(xa + xb) / 2} y={140} anchor="middle" color={ACC} o={alert}>{pt ? 'falha persistente' : 'persistent fault'}</Label>
    </>
  );
};

const Rag: React.FC<ArtProps> = ({ pt, t }) => {
  const rows = [0, 1, 2, 3, 4, 5], hit = 3, f = fadeEnd(t);
  const scan = seg(t, 0.04, 0.32);                       // feixe desce pelas linhas
  const found = seg(t, 0.3, 0.36) * f;
  const ans = seg(t, 0.5, 0.56) * f;
  const l1 = seg(t, 0.56, 0.66), l2 = seg(t, 0.66, 0.76), cite = seg(t, 0.76, 0.82) * f;
  const s1 = pt ? 'Segundo o manual,' : 'According to the', s2 = pt ? 'o procedimento é…' : 'manual, the step is…';
  const typed = (s: string, k: number) => s.slice(0, Math.round(s.length * k));
  return (
    <>
      <Label x={24} y={22}>{pt ? 'MANUAL · P. 42' : 'MANUAL · P. 42'}</Label>
      <rect x={24} y={30} width={112} height={98} rx={3} fill="none" stroke={LINE} />
      {rows.map(i => {
        const isHit = i === hit;
        return (
          <rect key={i} x={34} y={40 + i * 14} width={isHit ? 92 : 70 + ((i * 17) % 22)} height={7} rx={2}
            fill={isHit && found > 0 ? ACC : 'var(--fg-muted)'} opacity={isHit ? 0.35 + 0.65 * found : 0.35} />
        );
      })}
      {scan > 0 && scan < 1 && (
        <rect x={28} y={36 + scan * 5 * 14} width={104} height={15} rx={2} fill={ACC} opacity={0.12} stroke={ACC} strokeOpacity={0.5} />
      )}
      <Label x={24} y={142}>{pt ? 'busca vetorial + BM25' : 'vector + BM25 search'}</Label>
      <Arrow x1={150} x2={196} y={79} />
      <Packet x1={140} x2={196} y={79} p={seg(t, 0.37, 0.5)} />
      <Label x={210} y={22}>{pt ? 'RESPOSTA' : 'ANSWER'}</Label>
      <Appear k={ans}>
        <rect x={210} y={34} width={166} height={58} rx={6} fill="color-mix(in srgb, var(--accent) 14%, transparent)" stroke={ACC} />
      </Appear>
      <g opacity={f}>
        <text x={222} y={52} fill="var(--fg)" fontFamily={MONO} fontSize={8.5}>{typed(s1, l1)}</text>
        <text x={222} y={66} fill="var(--fg)" fontFamily={MONO} fontSize={8.5}>{typed(s2, l2)}</text>
      </g>
      <Pop k={cite} cx={238} cy={79}><text x={222} y={82} fill={ACC} fontFamily={MONO} fontSize={8.5}>(p. 42)</text></Pop>
      <rect x={210} y={100} width={166} height={20} rx={3} fill="none" stroke={LINE} />
      <text x={220} y={113.5} fill={INK} fontFamily={MONO} fontSize={8.5}>{pt ? 'sem fonte? "não encontrei"' : 'no source? "not found"'}</text>
      <Label x={376} y={142} color={ACC} anchor="end" o={0.35 + 0.65 * cite}>hit@3 12/13</Label>
    </>
  );
};

const Youfy: React.FC<ArtProps> = ({ pt, t }) => {
  const base = Array.from({ length: 22 }, (_, i) => 10 + Math.abs(Math.sin(i * 1.7) * 26 + Math.sin(i * 0.6) * 12));
  const f = fadeEnd(t);
  const models = [
    { v: 'v1', tag: pt ? 'produção' : 'production', at: 0.18 },
    { v: 'v2', tag: pt ? 'reprovado' : 'rejected', at: 0.34 },
    { v: 'v3', tag: pt ? 'aprovado' : 'approved', at: 0.5 },
  ];
  const promote = seg(t, 0.64, 0.68) * f, check = seg(t, 0.68, 0.8);
  return (
    <>
      <Label x={24} y={22}>{pt ? 'ÁUDIO' : 'AUDIO'}</Label>
      {base.map((h0, i) => {
        const h = h0 * (0.55 + 0.45 * Math.abs(Math.sin(t * Math.PI * 2 * 3 + i * 0.55)));
        return <rect key={i} x={24 + i * 5.2} y={86 - h / 2} width={3} height={h} rx={1} fill="var(--fg-muted)" opacity={0.75} />;
      })}
      <Label x={24} y={140}>{pt ? 'dados versionados' : 'versioned data'}</Label>
      <Arrow x1={146} x2={180} y={86} />
      <Packet x1={146} x2={180} y={86} p={frac(t * 3)} />
      <Label x={190} y={22}>{pt ? 'MODELOS' : 'MODELS'}</Label>
      {models.map((m, i) => {
        const y = 40 + i * 34;
        const k = seg(t, m.at, m.at + 0.08) * f;            // avaliado
        const ok = i === 2, bad = i === 1;
        const col = k > 0.3 ? (ok ? ACC : bad ? 'var(--c-red)' : INK) : LINE;
        return (
          <g key={m.v}>
            {k > 0 && k < 1 && <rect x={190} y={y} width={92 * k} height={24} rx={3} fill={ACC} opacity={0.12} />}
            <rect x={190} y={y} width={92} height={24} rx={3} fill="none" stroke={col} />
            <text x={200} y={y + 15.5} fill={ok && k > 0.3 ? 'var(--fg)' : INK} fontFamily={MONO} fontSize={9.5}>{m.v}</text>
            <text x={272} y={y + 15.5} fill={k > 0.3 ? col : INK} opacity={0.4 + 0.6 * k} fontFamily={MONO} fontSize={9} textAnchor="end">{m.tag}</text>
          </g>
        );
      })}
      <Arrow x1={290} x2={318} y={116} />
      <Packet x1={284} x2={318} y={116} p={seg(t, 0.58, 0.66)} />
      <g transform="translate(346, 116)">
        <circle r={20} fill={ACC} opacity={0.12 * promote} />
        <circle r={20} fill="none" stroke={ACC} strokeWidth={1.4} opacity={0.35 + 0.65 * promote} />
        <path d="M-8 0 L-2 6 L9 -6" fill="none" stroke={ACC} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          pathLength={1} strokeDasharray={1} strokeDashoffset={1 - check * f} />
        {promote > 0 && <circle r={20 + promote * 10 * (1 - check)} fill="none" stroke={ACC} opacity={(1 - check) * 0.6} />}
      </g>
      <Label x={346} y={84} anchor="middle" color={ACC} o={0.4 + 0.6 * promote}>{pt ? 'PROMOVE' : 'PROMOTE'}</Label>
      <Label x={190} y={140}>{pt ? 'portão de promoção' : 'promotion gate'}</Label>
    </>
  );
};

const Sdr: React.FC<ArtProps> = ({ pt, t }) => {
  const days = pt ? ['S', 'T', 'Q', 'Q', 'S'] : ['M', 'T', 'W', 'T', 'F'];
  const f = fadeEnd(t);
  const b1 = seg(t, 0.04, 0.12) * f, b2 = seg(t, 0.2, 0.28) * f, b3 = seg(t, 0.36, 0.44) * f;
  const lead = seg(t, 0.52, 0.58) * f, book = seg(t, 0.64, 0.72) * f, done = seg(t, 0.74, 0.8) * f;
  return (
    <>
      <Label x={24} y={22}>CHAT</Label>
      <Appear k={b1}>
        <rect x={24} y={34} width={118} height={22} rx={11} fill="none" stroke={LINE} />
        <text x={36} y={48.5} fill={INK} fontFamily={MONO} fontSize={8.5}>{pt ? 'Quero uma demo' : 'I want a demo'}</text>
      </Appear>
      <Appear k={b2}>
        <rect x={48} y={64} width={128} height={22} rx={11} fill="color-mix(in srgb, var(--accent) 14%, transparent)" stroke={ACC} />
        <text x={60} y={78.5} fill="var(--fg)" fontFamily={MONO} fontSize={8.5}>{pt ? 'Quinta às 10h?' : 'Thursday 10am?'}</text>
      </Appear>
      {t > 0.12 && t < 0.2 && ( // "digitando…"
        [0, 1, 2].map(i => <circle key={i} cx={152 + i * 7} cy={75} r={2} fill={ACC} opacity={0.3 + 0.7 * Math.abs(Math.sin(t * 60 + i))} />)
      )}
      <Appear k={b3}>
        <rect x={24} y={94} width={70} height={22} rx={11} fill="none" stroke={LINE} />
        <text x={36} y={108.5} fill={INK} fontFamily={MONO} fontSize={8.5}>{pt ? 'Fechado' : 'Deal'}</text>
      </Appear>
      <Label x={24} y={140}>{pt ? 'agente LLM' : 'LLM agent'}</Label>
      <Arrow x1={188} x2={222} y={75} />
      <Packet x1={182} x2={222} y={75} p={seg(t, 0.44, 0.52)} />
      <Label x={234} y={22}>{pt ? 'CRM + AGENDA' : 'CRM + CALENDAR'}</Label>
      <rect x={234} y={34} width={142} height={20} rx={3} fill="none" stroke={lead > 0.3 ? ACC : LINE} />
      <text x={244} y={47.5} fill={lead > 0.3 ? 'var(--fg)' : INK} opacity={0.35 + 0.65 * lead} fontFamily={MONO} fontSize={8.5}>{pt ? 'lead registrado ✓' : 'lead recorded ✓'}</text>
      {days.map((d, i) => (
        <g key={i}>
          <text x={248 + i * 28} y={70} fill={INK} fontFamily={MONO} fontSize={8} textAnchor="middle">{d}</text>
          {[0, 1].map(r => {
            const booked = i === 3 && r === 0, x = 236 + i * 28, y = 76 + r * 22;
            return (
              <g key={r}>
                <rect x={x} y={y} width={24} height={18} rx={2} fill="none" stroke={LINE} />
                {booked && <Pop k={book} cx={x + 12} cy={y + 9}><rect x={x} y={y} width={24} height={18} rx={2} fill={ACC} stroke={ACC} /></Pop>}
              </g>
            );
          })}
        </g>
      ))}
      <Label x={376} y={140} color={ACC} anchor="end" o={done}>{pt ? 'reunião marcada' : 'meeting booked'}</Label>
    </>
  );
};

const Otensor: React.FC<ArtProps> = ({ pt, t }) => {
  const chip = (x: number, y: number, label: string, k: number) => (
    <g transform={`translate(${x}, ${y})`}>
      <rect width={58} height={26} rx={3} fill={ACC} fillOpacity={0.14 * k} stroke={k > 0.2 ? ACC : LINE} />
      {[8, 18, 28, 38, 48].map(px => <line key={px} x1={px + 2} x2={px + 2} y1={-4} y2={0} stroke={LINE} />)}
      <text x={29} y={16.5} fill={INK} fontFamily={MONO} fontSize={8} textAnchor="middle">{label}</text>
    </g>
  );
  const N = 30, px = (i: number) => 262 + i * 3.8, py = (i: number) => 96 - (Math.sin(i * 0.5) * 9 + (i > 21 ? (i - 21) * 3.2 : 0));
  const p = seg(t, 0.08, 0.8), f = fadeEnd(t), n = Math.max(2, Math.round(p * (N - 1)) + 1);
  const spark = Array.from({ length: n }, (_, i) => `${px(i)},${py(i)}`).join(' ');
  const ph1 = frac(t * 4), ph2 = frac(t * 4 + 0.5);                   // pacotes contínuos
  const beat = Math.max(Math.sin(ph1 * Math.PI) * (ph1 > 0.75 ? 1 : 0), 0);
  const over = n - 1 > 21;                                            // passou do limiar
  return (
    <>
      <Label x={24} y={22}>{pt ? 'DISPOSITIVOS' : 'DEVICES'}</Label>
      {chip(24, 40, 'ESP32', Math.sin(ph1 * Math.PI) * (ph1 < 0.3 ? 1 : 0))}
      {chip(24, 88, 'RPi 5', Math.sin(ph2 * Math.PI) * (ph2 < 0.3 ? 1 : 0))}
      <Arrow x1={90} x2={132} y={53} />
      <Arrow x1={90} x2={132} y={101} />
      <Packet x1={86} x2={138} y={53} p={ph1} />
      <Packet x1={86} x2={138} y={101} p={ph2} />
      {[0, 0.5].map(o => {
        const r = frac(t * 2 + o);
        return <circle key={o} cx={160} cy={77} r={22 + r * 16} fill="none" stroke={ACC} opacity={(1 - r) * 0.45} />;
      })}
      <circle cx={160} cy={77} r={22} fill={ACC} fillOpacity={0.08 + beat * 0.1} stroke={ACC} strokeWidth={1.4} />
      <text x={160} y={80} fill={ACC} fontFamily={MONO} fontSize={8.5} textAnchor="middle" letterSpacing=".1em">MQTT</text>
      <Arrow x1={188} x2={246} y={77} />
      <Packet x1={184} x2={250} y={77} p={frac(t * 4 + 0.25)} />
      <Label x={254} y={22}>{pt ? 'PAINEL AO VIVO' : 'LIVE DASHBOARD'}</Label>
      <rect x={254} y={34} width={122} height={84} rx={3} fill="none" stroke={over ? ACC : LINE} strokeOpacity={over ? f : 1} />
      <line x1={262} x2={368} y1={70} y2={70} stroke={ACC} strokeDasharray="3 3" opacity={0.7} />
      <g opacity={f}>
        <polyline points={spark} fill="none" stroke="var(--fg-muted)" strokeWidth={1.2} />
        <circle cx={px(n - 1)} cy={py(n - 1)} r={3} fill={ACC} />
        <circle cx={px(n - 1)} cy={py(n - 1)} r={6} fill={ACC} opacity={0.25} />
      </g>
      <text x={264} y={50} fill={INK} fontFamily={MONO} fontSize={8}>{pt ? 'temperatura' : 'temperature'}</text>
      <Label x={376} y={140} color={ACC} anchor="end" o={over ? f : 0.4}>{pt ? 'limiar → automação' : 'threshold → automation'}</Label>
      <Label x={24} y={140}>{pt ? 'borda' : 'edge'}</Label>
    </>
  );
};

// glassllm: do token ao próximo token, com a atenção causal à mostra
const Glass: React.FC<ArtProps> = ({ pt, t }) => {
  const toks = ['Alice', 'was', 'begin', 'ning', 'to'];
  const N = toks.length, C = 17, X0 = 78, Y0 = 34, f = fadeEnd(t);
  // pesos de atenção ilustrativos (a linha da última posição é a que prevê o próximo token)
  const w = [[1], [.7, .3], [.2, .15, .65], [.1, .1, .6, .2], [.35, .08, .12, .15, .3]];
  const rowK = (i: number) => seg(t, 0.05 + i * 0.08, 0.13 + i * 0.08) * f;
  const sm = (i: number) => seg(t, 0.52 + i * 0.04, 0.64 + i * 0.04) * f;
  return (
    <>
      <Label x={24} y={22}>{pt ? 'ATENÇÃO CAUSAL' : 'CAUSAL ATTENTION'}</Label>
      {toks.map((tk, i) => (
        <text key={tk} x={X0 - 8} y={Y0 + i * C + 11} fill={rowK(i) > 0.5 && i === N - 1 ? 'var(--fg)' : INK} fontFamily={MONO} fontSize={9} textAnchor="end">{tk}</text>
      ))}
      {Array.from({ length: N }).map((_, i) => Array.from({ length: N }).map((__, j) => (
        <rect key={`g${i}-${j}`} x={X0 + j * C} y={Y0 + i * C} width={C - 3} height={C - 3} rx={2} fill="none" stroke={LINE} strokeDasharray={j > i ? '2 3' : undefined} strokeOpacity={j > i ? 1 : 0.5} />
      )))}
      {w.map((row, i) => row.map((v, j) => {
        const k = seg(rowK(i), j / row.length * 0.6, j / row.length * 0.6 + 0.4);
        return <rect key={`${i}-${j}`} x={X0 + j * C} y={Y0 + i * C} width={C - 3} height={C - 3} rx={2} fill={ACC} opacity={(0.12 + v * 0.8) * k} />;
      }))}
      <rect x={X0 - 4} y={Y0 + (N - 1) * C - 3} width={N * C + 2} height={C + 3} rx={3} fill="none" stroke={ACC} opacity={0.3 + 0.7 * rowK(N - 1)} />
      <Arrow x1={X0 + N * C + 12} x2={X0 + N * C + 50} y={Y0 + (N - 1) * C + 9} />
      <Packet x1={X0 + N * C + 8} x2={X0 + N * C + 54} y={Y0 + (N - 1) * C + 9} p={seg(t, 0.44, 0.54)} />
      <Label x={290} y={22}>SOFTMAX</Label>
      {[44, 26, 18, 10, 6].map((h, i) => {
        const hh = h * ease(sm(i));
        return <rect key={i} x={290 + i * 17} y={110 - hh} width={11} height={hh} rx={1.5} fill={i === 0 ? ACC : 'var(--fg-muted)'} opacity={i === 0 ? 1 : 0.55} />;
      })}
      <line x1={286} x2={376} y1={110.5} y2={110.5} stroke={LINE} />
      <Label x={290} y={126}>{pt ? 'próximo token' : 'next token'}</Label>
      <Label x={24} y={142}>{pt ? 'só NumPy · cada cálculo à mostra' : 'NumPy only · every step visible'}</Label>
    </>
  );
};

// ── Pesquisa ──────────────────────────────────────────────────────────────

// Tensão de saída do Buck: falha → CUSUM detecta → troca PI → LQR → recupera
const Buck: React.FC<ArtProps> = ({ pt, t }) => {
  const X0 = 24, X1 = 376, REF = 62;
  const tF = 0.3, tD = 0.42, tS = 0.5; // falha, detecção, troca
  const pts: string[] = [];
  for (let i = 0; i <= 220; i++) {
    const u = i / 220;
    let y = REF + Math.sin(u * 140) * 1.2;
    if (u > tF && u <= tS) y += 26 * (1 - Math.exp(-(u - tF) * 30)) + Math.sin(u * 90) * 4;
    if (u > tS) y += 26 * Math.exp(-(u - tS) * 28) * Math.cos((u - tS) * 60);
    pts.push(`${(X0 + (X1 - X0) * u).toFixed(1)},${y.toFixed(1)}`);
  }
  const x = (u: number) => X0 + (X1 - X0) * u;
  const cus = Array.from({ length: 60 }, (_, i) => {
    const s = i / 59, tt = tF + (tD - tF) * 1.6 * s;
    const v = tt < tF ? 0 : Math.min(1, (tt - tF) / (tD - tF));
    return `${x(tt).toFixed(1)},${(128 - v * 18).toFixed(1)}`;
  }).join(' ');
  const p = seg(t, 0.04, 0.76), f = fadeEnd(t);
  const fault = seg(p, tF, tF + 0.03) * f, swap = seg(p, tS, tS + 0.08) * f, ok = seg(p, 0.75, 0.85) * f;
  return (
    <>
      <Label x={24} y={22}>{pt ? 'TENSÃO DE SAÍDA · BUCK' : 'OUTPUT VOLTAGE · BUCK'}</Label>
      <line x1={X0} x2={X1} y1={REF} y2={REF} stroke={LINE} strokeDasharray="3 4" />
      <Label x={X1} y={REF - 6} anchor="end">{pt ? 'referência' : 'reference'}</Label>
      <rect x={x(tF)} y={30} width={x(tS) - x(tF)} height={74} fill={ACC} opacity={0.1 * fault} />
      <g opacity={f}>
        <Reveal id="pv-buck" x0={X0} x={p < 1 ? x(p) : 999}>
          <polyline points={pts.join(' ')} fill="none" stroke="var(--fg-muted)" strokeWidth={1.2} strokeLinejoin="round" />
          <polyline points={cus} fill="none" stroke={ACC} strokeWidth={1.4} />
        </Reveal>
      </g>
      <line x1={x(tF)} x2={x(tF)} y1={30} y2={104} stroke={LINE} opacity={0.3 + 0.7 * fault} />
      <Label x={x(tF) - 4} y={42} anchor="end" o={0.3 + 0.7 * fault}>{pt ? 'falha' : 'fault'}</Label>
      <line x1={x(tS)} x2={x(tS)} y1={30} y2={132} stroke={ACC} strokeDasharray="2 3" opacity={0.3 + 0.7 * swap} />
      <Pop k={swap} cx={x(tS) + 48} cy={44}>
        <rect x={x(tS) + 6} y={36} width={84} height={16} rx={2} fill={ACC} />
        <text x={x(tS) + 48} y={47} textAnchor="middle" fill="var(--bg)" fontFamily={MONO} fontSize={8.5} fontWeight={600} letterSpacing=".08em">PI → LQR</text>
      </Pop>
      <Label x={24} y={142}>{pt ? 'CUSUM detecta' : 'CUSUM detects'}</Label>
      <Label x={X1} y={142} anchor="end" color={ACC} o={0.35 + 0.65 * ok}>{pt ? 'troca sem salto' : 'bumpless swap'}</Label>
    </>
  );
};

// Corrente do inversor seguindo a referência; variação paramétrica; RLS reidentifica
const Inverter: React.FC<ArtProps> = ({ pt, t }) => {
  const X0 = 24, X1 = 376, Y = 72, tP = 0.45, tR = 0.62;
  const x = (u: number) => X0 + (X1 - X0) * u;
  const ref: string[] = [], meas: string[] = [];
  for (let i = 0; i <= 240; i++) {
    const u = i / 240, w = u * Math.PI * 9;
    ref.push(`${x(u).toFixed(1)},${(Y - Math.sin(w) * 28).toFixed(1)}`);
    let err = 0;
    if (u > tP && u < tR) err = 9 * Math.sin((u - tP) / (tR - tP) * Math.PI);
    meas.push(`${x(u).toFixed(1)},${(Y - Math.sin(w - err * 0.03) * (28 - err)).toFixed(1)}`);
  }
  const p = seg(t, 0.04, 0.76), f = fadeEnd(t);
  const drift = seg(p, tP, tP + 0.03) * f, rls = seg(p, tR, tR + 0.08) * f, ok = seg(p, 0.8, 0.9) * f;
  return (
    <>
      <Label x={24} y={22}>{pt ? 'CORRENTE DE REDE · FCS-MPC' : 'GRID CURRENT · FCS-MPC'}</Label>
      <rect x={x(tP)} y={30} width={x(tR) - x(tP)} height={84} fill={ACC} opacity={0.1 * drift} />
      <polyline points={ref.join(' ')} fill="none" stroke={LINE} strokeWidth={1.2} strokeDasharray="3 3" />
      <g opacity={f}>
        <Reveal id="pv-inv" x0={X0} x={p < 1 ? x(p) : 999}>
          <polyline points={meas.join(' ')} fill="none" stroke="var(--fg-muted)" strokeWidth={1.2} />
        </Reveal>
      </g>
      <line x1={x(tP)} x2={x(tP)} y1={30} y2={132} stroke={LINE} opacity={0.3 + 0.7 * drift} />
      <Label x={x(tP) - 4} y={40} anchor="end" o={0.3 + 0.7 * drift}>{pt ? 'parâmetros mudam' : 'parameters drift'}</Label>
      <Pop k={rls} cx={x(tR) + 54} cy={38}>
        <rect x={x(tR) + 6} y={30} width={96} height={16} rx={2} fill={ACC} />
        <text x={x(tR) + 54} y={41} textAnchor="middle" fill="var(--bg)" fontFamily={MONO} fontSize={8.5} fontWeight={600} letterSpacing=".06em">ARX via RLS</text>
      </Pop>
      <Label x={24} y={142}>{pt ? '- - ref  — medida' : '- - ref  — measured'}</Label>
      <Label x={X1} y={142} anchor="end" color={ACC} o={0.35 + 0.65 * ok}>{pt ? 'reidentifica online' : 're-identified online'}</Label>
    </>
  );
};

const VISUALS: Record<string, { art: React.FC<ArtProps>; stack: string[] }> = {
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
  const [ref, t] = useCycle();
  if (!v) return null;
  const Art = v.art;
  return (
    <div ref={ref} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid meet" role="img" aria-hidden="true"
        style={{ flex: 1, minHeight: 0, width: '100%', display: 'block' }}>
        <Art pt={lang === 'pt'} t={t} />
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
