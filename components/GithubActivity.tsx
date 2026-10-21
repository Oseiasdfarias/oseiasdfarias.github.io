import React, { useEffect, useMemo, useState, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Language } from '../types';

// ─── Ritmo de trabalho (dados do GitHub, visual próprio) ─────────────────────
// Lê public/data/github.json (gerado por scripts/github-stats.mjs via `gh` no
// predeploy). Uma única série: contribuições por semana nos últimos 12 meses.

type GithubData = {
  generatedAt: string;
  login: string;
  year: { total: number; commits: number; pullRequests: number; reposContributed: number; private: number };
  calendar: [string, number][][];
  topRepos: { name: string; url: string; commits: number }[];
  languages: { name: string; pct: number }[];
};

const MONO = "'JetBrains Mono', 'IBM Plex Mono', monospace";
const SANS = "'Plus Jakarta Sans', -apple-system, sans-serif";
const caps = (size: number, extra?: CSSProperties): CSSProperties => ({
  fontFamily: SANS, fontSize: size, fontWeight: 500, textTransform: 'uppercase',
  letterSpacing: '.24em', color: 'var(--fg-soft)', ...extra,
});

// Geometria do gráfico (viewBox; escala com a largura)
const VW = 720, VH = 120, PAD_T = 18, PAD_B = 18;

export const GithubActivity: React.FC<{ lang: Language }> = ({ lang }) => {
  const pt = lang === 'pt';
  const loc = pt ? 'pt-BR' : 'en-US';
  const [data, setData] = useState<GithubData | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`${import.meta.env.BASE_URL}data/github.json`, { cache: 'no-cache' })
      .then(r => (r.ok ? r.json() : null))
      .then(d => { if (alive && d) setData(d); })
      .catch(() => { /* sem snapshot: a seção não aparece */ });
    return () => { alive = false; };
  }, []);

  const weeks = useMemo(() => (data?.calendar ?? []).map(w => ({
    start: w[0][0],
    total: w.reduce((a, d) => a + d[1], 0),
  })), [data]);

  if (!data || weeks.length < 2) return null;

  const nf = (n: number) => n.toLocaleString(loc);
  const fmt = (d: string, o: Intl.DateTimeFormatOptions) => new Date(d + 'T00:00:00').toLocaleDateString(loc, o);

  const max = Math.max(...weeks.map(w => w.total), 1);
  const peak = weeks.reduce((b, w, i) => (w.total > weeks[b].total ? i : b), 0);
  const x = (i: number) => (i / (weeks.length - 1)) * VW;
  const y = (v: number) => PAD_T + (1 - v / max) * (VH - PAD_T - PAD_B);
  const line = weeks.map((w, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(w.total).toFixed(1)}`).join(' ');
  const area = `${line} L${VW} ${VH - PAD_B} L0 ${VH - PAD_B} Z`;

  // marcas de mês discretas no eixo (meses alternados)
  const ticks: { x: number; label: string }[] = [];
  weeks.forEach((w, i) => {
    const m = new Date(w.start + 'T00:00:00').getMonth();
    const pm = i ? new Date(weeks[i - 1].start + 'T00:00:00').getMonth() : -1;
    if (m !== pm && i > 0 && i < weeks.length - 2 && m % 2 === 0) ticks.push({ x: x(i), label: fmt(w.start, { month: 'short' }).replace('.', '') });
  });

  const focus = hover ?? peak;
  const top = data.topRepos[0];
  const langs = data.languages.slice(0, 2).map(l => l.name).join(' · ');
  const updated = new Date(data.generatedAt).toLocaleDateString(loc, { day: '2-digit', month: 'short', year: 'numeric' });

  // tabela acessível por mês (alternativa ao gráfico)
  const months = new Map<string, number>();
  weeks.forEach(w => { const k = w.start.slice(0, 7); months.set(k, (months.get(k) ?? 0) + w.total); });

  return (
    <div className="pulse">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, flexWrap: 'wrap', marginBottom: 'clamp(18px,3vw,28px)' }}>
        <div style={caps(10)}>
          <span style={{ color: 'var(--accent)' }}>{pt ? 'Ritmo' : 'Cadence'}</span>
          <span style={{ margin: '0 10px', opacity: 0.5 }}>—</span>
          {pt ? 'contribuições por semana · 12 meses' : 'weekly contributions · 12 months'}
        </div>
        <a href={`https://github.com/${data.login}`} target="_blank" rel="noreferrer" className="reglink"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
          GitHub <ArrowUpRight size={13} />
        </a>
      </div>

      <div className="pulse-grid" style={{ display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr)', gap: 'clamp(20px,4vw,56px)', alignItems: 'end' }}>
        {/* Número principal */}
        <div>
          <div style={{ fontFamily: SANS, fontSize: 'clamp(44px,5vw,64px)', fontWeight: 600, letterSpacing: '-.04em', lineHeight: 0.9 }}>
            {nf(data.year.total)}
          </div>
          <div style={{ fontSize: 14, color: 'var(--fg-muted)', marginTop: 10 }}>
            {pt ? 'contribuições no último ano' : 'contributions in the last year'}
          </div>
        </div>

        {/* Linha semanal */}
        <div style={{ position: 'relative', paddingTop: 22 }}>
          <div aria-hidden="true" style={{
            position: 'absolute', top: 0, right: 0, fontFamily: MONO, fontSize: 10.5, color: 'var(--fg-soft)', whiteSpace: 'nowrap',
          }}>
            {hover !== null ? (pt ? 'semana de ' : 'week of ') : (pt ? 'pico · semana de ' : 'peak · week of ')}
            {fmt(weeks[focus].start, { day: '2-digit', month: 'short' })}
            {' · '}<span style={{ color: 'var(--fg)' }}>{weeks[focus].total}</span>
          </div>
          <motion.div style={{ position: 'relative' }}
            initial={{ clipPath: 'inset(-20px 100% -20px 0)' }} whileInView={{ clipPath: 'inset(-20px 0% -20px 0)' }}
            viewport={{ once: true }} transition={{ duration: 1.4, ease: [0.2, 0.7, 0.2, 1] }}>
            <svg viewBox={`0 0 ${VW} ${VH}`} width="100%" preserveAspectRatio="none" role="img"
              style={{ display: 'block', height: 'clamp(90px,12vw,120px)', overflow: 'visible' }}
              aria-label={pt
                ? `Contribuições por semana nos últimos 12 meses; pico de ${weeks[peak].total} na semana de ${fmt(weeks[peak].start, { day: '2-digit', month: 'long' })}.`
                : `Weekly contributions over the last 12 months; peak of ${weeks[peak].total} in the week of ${fmt(weeks[peak].start, { day: '2-digit', month: 'long' })}.`}
              onMouseLeave={() => setHover(null)}>
              <line x1="0" x2={VW} y1={VH - PAD_B} y2={VH - PAD_B} stroke="var(--line)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <path d={area} fill="var(--series)" fillOpacity="0.07" />
              <path d={line} fill="none" stroke="var(--series)" strokeWidth="2"
                strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
              <line x1={x(focus)} x2={x(focus)} y1={PAD_T - 6} y2={VH - PAD_B} stroke="var(--fg-soft)" strokeWidth="1"
                strokeDasharray="2 3" vectorEffect="non-scaling-stroke" opacity={hover !== null ? 0.8 : 0.4} />
              {/* áreas de hover maiores que a marca */}
              {weeks.map((_, i) => (
                <rect key={i} x={x(i) - VW / weeks.length / 2} y="0" width={VW / weeks.length} height={VH}
                  fill="transparent" onMouseEnter={() => setHover(i)} />
              ))}
            </svg>
            {/* ponto e rótulos em HTML para não deformar com preserveAspectRatio="none" */}
            <span aria-hidden="true" style={{
              position: 'absolute', left: `${(x(focus) / VW) * 100}%`, top: `${(y(weeks[focus].total) / VH) * 100}%`,
              width: 9, height: 9, borderRadius: 999, transform: 'translate(-50%,-50%)',
              background: 'var(--series)', boxShadow: '0 0 0 2px var(--bg)', pointerEvents: 'none',
              transition: 'left .12s ease, top .12s ease',
            }} />
            {ticks.map(t => (
              <span key={t.x} aria-hidden="true" style={{
                position: 'absolute', left: `${(t.x / VW) * 100}%`, bottom: 0, transform: 'translate(-50%, 2px)',
                fontFamily: MONO, fontSize: 9.5, color: 'var(--fg-soft)', pointerEvents: 'none',
              }}>{t.label}</span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Linha de contexto */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '6px 22px', marginTop: 'clamp(18px,3vw,26px)',
        paddingTop: 16, borderTop: '1px solid var(--line)', fontSize: 13, color: 'var(--fg-muted)',
      }}>
        <span><strong style={{ color: 'var(--fg)', fontWeight: 600 }}>{nf(data.year.commits)}</strong> {pt ? 'commits públicos' : 'public commits'}</span>
        <span><strong style={{ color: 'var(--fg)', fontWeight: 600 }}>{nf(data.year.pullRequests)}</strong> pull requests</span>
        <span><strong style={{ color: 'var(--fg)', fontWeight: 600 }}>{nf(data.year.reposContributed)}</strong> {pt ? 'repositórios' : 'repositories'}</span>
        {top && (
          <span>{pt ? 'mais ativo em ' : 'most active in '}
            <a href={top.url} target="_blank" rel="noreferrer" className="reglink">{top.name.split('/')[1]}</a>
          </span>
        )}
        {langs && <span>{langs}</span>}
        <span style={{ marginLeft: 'auto', fontFamily: MONO, fontSize: 10.5, color: 'var(--fg-soft)', alignSelf: 'center' }}>
          {pt ? `atualizado em ${updated}` : `updated ${updated}`}
        </span>
      </div>

      {/* Alternativa em tabela para leitores de tela */}
      <table className="sr-only">
        <caption>{pt ? 'Contribuições por mês' : 'Contributions per month'}</caption>
        <tbody>
          {[...months].map(([k, v]) => (
            <tr key={k}><th scope="row">{fmt(k + '-01', { month: 'long', year: 'numeric' })}</th><td>{v}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
