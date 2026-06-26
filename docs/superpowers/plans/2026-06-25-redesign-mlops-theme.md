# Redesign Portfolio — Tema MLOps Editorial Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite completamente o portfólio (`App.tsx` + `index.html`) do layout atual (sidebar azul, Space Grotesk) para o novo design editorial MLOps (nav sticky, warm dark, Newsreader + IBM Plex Mono, acento vermilion #e8513a).

**Architecture:** A estrutura React/TypeScript é mantida, mas `App.tsx` é reescrito do zero seguindo o design em `Portfolio-MLOps.dc.html`. O sidebar é substituído por header sticky. As fontes e tokens de cor são substituídos por completo. Responsividade mobile é garantida via CSS classes no `index.html` e breakpoints.

**Tech Stack:** React 19, TypeScript, Framer Motion, Tailwind (utilities de layout), Newsreader + IBM Plex Mono (Google Fonts), CSS custom properties (design tokens).

## Global Constraints

- Manter `content.ts`, `types.ts`, `hooks/useAnimations.ts` intactos — eles não mudam.
- Manter `components/SynapsysArch.tsx` — usado na seção Open Source.
- Manter `components/ArchPipeline.tsx` — opcional na seção Focus.
- Remover `components/NeuralNetBackground.tsx` — substituído por CSS grid background.
- Remover `components/HeroTerminal.tsx` — substituído por SVG Pipeline DAG.
- Fonte display/body: `Newsreader` (serif). Fonte mono/labels: `IBM Plex Mono`.
- Acento padrão: `#e8513a` (vermilion). Light mode disponível.
- Sections numeradas §00–§07 seguindo o design de referência.
- Formulário de contato: manter endpoint `https://formsubmit.co/ajax/c110a49cc1ab534d2724eca67e130885`.
- CV URL: `https://drive.google.com/file/d/1-oMiFFC3QAbU6JhIeo6svznmm1pWMtzW/view`.

---

## Mapa de Arquivos

| Arquivo | Ação |
|---|---|
| `index.html` | Modificar — trocar fontes, adicionar CSS animations e breakpoints |
| `App.tsx` | Reescrever completamente |
| `components/NeuralNetBackground.tsx` | Remover referências (manter arquivo, não deletar) |
| `components/HeroTerminal.tsx` | Remover referências (manter arquivo, não deletar) |
| `components/ArchPipeline.tsx` | Manter — pode ser usado na seção Capabilities |
| `components/SynapsysArch.tsx` | Manter — usado na seção Open Source |
| `hooks/useAnimations.ts` | Manter intacto |
| `content.ts`, `types.ts` | Manter intactos |

---

## Task 1: Atualizar `index.html` — Fontes, Tokens CSS e Animations

**Files:**
- Modify: `index.html`

**O que muda:**
- Trocar `Space+Grotesk` e `Hanken+Grotesk` por `Newsreader` (serif) + `IBM+Plex+Mono` no link do Google Fonts
- Trocar `JetBrains+Mono` por `IBM+Plex+Mono`
- Adicionar animações CSS: `dashflow`, `nodepulse`, `livedot` (usadas no SVG hero e dots)
- Atualizar `.mod` hover pattern (barra deslizante no topo dos cards)
- Atualizar CSS breakpoints mobile para o novo layout (sem sidebar, com top nav)
- Adicionar background grid CSS (substitui NeuralNetBackground)

- [ ] **Step 1: Trocar link de fontes no `<head>`**

Substituir as linhas do Google Fonts existentes por:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Adicionar CSS animations e utilitários no `<style>` tag**

Dentro do `<style>` existente, adicionar (e remover os existentes que não se aplicam mais):
```css
/* Reset e base */
html { scroll-behavior: smooth; }
body { margin: 0; }
* { box-sizing: border-box; }
::selection { background: var(--accent); color: var(--bg); }
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--line-2); border: 3px solid var(--bg); }

/* Animations */
@keyframes dashflow { to { stroke-dashoffset: -26; } }
@keyframes nodepulse {
  0%,100% { opacity: .3; transform: scale(1); }
  50%      { opacity: .95; transform: scale(1.6); }
}
@keyframes livedot {
  0%,100% { box-shadow: 0 0 0 0 var(--accent); }
  50%      { box-shadow: 0 0 0 4px transparent; }
}
@keyframes ofpulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: .35; transform: scale(.7); }
}

/* Mod card hover pattern */
.mod { position: relative; transition: border-color .4s, background .4s; }
.mod:hover { border-color: var(--line-2) !important; }
.mod .modbar {
  position: absolute; top: -1px; left: -1px;
  height: 2px; width: 34px; background: var(--accent);
  transition: width .45s cubic-bezier(.2,.7,.2,1);
}
.mod:hover .modbar { width: calc(100% + 2px); }

/* Tag hover in mod cards */
.tagk { transition: border-color .3s, color .3s; }
.mod:hover .tagk { border-color: var(--line-2) !important; }

/* Nav link */
.navlink { color: var(--fg-muted); text-decoration: none; transition: color .25s; }
.navlink:hover { color: var(--accent); }

/* Reg link (inline text links) */
.reglink { color: var(--fg); text-decoration: none; border-bottom: 1px solid var(--accent); transition: background .25s, color .25s, padding .25s; }
.reglink:hover { background: var(--accent); color: var(--bg); padding: 0 3px; }

/* Button base */
.btnk { transition: background .25s, color .25s, transform .2s; cursor: pointer; }
.btnk:hover { transform: translateY(-1px); }
.invbtn:hover { background: var(--accent) !important; color: var(--bg) !important; border-color: var(--accent) !important; }

/* Progress bar */
#progress-bar {
  position: fixed; top: 0; left: 0; height: 2px;
  width: 0; background: var(--accent); z-index: 80;
  transition: width .1s linear;
}

/* ── Responsividade Mobile ─────────────────────────── */
/* Header nav collapse */
@media (max-width: 767px) {
  .nav-links { display: none !important; }
  .mobile-menu-btn { display: flex !important; }
}
@media (min-width: 768px) {
  .mobile-menu-btn { display: none !important; }
  .mobile-nav-drawer { display: none !important; }
}

/* Hero: empilhar colunas no mobile */
@media (max-width: 767px) {
  .hero-grid { grid-template-columns: 1fr !important; }
  .hero-grid > *:last-child { display: none; } /* Esconde SVG DAG no mobile estreito */
}

/* Metrics: garantir wrap */
@media (max-width: 480px) {
  .metrics-strip { grid-template-columns: 1fr 1fr !important; }
}

/* Projects: minmax menor no mobile */
@media (max-width: 640px) {
  .projects-grid { grid-template-columns: 1fr !important; }
}

/* Open Source: empilhar no mobile */
@media (max-width: 767px) {
  .opensource-grid { grid-template-columns: 1fr !important; }
}

/* Experience: colapsar coluna de período no mobile */
@media (max-width: 640px) {
  .experience-row { grid-template-columns: 1fr !important; }
  .experience-period { display: block; margin-bottom: 4px; }
}

/* Education: colapsar coluna de período no mobile */
@media (max-width: 640px) {
  .education-row { grid-template-columns: 1fr !important; }
}

/* Contact: empilhar no mobile */
@media (max-width: 767px) {
  .contact-grid { grid-template-columns: 1fr !important; }
}

/* Publications: empilhar no mobile */
@media (max-width: 640px) {
  .pub-row { grid-template-columns: 1fr !important; }
  .pub-meta { white-space: normal !important; }
}

/* Capabilities: 1 coluna no mobile muito estreito */
@media (max-width: 480px) {
  .capabilities-grid { grid-template-columns: 1fr !important; }
}
```

- [ ] **Step 3: Remover configuração do Tailwind obsoleta (opcional — manter se não houver conflito)**

Atualizar o `tailwind.config` para refletir as novas fontes, ou remover completamente o Tailwind CDN se não for mais usado.

- [ ] **Step 4: Verificar no browser que o HTML carrega sem erros**

```bash
# Abrir http://localhost:5173 no browser após iniciar o dev server
npm run dev
```
Esperado: página carrega (pode estar quebrada visualmente — OK neste ponto)

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "style: switch to Newsreader + IBM Plex Mono, update CSS animations and mobile breakpoints"
```

---

## Task 2: Tokens de Tema e Helpers em `App.tsx`

**Files:**
- Modify: `App.tsx` (início do arquivo — tokens e helpers)

**O que muda:**
- Substituir tokens `LIGHT` / `DARK` pelos tokens do novo design
- Substituir helpers `mono()` / `grotesk()` pelos novos
- Manter imports do React, framer-motion necessários

- [ ] **Step 1: Atualizar tokens de cor DARK e LIGHT**

```typescript
const DARK: CSSProperties = {
  '--bg':       '#0d0c0b',
  '--bg2':      '#131210',
  '--panel':    '#121110',
  '--line':     'rgba(236,233,225,.13)',
  '--line-2':   'rgba(236,233,225,.32)',
  '--grid':     'rgba(236,233,225,.045)',
  '--fg':       '#ece9e1',
  '--fg-muted': '#a39d90',
  '--fg-soft':  '#6f695c',
  '--accent':   '#e8513a',
} as CSSProperties;

const LIGHT: CSSProperties = {
  '--bg':       '#f3efe6',
  '--bg2':      '#ebe6d9',
  '--panel':    '#f8f5ee',
  '--line':     'rgba(20,17,13,.14)',
  '--line-2':   'rgba(20,17,13,.34)',
  '--grid':     'rgba(20,17,10,.05)',
  '--fg':       '#17130d',
  '--fg-muted': '#5b5446',
  '--fg-soft':  '#8a8273',
  '--accent':   '#e8513a',
} as CSSProperties;
```

- [ ] **Step 2: Atualizar helpers de tipografia**

```typescript
// IBM Plex Mono — labels, nav, tags, mono
const mono = (size: number | string = 12, extra?: CSSProperties): CSSProperties => ({
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: size as number,
  ...extra,
});

// Newsreader — headings e body text serif
const serif = (size: number | string = 16, weight = 400, extra?: CSSProperties): CSSProperties => ({
  fontFamily: "'Newsreader', Georgia, serif",
  fontSize: size as number,
  fontWeight: weight,
  ...extra,
});
```

- [ ] **Step 3: Verificar que o TypeScript compila sem erros**

```bash
npx tsc --noEmit
```
Esperado: sem erros de tipo

- [ ] **Step 4: Commit**

```bash
git add App.tsx
git commit -m "style: update theme tokens to warm dark palette and replace font helpers"
```

---

## Task 3: Header Sticky com Nav (substituir Sidebar)

**Files:**
- Modify: `App.tsx` — remover `<aside>`, remover `<div className="mobile-topbar">`, adicionar `<header>` sticky

**O que muda:**
- O layout passa de `display: flex` (sidebar + main) para layout de página normal (header + `<div>` full-width)
- Header: logo `OF | Oséias Farias`, nav com links §01–§05, botões lang/theme/CV
- Progress bar (#progress-bar) via `useEffect` no scroll
- Mobile: hamburger que mostra drawer vertical

- [ ] **Step 1: Atualizar estrutura raiz do App — remover sidebar, trocar para layout full-width**

No JSX do `App`, substituir o wrapper div + aside + main pelo seguinte esqueleto:
```tsx
return (
  <div
    id="portfolio-root"
    style={{
      ...theme,
      background: 'var(--bg)',
      color: 'var(--fg)',
      minHeight: '100vh',
      fontFamily: "'Newsreader', Georgia, serif",
      WebkitFontSmoothing: 'antialiased',
    }}
  >
    <div id="progress-bar" ref={progressRef} />
    {/* Header */}
    {/* Main sections */}
  </div>
);
```

Adicionar `ref` para a progress bar:
```typescript
const progressRef = useRef<HTMLDivElement>(null);
```

Atualizar o `useEffect` de scroll para atualizar a progress bar:
```typescript
useEffect(() => {
  const onScroll = () => {
    setShowTopBtn(window.scrollY > 500);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    if (progressRef.current) {
      progressRef.current.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

- [ ] **Step 2: Implementar o `<header>` sticky**

```tsx
<header style={{
  position: 'sticky', top: 0, zIndex: 70,
  background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
  backdropFilter: 'blur(8px)',
  borderBottom: '1px solid var(--line)',
}}>
  <div style={{
    maxWidth: 1240, margin: '0 auto',
    padding: '0 clamp(20px,4vw,40px)',
    height: 58, display: 'flex', alignItems: 'center',
    justifyContent: 'space-between', gap: 18,
  }}>
    {/* Logo */}
    <a href="#top" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
      style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 11, color: 'var(--fg)' }}>
      <span style={mono(13, { fontWeight: 600, letterSpacing: '.04em', color: 'var(--accent)' })}>OF</span>
      <span style={serif(17, 500, { letterSpacing: '-.01em' })}>Oséias Farias</span>
    </a>

    {/* Desktop nav links */}
    <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
      {(['capabilities','projects','experience','research'] as const).map((s, i) => (
        <a key={s} className="navlink" href={`#${s}`}
          onClick={e => { e.preventDefault(); scrollTo(s); }}
          style={mono(12, { letterSpacing: '.02em' })}>
          §0{i + 1}
        </a>
      ))}
    </nav>

    {/* Actions */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
      <button onClick={toggleLang} className="btnk invbtn"
        style={{ cursor: 'pointer', background: 'none', border: '1px solid var(--line)', color: 'var(--fg-muted)', ...mono(11), padding: '6px 9px' }}>
        {lang === 'pt' ? 'EN' : 'PT'}
      </button>
      <button onClick={toggleTheme} aria-label="theme" className="btnk invbtn"
        style={{ cursor: 'pointer', background: 'none', border: '1px solid var(--line)', color: 'var(--fg-muted)', fontSize: 12, padding: '6px 9px' }}>
        {darkMode ? '☀' : '☾'}
      </button>
      <a className="btnk invbtn" href={CV_URL} target="_blank" rel="noreferrer"
        style={{ textDecoration: 'none', border: '1px solid var(--line-2)', color: 'var(--fg)', ...mono(11), padding: '6px 12px' }}>
        {content.hero.ctaSecondary} ↗
      </a>
      {/* Mobile hamburger */}
      <button className="mobile-menu-btn btnk"
        onClick={() => setMobileMenuOpen(o => !o)}
        style={{ display: 'none', background: 'none', border: '1px solid var(--line)', color: 'var(--fg)', ...mono(14), padding: '5px 9px', cursor: 'pointer' }}>
        {mobileMenuOpen ? '✕' : '☰'}
      </button>
    </div>
  </div>

  {/* Mobile nav drawer */}
  <AnimatePresence>
    {mobileMenuOpen && (
      <motion.nav
        className="mobile-nav-drawer"
        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.18 }}
        style={{ borderTop: '1px solid var(--line)', overflow: 'hidden' }}
      >
        <div style={{ padding: '12px clamp(20px,4vw,40px)', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_SECTIONS.map(s => (
            <button key={s} onClick={() => scrollTo(s)} className="btnk"
              style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                color: activeSection === s ? 'var(--accent)' : 'var(--fg-muted)', ...mono(13), padding: '6px 0' }}>
              {content.nav[s as keyof typeof content.nav]}
            </button>
          ))}
        </div>
      </motion.nav>
    )}
  </AnimatePresence>
</header>
```

- [ ] **Step 3: Envolver o conteúdo das seções em um container max-width**

Criar um `<div id="top">` que envolve todas as seções com `max-width: 1240px`:
```tsx
<div id="top" style={{
  maxWidth: 1240, margin: '0 auto',
  padding: '0 clamp(20px,4vw,40px)',
  backgroundImage: 'linear-gradient(90deg,var(--grid) 1px,transparent 1px), linear-gradient(90deg,transparent calc(50% - 1px),var(--grid) 50%,transparent calc(50% + 1px))',
  backgroundSize: '25% 100%, 100% 100%',
}}>
  {/* todas as seções aqui */}
</div>
```

- [ ] **Step 4: Verificar no browser**

```bash
npm run dev
```
Esperado: header sticky aparece com logo, nav links §01–§04, botões lang/theme/CV. Sidebar sumiu. Progress bar na parte superior.

- [ ] **Step 5: Verificar mobile (redimensionar janela para <768px)**

Esperado: links da nav ficam ocultos, hambúrguer aparece, drawer abre ao clicar.

- [ ] **Step 6: Commit**

```bash
git add App.tsx
git commit -m "feat: replace sidebar with sticky header nav, add scroll progress bar"
```

---

## Task 4: Hero Section (§ — redesign completo)

**Files:**
- Modify: `App.tsx` — seção hero

**O que muda:**
- 2 colunas: texto à esquerda, SVG Pipeline DAG à direita
- Tipografia Newsreader para o título, IBM Plex Mono para labels
- Manifest grid (ROLE / LOC / STACK / STAT)
- Animated live dot na kicker line
- SVG Pipeline DAG com `dashflow` animation (substituindo HeroTerminal)
- CTAs: botão primário (accent bg) + link contact
- Remover MetricBadge e HeroTerminal do hero (métricas vão para Task 5)

- [ ] **Step 1: Implementar hero com 2 colunas**

```tsx
<section style={{
  display: 'grid',
  gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.04fr)',
  gap: 'clamp(24px,4vw,56px)',
  alignItems: 'center',
  padding: 'clamp(40px,7vw,86px) 0 clamp(36px,5vw,60px)',
  borderBottom: '1px solid var(--line)',
}} className="hero-grid">
  {/* Coluna esquerda — texto */}
  <div>
    {/* Kicker */}
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [.2,.7,.2,1] }}
      style={{ display: 'flex', alignItems: 'center', gap: 10, ...mono(12, { color: 'var(--fg-soft)', letterSpacing: '.06em', marginBottom: 26 }) }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--accent)' }}>
        <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--accent)', animation: 'livedot 2s ease-out infinite' }} />
        {content.hero.kicker}
      </span>
    </motion.div>

    {/* Título */}
    <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.07, ease: [.2,.7,.2,1] }}
      style={{ ...serif('clamp(44px,6.4vw,80px)' as any, 500, {
        lineHeight: .96, letterSpacing: '-.025em', margin: '0 0 22px', color: 'var(--fg)',
      }) }}>
      {content.hero.role.split(' & ')[0]}<br />
      <span style={{ fontStyle: 'italic', color: 'var(--accent)' }}>
        {content.hero.role.includes(' & ') ? '& ' + content.hero.role.split(' & ')[1] : ''}
      </span>
    </motion.h1>

    {/* Lede */}
    <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [.2,.7,.2,1] }}
      style={{ fontSize: 'clamp(17px,2vw,20px)', lineHeight: 1.6, color: 'var(--fg-muted)', maxWidth: 500, margin: '0 0 30px' }}>
      {content.hero.lede}
    </motion.p>

    {/* Manifest grid */}
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.21, ease: [.2,.7,.2,1] }}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '6px 30px', ...mono(12, { color: 'var(--fg-soft)', marginBottom: 30 }) }}>
      <div><span style={{ color: 'var(--fg-soft)' }}>ROLE / </span><span style={{ color: 'var(--fg-muted)' }}>BACKEND · MLOPS</span></div>
      <div><span style={{ color: 'var(--fg-soft)' }}>LOC&nbsp;&nbsp;/ </span><span style={{ color: 'var(--fg-muted)' }}>{content.hero.location}</span></div>
      <div><span style={{ color: 'var(--fg-soft)' }}>STACK/ </span><span style={{ color: 'var(--fg-muted)' }}>PY · JAVA · AWS</span></div>
      <div><span style={{ color: 'var(--fg-soft)' }}>STAT&nbsp;/ </span><span style={{ color: 'var(--accent)' }}>{lang === 'pt' ? 'DISPONÍVEL' : 'AVAILABLE'}</span></div>
    </motion.div>

    {/* CTAs */}
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.27, ease: [.2,.7,.2,1] }}
      style={{ display: 'flex', gap: 0, flexWrap: 'wrap', alignItems: 'center' }}>
      <a href="#projects" onClick={e => { e.preventDefault(); scrollTo('projects'); }}
        className="btnk"
        style={{ textDecoration: 'none', background: 'var(--accent)', color: 'var(--bg)', ...mono(13, { fontWeight: 500, padding: '12px 20px', letterSpacing: '.02em' }) }}>
        {content.hero.ctaPrimary} →
      </a>
      <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact'); }}
        className="navlink"
        style={{ textDecoration: 'none', ...mono(13, { padding: '12px 20px', borderBottom: '1px solid var(--line)' }) }}>
        {content.nav.contact}
      </a>
    </motion.div>
  </div>

  {/* Coluna direita — SVG Pipeline DAG */}
  <HeroPipelineDAG lang={lang} />
</section>
```

- [ ] **Step 2: Criar componente `HeroPipelineDAG` inline em App.tsx**

```tsx
const HeroPipelineDAG: React.FC<{ lang: Language }> = ({ lang }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, delay: 0.16, ease: [.2,.7,.2,1] }}
    style={{
      position: 'relative', border: '1px solid var(--line)',
      background: 'var(--panel)', padding: '24px 22px 18px',
    }}
  >
    {/* Corner brackets */}
    {[
      { top: -1, left: -1, borderTop: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)' },
      { top: -1, right: -1, borderTop: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' },
      { bottom: -1, left: -1, borderBottom: '2px solid var(--accent)', borderLeft: '2px solid var(--accent)' },
      { bottom: -1, right: -1, borderBottom: '2px solid var(--accent)', borderRight: '2px solid var(--accent)' },
    ].map((s, i) => (
      <div key={i} style={{ position: 'absolute', width: 14, height: 14, ...s }} />
    ))}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16, ...mono(11, { color: 'var(--fg-soft)', letterSpacing: '.04em' }) }}>
      <span>FIG.01 — {lang === 'pt' ? 'CICLO DE VIDA ML' : 'ML LIFECYCLE'}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}>
        <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', animation: 'livedot 2s ease-out infinite' }} />
        {lang === 'pt' ? 'ativo' : 'live'}
      </span>
    </div>
    <svg viewBox="0 0 480 250" width="100%" style={{ display: 'block', overflow: 'visible' }}>
      {/* Edges — static */}
      <g fill="none" stroke="var(--line-2)" strokeWidth="1.4" strokeLinecap="square">
        <path d="M70 56 L 122 56" markerEnd="url(#ah)"/>
        <path d="M192 56 L 244 56" markerEnd="url(#ah)"/>
        <path d="M314 56 L 366 56" markerEnd="url(#ah)"/>
        <path d="M410 78 L 410 130 L 314 152" markerEnd="url(#ah)"/>
        <path d="M244 158 L 192 158" markerEnd="url(#ah)"/>
        <path d="M148 136 L 148 78" markerEnd="url(#ah)"/>
      </g>
      {/* Edges — animated accent */}
      <g fill="none" stroke="var(--accent)" strokeWidth="1.8" strokeLinecap="square"
        strokeDasharray="4 7" style={{ animation: 'dashflow .9s linear infinite' }}>
        <path d="M70 56 L 122 56"/>
        <path d="M192 56 L 244 56"/>
        <path d="M314 56 L 366 56"/>
        <path d="M410 78 L 410 130 L 314 152"/>
        <path d="M244 158 L 192 158"/>
      </g>
      <path d="M148 136 L 148 78" fill="none" stroke="var(--accent)" strokeWidth="1.6"
        strokeLinecap="square" strokeDasharray="2 6"
        style={{ animation: 'dashflow 1.1s linear infinite reverse' }}/>
      <defs>
        <marker id="ah" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0 0 L 6 3 L 0 6" fill="none" stroke="var(--fg-soft)" strokeWidth="1.2"/>
        </marker>
      </defs>
      {/* Nodes */}
      <g fontFamily="IBM Plex Mono" fontSize="11.5" textAnchor="middle">
        <g><rect x="8" y="40" width="62" height="32" fill="var(--bg2)" stroke="var(--line-2)"/><text x="39" y="60" fill="var(--fg-muted)">{lang === 'pt' ? 'dados' : 'data'}</text></g>
        <g><rect x="122" y="40" width="70" height="32" fill="var(--accent)" stroke="var(--accent)"/><text x="157" y="60" fill="var(--bg)">{lang === 'pt' ? 'treino' : 'train'}</text></g>
        <g><rect x="244" y="40" width="70" height="32" fill="var(--bg2)" stroke="var(--line-2)"/><text x="279" y="60" fill="var(--fg-muted)">{lang === 'pt' ? 'registro' : 'registry'}</text></g>
        <g><rect x="366" y="40" width="78" height="32" fill="var(--bg2)" stroke="var(--line-2)"/><text x="405" y="60" fill="var(--fg-muted)">deploy</text></g>
        <g>
          <rect x="244" y="142" width="70" height="32" fill="var(--bg2)" stroke="var(--accent)"/>
          <circle cx="256" cy="158" r="3" fill="var(--accent)"
            style={{ animation: 'nodepulse 1.8s ease-in-out infinite', transformOrigin: '256px 158px' }}/>
          <text x="285" y="162" fill="var(--fg)">monitor</text>
        </g>
        <g><rect x="100" y="142" width="92" height="32" fill="var(--bg2)" stroke="var(--line-2)"/><text x="146" y="162" fill="var(--fg-muted)">api serving</text></g>
      </g>
      <text x="120" y="112" fontFamily="IBM Plex Mono" fontSize="10" fill="var(--accent)" textAnchor="middle">retrain ↺</text>
    </svg>
  </motion.div>
);
```

- [ ] **Step 3: Verificar no browser**

```bash
npm run dev
```
Esperado: hero com 2 colunas, título em Newsreader, SVG DAG com animações dashflow visíveis. No mobile (<768px), SVG deve ficar oculto (classe `hero-grid` + CSS do Task 1).

- [ ] **Step 4: Commit**

```bash
git add App.tsx
git commit -m "feat: redesign hero section with 2-col layout and animated SVG pipeline DAG"
```

---

## Task 5: Metrics Strip

**Files:**
- Modify: `App.tsx` — adicionar seção de métricas após o hero

**O que muda:**
- Faixa horizontal de 4 métricas: tests, coverage, mestrados, certificações
- Count-up animation via `useCounter` hook
- grid auto-fit 150px+

- [ ] **Step 1: Criar componente `MetricItem` inline**

```tsx
const MetricItem: React.FC<{ value: number; suffix: string; label: string; delay?: number }> = ({
  value, suffix, label,
}) => {
  const { ref, count } = useCounter(value, 1300);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6, ease: [.2,.7,.2,1] }}
      style={{ padding: '26px 22px', borderLeft: '1px solid var(--line)' }}
    >
      <div style={serif('clamp(38px,5vw,56px)' as any, 500, { lineHeight: .9, letterSpacing: '-.02em' })}>
        <span ref={ref}>{count}</span>{suffix}
      </div>
      <div style={mono(11, {
        color: 'var(--fg-soft)', marginTop: 10,
        textTransform: 'uppercase', letterSpacing: '.06em',
      })}>
        {label}
      </div>
    </motion.div>
  );
};
```

- [ ] **Step 2: Adicionar seção de métricas após o hero**

```tsx
{/* Metrics strip */}
<section className="metrics-strip" style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  borderBottom: '1px solid var(--line)',
}}>
  <MetricItem value={184} suffix="" label={lang === 'pt' ? 'testes · synapsys' : 'tests · synapsys'} />
  <MetricItem value={90} suffix="%" label={lang === 'pt' ? 'cobertura' : 'coverage'} />
  <MetricItem value={2} suffix="" label={lang === 'pt' ? 'mestrados' : "master's"} />
  <MetricItem value={certs.length} suffix="" label={lang === 'pt' ? 'certificações' : 'certifications'} />
</section>
```

- [ ] **Step 3: Verificar**

```bash
npm run dev
```
Esperado: faixa horizontal com 4 métricas, count-up ao scrollar. No mobile, 2x2 grid.

- [ ] **Step 4: Commit**

```bash
git add App.tsx
git commit -m "feat: add animated metrics strip below hero"
```

---

## Task 6: Seção About (§00) e Capabilities (§01)

**Files:**
- Modify: `App.tsx` — seções about e capabilities

**O que muda:**
- About: layout 2 colunas (120px label + conteúdo), lede em Newsreader 38px
- Capabilities: grid auto-fit(252px), cards com `.mod .modbar` pattern

- [ ] **Step 1: Redesenhar seção About (§00)**

```tsx
<section id="about" data-section="about" style={{
  scrollMarginTop: 70, display: 'grid',
  gridTemplateColumns: '120px minmax(0,1fr)',
  gap: 'clamp(16px,3vw,40px)',
  padding: 'clamp(40px,6vw,72px) 0',
  borderBottom: '1px solid var(--line)',
}}>
  <FadeIn>
    <div style={mono(12, { color: 'var(--fg-soft)', letterSpacing: '.04em' })}>
      §00<br /><span style={{ color: 'var(--fg-muted)' }}>{content.about.title}</span>
    </div>
  </FadeIn>
  <div style={{ maxWidth: 760 }}>
    <FadeIn>
      <p style={serif('clamp(24px,3.4vw,38px)' as any, 400, {
        lineHeight: 1.28, letterSpacing: '-.015em', margin: '0 0 30px',
      })}>
        {content.about.lede}
      </p>
    </FadeIn>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 22 }}>
      {content.about.paras.map((para, i) => (
        <FadeIn key={i} delay={i * 0.08}>
          <p style={{ fontSize: 15.5, lineHeight: 1.72, color: 'var(--fg-muted)', margin: 0 }}
            dangerouslySetInnerHTML={{ __html: para }} />
        </FadeIn>
      ))}
    </div>
  </div>
</section>
```

**Nota mobile:** a grid `120px minmax(0,1fr)` não colapsa automaticamente. Adicionar classe `about-grid` e no `index.html`:
```css
@media (max-width: 640px) {
  .about-grid { grid-template-columns: 1fr !important; }
}
```

- [ ] **Step 2: Redesenhar seção Capabilities (§01)**

```tsx
<section id="capabilities" data-section="capabilities" style={{
  scrollMarginTop: 70, padding: 'clamp(40px,6vw,72px) 0',
  borderBottom: '1px solid var(--line)',
}}>
  <FadeIn>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 30 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={mono(14, { color: 'var(--accent)' })}>§01</span>
        <h2 style={serif('clamp(28px,3.6vw,42px)' as any, 500, { margin: 0, letterSpacing: '-.02em' })}>
          {content.focus.title}
        </h2>
      </div>
      <span style={mono(11, { color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>
        [ 04 {lang === 'pt' ? 'MÓDULOS' : 'MODULES'} ]
      </span>
    </div>
  </FadeIn>
  <div className="capabilities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(252px,1fr))' }}>
    {content.focus.pillars.map((p, i) => (
      <FadeIn key={i} delay={i * 0.07}>
        <div className="mod" style={{
          border: '1px solid var(--line)', margin: '-0.5px',
          background: 'var(--panel)', padding: '24px 22px',
        }}>
          <span className="modbar" />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, ...mono(11) }}>
            <span style={{ color: 'var(--accent)' }}>[{p.k}]</span>
            <span style={{ color: 'var(--fg-soft)' }}>M.0{i + 1}</span>
          </div>
          <h3 style={serif(21, 500, { margin: '0 0 9px', letterSpacing: '-.01em' })}>{p.t}</h3>
          <p style={{ margin: '0 0 16px', fontSize: 14, lineHeight: 1.6, color: 'var(--fg-muted)' }}>{p.d}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {p.tags.map(tag => (
              <span key={tag} className="tagk" style={{
                ...mono(10.5, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 7px' }),
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </FadeIn>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Verificar**

```bash
npm run dev
```
Esperado: §00 About com 2 colunas, lede em Newsreader grande. §01 Capabilities com 4 cards, hover anima a barra vermelha no topo de cada card.

- [ ] **Step 4: Commit**

```bash
git add App.tsx index.html
git commit -m "feat: redesign about and capabilities sections with mod card pattern"
```

---

## Task 7: Seção Projects (§02)

**Files:**
- Modify: `App.tsx` — seção projects

**O que muda:**
- Grid auto-fit(340px) em vez de lista vertical com sticky
- Card "mod" com status dot (color dinâmica), REC.0N, P/S/I columns
- Remover sticky cards e pipeline strips

- [ ] **Step 1: Definir status map**

```typescript
const STATUS_MAP_PT = ['em produção','open source','concluído','concluído','open source'];
const STATUS_MAP_EN = ['in production','open source','shipped','shipped','open source'];
const STATUS_COLORS = ['var(--accent)','var(--fg-muted)','var(--fg-soft)','var(--fg-soft)','var(--fg-muted)'];
```

- [ ] **Step 2: Implementar seção Projects**

```tsx
<section id="projects" data-section="projects" style={{
  scrollMarginTop: 70, padding: 'clamp(40px,6vw,72px) 0',
  borderBottom: '1px solid var(--line)',
}}>
  <FadeIn>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 30 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={mono(14, { color: 'var(--accent)' })}>§02</span>
        <h2 style={serif('clamp(28px,3.6vw,42px)' as any, 500, { margin: 0, letterSpacing: '-.02em' })}>
          {content.projects.title}
        </h2>
      </div>
      <span style={mono(11, { color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>{content.projects.subtitle}</span>
    </div>
  </FadeIn>
  <div className="projects-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(340px,1fr))' }}>
    {projects.map((proj, i) => {
      const statusLabel = (lang === 'pt' ? STATUS_MAP_PT : STATUS_MAP_EN)[i] ?? 'concluído';
      const statusColor = STATUS_COLORS[i] ?? 'var(--fg-soft)';
      return (
        <motion.article key={i} className="mod"
          initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.6, ease: [.2,.7,.2,1] }}
          style={{
            border: '1px solid var(--line)', margin: '-0.5px',
            background: 'var(--panel)', padding: '26px 24px',
            display: 'flex', flexDirection: 'column',
          }}
        >
          <span className="modbar" />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', ...mono(11, { color: 'var(--fg-soft)', marginBottom: 14 }) }}>
            <span>REC.0{i + 1}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: statusColor }}>
              <span style={{ width: 6, height: 6, borderRadius: 999, background: statusColor }} />
              {statusLabel}
            </span>
          </div>
          <h3 style={serif(24, 500, { margin: '0 0 5px', letterSpacing: '-.015em', lineHeight: 1.05 })}>
            {proj.title}
          </h3>
          <div style={mono(11, { color: 'var(--fg-soft)', marginBottom: 18 })}>
            {proj.category} · {proj.year}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
            {[
              { k: 'P', label: content.projects.labels.problem, text: proj.problem },
              { k: 'S', label: content.projects.labels.solution, text: proj.solution },
              { k: 'I', label: content.projects.labels.impact,   text: proj.impact,   accent: true },
            ].map(({ k, text, accent }) => (
              <div key={k} style={{ display: 'grid', gridTemplateColumns: '14px 1fr', gap: 10 }}>
                <span style={mono(11, { color: 'var(--accent)' })}>{k}</span>
                <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55, color: accent ? 'var(--fg)' : 'var(--fg-muted)' }}>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, margin: '18px 0 0', paddingTop: 16, borderTop: '1px solid var(--line)' }}>
            {proj.tags.map(tag => (
              <span key={tag} className="tagk" style={mono(10.5, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 7px' })}>{tag}</span>
            ))}
          </div>
          {proj.link && (
            <a className="reglink" href={proj.link} target="_blank" rel="noreferrer"
              style={{ ...mono(12, { marginTop: 16, alignSelf: 'flex-start' }) }}>
              {lang === 'pt' ? 'abrir repositório' : 'open repository'} ↗
            </a>
          )}
        </motion.article>
      );
    })}
  </div>
  <FadeIn>
    <div style={{ marginTop: 24 }}>
      <a className="navlink" href="https://github.com/oseiasdfarias" target="_blank" rel="noreferrer"
        style={mono(13)}>{content.projects.viewAll} →</a>
    </div>
  </FadeIn>
</section>
```

- [ ] **Step 3: Verificar**

```bash
npm run dev
```
Esperado: grid de cards com status dots, hover anima a modbar. No mobile (<640px), 1 coluna.

- [ ] **Step 4: Commit**

```bash
git add App.tsx
git commit -m "feat: redesign projects section with mod card grid and status dots"
```

---

## Task 8: Seção Open Source (§03)

**Files:**
- Modify: `App.tsx` — seção opensource

**O que muda:**
- 2 colunas: info + stats à esquerda, GIFs demo à direita (substituir arch diagram)
- Stats em grid horizontal dentro do painel esquerdo
- Manter modal de mídia

- [ ] **Step 1: Implementar seção Open Source**

```tsx
<section id="opensource" data-section="opensource" style={{
  scrollMarginTop: 70, padding: 'clamp(40px,6vw,72px) 0',
  borderBottom: '1px solid var(--line)',
}}>
  <FadeIn>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 30 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={mono(14, { color: 'var(--accent)' })}>§03</span>
        <h2 style={serif('clamp(28px,3.6vw,42px)' as any, 500, { margin: 0, letterSpacing: '-.02em' })}>
          {content.opensource.title}
        </h2>
      </div>
      <span style={mono(11, { color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>{content.opensource.subtitle}</span>
    </div>
  </FadeIn>
  <FadeIn delay={0.1}>
    <div className="opensource-grid" style={{
      display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,1fr)',
      gap: 0, border: '1px solid var(--line)', background: 'var(--panel)',
    }}>
      {/* Esquerda — info + stats */}
      <div style={{ padding: 'clamp(22px,3vw,32px)', borderRight: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 11, flexWrap: 'wrap', marginBottom: 16 }}>
          <h3 style={serif(30, 500, { margin: 0, letterSpacing: '-.02em' })}>{openSource.name}</h3>
          <span style={mono(11, { color: 'var(--accent)', border: '1px solid var(--line)', padding: '2px 7px' })}>{openSource.version}</span>
          <span style={mono(11, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 7px' })}>{openSource.license}</span>
        </div>
        <p style={{ margin: '0 0 22px', fontSize: 15, lineHeight: 1.66, color: 'var(--fg-muted)' }}>{openSource.description}</p>

        {/* Stats grid */}
        <div style={{ display: 'flex', gap: 0, borderTop: '1px solid var(--line)', marginBottom: 22 }}>
          {openSource.stats.map(s => (
            <div key={s.label} style={{ flex: 1, padding: '16px 0 4px', borderRight: '1px solid var(--line)' }}>
              <div style={serif(30, 500, { lineHeight: .9 })}>{s.value}</div>
              <div style={mono(10, { color: 'var(--fg-soft)', marginTop: 8, textTransform: 'uppercase', letterSpacing: '.06em' })}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <a className="btnk invbtn" href={openSource.github} target="_blank" rel="noreferrer"
            style={{ textDecoration: 'none', ...mono(12, { color: 'var(--fg-muted)', border: '1px solid var(--line-2)', padding: '8px 14px' }) }}>
            GitHub ↗
          </a>
          <a className="btnk" href={openSource.pypi} target="_blank" rel="noreferrer"
            style={{ textDecoration: 'none', ...mono(12, { color: 'var(--bg)', background: 'var(--accent)', padding: '8px 14px' }) }}>
            PyPI ↗
          </a>
        </div>
      </div>

      {/* Direita — demo GIFs */}
      <div style={{ padding: 'clamp(22px,3vw,32px)' }}>
        <div style={mono(11, { color: 'var(--fg-soft)', marginBottom: 10 })}>FIG.02 — {openSource.demo.title}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {openSource.demo.media.slice(0, 1).map((item, i) => (
            <button key={i} onClick={() => openModal(openSource.demo.media, i)}
              style={{ aspectRatio: '16/9', border: '1px solid var(--line)', overflow: 'hidden', background: 'var(--bg2)', padding: 0, cursor: 'pointer' }}>
              <img src={item.src} alt={item.caption} loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {openSource.demo.media.slice(1, 3).map((item, i) => (
              <button key={i + 1} onClick={() => openModal(openSource.demo.media, i + 1)}
                style={{ aspectRatio: '16/10', border: '1px solid var(--line)', overflow: 'hidden', background: 'var(--bg2)', padding: 0, cursor: 'pointer' }}>
                <img src={item.src} alt={item.caption} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  </FadeIn>
</section>
```

- [ ] **Step 2: Verificar**

```bash
npm run dev
```
Esperado: seção Open Source com 2 colunas, GIFs clicáveis abrindo modal. No mobile, empilhado.

- [ ] **Step 3: Commit**

```bash
git add App.tsx
git commit -m "feat: redesign open source section with 2-col info+demo layout"
```

---

## Task 9: Seção Experience (§04)

**Files:**
- Modify: `App.tsx` — seção experience

**O que muda:**
- Substituir timeline vertical pela tabela 2 colunas (170px período + conteúdo)
- `max-width: 900px`
- Sem timeline line, sem dots — limpo e tipográfico

- [ ] **Step 1: Implementar seção Experience**

```tsx
<section id="experience" data-section="experience" style={{
  scrollMarginTop: 70, padding: 'clamp(40px,6vw,72px) 0',
  borderBottom: '1px solid var(--line)',
}}>
  <FadeIn>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 14 }}>
      <span style={mono(14, { color: 'var(--accent)' })}>§04</span>
      <h2 style={serif('clamp(28px,3.6vw,42px)' as any, 500, { margin: 0, letterSpacing: '-.02em' })}>
        {content.experience.title}
      </h2>
    </div>
  </FadeIn>
  <div style={{ maxWidth: 900 }}>
    {experience.map((exp, i) => (
      <motion.div key={i}
        className="experience-row"
        initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-5%' }}
        transition={{ duration: 0.65, delay: i * 0.07, ease: [.2,.7,.2,1] }}
        style={{
          display: 'grid', gridTemplateColumns: '170px 1fr',
          gap: 24, padding: '22px 0', borderTop: '1px solid var(--line)',
        }}
      >
        <div className="experience-period" style={mono(12, { color: 'var(--fg-soft)', paddingTop: 4 })}>
          {exp.period}
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 11, flexWrap: 'wrap', marginBottom: 4 }}>
            <h3 style={serif(19, 500, { margin: 0 })}>{exp.title}</h3>
            <span style={mono(9.5, {
              textTransform: 'uppercase', letterSpacing: '.08em',
              color: 'var(--accent)', border: '1px solid var(--line)', padding: '1px 6px',
            })}>
              {exp.type === 'industry' ? (lang === 'pt' ? 'Mercado' : 'Industry') : (lang === 'pt' ? 'Pesquisa' : 'Research')}
            </span>
            {exp.current && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', animation: 'livedot 2s ease-out infinite' }} />
                <span style={mono(10, { color: 'var(--accent)' })}>{lang === 'pt' ? 'atual' : 'current'}</span>
              </span>
            )}
          </div>
          <p style={{ margin: '0 0 10px', ...mono(12, { color: 'var(--fg-muted)' }) }}>{exp.company}</p>
          <p style={{ margin: '0 0 12px', fontSize: 14.5, lineHeight: 1.62, color: 'var(--fg-muted)' }}>{exp.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {exp.tags.map(tag => (
              <span key={tag} style={mono(10.5, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 7px' })}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Verificar**

```bash
npm run dev
```
Esperado: seção Experience limpa, 2 colunas, sem timeline. No mobile (<640px), uma coluna com período em cima.

- [ ] **Step 3: Commit**

```bash
git add App.tsx
git commit -m "feat: redesign experience section with 2-col table layout"
```

---

## Task 10: Seções Research (§05) e Education (§06)

**Files:**
- Modify: `App.tsx` — seções research e education

**O que muda:**
- Research: cards grid + lista de publications com grid `1fr auto`
- Education: cards grid (auto-fit 262px) + certification grid (auto-fit 252px)
- Publications: coluna de venue/data fica à direita

- [ ] **Step 1: Redesenhar seção Research (§05)**

```tsx
<section id="research" data-section="research" style={{
  scrollMarginTop: 70, padding: 'clamp(40px,6vw,72px) 0',
  borderBottom: '1px solid var(--line)',
}}>
  <FadeIn>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16, marginBottom: 26 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
        <span style={mono(14, { color: 'var(--accent)' })}>§05</span>
        <h2 style={serif('clamp(28px,3.6vw,42px)' as any, 500, { margin: 0, letterSpacing: '-.02em' })}>
          {content.research.title}
        </h2>
      </div>
      <span style={mono(11, { color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>{content.research.subtitle}</span>
    </div>
  </FadeIn>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))' }}>
    {research.map((r, i) => (
      <FadeIn key={i} delay={i * 0.08}>
        <div className="mod" style={{
          border: '1px solid var(--line)', margin: '-0.5px',
          background: 'var(--panel)', padding: '24px 22px',
        }}>
          <span className="modbar" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, ...mono(11, { color: 'var(--fg-soft)' }) }}>
            <span>{r.period}</span>
            {r.ongoing && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--accent)', animation: 'livedot 2s ease-out infinite' }} />
                {content.status.ongoing}
              </span>
            )}
          </div>
          <h3 style={serif(19, 500, { margin: '0 0 6px', lineHeight: 1.2 })}>{r.title}</h3>
          <p style={mono(11.5, { color: 'var(--accent)', margin: '0 0 12px' })}>{r.institution}</p>
          <p style={{ margin: '0 0 14px', fontSize: 13.5, lineHeight: 1.6, color: 'var(--fg-muted)' }}>{r.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {r.tags.map(tag => (
              <span key={tag} className="tagk" style={mono(10, { color: 'var(--fg-soft)', border: '1px solid var(--line)', padding: '2px 6px' })}>{tag}</span>
            ))}
          </div>
        </div>
      </FadeIn>
    ))}
  </div>

  {/* Publications */}
  <FadeIn>
    <div style={mono(11, { textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--fg-soft)', margin: '28px 0 4px' })}>
      {content.research.publications}
    </div>
  </FadeIn>
  <div>
    {pubs.map((pub, i) => (
      <FadeIn key={i} delay={i * 0.07}>
        <div className="pub-row" style={{
          display: 'grid', gridTemplateColumns: '1fr auto',
          gap: 14, alignItems: 'baseline',
          padding: '14px 0', borderTop: '1px solid var(--line)',
        }}>
          <h4 style={serif(16, 500, { margin: 0, lineHeight: 1.3 })}>{pub.title}</h4>
          <p className="pub-meta" style={mono(11, { margin: 0, color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>
            {pub.venue} · {pub.date}
          </p>
        </div>
      </FadeIn>
    ))}
  </div>
</section>
```

- [ ] **Step 2: Redesenhar seção Education (§06)**

```tsx
<section id="education" data-section="education" style={{
  scrollMarginTop: 70, padding: 'clamp(40px,6vw,72px) 0',
  borderBottom: '1px solid var(--line)',
}}>
  <FadeIn>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 26 }}>
      <span style={mono(14, { color: 'var(--accent)' })}>§06</span>
      <h2 style={serif('clamp(28px,3.6vw,42px)' as any, 500, { margin: 0, letterSpacing: '-.02em' })}>
        {content.education.title}
      </h2>
    </div>
  </FadeIn>
  {/* Degree cards */}
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(262px,1fr))', marginBottom: 30 }}>
    {education.map((edu, i) => (
      <FadeIn key={i} delay={i * 0.06}>
        <div className="mod" style={{ border: '1px solid var(--line)', margin: '-0.5px', background: 'var(--panel)', padding: 20 }}>
          <span className="modbar" />
          <div style={mono(11, { color: 'var(--accent)', marginBottom: 6 })}>{edu.period} · {edu.institution}</div>
          <h3 style={serif(18, 500, { margin: '0 0 6px', lineHeight: 1.18 })}>{edu.title}</h3>
          <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--fg-muted)' }}>{edu.description}</p>
        </div>
      </FadeIn>
    ))}
  </div>
  {/* Certifications */}
  <FadeIn>
    <div style={mono(11, { textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--fg-soft)', marginBottom: 8 })}>
      {content.education.certifications}
    </div>
  </FadeIn>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(252px,1fr))' }}>
    {certs.map((cert, i) => (
      <FadeIn key={i} delay={i * 0.03}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10,
          padding: '13px 14px', border: '1px solid var(--line)', margin: '-0.5px', background: 'var(--panel)',
        }}>
          <div style={{ minWidth: 0 }}>
            <div style={serif(14.5, 500, { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' })}>
              {cert.link
                ? <a href={cert.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{cert.title}</a>
                : cert.title}
            </div>
            <div style={mono(10, { color: 'var(--fg-soft)', marginTop: 2 })}>{cert.issuer}</div>
          </div>
          <span style={mono(10.5, { color: 'var(--fg-soft)', whiteSpace: 'nowrap' })}>{cert.date}</span>
        </div>
      </FadeIn>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Verificar**

```bash
npm run dev
```
Esperado: §05 Research com cards e lista de publicações (título à esq, venue à dir). §06 Education com cards de grau + grid de certificações.

- [ ] **Step 4: Commit**

```bash
git add App.tsx
git commit -m "feat: redesign research and education sections"
```

---

## Task 11: Seção Contact (§07) e Footer

**Files:**
- Modify: `App.tsx` — seção contact

**O que muda:**
- 2 colunas: links sociais à esquerda, formulário à direita
- Footer simples dentro do mesmo bloco

- [ ] **Step 1: Implementar seção Contact**

```tsx
<section id="contact" data-section="contact" style={{
  scrollMarginTop: 70, padding: 'clamp(40px,6vw,72px) 0 clamp(48px,7vw,80px)',
}}>
  <div className="contact-grid" style={{
    display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
    gap: 'clamp(24px,5vw,56px)', alignItems: 'start',
  }}>
    {/* Esquerda — info e socials */}
    <FadeIn>
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
          <span style={mono(14, { color: 'var(--accent)' })}>§07</span>
          <h2 style={serif('clamp(30px,4.4vw,52px)' as any, 500, { margin: 0, letterSpacing: '-.025em' })}>
            {content.contact.title}
          </h2>
        </div>
        <p style={{ margin: '0 0 26px', fontSize: 16.5, lineHeight: 1.6, color: 'var(--fg-muted)', maxWidth: 420 }}>
          {content.contact.subtitle}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px 16px', ...mono(13) }}>
          {socials.map(s => (
            <React.Fragment key={s.label}>
              <span style={{ color: 'var(--fg-soft)' }}>{s.label.slice(0, 2).toUpperCase()}</span>
              <a className="reglink" href={s.href} target="_blank" rel="noreferrer"
                style={{ justifySelf: 'start' }}>
                {s.label} ↗
              </a>
            </React.Fragment>
          ))}
        </div>
      </div>
    </FadeIn>

    {/* Direita — formulário */}
    <FadeIn delay={0.1}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid var(--line)',
      }}>
        <input type="text" name="name" required placeholder={content.contact.name}
          style={{ background: 'var(--panel)', border: 'none', borderBottom: '1px solid var(--line)', padding: '15px 16px', fontSize: 14.5, color: 'var(--fg)', ...mono(14.5), outline: 'none' }} />
        <input type="email" name="email" required placeholder={content.contact.email}
          style={{ background: 'var(--panel)', border: 'none', borderBottom: '1px solid var(--line)', padding: '15px 16px', fontSize: 14.5, color: 'var(--fg)', ...mono(14.5), outline: 'none' }} />
        <textarea name="message" rows={4} required placeholder={content.contact.message}
          style={{ background: 'var(--panel)', border: 'none', borderBottom: '1px solid var(--line)', padding: '15px 16px', fontSize: 14.5, color: 'var(--fg)', ...mono(14.5), outline: 'none', resize: 'vertical' }} />
        <button type="submit" disabled={formStatus === 'sending'} className="btnk"
          style={{ cursor: 'pointer', background: 'var(--accent)', color: 'var(--bg)', border: 'none', padding: 15, ...mono(14, { fontWeight: 500, letterSpacing: '.02em' }), opacity: formStatus === 'sending' ? 0.6 : 1 }}>
          {formStatus === 'sending' ? content.contact.sending : content.contact.send} →
        </button>
        {formStatus === 'success' && <p style={{ margin: 0, padding: '12px 16px', ...mono(12, { color: 'var(--accent)' }) }}>{content.contact.success}</p>}
        {formStatus === 'error'   && <p style={{ margin: 0, padding: '12px 16px', ...mono(12, { color: 'var(--accent)' }) }}>{content.contact.error}</p>}
      </form>
    </FadeIn>
  </div>

  {/* Footer */}
  <div style={{
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    flexWrap: 'wrap', gap: 10, marginTop: 48, paddingTop: 18,
    borderTop: '1px solid var(--line)', ...mono(11, { color: 'var(--fg-soft)' }),
  }}>
    <span>{content.footer.rights}</span>
    <span>{content.footer.built} · OF—2026</span>
  </div>
</section>
```

- [ ] **Step 2: Verificar**

```bash
npm run dev
```
Esperado: §07 Contact com 2 colunas, form funcional, footer no rodapé. No mobile, empilhado.

- [ ] **Step 3: Verificar formulário de contato**

Preencher o form e submeter. Esperado: mensagem de sucesso aparece em 2–3s.

- [ ] **Step 4: Commit**

```bash
git add App.tsx
git commit -m "feat: redesign contact section with 2-col layout and footer"
```

---

## Task 12: Back-to-top e Media Modal — Limpar e Adaptar

**Files:**
- Modify: `App.tsx` — botão back-to-top e MediaModal

**O que muda:**
- Adaptar estilo do botão back-to-top para o novo tema (sem border-radius)
- MediaModal: já funciona — apenas verificar que as cores se adaptam ao novo tema

- [ ] **Step 1: Atualizar botão back-to-top**

```tsx
{showTopBtn && (
  <motion.button
    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }}
    transition={{ duration: 0.2 }}
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    className="btnk"
    style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 50,
      background: 'var(--panel)', border: '1px solid var(--line-2)',
      color: 'var(--fg-muted)', width: 40, height: 40,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: 'pointer', ...mono(14),
    }}
    aria-label="Voltar ao topo"
  >
    ↑
  </motion.button>
)}
```

- [ ] **Step 2: Verificar que o MediaModal adapta corretamente**

Clicar em um GIF na seção Open Source. Esperado: modal abre com navegação por teclado e botões prev/next.

- [ ] **Step 3: Commit**

```bash
git add App.tsx
git commit -m "style: adapt back-to-top button and media modal to new theme"
```

---

## Task 13: Auditoria Mobile — Testar e Corrigir Regressões

**Files:**
- Modify: `index.html` (CSS), `App.tsx` (className additions)

**O que verificar e corrigir:**

Esta task é a verificação final de responsividade. Testar em 3 breakpoints:
- `375px` (iPhone SE)
- `768px` (tablet)
- `1280px` (desktop)

- [ ] **Step 1: Verificar hero em 375px**

Esperado: 1 coluna, SVG DAG oculto (`.hero-grid > *:last-child { display: none }`), texto legível.

Se não funcionar: confirmar que a classe `hero-grid` está aplicada no `<section>` do hero.

- [ ] **Step 2: Verificar Capabilities em 375px**

Esperado: 1 coluna. Se `minmax(252px,1fr)` ainda forçar 2 colunas em 375px:
```css
/* Adicionar no index.html */
@media (max-width: 540px) {
  .capabilities-grid { grid-template-columns: 1fr !important; }
}
```

- [ ] **Step 3: Verificar Projects em 375px**

Esperado: 1 coluna. `minmax(340px,1fr)` vai forçar overflow em 375px. Adicionar:
```css
@media (max-width: 720px) {
  .projects-grid { grid-template-columns: 1fr !important; }
}
```

- [ ] **Step 4: Verificar Open Source em 767px**

Esperado: empilhado (1 coluna). Confirmar classe `opensource-grid`.

- [ ] **Step 5: Verificar Experience em 375px**

Esperado: `170px 1fr` colapsa para 1 coluna. Confirmar classe `experience-row`.

- [ ] **Step 6: Verificar About em 375px**

Esperado: `120px 1fr` colapsa para 1 coluna. Adicionar classe `about-grid` no JSX:
```tsx
// Na seção About, adicionar className="about-grid" na div externa
```
E no CSS:
```css
@media (max-width: 640px) {
  .about-grid { grid-template-columns: 1fr !important; }
}
```

- [ ] **Step 7: Verificar Publications em 375px**

Esperado: `1fr auto` colapsa. Confirmar classe `pub-row` e CSS:
```css
@media (max-width: 640px) {
  .pub-row { grid-template-columns: 1fr !important; }
  .pub-meta { white-space: normal !important; }
}
```

- [ ] **Step 8: Verificar Contact em 375px**

Esperado: 2 colunas viram 1. Confirmar classe `contact-grid`.

- [ ] **Step 9: Verificar header mobile**

Esperado: links §01–§04 ficam ocultos, hambúrguer aparece, drawer abre. Confirmar classes `nav-links` e `mobile-menu-btn`.

- [ ] **Step 10: Commit final**

```bash
git add App.tsx index.html
git commit -m "fix: mobile responsiveness — collapse all multi-column grids on small screens"
```

---

## Checklist de Spec Coverage

- [x] Troca de fontes (Newsreader + IBM Plex Mono) → Task 1
- [x] Tokens de cor warm dark/light → Task 2
- [x] Header sticky substitui sidebar → Task 3
- [x] Progress bar → Task 3
- [x] Hero 2-col com SVG DAG → Task 4
- [x] Métricas com count-up → Task 5
- [x] About §00 → Task 6
- [x] Capabilities §01 com mod cards → Task 6
- [x] Projects §02 com mod cards e status dots → Task 7
- [x] Open Source §03 com GIF demo → Task 8
- [x] Experience §04 com 2 colunas → Task 9
- [x] Research §05 com publicações → Task 10
- [x] Education §06 com certificações → Task 10
- [x] Contact §07 com form → Task 11
- [x] Back-to-top e Modal → Task 12
- [x] Responsividade mobile todos os breakpoints → Task 13

---

## Observações de Implementação

1. **`FadeIn` component:** Manter o componente `FadeIn` existente (já usa `whileInView` do Framer Motion).
2. **`useCounter` hook:** Já existe em `hooks/useAnimations.ts` — reutilizar como está.
3. **`SynapsysArch`:** Só usado se o Open Source section precisar do arch diagram — no novo design é substituído pelos GIFs, então não é referenciado. Não deletar o arquivo.
4. **`NeuralNetBackground`:** Não é mais referenciado no JSX — o novo background grid é CSS puro via `backgroundImage` no container. Não deletar o arquivo.
5. **`HeroTerminal`:** Não é mais referenciado — substituído pelo `HeroPipelineDAG`. Não deletar o arquivo.
6. **`ArchPipeline`:** Não é mais usado no novo design editorial. Não deletar o arquivo.
7. **`AnimatePresence`:** Manter para o modal e mobile drawer.
8. **Intersection Observer para `activeSection`:** Manter o `useEffect` que observa as seções — necessário para o nav destacar a seção ativa.
