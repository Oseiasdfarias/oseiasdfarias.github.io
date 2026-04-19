import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Youtube, BookOpen, Mail,
  ExternalLink, ArrowUpRight, Menu, X,
  FlaskConical, Briefcase, Award, Globe, Sun, Moon, Heart, FileText, Package,
} from 'lucide-react';
import {
  translations, getProjects, getExperience,
  getEducation, getCertifications, getResearch, getPublications, getOpenSource,
} from './content';
import { Language } from './types';
import NeuralNetBackground from './components/NeuralNetBackground';

// ─── Helpers ────────────────────────────────────────────────────────────────

const categoryColor: Record<string, string> = {
  backend:  'text-accent  border-accent/30  bg-accent/5',
  ai:       'text-accent2 border-accent2/30 bg-accent2/5',
  research: 'text-green   border-green/30   bg-green/5',
  embedded: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
};

const categoryLabel: Record<string, Record<Language, string>> = {
  backend:  { pt: 'Backend',   en: 'Backend'  },
  ai:       { pt: 'IA',        en: 'AI'       },
  research: { pt: 'Pesquisa',  en: 'Research' },
  embedded: { pt: 'Embarcado', en: 'Embedded' },
};

const typeColor: Record<string, string> = {
  industry:  'text-accent  border-accent/20  bg-accent/5',
  research:  'text-accent2 border-accent2/20 bg-accent2/5',
  volunteer: 'text-green   border-green/20   bg-green/5',
};

const typeLabel: Record<string, Record<Language, string>> = {
  industry:  { pt: 'Mercado',       en: 'Industry'   },
  research:  { pt: 'Pesquisa',      en: 'Research'   },
  volunteer: { pt: 'Voluntariado',  en: 'Volunteer'  },
};

const NAV_SECTIONS = ['about', 'research', 'experience', 'projects', 'opensource', 'education', 'contact'] as const;

// ─── Fade-in wrapper ─────────────────────────────────────────────────────────
const FadeIn: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

// ─── Section heading ─────────────────────────────────────────────────────────
const SectionTitle: React.FC<{ label: string; num: string }> = ({ label, num }) => (
  <div className="flex items-center gap-3 mb-12">
    <span className="font-pixel text-accent/40 text-sm select-none tracking-widest">{num}</span>
    <span className="font-pixel text-accent text-lg select-none">▸</span>
    <h2 className="text-xl font-bold font-display text-slate-900 dark:text-lightestSlate whitespace-nowrap tracking-wide">
      {label}
    </h2>
    <div className="flex-1 h-px bg-paperBorder dark:bg-navyBorder" />
  </div>
);

// ─── Media Modal ─────────────────────────────────────────────────────────────
interface ModalState { src: string; caption: string; index: number; total: number }

const MediaModal: React.FC<{
  modal: ModalState;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}> = ({ modal, onClose, onPrev, onNext }) => {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      {/* Modal content */}
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 flex flex-col items-center max-w-4xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="w-full flex items-center justify-between mb-3 px-1">
          <span className="font-mono text-xs text-slate-400 tracking-widest">
            {modal.index + 1} / {modal.total}
          </span>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 font-mono text-xs text-slate-400 hover:text-white transition-colors"
            aria-label="Fechar"
          >
            <X size={14} /> ESC
          </button>
        </div>

        {/* Image */}
        <div className="w-full border border-white/10 rounded-lg overflow-hidden bg-black">
          <img
            src={modal.src}
            alt={modal.caption}
            className="w-full h-auto max-h-[70vh] object-contain"
          />
        </div>

        {/* Caption */}
        <p className="mt-3 font-mono text-xs text-slate-400 text-center leading-relaxed max-w-lg px-2">
          {modal.caption}
        </p>

        {/* Prev / Next */}
        {modal.total > 1 && (
          <div className="flex items-center gap-6 mt-4">
            <button
              onClick={onPrev}
              className="font-pixel text-sm text-slate-400 hover:text-white transition-colors px-3 py-1 border border-white/10 hover:border-white/30"
            >
              ◀ prev
            </button>
            <button
              onClick={onNext}
              className="font-pixel text-sm text-slate-400 hover:text-white transition-colors px-3 py-1 border border-white/10 hover:border-white/30"
            >
              next ▶
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// ─── App ─────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [lang,          setLang]          = useState<Language>('pt');
  const [darkMode,      setDarkMode]      = useState(true);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [formStatus,    setFormStatus]    = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [hoveredCard,   setHoveredCard]   = useState<number | null>(null);
  const [showTopBtn,    setShowTopBtn]    = useState(false);
  const [modal,         setModal]         = useState<ModalState | null>(null);

  const openModal  = (media: { src: string; caption: string }[], index: number) =>
    setModal({ ...media[index], index, total: media.length });
  const closeModal = () => setModal(null);
  const prevMedia  = (media: { src: string; caption: string }[]) =>
    setModal((m: ModalState | null) => m ? { ...media[(m.index - 1 + m.total) % m.total], index: (m.index - 1 + m.total) % m.total, total: m.total } : null);
  const nextMedia  = (media: { src: string; caption: string }[]) =>
    setModal((m: ModalState | null) => m ? { ...media[(m.index + 1) % m.total], index: (m.index + 1) % m.total, total: m.total } : null);

  const content = translations[lang];

  // ── Init theme from localStorage ─────────────────────────────────────────
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang') as Language | null;
    const isDark = saved ? saved === 'dark' : true;
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
    if (savedLang) setLang(savedLang);
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  const toggleLang = () => {
    const next = lang === 'pt' ? 'en' : 'pt';
    setLang(next);
    localStorage.setItem('lang', next);
  };

  // ── Show "back to top" after scrolling down ──────────────────────────
  useEffect(() => {
    const onScroll = () => setShowTopBtn(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section via IntersectionObserver ──────────────────────────────
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -75% 0px' },
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // ── Form submit ──────────────────────────────────────────────────────────
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
    setIsMenuOpen(false);
  };

  const projects      = getProjects(lang);
  const experience    = getExperience(lang);
  const education     = getEducation(lang);
  const research      = getResearch(lang);
  const certs         = getCertifications(lang);
  const publications  = getPublications(lang);
  const openSource    = getOpenSource(lang);

  const socials = [
    { icon: Github,   href: "https://github.com/oseiasdfarias/",         label: "GitHub"   },
    { icon: Linkedin, href: "https://www.linkedin.com/in/oseiasfarias/", label: "LinkedIn" },
    { icon: Youtube,  href: "https://youtube.com/@oseiasdfarias",        label: "YouTube"  },
    { icon: BookOpen, href: "https://oseiasfarias.medium.com",           label: "Medium"   },
    { icon: Mail,     href: "mailto:oseias@example.com",                 label: "Email"    },
  ];

  // ── Shared class shorthands ──────────────────────────────────────────────
  const bg       = 'bg-paper       dark:bg-navy';
  const bgCard   = 'bg-paperCard   dark:bg-navyCard';
  const bgHover  = 'hover:bg-paperHover dark:hover:bg-navyHover';
  const border   = 'border-paperBorder dark:border-navyBorder';
  const textPri  = 'text-slate-900  dark:text-lightestSlate';
  const textSec  = 'text-slate-800  dark:text-lightSlate';
  const textMut  = 'text-slate-500  dark:text-slate';

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={`relative min-h-screen scanlines crt-vignette ${bg} ${textSec} selection:bg-accent/20 selection:text-accent transition-colors duration-300`}>

      {/* ── Neural network animated background ──────────────────────────── */}
      <NeuralNetBackground darkMode={darkMode} />

      {/* ── Mobile top bar ───────────────────────────────────────────────── */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 backdrop-blur border-b ${border} bg-paper/80 dark:bg-navy/80`}>
        <span className={`font-display font-bold ${textPri} text-lg`}>Oséias Farias</span>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`p-1.5 rounded ${textMut} hover:text-accent transition-colors`}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={toggleLang}
            className={`font-mono text-[11px] font-bold px-2 py-1 rounded border ${border} ${textMut} hover:text-accent hover:border-accent/40 transition-colors`}
          >
            {lang.toUpperCase()}
          </button>
          <button onClick={() => setIsMenuOpen(o => !o)} className={textSec}>
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* ── Mobile overlay menu ──────────────────────────────────────────── */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`lg:hidden fixed top-14 left-0 right-0 z-40 ${bgCard} border-b ${border} px-6 py-6 flex flex-col gap-4`}
          >
            {NAV_SECTIONS.map(s => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className={`text-left font-pixel text-base tracking-widest ${textMut} hover:text-accent transition-colors`}
              >
                {content.nav[s as keyof typeof content.nav]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main layout ──────────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto min-h-screen max-w-screen-xl px-6 md:px-12 lg:px-24 lg:flex">

        {/* ════════════════════ SIDEBAR ════════════════════ */}
        <header className="hidden lg:flex lg:sticky lg:top-0 lg:h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-10 xl:py-24 lg:pr-12">
          <div className="flex flex-col justify-between h-full">

          {/* Top block */}
          <div>
            {/* Profile photo */}
            <div className="mb-6 mt-2">
              <div className="photo-frame inline-block w-20 h-20 xl:w-28 xl:h-28">
                <div className={`w-full h-full overflow-hidden border ${border}`}
                  style={{ clipPath: 'polygon(0 6px,6px 6px,6px 0,calc(100% - 6px) 0,calc(100% - 6px) 6px,100% 6px,100% calc(100% - 6px),calc(100% - 6px) calc(100% - 6px),calc(100% - 6px) 100%,6px 100%,6px calc(100% - 6px),0 calc(100% - 6px))' }}>
                  <img
                    src="https://github.com/oseiasdfarias.png"
                    alt="Oséias Farias"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Name + title */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-mono text-xs text-accent mb-1 tracking-wider">{content.hero.greeting}</p>
              <h1 className={`text-3xl xl:text-4xl font-bold font-display ${textPri} leading-tight mb-1 pixel-cursor`}>
                Oséias Farias.
              </h1>
              <h2 className={`text-sm xl:text-base font-semibold font-display ${textSec} mb-2 leading-snug`}>
                {content.hero.title}
              </h2>

              {/* Affiliation badge */}
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold tracking-widest text-accent border border-accent/30 bg-accent/5 px-2.5 py-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                  </span>
                  {content.hero.availability}
                </span>
              </div>

            </motion.div>

            {/* Nav links */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 flex flex-col gap-0"
            >
              {NAV_SECTIONS.map(s => {
                const isActive = activeSection === s;
                return (
                  <button
                    key={s}
                    onClick={() => scrollTo(s)}
                    className="group flex items-center gap-3 py-1 text-left transition-all duration-200"
                  >
                    {/* Pixel indicator */}
                    <div className="w-5 flex-shrink-0 flex flex-col items-center gap-[3px]">
                      {isActive ? (
                        <>
                          <span className="block w-2 h-2 bg-accent pixel-dot" />
                          <span className="block w-2 h-2 bg-accent opacity-50" />
                          <span className="block w-2 h-2 bg-accent opacity-20" />
                        </>
                      ) : (
                        <span className={`block h-px w-4 ${darkMode ? 'bg-slate' : 'bg-slate-400'} group-hover:w-5 transition-all`} />
                      )}
                    </div>
                    <span
                      className={`font-pixel text-base tracking-wider transition-colors duration-200 ${
                        isActive ? 'text-accent' : `${textMut} group-hover:text-accent/70`
                      }`}
                    >
                      {content.nav[s as keyof typeof content.nav]}
                    </span>
                  </button>
                );
              })}
            </motion.nav>
          </div>

          {/* Bottom block */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col gap-2"
          >
            {/* CV button */}
            <a
              href="https://drive.google.com/file/d/1-oMiFFC3QAbU6JhIeo6svznmm1pWMtzW/view"
              target="_blank"
              rel="noreferrer"
              className="pixel-card inline-flex items-center gap-2 text-xs font-mono font-bold text-accent border border-accent/30 px-3 py-1.5 w-fit hover:bg-accent/10 transition-colors group"
            >
              {content.hero.btnOutline}
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className={`group relative ${textMut} hover:text-accent transition-all duration-200`}
                >
                  <s.icon size={18} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              ))}
            </div>

            {/* Lang + Theme toggles */}
            <div className="flex items-center gap-4">
              <button
                onClick={toggleLang}
                className={`flex items-center gap-2 text-xs font-mono font-bold ${textMut} hover:text-accent transition-colors group`}
              >
                <Globe size={13} className="group-hover:rotate-12 transition-transform" />
                {lang === 'pt' ? 'EN' : 'PT'}
              </button>

              <button
                onClick={toggleTheme}
                className={`flex items-center gap-2 text-xs font-mono font-bold ${textMut} hover:text-accent transition-colors`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                {darkMode ? 'Light' : 'Dark'}
              </button>
            </div>
          </motion.div>
          </div>{/* end z-10 wrapper */}
        </header>

        {/* ════════════════════ MAIN CONTENT ════════════════════ */}
        <main className="lg:w-[58%] pt-20 lg:pt-24 pb-24">

          {/* ── Mobile profile photo (acima do Sobre) ─────────── */}
          <div className="lg:hidden flex items-center gap-4 mb-8">
            <div className="photo-frame flex-shrink-0 w-14 h-14">
              <div className={`w-full h-full overflow-hidden border ${border}`}
                style={{ clipPath: 'polygon(0 5px,5px 5px,5px 0,calc(100% - 5px) 0,calc(100% - 5px) 5px,100% 5px,100% calc(100% - 5px),calc(100% - 5px) calc(100% - 5px),calc(100% - 5px) 100%,5px 100%,5px calc(100% - 5px),0 calc(100% - 5px))' }}>
                <img
                  src="https://github.com/oseiasdfarias.png"
                  alt="Oséias Farias"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
            <div>
              <p className="font-mono text-xs text-accent tracking-wider mb-0.5">{content.hero.greeting}</p>
              <h1 className={`text-xl font-bold font-display ${textPri} leading-tight`}>Oséias Farias.</h1>
              <p className={`text-xs font-display ${textMut} leading-snug`}>{content.hero.title}</p>
            </div>
          </div>

          {/* ── ABOUT ──────────────────────────────────────────── */}
          <section id="about" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.about.title} num="01" />
            <div className="space-y-5">
              {content.about.description.map((para, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <p
                    className={`text-[15px] leading-relaxed ${textSec}`}
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                </FadeIn>
              ))}

              {/* Dual identity pills */}
              <FadeIn delay={0.3}>
                <div className="flex gap-3 pt-2 flex-wrap">
                  <span className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 rounded-full border border-accent/30 text-accent bg-accent/5">
                    <Briefcase size={12} />
                    {content.about.industryLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-mono font-bold px-3 py-1.5 rounded-full border border-accent2/30 text-accent2 bg-accent2/5">
                    <FlaskConical size={12} />
                    {content.about.academiaLabel}
                  </span>
                </div>
              </FadeIn>

              {/* Skills */}
              <FadeIn delay={0.35}>
                <div className={`mt-4 pt-4 border-t ${border}`}>
                  <p className={`font-mono text-xs ${textMut} uppercase tracking-widest mb-3`}>Stack principal</p>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Python", "Spring Boot", "FastAPI", "Quarkus", "AWS", "Docker", "PostgreSQL", "FPGA", "TensorFlow"].map(skill => (
                      <span key={skill} className={`tag-pixel font-mono text-xs ${textMut} hover:text-accent px-2 py-1 border ${border} ${bgCard} hover:border-accent/30 transition-colors cursor-default`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>

          {/* ── RESEARCH ───────────────────────────────────────── */}
          <section id="research" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.research.title} num="02" />
            <div className="flex flex-col gap-4">
              {research.map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={`pixel-card pixel-card-indigo group relative p-6 rounded-lg border ${border} ${bgCard} hover:border-accent2/40 ${bgHover} transition-all duration-300`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`font-mono text-xs ${textMut}`}>{item.period}</span>
                      {item.status === 'ongoing' && (
                        <span className="flex items-center gap-1.5 font-mono text-xs text-accent2">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent2" />
                          </span>
                          Em andamento
                        </span>
                      )}
                    </div>
                    <h3 className={`font-display font-bold ${textPri} group-hover:text-accent2 transition-colors mb-1 text-[17px]`}>
                      {item.title}
                    </h3>
                    <p className="font-mono text-xs text-accent2/70 mb-3">{item.institution}</p>
                    <p className={`text-[15px] ${textMut} leading-relaxed mb-4`}>{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="font-mono text-xs text-accent2/80 px-2 py-0.5 rounded border border-accent2/20 bg-accent2/5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Publications sub-section */}
            <div className={`mt-4 pt-8 border-t ${border}`}>
              <div className="flex items-center gap-3 mb-6">
                <FileText size={15} className="text-accent2 flex-shrink-0" />
                <h3 className={`text-base font-bold font-display ${textPri} whitespace-nowrap`}>
                  {lang === 'pt' ? 'Publicações' : 'Publications'}
                </h3>
                <div className={`flex-1 h-px bg-paperBorder dark:bg-navyBorder`} />
              </div>
              <div className="flex flex-col gap-3">
                {publications.map((pub, i) => (
                  <FadeIn key={i} delay={i * 0.08}>
                    <div className={`pixel-card pixel-card-indigo group p-5 rounded-lg border ${border} ${bgCard} hover:border-accent2/40 ${bgHover} transition-all duration-300`}>
                      <div className="flex items-start justify-between gap-3 mb-1">
                        <h4 className={`font-display font-bold text-sm ${textPri} group-hover:text-accent2 transition-colors leading-snug`}>
                          {pub.title}
                        </h4>
                        {pub.link && pub.link !== '#' && (
                          <a href={pub.link} target="_blank" rel="noreferrer"
                             className="flex-shrink-0 text-accent2 hover:text-accent2/70 transition-colors mt-0.5">
                            <ExternalLink size={13} />
                          </a>
                        )}
                      </div>
                      <p className="font-mono text-xs text-accent2/70 mb-2">
                        {pub.venue} · {pub.date}
                      </p>
                      {pub.authors && (
                        <p className={`font-mono text-xs ${textMut} mb-2`}>{pub.authors}</p>
                      )}
                      <p className={`text-[13px] ${textMut} leading-relaxed`}>{pub.description}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </section>

          {/* ── EXPERIENCE ─────────────────────────────────────── */}
          <section id="experience" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.experience.title} num="03" />
            <div className="flex flex-col gap-1">
              {experience.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className={`group relative grid sm:grid-cols-[130px_1fr] gap-3 p-5 rounded-lg border border-transparent ${bgHover} hover:border-paperBorder dark:hover:border-navyBorder transition-all duration-300`}>
                    <div className="pt-0.5">
                      <span className={`font-mono text-xs ${textMut} leading-relaxed`}>
                        {exp.period}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className={`font-display font-bold ${textPri} group-hover:text-accent transition-colors text-[15px]`}>
                          {exp.title}
                        </h3>
                        <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${typeColor[exp.type]}`}>
                          {typeLabel[exp.type][lang]}
                        </span>
                      </div>
                      <p className="font-mono text-xs text-accent/70 mb-2">{exp.company}</p>
                      <p className={`text-[14px] ${textMut} leading-relaxed mb-3`}>{exp.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map(tag => (
                          <span key={tag} className="font-mono text-xs text-accent px-1.5 py-0.5 rounded border border-accent/20 bg-accent/5">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ── PROJECTS ───────────────────────────────────────── */}
          <section id="projects" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.projects.title} num="04" />
            <div
              className="flex flex-col gap-1"
              onMouseLeave={() => setHoveredCard(null)}
            >
              {projects.map((proj, i) => (
                <FadeIn key={i} delay={i * 0.06}>
                  <div
                    className={`group relative p-5 rounded-lg border transition-all duration-300 ${
                      hoveredCard !== null && hoveredCard !== i
                        ? 'opacity-40 border-transparent'
                        : `border-transparent ${bgHover} hover:border-paperBorder dark:hover:border-navyBorder opacity-100`
                    }`}
                    onMouseEnter={() => setHoveredCard(i)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className={`font-display font-bold ${textPri} group-hover:text-accent transition-colors text-[15px]`}>
                            {proj.title}
                          </h3>
                          <span className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${categoryColor[proj.category]}`}>
                            {categoryLabel[proj.category][lang]}
                          </span>
                        </div>
                        <p className={`text-[14px] ${textMut} leading-relaxed mb-3`}>{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map(tag => (
                            <span key={tag} className={`font-mono text-xs ${textMut} px-1.5 py-0.5 rounded border ${border} ${bgCard}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Thumbnail */}
                      <div className={`hidden sm:block w-20 h-16 rounded overflow-hidden border ${border} flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity`}>
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute inset-0 rounded-lg"
                        aria-label={`Ver ${proj.title}`}
                      />
                    )}
                    {proj.link && (
                      <div className="mt-3 flex items-center gap-1 text-accent text-xs font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        GitHub <ExternalLink size={11} />
                      </div>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <a
                href="https://github.com/oseiasdfarias"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-sm font-bold text-accent hover:gap-3 transition-all group"
              >
                {content.projects.viewAll}
                <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </FadeIn>
          </section>

          {/* ── OPEN SOURCE ────────────────────────────────────── */}
          <section id="opensource" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.opensource.title} num="05" />

            {/* Main library card */}
            <FadeIn>
              <div className={`pixel-card relative p-6 rounded-lg border ${border} ${bgCard} hover:border-green/40 transition-all duration-300 mb-4`}>
                <div className="flex items-start justify-between gap-4 mb-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <Package size={22} className="text-green flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`font-display font-bold text-xl ${textPri}`}>{openSource.name}</h3>
                        <span className="font-mono text-xs font-bold px-2 py-0.5 border border-green/30 text-green bg-green/5">{openSource.version}</span>
                        <span className="font-mono text-xs px-2 py-0.5 border border-accent2/30 text-accent2 bg-accent2/5">MIT</span>
                      </div>
                      <p className="font-mono text-xs text-green/70 mt-0.5">{openSource.tagline}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={openSource.github} target="_blank" rel="noreferrer"
                       className={`flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 border ${border} ${bgCard} ${textMut} hover:text-accent hover:border-accent/40 transition-colors`}>
                      <Github size={12} /> GitHub
                    </a>
                    <a href={openSource.pypi} target="_blank" rel="noreferrer"
                       className="flex items-center gap-1.5 text-xs font-mono font-bold px-2.5 py-1 border border-green/30 bg-green/5 text-green hover:bg-green/10 transition-colors">
                      PyPI <ExternalLink size={11} />
                    </a>
                  </div>
                </div>

                <p className={`text-[15px] ${textSec} leading-relaxed mb-5`}>{openSource.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {openSource.tags.map(tag => (
                    <span key={tag} className={`font-mono text-xs ${textMut} px-1.5 py-0.5 border ${border} ${bgCard}`}>{tag}</span>
                  ))}
                </div>

                {/* Stats row */}
                <div className={`flex flex-wrap gap-6 pt-4 border-t ${border}`}>
                  {openSource.stats.map(s => (
                    <div key={s.label} className="flex flex-col">
                      <span className={`font-mono text-[10px] ${textMut} uppercase tracking-widest`}>{s.label}</span>
                      <span className="font-mono text-sm font-bold text-green">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {openSource.features.map((feat, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <motion.a
                    href={feat.docLink}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ y: -4, scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`group flex flex-col p-4 rounded-lg border ${border} ${bgCard} hover:border-green/50 hover:bg-green/[0.04] transition-colors duration-200 h-full cursor-pointer`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className={`font-display font-bold text-sm ${textPri} group-hover:text-green transition-colors duration-200`}>
                        {feat.title}
                      </h4>
                      <ArrowUpRight
                        size={13}
                        className="flex-shrink-0 mt-0.5 text-green opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200"
                      />
                    </div>
                    <p className={`text-[13px] ${textMut} leading-relaxed`}>{feat.description}</p>
                    <span className="mt-2 font-mono text-[10px] text-green/50 group-hover:text-green/80 transition-colors duration-200 uppercase tracking-widest">
                      {lang === 'pt' ? 'ver docs →' : 'view docs →'}
                    </span>
                  </motion.a>
                </FadeIn>
              ))}
            </div>

            {/* Drone demo highlight */}
            <FadeIn delay={0.2}>
              <div className={`pixel-card p-6 rounded-lg border border-green/30 bg-green/[0.03]`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-60" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green" />
                  </span>
                  <span className="font-mono text-xs text-green/70 uppercase tracking-widest">
                    {lang === 'pt' ? 'destaque' : 'highlight'}
                  </span>
                </div>
                <h3 className={`font-display font-bold ${textPri} text-[17px] mb-2`}>
                  {openSource.demo.title}
                </h3>
                <p className={`text-[14px] ${textMut} leading-relaxed mb-4`}>{openSource.demo.description}</p>

                {/* GIF gallery */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {openSource.demo.media.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => openModal(openSource.demo.media, i)}
                      className={`group/thumb relative aspect-video rounded border ${border} overflow-hidden hover:border-green/50 transition-all duration-200 focus:outline-none focus:border-green/70`}
                      aria-label={item.caption}
                    >
                      <img
                        src={item.src}
                        alt={item.caption}
                        className="w-full h-full object-cover opacity-70 group-hover/thumb:opacity-100 transition-opacity duration-200"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 bg-black/30">
                        <span className="font-pixel text-white text-xs border border-white/40 px-2 py-0.5 bg-black/50">
                          {lang === 'pt' ? 'expandir' : 'expand'}
                        </span>
                      </div>
                      <div className="absolute bottom-1 right-1">
                        <span className="font-mono text-[9px] text-white/60 bg-black/50 px-1">{i + 1}/{openSource.demo.media.length}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {openSource.demo.tags.map(tag => (
                    <span key={tag} className="font-mono text-xs text-green px-2 py-0.5 border border-green/20 bg-green/5">{tag}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>

          {/* ── EDUCATION & CERTS ──────────────────────────────── */}
          <section id="education" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.education.title} num="06" />

            <div className="flex flex-col gap-3 mb-12">
              {education.map((edu, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className={`group flex items-start gap-4 p-4 rounded-lg border border-transparent ${bgHover} hover:border-paperBorder dark:hover:border-navyBorder transition-all duration-300`}>
                    <div className={`w-28 h-28 flex-shrink-0 rounded border ${border} bg-white overflow-hidden`}>
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                        style={{ transform: `scale(${edu.logoScale ?? 1})`, padding: edu.logoScale ? 0 : '6px' }}
                      />
                    </div>
                    <div>
                      <h4 className={`font-display font-bold ${textPri} text-[15px] group-hover:text-accent transition-colors`}>
                        {edu.title}
                      </h4>
                      <p className="font-mono text-xs text-accent/70">{edu.institution} · {edu.period}</p>
                      <p className={`text-[13px] ${textMut} mt-0.5`}>{edu.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Certifications */}
            <div className={`flex items-center gap-4 mb-6`}>
              <h3 className={`text-base font-bold font-display ${textPri} flex items-center gap-2 whitespace-nowrap`}>
                <Award size={16} className="text-accent2" />
                {content.certifications.title}
              </h3>
              <div className={`flex-1 h-px bg-paperBorder dark:bg-navyBorder`} />
            </div>
            <div className="flex flex-col gap-2">
              {certs.map((cert, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className={`pixel-card pixel-card-indigo group flex items-center justify-between p-3 rounded border ${border} ${bgCard} hover:border-accent2/30 ${bgHover} transition-all duration-200`}>
                    <div className="min-w-0 flex-1">
                      <h4 className={`font-display font-semibold text-sm ${textPri} truncate group-hover:text-accent2 transition-colors`}>
                        {cert.title}
                      </h4>
                      <p className={`font-mono text-xs uppercase tracking-wider ${textMut}`}>{cert.issuer}</p>
                    </div>
                    <span className={`font-mono text-xs ${textMut} whitespace-nowrap ml-4`}>{cert.date}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ── CONTACT ────────────────────────────────────────── */}
          <section id="contact" className="scroll-mt-24">
            <SectionTitle label={content.contact.title} num="07" />
            <FadeIn>
              <p className={`text-[15px] ${textMut} leading-relaxed mb-8 max-w-md`}>
                {content.contact.subtitle}
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4 max-w-md">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text" name="name" required
                    placeholder={content.contact.formName}
                    className={`w-full ${bgCard} border ${border} rounded-lg px-4 py-3 text-[15px] ${textPri} placeholder:${textMut} focus:outline-none focus:border-accent/50 transition-colors font-sans`}
                  />
                  <input
                    type="email" name="email" required
                    placeholder={content.contact.formEmail}
                    className={`w-full ${bgCard} border ${border} rounded-lg px-4 py-3 text-[15px] ${textPri} placeholder:${textMut} focus:outline-none focus:border-accent/50 transition-colors font-sans`}
                  />
                </div>
                <textarea
                  name="message" rows={4} required
                  placeholder={content.contact.formMessage}
                  className={`w-full ${bgCard} border ${border} rounded-lg px-4 py-3 text-[15px] ${textPri} placeholder:${textMut} focus:outline-none focus:border-accent/50 transition-colors resize-none font-sans`}
                />
                <button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className="inline-flex items-center gap-2 font-mono font-bold text-sm text-accent border border-accent/40 rounded-lg px-6 py-2.5 hover:bg-accent/10 transition-colors disabled:opacity-50"
                >
                  {formStatus === 'sending' ? content.contact.sending : content.contact.btnSend}
                  {formStatus !== 'sending' && <ArrowUpRight size={14} />}
                </button>
                {formStatus === 'success' && (
                  <p className="text-green text-sm font-mono">{content.contact.success}</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-400 text-sm font-mono">{content.contact.error}</p>
                )}
              </form>
            </FadeIn>
          </section>

          {/* ── FOOTER ─────────────────────────────────────────── */}
          <footer className={`mt-24 pt-8 border-t ${border}`}>
            <p className={`font-mono text-xs ${textMut}`}>
              {content.footer.rights} · {content.footer.builtWith}
            </p>
          </footer>
        </main>
      </div>

      {/* ── Media modal ──────────────────────────────────────────────────── */}
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

      {/* ── Back to top ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-10 h-10 rounded border ${border} ${bgCard} ${textMut} hover:text-accent hover:border-accent/40 transition-colors shadow-lg font-pixel text-lg`}
            aria-label="Voltar ao topo"
          >
            ▲
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
