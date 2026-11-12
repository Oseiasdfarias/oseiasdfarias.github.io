import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DIGITS_NET } from './digitsNet';

// ─── Hero: rede neural reconhecendo dígitos ──────────────────────────────────
// Rede de verdade, treinada por scripts/digits_train.py (64 → 16 → 12 → 10, 95% no teste):
//  · à esquerda, um dígito 8×8 do conjunto de teste surge pixel a pixel (entrada);
//  · ativação = brilho do neurônio (como no vídeo do 3Blue1Brown);
//  · peso = cor e espessura da conexão: cobre positivo, azul negativo (TensorFlow Playground);
//  · partículas correm pelas contribuições mais fortes, camada por camada;
//  · à direita, as saídas 0–9 com a probabilidade; o número reconhecido ganha um anel.
// Canvas 2D, sem moldura; pausa fora da tela e com a aba oculta;
// com "reduzir movimento" desenha um quadro parado.

const NET = DIGITS_NET;
const SIZES = NET.sizes as readonly number[];          // [64, ...ocultas, 10]
const NL = SIZES.length;                                // nº de camadas, contando entrada e saída
const ORDER = [3, 7, 1, 8, 5, 0, 9, 2, 6, 4];
const DRAW_MS = 800;       // o dígito surge
const LAYER_MS = 480;      // atraso de uma camada para a próxima
const HOLD_MS = 3600;      // a resposta fica na tela
const FADE_MS = 900;       // transição suave para o próximo dígito
const WAVE_MS = DRAW_MS + LAYER_MS * (NL - 1) + HOLD_MS;   // um dígito por ciclo (~5,8 s)

const sig = (x: number) => 1 / (1 + Math.exp(-x));
const softmax = (z: number[]) => { const m = Math.max(...z); const e = z.map(v => Math.exp(v - m)); const s = e.reduce((a, b) => a + b, 0); return e.map(v => v / s); };
const ease = (t: number) => (t <= 0 ? 0 : t >= 1 ? 1 : 1 - Math.pow(1 - t, 3));

type Particle = { x0: number; y0: number; x1: number; y1: number; t: number; v: number; pos: boolean; s: number; curved: boolean };

export const HeroNeural: React.FC<{ dark: boolean; label: string; height?: string }> = ({ dark, label, height = 'clamp(300px,52vh,480px)' }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = cv.current!, host = wrap.current!;
    const ctx = canvas.getContext('2d')!;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const root = (host.closest('[data-theme-root]') as HTMLElement) ?? document.documentElement;
    const read = (n: string, f: string) => getComputedStyle(root).getPropertyValue(n).trim() || f;
    const POS = read('--accent', dark ? '#d4885a' : '#9a4a24');
    const NEG = read('--c-sky', dark ? '#38bdf8' : '#0369a1');
    const INK = read('--fg', dark ? '#f4f4f3' : '#111');
    const SOFT = read('--fg-soft', dark ? '#8a8a86' : '#6b6b66');
    const BG = read('--bg', dark ? '#050505' : '#f5f5f4');
    const MONO = "'JetBrains Mono', monospace";

    // ── forward pass real: act[0] = pixels, act[NL-1] = probabilidades 0–9 ──
    let act: number[][] = SIZES.map(n => Array(n).fill(0));
    let winner = 0, sampleIdx = 0;
    // rel[l][i] ∈ [0,1]: quanto o neurônio i da camada l empurrou a rede para o dígito vencedor
    // (ativação × peso, só contribuições positivas, propagado da saída até os pixels)
    let rel: number[][] = SIZES.map(n => Array(n).fill(0));
    const load = (k: number) => {
      const s = NET.samples[ORDER[k % ORDER.length]];
      act = [s.px.map(v => v / 16)];
      for (let l = 0; l < NL - 1; l++) {
        const W = NET.W[l], b = NET.b[l], prev = act[l];
        const z = b.map((bj, j) => prev.reduce((acc, v, i) => acc + v * W[i][j], bj));
        act.push(l === NL - 2 ? softmax(z) : z.map(sig));
      }
      const out = act[NL - 1];
      winner = out.indexOf(Math.max(...out));
      rel = SIZES.map(n => Array(n).fill(0));
      rel[NL - 1][winner] = 1;
      for (let l = NL - 2; l >= 0; l--) {
        const W = NET.W[l];
        const r = act[l].map((a, i) => Math.max(0, rel[l + 1].reduce((acc, rj, j) => acc + a * W[i][j] * rj, 0)));
        const m = Math.max(...r, 1e-9);
        rel[l] = r.map(v => v / m);
      }
    };

    // ── geometria ──
    let Wd = 0, Hd = 0, cell = 10, gx = 0, gy = 0, barW = 40;
    let sx = 0, sy0 = 0, sh = 4, sw = 6;                 // coluna de flatten: 64 células
    let lx: number[] = [], ly: number[][] = [];         // x de cada camada e y de cada neurônio (camadas 1..NL-1)
    const layout = () => {
      cell = Math.max(6, Math.min((Hd * 0.4) / 8, (Wd * 0.15) / 8));
      gx = Wd * 0.03; gy = Hd / 2 - cell * 4;
      sh = (Hd * 0.86) / 64; sy0 = Hd * 0.07; sw = Math.max(5, cell * 0.6);
      sx = gx + cell * 8 + Wd * 0.07;
      const x0 = sx + sw + Wd * 0.11, x1 = Wd * 0.68;
      barW = Math.max(26, Wd * 0.1);
      lx = SIZES.map((_, l) => (l === 0 ? 0 : x0 + ((l - 1) / (NL - 2)) * (x1 - x0)));
      ly = SIZES.map((n, l) => {
        if (l === 0) return [];
        const span = l === NL - 1 ? Hd * 0.72 : Hd * (0.5 + 0.34 * (n / Math.max(...SIZES.slice(1))));
        return Array.from({ length: n }, (_, j) => Hd / 2 - span / 2 + (n === 1 ? span / 2 : (j / (n - 1)) * span));
      });
    };
    const pxc = (i: number) => ({ x: gx + (i % 8) * cell + cell / 2, y: gy + Math.floor(i / 8) * cell + cell / 2 });
    const stc = (i: number) => ({ x: sx + sw, y: sy0 + i * sh + sh / 2 });   // saída da célula i do flatten

    const resize = () => {
      const rc = host.getBoundingClientRect();
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      Wd = rc.width; Hd = rc.height;
      canvas.width = Wd * dpr; canvas.height = Hd * dpr;
      canvas.style.width = `${Wd}px`; canvas.style.height = `${Hd}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layout();
    };

    let particles: Particle[] = [];
    let waveStart = -1e9;
    const mouse = { x: -1e4, y: -1e4 };
    const hover = SIZES.map(n => Array(n).fill(0));

    const spawnParticles = () => {
      // pixels acesos → 1ª camada oculta
      for (let i = 0; i < SIZES[0]; i++) {
        if (act[0][i] < 0.45) continue;
        const p = stc(i);
        for (let j = 0; j < SIZES[1]; j++) {
          const c = act[0][i] * NET.W[0][i][j];
          if (Math.abs(c) > 0.9 && Math.random() < 0.35)
            particles.push({ x0: p.x, y0: p.y, x1: lx[1], y1: ly[1][j], t: -DRAW_MS / 1000 - Math.random() * 0.2, v: 1 / 900, pos: c > 0, s: Math.min(1, Math.abs(c) / 2.5), curved: false });
        }
      }
      // camada l → l+1
      for (let l = 1; l < NL - 1; l++)
        for (let i = 0; i < SIZES[l]; i++) for (let j = 0; j < SIZES[l + 1]; j++) {
          const c = act[l][i] * NET.W[l][i][j];
          if (c > 1.0 && Math.random() < 0.6)
            particles.push({ x0: lx[l], y0: ly[l][i], x1: lx[l + 1], y1: ly[l + 1][j], t: -(DRAW_MS + LAYER_MS * (l - 1) + 150) / 800 - Math.random() * 0.15, v: 1 / 800, pos: true, s: Math.min(1, c / 3), curved: true });
        }
    };

    // desenha a curva só até a fração g do caminho (a linha "nasce" da origem até o destino)
    const curvePart = (x0: number, y0: number, x1: number, y1: number, g: number) => {
      if (g <= 0) return;
      if (g >= 1) { curve(x0, y0, x1, y1); return; }
      const dx = (x1 - x0) * 0.5, n = 14;
      ctx.beginPath(); ctx.moveTo(x0, y0);
      for (let s = 1; s <= n; s++) {
        const t = (s / n) * g, u = 1 - t;
        ctx.lineTo(u * u * u * x0 + 3 * u * u * t * (x0 + dx) + 3 * u * t * t * (x1 - dx) + t * t * t * x1,
                   u * u * u * y0 + 3 * u * u * t * y0 + 3 * u * t * t * y1 + t * t * t * y1);
      }
      ctx.stroke();
      // ponta luminosa enquanto a linha cresce
      const t = g, u = 1 - t;
      const hx = u * u * u * x0 + 3 * u * u * t * (x0 + dx) + 3 * u * t * t * (x1 - dx) + t * t * t * x1;
      const hy = u * u * u * y0 + 3 * u * u * t * y0 + 3 * u * t * t * y1 + t * t * t * y1;
      const a0 = ctx.globalAlpha; ctx.globalAlpha = Math.min(1, a0 * 3); ctx.fillStyle = ctx.strokeStyle;
      ctx.beginPath(); ctx.arc(hx, hy, 1.3, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = a0;
    };
    const curve = (x0: number, y0: number, x1: number, y1: number) => {
      const dx = (x1 - x0) * 0.5;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.bezierCurveTo(x0 + dx, y0, x1 - dx, y1, x1, y1); ctx.stroke();
    };
    const onCurve = (p: Particle, t: number) => {
      const dx = (p.x1 - p.x0) * 0.5, u = 1 - t;
      return {
        x: u * u * u * p.x0 + 3 * u * u * t * (p.x0 + dx) + 3 * u * t * t * (p.x1 - dx) + t * t * t * p.x1,
        y: u * u * u * p.y0 + 3 * u * u * t * p.y0 + 3 * u * t * t * p.y1 + t * t * t * p.y1,
      };
    };

    const neuron = (x: number, y: number, a: number, rad: number) => {
      if (a > 0.05) {
        const R = rad * (dark ? 4 : 2.6);
        const g = ctx.createRadialGradient(x, y, 0, x, y, R);
        g.addColorStop(0, POS); g.addColorStop(1, 'transparent');
        ctx.globalAlpha = a * (dark ? 0.45 : 0.16); ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.fillStyle = BG; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.12 + a * 0.88; ctx.fillStyle = POS; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = (dark ? 0.45 : 0.6) + a * 0.4; ctx.strokeStyle = a > 0.35 ? POS : INK; ctx.lineWidth = dark ? 1.1 : 1;
      ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.stroke();
    };

    const draw = (now: number, dt: number) => {
      if (now - waveStart > WAVE_MS) { waveStart = now; particles = []; load(sampleIdx++); spawnParticles(); }
      const age = now - waveStart;
      const fadeOut = 1 - ease((age - (WAVE_MS - FADE_MS)) / FADE_MS);           // tudo apaga no fim do ciclo
      const kIn = (i: number) => ease((age - (i / 64) * DRAW_MS * 0.8) / 380) * fadeOut;   // pixel i surge
      const kL = (l: number) => ease((age - DRAW_MS - LAYER_MS * (l - 1)) / 420) * fadeOut;  // camada l acende
      const kWin = ease((age - DRAW_MS - LAYER_MS * (NL - 1)) / 420) * fadeOut;
      const tDec = DRAW_MS + LAYER_MS * (NL - 1) + 250;
      const kBack = (l: number) => ease((age - tDec - (NL - 2 - l) * 280) / 450) * fadeOut;   // camada l entra no caminho

      ctx.clearRect(0, 0, Wd, Hd);
      // véu suave atrás da figura (elipse que chega a zero nas bordas)
      if (dark) {
      ctx.save(); ctx.translate(Wd / 2, Hd / 2); ctx.scale(Wd / 2, Hd / 2);
      const v = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
      if (dark) { v.addColorStop(0, BG); v.addColorStop(0.65, BG); v.addColorStop(1, 'transparent'); }
      else { v.addColorStop(0, BG); v.addColorStop(0.3, BG); v.addColorStop(0.75, 'rgba(245,245,244,0.35)'); v.addColorStop(1, 'transparent'); }
      ctx.globalAlpha = 0.55; ctx.fillStyle = v; ctx.fillRect(-1, -1, 2, 2);
      ctx.restore();
      }
      // no claro o fundo já é nebuloso: em vez de véu, linhas e neurônios mais fortes
      const boost = dark ? 1 : 1.2;
      const thin = dark ? 1 : 0.7;

      // as ligações ficam sempre visíveis, fracas (a "sombra" da rede); a cada dígito, um traço
      // mais forte percorre cada uma da origem ao destino, em cascata (um destino após o outro),
      // terminando antes de a ativação chegar
      const GROW = 500, STAG = 26;
      const growStart = (L: number) => (L === 1 ? DRAW_MS * 0.15 : DRAW_MS + LAYER_MS * (L - 2) - 260);
      const grow = (L: number, j: number) => ease((age - growStart(L) - j * STAG) / GROW);

      // pixels → 1ª oculta (só dos pixels acesos)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < SIZES[0]; i++) {
        const a = act[0][i] * kIn(i);
        if (a < 0.2) continue;
        const p = stc(i);
        for (let j = 0; j < SIZES[1]; j++) {
          const w = NET.W[0][i][j], mag = Math.min(1, Math.abs(w) / 2.5);
          if (mag < 0.35) continue;
          const g = grow(1, j + (i % 8) * 0.6), x1 = lx[1], y1 = ly[1][j];
          ctx.strokeStyle = w > 0 ? POS : NEG;
          ctx.globalAlpha = Math.min(1, (0.04 + a * mag * 0.06) * boost);              // sombra
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(x1, y1); ctx.stroke();
          if (g > 0) {                                                               // traço que cresce
            ctx.globalAlpha = Math.min(1, a * mag * 0.16 * (0.6 + kL(1)) * boost * fadeOut);
            ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x + (x1 - p.x) * g, p.y + (y1 - p.y) * g); ctx.stroke();
          }
        }
      }
      // camada l → l+1
      for (let l = 1; l < NL - 1; l++) {
        const W = NET.W[l], k = kL(l);
        const scale = Math.max(...W.flat().map(Math.abs)) * 0.7;
        for (let i = 0; i < SIZES[l]; i++) for (let j = 0; j < SIZES[l + 1]; j++) {
          const w = W[i][j], mag = Math.min(1, Math.abs(w) / scale), on = act[l][i] * k;
          ctx.strokeStyle = w > 0 ? POS : NEG;
          ctx.globalAlpha = Math.min(1, ((dark ? 0.05 : 0.07) + mag * 0.08) * boost);      // sombra
          ctx.lineWidth = (0.5 + mag * 0.6) * thin;
          curve(lx[l], ly[l][i], lx[l + 1], ly[l + 1][j]);
          if (on > 0.02) {                                                              // traço que cresce
            ctx.globalAlpha = Math.min(1, on * mag * 0.45 * boost);
            ctx.lineWidth = (0.5 + mag * 1.5 * (0.4 + on)) * thin;
            curvePart(lx[l], ly[l][i], lx[l + 1], ly[l + 1][j], grow(l + 1, j + i * 0.15));
          }
        }
      }

      // caminho da decisão: ligações positivas entre neurônios que levaram ao dígito vencedor
      for (let l = 0; l < NL - 1; l++) {
        const kb = kBack(l);
        if (kb <= 0) continue;
        const W = NET.W[l];
        ctx.strokeStyle = POS;
        for (let i = 0; i < SIZES[l]; i++) {
          if (rel[l][i] < 0.25) continue;
          for (let j = 0; j < SIZES[l + 1]; j++) {
            const ps = rel[l][i] * rel[l + 1][j];
            if (ps < 0.12 || W[i][j] <= 0) continue;
            ctx.globalAlpha = Math.min(1, ps * (l === 0 ? 0.55 : 0.85) * kb * boost);
            ctx.lineWidth = (0.8 + ps * 1.8) * thin;
            if (l === 0) { const p = stc(i); ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(lx[1], ly[1][j]); ctx.stroke(); }
            else curve(lx[l], ly[l][i], lx[l + 1], ly[l + 1][j]);
          }
        }
      }

      // faixas que ligam cada linha do dígito ao seu trecho de 8 células no flatten
      for (let r = 0; r < 8; r++) {
        let rowA = 0; for (let c = 0; c < 8; c++) rowA += act[0][r * 8 + c] * kIn(r * 8 + c);
        rowA /= 8;
        const xa = gx + cell * 8 + 3, xb = sx, ya0 = gy + r * cell + 1, ya1 = gy + (r + 1) * cell - 1;
        const yb0 = sy0 + r * 8 * sh, yb1 = sy0 + (r + 1) * 8 * sh, mx = (xa + xb) / 2;
        ctx.globalAlpha = (dark ? 0.05 : 0.07) + rowA * 0.22; ctx.fillStyle = INK;
        ctx.beginPath(); ctx.moveTo(xa, ya0);
        ctx.bezierCurveTo(mx, ya0, mx, yb0, xb, yb0); ctx.lineTo(xb, yb1);
        ctx.bezierCurveTo(mx, yb1, mx, ya1, xa, ya1); ctx.closePath(); ctx.fill();
      }
      // coluna de flatten (64 entradas da rede)
      if (!dark) { ctx.globalAlpha = 0.85; ctx.fillStyle = BG; ctx.fillRect(sx - 2, sy0 - 2, sw + 4, sh * 64 + 4); }
      ctx.strokeStyle = SOFT; ctx.lineWidth = 1; ctx.globalAlpha = dark ? 0.35 : 0.55;
      ctx.strokeRect(sx - 2, sy0 - 2, sw + 4, sh * 64 + 4);
      for (let i = 0; i < SIZES[0]; i++) {
        const y = sy0 + i * sh, a = act[0][i] * kIn(i);
        ctx.fillStyle = INK; ctx.globalAlpha = dark ? 0.06 : 0.1; ctx.fillRect(sx, y + 0.3, sw, Math.max(0.6, sh - 0.6));
        if (a > 0.02) { ctx.globalAlpha = a; ctx.fillRect(sx, y + 0.3, sw, Math.max(0.6, sh - 0.6)); }
        const kr = rel[0][i] * kBack(0);
        if (kr > 0.15) { ctx.fillStyle = POS; ctx.globalAlpha = kr; ctx.fillRect(sx, y + 0.3, sw, Math.max(0.6, sh - 0.6)); }
      }
      ctx.font = `400 ${Math.max(8, Math.min(10, Hd / 46))}px ${MONO}`; ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'center';
      ctx.fillStyle = SOFT; ctx.globalAlpha = dark ? 0.7 : 0.85;
      ctx.fillText('8×8', gx + cell * 4, gy - 9);
      ctx.fillText('64', sx + sw / 2, sy0 - 7);
      ctx.textAlign = 'start';

      // grade do dígito (entrada)
      if (!dark) { ctx.globalAlpha = 0.85; ctx.fillStyle = BG; ctx.fillRect(gx - 3, gy - 3, cell * 8 + 6, cell * 8 + 6); }
      ctx.strokeStyle = SOFT; ctx.lineWidth = 1; ctx.globalAlpha = dark ? 0.35 : 0.55;
      ctx.strokeRect(gx - 3, gy - 3, cell * 8 + 6, cell * 8 + 6);
      ctx.fillStyle = INK;
      for (let i = 0; i < SIZES[0]; i++) {
        const p = pxc(i), a = act[0][i] * kIn(i);
        ctx.globalAlpha = dark ? 0.06 : 0.1; ctx.fillRect(p.x - cell / 2 + 0.6, p.y - cell / 2 + 0.6, cell - 1.2, cell - 1.2);
        if (a > 0.02) { ctx.globalAlpha = a; ctx.fillRect(p.x - cell / 2 + 0.6, p.y - cell / 2 + 0.6, cell - 1.2, cell - 1.2); }
        const kr = rel[0][i] * kBack(0);
        if (kr > 0.15) {
          ctx.fillStyle = POS; ctx.globalAlpha = kr * 0.85; ctx.fillRect(p.x - cell / 2 + 0.6, p.y - cell / 2 + 0.6, cell - 1.2, cell - 1.2);
          ctx.fillStyle = INK;
        }
      }

      // partículas
      const alive: Particle[] = [];
      for (const p of particles) {
        p.t += p.v * dt;
        if (p.t > 1) continue;
        alive.push(p);
        if (p.t < 0) continue;
        const q = p.curved ? onCurve(p, p.t) : { x: p.x0 + (p.x1 - p.x0) * p.t, y: p.y0 + (p.y1 - p.y0) * p.t };
        ctx.fillStyle = p.pos ? POS : NEG;
        ctx.globalAlpha = 0.3 * p.s * fadeOut; ctx.beginPath(); ctx.arc(q.x, q.y, 4.5, 0, Math.PI * 2); ctx.fill();
        ctx.globalAlpha = 0.95 * fadeOut; ctx.beginPath(); ctx.arc(q.x, q.y, 1.7, 0, Math.PI * 2); ctx.fill();
      }
      particles = alive.slice(-600);

      // camadas ocultas
      const rH = Math.max(3.2, Math.min(5.5, Hd / 80));
      for (let l = 1; l < NL - 1; l++) {
        const k = kL(l);
        for (let j = 0; j < SIZES[l]; j++) {
          const d = Math.hypot(lx[l] - mouse.x, ly[l][j] - mouse.y);
          hover[l][j] = Math.max(hover[l][j] * 0.92, d < 40 ? 1 - d / 40 : 0);
          const kb = kBack(l), base = act[l][j] * k;
          const a = base * (1 - 0.7 * kb) + rel[l][j] * kb;
          neuron(lx[l], ly[l][j], Math.min(1, a + hover[l][j] * 0.8), rH * (1 + 0.3 * rel[l][j] * kb));
          if (rel[l][j] > 0.45 && kb > 0) {
            ctx.globalAlpha = rel[l][j] * kb * 0.9; ctx.strokeStyle = POS; ctx.lineWidth = 1.2;
            ctx.beginPath(); ctx.arc(lx[l], ly[l][j], rH * (1 + 0.3 * rel[l][j]) + 3.5, 0, Math.PI * 2); ctx.stroke();
          }
        }
      }

      // saída: 0–9 com barra de probabilidade
      const L = NL - 1, ox = lx[L], kO = kL(L), out = act[L];
      const rO = Math.max(4, Math.min(7, Hd / 62));
      const fs = Math.max(10, Math.min(14, Hd / 30));
      ctx.textBaseline = 'middle';
      // "pulo" do número vencedor: cresce passando um pouco do tamanho final e assenta
      const tWin = age - DRAW_MS - LAYER_MS * (NL - 1);
      const pop = kWin <= 0 ? 0 : tWin < 260 ? ease(tWin / 260) * 1.18 : 1.18 - 0.18 * ease((tWin - 260) / 220);
      const lx0 = ox + rO + 9;
      for (let j = 0; j < SIZES[L]; j++) {
        const pj = out[j] ?? 0, a = Math.min(1, pj * 1.4) * kO, isWin = j === winner, y = ly[L][j];
        const bx = lx0 + fs * 0.9;

        if (isWin && kWin > 0) {
          // faixa de destaque atrás da linha vencedora (número, barra e porcentagem)
          const rowH = fs * 1.9, x0 = ox - rO - 8, x1 = bx + barW + fs * 3.2;
          if (!dark) { ctx.globalAlpha = 0.9 * kWin; ctx.fillStyle = BG; ctx.beginPath(); ctx.roundRect(x0, y - rowH / 2, x1 - x0, rowH, rowH / 2); ctx.fill(); }
          ctx.globalAlpha = (dark ? 0.16 : 0.14) * kWin; ctx.fillStyle = POS;
          ctx.beginPath(); ctx.roundRect(x0, y - rowH / 2, x1 - x0, rowH, rowH / 2); ctx.fill();
          ctx.globalAlpha = (dark ? 0.55 : 0.9) * kWin; ctx.strokeStyle = POS; ctx.lineWidth = dark ? 1 : 1.3;
          ctx.beginPath(); ctx.roundRect(x0, y - rowH / 2, x1 - x0, rowH, rowH / 2); ctx.stroke();
          // anéis que expandem a partir do neurônio, repetindo enquanto a decisão está na tela
          for (let k = 0; k < 2; k++) {
            const ph = ((tWin + k * 550) % 1100) / 1100;
            ctx.globalAlpha = (1 - ph) * 0.7 * kWin; ctx.strokeStyle = POS; ctx.lineWidth = 1.3;
            ctx.beginPath(); ctx.arc(ox, y, rO + 3 + ph * 16, 0, Math.PI * 2); ctx.stroke();
          }
        }

        neuron(ox, y, isWin ? Math.max(a, kWin) : a, isWin ? rO * (1 + 0.25 * pop) : rO);

        // rótulo 0–9 (o vencedor maior, em negrito e na cor de destaque)
        const size = isWin ? fs * (1 + 0.55 * pop) : fs;
        ctx.globalAlpha = isWin ? 0.5 + 0.5 * kWin : (dark ? 0.5 : 0.75);
        ctx.fillStyle = isWin && kWin > 0.2 ? POS : INK;
        ctx.font = `${isWin && kWin > 0.2 ? 700 : 400} ${size}px ${MONO}`;
        ctx.fillText(String(j), lx0 - (size - fs) * 0.25, y + 0.5);

        // barra de probabilidade (a do vencedor mais grossa)
        const bh = isWin ? 3 + 3 * kWin : 3;
        ctx.globalAlpha = 0.12; ctx.fillStyle = INK; ctx.fillRect(bx, y - 1.5, barW, 3);
        ctx.globalAlpha = 0.9; ctx.fillStyle = isWin ? POS : SOFT; ctx.fillRect(bx, y - bh / 2, barW * pj * kO, bh);
        if (pj >= 0.05 && kO > 0.3) {
          ctx.globalAlpha = (isWin ? 1 : 0.7) * kO; ctx.fillStyle = isWin ? POS : SOFT;
          ctx.font = `${isWin ? 700 : 400} ${isWin ? fs * (0.8 + 0.25 * kWin) : fs * 0.78}px ${MONO}`;
          ctx.fillText(`${Math.round(pj * 100)}%`, bx + barW + 6, y + 0.5);
        }
      }
      ctx.globalAlpha = 1;
    };

    let raf = 0, running = false, prev = 0;
    const loop = (now: number) => { draw(now, Math.min(50, now - prev)); prev = now; raf = requestAnimationFrame(loop); };
    const start = () => { if (!running && !still) { running = true; prev = performance.now(); raf = requestAnimationFrame(loop); } };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    // quadro parado (reduzir movimento): o "3" já reconhecido
    const paintStill = () => { waveStart = -1e9; sampleIdx = 0; draw(0, 0); particles = []; draw(WAVE_MS - FADE_MS - 300, 0); };

    resize();
    if (still) paintStill();
    const ro = new ResizeObserver(() => { resize(); if (still) paintStill(); });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()));
    io.observe(host);
    const vis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', vis);
    const move = (ev: PointerEvent) => { const rc = canvas.getBoundingClientRect(); mouse.x = ev.clientX - rc.left; mouse.y = ev.clientY - rc.top; };
    const leave = () => { mouse.x = mouse.y = -1e4; };
    host.addEventListener('pointermove', move); host.addEventListener('pointerleave', leave);

    return () => {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', vis);
      host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave);
    };
  }, [dark]);

  return (
    <motion.div ref={wrap} className="hero-neural" role="img" aria-label={label}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2, delay: 0.2 }}
      style={{ position: 'relative', width: '100%', height }}>
      <canvas ref={cv} aria-hidden="true" style={{ display: 'block' }} />
    </motion.div>
  );
};
