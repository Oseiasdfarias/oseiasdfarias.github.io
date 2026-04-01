import React from 'react';
import { ArrowUpRight } from 'lucide-react';

// Button component — kept for backwards compatibility, new design uses inline styles
export const Button: React.FC<{
  children: React.ReactNode;
  variant?: 'primary' | 'outline';
  onClick?: () => void;
  href?: string;
  className?: string;
}> = ({ children, variant = 'primary', onClick, href, className = '' }) => {
  const base = "inline-flex items-center gap-2 font-mono font-bold text-sm border rounded-lg px-5 py-2.5 transition-all duration-200 group";
  const variants = {
    primary: "text-navy bg-accent border-accent hover:bg-accent/90",
    outline: "text-accent border-accent/40 hover:bg-accent/10",
  };
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noreferrer" className={cls}>
        {children}
        <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
      </a>
    );
  }

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
};

// SectionHeader — kept for backwards compat (unused in new design)
export const SectionHeader: React.FC<{ title: string; subtitle?: string; centered?: boolean }> = ({
  title, subtitle, centered = true,
}) => (
  <div className={`mb-12 ${centered ? 'text-center' : 'text-left'}`}>
    <h2 className="text-2xl font-bold font-display text-lightestSlate mb-2">{title}</h2>
    {subtitle && <p className="text-sm text-slate">{subtitle}</p>}
  </div>
);

// Card component
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`bg-navyCard border border-navyBorder rounded-xl p-6 hover:border-accent/30 transition-colors duration-300 ${className}`}>
    {children}
  </div>
);
