import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Menu, ArrowUpRight, ArrowRight, ArrowUp, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  translations, getProjects, getExperience,
  getEducation, getCertifications, getResearch, getPublications, getOpenSource,
} from './content';
import { Language } from './types';
import { useCounter } from './hooks/useAnimations';

// ─── Theme tokens ─────────────────────────────────────────────────────────────

const DARK: CSSProperties = {
  '--bg':       '#0d0c0b',
  '--bg2':      '#131210',
  '--panel':    '#121110',
  '--line':     'rgba(236,233,225,.13)',
  '--line-2':   'rgba(236,233,225,.32)',
  '--grid':     'rgba(236,233,225,.04)',
  '--fg':       '#ece9e1',
  '--fg-muted': '#a39d90',
  '--fg-soft':  '#6f695c',
  '--accent':   '#e8513a',
} as CSSProperties;

const LIGHT: CSSProperties = {
  '--bg':       '#f3efe6',
  '--bg2':      '#ebe6d9',
  '--panel':    '#f8f5ee',
  '--line':     'rgba(20,17,13,.14)',
  '--line-2':   'rgba(20,17,13,.34)',
  '--grid':     'rgba(20,17,13,.045)',
  '--fg':       '#17130d',
  '--fg-muted': '#5b5446',
  '--fg-soft':  '#8a8273',
  '--accent':   '#e8513a',
} as CSSProperties;

// ─── Typography helpers ───────────────────────────────────────────────────────

const mono = (size: number | string = 12, extra?: CSSProperties): CSSProperties => ({
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: size as number,
  ...extra,
});

const serif = (size: number | string = 16, weight = 400, extra?: CSSProperties): CSSProperties => ({
  fontFamily: "'Newsreader', Georgia, serif",
  fontSize: size as number,
  fontWeight: weight,
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

// ─── Hero SVG Pipeline DAG ────────────────────────────────────────────────────

const HeroPipelineDAG: React.FC<{ lang: Language; vertical?: boolean }> = ({ lang, vertical }) => {
  const pt = lang === 'pt';

  const header = (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      marginBottom: 16, ...mono(11, { color: 'var(--fg-soft)', letterSpacing: '.04em' }),
    }}>
      <span>FIG.01 — {pt ? 'CICLO DE VIDA ML' : 'ML LIFECYCLE'}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}>
        <LiveDot />
        {pt ? 'ativo' : 'live'}
      </span>
    </div>
  );

  const corners = (
    ([
      { top: -1, left: -1, borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)' },
      { top: -1, right: -1, borderTop: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' },
      { bottom: -1, left: -1, borderBottom: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)' },
      { bottom: -1, right: -1, borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' },
    ] as CSSProperties[]).map((s, i) => (
      <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s }} />
    ))
  );

  /* ── Vertical SVG (desktop) ── */
  if (vertical) {
    // nodes with sub-label → NH=32, step=46 (32px node + 14px gap)
    const NW = 138, NH = 32, NX = 26, cx = NX + NW / 2; // cx ≈ 95
    const ys  = [8, 54, 100, 146, 192, 238];
    const cy  = (i: number) => ys[i] + NH / 2;
    const bot = (i: number) => ys[i] + NH;
    const top = (i: number) => ys[i];
    const arcX = NX + NW + 14; // retrain arc x ≈ 178
    const vbW  = arcX + 22;    // ≈ 200
    const vbH  = ys[5] + NH + 10; // ≈ 280

    const nodes = [
      { label: pt ? 'dados'    : 'data',     sub: 'SQS → Lambda',   fg: 'var(--fg-muted)', stroke: 'var(--line-2)', fill: 'var(--bg2)' },
      { label: pt ? 'treino'   : 'train',    sub: 'PyTorch · NLP',  fg: 'var(--fg)',       stroke: 'var(--accent)', fill: 'var(--bg2)' },
      { label: pt ? 'registro' : 'registry', sub: 'MLflow',         fg: 'var(--fg-muted)', stroke: 'var(--line-2)', fill: 'var(--bg2)' },
      { label: 'deploy',                     sub: 'AWS Lambda',      fg: 'var(--fg-muted)', stroke: 'var(--line-2)', fill: 'var(--bg2)' },
      { label: 'monitor',                    sub: 'drift · p99',    fg: 'var(--fg)',       stroke: 'var(--accent)', fill: 'var(--bg2)', pulse: true },
      { label: 'api serving',                sub: 'FastAPI · REST',  fg: 'var(--fg-muted)', stroke: 'var(--line-2)', fill: 'var(--bg2)' },
    ];

    const flowPath = `M${cx},${ys[0]} L${cx},${ys[4]+NH}`; // dot para nos 01–05

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
        style={{ position: 'relative', border: '1px solid var(--line)', background: 'var(--panel)', padding: '16px 16px 12px' }}
      >
        {corners}
        {header}
        <svg viewBox={`0 0 ${vbW} ${vbH}`} width="100%"
          style={{ display: 'block', overflow: 'visible', maxHeight: 'clamp(160px,38vh,300px)' }}>
          <defs>
            <marker id="av" markerWidth="7" markerHeight="7" refX="4" refY="3" orient="auto">
              <path d="M0 0 L 4 3 L 0 6" fill="none" stroke="var(--fg-soft)" strokeWidth="1.1" />
            </marker>
          </defs>

          {/* Static edges */}
          <g fill="none" stroke="var(--line-2)" strokeWidth="1.3" strokeLinecap="square">
            {[0,1,2,3,4].map(i => (
              <path key={i} d={`M${cx} ${bot(i)} L${cx} ${top(i+1)}`} markerEnd="url(#av)" />
            ))}
            <path d={`M${NX+NW} ${cy(5)} L${arcX} ${cy(5)} L${arcX} ${cy(1)} L${NX+NW} ${cy(1)}`} markerEnd="url(#av)" />
          </g>

          {/* Animated accent dashes — forward flow (dados → monitor) */}
          <g fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="square"
            strokeDasharray="4 8" style={{ animation: 'dashflow .9s linear infinite' }}>
            {[0,1,2,3].map(i => (
              <path key={i} d={`M${cx} ${bot(i)} L${cx} ${top(i+1)}`} />
            ))}
          </g>
          {/* monitor → api serving — sentido reverso (feedback) */}
          <path d={`M${cx} ${bot(4)} L${cx} ${top(5)}`}
            fill="none" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="square"
            strokeDasharray="4 8" style={{ animation: 'dashflow .9s linear infinite reverse' }} />
          {/* Retrain arc animated — api serving → treino */}
          <path d={`M${NX+NW} ${cy(5)} L${arcX} ${cy(5)} L${arcX} ${cy(1)} L${NX+NW} ${cy(1)}`}
            fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="square"
            strokeDasharray="2 5" style={{ animation: 'dashflow 1.1s linear infinite' }} />

          {/* Traveling dots — param apenas até o monitor (etapas 01–05) */}
          <circle r="2.8" fill="var(--accent)" opacity="0.9">
            <animateMotion dur="2.6s" repeatCount="indefinite"
              path={`M${cx},${ys[0]} L${cx},${ys[4]+NH}`} />
          </circle>
          <circle r="2.8" fill="var(--accent)" opacity="0.45">
            <animateMotion dur="2.6s" begin="1.3s" repeatCount="indefinite"
              path={`M${cx},${ys[0]} L${cx},${ys[4]+NH}`} />
          </circle>
          {/* Dot reverso — api serving → monitor */}
          <circle r="2.5" fill="var(--fg-soft)" opacity="0.6">
            <animateMotion dur="1.6s" repeatCount="indefinite"
              path={`M${cx},${ys[5]+NH} L${cx},${ys[4]}`} />
          </circle>

          {/* Step numbers */}
          <g fontFamily="IBM Plex Mono" fontSize="8.5" fill="var(--fg-soft)" textAnchor="end">
            {nodes.map((_, i) => (
              <text key={i} x={NX - 5} y={cy(i) + 3}>0{i+1}</text>
            ))}
          </g>

          {/* Nodes */}
          <g fontFamily="IBM Plex Mono" textAnchor="middle">
            {nodes.map((n, i) => (
              <g key={i}>
                <rect x={NX} y={ys[i]} width={NW} height={NH} fill={n.fill} stroke={n.stroke} />
                {/* left accent bar for active nodes */}
                {(i === 1 || i === 4) && (
                  <rect x={NX} y={ys[i]} width={2} height={NH} fill="var(--accent)" />
                )}
                {/* pulse dot on monitor */}
                {n.pulse && (
                  <circle cx={NX + 10} cy={cy(i)} r="2.5" fill="var(--accent)"
                    style={{ animation: 'nodepulse 1.8s ease-in-out infinite', transformOrigin: `${NX+10}px ${cy(i)}px` }} />
                )}
                <text x={cx} y={cy(i) - 2} fontSize="10.5" fill={n.fg}>{n.label}</text>
                <text x={cx} y={cy(i) + 10} fontSize="7.5" fill="var(--fg-soft)" opacity="0.75">{n.sub}</text>
              </g>
            ))}
          </g>

          {/* Retrain label */}
          <text x={arcX + 3} y={(cy(1)+cy(5))/2} fontFamily="IBM Plex Mono" fontSize="8"
            fill="var(--accent)" textAnchor="middle"
            transform={`rotate(-90,${arcX+3},${(cy(1)+cy(5))/2})`}>retrain ↺</text>
        </svg>
      </motion.div>
    );
  }

  /* ── Horizontal SVG (desktop) ── */
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.16, ease: [0.2, 0.7, 0.2, 1] }}
      style={{
        position: 'relative', border: '1px solid var(--line)',
        background: 'var(--panel)', padding: '24px 22px 18px',
      }}
    >
      {corners}
      {header}
      <svg viewBox="0 0 480 250" width="100%" style={{ display: 'block', overflow: 'visible' }}>
        {/* Static edges */}
        <g fill="none" stroke="var(--line-2)" strokeWidth="1.4" strokeLinecap="square">
          <path d="M70 56 L 122 56" markerEnd="url(#ah)" />
          <path d="M192 56 L 244 56" markerEnd="url(#ah)" />
          <path d="M314 56 L 366 56" markerEnd="url(#ah)" />
          <path d="M410 78 L 410 130 L 314 152" markerEnd="url(#ah)" />
          <path d="M244 158 L 192 158" markerEnd="url(#ah)" />
          <path d="M148 136 L 148 78" markerEnd="url(#ah)" />
        </g>
        {/* Animated accent edges */}
        <g fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="square"
          strokeDasharray="4 7" style={{ animation: 'dashflow .9s linear infinite' }}>
          <path d="M70 56 L 122 56" />
          <path d="M192 56 L 244 56" />
          <path d="M314 56 L 366 56" />
          <path d="M410 78 L 410 130 L 314 152" />
          <path d="M244 158 L 192 158" />
        </g>
        <path d="M148 136 L 148 78" fill="none" stroke="var(--accent)" strokeWidth="1.6"
          strokeLinecap="square" strokeDasharray="2 6"
          style={{ animation: 'dashflow 1.1s linear infinite reverse' }} />
        <defs>
          <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0 0 L 6 3 L 0 6" fill="none" stroke="var(--fg-soft)" strokeWidth="1.2" />
          </marker>
        </defs>
        {/* Nodes */}
        <g fontFamily="IBM Plex Mono" fontSize="11.5" textAnchor="middle">
          <g><rect x="8" y="40" width="62" height="32" fill="var(--bg2)" stroke="var(--line-2)" /><text x="39" y="60" fill="var(--fg-muted)">{pt ? 'dados' : 'data'}</text></g>
          <g><rect x="122" y="40" width="70" height="32" fill="var(--accent)" stroke="var(--accent)" /><text x="157" y="60" fill="var(--bg)">{pt ? 'treino' : 'train'}</text></g>
          <g><rect x="244" y="40" width="70" height="32" fill="var(--bg2)" stroke="var(--line-2)" /><text x="279" y="60" fill="var(--fg-muted)">{pt ? 'registro' : 'registry'}</text></g>
          <g><rect x="366" y="40" width="78" height="32" fill="var(--bg2)" stroke="var(--line-2)" /><text x="405" y="60" fill="var(--fg-muted)">deploy</text></g>
          <g>
            <rect x="244" y="142" width="70" height="32" fill="var(--bg2)" stroke="var(--accent)" />
            <circle cx="256" cy="158" r="3" fill="var(--accent)"
              style={{ animation: 'nodepulse 1.8s ease-in-out infinite', transformOrigin: '256px 158px' }} />
            <text x="285" y="162" fill="var(--fg)">monitor</text>
          </g>
          <g><rect x="100" y="142" width="92" height="32" fill="var(--bg2)" stroke="var(--line-2)" /><text x="146" y="162" fill="var(--fg-muted)">api serving</text></g>
        </g>
        <text x="120" y="112" fontFamily="IBM Plex Mono" fontSize="10" fill="var(--accent)" textAnchor="middle">retrain ↺</text>
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

const STATUS_LABELS_PT = ['em produção', 'open source', 'concluído', 'concluído', 'open source'];
const STATUS_LABELS_EN = ['in production', 'open source', 'shipped', 'shipped', 'open source'];
const STATUS_COLORS    = ['var(--accent)', 'var(--fg-muted)', 'var(--fg-soft)', 'var(--fg-soft)', 'var(--fg-muted)'];

// ─── App ──────────────────────────────────────────────────────────────────────

const App: React.FC = () => {
  const [lang,           setLang]           = useState<Language>('pt');
  const [darkMode,       setDarkMode]       = useState(true);
  const [activeSection,  setActiveSection]  = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formStatus,     setFormStatus]     = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [modal,          setModal]          = useState<ModalState | null>(null);
  const [showTopBtn,     setShowTopBtn]     = useState(false);

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
  const CV_URL = 'https://drive.google.com/file/d/1-oMiFFC3QAbU6JhIeo6svznmm1pWMtzW/view';

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
      fontFamily: "'Newsreader', Georgia, serif",
      WebkitFontSmoothing: 'antialiased',
    }}>

      {/* Progress bar */}
      <div ref={progressRef} id="progress-bar" />

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 70,
        background: darkMode
          ? 'rgba(13,12,11,0.88)'
          : 'rgba(243,239,230,0.88)',
        backdropFilter: 'blur(8px)',
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
          <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
            {NAV_SECTIONS.map((s, i) => (
              <a key={s} href={`#${s}`}
                onClick={e => { e.preventDefault(); scrollTo(s); }}
                className="navlink"
                style={mono(12, {
                  letterSpacing: '.02em',
                  color: activeSection === s ? 'var(--accent)' : undefined,
                })}>
                §0{i + 1}
              </a>
            ))}
          </nav>

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
            <a className="btnk invbtn" href={CV_URL} target="_blank" rel="noreferrer"
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
              <div style={{ padding: '12px clamp(20px,4vw,40px)', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {(['about', 'capabilities', 'projects', 'experience', 'opensource', 'research', 'education', 'contact'] as const).map(s => (
                  <button key={s} onClick={() => scrollTo(s)} className="btnk"
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                      color: activeSection === s ? 'var(--accent)' : 'var(--fg-muted)',
                      ...mono(13), padding: '6px 0',
                    }}>
                    {content.nav[s as keyof typeof content.nav]}
                  </button>
                ))}
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
              style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 'clamp(12px,2.5vh,24px)' }}>
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
              <div><span>ROLE / </span><span style={{ color: 'var(--fg-muted)' }}>BACKEND · MLOPS</span></div>
              <div><span>LOC&nbsp;&nbsp;/ </span><span style={{ color: 'var(--fg-muted)' }}>{content.hero.location}</span></div>
              <div><span>STACK/ </span><span style={{ color: 'var(--fg-muted)' }}>PY · JAVA · AWS</span></div>
              <div><span>STAT&nbsp;/ </span><span style={{ color: 'var(--accent)' }}>{pt ? 'DISPONÍVEL' : 'AVAILABLE'}</span></div>
            </motion.div>

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
          <HeroPipelineDAG lang={lang} vertical />
        </section>

        {/* ── DAG mobile-only (acima das métricas) ───────────── */}
        <div className="mobile-dag" style={{
          padding: 'clamp(24px,5vw,40px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <HeroPipelineDAG lang={lang} />
        </div>

        {/* ── METRICS ─────────────────────────────────────────── */}
        <section className="metrics-strip" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))',
          borderBottom: '1px solid var(--line)',
        }}>
          <MetricItem value={184} suffix="" label={pt ? 'testes · synapsys' : 'tests · synapsys'} />
          <MetricItem value={90}  suffix="%" label={pt ? 'cobertura' : 'coverage'} />
          <MetricItem value={2}   suffix=""  label={pt ? 'mestrados' : "master's"} />
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
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(252px,1fr))', alignItems: 'stretch' }}>
            {content.focus.pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="mod" style={{
                  border: '1px solid var(--line)', margin: '-0.5px',
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
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))' }}>
            {projects.map((proj, i) => {
              const statusLabel = (pt ? STATUS_LABELS_PT : STATUS_LABELS_EN)[i] ?? 'concluído';
              const statusColor = STATUS_COLORS[i] ?? 'var(--fg-soft)';
              return (
                <motion.article key={i} className="mod"
                  initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                  style={{
                    border: '1px solid var(--line)', margin: '-0.5px',
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
                    <span>REC.0{i + 1}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: statusColor }}>
                      <span style={{ width: 6, height: 6, borderRadius: 999, background: statusColor }} />
                      {statusLabel}
                    </span>
                  </div>
                  <h3 style={serif(24, 500, { margin: '0 0 5px', letterSpacing: '-.015em', lineHeight: 1.05 })}>
                    {proj.title}
                  </h3>
                  <div style={mono(11, { color: 'var(--fg-soft)', marginBottom: 18 })}>
                    {proj.category} · {proj.year}
                  </div>
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
                      <span key={tag} className="tagk"
                        style={mono(10.5, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 7px' })}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {proj.link && (
                    <a className="reglink" href={proj.link} target="_blank" rel="noreferrer"
                      style={mono(12, { marginTop: 16, alignSelf: 'flex-start', display: 'inline-block' })}>
                      {pt ? 'abrir repositório' : 'open repository'} <ArrowUpRight size={13} style={{ display: 'inline', verticalAlign: 'middle' }} />
                    </a>
                  )}
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

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', alignItems: 'stretch' }}>
            {research.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="mod" style={{
                  border: '1px solid var(--line)', margin: '-0.5px',
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(262px,1fr))', marginBottom: 30, alignItems: 'stretch' }}>
            {education.map((edu, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <div className="mod" style={{
                  border: '1px solid var(--line)', margin: '-0.5px',
                  background: 'var(--panel)', padding: 20,
                  display: 'flex', flexDirection: 'column', flex: 1,
                }}>
                  <span className="modbar" />
                  <div style={mono(11, { color: 'var(--accent)', marginBottom: 6 })}>
                    {edu.period} · {edu.institution}
                  </div>
                  <h3 style={serif(18, 500, { margin: '0 0 6px', lineHeight: 1.18 })}>{edu.title}</h3>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(252px,1fr))' }}>
            {certs.map((cert, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                  padding: '13px 14px', border: '1px solid var(--line)', margin: '-0.5px',
                  background: 'var(--panel)',
                }}>
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', alignItems: 'stretch' }}>
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
                  border: '1px solid var(--line)', margin: '-0.5px',
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
