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
const DRAW_MS = 650;       // o dígito surge
const LAYER_MS = 400;      // atraso de uma camada para a próxima
const WAVE_MS = DRAW_MS + LAYER_MS * (NL - 1) + 2300;   // um dígito por ciclo

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
    };

    // ── geometria ──
    let Wd = 0, Hd = 0, cell = 10, gx = 0, gy = 0, barW = 40;
    let lx: number[] = [], ly: number[][] = [];         // x de cada camada e y de cada neurônio (camadas 1..NL-1)
    const layout = () => {
      cell = Math.max(7, Math.min((Hd * 0.44) / 8, (Wd * 0.18) / 8));
      gx = Wd * 0.04; gy = Hd / 2 - cell * 4;
      const x0 = gx + cell * 8 + Wd * 0.11, x1 = Wd * 0.68;
      barW = Math.max(26, Wd * 0.1);
      lx = SIZES.map((_, l) => (l === 0 ? 0 : x0 + ((l - 1) / (NL - 2)) * (x1 - x0)));
      ly = SIZES.map((n, l) => {
        if (l === 0) return [];
        const span = l === NL - 1 ? Hd * 0.72 : Hd * (0.5 + 0.34 * (n / Math.max(...SIZES.slice(1))));
        return Array.from({ length: n }, (_, j) => Hd / 2 - span / 2 + (n === 1 ? span / 2 : (j / (n - 1)) * span));
      });
    };
    const pxc = (i: number) => ({ x: gx + (i % 8) * cell + cell / 2, y: gy + Math.floor(i / 8) * cell + cell / 2 });

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
        const p = pxc(i);
        for (let j = 0; j < SIZES[1]; j++) {
          const c = act[0][i] * NET.W[0][i][j];
          if (Math.abs(c) > 0.9 && Math.random() < 0.35)
            particles.push({ x0: p.x, y0: p.y, x1: lx[1], y1: ly[1][j], t: -DRAW_MS / 900 - Math.random() * 0.2, v: 1 / 750, pos: c > 0, s: Math.min(1, Math.abs(c) / 2.5), curved: false });
        }
      }
      // camada l → l+1
      for (let l = 1; l < NL - 1; l++)
        for (let i = 0; i < SIZES[l]; i++) for (let j = 0; j < SIZES[l + 1]; j++) {
          const c = act[l][i] * NET.W[l][i][j];
          if (c > 1.0 && Math.random() < 0.6)
            particles.push({ x0: lx[l], y0: ly[l][i], x1: lx[l + 1], y1: ly[l + 1][j], t: -(DRAW_MS + LAYER_MS * (l - 1) + 150) / 650 - Math.random() * 0.15, v: 1 / 650, pos: true, s: Math.min(1, c / 3), curved: true });
        }
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
        const g = ctx.createRadialGradient(x, y, 0, x, y, rad * 4);
        g.addColorStop(0, POS); g.addColorStop(1, 'transparent');
        ctx.globalAlpha = a * 0.45; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rad * 4, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.fillStyle = BG; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.12 + a * 0.88; ctx.fillStyle = POS; ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 0.45 + a * 0.45; ctx.strokeStyle = a > 0.35 ? POS : INK; ctx.lineWidth = 1.1;
      ctx.beginPath(); ctx.arc(x, y, rad, 0, Math.PI * 2); ctx.stroke();
    };

    const draw = (now: number, dt: number) => {
      if (now - waveStart > WAVE_MS) { waveStart = now; particles = []; load(sampleIdx++); spawnParticles(); }
      const age = now - waveStart;
      const fadeOut = 1 - ease((age - (WAVE_MS - 450)) / 450);           // tudo apaga no fim do ciclo
      const kIn = (i: number) => ease((age - (i / 64) * DRAW_MS * 0.8) / 260) * fadeOut;   // pixel i surge
      const kL = (l: number) => ease((age - DRAW_MS - LAYER_MS * (l - 1)) / 300) * fadeOut;  // camada l acende
      const kWin = ease((age - DRAW_MS - LAYER_MS * (NL - 1)) / 300) * fadeOut;

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
      const boost = dark ? 1 : 1.7;

      // pixels → 1ª oculta (só dos pixels acesos)
      ctx.lineWidth = 0.6;
      for (let i = 0; i < SIZES[0]; i++) {
        const a = act[0][i] * kIn(i);
        if (a < 0.2) continue;
        const p = pxc(i);
        for (let j = 0; j < SIZES[1]; j++) {
          const w = NET.W[0][i][j], mag = Math.min(1, Math.abs(w) / 2.5);
          if (mag < 0.35) continue;
          ctx.strokeStyle = w > 0 ? POS : NEG; ctx.globalAlpha = Math.min(1, (0.05 + a * mag * 0.16 * (0.6 + kL(1))) * boost);
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(lx[1], ly[1][j]); ctx.stroke();
        }
      }
      // camada l → l+1
      for (let l = 1; l < NL - 1; l++) {
        const W = NET.W[l], k = kL(l);
        const scale = Math.max(...W.flat().map(Math.abs)) * 0.7;
        for (let i = 0; i < SIZES[l]; i++) for (let j = 0; j < SIZES[l + 1]; j++) {
          const w = W[i][j], mag = Math.min(1, Math.abs(w) / scale), on = act[l][i] * k;
          ctx.strokeStyle = w > 0 ? POS : NEG;
          ctx.globalAlpha = Math.min(1, ((dark ? 0.05 : 0.07) + mag * 0.08 + on * mag * 0.4) * boost);
          ctx.lineWidth = 0.5 + mag * 1.5 * (0.4 + on);
          curve(lx[l], ly[l][i], lx[l + 1], ly[l + 1][j]);
        }
      }

      // grade do dígito (entrada)
      ctx.strokeStyle = SOFT; ctx.lineWidth = 1; ctx.globalAlpha = dark ? 0.35 : 0.55;
      ctx.strokeRect(gx - 3, gy - 3, cell * 8 + 6, cell * 8 + 6);
      ctx.fillStyle = INK;
      for (let i = 0; i < SIZES[0]; i++) {
        const p = pxc(i), a = act[0][i] * kIn(i);
        ctx.globalAlpha = dark ? 0.06 : 0.1; ctx.fillRect(p.x - cell / 2 + 0.6, p.y - cell / 2 + 0.6, cell - 1.2, cell - 1.2);
        if (a > 0.02) { ctx.globalAlpha = a; ctx.fillRect(p.x - cell / 2 + 0.6, p.y - cell / 2 + 0.6, cell - 1.2, cell - 1.2); }
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
          neuron(lx[l], ly[l][j], Math.min(1, act[l][j] * k + hover[l][j] * 0.8), rH);
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
          ctx.globalAlpha = (dark ? 0.16 : 0.22) * kWin; ctx.fillStyle = POS;
          ctx.beginPath(); ctx.roundRect(x0, y - rowH / 2, x1 - x0, rowH, rowH / 2); ctx.fill();
          ctx.globalAlpha = (dark ? 0.55 : 0.75) * kWin; ctx.strokeStyle = POS; ctx.lineWidth = 1;
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
        ctx.globalAlpha = isWin ? 0.5 + 0.5 * kWin : 0.5;
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
    const paintStill = () => { waveStart = -1e9; sampleIdx = 0; draw(0, 0); particles = []; draw(WAVE_MS - 600, 0); };

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
