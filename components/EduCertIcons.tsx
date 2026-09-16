import React from 'react';
import { 
  Brain, 
  Cloud, 
  Cpu, 
  Database, 
  Code, 
  GitBranch, 
  Award, 
  GraduationCap 
} from 'lucide-react';

interface EduLogoProps {
  id?: string;
  size?: number;
}

export const EduLogo: React.FC<EduLogoProps> = ({ id, size = 68 }) => {
  const [imgError, setImgError] = React.useState(false);

  // Mapeamento dos logos oficiais
  const logoMap: Record<string, { src: string; alt: string; badgeText: string; color: string; bg: string; border: string }> = {
    ufabc: {
      src: '/assets/logos/ufabc.png',
      alt: 'UFABC - Universidade Federal do ABC',
      badgeText: 'UFABC',
      color: '#00d4bc',
      bg: 'rgba(0, 100, 50, 0.15)',
      border: 'rgba(0, 160, 90, 0.35)',
    },
    ufpa: {
      src: '/assets/logos/ufpa.png',
      alt: 'UFPA - Universidade Federal do Pará',
      badgeText: 'UFPA',
      color: '#38bdf8',
      bg: 'rgba(11, 92, 173, 0.15)',
      border: 'rgba(11, 92, 173, 0.35)',
    },
    ifma: {
      src: '/assets/logos/instituto_federal.webp',
      alt: 'Instituto Federal',
      badgeText: 'IF',
      color: '#f87171',
      bg: 'rgba(239, 68, 68, 0.12)',
      border: 'rgba(239, 68, 68, 0.3)',
    },
    oracle: {
      src: '/assets/logos/oracle_one.png',
      alt: 'Oracle Next Education',
      badgeText: 'ONE',
      color: 'var(--accent)',
      bg: 'rgba(227, 169, 74, 0.15)',
      border: 'rgba(227, 169, 74, 0.35)',
    },
  };

  const item = id ? logoMap[id] : undefined;

  if (item && !imgError) {
    return (
      <div style={{
        height: size,
        minWidth: size * 1.4,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 16px',
        background: 'var(--bg2)',
        borderRadius: 8,
        border: '1px solid var(--line)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
      }}>
        <img
          src={item.src}
          alt={item.alt}
          onError={() => setImgError(true)}
          style={{
            maxHeight: size - 14,
            maxWidth: 130,
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </div>
    );
  }

  if (item) {
    return (
      <div style={{
        width: size, height: size * 0.75, borderRadius: 6,
        background: item.bg,
        border: `1px solid ${item.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: item.color, fontWeight: 700, fontFamily: "'IBM Plex Mono', monospace",
        fontSize: 13, letterSpacing: '-0.02em', flexShrink: 0
      }}>
        {item.badgeText}
      </div>
    );
  }

  return (
    <div style={{
      width: size, height: size * 0.75, borderRadius: 6,
      background: 'var(--bg2)', border: '1px solid var(--line)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'var(--fg-muted)', flexShrink: 0
    }}>
      <GraduationCap size={22} />
    </div>
  );
};

interface CertIconProps {
  category?: 'ai' | 'cloud' | 'embedded' | 'backend' | 'dev';
  title?: string;
  size?: number;
}

export const CertIcon: React.FC<CertIconProps> = ({ category, title = '', size = 15 }) => {
  const lower = title.toLowerCase();

  if (category === 'ai' || lower.includes('machine learning') || lower.includes('deep learning') || lower.includes('inteligência artificial') || lower.includes('yolo') || lower.includes('reforço')) {
    return <Brain size={size} style={{ color: 'var(--accent)', flexShrink: 0 }} />;
  }

  if (category === 'cloud' || lower.includes('aws') || lower.includes('cloud') || lower.includes('lambda')) {
    return <Cloud size={size} style={{ color: '#38bdf8', flexShrink: 0 }} />;
  }

  if (category === 'embedded' || lower.includes('embarcados') || lower.includes('rtos') || lower.includes('c++')) {
    return <Cpu size={size} style={{ color: '#00d4bc', flexShrink: 0 }} />;
  }

  if (category === 'backend' || lower.includes('spring') || lower.includes('java') || lower.includes('flask') || lower.includes('sql') || lower.includes('mysql') || lower.includes('rest')) {
    return <Database size={size} style={{ color: '#f59e0b', flexShrink: 0 }} />;
  }

  if (lower.includes('git') || lower.includes('github')) {
    return <GitBranch size={size} style={{ color: '#a855f7', flexShrink: 0 }} />;
  }

  if (lower.includes('python') || lower.includes('shell')) {
    return <Code size={size} style={{ color: 'var(--accent-2)', flexShrink: 0 }} />;
  }

  return <Award size={size} style={{ color: 'var(--fg-soft)', flexShrink: 0 }} />;
};

