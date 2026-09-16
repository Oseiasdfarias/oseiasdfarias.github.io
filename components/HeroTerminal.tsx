import React from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '../hooks/useAnimations';

const LINES = [
  '$ kubectl rollout status deploy/lunella-api',
  '✓  deployment "lunella-api" successfully rolled out',
  '$ mlflow experiments list --view active',
  '✓  3 experiments · best run: f1=0.97',
  '$ docker compose up -d --scale worker=4',
  '✓  4 containers started · 0 errors',
];

const LINE_COLORS: Record<number, string> = {
  1: 'var(--running)',
  3: 'var(--running)',
  5: 'var(--running)',
};

const HeroTerminal: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const { ref, displayedLines, partial, done } = useTypewriter(LINES, 32, 220);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        background: darkMode ? '#0a0f1c' : '#f8fbff',
        border: `1px solid ${darkMode ? 'rgba(56,189,248,0.18)' : 'rgba(3,105,161,0.2)'}`,
        borderRadius: 12,
        padding: '20px 24px',
        marginTop: 36,
        marginBottom: 40,
        maxWidth: 540,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Terminal header bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 18 }}>
        {['#ff5f57','#febc2e','#28c840'].map(c => (
          <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />
        ))}
        <span style={{
          marginLeft: 8, fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
          color: darkMode ? 'rgba(56,189,248,0.5)' : 'rgba(3,105,161,0.5)',
          letterSpacing: '.06em',
        }}>
          bash — backend@prod
        </span>
      </div>

      {/* Command lines */}
      <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 12.5, lineHeight: 1.85, minHeight: 132 }}>
        {displayedLines.map((line, i) => (
          <div key={i} style={{ color: LINE_COLORS[i] ?? (darkMode ? '#94a3b8' : '#475569') }}>
            {line}
          </div>
        ))}
        {!done && (
          <div style={{ color: darkMode ? '#94a3b8' : '#475569' }}>
            {partial}
            <span className="tw-cursor" style={{ color: 'var(--accent)', fontWeight: 700 }}>█</span>
          </div>
        )}
      </div>

      {/* Blueprint corner accent */}
      <div style={{
        position: 'absolute', bottom: 14, right: 16,
        fontFamily: '"JetBrains Mono", monospace', fontSize: 9.5,
        color: darkMode ? 'rgba(56,189,248,0.3)' : 'rgba(3,105,161,0.3)',
        letterSpacing: '.08em',
      }}>
        prod · ap-southeast-1
      </div>
    </motion.div>
  );
};

export default HeroTerminal;
