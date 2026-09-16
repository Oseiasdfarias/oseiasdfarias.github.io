import React from 'react';
import { motion } from 'framer-motion';

export interface PipelineNode {
  label: string;
  variant?: 'running' | 'processing' | 'neutral';
}

const Arrow: React.FC<{ delay: number }> = ({ delay }) => (
  <motion.div
    initial={{ scaleX: 0, opacity: 0 }}
    whileInView={{ scaleX: 1, opacity: 1 }}
    viewport={{ once: true, margin: '-8%' }}
    transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
    style={{ display: 'flex', alignItems: 'center', transformOrigin: 'left', flexShrink: 0 }}
  >
    <div style={{ width: 18, height: 1, background: 'var(--accent-border)' }} />
    <div style={{
      width: 0, height: 0,
      borderTop: '3.5px solid transparent',
      borderBottom: '3.5px solid transparent',
      borderLeft: '5px solid var(--accent-border)',
      marginLeft: -0.5,
    }} />
  </motion.div>
);

const Node: React.FC<{ node: PipelineNode; delay: number }> = ({ node, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-8%' }}
    transition={{ duration: 0.4, delay, ease: [0.2, 0.7, 0.2, 1] }}
    className={`bp-node${node.variant ? ` bp-node--${node.variant}` : ''}`}
  >
    {node.label}
  </motion.div>
);

/** Renders one or more horizontal pipeline rows with animated draw-in arrows. */
const ArchPipeline: React.FC<{ rows: PipelineNode[][]; delay?: number }> = ({ rows, delay = 0 }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
    {rows.map((row, ri) => (
      <div key={ri} style={{
        display: 'flex', alignItems: 'center', gap: 6,
        flexWrap: 'nowrap', overflowX: 'auto',
        paddingBottom: 2,
      }}>
        {row.map((node, ni) => (
          <React.Fragment key={ni}>
            {ni > 0 && <Arrow delay={delay + ri * 0.18 + ni * 0.11} />}
            <Node node={node} delay={delay + ri * 0.18 + ni * 0.09} />
          </React.Fragment>
        ))}
      </div>
    ))}
  </div>
);

export default ArchPipeline;
