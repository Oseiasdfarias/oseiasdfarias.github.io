import React, { useEffect, useState, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../types';

// ─── Artigos do Medium ───────────────────────────────────────────────────────
// Lê public/data/medium.json (gerado por scripts/medium-posts.mjs no predeploy).
// Os 3 mais recentes viram cards com capa; os demais, linhas editoriais.

type Post = {
  title: string; url: string; date: string; tags: string[];
  cover: string | null; excerpt: string; minutes: number;
  series: { part: number; total: number | null } | null;
};
type MediumData = { generatedAt: string; profile: string; posts: Post[] };

const MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const mono = (size: number, extra?: CSSProperties): CSSProperties => ({
  fontFamily: MONO, fontSize: size, letterSpacing: '.04em', ...extra,
});
const label = (size: number, extra?: CSSProperties): CSSProperties => ({
  fontFamily: MONO, fontSize: size, textTransform: 'uppercase', letterSpacing: '.18em',
  color: 'var(--fg-soft)', ...extra,
});
const pad = (n: number) => String(n).padStart(2, '0');

const SeriesTag: React.FC<{ s: NonNullable<Post['series']>; pt: boolean }> = ({ s, pt }) => (
  <span style={label(10, { color: 'var(--accent)', letterSpacing: '.14em' })}>
    {pt ? 'IA na Prática' : 'AI in Practice'} · {pad(s.part)}{s.total ? `/${s.total}` : ''}
  </span>
);

export const MediumPosts: React.FC<{ lang: Language }> = ({ lang }) => {
  const pt = lang === 'pt';
  const [data, setData] = useState<MediumData | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${import.meta.env.BASE_URL}data/medium.json`, { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (alive && d?.posts?.length) setData(d); })
      .catch(() => { /* sem snapshot: fica só o link para o perfil */ });
    return () => { alive = false; };
  }, []);

  if (!data) return null;
  const fmt = (iso: string) => new Date(iso).toLocaleDateString(pt ? 'pt-BR' : 'en-US',
    { day: '2-digit', month: 'short', year: 'numeric' }).replace(/\./g, '').replace(/ de /g, ' ').replace(',', '');
  const meta = (p: Post) => `${fmt(p.date)} · ${p.minutes} min`;
  const featured = data.posts.slice(0, 3);
  const rest = data.posts.slice(3);

  return (
    <div>
      <div className="writing-grid">
        {featured.map((p, i) => (
          <motion.a
            key={p.url} href={p.url} target="_blank" rel="noreferrer"
            className="mod writing-card"
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <span className="modbar" />
            <div className="writing-cover">
              {p.cover && <img src={p.cover} alt="" loading="lazy" decoding="async" referrerPolicy="no-referrer" />}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, margin: '18px 0 10px' }}>
              {p.series ? <SeriesTag s={p.series} pt={pt} /> : <span style={label(10)}>{p.tags[0] ?? 'Medium'}</span>}
              <span style={mono(10.5, { color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>{meta(p)}</span>
            </div>
            <h3 className="writing-title">{p.title}</h3>
            {p.excerpt && <p className="writing-excerpt">{p.excerpt}</p>}
            <span className="writing-read">
              {pt ? 'Ler no Medium' : 'Read on Medium'} <ArrowUpRight size={13} />
            </span>
          </motion.a>
        ))}
      </div>

      <div style={{ marginTop: 28 }}>
        {rest.map((p, i) => (
          <motion.a
            key={p.url} href={p.url} target="_blank" rel="noreferrer" className="writing-row"
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <span className="writing-row-date" style={mono(11, { color: 'var(--fg-soft)' })}>{fmt(p.date)}</span>
            <span className="writing-row-title">{p.title}</span>
            <span className="writing-row-meta" style={mono(11, { color: 'var(--fg-soft)' })}>
              {p.series ? <SeriesTag s={p.series} pt={pt} /> : p.tags.slice(0, 2).join(' · ')}
            </span>
            <ArrowUpRight size={15} className="writing-row-arrow" />
          </motion.a>
        ))}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 14, marginTop: 28 }}>
        <span style={label(10)}>
          {pt ? `${data.posts.length} artigos mais recentes` : `${data.posts.length} latest articles · in Portuguese`}
        </span>
        <a href={data.profile} target="_blank" rel="noreferrer" className="btn">
          {pt ? 'Todos os artigos' : 'All articles'} <ArrowUpRight size={14} />
        </a>
      </div>
    </div>
  );
};
