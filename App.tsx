import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Youtube, BookOpen, Mail,
  ExternalLink, ArrowUpRight, Menu, X,
  FlaskConical, Briefcase, Award, Globe, Sun, Moon,
} from 'lucide-react';
import {
  translations, getProjects, getExperience,
  getEducation, getCertifications, getResearch,
} from './content';
import { Language } from './types';

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
  industry: 'text-accent  border-accent/20  bg-accent/5',
  research: 'text-accent2 border-accent2/20 bg-accent2/5',
};

const typeLabel: Record<string, Record<Language, string>> = {
  industry: { pt: 'Mercado',  en: 'Industry' },
  research: { pt: 'Pesquisa', en: 'Research' },
};

const NAV_SECTIONS = ['about', 'research', 'experience', 'projects', 'education', 'contact'] as const;

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
const SectionTitle: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-4 mb-12">
    <h2 className="text-xl font-bold font-display text-slate-900 dark:text-lightestSlate whitespace-nowrap tracking-wide">
      {label}
    </h2>
    <div className="flex-1 h-px bg-slate-200 dark:bg-navyBorder" />
  </div>
);

// ─── App ─────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [lang,          setLang]          = useState<Language>('pt');
  const [darkMode,      setDarkMode]      = useState(true);
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [formStatus,    setFormStatus]    = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [hoveredCard,   setHoveredCard]   = useState<number | null>(null);

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

  const projects    = getProjects(lang);
  const experience  = getExperience(lang);
  const education   = getEducation(lang);
  const research    = getResearch(lang);
  const certs       = getCertifications(lang);

  const socials = [
    { icon: Github,   href: "https://github.com/oseiasdfarias/",         label: "GitHub"   },
    { icon: Linkedin, href: "https://www.linkedin.com/in/oseiasfarias/", label: "LinkedIn" },
    { icon: Youtube,  href: "https://youtube.com/@oseiasdfarias",        label: "YouTube"  },
    { icon: BookOpen, href: "https://oseiasfarias.medium.com",           label: "Medium"   },
    { icon: Mail,     href: "mailto:oseias@example.com",                 label: "Email"    },
  ];

  // ── Shared class shorthands ──────────────────────────────────────────────
  const bg       = 'bg-slate-50  dark:bg-navy';
  const bgCard   = 'bg-white     dark:bg-navyCard';
  const bgHover  = 'hover:bg-slate-100 dark:hover:bg-navyHover';
  const border   = 'border-slate-200  dark:border-navyBorder';
  const textPri  = 'text-slate-900  dark:text-lightestSlate';
  const textSec  = 'text-slate-600  dark:text-lightSlate';
  const textMut  = 'text-slate-500  dark:text-slate';

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className={`relative min-h-screen ${bg} ${textSec} selection:bg-accent/20 selection:text-accent transition-colors duration-300`}>

      {/* ── Full-screen background image ─────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202507/MIT_Learning-Symmetric-01_0.jpg"
          alt=""
          className="w-full h-full object-cover opacity-[0.22] dark:opacity-[0.35]"
        />
        {/* Light: overlay escuro suave para criar contraste com os textos */}
        <div className="absolute inset-0 bg-slate-200/60 dark:hidden" />
        {/* Dark: overlay navy leve para manter legibilidade */}
        <div className="absolute inset-0 hidden dark:block bg-navy/65" />
      </div>

      {/* ── Mobile top bar ───────────────────────────────────────────────── */}
      <header className={`lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 backdrop-blur border-b ${border} bg-slate-50/80 dark:bg-navy/80`}>
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
                className={`text-left text-sm font-bold uppercase tracking-widest ${textMut} hover:text-accent transition-colors`}
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
        <header className="hidden lg:flex lg:sticky lg:top-0 lg:max-h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-24 lg:pr-12 relative">
          <div className="relative z-10 flex flex-col justify-between h-full">

          {/* Top block */}
          <div>
            {/* Profile photo */}
            <div className="mb-8">
              <div className={`relative w-24 h-24 rounded-full overflow-hidden ring-2 ${border} ring-offset-2 ${darkMode ? 'ring-offset-navy' : 'ring-offset-slate-50'}`}>
                <img
                  src="https://github.com/oseiasdfarias.png"
                  alt="Oséias Farias"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>

            {/* Name + title */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="font-mono text-xs text-accent mb-2 tracking-wider">{content.hero.greeting}</p>
              <h1 className={`text-4xl font-bold font-display ${textPri} leading-tight mb-2`}>
                Oséias Farias.
              </h1>
              <h2 className={`text-base font-semibold font-display ${textSec} mb-4 leading-snug`}>
                {content.hero.title}
              </h2>

              {/* Affiliation badge */}
              <div className="inline-flex items-center gap-2 mb-5">
                <span className={`font-mono text-xs ${textMut} tracking-wide`}>
                  {content.hero.availability}
                </span>
              </div>

              <p className={`text-[15px] ${textMut} leading-relaxed max-w-xs`}>
                {content.hero.description}
              </p>
            </motion.div>

            {/* Nav links */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-10 flex flex-col gap-1"
            >
              {NAV_SECTIONS.map(s => {
                const isActive = activeSection === s;
                return (
                  <button
                    key={s}
                    onClick={() => scrollTo(s)}
                    className="group flex items-center gap-4 py-2 text-left transition-all duration-200"
                  >
                    <span
                      className={`h-px transition-all duration-200 ${
                        isActive
                          ? `w-12 ${darkMode ? 'bg-lightestSlate' : 'bg-slate-900'}`
                          : `w-6 ${darkMode ? 'bg-slate' : 'bg-slate-400'} group-hover:w-10 ${darkMode ? 'group-hover:bg-lightSlate' : 'group-hover:bg-slate-600'}`
                      }`}
                    />
                    <span
                      className={`font-mono text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                        isActive
                          ? textPri
                          : `${textMut} group-hover:${textSec}`
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
            className="flex flex-col gap-5"
          >
            {/* CV button */}
            <a
              href="https://drive.google.com/file/d/1-oMiFFC3QAbU6JhIeo6svznmm1pWMtzW/view"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-accent border border-accent/30 rounded px-3 py-1.5 w-fit hover:bg-accent/10 transition-colors group"
            >
              {content.hero.btnOutline}
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-5">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className={`${textMut} hover:text-accent hover:-translate-y-0.5 transition-all duration-200`}
                >
                  <s.icon size={19} />
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

          {/* ── ABOUT ──────────────────────────────────────────── */}
          <section id="about" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.about.title} />
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
                      <span key={skill} className={`font-mono text-xs ${textMut} hover:text-accent px-2 py-1 rounded border ${border} ${bgCard} hover:border-accent/30 transition-colors cursor-default`}>
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
            <SectionTitle label={content.research.title} />
            <div className="flex flex-col gap-4">
              {research.map((item, i) => (
                <FadeIn key={i} delay={i * 0.1}>
                  <div className={`group relative p-6 rounded-lg border ${border} ${bgCard} hover:border-accent2/40 ${bgHover} transition-all duration-300`}>
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
          </section>

          {/* ── EXPERIENCE ─────────────────────────────────────── */}
          <section id="experience" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.experience.title} />
            <div className="flex flex-col gap-1">
              {experience.map((exp, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className={`group relative grid sm:grid-cols-[130px_1fr] gap-3 p-5 rounded-lg border border-transparent ${bgHover} hover:border-slate-200 dark:hover:border-navyBorder transition-all duration-300`}>
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
            <SectionTitle label={content.projects.title} />
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
                        : `border-transparent ${bgHover} hover:border-slate-200 dark:hover:border-navyBorder opacity-100`
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

          {/* ── EDUCATION & CERTS ──────────────────────────────── */}
          <section id="education" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.education.title} />

            <div className="flex flex-col gap-3 mb-12">
              {education.map((edu, i) => (
                <FadeIn key={i} delay={i * 0.07}>
                  <div className={`group flex items-start gap-4 p-4 rounded-lg border border-transparent ${bgHover} hover:border-slate-200 dark:hover:border-navyBorder transition-all duration-300`}>
                    <div className={`w-11 h-11 flex-shrink-0 rounded border ${border} ${bgCard} p-1 overflow-hidden`}>
                      <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
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
              <div className={`flex-1 h-px bg-slate-200 dark:bg-navyBorder`} />
            </div>
            <div className="flex flex-col gap-2">
              {certs.map((cert, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className={`group flex items-center justify-between p-3 rounded border ${border} ${bgCard} hover:border-accent2/30 ${bgHover} transition-all duration-200`}>
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
            <SectionTitle label={content.contact.title} />
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
    </div>
  );
};

export default App;
