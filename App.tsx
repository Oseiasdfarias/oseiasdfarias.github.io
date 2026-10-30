import React, { useState, useEffect, useRef, CSSProperties } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sun, Moon, Menu, ArrowUpRight, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Download, ChevronDown } from 'lucide-react';
import {
  translations, getProjects, getExperience,
  getEducation, getCertifications, getResearch, getPublications, getOpenSource,
} from './content';
import { Language } from './types';
import { Aeropendulo3D } from './components/Aeropendulo3D';
import { ProjectDiagram } from './components/ProjectDiagram';
import { ResearchDiagram } from './components/ResearchDiagram';
import { EduLogo, CertIcon } from './components/EduCertIcons';
import { HeroInference } from './components/HeroInference';
import { GithubActivity } from './components/GithubActivity';
import { AuroraBackground } from './components/AuroraBackground';

// ─── Theme tokens: Graphite & Copper (night-mountain) ────────────────────────
// Dark: near-black graphite with a fixed mountain wallpaper and a copper accent
// Light: misty stone with pale mountains and a burnt-copper accent

const DARK: CSSProperties = {
  '--bg':           '#050505',
  '--bg2':          '#101011',
  '--panel':        'rgba(16,16,17,.55)',
  '--line':         'rgba(255,255,255,.12)',
  '--line-2':       'rgba(255,255,255,.22)',
  '--grid':         'rgba(255,255,255,.025)',
  '--fg':           '#f5f5f3',
  '--fg-muted':     '#b8b8b6',
  '--fg-soft':      '#969694',
  '--accent':       '#d4885a',
  '--accent-2':     '#e3a47c',
  '--glow':         'rgba(212,136,90,.22)',
  '--c-teal':       '#2dd4bf',
  '--c-sky':        '#38bdf8',
  '--c-red':        '#f87171',
  '--c-amber':      '#f59e0b',
  '--c-violet':     '#a78bfa',
  '--hud-bg':       'rgba(20,18,15,.75)',
  '--stage-bg':     'rgba(0,0,0,.35)',
  '--mtn-opacity':  '1',
  '--hero-panel':   'rgba(20,20,22,.42)',
  '--inset':        'rgba(255,255,255,.035)',
  '--series':       '#c97d50',
  '--node':         'rgba(10,10,11,.55)',
  '--menu':         'rgba(20,20,22,.82)',
} as CSSProperties;

const LIGHT: CSSProperties = {
  '--bg':           '#f5f5f4',
  '--bg2':          '#e9e8e6',
  '--panel':        'rgba(255,255,255,.42)',
  '--line':         'rgba(0,0,0,.13)',
  '--line-2':       'rgba(0,0,0,.30)',
  '--grid':         'rgba(0,0,0,.04)',
  '--fg':           '#0c0a09',
  '--fg-muted':     '#3a3633',
  '--fg-soft':      '#57514c',
  '--accent':       '#9a4a24',
  '--accent-2':     '#82391a',
  '--glow':         'rgba(154,74,36,.16)',
  '--c-teal':       '#0f766e',
  '--c-sky':        '#0369a1',
  '--c-red':        '#b91c1c',
  '--c-amber':      '#b45309',
  '--c-violet':     '#6d28d9',
  '--hud-bg':       'rgba(255,255,255,.88)',
  '--stage-bg':     'rgba(0,0,0,.04)',
  '--mtn-opacity':  '.78',
  '--hero-panel':   'rgba(255,255,255,.38)',
  '--inset':        'rgba(0,0,0,.035)',
  '--series':       '#9a4a24',
  '--node':         'rgba(255,255,255,.5)',
  '--menu':         'rgba(250,250,249,.82)',
} as CSSProperties;

// Rótulo em caixa alta com tracking largo (estilo "CLAUDE CODE TIP")
const caps = (size = 10.5, extra?: CSSProperties): CSSProperties => ({
  fontFamily: "'JetBrains Mono', 'IBM Plex Mono', monospace",
  fontSize: size, fontWeight: 400,
  textTransform: 'uppercase', letterSpacing: '.22em',
  color: 'var(--fg-soft)',
  ...extra,
});

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
      <div>
        <div style={caps(10, { marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14 })}>
          <span style={{ color: 'var(--accent)' }}>{num.replace('§', '')}</span>
          {subtitle && (
            <>
              <span aria-hidden="true" style={{ width: 'clamp(24px,6vw,64px)', height: 1, background: 'var(--line-2)' }} />
              <span>{subtitle.replace(/[[\]]/g, '').trim()}</span>
            </>
          )}
        </div>
        <h2 className="display" style={serif('clamp(34px,4.6vw,64px)' as unknown as number, 300, {
          margin: 0, letterSpacing: '-.045em', lineHeight: 1,
        })}>
          {title}
        </h2>
      </div>
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
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(5,5,5,0.92)', backdropFilter: 'blur(10px)' }} />
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }} transition={{ duration: 0.2 }}
        style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 900, width: '100%' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: '0 4px' }}>
          <span style={caps(10, { color: 'var(--accent)' })}>{String(modal.index + 1).padStart(2, '0')} / {String(modal.total).padStart(2, '0')}</span>
          <button onClick={onClose}
            style={{ display: 'flex', alignItems: 'center', gap: 6, ...mono(11, { color: '#999', background: 'none', border: 'none', cursor: 'pointer' }) }}>
            <X size={13} /> ESC
          </button>
        </div>
        <div style={{ width: '100%', border: '1px solid rgba(255,255,255,.18)', overflow: 'hidden', background: '#050505' }}>
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
  const [lang,           setLang]           = useState<Language>('en');
  const [darkMode,       setDarkMode]       = useState(true);
  const [activeSection,  setActiveSection]  = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cvMenuOpen,     setCvMenuOpen]     = useState(false);
  const cvMenuRef = useRef<HTMLDivElement>(null);
  const [formStatus,     setFormStatus]     = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [modal,          setModal]          = useState<ModalState | null>(null);
  const [showTopBtn,     setShowTopBtn]     = useState(false);
  const [scrolled,       setScrolled]       = useState(false);
  const [copyStatus,     setCopyStatus]     = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);
  const mountainRef = useRef<HTMLDivElement>(null);

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
    { label: 'Medium',   href: 'https://medium.com/@oseiasfarias' },
  ];
  // Versões públicas (sem telefone), geradas em /mnt/vms/workspace/cv/cv_ml_mlops_engineer
  const CV_FILES = [
    { lang: 'en' as Language, label: 'English',   href: '/Oseias_Farias_CV_EN.pdf' },
    { lang: 'pt' as Language, label: 'Português', href: '/Oseias_Farias_CV_PT.pdf' },
  ];

  useEffect(() => {
    if (!cvMenuOpen) return;
    const close = (e: MouseEvent) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(e.target as Node)) setCvMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setCvMenuOpen(false); };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', close); document.removeEventListener('keydown', onKey); };
  }, [cvMenuOpen]);

  // Ordem idêntica à das seções na página
  const NAV_ITEMS: { id: string; label: string; drawerOnly?: boolean }[] = [
    { id: 'about',        label: content.nav.about },
    { id: 'capabilities', label: content.nav.focus },
    { id: 'projects',     label: content.nav.projects },
    { id: 'opensource',   label: content.nav.opensource },
    { id: 'experience',   label: content.nav.experience },
    { id: 'research',     label: content.nav.research },
    { id: 'education',    label: content.nav.education },
    { id: 'community',    label: content.nav.community, drawerOnly: true },
    { id: 'contact',      label: content.nav.contact },
  ];

  useEffect(() => {
    const saved     = localStorage.getItem('of_theme2');
    const savedLang = localStorage.getItem('of_lang') as Language | null;
    setDarkMode(saved ? saved === 'dark' : true);
    // Sem escolha salva: português para quem usa o navegador em português, inglês para o resto
    if (savedLang) setLang(savedLang);
    else setLang((navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  }, [lang]);

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
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      if (progressRef.current) {
        progressRef.current.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
      }
      // Wallpaper de montanha: forte no hero, esmaece ao rolar para não competir com o texto
      if (mountainRef.current) {
        const t = Math.min(1, window.scrollY / (window.innerHeight * 0.9));
        mountainRef.current.style.opacity = String(1 - t * 0.62);
        mountainRef.current.style.transform = `translateY(${t * 40}px)`;
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
      position: 'relative', isolation: 'isolate',
    }}>

      {/* Progress bar */}
      <div ref={progressRef} id="progress-bar" />

      {/* ── WALLPAPER: montanhas noturnas fixas no rodapé da viewport ── */}
      <div aria-hidden="true" className="mountain-bg">
        <div ref={mountainRef} className="mountain-img"
          style={{ backgroundImage: `url(/assets/bg/summit-${darkMode ? 'dark' : 'light'}.webp)` }} />
        {/* Véu escuro do lado do texto, para manter a leitura sobre a foto no modo escuro */}
        <div className="mountain-veil" style={{ background: darkMode
          ? 'linear-gradient(90deg, rgba(10,10,11,.72) 0%, rgba(10,10,11,.45) 45%, rgba(10,10,11,.12) 100%)'
          : 'none' }} />
        <div className="mountain-grain" />
      </div>

      {/* ── ÍNDICE LATERAL: seções, só em telas largas ───────── */}
      <nav aria-label={pt ? 'Índice' : 'Index'} className="side-index">
        {NAV_ITEMS.filter(it => !it.drawerOnly).map((it, i) => (
          <a key={it.id} href={`#${it.id}`}
            onClick={e => { e.preventDefault(); scrollTo(it.id); }}
            aria-current={activeSection === it.id ? 'true' : undefined}
            className={`side-index-item${activeSection === it.id ? ' is-active' : ''}`}>
            <span className="side-index-num">{String(i + 1).padStart(2, '0')}</span>
            <span className="side-index-label">{it.label}</span>
          </a>
        ))}
      </nav>

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 70, height: 58,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: scrolled ? '0 8px' : 0,
        pointerEvents: scrolled ? 'none' : 'auto',
        background: scrolled ? 'transparent' : darkMode
          ? 'rgba(5,5,5,0.72)'
          : 'rgba(244,244,243,0.78)',
        backdropFilter: scrolled ? 'none' : 'blur(12px)',
        borderBottom: scrolled ? '1px solid transparent' : '1px solid var(--line)',
        transition: 'background .4s, border-color .4s, padding .5s cubic-bezier(.19,1,.22,1)',
      }}>
        <div style={{
          width: '100%', maxWidth: 1240, pointerEvents: 'auto', minWidth: 0,
          padding: scrolled ? '0 clamp(16px,2.4vw,28px)' : '0 clamp(20px,4vw,40px)',
          height: scrolled ? 48 : 58, display: 'flex', alignItems: 'center',
          justifyContent: 'space-between', gap: 18,
          borderRadius: scrolled ? 999 : 0,
          border: scrolled ? '1px solid var(--line-2)' : '1px solid transparent',
          background: scrolled ? (darkMode ? 'rgba(8,8,8,.88)' : 'rgba(250,250,249,.88)') : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          transition: 'padding .5s cubic-bezier(.19,1,.22,1), height .5s cubic-bezier(.19,1,.22,1), border-radius .5s, background .4s, border-color .4s',
        }}>
          {/* Logo */}
          <a href="#top"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 11, color: 'var(--fg)' }}>
            <span style={mono(13, { fontWeight: 600, letterSpacing: '.04em', color: 'var(--accent)' })}>OF</span>
            <span className="logo-name" style={serif(17, 500, { letterSpacing: '-.01em' })}>Oséias Farias</span>
          </a>

          {/* Navegação: itens na ordem em que as seções aparecem na página */}
          <nav className="nav-links nav-pill" aria-label={pt ? 'Seções' : 'Sections'}>
            {NAV_ITEMS.filter(it => !it.drawerOnly).map(it => {
              const active = activeSection === it.id;
              return (
                <a key={it.id} href={`#${it.id}`} aria-current={active ? 'true' : undefined}
                  onClick={e => { e.preventDefault(); scrollTo(it.id); }}
                  className={`nav-item${active ? ' is-active' : ''}`}>
                  {active && (
                    <motion.span layoutId="nav-active" className="nav-active"
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
                  )}
                  <span style={{ position: 'relative' }}>{it.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
            <button onClick={toggleLang} className="btn btn-sm btn-icon" style={{ fontSize: 11.5, fontWeight: 600 }}>
              {pt ? 'EN' : 'PT'}
            </button>
            <button onClick={toggleTheme} aria-label="theme" className="btn btn-sm btn-icon">
              {darkMode ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <div ref={cvMenuRef} style={{ position: 'relative' }}>
              <button className="btn btn-sm" aria-haspopup="menu" aria-expanded={cvMenuOpen}
                onClick={() => setCvMenuOpen(o => !o)}>
                <span className="li-full">{content.hero.ctaSecondary}</span><span className="li-short">CV</span> <ChevronDown size={14} />
              </button>
              {cvMenuOpen && (
                <div role="menu" style={{
                  position: 'absolute', right: 0, top: 'calc(100% + 6px)', minWidth: 190, zIndex: 60,
                  background: 'var(--menu)', border: '1px solid var(--line-2)', borderRadius: 8, padding: 6,
                  WebkitBackdropFilter: 'blur(12px)', backdropFilter: 'blur(12px)',
                  boxShadow: '0 12px 28px -10px rgba(0,0,0,.45)',
                }}>
                  {[...CV_FILES].sort((a, b) => (a.lang === lang ? -1 : b.lang === lang ? 1 : 0)).map(f => (
                    <a key={f.lang} role="menuitem" href={f.href} download
                      onClick={() => setCvMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
                        padding: '9px 10px', borderRadius: 6, textDecoration: 'none',
                        color: 'var(--fg)', fontSize: 13,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'var(--inset)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                      <span>{f.label} <span style={{ color: 'var(--fg-soft)', fontSize: 11.5 }}>PDF</span></span>
                      <Download size={14} />
                    </a>
                  ))}
                </div>
              )}
            </div>
            <a className="btn btn-sm" href="https://www.linkedin.com/in/oseiasfarias/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <span className="li-full">LinkedIn</span><span className="li-short">in</span> <ArrowUpRight size={14} className="li-full" />
            </a>
            {/* Hamburger */}
            <button className="mobile-menu-btn btn btn-sm btn-icon"
              onClick={() => setMobileMenuOpen(o => !o)}
              style={{ display: 'none' }}>
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
              <div style={{ padding: '8px clamp(20px,4vw,40px) 16px', display: 'grid', gap: 2 }}>
                {NAV_ITEMS.map((it, i) => {
                  const active = activeSection === it.id;
                  return (
                    <a key={it.id} href={`#${it.id}`}
                      onClick={e => { e.preventDefault(); scrollTo(it.id); }}
                      className={`drawer-item${active ? ' is-active' : ''}`}>
                      <span style={mono(10, { color: 'var(--accent)', minWidth: 22 })}>{String(i).padStart(2, '0')}</span>
                      <span>{it.label}</span>
                    </a>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* ── MAIN CONTAINER ──────────────────────────────────── */}
      <div id="top" style={{
        position: 'relative', zIndex: 1,
        maxWidth: 1240, margin: '0 auto',
        padding: '0 clamp(20px,4vw,40px)',
        backgroundImage: 'linear-gradient(90deg,var(--grid) 1px,transparent 1px), linear-gradient(90deg,transparent calc(50% - 1px),var(--grid) 50%,transparent calc(50% + 1px))',
        backgroundSize: '25% 100%, 100% 100%',
      }}>

        {/* ── HERO ────────────────────────────────────────────── */}
        <section style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          minHeight: 'calc(100svh - 60px)',
          padding: 'clamp(14px,4vh,56px) 0 clamp(12px,3vh,40px)',
          borderBottom: '1px solid var(--line)',
        }}>
          {darkMode && (
            <div aria-hidden="true" className="hero-atmosphere">
              <AuroraBackground />
              <div className="hero-vignette" />
            </div>
          )}
          <div aria-hidden="true" className="hero-coordinate">
            <span className="status-dot" />
            <span>{content.hero.location}</span>
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.07, ease: [0.2, 0.7, 0.2, 1] }}
            className="hero-title"
            style={serif('clamp(34px,min(5.4vw,8vh),76px)' as unknown as number, 600, {
              lineHeight: 1.0, letterSpacing: '-.035em', margin: '0 0 clamp(22px,4.5vh,48px)',
            })}>
            Machine Learning &amp; AI Engineer<br />
            <span style={{ color: 'var(--fg-soft)', whiteSpace: 'nowrap' }}>
              MLOps · Reliable AI
            </span>
          </motion.h1>

        <div className="hero-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.04fr)',
          gap: 'clamp(20px,3vw,48px)',
          alignItems: 'center',
        }}>

          {/* Left — text */}
          <div>
            {/* Perfil: foto grande + nome, status e ficha técnica */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
              className="hero-profile"
              style={{ display: 'flex', alignItems: 'center', gap: 'clamp(18px,2.2vw,28px)', marginBottom: 'clamp(20px,3.5vh,36px)' }}>
              <div className="hero-photo" style={{
                position: 'relative', flexShrink: 0,
                width: 'clamp(116px,min(13vw,19vh),172px)', aspectRatio: '1',
                padding: 5, borderRadius: 22,
                background: 'var(--panel)', border: '1px solid var(--line-2)',
                backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
              }}>
                <div style={{ width: '100%', height: '100%', borderRadius: 17, overflow: 'hidden' }}>
                  <img
                    src="https://github.com/oseiasdfarias.png?size=460"
                    alt="Oséias Farias"
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                    }}
                  />
                </div>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={caps(10, { letterSpacing: '.22em', color: 'var(--accent)', marginBottom: 8 })}>
                  {content.hero.kicker}
                </div>
                <div style={serif('clamp(22px,2.2vw,28px)' as unknown as number, 600, { letterSpacing: '-.025em', lineHeight: 1.1, marginBottom: 12 })}>
                  Oséias Farias
                </div>
                <div style={{ display: 'grid', gap: 3, ...mono(11.5, { color: 'var(--fg-soft)' }) }}>
                  <div><span>ROLE&nbsp;/ </span><span style={{ color: 'var(--fg-muted)' }}>ML &amp; AI ENGINEER · MLOPS</span></div>
                  <div><span>STACK/ </span><span style={{ color: 'var(--fg-muted)' }}>PYTHON · AWS · PYTORCH · FASTAPI</span></div>
                  <div><span>LOC&nbsp;&nbsp;/ </span><span style={{ color: 'var(--fg-muted)' }}>{content.hero.location}</span></div>
                </div>
              </div>
            </motion.div>


            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                fontSize: 'clamp(14px,min(1.7vw,1.9vh),18px)', lineHeight: 1.55,
                color: 'var(--fg-muted)', maxWidth: 500, margin: '0 0 clamp(12px,2.5vh,26px)',
              }}>
              {content.hero.lede}
            </motion.p>

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
              <span className="building-url" style={{ color: 'var(--fg-soft)' }}>— docs.otensor.com.br</span>
            </motion.a>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.27, ease: [0.2, 0.7, 0.2, 1] }}
              style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <a href="#projects"
                onClick={e => { e.preventDefault(); scrollTo('projects'); }}
                className="btn btn-primary" style={{ height: 42, padding: '0 20px', fontSize: 14 }}>
                {content.hero.ctaPrimary} <ArrowRight size={15} />
              </a>
              <a href="#contact"
                onClick={e => { e.preventDefault(); scrollTo('contact'); }}
                className="btn" style={{ height: 42, padding: '0 20px', fontSize: 14 }}>
                {content.nav.contact}
              </a>
            </motion.div>
          </div>

          {/* Right — animação de LLM serving */}
          <HeroInference lang={lang} />
        </div>
        </section>

        {/* ── DAG mobile-only (acima das métricas) ───────────── */}
        <div className="mobile-dag" style={{
          padding: 'clamp(24px,5vw,40px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <HeroInference lang={lang} />
        </div>

        {/* ── METRICS ─────────────────────────────────────────── */}
        <section className="github-strip" style={{
          padding: 'clamp(28px,4vw,44px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <GithubActivity lang={lang} />
        </section>

        {/* ── ABOUT §00 ──────────────────────────────────────── */}
        <section id="about" data-section="about" style={{
          scrollMarginTop: 70,
          padding: 'clamp(40px,6vw,72px) 0',
          borderBottom: '1px solid var(--line)',
        }}>
          <SectionHeader
            num="§00"
            title={content.about.title}
            subtitle={`[ 04 ${pt ? 'PILARES' : 'PILLARS'} ]`}
          />
          <FadeIn>
            <p style={serif('clamp(20px,2.5vw,28px)' as unknown as number, 400, {
              lineHeight: 1.4, letterSpacing: '-.015em', margin: '0 0 28px', maxWidth: 900,
              color: 'var(--fg)', borderLeft: '2px solid var(--accent)', paddingLeft: 22,
            })}>
              {content.about.lede}
            </p>
          </FadeIn>
          <div className="about-paras-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: 16,
          }}>
            {content.about.paras.map((para, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="mod" style={{
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  background: 'var(--panel)',
                  padding: '24px 20px',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}>
                  <span className="modbar" />
                  <div style={{
                    width: 38, height: 38, borderRadius: 999, marginBottom: 16,
                    border: '1px solid var(--accent)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    ...mono(12, { color: 'var(--accent-2)' }),
                  }}>
                    0{i + 1}
                  </div>
                  <p style={{
                    fontSize: 13.5,
                    lineHeight: 1.65,
                    color: 'var(--fg-muted)',
                    margin: 0,
                  }}
                    dangerouslySetInnerHTML={{ __html: para }} />
                </div>
              </FadeIn>
            ))}
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
                      <span key={tag} className="chip">
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

          <div className="projects-grid">
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
                          background: 'var(--glow)',
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
                    background: 'var(--inset)',
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
                      gap: 8, padding: '10px 12px', background: 'var(--inset)', borderRadius: 8,
                      border: '1px solid var(--line)', marginBottom: 16,
                    }}>
                      {proj.metrics.map(m => (
                        <div key={m.label}>
                          <div style={caps(8.5, { letterSpacing: '.16em' })}>{m.label}</div>
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
                        style={{ fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        {proj.link.includes('github.com')
                          ? (pt ? 'abrir repositório' : 'open repository')
                          : (pt ? 'abrir documentação' : 'open documentation')}
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                    {proj.github && proj.github !== proj.link && (
                      <a className="reglink" href={proj.github} target="_blank" rel="noreferrer"
                        style={{ fontSize: 13, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
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
                className="btn">
                {content.projects.viewAll} <ArrowRight size={14} />
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
            <div className="opensource-grid glass" style={{
              display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)',
              overflow: 'hidden',
            }}>
              {/* Left — info + stats */}
              <div style={{ padding: 'clamp(22px,3vw,32px)', borderRight: '1px solid var(--line)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 11, flexWrap: 'wrap', marginBottom: 16 }}>
                  <h3 style={serif(30, 500, { margin: 0, letterSpacing: '-.02em' })}>{openSource.name}</h3>
                  <span className="badge">{openSource.version}</span>
                  <span className="badge badge-muted">{openSource.license}</span>
                </div>
                <p style={{ margin: '0 0 22px', fontSize: 15, lineHeight: 1.66, color: 'var(--fg-muted)' }}>
                  {openSource.description}
                </p>

                {/* Stats */}
                <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--line)', marginBottom: 22 }}>
                  {openSource.stats.map(s => (
                    <div key={s.label} style={{ flex: 1, padding: '16px 12px 4px', borderRight: '1px solid var(--line)' }}>
                      <div style={serif(28, 500, { lineHeight: 0.9 })}>{s.value}</div>
                      <div style={caps(9, { marginTop: 10, letterSpacing: '.18em' })}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <a className="btn" href={openSource.github} target="_blank" rel="noreferrer">
                    GitHub <ArrowUpRight size={14} />
                  </a>
                  <a className="btn btn-primary" href={openSource.pypi} target="_blank" rel="noreferrer">
                    PyPI <ArrowUpRight size={14} />
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
                        aspectRatio: '16/9', border: '1px solid var(--line)', borderRadius: 8,
                        overflow: 'hidden', background: 'var(--inset)', padding: 0, cursor: 'pointer',
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
                          aspectRatio: '16/10', border: '1px solid var(--line)', borderRadius: 8,
                          overflow: 'hidden', background: 'var(--inset)', padding: 0, cursor: 'pointer',
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
          <SectionHeader num="§04" title={content.experience.title}
            subtitle={pt ? 'TRAJETÓRIA' : 'TRACK RECORD'} />

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
                    <span className="badge">
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
                      <span key={tag} className="chip">
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
                      background: 'var(--inset)',
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
                      <span key={tag} className="chip">
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
            <div style={caps(10.5, { margin: '32px 0 6px' })}>
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
          <SectionHeader num="§06" title={content.education.title}
            subtitle={pt ? 'FORMAÇÃO' : 'DEGREES'} />

          {/* Degree cards */}
          <div className="edu-grid">
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
            <div style={caps(10.5, { marginBottom: 12 })}>
              {content.education.certifications}
            </div>
          </FadeIn>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(252px,1fr))', gap: 8 }}>
            {certs.map((cert, i) => (
              <FadeIn key={i} delay={i * 0.03}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
                  padding: '13px 14px', border: '1px solid var(--line)', borderRadius: 10,
                  background: 'var(--panel)', backdropFilter: 'blur(6px)',
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
            subtitle={pt ? '[ 04 CANAIS ]' : '[ 04 CHANNELS ]'}
          />
          <div className="community-grid">
            {([
              {
                platform: 'YouTube',
                handle:   '@otensor',
                href:     'https://www.youtube.com/@otensor',
                tag:      'VIDEO',
                desc: pt
                  ? 'Vídeos sobre machine learning, controle inteligente e engenharia de software, do conceito ao código. 1,7 mil inscritos.'
                  : 'Videos on machine learning, intelligent control and software engineering, from concept to code. 1.7k subscribers.',
                cta: pt ? 'Assistir' : 'Watch',
              },
              {
                platform: 'Medium',
                handle:   '@oseiasfarias',
                href:     'https://medium.com/@oseiasfarias',
                tag:      'BLOG',
                desc: pt
                  ? 'Artigos técnicos sobre MLOps, APIs, arquitetura de sistemas e experiências de pesquisa acadêmica.'
                  : 'Technical articles on MLOps, APIs, system architecture and academic research experiences.',
                cta: pt ? 'Ler artigos' : 'Read articles',
              },
              {
                platform: 'Udemy',
                handle:   pt ? '2 cursos' : '2 courses',
                href:     'https://www.udemy.com/course/python-iniciante-passo-a-passo/',
                tag:      'COURSES',
                desc: pt
                  ? 'Cursos de Python para iniciantes, com mais de 2.100 alunos e notas 4,4 e 4,7.'
                  : 'Python courses for beginners, with 2,100+ students and ratings of 4.4 and 4.7.',
                cta: pt ? 'Ver curso' : 'See course',
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
                    <span className="badge">{tag}</span>
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
                    className="btn" style={{ alignSelf: 'flex-start' }}
                  >
                    {cta} <ArrowUpRight size={14} />
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
                <div style={caps(10, { marginBottom: 18, display: 'flex', alignItems: 'center', gap: 14 })}>
                  <span style={{ color: 'var(--accent)' }}>08</span>
                  <span aria-hidden="true" style={{ width: 'clamp(24px,6vw,64px)', height: 1, background: 'var(--line-2)' }} />
                  <span>{pt ? 'CONTATO' : 'CONTACT'}</span>
                </div>
                <h2 className="display" style={serif('clamp(34px,4.6vw,64px)' as unknown as number, 300, {
                  margin: '0 0 24px', letterSpacing: '-.045em', lineHeight: 1,
                })}>
                  {content.contact.title}
                </h2>
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
                    className="btn"
                    style={{ gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5 }}
                  >
                    <span>oseias.dfarias@gmail.com</span>
                    <span style={{ color: 'var(--accent)', fontSize: 11 }}>
                      {copyStatus ? (pt ? '✓ Copiado!' : '✓ Copied!') : (pt ? '[Copiar]' : '[Copy]')}
                    </span>
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 16px', fontSize: 14 }}>
                  {socials.map(s => (
                    <React.Fragment key={s.label}>
                      <span style={mono(11, { color: 'var(--fg-soft)', paddingTop: 2 })}>{s.label.slice(0, 2).toUpperCase()}</span>
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
              <form onSubmit={handleSubmit} className={`glass form-editorial${darkMode ? "" : " paper"}`} style={{
                display: 'flex', flexDirection: 'column', gap: 0, overflow: 'hidden',
              }}>
                <input type="text" name="name" required placeholder={content.contact.name}
                  className="field" />
                <input type="email" name="email" required placeholder={content.contact.email}
                  className="field" />
                <textarea name="message" rows={4} required placeholder={content.contact.message}
                  className="field" style={{ resize: 'vertical' }} />
                <button type="submit" disabled={formStatus === 'sending'} className="btn btn-primary"
                  style={{ margin: 14, height: 44, fontSize: 14 }}>
                  {formStatus === 'sending' ? content.contact.sending : content.contact.send} <ArrowRight size={15} />
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
            className="btn btn-icon btn-round"
            style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 50, width: 42, height: 42 }}
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
