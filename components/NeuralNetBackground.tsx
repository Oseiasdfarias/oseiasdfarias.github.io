import React from 'react';

const NeuralNetBackground: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
  const rgb = darkMode ? '56,189,248' : '3,105,161';

  return (
    <div aria-hidden style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {/* Blueprint graph-paper grid — major lines every 80px, minor every 16px */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: [
          `linear-gradient(rgba(${rgb},${darkMode ? 0.055 : 0.065}) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(${rgb},${darkMode ? 0.055 : 0.065}) 1px, transparent 1px)`,
          `linear-gradient(rgba(${rgb},${darkMode ? 0.022 : 0.03}) 1px, transparent 1px)`,
          `linear-gradient(90deg, rgba(${rgb},${darkMode ? 0.022 : 0.03}) 1px, transparent 1px)`,
        ].join(', '),
        backgroundSize: '80px 80px, 80px 80px, 16px 16px, 16px 16px',
      }} />

      {/* Top spotlight — directional light from above */}
      <div style={{
        position: 'absolute', inset: 0,
        background: darkMode
          ? 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(56,189,248,0.15) 0%, transparent 65%)'
          : 'radial-gradient(ellipse 80% 50% at 50% -5%, rgba(3,105,161,0.09) 0%, transparent 65%)',
      }} />

      {/* Engineering drawing corner marks */}
      {[
        { top: 16, left: 16 } as React.CSSProperties,
        { top: 16, right: 16 } as React.CSSProperties,
        { bottom: 16, left: 16 } as React.CSSProperties,
        { bottom: 16, right: 16 } as React.CSSProperties,
      ].map((pos, i) => (
        <div key={i} style={{ position: 'absolute', width: 24, height: 24, ...pos }}>
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: `rgba(${rgb},0.22)` }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, background: `rgba(${rgb},0.22)` }} />
        </div>
      ))}
    </div>
  );
};

export default NeuralNetBackground;
