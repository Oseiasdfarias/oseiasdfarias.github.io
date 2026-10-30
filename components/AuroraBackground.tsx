import React, { useEffect, useRef, useState } from 'react';

// Aurora em WebGL2 (faixas de ruído fbm com grain em pixel), inspirada no hero do aiXis.
// Pausa fora da viewport, respeita prefers-reduced-motion e cai num gradiente CSS sem WebGL2.

const VERT = `#version 300 es
in vec2 aPosition;
void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uRes;
uniform float uTime;
uniform float uBands;
uniform float uSpeed;
uniform float uBlur;
uniform float uIntensity;
uniform float uGrain;
uniform float uSeed;
uniform float uPixel;
uniform vec3 uColors[3];

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float grainHash(vec2 p, float seed) {
  return fract(sin(dot(p, vec2(12.9898, 78.233)) + seed * 1.6180339) * 43758.5453123);
}
float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}
float fbm2(vec2 p) {
  float value = vnoise(p) * 0.5 + vnoise(p * 2.07 + 9.31) * 0.25;
  return value * 1.3333333;
}
float fbm3(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += amplitude * vnoise(p);
    p = p * 2.03 + 7.13;
    amplitude *= 0.5;
  }
  return value * 1.1428571;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  float y = uv.y;
  float rise = smoothstep(-0.10, 0.26, y);
  float fade = 1.0 - smoothstep(0.16, 1.08, y);
  float envelope = rise * fade * fade;
  vec3 accum = vec3(0.0);
  float alpha = 0.0;
  float bandCount = clamp(uBands, 1.0, 8.0);
  float spacing = 0.92 / bandCount;
  float t = uTime * uSpeed;
  for (int i = 0; i < 8; i++) {
    if (float(i) >= bandCount) break;
    float fi = float(i);
    float seed = fi * 13.37;
    float driftA = fbm3(vec2(y * 1.35 + seed, t * 0.16 + seed)) - 0.5;
    float driftB = vnoise(vec2(y * 3.40 - seed, t * 0.27 + seed * 0.5)) - 0.5;
    float fold = sin(y * 4.1 + t * 0.42 + seed) * 0.045;
    float center = 0.04 + spacing * (fi + 0.5) + driftA * 0.52 + driftB * 0.18 + fold;
    float widthNoise = fbm2(vec2(y * 2.7 + seed * 2.0, t * 0.22 + seed));
    float pinch = smoothstep(0.0, 0.22, y) * (1.0 - smoothstep(0.55, 1.08, y));
    float width = (0.010 + uBlur * 0.052) * mix(0.30, 1.85, widthNoise) * (0.45 + 0.75 * pinch);
    width = max(width, 0.0025);
    float dx = (uv.x - center) / width;
    float d2 = dx * dx;
    float core = exp(-d2 * 2.60);
    float halo = exp(-d2 * 0.22);
    float ribbon = core * 1.30 + halo * 0.34;
    float rays = 0.45 + 0.85 * fbm2(vec2(uv.x * 13.0 + seed, y * 1.7 - t * 0.55));
    float breathe = 0.78 + 0.22 * sin(t * 0.31 + seed) * cos(t * 0.17 + seed * 0.7);
    float weight = ribbon * envelope * rays * breathe * 0.46;
    vec3 hot = mix(uColors[i % 3], vec3(1.0), clamp(core * 0.42, 0.0, 0.45));
    accum += hot * weight;
    alpha += weight;
  }
  float haze = envelope * (1.0 - smoothstep(0.0, 0.58, y)) * 0.10;
  accum += uColors[0] * haze;
  alpha += haze;
  alpha = clamp(alpha * uIntensity, 0.0, 1.0);
  accum = max(accum * uIntensity, vec3(0.0));
  if (uGrain > 0.0) {
    vec2 cell = floor(gl_FragCoord.xy / max(uPixel, 1.0));
    float g = grainHash(cell, uSeed) + grainHash(cell + vec2(41.7, 17.3), uSeed + 7.31) - 1.0;
    float amp = uGrain * 0.42;
    accum *= 1.0 + g * amp * 1.10;
    float bright = max(g, 0.0) * amp * 0.48;
    float dark = max(-g, 0.0) * amp * 0.34;
    accum += vec3(bright) * alpha;
    alpha = clamp(alpha * (1.0 - dark), 0.0, 1.0);
  }
  fragColor = vec4(accum, alpha);
}
`;

// Cobre, âmbar e rosa-queimado: casam com o acento --accent do portfólio.
const COLORS: [number, number, number][] = [
  [0.83, 0.53, 0.35],
  [0.96, 0.62, 0.30],
  [0.70, 0.30, 0.38],
];

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) { gl.deleteShader(sh); return null; }
  return sh;
}

interface Props { intensity?: number; bands?: number; }

export const AuroraBackground: React.FC<Props> = ({ intensity = 1.15, bands = 4 }) => {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [fallback, setFallback] = useState(false);

  useEffect(() => {
    const cv = canvas.current, box = wrap.current;
    if (!cv || !box) return;
    const gl = cv.getContext('webgl2', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) { setFallback(true); return; }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) { setFallback(true); return; }
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { setFallback(true); return; }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'aPosition');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (n: string) => gl.getUniformLocation(prog, n);
    const uRes = u('uRes'), uTime = u('uTime');
    gl.uniform1f(u('uBands'), bands);
    gl.uniform1f(u('uSpeed'), 0.6);
    gl.uniform1f(u('uBlur'), 0.55);
    gl.uniform1f(u('uIntensity'), intensity);
    gl.uniform1f(u('uGrain'), 0.85);
    gl.uniform1f(u('uSeed'), 3.0);
    gl.uniform1f(u('uPixel'), 2.0);
    gl.uniform3fv(u('uColors'), new Float32Array(COLORS.flat()));
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const resize = () => {
      const w = Math.max(1, Math.floor(box.clientWidth * dpr));
      const h = Math.max(1, Math.floor(box.clientHeight * dpr));
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(box);
    resize();

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0, visible = true, start = performance.now();
    const draw = (now: number) => {
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uTime, reduced ? 12 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !reduced) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(box);
    raf = requestAnimationFrame(draw);

    return () => {
      // Sem loseContext(): no StrictMode o remount reaproveita o canvas e receberia um contexto perdido.
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      gl.deleteProgram(prog); gl.deleteShader(vs); gl.deleteShader(fs); gl.deleteBuffer(buf);
    };
  }, [bands, intensity]);

  return (
    <div ref={wrap} aria-hidden="true" className={`aurora-curtain${fallback ? ' aurora-fallback' : ''}`}>
      {!fallback && <canvas ref={canvas} />}
    </div>
  );
};
