import React from 'react';
import { motion } from 'framer-motion';

export const SectionHeader: React.FC<{ title: string; subtitle: string; centered?: boolean }> = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold font-display bg-clip-text text-transparent bg-gradient-primary mb-3"
    >
      {title}
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
    >
      {subtitle}
    </motion.p>
  </div>
);

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-white/80 dark:bg-[#151520]/80 backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-2xl shadow-lg dark:shadow-none p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-primary/30 ${className}`}>
    {children}
  </div>
);

export const Button: React.FC<{ 
  children: React.ReactNode; 
  variant?: 'primary' | 'outline'; 
  onClick?: () => void;
  href?: string;
  className?: string;
}> = ({ children, variant = 'primary', onClick, href, className = '' }) => {
  const baseClasses = "inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-all duration-300 text-sm tracking-wide uppercase";
  const variants = {
    primary: "bg-gradient-primary text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5",
    outline: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white"
  };

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? "_blank" : "_self"} rel="noreferrer" className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};