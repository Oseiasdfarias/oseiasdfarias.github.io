import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Menu, ArrowUpRight, ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  translations, getProjects, getExperience,
  getEducation, getCertifications, getResearch, getPublications, getOpenSource,
} from './content';
import { Language } from './types';
import { useCounter } from './hooks/useAnimations';
import { Aeropendulo3D } from './components/Aeropendulo3D';
import { ProjectDiagram } from './components/ProjectDiagram';
import { ResearchDiagram } from './components/ResearchDiagram';
import { EduLogo, CertIcon } from './components/EduCertIcons';

// ─── Theme tokens: Pure Monochrome (Linear / Vercel minimal) ─────────────────
// Dark: OLED Black #000000 with surgical graphite panels & clean border lines
// Light: Crisp White #ffffff with zinc panels & sharp typography

const DARK: CSSProperties = {
  '--bg':           '#000000',
  '--bg2':          '#0c0c0e',
  '--panel':        '#111114',
  '--line':         'rgba(255,255,255,.10)',
  '--line-2':       'rgba(255,255,255,.26)',
  '--grid':         'rgba(255,255,255,.03)',
  '--fg':           '#ffffff',
  '--fg-muted':     '#a1a1aa',
  '--fg-soft':      '#71717a',
  '--accent':       '#ffffff',
  '--accent-2':     '#38bdf8',
} as CSSProperties;

const LIGHT: CSSProperties = {
  '--bg':           '#ffffff',
  '--bg2':          '#f4f4f5',
  '--panel':        '#fafafa',
  '--line':         'rgba(0,0,0,.08)',
  '--line-2':       'rgba(0,0,0,.22)',
  '--grid':         'rgba(0,0,0,.03)',
  '--fg':           '#09090b',
  '--fg-muted':     '#52525b',
  '--fg-soft':      '#71717a',
  '--accent':       '#09090b',
  '--accent-2':     '#0284c7',
} as CSSProperties;

// ─── Typography helpers ───────────────────────────────────────────────────────

const mono = (size: number | string = 12, extra?: CSSProperties): CSSProperties => ({
  fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
  fontSize: size as number,
  ...extra,
});

const serif = (size: number | string = 16, weight = 500, extra?: CSSProperties): CSSProperties => ({
  fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
  fontSize: size as number,
  fontWeight: weight,
  letterSpacing: '-0.02em',
  ...extra,
});

// ─── FadeIn wrapper ───────────────────────────────────────────────────────────

const FadeIn: React.FC<{ children: React.ReactNode; delay?: number; x?: number }> = ({
  children, delay = 0, x = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: x ? 0 : 16, x: x || 0 }}
    whileInView={{ opacity: 1, y: 0, x: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.65, delay, ease: [0.2, 0.7, 0.2, 1] }}
  >
    {children}
  </motion.div>
);

// ─── Live dot ─────────────────────────────────────────────────────────────────

const LiveDot: React.FC<{ color?: string }> = ({ color = 'var(--accent)' }) => (
  <span style={{
    width: 7, height: 7, borderRadius: 999,
    background: color, display: 'inline-block',
    animation: 'livedot 2s ease-out infinite',
  }} />
);

// ─── Otensor mark ─────────────────────────────────────────────────────────────

const OtensorMark: React.FC<{ size?: number }> = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 380 380" style={{ flexShrink: 0 }} aria-hidden="true">
    <circle cx="190" cy="190" r="181" fill="none" stroke="var(--accent-2)" strokeWidth="18" />
    <rect x="182" y="122" width="16" height="30" rx="4" fill="var(--accent-2)" />
    <rect x="182" y="226" width="16" height="30" rx="4" fill="var(--accent-2)" />
    <rect x="226" y="182" width="30" height="16" rx="4" fill="var(--accent-2)" />
    <rect x="122" y="182" width="30" height="16" rx="4" fill="var(--accent-2)" />
    <rect x="159" y="159" width="62" height="62" rx="9" fill="none" stroke="var(--accent-2)" strokeWidth="10" />
    <circle cx="190" cy="190" r="11" fill="var(--accent-2)" />
  </svg>
);

// ─── Hero: automação distribuída (nó sensor → broker → nó atuador) ────────────

const TEL_N   = 96;    // amostras por ciclo
const TEL_WIN = 56;    // amostras visíveis na janela
const TEL_MIN = 25.0;
const TEL_MAX = 29.5;
const TEL_THR = 28.0;  // limiar da regra no broker

/* Onda determinística — sem Math.random, para o painel renderizar idêntico em
   qualquer tema/idioma. Média e amplitude dimensionadas para o trecho acima do
   limiar durar ~4,7 s contíguos por ciclo de ~10,6 s: tempo de acionamento
   suficiente para ler o estado, numa única janela (o LED não tremula). */
const TEL_SAMPLES = Array.from({ length: TEL_N }, (_, i) => {
  const t = (2 * Math.PI * i) / TEL_N;
  return 27.4 + 1.8 * Math.sin(t) + 0.35 * Math.sin(3 * t + 0.7) + 0.15 * Math.sin(7 * t);
});

const SCOPE_X0 = 16,  SCOPE_X1 = 464;
const SCOPE_Y0 = 280, SCOPE_Y1 = 220;
const telY = (v: number) =>
  SCOPE_Y0 - ((v - TEL_MIN) / (TEL_MAX - TEL_MIN)) * (SCOPE_Y0 - SCOPE_Y1);

/* Antenas meandro e trilhas roteadas em 45°, como numa PCB real */
const ANT_A     = 'M73 120 V 114 H 81 V 108 H 89 V 114 H 97 V 108 H 105 V 114 H 113 V 120';
const ANT_B     = 'M367 120 V 114 H 375 V 108 H 383 V 114 H 391 V 108 H 399 V 114 H 407 V 120';
const TRACE_A1  = 'M81 168 V 160 L 75 154';
const TRACE_A2  = 'M105 168 V 160 L 111 154';
const LINK_UP   = 'M120 104 L 200 52';   // nó A publica telemetria
const LINK_DOWN = 'M280 52 L 360 104';   // broker publica comando

const HeroTelemetry: React.FC<{ lang: Language }> = ({ lang }) => {
  const pt = lang === 'pt';
  const [idx, setIdx]     = useState(24);   // começa no pico, com a regra disparada
  const [still, setStill] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) { setStill(true); return; }
    const id = setInterval(() => setIdx(i => (i + 1) % TEL_N), 110);
    return () => clearInterval(id);
  }, []);

  const current = TEL_SAMPLES[idx];
  const fired   = current > TEL_THR;
  const cmdFg   = fired ? 'var(--accent-2)' : 'var(--fg-soft)';

  const pts = Array.from({ length: TEL_WIN }, (_, k) => {
    const v = TEL_SAMPLES[(idx - TEL_WIN + 1 + k + TEL_N) % TEL_N];
    const x = SCOPE_X0 + (k * (SCOPE_X1 - SCOPE_X0)) / (TEL_WIN - 1);
    return `${x.toFixed(1)},${telY(v).toFixed(1)}`;
  }).join(' ');

  const headY = telY(current);
  const thrY  = telY(TEL_THR);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ position: 'relative', border: '1px solid var(--line)', background: 'var(--panel)', padding: '16px 16px 12px' }}
    >
      {([
        { top: -1, left: -1,  borderTop: '2px solid var(--accent)',    borderLeft: '2px solid var(--accent)'  },
        { top: -1, right: -1, borderTop: '2px solid var(--accent)',    borderRight: '2px solid var(--accent)' },
        { bottom: -1, left: -1,  borderBottom: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)'  },
        { bottom: -1, right: -1, borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' },
      ] as CSSProperties[]).map((s, i) => (
        <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s }} />
      ))}

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 14, ...mono(11, { color: 'var(--fg-soft)', letterSpacing: '.04em' }),
      }}>
        <span>FIG.01 — {pt ? 'AUTOMAÇÃO DISTRIBUÍDA' : 'DISTRIBUTED AUTOMATION'}</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}>
          <LiveDot />
          {pt ? 'ao vivo' : 'live'}
        </span>
      </div>

      <svg viewBox="0 0 480 300" width="100%"
        style={{ display: 'block', overflow: 'visible', maxHeight: 'clamp(180px,42vh,340px)' }}>

        <defs>
          <marker id="tel-ar" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
            <path d="M0 0 L 5 3 L 0 6" fill="none" stroke="var(--fg-soft)" strokeWidth="1.2" />
          </marker>
          <clipPath id="tel-over">
            <rect x={SCOPE_X0} y={SCOPE_Y1 - 10} width={SCOPE_X1 - SCOPE_X0} height={thrY - SCOPE_Y1 + 10} />
          </clipPath>
        </defs>

        {/* ── Broker + regra ── */}
        <rect x="166" y="6" width="148" height="46" fill="var(--bg2)"
          stroke={fired ? 'var(--accent-2)' : 'var(--line-2)'} strokeWidth="1.2" strokeDasharray="4 3" />
        <text x="240" y="26" fontFamily="IBM Plex Mono" fontSize="9.5" fill="var(--fg)" textAnchor="middle">BROKER MQTT</text>
        <text x="240" y="41" fontFamily="IBM Plex Mono" fontSize="7.5" fill={cmdFg} textAnchor="middle">
          {fired
            ? (pt ? 'regra disparada ⚡' : 'rule fired ⚡')
            : (pt ? 'regra armada · temp > 28.0' : 'rule armed · temp > 28.0')}
        </text>

        {/* ── Enlaces entre os nós ── */}
        <path d={LINK_UP} fill="none" stroke="var(--line-2)" strokeWidth="1.2" markerEnd="url(#tel-ar)" />
        <path d={LINK_UP} fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 7"
          style={still ? undefined : { animation: 'dashflow 1.1s linear infinite' }} />
        <text x="150" y="72" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg-soft)" textAnchor="end">
          sala-01/temp ↑
        </text>

        <path d={LINK_DOWN} fill="none" stroke={fired ? 'var(--accent-2)' : 'var(--line-2)'}
          strokeWidth="1.2" opacity={fired ? 0.5 : 1} markerEnd="url(#tel-ar)" />
        {fired && !still && (
          <path d={LINK_DOWN} fill="none" stroke="var(--accent-2)" strokeWidth="1.6" strokeDasharray="3 7"
            style={{ animation: 'dashflow 0.8s linear infinite' }} />
        )}
        <text x="330" y="72" fontFamily="IBM Plex Mono" fontSize="7" fill={cmdFg}>
          ↓ estufa-02/cmd
        </text>

        {/* ══ NÓ A — sensor ══ */}
        <text x="8" y="98" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg-soft)">
          {pt ? 'NÓ A · sala-01' : 'NODE A · room-01'}
        </text>
        <rect x="8" y="104" width="170" height="96" fill="none" stroke="var(--line-2)" strokeWidth="1" opacity="0.8" />
        <g fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" opacity="0.55">
          <circle cx="16" cy="112" r="3" /><circle cx="170" cy="112" r="3" />
          <circle cx="16" cy="192" r="3" /><circle cx="170" cy="192" r="3" />
        </g>
        <path d={ANT_A} fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.85" />
        <g fill="none" stroke="var(--accent)" strokeWidth="1" opacity="0.5">
          <path d="M113 106 A 8 8 0 0 1 121 114" /><path d="M113 101 A 13 13 0 0 1 126 114" />
        </g>
        <rect x="49" y="120" width="88" height="34" fill="var(--bg2)" stroke="var(--line-2)" strokeWidth="1.2" />
        <rect x="55" y="126" width="76" height="22" fill="none" stroke="var(--line-2)" strokeWidth="0.6" opacity="0.6" />
        <text x="93" y="141" fontFamily="IBM Plex Mono" fontSize="9" fill="var(--fg)" textAnchor="middle">ESP32</text>
        <g fill="var(--accent)" opacity="0.75">
          <rect x="71" y="152" width="8" height="4" /><rect x="107" y="152" width="8" height="4" />
          {[57, 71, 85, 99, 113, 127].map(x => <rect key={x} x={x} y="116" width="5" height="5" />)}
        </g>
        <g fill="none" stroke="var(--accent)" strokeWidth="1.4" opacity="0.35" strokeLinejoin="round">
          <path d={TRACE_A1} /><path d={TRACE_A2} />
        </g>
        <g fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeDasharray="3 8" strokeLinejoin="round"
          style={still ? undefined : { animation: 'dashflow 1.1s linear infinite' }}>
          <path d={TRACE_A1} /><path d={TRACE_A2} />
        </g>
        <rect x="65" y="168" width="56" height="22" fill="var(--bg2)" stroke="var(--line-2)" strokeWidth="1.2" />
        <circle cx="71" cy="174" r="1.5" fill="var(--accent)" opacity="0.8" />
        <text x="93" y="182" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg-muted)" textAnchor="middle">DHT22</text>

        {/* ══ NÓ B — atuador ══ */}
        <text x="472" y="98" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg-soft)" textAnchor="end">
          {pt ? 'NÓ B · estufa-02' : 'NODE B · greenhouse-02'}
        </text>
        <rect x="302" y="104" width="170" height="96" fill="none" stroke="var(--line-2)" strokeWidth="1" opacity="0.8" />
        <g fill="var(--bg)" stroke="var(--accent)" strokeWidth="1" opacity="0.55">
          <circle cx="310" cy="112" r="3" /><circle cx="464" cy="112" r="3" />
          <circle cx="310" cy="192" r="3" /><circle cx="464" cy="192" r="3" />
        </g>
        <path d={ANT_B} fill="none" stroke="var(--accent)" strokeWidth="1.5" opacity="0.85" />
        <g fill="none" stroke={cmdFg} strokeWidth="1" opacity={fired ? 0.85 : 0.4}>
          <path d="M367 106 A 8 8 0 0 0 359 114" /><path d="M367 101 A 13 13 0 0 0 354 114" />
        </g>
        <rect x="343" y="120" width="88" height="34" fill="var(--bg2)" stroke="var(--line-2)" strokeWidth="1.2" />
        <rect x="349" y="126" width="76" height="22" fill="none" stroke="var(--line-2)" strokeWidth="0.6" opacity="0.6" />
        <text x="387" y="141" fontFamily="IBM Plex Mono" fontSize="9" fill="var(--fg)" textAnchor="middle">ESP32</text>
        <g fill="var(--accent)" opacity="0.75">
          <rect x="383" y="152" width="8" height="4" />
          {[351, 365, 379, 393, 407, 421].map(x => <rect key={x} x={x} y="116" width="5" height="5" />)}
        </g>
        {/* LED acionado pelo comando remoto */}
        <path d="M387 154 V 162" fill="none" stroke={cmdFg} strokeWidth="1.5" />
        <path d="M379 162 L 395 162 L 387 176 Z" fill={fired ? 'var(--accent-2)' : 'var(--bg2)'}
          stroke={cmdFg} strokeWidth="1.3" strokeLinejoin="round" />
        <path d="M377 176 H 397" stroke={cmdFg} strokeWidth="1.6" />
        <path d="M387 176 V 186" fill="none" stroke={cmdFg} strokeWidth="1.5" />
        <text x="373" y="170" fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg-soft)" textAnchor="end">D1</text>
        {fired && (
          <g stroke="var(--accent-2)" strokeWidth="1.2" fill="none">
            <path d="M401 166 L 409 158 M409 158 L 405 158 M409 158 L 409 162" />
            <path d="M401 174 L 409 166 M409 166 L 405 166 M409 166 L 409 170" />
          </g>
        )}
        <g stroke={cmdFg} strokeWidth="1.4" opacity="0.7">
          <path d="M377 186 H 397" /><path d="M380.5 191 H 393.5" /><path d="M384 196 H 390" />
        </g>

        {/* ── Osciloscópio: telemetria do nó A ── */}
        <text x="8" y="208" fontFamily="IBM Plex Mono" fontSize="7.5" fill="var(--fg-soft)">sala-01 · sensor.temp</text>
        <text x="452" y="210" fontFamily="Newsreader, Georgia, serif" fontSize="17" fill="var(--accent)" textAnchor="end">
          {current.toFixed(1)}
        </text>
        <text x="470" y="210" fontFamily="IBM Plex Mono" fontSize="8" fill="var(--fg-soft)" textAnchor="end">°C</text>

        <rect x="8" y="212" width="464" height="76" fill="var(--bg2)" stroke="var(--line)" strokeWidth="1" />
        <g stroke="var(--line-2)" strokeWidth="0.5" opacity="0.3">
          {[64, 120, 176, 232, 288, 344, 400, 456].map(x => <path key={x} d={`M${x} 212 V 288`} />)}
          {[231, 250, 269].map(y => <path key={y} d={`M8 ${y} H 472`} />)}
        </g>

        <polygon points={`${SCOPE_X0},${SCOPE_Y0} ${pts} ${SCOPE_X1},${SCOPE_Y0}`} fill="var(--accent)" opacity="0.08" />
        <polyline points={pts} fill="none" stroke="var(--accent)" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
        {/* trecho acima do limiar — o que faz a regra disparar */}
        <polyline points={pts} fill="none" stroke="var(--accent-2)" strokeWidth="2.1"
          strokeLinejoin="round" strokeLinecap="round" clipPath="url(#tel-over)" />

        <path d={`M${SCOPE_X0} ${thrY} H ${SCOPE_X1}`} stroke="var(--fg-soft)" strokeWidth="1" strokeDasharray="3 4" opacity="0.8" />
        <text x="18" y={thrY - 4} fontFamily="IBM Plex Mono" fontSize="7" fill="var(--fg-soft)">
          {pt ? 'limiar' : 'threshold'} {TEL_THR.toFixed(1)} °C
        </text>

        <circle cx={SCOPE_X1} cy={headY} r="4.5" fill="var(--accent)" opacity="0.18" />
        <circle cx={SCOPE_X1} cy={headY} r="2.4" fill="var(--accent)" />
      </svg>
    </motion.div>
  );
};

// ─── Metric item ──────────────────────────────────────────────────────────────

const MetricItem: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const { ref, count } = useCounter(value, 1300);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
      style={{ padding: '26px 22px', borderLeft: '1px solid var(--line)' }}
    >
      <div style={serif('clamp(38px,5vw,56px)' as unknown as number, 500, { lineHeight: 0.9, letterSpacing: '-.02em' })}>
        <span ref={ref}>{count}</span>{suffix}
      </div>
      <div style={mono(11, {
        color: 'var(--fg-soft)', marginTop: 10,
        textTransform: 'uppercase', letterSpacing: '.06em',
      })}>
        {label}
      </div>
    </motion.div>
  );
};

// ─── Section header ───────────────────────────────────────────────────────────

const SectionHeader: React.FC<{
  num: string; title: string; subtitle?: string;
}> = ({ num, title, subtitle }) => (
  <FadeIn>
    <div style={{
      display: 'flex', alignItems: 'flex-end',
      justifyContent: subtitle ? 'space-between' : 'flex-start',
      gap: 16, marginBottom: 30,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={mono(14, { color: 'var(--accent)' })}>{num}</span>
        <h2 style={serif('clamp(28px,3.6vw,42px)' as unknown as number, 500, {
          margin: 0, letterSpacing: '-.02em',
        })}>
          {title}
        </h2>
      </div>
      {subtitle && (
        <span style={mono(11, { color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>{subtitle}</span>
      )}
    </div>
  </FadeIn>
);

// ─── Media Modal ──────────────────────────────────────────────────────────────

interface ModalState { src: string; caption: string; index: number; total: number }

const MediaModal: React.FC<{
  modal: ModalState; onClose: () => void; onPrev: () => void; onNext: () => void;
}> = ({ modal, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
        cursor: 'pointer',
      }}
      onClick={onClose}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }} />
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }} transition={{ duration: 0.2 }}
        style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 900, width: '100%' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: '0 4px' }}>
          <span style={mono(11, { color: '#888' })}>{modal.index + 1} / {modal.total}</span>
          <button onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono(11, { color: '#999', background: 'none', border: 'none', cursor: 'pointer' }) }}>
            <X size={13} /> ESC
          </button>
        </div>
        <div style={{ width: '100%', border: '1px solid rgba(255,255,255,.1)', overflow: 'hidden', background: '#000' }}>
          <img src={modal.src} alt={modal.caption}
            style={{ width: '100%', height: 'auto', maxHeight: '72vh', objectFit: 'contain', display: 'block' }} />
        </div>
        <p style={{ ...mono(11, { color: '#888', lineHeight: 1.6, maxWidth: 480, margin: '12px auto 0', textAlign: 'center' }) }}>{modal.caption}</p>
        {modal.total > 1 && (
          <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
            <button onClick={onPrev}
              style={{ ...mono(12, { color: '#999', background: 'none', border: '1px solid rgba(255,255,255,.15)', padding: '6px 12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }) }}>
              <ChevronLeft size={13} /> prev
            </button>
            <button onClick={onNext}
              style={{ ...mono(12, { color: '#999', background: 'none', border: '1px solid rgba(255,255,255,.15)', padding: '6px 12px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }) }}>
              next <ChevronRight size={13} />
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── Status helpers ───────────────────────────────────────────────────────────

const STATUS_LABELS_PT = ['em construção', 'em produção', 'open source', 'concluído', 'concluído', 'open source'];
const STATUS_LABELS_EN = ['building', 'in production', 'open source', 'shipped', 'shipped', 'open source'];
const STATUS_COLORS    = ['var(--accent-2)', 'var(--accent)', 'var(--fg-muted)', 'var(--fg-soft)', 'var(--fg-soft)', 'var(--fg-muted)'];

// ─── App ──────────────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [lang,           setLang]           = useState<Language>('pt');
  const [darkMode,       setDarkMode]       = useState(true);
  const [activeSection,  setActiveSection]  = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus,     setFormStatus]     = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [modal,          setModal]          = useState<ModalState | null>(null);
  const [showTopBtn,     setShowTopBtn]     = useState(false);
  const [openNavGroup,   setOpenNavGroup]   = useState<string | null>(null);
  const [copyStatus,     setCopyStatus]     = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);

  const openModal  = (media: { src: string; caption: string }[], i: number) =>
    setModal({ ...media[i], index: i, total: media.length });
  const closeModal = () => setModal(null);
  const prevMedia  = (media: { src: string; caption: string }[]) =>
    setModal(m => m ? { ...media[(m.index - 1 + m.total) % m.total], index: (m.index - 1 + m.total) % m.total, total: m.total } : null);
  const nextMedia  = (media: { src: string; caption: string }[]) =>
    setModal(m => m ? { ...media[(m.index + 1) % m.total], index: (m.index + 1) % m.total, total: m.total } : null);

  const content    = translations[lang];
  const projects   = getProjects(lang);
  const experience = getExperience(lang);
  const education  = getEducation(lang);
  const research   = getResearch(lang);
  const certs      = getCertifications(lang);
  const pubs       = getPublications(lang);
  const openSource = getOpenSource(lang);

  const socials = [
    { label: 'GitHub',   href: 'https://github.com/oseiasdfarias/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/oseiasfarias/' },
    { label: 'YouTube',  href: 'https://www.youtube.com/@otensor' },
    { label: 'Medium',   href: 'https://oseiasfarias.medium.com' },
  ];
  const CV_URL = '/cv_ml_mlops_ats.pdf';

  const NAV_SECTIONS = ['capabilities', 'projects', 'experience', 'research'] as const;

  useEffect(() => {
    const saved     = localStorage.getItem('of_theme2');
    const savedLang = localStorage.getItem('of_lang') as Language | null;
    setDarkMode(saved ? saved === 'dark' : true);
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('of_theme2', next ? 'dark' : 'light');
  };

  const toggleLang = () => {
    const next = lang === 'pt' ? 'en' : 'pt';
    setLang(next);
    localStorage.setItem('of_lang', next);
  };

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 500);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { rootMargin: '-20% 0px -70% 0px' },
    );
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const form = e.currentTarget;
    try {
      await fetch('https://formsubmit.co/ajax/c110a49cc1ab534d2724eca67e130885', {
        method: 'POST', body: new FormData(form),
      });
      setFormStatus('success');
      form.reset();
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const theme = darkMode ? DARK : LIGHT;
  const pt    = lang === 'pt';

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div style={{
      ...theme,
      background: 'var(--bg)',
      color: 'var(--fg)',
      minHeight: '100vh',
      fontFamily: "'Plus Jakarta Sans', -apple-system, sans-serif",
      WebkitFontSmoothing: 'antialiased',
    }}>

      {/* Progress bar */}
      <div ref={progressRef} id="progress-bar" />

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 70,
        background: darkMode
          ? 'rgba(0,0,0,0.85)'
          : 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line)',
      }}>
        <div style={{
          maxWidth: 1240, margin: '0 auto',
          padding: '0 clamp(20px,4vw,40px)',
          height: 58, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 18,
        }}>
          {/* Logo */}
          <a href="#top"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 11, color: 'var(--fg)' }}>
            <span style={mono(13, { fontWeight: 600, letterSpacing: '.04em', color: 'var(--accent)' })}>OF</span>
            <span style={serif(17, 500, { letterSpacing: '-.01em' })}>Oséias Farias</span>
          </a>

          {/* Desktop nav */}
          {/* Desktop nav with dropdowns */}
          {(() => {
            type NavItem = { id: string; num: string; label: string };
            type NavGroup = { key: string; label: string; solo?: true; items?: NavItem[]; id?: string; top?: true };
            const groups: NavGroup[] = [
              { key: 'top',     label: pt ? 'Início' : 'Home',     solo: true, id: 'top', top: true },
              { key: 'work',    label: pt ? 'Trabalho' : 'Work',   items: [
                  { id: 'capabilities', num: '§01', label: content.nav.focus },
                  { id: 'projects',     num: '§02', label: content.nav.projects },
                  { id: 'opensource',   num: '§03', label: content.nav.opensource },
              ]},
              { key: 'profile', label: pt ? 'Perfil' : 'Profile',  items: [
                  { id: 'about',      num: '§00', label: content.nav.about },
                  { id: 'experience', num: '§04', label: content.nav.experience },
                  { id: 'education',  num: '§06', label: content.nav.education },
              ]},
              { key: 'science', label: pt ? 'Pesquisa' : 'Science', items: [
                  { id: 'research',   num: '§05', label: content.nav.research },
                  { id: 'community',  num: '§07', label: content.nav.community },
              ]},
              { key: 'contact', label: content.nav.contact,         solo: true, id: 'contact' },
            ];

            const dropdownStyle: CSSProperties = {
              position: 'absolute', top: 'calc(100% + 6px)', left: 0, zIndex: 200,
              background: 'var(--panel)', border: '1px solid var(--line-2)',
              borderRadius: 8, padding: 6, minWidth: 168,
              boxShadow: '0 12px 32px rgba(0,0,0,.35)',
              backdropFilter: 'blur(16px)',
            };

            return (
              <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 4, height: '100%' }}>
                {groups.map(g => {
                  const isGroupActive = !g.solo && (g.items ?? []).some(it => activeSection === it.id);
                  const isOpen = openNavGroup === g.key;

                  if (g.solo) {
                    const isSoloActive = !g.top && activeSection === g.id;
                    return (
                      <a key={g.key}
                        href={g.top ? '#top' : `#${g.id}`}
                        onClick={e => { e.preventDefault(); g.top ? window.scrollTo({ top: 0, behavior: 'smooth' }) : scrollTo(g.id!); }}
                        style={{
                          textDecoration: 'none', display: 'flex', alignItems: 'center',
                          padding: '6px 12px', borderRadius: 6, cursor: 'pointer',
                          background: isSoloActive ? 'var(--bg2)' : 'transparent',
                          border: `1px solid ${isSoloActive ? 'var(--line-2)' : 'transparent'}`,
                          transition: 'all .2s ease',
                          ...mono(12, { color: isSoloActive ? 'var(--fg)' : 'var(--fg-muted)', fontWeight: isSoloActive ? 600 : 400 }),
                        }}
                        onMouseEnter={e => { if (!isSoloActive) { (e.currentTarget as HTMLElement).style.background = 'var(--bg2)'; (e.currentTarget as HTMLElement).style.color = 'var(--fg)'; } }}
                        onMouseLeave={e => { if (!isSoloActive) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--fg-muted)'; } }}>
                        {g.label}
                      </a>
                    );
                  }

                  return (
                    <div key={g.key} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
                      onMouseEnter={() => setOpenNavGroup(g.key)}
                      onMouseLeave={() => setOpenNavGroup(null)}>
                      <button style={{
                        background: isGroupActive ? 'var(--bg2)' : isOpen ? 'var(--bg2)' : 'transparent',
                        border: `1px solid ${isGroupActive ? 'var(--line-2)' : isOpen ? 'var(--line)' : 'transparent'}`,
                        borderRadius: 6,
                        cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                        padding: '6px 12px',
                        transition: 'all .2s ease',
                        ...mono(12, { color: isGroupActive || isOpen ? 'var(--fg)' : 'var(--fg-muted)', fontWeight: isGroupActive ? 600 : 400 }),
                      }}>
                        {g.label}
                        <span style={{
                          display: 'inline-block',
                          fontSize: 9,
                          transform: isOpen ? 'rotate(180deg)' : 'none',
                          transition: 'transform 0.2s ease',
                          opacity: 0.6,
                        }}>▾</span>
                      </button>
                      {isOpen && (
                        <div style={dropdownStyle}>
                          {(g.items ?? []).map(item => {
                            const isActive = activeSection === item.id;
                            return (
                              <button key={item.id}
                                onClick={() => { scrollTo(item.id); setOpenNavGroup(null); }}
                                style={{
                                  display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                                  padding: '8px 12px', border: 'none', borderRadius: 6, cursor: 'pointer', textAlign: 'left',
                                  background: isActive ? 'var(--bg2)' : 'transparent',
                                  transition: 'background .15s ease',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--bg2)'; }}
                                onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
                                <span style={mono(10, { color: 'var(--accent-2)', minWidth: 26, fontWeight: 600 })}>{item.num}</span>
                                <span style={mono(12, { color: isActive ? 'var(--fg)' : 'var(--fg-muted)', fontWeight: isActive ? 600 : 400 })}>{item.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            );
          })()}

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <button onClick={toggleLang} className="btnk invbtn"
              style={{ cursor: 'pointer', background: 'var(--panel)', border: '1px solid var(--line-2)', color: 'var(--fg-muted)', ...mono(11), height: 32, padding: '0 9px', lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {pt ? 'EN' : 'PT'}
            </button>
            <button onClick={toggleTheme} aria-label="theme" className="btnk invbtn"
              style={{ cursor: 'pointer', background: 'var(--panel)', border: '1px solid var(--line-2)', color: 'var(--fg-muted)', fontSize: 12, height: 32, padding: '0 9px', lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <a className="btnk invbtn" href={CV_URL} download="cv_ml_mlops_ats.pdf" target="_blank" rel="noreferrer"
              style={{ textDecoration: 'none', background: 'var(--panel)', border: '1px solid var(--line-2)', color: 'var(--fg)', ...mono(11), height: 32, padding: '0 12px', lineHeight: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
              {content.hero.ctaSecondary} <ArrowUpRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
            </a>
            {/* Hamburger */}
            <button className="mobile-menu-btn btnk"
              onClick={() => setMobileMenuOpen(o => !o)}
              style={{
                display: 'none', background: 'var(--panel)', border: '1px solid var(--line-2)',
                color: 'var(--fg)', ...mono(14), padding: '4px 9px', cursor: 'pointer',
              }}>
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              className="mobile-nav-drawer"
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              style={{ borderTop: '1px solid var(--line)', overflow: 'hidden' }}
            >
              <div style={{ padding: '10px clamp(20px,4vw,40px) 14px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {/* Início */}
                <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="btnk"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', ...mono(12), color: 'var(--fg-muted)', padding: '7px 0', borderBottom: '1px solid var(--line)' }}>
                  {pt ? 'Início' : 'Home'}
                </button>

                {/* Groups */}
                {[
                  { label: pt ? 'Trabalho' : 'Work', items: [
                    { id: 'capabilities', num: '§01', label: content.nav.focus },
                    { id: 'projects',     num: '§02', label: content.nav.projects },
                    { id: 'opensource',   num: '§03', label: content.nav.opensource },
                  ]},
                  { label: pt ? 'Perfil' : 'Profile', items: [
                    { id: 'about',      num: '§00', label: content.nav.about },
                    { id: 'experience', num: '§04', label: content.nav.experience },
                    { id: 'education',  num: '§06', label: content.nav.education },
                  ]},
                  { label: pt ? 'Pesquisa' : 'Science', items: [
                    { id: 'research',  num: '§05', label: content.nav.research },
                    { id: 'community', num: '§07', label: content.nav.community },
                  ]},
                ].map(group => (
                  <div key={group.label} style={{ borderBottom: '1px solid var(--line)', paddingBottom: 4, marginBottom: 0 }}>
                    <div style={{ ...mono(9, { color: 'var(--accent)', letterSpacing: '.08em' }), padding: '8px 0 4px' }}>
                      {group.label.toUpperCase()}
                    </div>
                    {group.items.map(item => {
                      const isActive = activeSection === item.id;
                      return (
                        <button key={item.id}
                          onClick={() => { scrollTo(item.id); setMobileMenuOpen(false); }}
                          className="btnk"
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                            padding: '5px 0',
                            borderLeft: `2px solid ${isActive ? 'var(--accent)' : 'transparent'}`,
                            paddingLeft: isActive ? 8 : 0,
                            transition: 'padding-left .2s, border-color .2s',
                          }}>
                          <span style={mono(9, { color: 'var(--accent)', minWidth: 22 })}>{item.num}</span>
                          <span style={mono(12, { color: isActive ? 'var(--fg)' : 'var(--fg-muted)' })}>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}

                {/* Contato */}
                <button onClick={() => { scrollTo('contact'); setMobileMenuOpen(false); }} className="btnk"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', ...mono(12), color: activeSection === 'contact' ? 'var(--accent)' : 'var(--fg-muted)', padding: '7px 0' }}>
                  {content.nav.contact}
                </button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── MAIN CONTAINER ──────────────────────────────────── */}
      <div id="top" style={{
        maxWidth: 1240, margin: '0 auto',
        padding: '0 clamp(20px,4vw,40px)',
        backgroundImage: 'linear-gradient(90deg,var(--grid) 1px,transparent 1px), linear-gradient(90deg,transparent calc(50% - 1px),var(--grid) 50%,transparent calc(50% + 1px))',
        backgroundSize: '25% 100%, 100% 100%',
      }}>

        {/* ── HERO ────────────────────────────────────────────── */}
        <section style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.04fr)',
          gap: 'clamp(20px,3vw,48px)',
          alignItems: 'center',
          minHeight: 'calc(100svh - 60px)',
          padding: 'clamp(14px,4vh,56px) 0 clamp(12px,3vh,40px)',
          borderBottom: '1px solid var(--line)',
        }} className="hero-grid">

          {/* Left — text */}
          <div>
            {/* Avatar + kicker */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'clamp(36px,2.5vh,24px)' }}>
              <div style={{
                width: 52, height: 52, flexShrink: 0, overflow: 'hidden',
                border: '1px solid var(--line-2)',
                outline: '2px solid var(--accent)',
                outlineOffset: 2,
              }}>
                <img
                  src="https://github.com/oseiasdfarias.png"
                  alt="Oséias Farias"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(1)' }}
                />
              </div>
              <span style={mono(12, { color: 'var(--fg-soft)', letterSpacing: '.06em' })}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--accent)' }}>
                  <LiveDot />
                  {content.hero.kicker}
                </span>
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.07, ease: [0.2, 0.7, 0.2, 1] }}
              style={serif('clamp(32px,min(5.8vw,6vh),68px)' as unknown as number, 500, {
                lineHeight: 0.96, letterSpacing: '-.025em', margin: '0 0 clamp(10px,2vh,20px)',
              })}>
              {content.hero.role.split(' & ')[0]}<br />
              <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
                {content.hero.role.includes(' & ') ? '& ' + content.hero.role.split(' & ')[1] : ''}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                fontSize: 'clamp(14px,min(1.7vw,1.9vh),18px)', lineHeight: 1.55,
                color: 'var(--fg-muted)', maxWidth: 500, margin: '0 0 clamp(12px,2.5vh,26px)',
              }}>
              {content.hero.lede}
            </motion.p>

            {/* Manifest grid */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.21, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(2,auto)',
                gap: '4px 24px', marginBottom: 'clamp(12px,2.5vh,26px)',
                ...mono(12, { color: 'var(--fg-soft)' }),
              }}>
              <div><span>ROLE / </span><span style={{ color: 'var(--fg-muted)' }}>AI ENGINEER · IOT</span></div>
              <div><span>LOC&nbsp;&nbsp;/ </span><span style={{ color: 'var(--fg-muted)' }}>{content.hero.location}</span></div>
              <div><span>STACK/ </span><span style={{ color: 'var(--fg-muted)' }}>PYTHON · AWS · ESP32</span></div>
              <div><span>STAT&nbsp;/ </span><span style={{ color: 'var(--accent)' }}>{pt ? 'DISPONÍVEL' : 'AVAILABLE'}</span></div>
            </motion.div>

            {/* Building — projeto atual em destaque */}
            <motion.a
              href="https://docs.otensor.com.br"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                textDecoration: 'none', width: 'fit-content',
                borderTop: '1px solid var(--line)', paddingTop: 12,
                marginBottom: 'clamp(12px,2.5vh,26px)',
                ...mono(12, { letterSpacing: '.04em' }),
              }}>
              <OtensorMark />
              <span style={{ color: 'var(--fg-soft)', letterSpacing: '.14em' }}>{pt ? 'CONSTRUINDO' : 'BUILDING'}</span>
              <span style={{ color: 'var(--accent-2)', fontWeight: 600 }}>Otensor IoT</span>
              <span style={{ color: 'var(--fg-soft)' }}>— docs.otensor.com.br</span>
            </motion.a>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.27, ease: [0.2, 0.7, 0.2, 1] }}
              style={{ display: 'flex', gap: 0, flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#projects"
                onClick={e => { e.preventDefault(); scrollTo('projects'); }}
                className="btnk"
                style={{
                  textDecoration: 'none', background: 'var(--accent)',
                  color: 'var(--bg)', ...mono(13, { fontWeight: 500, padding: 'clamp(8px,1.4vh,12px) 18px', letterSpacing: '.02em' }),
                }}>
                {content.hero.ctaPrimary} <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </a>
              <a href="#contact"
                onClick={e => { e.preventDefault(); scrollTo('contact'); }}
                className="navlink"
                style={{
                  textDecoration: 'none',
                  ...mono(13, { padding: 'clamp(8px,1.4vh,12px) 18px', borderBottom: '1px solid var(--line)' }),
                }}>
                {content.nav.contact}
              </a>
            </motion.div>
          </div>

          {/* Right — SVG DAG */}
          <HeroTelemetry lang={lang} />
        </section>

        {/* ── DAG mobile-only (acima das métricas) ───────────── */}
        <div className="mobile-dag" style={{
          padding: 'clamp(24px,5vw,40px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <HeroTelemetry lang={lang} />
        </div>

        {/* ── METRICS ─────────────────────────────────────────── */}
        <section className="metrics-strip" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
          borderBottom: '1px solid var(--line)',
        }}>
          <MetricItem value={501} suffix="+" label={pt ? 'testes unitários' : 'unit tests'} />
          <MetricItem value={100} suffix="%" label={pt ? 'cobertura synapsys' : 'synapsys coverage'} />
          <MetricItem value={2}   suffix=""  label={pt ? 'mestrados em IA/Ctrl' : "AI/Ctrl master's"} />
          <MetricItem value={certs.length} suffix="" label={pt ? 'certificações' : 'certifications'} />
        </section>

        {/* ── ABOUT §00 ──────────────────────────────────────── */}
        <section id="about" data-section="about" style={{ scrollMarginTop: 70 }}>
          <div className="about-grid" style={{
            display: 'grid', gridTemplateColumns: '120px minmax(0,1fr)',
            gap: 'clamp(16px,3vw,40px)',
            padding: 'clamp(40px,6vw,72px) 0',
            borderBottom: '1px solid var(--line)',
          }}>
            <FadeIn>
              <div style={mono(12, { color: 'var(--fg-soft)', letterSpacing: '.04em' })}>
                §00<br /><span style={{ color: 'var(--fg-muted)' }}>{content.about.title}</span>
              </div>
            </FadeIn>
            <div style={{ maxWidth: 760 }}>
              <FadeIn>
                <p style={serif('clamp(24px,3.4vw,38px)' as unknown as number, 400, {
                  lineHeight: 1.28, letterSpacing: '-.015em', margin: '0 0 30px',
                })}>
                  {content.about.lede}
                </p>
              </FadeIn>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 22 }}>
                {content.about.paras.map((para, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <p style={{ fontSize: 15.5, lineHeight: 1.72, color: 'var(--fg-muted)', margin: 0 }}
                      dangerouslySetInnerHTML={{ __html: para }} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CAPABILITIES §01 ───────────────────────────────── */}
        <section id="capabilities" data-section="capabilities" style={{
          scrollMarginTop: 70,
          padding: 'clamp(40px,6vw,72px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <SectionHeader
            num="§01" title={content.focus.title}
            subtitle={`[ 04 ${pt ? 'MÓDULOS' : 'MODULES'} ]`}
          />
          <div className="capabilities-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(252px,1fr))', gap: 16, alignItems: 'stretch' }}>
            {content.focus.pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="mod" style={{
                  border: '1px solid var(--line)', borderRadius: 8,
                  background: 'var(--panel)', padding: '24px 22px',
                  display: 'flex', flexDirection: 'column', flex: 1,
                }}>
                  <span className="modbar" />
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', marginBottom: 18, ...mono(11),
                  }}>
                    <span style={{ color: 'var(--accent)' }}>[{p.k}]</span>
                    <span style={{ color: 'var(--fg-soft)' }}>M.0{i + 1}</span>
                  </div>
                  <h3 style={serif(21, 500, { margin: '0 0 9px', letterSpacing: '-.01em' })}>{p.t}</h3>
                  <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.6, color: 'var(--fg-muted)' }}>{p.d}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {p.tags.map(tag => (
                      <span key={tag} className="tagk"
                        style={mono(10.5, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 7px' })}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS §02 ───────────────────────────────────── */}
        <section id="projects" data-section="projects" style={{
          scrollMarginTop: 70,
          padding: 'clamp(40px,6vw,72px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <SectionHeader num="§02" title={content.projects.title} subtitle={content.projects.subtitle} />

          <div className="projects-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))', gap: 20 }}>
            {projects.map((proj, i) => {
              const statusLabel = proj.status || ((pt ? STATUS_LABELS_PT : STATUS_LABELS_EN)[i] ?? 'concluído');
              const statusColor = proj.status?.includes('produção') || proj.status?.includes('production')
                ? 'var(--accent)'
                : proj.status?.includes('construção') || proj.status?.includes('building')
                  ? 'var(--accent-2)'
                  : 'var(--fg-muted)';
              return (
                <motion.article key={i} className="mod card-interactive"
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                  style={{
                    border: '1px solid var(--line)', borderRadius: 8,
                    background: 'var(--panel)', padding: '26px 24px',
                    display: 'flex', flexDirection: 'column',
                  }}
                >
                  <span className="modbar" />
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', marginBottom: 14,
                    ...mono(11, { color: 'var(--fg-soft)' }),
                  }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span>REC.0{i + 1}</span>
                      {proj.featured && (
                        <span style={{
                          background: 'rgba(227,169,74,0.12)',
                          color: 'var(--accent)',
                          padding: '1px 6px',
                          borderRadius: 2,
                          fontSize: 9.5,
                          letterSpacing: '.05em',
                          fontWeight: 500,
                        }}>
                          {pt ? 'DESTAQUE' : 'FLAGSHIP'}
                        </span>
                      )}
                    </span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: statusColor }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: statusColor }} />
                      {statusLabel}
                    </span>
                  </div>

                  {/* Visual preview padronizado (220px de altura para todos os cards) */}
                  <div style={{
                    marginBottom: 16,
                    border: '1px solid var(--line)',
                    overflow: 'hidden',
                    background: 'var(--bg2)',
                    height: 220,
                    position: 'relative',
                  }}>
                    {proj.id === 'lab-virtual' ? (
                      <Aeropendulo3D />
                    ) : proj.image ? (
                      <img
                        src={proj.image}
                        alt={proj.title}
                        loading="lazy"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          display: 'block',
                          filter: 'brightness(0.95)',
                          transition: 'transform 0.4s ease',
                        }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                      />
                    ) : proj.id ? (
                      <ProjectDiagram type={proj.id} lang={lang} />
                    ) : null}
                  </div>

                  <h3 style={serif(24, 500, { margin: '0 0 5px', letterSpacing: '-.015em', lineHeight: 1.05 })}>
                    {proj.title}
                  </h3>
                  <div style={mono(11, { color: 'var(--fg-soft)', marginBottom: 14 })}>
                    {proj.category} · {proj.year}
                  </div>

                  {/* Métricas rápidas de impacto do projeto */}
                  {proj.metrics && proj.metrics.length > 0 && (
                    <div style={{
                      display: 'grid', gridTemplateColumns: `repeat(${proj.metrics.length}, 1fr)`,
                      gap: 8, padding: '10px 12px', background: 'var(--bg2)',
                      border: '1px solid var(--line)', marginBottom: 16,
                    }}>
                      {proj.metrics.map(m => (
                        <div key={m.label}>
                          <div style={mono(9.5, { color: 'var(--fg-soft)', textTransform: 'uppercase' })}>{m.label}</div>
                          <div style={mono(11, { color: 'var(--accent)', fontWeight: 600, marginTop: 2 })}>{m.value}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                    {([
                      { k: 'P', text: proj.problem,  accent: false },
                      { k: 'S', text: proj.solution,  accent: false },
                      { k: 'I', text: proj.impact,    accent: true  },
                    ]).map(({ k, text, accent }) => (
                      <div key={k} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 10 }}>
                        <span style={mono(11, { color: 'var(--accent)' })}>{k}</span>
                        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: accent ? 'var(--fg)' : 'var(--fg-muted)' }}>
                          {text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div style={{
                    display: 'flex', flexWrap: 'wrap', gap: 5,
                    margin: '18px 0 0', paddingTop: 16, borderTop: '1px solid var(--line)',
                  }}>
                    {proj.tags.map(tag => (
                      <span key={tag} className="tech-tag">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginTop: 16, flexWrap: 'wrap' }}>
                    {proj.link && (
                      <a className="reglink" href={proj.link} target="_blank" rel="noreferrer"
                        style={mono(12, { display: 'inline-flex', alignItems: 'center', gap: 4 })}>
                        {proj.link.includes('github.com')
                          ? (pt ? 'abrir repositório' : 'open repository')
                          : (pt ? 'abrir documentação' : 'open documentation')}
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                    {proj.github && proj.github !== proj.link && (
                      <a className="reglink" href={proj.github} target="_blank" rel="noreferrer"
                        style={mono(12, { display: 'inline-flex', alignItems: 'center', gap: 4 })}>
                        {pt ? 'código fonte' : 'source code'}
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>

          <FadeIn>
            <div style={{ marginTop: 24 }}>
              <a href="https://github.com/oseiasdfarias" target="_blank" rel="noreferrer"
                className="navlink" style={mono(13)}>
                {content.projects.viewAll} <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
              </a>
            </div>
          </FadeIn>
        </section>

        {/* ── OPEN SOURCE §03 ────────────────────────────────── */}
        <section id="opensource" data-section="opensource" style={{
          scrollMarginTop: 70,
          padding: 'clamp(40px,6vw,72px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <SectionHeader num="§03" title={content.opensource.title} subtitle={content.opensource.subtitle} />

          <FadeIn delay={0.08}>
            <div className="opensource-grid" style={{
              display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)',
              border: '1px solid var(--line)', background: 'var(--panel)',
            }}>
              {/* Left — info + stats */}
              <div style={{ padding: 'clamp(22px,3vw,32px)', borderRight: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 11, flexWrap: 'wrap', marginBottom: 16 }}>
                  <h3 style={serif(30, 500, { margin: 0, letterSpacing: '-.02em' })}>{openSource.name}</h3>
                  <span style={mono(11, { color: 'var(--accent)', border: '1px solid var(--line)', padding: '2px 7px' })}>{openSource.version}</span>
                  <span style={mono(11, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 7px' })}>{openSource.license}</span>
                </div>
                <p style={{ margin: '0 0 22px', fontSize: 15, lineHeight: 1.66, color: 'var(--fg-muted)' }}>
                  {openSource.description}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--line)', marginBottom: 22 }}>
                  {openSource.stats.map(s => (
                    <div key={s.label} style={{ flex: 1, padding: '16px 12px 4px', borderRight: '1px solid var(--line)' }}>
                      <div style={serif(28, 500, { lineHeight: 0.9 })}>{s.value}</div>
                      <div style={mono(10, {
                        color: 'var(--fg-soft)', marginTop: 8,
                        textTransform: 'uppercase', letterSpacing: '.06em',
                      })}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a className="btnk invbtn" href={openSource.github} target="_blank" rel="noreferrer"
                    style={{
                      textDecoration: 'none', ...mono(12, {
                        color: 'var(--fg-muted)', border: '1px solid var(--line-2)', padding: '8px 14px',
                      }),
                    }}>
                    GitHub <ArrowUpRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </a>
                  <a className="btnk" href={openSource.pypi} target="_blank" rel="noreferrer"
                    style={{
                      textDecoration: 'none', ...mono(12, {
                        color: 'var(--bg)', background: 'var(--accent)', padding: '8px 14px',
                      }),
                    }}>
                    PyPI <ArrowUpRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </a>
                </div>
              </div>

              {/* Right — demo GIFs */}
              <div style={{ padding: 'clamp(22px,3vw,32px)' }}>
                <div style={mono(11, { color: 'var(--fg-soft)', marginBottom: 10 })}>
                  FIG.02 — {openSource.demo.title}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {openSource.demo.media.slice(0, 1).map((item, i) => (
                    <button key={i} onClick={() => openModal(openSource.demo.media, i)}
                      style={{
                        aspectRatio: '16/9', border: '1px solid var(--line)',
                        overflow: 'hidden', background: 'var(--bg2)', padding: 0, cursor: 'pointer',
                        display: 'block', width: '100%',
                      }}>
                      <img src={item.src} alt={item.caption} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    </button>
                  ))}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                    {openSource.demo.media.slice(1, 3).map((item, i) => (
                      <button key={i + 1} onClick={() => openModal(openSource.demo.media, i + 1)}
                        style={{
                          aspectRatio: '16/10', border: '1px solid var(--line)',
                          overflow: 'hidden', background: 'var(--bg2)', padding: 0, cursor: 'pointer',
                          display: 'block', width: '100%',
                        }}>
                        <img src={item.src} alt={item.caption} loading="lazy"
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── EXPERIENCE §04 ─────────────────────────────────── */}
        <section id="experience" data-section="experience" style={{
          scrollMarginTop: 70,
          padding: 'clamp(40px,6vw,72px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 14 }}>
              <span style={mono(14, { color: 'var(--accent)' })}>§04</span>
              <h2 style={serif('clamp(28px,3.6vw,42px)' as unknown as number, 500, { margin: 0, letterSpacing: '-.02em' })}>
                {content.experience.title}
              </h2>
            </div>
          </FadeIn>

          <div style={{ maxWidth: 900 }}>
            {experience.map((exp, i) => (
              <motion.div key={i}
                className="experience-row"
                initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-5%' }}
                transition={{ duration: 0.65, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
                style={{
                  display: 'grid', gridTemplateColumns: '170px 1fr',
                  gap: 24, padding: '22px 0', borderTop: '1px solid var(--line)',
                }}>
                <div className="experience-period"
                  style={mono(12, { color: 'var(--fg-soft)', paddingTop: 4 })}>
                  {exp.period}
                </div>
                <div>
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: 11,
                    flexWrap: 'wrap', marginBottom: 4,
                  }}>
                    <h3 style={serif(19, 500, { margin: 0 })}>{exp.title}</h3>
                    <span style={mono(9.5, {
                      textTransform: 'uppercase', letterSpacing: '.08em',
                      color: 'var(--accent)', border: '1px solid var(--line)', padding: '1px 6px',
                    })}>
                      {exp.type === 'industry'
                        ? (pt ? 'Mercado' : 'Industry')
                        : exp.type === 'volunteer'
                          ? (pt ? 'Voluntário' : 'Volunteer')
                          : (pt ? 'Pesquisa' : 'Research')}
                    </span>
                    {exp.current && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <LiveDot />
                        <span style={mono(10, { color: 'var(--accent)' })}>{pt ? 'atual' : 'current'}</span>
                      </span>
                    )}
                  </div>
                  <p style={{ margin: '0 0 10px', ...mono(12, { color: 'var(--fg-muted)' }) }}>{exp.company}</p>
                  <p style={{ margin: '0 0 12px', fontSize: 14.5, lineHeight: 1.62, color: 'var(--fg-muted)' }}>
                    {exp.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {exp.tags.map(tag => (
                      <span key={tag}
                        style={mono(10.5, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 7px' })}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── RESEARCH §05 ───────────────────────────────────── */}
        <section id="research" data-section="research" style={{
          scrollMarginTop: 70,
          padding: 'clamp(40px,6vw,72px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <SectionHeader num="§05" title={content.research.title} subtitle={content.research.subtitle} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: 20, alignItems: 'stretch' }}>
            {research.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="mod" style={{
                  border: '1px solid var(--line)', borderRadius: 8,
                  background: 'var(--panel)', padding: '24px 22px',
                  display: 'flex', flexDirection: 'column', flex: 1,
                }}>
                  <span className="modbar" />
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginBottom: 12, ...mono(11, { color: 'var(--fg-soft)' }),
                  }}>
                    <span>{r.period}</span>
                    {r.ongoing && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}>
                        <LiveDot />
                        {content.status.ongoing}
                      </span>
                    )}
                  </div>

                  {/* Diagrama técnico da pesquisa */}
                  {r.id && (r.id === 'ufabc' || r.id === 'ufpa') && (
                    <div style={{
                      marginBottom: 16,
                      border: '1px solid var(--line)',
                      borderRadius: 6,
                      overflow: 'hidden',
                      background: 'var(--bg2)',
                      height: 220,
                      position: 'relative',
                    }}>
                      <ResearchDiagram type={r.id as 'ufabc' | 'ufpa'} lang={lang} />
                    </div>
                  )}

                  <h3 style={serif(19, 500, { margin: '0 0 6px', lineHeight: 1.2 })}>{r.title}</h3>
                  <p style={mono(11.5, { color: 'var(--accent)', margin: '0 0 12px' })}>{r.institution}</p>
                  <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-muted)', flex: 1 }}>
                    {r.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {r.tags.map(tag => (
                      <span key={tag} className="tagk"
                        style={mono(10, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 6px' })}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Publications */}
          <FadeIn>
            <div style={mono(11, {
              textTransform: 'uppercase', letterSpacing: '.1em',
              color: 'var(--fg-soft)', margin: '28px 0 4px',
            })}>
              {content.research.publications}
            </div>
          </FadeIn>
          <div>
            {pubs.map((pub, i) => (
              <FadeIn key={i} delay={i * 0.07}>
                <div className="pub-row" style={{
                  display: 'grid', gridTemplateColumns: '1fr auto',
                  gap: 14, alignItems: 'baseline',
                  padding: '14px 0', borderTop: '1px solid var(--line)',
                }}>
                  <h4 style={serif(16, 500, { margin: 0, lineHeight: 1.3 })}>{pub.title}</h4>
                  <p className="pub-meta"
                    style={mono(11, { margin: 0, color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>
                    {pub.venue} · {pub.date}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── EDUCATION §06 ──────────────────────────────────── */}
        <section id="education" data-section="education" style={{
          scrollMarginTop: 70,
          padding: 'clamp(40px,6vw,72px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <FadeIn>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 26 }}>
              <span style={mono(14, { color: 'var(--accent)' })}>§06</span>
              <h2 style={serif('clamp(28px,3.6vw,42px)' as unknown as number, 500, { margin: 0, letterSpacing: '-.02em' })}>
                {content.education.title}
              </h2>
            </div>
          </FadeIn>

          {/* Degree cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(262px,1fr))', gap: 16, marginBottom: 30, alignItems: 'stretch' }}>
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="mod" style={{
                  border: '1px solid var(--line)', borderRadius: 8,
                  background: 'var(--panel)', padding: 22,
                  display: 'flex', flexDirection: 'column', flex: 1,
                  alignItems: 'center', textAlign: 'center',
                }}>
                  <span className="modbar" />
                  {/* Top Centered Logo */}
                  <div style={{ marginBottom: 18, display: 'flex', justifyContent: 'center' }}>
                    <EduLogo id={edu.id} size={68} />
                  </div>
                  <div style={mono(11, { color: 'var(--accent)', marginBottom: 6 })}>
                    {edu.period} · {edu.institution}
                  </div>
                  <h3 style={serif(18, 500, { margin: '0 0 8px', lineHeight: 1.25 })}>{edu.title}</h3>
                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--fg-muted)', flex: 1 }}>
                    {edu.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <FadeIn>
            <div style={mono(11, {
              textTransform: 'uppercase', letterSpacing: '.1em',
              color: 'var(--fg-soft)', marginBottom: 8,
            })}>
              {content.education.certifications}
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(252px,1fr))', gap: 8 }}>
            {certs.map((cert, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                  padding: '13px 14px', border: '1px solid var(--line)', borderRadius: 6,
                  background: 'var(--panel)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 11, minWidth: 0 }}>
                    <CertIcon category={cert.category} title={cert.title} size={15} />
                    <div style={{ minWidth: 0 }}>
                      <div style={serif(14.5, 500, {
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                      })}>
                        {cert.link
                          ? <a href={cert.link} target="_blank" rel="noreferrer"
                            style={{ textDecoration: 'none', color: 'inherit' }}>{cert.title}</a>
                          : cert.title}
                      </div>
                      <div style={mono(10, { color: 'var(--fg-soft)', marginTop: 2 })}>{cert.issuer}</div>
                    </div>
                  </div>
                  <span style={mono(10.5, { color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>{cert.date}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* ── COMMUNITY §07 ─────────────────────────────────── */}
        <section id="community" data-section="community" style={{
          scrollMarginTop: 70,
          padding: 'clamp(40px,6vw,72px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <SectionHeader
            num="§07"
            title={pt ? 'Onde estou online' : 'Find me online'}
            subtitle={pt ? '[ 03 CANAIS ]' : '[ 03 CHANNELS ]'}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16, alignItems: 'stretch' }}>
            {([
              {
                platform: 'YouTube',
                handle:   '@otensor',
                href:     'https://www.youtube.com/@otensor',
                tag:      'VIDEO',
                desc: pt
                  ? 'Vídeos sobre machine learning, controle inteligente e engenharia de software — do conceito ao código.'
                  : 'Videos on machine learning, intelligent control and software engineering — from concept to code.',
                cta: pt ? 'Assistir' : 'Watch',
              },
              {
                platform: 'Medium',
                handle:   '@oseiasfarias',
                href:     'https://oseiasfarias.medium.com',
                tag:      'BLOG',
                desc: pt
                  ? 'Artigos técnicos sobre MLOps, APIs, arquitetura de sistemas e experiências de pesquisa acadêmica.'
                  : 'Technical articles on MLOps, APIs, system architecture and academic research experiences.',
                cta: pt ? 'Ler artigos' : 'Read articles',
              },
              {
                platform: 'GitHub',
                handle:   '@oseiasdfarias',
                href:     'https://github.com/oseiasdfarias',
                tag:      'CODE',
                desc: pt
                  ? 'Repositórios de projetos open source, experimentos de pesquisa e código dos vídeos e artigos.'
                  : 'Open source project repos, research experiments and code from videos and articles.',
                cta: pt ? 'Ver projetos' : 'View projects',
              },
            ]).map(({ platform, handle, href, tag, desc, cta }, i) => (
              <motion.div
                key={platform}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="mod" style={{
                  border: '1px solid var(--line)', borderRadius: 8,
                  background: 'var(--panel)', padding: '28px 24px',
                  display: 'flex', flexDirection: 'column', flex: 1,
                }}>
                  <span className="modbar" />
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', marginBottom: 20,
                  }}>
                    <span style={mono(10, {
                      color: 'var(--accent)', border: '1px solid var(--line)',
                      padding: '2px 7px', letterSpacing: '.06em',
                    })}>
                      {tag}
                    </span>
                    <span style={mono(11, { color: 'var(--fg-soft)' })}>{handle}</span>
                  </div>
                  <h3 style={serif(32, 500, { margin: '0 0 12px', letterSpacing: '-.02em', lineHeight: 1 })}>
                    {platform}
                  </h3>
                  <p style={{ margin: '0 0 24px', fontSize: 14, lineHeight: 1.65, color: 'var(--fg-muted)', flex: 1 }}>
                    {desc}
                  </p>
                  <a
                    href={href} target="_blank" rel="noreferrer"
                    className="btnk invbtn"
                    style={{
                      textDecoration: 'none', alignSelf: 'flex-start',
                      border: '1px solid var(--line-2)',
                      ...mono(12, { color: 'var(--fg-muted)', padding: '8px 14px' }),
                    }}
                  >
                    {cta} <ArrowUpRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CONTACT §08 ────────────────────────────────────── */}
        <section id="contact" data-section="contact" style={{
          scrollMarginTop: 70,
          padding: 'clamp(40px,6vw,72px) 0 clamp(48px,7vw,80px)',
        }}>
          <div className="contact-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: 'clamp(24px,5vw,56px)', alignItems: 'start',
          }}>
            {/* Left — info + socials */}
            <FadeIn>
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
                  <span style={mono(14, { color: 'var(--accent)' })}>§08</span>
                  <h2 style={serif('clamp(30px,4.4vw,52px)' as unknown as number, 500, {
                    margin: 0, letterSpacing: '-.025em',
                  })}>
                    {content.contact.title}
                  </h2>
                </div>
                <p style={{ margin: '0 0 26px', fontSize: 16.5, lineHeight: 1.6, color: 'var(--fg-muted)', maxWidth: 420 }}>
                  {content.contact.subtitle}
                </p>

                {/* Ação rápida de cópia de e-mail */}
                <div style={{ marginBottom: 24 }}>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('oseias.dfarias@gmail.com');
                      setCopyStatus(true);
                      setTimeout(() => setCopyStatus(false), 2500);
                    }}
                    className="btnk"
                    style={{
                      background: 'var(--bg2)',
                      border: '1px solid var(--line-2)',
                      color: 'var(--fg)',
                      padding: '8px 14px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      ...mono(12),
                    }}
                  >
                    <span>oseias.dfarias@gmail.com</span>
                    <span style={{ color: 'var(--accent)', fontSize: 11 }}>
                      {copyStatus ? (pt ? '✓ Copiado!' : '✓ Copied!') : (pt ? '[Copiar]' : '[Copy]')}
                    </span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 16px', ...mono(13) }}>
                  {socials.map(s => (
                    <React.Fragment key={s.label}>
                      <span style={{ color: 'var(--fg-soft)' }}>{s.label.slice(0, 2).toUpperCase()}</span>
                      <a className="reglink" href={s.href} target="_blank" rel="noreferrer"
                        style={{ justifySelf: 'start' }}>
                        {s.label} <ArrowUpRight size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                      </a>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right — form */}
            <FadeIn delay={0.1}>
              <form onSubmit={handleSubmit} style={{
                display: 'flex', flexDirection: 'column', gap: 0,
                border: '1px solid var(--line)',
              }}>
                <input type="text" name="name" required placeholder={content.contact.name}
                  style={{
                    background: 'var(--panel)', border: 'none',
                    borderBottom: '1px solid var(--line)', padding: '15px 16px',
                    color: 'var(--fg)', ...mono(14.5), outline: 'none',
                  }} />
                <input type="email" name="email" required placeholder={content.contact.email}
                  style={{
                    background: 'var(--panel)', border: 'none',
                    borderBottom: '1px solid var(--line)', padding: '15px 16px',
                    color: 'var(--fg)', ...mono(14.5), outline: 'none',
                  }} />
                <textarea name="message" rows={4} required placeholder={content.contact.message}
                  style={{
                    background: 'var(--panel)', border: 'none',
                    borderBottom: '1px solid var(--line)', padding: '15px 16px',
                    color: 'var(--fg)', ...mono(14.5), outline: 'none', resize: 'vertical',
                  }} />
                <button type="submit" disabled={formStatus === 'sending'} className="btnk"
                  style={{
                    cursor: 'pointer', background: 'var(--accent)', color: 'var(--bg)',
                    border: 'none', padding: 15,
                    ...mono(14, { fontWeight: 500, letterSpacing: '.02em' }),
                    opacity: formStatus === 'sending' ? 0.6 : 1,
                  }}>
                  {formStatus === 'sending' ? content.contact.sending : content.contact.send} <ArrowRight size={14} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </button>
                {formStatus === 'success' && (
                  <p style={{ margin: 0, padding: '12px 16px', ...mono(12, { color: 'var(--accent)' }) }}>
                    {content.contact.success}
                  </p>
                )}
                {formStatus === 'error' && (
                  <p style={{ margin: 0, padding: '12px 16px', ...mono(12, { color: 'var(--accent)' }) }}>
                    {content.contact.error}
                  </p>
                )}
              </form>
            </FadeIn>
          </div>

          {/* Footer */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 10, marginTop: 48, paddingTop: 18,
            borderTop: '1px solid var(--line)', ...mono(11, { color: 'var(--fg-soft)' }),
          }}>
            <span>{content.footer.rights}</span>
            <span>{content.footer.built} · OF—2026</span>
          </div>
        </section>

      </div>{/* end main container */}

      {/* ── Media modal ──────────────────────────────────────── */}
      <AnimatePresence>
        {modal && (
          <MediaModal
            modal={modal}
            onClose={closeModal}
            onPrev={() => prevMedia(openSource.demo.media)}
            onNext={() => nextMedia(openSource.demo.media)}
          />
        )}
      </AnimatePresence>

      {/* ── Back to top ──────────────────────────────────────── */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="btnk"
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 50,
              background: 'var(--panel)', border: '1px solid var(--line-2)',
              color: 'var(--fg-muted)', width: 40, height: 40,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', ...mono(14),
            }}
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={16} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
};

export default App;
