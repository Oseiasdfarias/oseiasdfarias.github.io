import React, { useEffect, useState, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';

// ─── Hero: LLM serving (continuous batching → KV-cache paginado → sampling) ──
// Inspirado nos posts de PagedAttention (vLLM) e Softmax Temperature.
// Simulação determinística e periódica: o estado no tick P é idêntico ao do
// tick 0, então o loop não tem salto visível.

const P       = 96;          // ticks por ciclo
const TICK_MS = 125;         // 96 × 125 ms = 12 s
const COLS = 8, ROWS = 4;
const NBLK = COLS * ROWS;    // blocos físicos de KV-cache
const BLK_TOK = 4;           // tokens por bloco (escala da visualização)

// Requests periódicos: chegada (tick), prompt e tokens gerados
const REQS = [
  { id: 'A', at: 0,  prompt: 10, gen: 30 },
  { id: 'B', at: 7,  prompt: 6,  gen: 22 },
  { id: 'C', at: 15, prompt: 14, gen: 40 },
  { id: 'D', at: 38, prompt: 8,  gen: 30 },
  { id: 'E', at: 50, prompt: 12, gen: 18 },
  { id: 'F', at: 61, prompt: 6,  gen: 38 },
  { id: 'G', at: 76, prompt: 10, gen: 24 },
  { id: 'H', at: 26, prompt: 4,  gen: 18 },
  { id: 'I', at: 45, prompt: 6,  gen: 14 },
  { id: 'J', at: 87, prompt: 4,  gen: 16 },
];

// Ordem fixa e embaralhada de blocos livres — mostra a alocação não contígua
const FREE_ORDER = [5, 18, 27, 2, 12, 30, 9, 21, 0, 15, 24, 7, 29, 13, 3, 19,
                    26, 10, 1, 22, 31, 8, 16, 4, 28, 11, 20, 6, 25, 14, 23, 17];

type Seq = { id: string; tokens: number; total: number; prompt: number; blocks: number[] };
type Frame = { seqs: Seq[]; owner: (string | null)[]; fill: number[]; prefill: boolean[] };

const simulate = (): Frame[] => {
  const CYCLES = 4;
  const owner: (string | null)[] = Array(NBLK).fill(null);
  const fill = Array(NBLK).fill(0);
  const prefill = Array(NBLK).fill(false);
  let seqs: Seq[] = [];
  const frames: Frame[] = [];

  const alloc = (id: string, n: number, isPrefill: boolean) => {
    const got: number[] = [];
    for (const b of FREE_ORDER) {
      if (got.length === n) break;
      if (owner[b] === null) { owner[b] = id; fill[b] = 0; prefill[b] = isPrefill; got.push(b); }
    }
    return got;
  };

  for (let t = 0; t < P * CYCLES; t++) {
    // decode: cada sequência ativa gera 1 token por tick
    seqs.forEach(s => {
      s.tokens += 1;
      const need = Math.ceil(s.tokens / BLK_TOK);
      if (need > s.blocks.length) s.blocks.push(...alloc(s.id, 1, false));
      const last = s.blocks[s.blocks.length - 1];
      if (last === undefined) return;
      fill[last] = ((s.tokens - 1) % BLK_TOK) + 1;
      prefill[last] = false;
    });
    // sequências que terminaram liberam seus blocos
    seqs = seqs.filter(s => {
      if (s.tokens < s.total) return true;
      s.blocks.forEach(b => { owner[b] = null; fill[b] = 0; prefill[b] = false; });
      return false;
    });
    // admissão (continuous batching): prefill aloca o prompt inteiro de uma vez
    REQS.filter(r => r.at === t % P).forEach(r => {
      const nb = Math.ceil(r.prompt / BLK_TOK);
      const blocks = alloc(r.id, nb, true);
      blocks.forEach((b, i) => { fill[b] = i < nb - 1 ? BLK_TOK : ((r.prompt - 1) % BLK_TOK) + 1; });
      seqs.push({ id: r.id, tokens: r.prompt, total: r.prompt + r.gen, prompt: r.prompt, blocks });
    });
    frames.push({
      seqs: seqs.map(s => ({ ...s, blocks: [...s.blocks] })),
      owner: [...owner], fill: [...fill], prefill: [...prefill],
    });
  }
  return frames.slice(P * (CYCLES - 1)); // regime permanente
};

const FRAMES = simulate();

// ─── Token stream + distribuição top-4 (softmax com temperatura) ─────────────

const SENT: Record<Language, string[]> = {
  en: ['Serving|Running|Training|Scaling', ' LLMs| models| agents| GPUs', ' is| becomes| remains| was',
       ' a| the| mostly| really', ' memory| latency| systems| cost', ' problem| game| issue| question',
       ' before| until| long| and', ' it| that| its| this', ' is| becomes| gets| was',
       ' a| the| ever| about', ' compute| math| model| speed', ' problem| one| issue| task', '.|,| —|!'],
  pt: ['Servir|Treinar|Escalar|Rodar', ' LLMs| modelos| agentes| GPUs', ' é| vira| parece| era',
       ' um| o| antes| sempre', ' problema| desafio| jogo| custo', ' de| da| em| sobre',
       ' memória| latência| sistemas| rede', ' antes| bem| muito| e', ' de| do| que| da',
       ' ser| virar| um| ter', ' de| um| da| só', ' computação| GPU| modelo| FLOPs', '.|,| —|!'],
};
const TOK_TICKS = 6;              // 13 tokens × 6 = 78 ticks + 18 de pausa
const TEMP = 0.7;

const topk = (i: number) => {
  // logits determinísticos; o primeiro candidato é o amostrado
  const base = [2.4 + 0.5 * Math.sin(i * 1.7), 1.5 + 0.3 * Math.cos(i * 2.3), 0.9 + 0.25 * Math.sin(i), 0.3];
  const ex = base.map(l => Math.exp(l / TEMP));
  const z = ex.reduce((a, b) => a + b, 0);
  return ex.map(e => e / z);
};

const mono = (size: number, extra?: CSSProperties): CSSProperties => ({
  fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace", fontSize: size, ...extra,
});
const MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";

// Cor por sequência: tons do acento e cinzas, distinguíveis também pela letra
const SEQ_FILL: Record<string, { fill: string; op: number }> = {
  A: { fill: 'var(--accent)',   op: 0.95 }, B: { fill: 'var(--fg-muted)', op: 0.75 },
  C: { fill: 'var(--accent-2)', op: 0.55 }, D: { fill: 'var(--fg-soft)',  op: 0.8 },
  E: { fill: 'var(--accent)',   op: 0.6 },  F: { fill: 'var(--fg-muted)', op: 0.45 },
  G: { fill: 'var(--accent-2)', op: 0.85 }, H: { fill: 'var(--fg-soft)',  op: 0.55 },
  I: { fill: 'var(--accent)',   op: 0.4 },  J: { fill: 'var(--fg-muted)', op: 0.9 },
};

// Layout (viewBox 480 × 300)
const GX = 252, GY = 34, CELL = 26, GAP = 2.5;
const LANES = [36, 62, 88];
const QX0 = 10, QX1 = 104;      // trajeto dos requests até o scheduler

export const HeroInference: React.FC<{ lang: Language }> = ({ lang }) => {
  const pt = lang === 'pt';
  const [t, setT] = useState(30);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setStill(true); return; }
    const id = setInterval(() => setT(v => (v + 1) % P), TICK_MS);
    return () => clearInterval(id);
  }, []);

  const f = FRAMES[t];
  const used = f.owner.filter(Boolean).length;
  const batch = f.seqs.length;
  const tokS = Math.round(batch * 41 + 9 * Math.sin((t / P) * 2 * Math.PI * 3));
  const ttft = Math.round(78 + 9 * Math.sin((t / P) * 2 * Math.PI * 2 + 1));

  // requests a caminho do scheduler (aparecem 14 ticks antes da admissão)
  const inflight = REQS.map((r, i) => {
    const d = (r.at - t + P) % P;
    return d > 0 && d <= 14 ? { ...r, lane: LANES[i % 3], x: QX1 - ((d - 1) / 13) * (QX1 - QX0) } : null;
  }).filter(Boolean) as (typeof REQS[number] & { lane: number; x: number })[];
  const admitting = REQS.some(r => r.at === t);

  // stream de tokens
  const words = SENT[lang].map(w => w.split('|'));
  const k = Math.min(words.length, Math.floor(t / TOK_TICKS));
  const sub = t % TOK_TICKS;
  const sampling = k < words.length;
  const shown = words.slice(0, k).map(c => c[0]).join('');
  const cand = sampling ? words[k] : words[words.length - 1];
  const probs = topk(sampling ? k : words.length - 1);
  const reveal = sampling ? Math.min(1, (sub + 1) / 3) : 1;
  const picked = !sampling || sub >= 4;

  const flow = still ? undefined : { animation: 'dashflow 1.1s linear infinite' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        position: 'relative', border: '1px solid var(--line)', background: 'var(--hero-panel)',
        borderRadius: 10, padding: '16px 16px 12px',
        backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
      }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 12, ...mono(10.5, { color: 'var(--fg-soft)', letterSpacing: '.08em' }),
      }}>
        <span>FIG.01 — LLM SERVING · {pt ? 'INFERÊNCIA' : 'INFERENCE'}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}>
          <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--accent)', animation: 'livedot 2s ease-out infinite' }} />
          {pt ? 'ao vivo' : 'live'}
        </span>
      </div>

      <svg viewBox="0 0 480 300" width="100%" role="img"
        aria-label={pt ? 'Animação de um servidor de LLM: requests, batching contínuo, KV-cache paginado e amostragem de tokens'
                       : 'LLM serving animation: requests, continuous batching, paged KV-cache and token sampling'}
        style={{ display: 'block', overflow: 'visible', maxHeight: 'clamp(200px,44vh,360px)' }}>
        <defs>
          <marker id="inf-ar" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0 0 L 5 3 L 0 6" fill="none" stroke="var(--fg-soft)" strokeWidth="1.2" />
          </marker>
        </defs>

        {/* ── Requests → scheduler ── */}
        <text x="10" y="16" fontFamily={MONO} fontSize="7.5" fill="var(--fg-soft)" letterSpacing="1.2">REQUESTS</text>
        {LANES.map(y => (
          <path key={y} d={`M${QX0} ${y} H ${QX1 + 22}`} stroke="var(--line)" strokeWidth="1" strokeDasharray="2 4" />
        ))}
        {inflight.map(r => (
          <g key={r.id} transform={`translate(${r.x.toFixed(1)} ${r.lane - 7})`}>
            <rect width="30" height="14" rx="3" fill="var(--node)" stroke={SEQ_FILL[r.id].fill} strokeWidth="1" />
            <text x="15" y="10" fontFamily={MONO} fontSize="7.5" fill="var(--fg)" textAnchor="middle">req·{r.id}</text>
          </g>
        ))}

        <rect x="128" y="22" width="100" height="78" rx="6" fill="var(--node)"
          stroke={admitting ? 'var(--accent)' : 'var(--line-2)'} strokeWidth="1.1" />
        <text x="178" y="40" fontFamily={MONO} fontSize="8.5" fill="var(--fg)" textAnchor="middle">SCHEDULER</text>
        <text x="178" y="52" fontFamily={MONO} fontSize="6.8" fill="var(--fg-soft)" textAnchor="middle">continuous batching</text>
        <g>
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={140 + i * 10} y="62" width="7" height="14" rx="1.5"
              fill={i < batch ? 'var(--accent)' : 'none'} opacity={i < batch ? 0.85 : 1}
              stroke={i < batch ? 'none' : 'var(--line-2)'} strokeWidth="0.8" />
          ))}
        </g>
        <text x="178" y="91" fontFamily={MONO} fontSize="7" fill="var(--fg-muted)" textAnchor="middle">batch = {batch}</text>

        {/* scheduler → GPU */}
        <path d="M228 61 H 246" stroke="var(--line-2)" strokeWidth="1.1" markerEnd="url(#inf-ar)" />
        <path d="M228 61 H 244" stroke="var(--accent)" strokeWidth="1.3" strokeDasharray="3 5" style={flow} />

        {/* ── Block table ── */}
        <text x="10" y="118" fontFamily={MONO} fontSize="7.5" fill="var(--fg-soft)" letterSpacing="1.2">BLOCK TABLE</text>
        <rect x="10" y="123" width="218" height="27" rx="4" fill="none" stroke="var(--line)" />
        {f.seqs.slice(0, 2).map((s, i) => (
          <text key={s.id} x="17" y={134 + i * 10} fontFamily={MONO} fontSize="7" fill="var(--fg-muted)">
            <tspan fill={SEQ_FILL[s.id].fill}>{s.id}</tspan>
            {'  → '}{s.blocks.slice(0, 7).map(b => String(b).padStart(2, '0')).join(' · ')}{s.blocks.length > 7 ? ' …' : ''}
          </text>
        ))}

        {/* ── GPU: KV-cache paginado ── */}
        <text x="252" y="16" fontFamily={MONO} fontSize="7.5" fill="var(--fg-soft)" letterSpacing="1.2">
          GPU · KV-CACHE {pt ? 'PAGINADO' : 'PAGED'}
        </text>
        <text x="470" y="16" fontFamily={MONO} fontSize="7" fill="var(--fg-soft)" textAnchor="end">
          {NBLK} × {BLK_TOK} tok
        </text>
        <rect x={GX - 6} y={GY - 8} width={COLS * (CELL + GAP) + 9.5} height={ROWS * (CELL + GAP) + 13.5}
          rx="6" fill="none" stroke="var(--line-2)" strokeWidth="1" />
        {f.owner.map((o, b) => {
          const cx = GX + (b % COLS) * (CELL + GAP);
          const cy = GY + Math.floor(b / COLS) * (CELL + GAP);
          const sf = o ? SEQ_FILL[o] : null;
          const h = (f.fill[b] / BLK_TOK) * CELL;
          return (
            <g key={b}>
              <rect x={cx} y={cy} width={CELL} height={CELL} rx="3"
                fill="var(--node)" stroke={o ? sf!.fill : 'var(--line)'} strokeWidth={o ? 0.9 : 0.8}
                strokeOpacity={o ? 0.7 : 1} />
              {o && (
                <>
                  <rect x={cx + 1.5} y={cy + CELL - 1.5 - Math.max(0, h - 3)} width={CELL - 3}
                    height={Math.max(0, h - 3)} rx="2"
                    fill={sf!.fill} opacity={f.prefill[b] ? sf!.op * 0.55 : sf!.op} />
                  <text x={cx + CELL / 2} y={cy + CELL / 2 + 3} fontFamily={MONO} fontSize="8"
                    fill="var(--fg)" textAnchor="middle" stroke="var(--bg2)" strokeWidth="2.2"
                    paintOrder="stroke">{o}</text>
                </>
              )}
            </g>
          );
        })}
        <text x="252" y={GY + ROWS * (CELL + GAP) + 16} fontFamily={MONO} fontSize="6.8" fill="var(--fg-soft)">
          {pt ? 'claro = prefill · sólido = decode' : 'light = prefill · solid = decode'}
        </text>

        <path d="M10 172 H 470" stroke="var(--line)" />

        {/* ── Token stream ── */}
        <text x="10" y="188" fontFamily={MONO} fontSize="7.5" fill="var(--fg-soft)" letterSpacing="1.2">
          STREAM · seq A
        </text>
        <text x="10" y="206" fontFamily={MONO} fontSize="10" fill="var(--fg)">
          <tspan fill="var(--accent)">▸ </tspan>{shown}
          {sampling && picked && <tspan fill="var(--accent)">{cand[0]}</tspan>}
          <tspan fill="var(--accent)" opacity={still || t % 4 < 2 ? 1 : 0}>▍</tspan>
        </text>

        {/* ── Distribuição do próximo token ── */}
        <text x="10" y="226" fontFamily={MONO} fontSize="7.5" fill="var(--fg-soft)" letterSpacing="1.2">
          p(next) · top-4 · softmax(z / T)
        </text>
        <text x="470" y="226" fontFamily={MONO} fontSize="8" fill="var(--accent)" textAnchor="end">T = {TEMP.toFixed(1)}</text>
        {cand.map((w, i) => {
          const y = 236 + i * 15;
          const wBar = 300 * probs[i] * reveal;
          const win = i === 0 && picked;
          return (
            <g key={i}>
              <text x="10" y={y + 8.5} fontFamily={MONO} fontSize="8"
                fill={win ? 'var(--accent)' : 'var(--fg-muted)'}>{`"${w.trim() || w}"`}</text>
              <rect x="104" y={y} width="300" height="10" rx="2" fill="var(--node)" />
              <rect x="104" y={y} width={wBar} height="10" rx="2"
                fill={i === 0 ? 'var(--accent)' : 'var(--fg-soft)'} opacity={i === 0 ? 0.9 : 0.55} />
              <text x="470" y={y + 8.5} fontFamily={MONO} fontSize="8" textAnchor="end"
                fill={win ? 'var(--accent)' : 'var(--fg-soft)'}>{(probs[i] * 100).toFixed(1)}%</text>
            </g>
          );
        })}
      </svg>

      <div style={{
        display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--line)',
        ...mono(10, { color: 'var(--fg-soft)', letterSpacing: '.04em' }),
      }}>
        <span><span style={{ color: 'var(--fg)' }}>{tokS}</span> tok/s</span>
        <span>TTFT p95 <span style={{ color: 'var(--fg)' }}>{ttft} ms</span></span>
        <span>KV {pt ? 'uso' : 'util'} <span style={{ color: 'var(--accent)' }}>{Math.round((used / NBLK) * 100)}%</span></span>
        <span>{pt ? 'desperdício' : 'waste'} <span style={{ color: 'var(--fg)' }}>&lt;4%</span></span>
      </div>
    </motion.div>
  );
};
