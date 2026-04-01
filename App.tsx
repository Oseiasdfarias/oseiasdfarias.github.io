import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Github, Linkedin, Youtube, BookOpen, Mail,
  ExternalLink, ArrowUpRight, Menu, X,
  FlaskConical, Briefcase, GraduationCap, Award, Globe,
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

// ─── Nav config ─────────────────────────────────────────────────────────────
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
    <h2 className="text-lg font-bold font-display text-lightestSlate whitespace-nowrap tracking-wide">
      {label}
    </h2>
    <div className="flex-1 h-px bg-navyBorder" />
  </div>
);

// ─── App ─────────────────────────────────────────────────────────────────────
const App: React.FC = () => {
  const [lang,          setLang]          = useState<Language>('pt');
  const [activeSection, setActiveSection] = useState<string>('about');
  const [isMenuOpen,    setIsMenuOpen]    = useState(false);
  const [mouse,         setMouse]         = useState({ x: 0, y: 0 });
  const [formStatus,    setFormStatus]    = useState<'idle'|'sending'|'success'|'error'>('idle');
  const [hoveredCard,   setHoveredCard]   = useState<number | null>(null);

  const content = translations[lang];

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

  // ── Mouse spotlight ──────────────────────────────────────────────────────
  useEffect(() => {
    const handle = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
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

  const projects = getProjects(lang);
  const experience = getExperience(lang);
  const education  = getEducation(lang);
  const research   = getResearch(lang);
  const certs      = getCertifications(lang);

  // ── Socials ──────────────────────────────────────────────────────────────
  const socials = [
    { icon: Github,   href: "https://github.com/oseiasdfarias/",            label: "GitHub"   },
    { icon: Linkedin, href: "https://www.linkedin.com/in/oseiasfarias/",    label: "LinkedIn" },
    { icon: Youtube,  href: "https://youtube.com/@oseiasdfarias",           label: "YouTube"  },
    { icon: BookOpen, href: "https://oseiasfarias.medium.com",              label: "Medium"   },
    { icon: Mail,     href: "mailto:oseias@example.com",                    label: "Email"    },
  ];

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-navy text-lightSlate selection:bg-accent/20 selection:text-accent">

      {/* ── Cursor spotlight ─────────────────────────────────────────────── */}
      <div
        className="pointer-events-none fixed inset-0 z-30 hidden lg:block transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px at ${mouse.x}px ${mouse.y}px, rgba(56,189,248,0.06), transparent 80%)`,
        }}
      />

      {/* ── Mobile top bar ───────────────────────────────────────────────── */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14 bg-navy/90 backdrop-blur border-b border-navyBorder">
        <span className="font-display font-bold text-lightestSlate text-lg">Oséias Farias</span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(l => l === 'pt' ? 'en' : 'pt')}
            className="font-mono text-[10px] font-bold px-2 py-1 rounded border border-navyBorder text-slate hover:text-accent hover:border-accent/40 transition-colors"
          >
            {lang.toUpperCase()}
          </button>
          <button onClick={() => setIsMenuOpen(o => !o)} className="text-lightSlate">
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
            className="lg:hidden fixed top-14 left-0 right-0 z-40 bg-navyCard border-b border-navyBorder px-6 py-6 flex flex-col gap-4"
          >
            {NAV_SECTIONS.map(s => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-left text-sm font-bold uppercase tracking-widest text-lightSlate hover:text-accent transition-colors"
              >
                {content.nav[s as keyof typeof content.nav]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main layout ──────────────────────────────────────────────────── */}
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 md:px-12 lg:px-24 lg:flex">

        {/* ════════════════════ SIDEBAR ════════════════════ */}
        <header className="hidden lg:flex lg:sticky lg:top-0 lg:max-h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-24 lg:pr-12">

          {/* Top block */}
          <div>
            {/* Profile photo */}
            <div className="mb-8">
              <div className="relative w-20 h-20 rounded-full overflow-hidden ring-2 ring-navyBorder ring-offset-2 ring-offset-navy">
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
              <h1 className="text-4xl font-bold font-display text-lightestSlate leading-tight mb-2">
                Oséias Farias.
              </h1>
              <h2 className="text-lg font-semibold font-display text-lightSlate mb-4">
                {content.hero.title}
              </h2>

              {/* Availability badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green" />
                </span>
                <span className="font-mono text-[11px] text-green tracking-wide">
                  {content.hero.availability}
                </span>
              </div>

              <p className="text-sm text-slate leading-relaxed max-w-xs">
                {content.hero.description}
              </p>
            </motion.div>

            {/* Nav links */}
            <motion.nav
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-12 flex flex-col gap-1"
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
                          ? 'w-12 bg-lightestSlate'
                          : 'w-6 bg-slate group-hover:w-10 group-hover:bg-lightSlate'
                      }`}
                    />
                    <span
                      className={`font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-200 ${
                        isActive
                          ? 'text-lightestSlate'
                          : 'text-slate group-hover:text-lightSlate'
                      }`}
                    >
                      {content.nav[s as keyof typeof content.nav]}
                    </span>
                  </button>
                );
              })}
            </motion.nav>
          </div>

          {/* Bottom block — socials + lang toggle */}
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
              className="inline-flex items-center gap-2 text-[11px] font-mono font-bold text-accent border border-accent/30 rounded px-3 py-1.5 w-fit hover:bg-accent/10 transition-colors group"
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
                  className="text-slate hover:text-accent hover:-translate-y-0.5 transition-all duration-200"
                >
                  <s.icon size={18} />
                </a>
              ))}
            </div>

            {/* Lang toggle */}
            <button
              onClick={() => setLang(l => l === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-2 text-[10px] font-mono font-bold text-slate hover:text-accent transition-colors w-fit group"
            >
              <Globe size={13} className="group-hover:rotate-12 transition-transform" />
              {lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
            </button>
          </motion.div>
        </header>

        {/* ════════════════════ MAIN CONTENT ════════════════════ */}
        <main className="lg:w-[58%] pt-20 lg:pt-24 pb-24">

          {/* ── ABOUT ──────────────────────────────────────────── */}
          <section id="about" className="mb-24 scroll-mt-24">
            <SectionTitle label={content.about.title} />
            <div className="space-y-4">
              {content.about.description.map((para, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <p
                    className="text-sm leading-relaxed text-lightSlate"
                    dangerouslySetInnerHTML={{ __html: para }}
                  />
                </FadeIn>
              ))}

              {/* Dual identity pills */}
              <FadeIn delay={0.3}>
                <div className="flex gap-3 pt-4 flex-wrap">
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

              {/* Skills grid */}
              <FadeIn delay={0.35}>
                <div className="mt-4 pt-4 border-t border-navyBorder">
                  <p className="font-mono text-[10px] text-slate uppercase tracking-widest mb-3">Stack principal</p>
                  <div className="flex flex-wrap gap-2">
                    {["Java", "Python", "Spring Boot", "FastAPI", "Quarkus", "AWS", "Docker", "PostgreSQL", "FPGA", "TensorFlow"].map(skill => (
                      <span key={skill} className="font-mono text-[10px] text-slate hover:text-accent px-2 py-1 rounded border border-navyBorder hover:border-accent/30 bg-navyCard transition-colors cursor-default">
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
                  <div className="group relative p-6 rounded-lg border border-navyBorder bg-navyCard hover:border-accent2/40 hover:bg-navyHover transition-all duration-300">
                    {/* Status badge */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[10px] text-slate">{item.period}</span>
                      {item.status === 'ongoing' && (
                        <span className="flex items-center gap-1.5 font-mono text-[10px] text-accent2">
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent2 opacity-75" />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent2" />
                          </span>
                          Em andamento
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-lightestSlate group-hover:text-accent2 transition-colors mb-1 text-base">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[11px] text-accent2/70 mb-3">{item.institution}</p>
                    <p className="text-sm text-slate leading-relaxed mb-4">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map(tag => (
                        <span key={tag} className="font-mono text-[10px] text-accent2/80 px-2 py-0.5 rounded border border-accent2/20 bg-accent2/5">
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
                  <div className="group relative grid sm:grid-cols-[120px_1fr] gap-3 p-5 rounded-lg border border-transparent hover:border-navyBorder hover:bg-navyCard transition-all duration-300">
                    {/* Period column */}
                    <div className="pt-0.5">
                      <span className="font-mono text-[10px] text-slate leading-relaxed">
                        {exp.period}
                      </span>
                    </div>
                    {/* Content column */}
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <h3 className="font-display font-bold text-lightestSlate group-hover:text-accent transition-colors text-sm">
                          {exp.title}
                        </h3>
                        <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${typeColor[exp.type]}`}>
                          {typeLabel[exp.type][lang]}
                        </span>
                      </div>
                      <p className="font-mono text-[11px] text-accent/70 mb-2">{exp.company}</p>
                      <p className="text-[13px] text-slate leading-relaxed mb-3">{exp.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.tags.map(tag => (
                          <span key={tag} className="font-mono text-[10px] text-accent px-1.5 py-0.5 rounded border border-accent/20 bg-accent/5">
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
                        : 'border-transparent hover:border-navyBorder hover:bg-navyCard opacity-100'
                    }`}
                    onMouseEnter={() => setHoveredCard(i)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h3 className="font-display font-bold text-lightestSlate group-hover:text-accent transition-colors text-sm">
                            {proj.title}
                          </h3>
                          <span className={`font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border ${categoryColor[proj.category]}`}>
                            {categoryLabel[proj.category][lang]}
                          </span>
                        </div>
                        <p className="text-[13px] text-slate leading-relaxed mb-3">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5">
                          {proj.tags.map(tag => (
                            <span key={tag} className="font-mono text-[10px] text-slate px-1.5 py-0.5 rounded border border-navyBorder bg-navyCard">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Project image thumbnail */}
                      <div className="hidden sm:block w-20 h-16 rounded overflow-hidden border border-navyBorder flex-shrink-0 opacity-70 group-hover:opacity-100 transition-opacity">
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                    {/* Link overlay */}
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
                      <div className="mt-3 flex items-center gap-1 text-accent text-[11px] font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
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
                  <div className="group flex items-start gap-4 p-4 rounded-lg border border-transparent hover:border-navyBorder hover:bg-navyCard transition-all duration-300">
                    <div className="w-10 h-10 flex-shrink-0 rounded border border-navyBorder bg-navyCard p-1 overflow-hidden">
                      <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-lightestSlate text-sm group-hover:text-accent transition-colors">
                        {edu.title}
                      </h4>
                      <p className="font-mono text-[11px] text-accent/70">{edu.institution} · {edu.period}</p>
                      <p className="text-[12px] text-slate mt-0.5">{edu.description}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Certifications */}
            <div className="flex items-center gap-4 mb-8">
              <h3 className="text-sm font-bold font-display text-lightestSlate flex items-center gap-2 whitespace-nowrap">
                <Award size={16} className="text-accent2" />
                {content.certifications.title}
              </h3>
              <div className="flex-1 h-px bg-navyBorder" />
            </div>
            <div className="flex flex-col gap-2">
              {certs.map((cert, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="group flex items-center justify-between p-3 rounded border border-navyBorder hover:border-accent2/30 hover:bg-navyCard transition-all duration-200">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-display font-semibold text-xs text-lightestSlate truncate group-hover:text-accent2 transition-colors">
                        {cert.title}
                      </h4>
                      <p className="font-mono text-[10px] uppercase tracking-wider text-slate">{cert.issuer}</p>
                    </div>
                    <span className="font-mono text-[10px] text-slate whitespace-nowrap ml-4">{cert.date}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </section>

          {/* ── CONTACT ────────────────────────────────────────── */}
          <section id="contact" className="scroll-mt-24">
            <SectionTitle label={content.contact.title} />
            <FadeIn>
              <p className="text-sm text-slate leading-relaxed mb-8 max-w-md">
                {content.contact.subtitle}
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-4 max-w-md">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text" name="name" required
                    placeholder={content.contact.formName}
                    className="w-full bg-navyCard border border-navyBorder rounded-lg px-4 py-2.5 text-sm text-lightestSlate placeholder-slate focus:outline-none focus:border-accent/50 transition-colors font-sans"
                  />
                  <input
                    type="email" name="email" required
                    placeholder={content.contact.formEmail}
                    className="w-full bg-navyCard border border-navyBorder rounded-lg px-4 py-2.5 text-sm text-lightestSlate placeholder-slate focus:outline-none focus:border-accent/50 transition-colors font-sans"
                  />
                </div>
                <textarea
                  name="message" rows={4} required
                  placeholder={content.contact.formMessage}
                  className="w-full bg-navyCard border border-navyBorder rounded-lg px-4 py-2.5 text-sm text-lightestSlate placeholder-slate focus:outline-none focus:border-accent/50 transition-colors resize-none font-sans"
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
                  <p className="text-green text-xs font-mono">{content.contact.success}</p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-400 text-xs font-mono">{content.contact.error}</p>
                )}
              </form>
            </FadeIn>
          </section>

          {/* ── FOOTER ─────────────────────────────────────────── */}
          <footer className="mt-24 pt-8 border-t border-navyBorder">
            <p className="font-mono text-[11px] text-slate">
              {content.footer.rights} · {content.footer.builtWith}
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
