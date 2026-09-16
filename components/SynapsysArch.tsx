import React from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  x: number; y: number; w: number; h: number;
  label: string;
  variant?: 'main' | 'running' | 'processing' | 'default';
}

interface Edge {
  d: string;
  delay: number;
}

const W = 440;
const H = 280;
const R = 6;

const NODES: Node[] = [
  { id: 'user',    x: 170, y: 8,   w: 100, h: 28, label: 'User Code',      variant: 'default'     },
  { id: 'core',    x: 100, y: 72,  w: 240, h: 34, label: 'Synapsys Core',  variant: 'main'        },
  { id: 'llm',     x: 16,  y: 152, w: 100, h: 28, label: 'LLM Provider',   variant: 'processing'  },
  { id: 'tools',   x: 170, y: 152, w: 100, h: 28, label: 'Tool Executor',  variant: 'running'     },
  { id: 'memory',  x: 324, y: 152, w: 100, h: 28, label: 'Memory Store',   variant: 'default'     },
  { id: 'zeromq',  x: 145, y: 228, w: 150, h: 28, label: 'ZeroMQ / IPC',   variant: 'default'     },
];

const EDGES: Edge[] = [
  { d: 'M 220 36 L 220 72',                    delay: 0.05 },  // user → core
  { d: 'M 220 106 Q 220 140 66 152',           delay: 0.2  },  // core → llm
  { d: 'M 220 106 L 220 152',                  delay: 0.2  },  // core → tools
  { d: 'M 220 106 Q 220 140 374 152',          delay: 0.2  },  // core → memory
  { d: 'M 220 180 L 220 228',                  delay: 0.38 },  // tools → zeromq
];

const variantStyle: Record<string, { fill: string; stroke: string; color: string }> = {
  main:       { fill: 'var(--accent-soft)',  stroke: 'var(--accent)',        color: 'var(--accent)'   },
  running:    { fill: 'rgba(52,211,153,.07)', stroke: 'rgba(52,211,153,.4)', color: 'var(--running)'  },
  processing: { fill: 'rgba(251,191,36,.07)', stroke: 'rgba(251,191,36,.4)', color: 'var(--processing)'},
  default:    { fill: 'var(--node-bg)',       stroke: 'var(--accent-border)', color: 'var(--fg-muted)' },
};

const SynapsysArch: React.FC = () => (
  <svg
    viewBox={`0 0 ${W} ${H}`}
    width="100%"
    style={{ overflow: 'visible', maxWidth: W }}
    aria-label="Synapsys architecture diagram"
  >
    {/* Edges — draw-in animation */}
    {EDGES.map((edge, i) => (
      <motion.path
        key={i}
        d={edge.d}
        fill="none"
        stroke="var(--accent-border)"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.5, delay: edge.delay, ease: 'easeInOut' }}
      />
    ))}

    {/* Arrow heads */}
    {[
      { x: 220, y: 70 },
      { x: 64,  y: 150 },
      { x: 220, y: 150 },
      { x: 376, y: 150 },
      { x: 220, y: 226 },
    ].map((p, i) => (
      <motion.polygon
        key={i}
        points={`${p.x - 4},${p.y} ${p.x + 4},${p.y} ${p.x},${p.y + 6}`}
        fill="var(--accent-border)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.25, delay: EDGES[i]?.delay + 0.45 }}
      />
    ))}

    {/* Nodes */}
    {NODES.map((node, i) => {
      const s = variantStyle[node.variant ?? 'default'];
      const delay = [0, 0.12, 0.32, 0.32, 0.32, 0.52][i] ?? i * 0.1;
      return (
        <motion.g
          key={node.id}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.4, delay, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <rect
            x={node.x} y={node.y} width={node.w} height={node.h} rx={R}
            fill={s.fill} stroke={s.stroke} strokeWidth={1}
          />
          <text
            x={node.x + node.w / 2} y={node.y + node.h / 2 + 4.5}
            textAnchor="middle"
            fontSize={10.5}
            fontFamily='"JetBrains Mono", monospace'
            fill={s.color}
          >
            {node.label}
          </text>
        </motion.g>
      );
    })}
  </svg>
);

export default SynapsysArch;
