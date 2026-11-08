import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, BarChart3, Server, Globe, Cloud, Cpu, Code, Compass, ArrowUpRight } from 'lucide-react';
import { CertificationData, CertCategory, Language } from '../types';
import { getCertCategories } from '../content';

// ─── Certificados por subcategoria ───────────────────────────────────────────
// Chips filtram; em "Todos" os certificados aparecem agrupados, cada grupo com seu título.

const ICONS: Record<CertCategory, { Icon: React.ElementType; color: string }> = {
  ai:       { Icon: Brain,     color: 'var(--accent)' },
  data:     { Icon: BarChart3, color: 'var(--c-violet)' },
  backend:  { Icon: Server,    color: 'var(--c-amber)' },
  frontend: { Icon: Globe,     color: 'var(--c-red)' },
  cloud:    { Icon: Cloud,     color: 'var(--c-sky)' },
  embedded: { Icon: Cpu,       color: 'var(--c-teal)' },
  dev:      { Icon: Code,      color: 'var(--accent-2)' },
  career:   { Icon: Compass,   color: 'var(--fg-soft)' },
};

const MONTHS_EN: Record<string, string> = {
  jan: 'Jan', fev: 'Feb', mar: 'Mar', abr: 'Apr', mai: 'May', jun: 'Jun',
  jul: 'Jul', ago: 'Aug', set: 'Sep', out: 'Oct', nov: 'Nov', dez: 'Dec',
};
const MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";

export const Certifications: React.FC<{ certs: CertificationData[]; lang: Language }> = ({ certs, lang }) => {
  const pt = lang === 'pt';
  const cats = getCertCategories(lang);
  const [active, setActive] = useState<CertCategory | 'all'>('all');

  const groups = useMemo(
    () => cats
      .map(c => ({ ...c, items: certs.filter(x => (x.category ?? 'dev') === c.id) }))
      .filter(g => g.items.length > 0),
    [cats, certs],
  );
  const shown = active === 'all' ? groups : groups.filter(g => g.id === active);
  const date = (d: string) => (pt ? d : d.replace(/^[a-zç]{3}/i, m => MONTHS_EN[m.toLowerCase()] ?? m));

  return (
    <div>
      <div className="cert-chips" role="tablist" aria-label={pt ? 'Filtrar certificados' : 'Filter certificates'}>
        {([{ id: 'all' as const, label: pt ? 'Todos' : 'All', n: certs.length }, ...groups.map(g => ({ id: g.id, label: g.label, n: g.items.length }))]).map(c => (
          <button key={c.id} type="button" role="tab" aria-selected={active === c.id}
            className={`cert-chip${active === c.id ? ' is-on' : ''}`} onClick={() => setActive(c.id)}>
            {c.label} <span className="cert-chip-n">{String(c.n).padStart(2, '0')}</span>
          </button>
        ))}
      </div>

      {shown.map(g => {
        const { Icon, color } = ICONS[g.id];
        return (
          <div key={g.id} style={{ marginTop: 26 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12,
              fontFamily: MONO, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--fg-muted)',
            }}>
              <Icon size={14} style={{ color, flexShrink: 0 }} />
              <span>{g.label}</span>
              <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--line)' }} />
              <span style={{ color: 'var(--fg-soft)' }}>{String(g.items.length).padStart(2, '0')}</span>
            </div>
            <div className="cert-grid">
              {g.items.map((cert, i) => {
                const body = (
                  <>
                    <Icon size={15} style={{ color, flexShrink: 0, marginTop: 2 }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div className="cert-title">{cert.title}</div>
                      <div style={{ fontFamily: MONO, fontSize: 10, color: 'var(--fg-soft)', marginTop: 3 }}>{cert.issuer}</div>
                    </div>
                    <span style={{ fontFamily: MONO, fontSize: 10.5, color: 'var(--fg-soft)', whiteSpace: 'nowrap' }}>{date(cert.date)}</span>
                    {cert.link && <ArrowUpRight size={13} className="cert-arrow" />}
                  </>
                );
                return (
                  <motion.div key={cert.title}
                    initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-20px' }}
                    transition={{ duration: 0.4, delay: Math.min(i, 8) * 0.03 }}>
                    {cert.link
                      ? <a href={cert.link} target="_blank" rel="noreferrer" className="cert-card" title={cert.original}>{body}</a>
                      : <div className="cert-card is-static" title={cert.original}>{body}</div>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
