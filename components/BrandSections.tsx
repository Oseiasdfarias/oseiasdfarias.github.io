import React from 'react';
import { motion } from 'framer-motion';
import { Language } from '../types';
import { BrandMark } from './BrandMark';
import { BRANDS } from './brands';

// ─── Faixa "Onde atuei" ───────────────────────────────────────────────────────
// Logo (ou nome, quando não há arquivo público) + legenda com o papel.
// `word` aparece ao lado do logo quando o arquivo é só o símbolo, sem o nome.

type TrustItem = { id?: string; word?: string; h?: number; cap: [string, string] };

const TRUST: TrustItem[] = [
  { id: 'ufabc', h: 52, cap: ['Mestrado · pesquisa', 'M.Sc. · research'] },
  { id: 'afosr', h: 40, cap: ['Financiamento · EUA', 'Funding · U.S.'] },
  { id: 'ufpa', h: 44, word: 'UFPA', cap: ['Mestrado · graduação', 'M.Sc. · B.Sc.'] },
  { id: 'verzel', h: 26, word: 'Verzel', cap: ['Backend & IA', 'Backend & AI'] },
  { word: 'Lunella', cap: ['Agentes de IA', 'AI agents'] },
  { id: 'otensor', h: 30, word: 'Otensor', cap: ['Fundador', 'Founder'] },
  { id: 'piracanjuba', h: 34, cap: ['Engenharia', 'Engineering'] },
  { id: 'dow', h: 30, cap: ['Manutenção elétrica', 'Electrical maintenance'] },
  { id: 'eletrobras', h: 24, cap: ['Estágio · UHE Tucuruí', 'Intern · Tucuruí plant'] },
  { id: 'ibge', h: 28, cap: ['Pesquisa de campo', 'Field research'] },
  { id: 'udemy', h: 26, word: 'Udemy', cap: ['Instrutor', 'Instructor'] },
  { id: 'oracle-one', h: 34, cap: ['Formação · alumni', 'Training · alumni'] },
];

export const TrustBand: React.FC<{ lang: Language }> = ({ lang }) => {
  const pt = lang === 'pt';
  return (
    <div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase',
        color: 'var(--fg-soft)', marginBottom: 26, display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span>{pt ? 'Onde atuei' : "Where I've worked"}</span>
        <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <div className="trust-band">
        {TRUST.map((t, i) => (
          <motion.div key={t.word ?? t.id} className="trust-item brand-host"
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: i * 0.04 }}
          >
            <div className="trust-logo">
              {t.id && <BrandMark id={t.id} height={t.h ?? 32} />}
              {t.word && <span className="trust-word">{t.word}</span>}
            </div>
            <span className="trust-cap">{t.cap[pt ? 0 : 1]}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Stack ────────────────────────────────────────────────────────────────────
// As mesmas quatro frentes do Foco. Só ferramentas com logo; conceitos ficam nos chips.

const STACK: { k: [string, string]; ids: string[] }[] = [
  { k: ['ML & MLOps', 'ML & MLOps'], ids: ['python', 'pytorch', 'tensorflow', 'scikitlearn', 'mlflow', 'dvc', 'numpy', 'pandas', 'jupyter', 'opencv'] },
  { k: ['IA, agentes & APIs', 'AI, agents & APIs'], ids: ['openai', 'googlegemini', 'claude', 'cursor', 'vapi', 'elevenlabs', 'fastapi', 'pydantic', 'pytest', 'react'] },
  { k: ['Cloud, back-end & DevOps', 'Cloud, back end & DevOps'], ids: ['aws', 'docker', 'githubactions', 'linux', 'ubuntu', 'git', 'postgresql', 'redis', 'graphql', 'quarkus', 'java', 'vuedotjs'] },
  { k: ['Sistemas físicos', 'Physical systems'], ids: ['px4', 'aeropendulo', 'matlab', 'espressif', 'raspberrypi', 'arduino', 'mqtt', 'threedotjs'] },
];


export const StackGrid: React.FC<{ lang: Language }> = ({ lang }) => {
  const pt = lang === 'pt';
  return (
    <div style={{ marginTop: 'clamp(36px,5vw,56px)' }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase',
        color: 'var(--fg-soft)', marginBottom: 22, display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <span>{pt ? 'Stack do dia a dia' : 'Everyday stack'}</span>
        <span aria-hidden="true" style={{ flex: 1, height: 1, background: 'var(--line)' }} />
      </div>
      <div className="stack-groups">
        {STACK.map((g, gi) => (
          <motion.div key={g.k[0]}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.55, delay: gi * 0.06 }}
          >
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', marginBottom: 12,
              display: 'flex', justifyContent: 'space-between',
            }}>
              <span>{g.k[pt ? 0 : 1]}</span>
              <span style={{ color: 'var(--fg-soft)' }}>{String(g.ids.length).padStart(2, '0')}</span>
            </div>
            <div className="stack-tiles">
              {g.ids.map(id => (
                <div key={id} className="stack-tile brand-host">
                  <BrandMark id={id} height={id === 'aws' ? 34 : id === 'px4' ? 24 : id === 'aeropendulo' ? 34 : 28} maxWidth={64} />
                  <span className="stack-name">{BRANDS[id]?.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
