import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Github, Linkedin, Youtube, Mail, MapPin, Phone, 
  Code2, Terminal, Globe, BookOpen,
  ExternalLink, Menu, X, Award, GraduationCap, FileCheck
} from 'lucide-react';
import { translations, getProjects, getExperience, getEducation, getCertifications } from './content';
import { Language } from './types';
import { SectionHeader, Button } from './components/UIComponents';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const content = translations[lang];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const savedLang = localStorage.getItem('lang') as Language;
    
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    if (savedLang) setLang(savedLang);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  const toggleLang = () => {
    const newLang = lang === 'pt' ? 'en' : 'pt';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const [typedText, setTypedText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = content.hero.typed[textIndex];
    const typeSpeed = isDeleting ? 40 : 80;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && typeIndex < currentString.length) {
        setTypedText(currentString.substring(0, typeIndex + 1));
        setTypeIndex(prev => prev + 1);
      } else if (isDeleting && typeIndex > 0) {
        setTypedText(currentString.substring(0, typeIndex - 1));
        setTypeIndex(prev => prev - 1);
      } else if (!isDeleting && typeIndex === currentString.length) {
        setTimeout(() => setIsDeleting(true), 2500);
      } else if (isDeleting && typeIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % content.hero.typed.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex, content.hero.typed]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    try {
      await fetch('https://formsubmit.co/ajax/c110a49cc1ab534d2724eca67e130885', {
        method: 'POST',
        body: formData
      });
      setFormStatus('success');
      form.reset();
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch (err) {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const navLinks = [
    { key: 'home', label: content.nav.home },
    { key: 'about', label: content.nav.about },
    { key: 'experience', label: content.nav.experience },
    { key: 'projects', label: content.nav.projects },
    { key: 'certifications', label: "Certifications" },
    { key: 'contact', label: content.nav.contact },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark text-slate-800 dark:text-gray-400 font-sans transition-colors duration-300">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-white/5 h-16">
        <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center">
          <a href="#home" className="text-xl font-bold font-display text-slate-900 dark:text-white">
            φséias
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <a 
                key={link.key}
                href={`#${link.key}`}
                className="text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            
            <div className="w-px h-4 bg-gray-200 dark:bg-white/10 mx-1" />
            
            <div className="flex items-center gap-2">
               <button 
                onClick={toggleLang}
                className="text-[10px] font-bold px-2 py-1 rounded border border-gray-200 dark:border-white/10 hover:border-primary hover:text-primary transition-all"
              >
                {lang.toUpperCase()}
              </button>
              <button 
                onClick={toggleTheme}
                className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-gray-500"
              >
                {darkMode ? <Moon size={16} /> : <Sun size={16} />}
              </button>
            </div>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-500">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white dark:bg-dark border-b border-gray-200 dark:border-white/5 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map(link => (
                  <a 
                    key={link.key}
                    href={`#${link.key}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-base font-medium"
                  >
                    {link.label}
                  </a>
                ))}
                 <div className="flex gap-4 mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                    <button onClick={toggleLang} className="text-sm font-bold">{lang === 'pt' ? 'Mudar para Inglês' : 'Switch to Portuguese'}</button>
                    <button onClick={toggleTheme}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen pt-16 flex flex-col justify-center relative overflow-hidden">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
            <img 
                src="https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202507/MIT_Learning-Symmetric-01_0.jpg" 
                alt="AI Background" 
                className="w-full h-full object-cover opacity-30 dark:opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-50/90 via-gray-50/50 to-transparent dark:from-dark/90 dark:via-dark/50 dark:to-transparent" />
        </div>
        
        <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-primary/10 rounded-full blur-[120px] z-0 animate-pulse" />
        <div className="absolute bottom-[20%] left-[10%] w-[200px] h-[200px] bg-secondary/10 rounded-full blur-[120px] z-0 animate-pulse" />

        <div className="container mx-auto max-w-5xl px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider mb-6 backdrop-blur-sm">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
              </span>
              {content.hero.badge}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold font-display leading-tight mb-6 text-slate-900 dark:text-gray-100">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="animate-pulse text-gray-400 font-light">|</span>
            </h1>
            
            <p className="text-base text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              {content.hero.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth'})}>
                {content.hero.btnPrimary}
              </Button>
              <Button variant="outline" href="https://drive.google.com/file/d/1-oMiFFC3QAbU6JhIeo6svznmm1pWMtzW/view">
                {content.hero.btnOutline}
              </Button>
            </div>

            <div className="flex gap-5 mt-10">
               {[
                 { icon: Linkedin, href: "https://www.linkedin.com/in/oseiasfarias/" },
                 { icon: Github, href: "https://github.com/oseiasdfarias/" },
                 { icon: Youtube, href: "https://youtube.com/@oseiasdfarias" },
                 { icon: BookOpen, href: "https://oseiasfarias.medium.com" }
               ].map((item, idx) => (
                 <a key={idx} href={item.href} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-primary transition-colors">
                   <item.icon size={20} />
                 </a>
               ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 grayscale hover:grayscale-0 transition-all duration-500">
              <img 
                src="https://media.licdn.com/dms/image/v2/D4D03AQE0Hj1p9wKVIA/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1708453472659?e=1742428800&v=beta&t=Z7y4B_KkqvW-7wEge02uXGvCjF2aZc8Xg6-c5E4qJ_g"
                onError={(e) => e.currentTarget.src = 'https://github.com/oseiasdfarias.png'} 
                alt="Oséias Farias" 
                className="relative w-full h-full object-cover rounded-2xl shadow-2xl skew-y-3 hover:skew-y-0 transition-transform"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Simplified Bento Grid */}
      <section id="about" className="py-16">
        <div className="container mx-auto max-w-5xl px-6">
           <SectionHeader title={content.about.title} subtitle={content.about.subtitle} />
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             
             {/* Bio Layout - More Compact */}
             <div className="md:col-span-2 bg-white dark:bg-darkCard p-6 rounded-2xl border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2 mb-4 text-primary">
                    <Terminal size={20} />
                    <span className="font-bold text-sm uppercase tracking-wider">Bio</span>
                </div>
                <div className="space-y-3 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                   {content.about.description.split('. ').map((s, i) => (
                      <p key={i}>{s}.</p>
                   ))}
                </div>
             </div>

             <div className="flex flex-col gap-4">
                {/* Stack Box */}
                <div className="flex-1 bg-gray-100 dark:bg-gradient-to-br dark:from-darkCard dark:to-black p-6 rounded-2xl border border-gray-200 dark:border-white/5 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px]" />
                    <h3 className="text-sm font-bold mb-4 text-gray-900 dark:text-white relative z-10">{content.skills.title}</h3>
                    <div className="flex flex-wrap gap-2 relative z-10">
                    {["Java", "Python", "AWS", "Docker", "ML", "FPGA"].map(skill => (
                        <span key={skill} className="px-2 py-1 bg-white dark:bg-white/5 rounded text-[10px] font-medium text-gray-600 dark:text-white/80 border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none">
                            {skill}
                        </span>
                    ))}
                    </div>
                </div>

                {/* Location Box */}
                <div className="p-6 rounded-2xl bg-gray-100 dark:bg-darkCard border border-gray-200 dark:border-white/5 flex items-center justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">Location</p>
                        <p className="text-sm font-bold mt-1 text-gray-900 dark:text-white">São Paulo, BR</p>
                    </div>
                    <Globe size={24} className="text-gray-400 dark:text-gray-600" />
                </div>
             </div>

           </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section id="experience" className="py-16 bg-gray-50/50 dark:bg-darkCard/30">
        <div className="container mx-auto max-w-4xl px-6">
           <SectionHeader title={content.experience.title} subtitle={content.experience.subtitle} centered={false} />
           
           <div className="mt-12 space-y-8 pl-4">
              {getExperience(lang).map((exp, i) => (
                <div key={i} className="relative pl-8 border-l border-gray-200 dark:border-white/10 pb-8 last:pb-0 last:border-0">
                   <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary" />
                   
                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-gray-100">{exp.title}</h3>
                      <span className="text-xs font-mono text-primary/80 mt-1 sm:mt-0">
                        {exp.period}
                      </span>
                   </div>
                   
                   <div className="flex items-center gap-1.5 mb-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                      {exp.company}
                   </div>
                   
                   <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
                      {exp.description}
                   </p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Projects Grid - More Compact */}
      <section id="projects" className="py-16">
        <div className="container mx-auto max-w-6xl px-6">
           <SectionHeader title={content.projects.title} subtitle={content.projects.subtitle} />
           
           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getProjects(lang).map((project, idx) => (
                <motion.div
                   key={idx}
                   whileHover={{ y: -5 }}
                   className="group bg-white dark:bg-darkCard rounded-xl overflow-hidden border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-all duration-300"
                >
                    <div className="h-40 overflow-hidden relative">
                        <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                            {project.link && (
                                <a href={project.link} target="_blank" rel="noreferrer" className="text-white flex items-center gap-2 text-sm font-bold border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
                                    View Data <ExternalLink size={14} />
                                </a>
                            )}
                        </div>
                    </div>
                    
                    <div className="p-5">
                        <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors text-slate-900 dark:text-white">{project.title}</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                        {project.description}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] uppercase font-bold px-1.5 py-0.5 bg-gray-100 dark:bg-white/5 rounded text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-white/5">
                                {tag}
                            </span>
                        ))}
                        </div>
                    </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Compact List for Education & Certifications */}
      <section id="certifications" className="py-16 bg-gray-50/50 dark:bg-darkCard/30">
         <div className="container mx-auto max-w-5xl px-6">
            <div className="grid lg:grid-cols-2 gap-12">
               
               <div>
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                     <GraduationCap className="text-primary" size={20} /> {content.education.title}
                  </h3>
                  <div className="space-y-4">
                     {getEducation(lang).map((edu, idx) => (
                        <div key={idx} className="flex gap-4 group">
                           <div className="w-16 h-16 flex-shrink-0 bg-white dark:bg-[#202025] p-1 rounded-lg border border-gray-100 dark:border-white/5">
                              <img src={edu.logo} alt="logo" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity" />
                           </div>
                           <div>
                              <h4 className="font-bold text-sm text-slate-800 dark:text-gray-200">{edu.title}</h4>
                              <p className="text-xs text-gray-500 mb-0.5">{edu.institution} • {edu.period}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div>
                  <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                     <Award className="text-secondary" size={20} /> {content.certifications.title}
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                     {getCertifications(lang).map((cert, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-white dark:bg-darkCard rounded-lg border border-gray-100 dark:border-white/5 hover:border-secondary/30 transition-colors">
                            <div className="truncate pr-4">
                                <h4 className="font-bold text-xs text-slate-800 dark:text-gray-200 truncate">{cert.title}</h4>
                                <p className="text-[10px] uppercase tracking-wide text-gray-500">{cert.issuer}</p>
                            </div>
                            <span className="text-[10px] font-mono text-gray-400 whitespace-nowrap">
                                {cert.date}
                            </span>
                        </div>
                     ))}
                  </div>
               </div>

            </div>
         </div>
      </section>

      {/* Compact Contact */}
      <section id="contact" className="py-16">
         <div className="container mx-auto max-w-2xl px-6">
            <div className="bg-white dark:bg-darkCard border border-gray-200 dark:border-white/5 rounded-3xl p-8 text-center relative overflow-hidden shadow-lg dark:shadow-none">
               <div className="hidden dark:block absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[60px]" />
               
               <h2 className="text-2xl md:text-3xl font-bold font-display mb-3 text-slate-900 dark:text-white relative z-10">
                  {content.contact.title}
               </h2>
               <p className="text-sm text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto relative z-10">
                  {content.contact.subtitle}
               </p>

               <form onSubmit={handleFormSubmit} className="space-y-3 text-left relative z-10">
                  <div className="grid md:grid-cols-2 gap-3">
                     <input type="text" name="name" placeholder={content.contact.formName} required
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors text-slate-900 dark:text-white" />
                     <input type="email" name="email" placeholder={content.contact.formEmail} required
                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors text-slate-900 dark:text-white" />
                  </div>
                  <textarea name="message" rows={3} placeholder={content.contact.formMessage} required
                     className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none text-slate-900 dark:text-white" />
                  
                  <button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg text-sm transition-colors shadow-lg shadow-primary/20">
                     {formStatus === 'sending' ? content.contact.sending : content.contact.btnSend}
                  </button>
                  {formStatus === 'success' && <p className="text-green-500 dark:text-green-400 text-xs text-center">{content.contact.success}</p>}
               </form>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="py-6 border-t border-gray-200 dark:border-white/5 text-center">
         <p className="text-gray-500 text-xs">
            {content.footer.rights}
         </p>
      </footer>
    </div>
  );
};

export default App;