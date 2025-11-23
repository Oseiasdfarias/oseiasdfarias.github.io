import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Moon, Sun, Github, Linkedin, Youtube, Mail, MapPin, Phone, 
  Code2, Database, Terminal, Cloud, Cpu, Globe, BookOpen, Download,
  ExternalLink, Menu, X, ChevronUp
} from 'lucide-react';
import { translations, getProjects, getExperience, getEducation } from './content';
import { Language } from './types';
import { SectionHeader, Card, Button } from './components/UIComponents';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('pt');
  const [darkMode, setDarkMode] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const content = translations[lang];

  // Initialize Theme and Language
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

  // Typewriter effect logic
  const [typedText, setTypedText] = useState('');
  const [typeIndex, setTypeIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentString = content.hero.typed[textIndex];
    const typeSpeed = isDeleting ? 50 : 100;
    
    const timeout = setTimeout(() => {
      if (!isDeleting && typeIndex < currentString.length) {
        setTypedText(currentString.substring(0, typeIndex + 1));
        setTypeIndex(prev => prev + 1);
      } else if (isDeleting && typeIndex > 0) {
        setTypedText(currentString.substring(0, typeIndex - 1));
        setTypeIndex(prev => prev - 1);
      } else if (!isDeleting && typeIndex === currentString.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && typeIndex === 0) {
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % content.hero.typed.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, textIndex, content.hero.typed]);

  // Handle Contact Form
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
    { key: 'skills', label: content.nav.skills },
    { key: 'projects', label: content.nav.projects },
    { key: 'experience', label: content.nav.experience },
    { key: 'education', label: content.nav.education },
    { key: 'contact', label: content.nav.contact },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] text-slate-800 dark:text-gray-300 font-sans overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-[#0a0a0f]/90 backdrop-blur-lg border-b border-gray-200 dark:border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#home" className="text-4xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
            φséias
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a 
                key={link.key}
                href={`#${link.key}`}
                className="text-sm font-medium hover:text-primary transition-colors uppercase tracking-wider"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={toggleLang}
              className="px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-xs font-bold hover:border-primary hover:text-primary transition-colors"
            >
              {lang.toUpperCase()}
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-colors"
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button 
              onClick={toggleLang}
              className="px-2 py-1 text-xs font-bold border border-gray-300 dark:border-gray-700 rounded"
            >
              {lang.toUpperCase()}
            </button>
            <button onClick={toggleTheme}>
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white dark:bg-[#151520] border-b border-gray-200 dark:border-white/10 overflow-hidden"
            >
              <div className="flex flex-col p-6 gap-4">
                {navLinks.map(link => (
                  <a 
                    key={link.key}
                    href={`#${link.key}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium hover:text-primary"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 opacity-50" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] -z-10 opacity-50" />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 pt-4 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
              {content.hero.badge}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-slate-900 dark:text-white mb-6 leading-tight">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {typedText}
              </span>
              <span className="animate-pulse">|</span>
            </h1>
            <p className="text-1lg md:text-1xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-xl">
              {content.hero.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center items-center sm:justify-start sm:items-start">
              <Button onClick={() => document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'})}>
                {content.hero.btnPrimary}
              </Button>
              <Button variant="outline" href="https://drive.google.com/file/d/1-oMiFFC3QAbU6JhIeo6svznmm1pWMtzW/view">
                <Download size={18} className="mr-2" />
                {content.hero.btnOutline}
              </Button>
            </div>
            <div className="flex gap-5 mt-10 justify-center items-center sm:justify-start sm:items-start">
              {[
                { icon: Linkedin, href: "https://www.linkedin.com/in/oseiasfarias/" },
                { icon: Github, href: "https://github.com/oseiasdfarias/" },
                { icon: BookOpen, href: "https://oseiasfarias.medium.com" },
                { icon: Youtube, href: "https://youtube.com/@oseiasdfarias" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center md:justify-end"
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-primary blur-3xl opacity-20 animate-pulse" />
              <img 
                src="assets/images/logo2.jpg" 
                alt="Oséias Farias" 
                className="relative w-full h-full object-cover rounded-full border-4 border-white/10 shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://github.com/oseiasdfarias.png';
                }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white dark:bg-[#0a0a0f]">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader title={content.about.title} subtitle={content.about.subtitle} />
          <Card className="text-1lg leading-relaxed text-gray-600 dark:text-gray-300">
            {content.about.description.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
            ))}
          </Card>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 bg-gray-50 dark:bg-[#151520]">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title={content.skills.title} subtitle={content.skills.subtitle} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Java & Spring", icon: Code2, color: "text-red-500" },
              { name: "Python & FastAPI", icon: Terminal, color: "text-blue-500" },
              { name: "SQL (MySQL/PG)", icon: Database, color: "text-yellow-500" },
              { name: "Docker/K8s", icon: Cloud, color: "text-blue-400" },
              { name: "AWS Cloud", icon: Globe, color: "text-orange-500" },
              { name: "AI/ML", icon: Cpu, color: "text-purple-500" }
            ].map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-[#0a0a0f] p-6 rounded-xl border border-gray-200 dark:border-white/5 hover:border-primary transition-colors flex flex-col items-center text-center gap-3 group"
              >
                <div className={`p-3 rounded-lg bg-gray-50 dark:bg-white/5 group-hover:scale-110 transition-transform ${skill.color}`}>
                  <skill.icon size={32} />
                </div>
                <span className="font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <SectionHeader title={content.projects.title} subtitle={content.projects.subtitle} />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getProjects(lang).map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="h-full flex flex-col p-0 overflow-hidden group">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-60 transition-opacity z-10" />
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noreferrer"
                      className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <div className="bg-white text-primary rounded-full p-3 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <ExternalLink size={24} />
                      </div>
                    </a>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience & Education Grid */}
      <section id="experience" className="py-24 bg-gray-50 dark:bg-[#151520]">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
          
          {/* Experience */}
          <div>
            <SectionHeader title={content.experience.title} subtitle={content.experience.subtitle} centered={false} />
            <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:h-full before:w-[2px] before:bg-gray-200 dark:before:bg-white/10">
              {getExperience(lang).map((exp, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white dark:bg-[#151520] border-2 border-primary flex items-center justify-center text-primary z-10">
                    {exp.icon === 'work' ? <Code2 size={18} /> : <BookOpen size={18} />}
                  </div>
                  <Card className="p-5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">{exp.period}</span>
                    <h3 className="text-lg font-bold mt-1">{exp.title}</h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">{exp.company}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{exp.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div id="education">
            <SectionHeader title={content.education.title} subtitle={content.education.subtitle} centered={false} />
            <div className="space-y-6">
              {getEducation(lang).map((edu, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="flex items-start gap-4 p-4">
                    <div className="w-12 h-12 rounded-lg bg-white p-1 flex-shrink-0 border border-gray-200 dark:border-transparent">
                      <img src={edu.logo} alt={edu.institution} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-bold">{edu.title}</h3>
                      <p className="text-sm text-primary font-medium">{edu.institution}</p>
                      <p className="text-xs text-gray-500 mt-1 mb-2">{edu.period}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{edu.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
         {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6">
          <SectionHeader title={content.contact.title} subtitle={content.contact.subtitle} />
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Mail, text: "oseias.dfarias@gmail.com" },
              { icon: Phone, text: "+55 (94) 98107-3474" },
              { icon: MapPin, text: "São Paulo, Brasil" }
            ].map((contact, idx) => (
              <Card key={idx} className="flex flex-col items-center text-center p-6">
                <contact.icon className="text-primary mb-3" size={24} />
                <p className="text-sm font-medium">{contact.text}</p>
              </Card>
            ))}
          </div>

          <Card className="p-8">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">{content.contact.formName}</label>
                  <input 
                    type="text" 
                    name="name" 
                    required 
                    className="w-full bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">{content.contact.formEmail}</label>
                  <input 
                    type="email" 
                    name="email" 
                    required 
                    className="w-full bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold uppercase tracking-wider text-gray-500">{content.contact.formMessage}</label>
                <textarea 
                  name="message" 
                  required 
                  rows={5}
                  className="w-full bg-gray-50 dark:bg-[#0a0a0f] border border-gray-200 dark:border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>

              <Button className="w-full">
                {formStatus === 'sending' ? content.contact.sending : content.contact.btnSend}
              </Button>
              
              {formStatus === 'success' && (
                <div className="text-green-500 text-center font-medium animate-fade-in">
                  {content.contact.success}
                </div>
              )}
              {formStatus === 'error' && (
                <div className="text-red-500 text-center font-medium animate-fade-in">
                  {content.contact.error}
                </div>
              )}
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-[#151520] border-t border-gray-200 dark:border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold font-display bg-gradient-primary bg-clip-text text-transparent">
            φséias Farias
          </div>
          <p className="text-gray-500 text-sm text-center md:text-right">
            {content.footer.rights}
          </p>
        </div>
      </footer>

      {/* Scroll to Top */}
      <a 
        href="#home"
        className="fixed bottom-8 right-8 p-3 bg-primary text-white rounded-full shadow-lg hover:scale-110 transition-transform z-40"
        aria-label="Scroll to top"
      >
        <ChevronUp size={24} />
      </a>

    </div>
  );
};

export default App;