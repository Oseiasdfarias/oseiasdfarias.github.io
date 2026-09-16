import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const MODELO = { b0: 2.79245283, a1: 0.71698113, a0: 9.98490566 };
const DEGRAU_V = 2.5;
const MEIO_PERIODO_S = 9;
const L = 1.15;
const PIVO = new THREE.Vector3(0, 1.75, 0);

interface Aeropendulo3DProps {
  interactive?: boolean;
}

export const Aeropendulo3D: React.FC<Aeropendulo3DProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hud, setHud] = useState({ theta: '0,0°', volt: '0,0 V' });
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    let width = el.clientWidth || 320;
    let height = el.clientHeight || 240;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const cena = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 50);
    camera.position.set(2.4, 2.0, 4.6);
    camera.lookAt(0, 1.1, 0);

    // Luzes
    const luzAmbiente = new THREE.HemisphereLight(0xffffff, 0x444444, 2.0);
    const luzChave = new THREE.DirectionalLight(0xe3a94a, 1.8);
    luzChave.position.set(3, 5, 4);
    const luzRecorte = new THREE.DirectionalLight(0x00d4bc, 1.0);
    luzRecorte.position.set(-4, 2, -3);
    cena.add(luzAmbiente, luzChave, luzRecorte);

    // Materiais
    const matTinta = new THREE.MeshStandardMaterial({
      color: 0xf5f1ea,
      roughness: 0.35,
      metalness: 0.25,
    });
    const matEstrutura = new THREE.MeshStandardMaterial({
      color: 0x44403c,
      roughness: 0.8,
      metalness: 0.1,
    });
    const matLinha = new THREE.LineDashedMaterial({
      color: 0x888277,
      dashSize: 0.06,
      gapSize: 0.06,
    });

    // Base e colunas
    const estrutura = new THREE.Group();
    const base = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.08, 0.9), matEstrutura);
    base.position.y = 0.04;
    estrutura.add(base);

    for (const z of [-0.26, 0.26]) {
      const coluna = new THREE.Mesh(new THREE.BoxGeometry(0.09, PIVO.y - 0.08 + 0.12, 0.09), matEstrutura);
      coluna.position.set(0, (PIVO.y + 0.08 + 0.12) / 2, z);
      estrutura.add(coluna);
    }

    const eixo = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.62, 24), matTinta);
    eixo.rotation.x = Math.PI / 2;
    eixo.position.copy(PIVO);
    estrutura.add(eixo);
    cena.add(estrutura);

    // Linha de repouso
    const geoRepouso = new THREE.BufferGeometry().setFromPoints([
      PIVO.clone(),
      new THREE.Vector3(PIVO.x, PIVO.y - L - 0.25, PIVO.z),
    ]);
    const repouso = new THREE.Line(geoRepouso, matLinha);
    repouso.computeLineDistances();
    cena.add(repouso);

    // Braço mecânico
    const braco = new THREE.Group();
    braco.position.copy(PIVO);
    cena.add(braco);

    const cubo = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.14, 32), matTinta);
    cubo.rotation.x = Math.PI / 2;
    braco.add(cubo);

    const haste = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, L, 16), matTinta);
    haste.position.y = -L / 2;
    braco.add(haste);

    // Motor
    const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.24, 28), matTinta);
    motor.rotation.z = Math.PI / 2;
    motor.position.set(0.1, -L, 0);
    braco.add(motor);

    // Hélice
    const helice = new THREE.Group();
    helice.position.set(0.24, -L, 0);
    braco.add(helice);

    const cuboHelice = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 12), matTinta);
    helice.add(cuboHelice);
    const pa = new THREE.Mesh(new THREE.BoxGeometry(0.016, 0.6, 0.05), matTinta);
    helice.add(pa);

    // Controles manuais de rotação (Orbit manual suave)
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;
    let spherical = { theta: 0.5, phi: 1.25, radius: 5.2 };

    const updateCameraPosition = () => {
      camera.position.x = spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta);
      camera.position.y = 1.1 + spherical.radius * Math.cos(spherical.phi);
      camera.position.z = spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta);
      camera.lookAt(0, 1.1, 0);
    };
    updateCameraPosition();

    const onMouseDown = (e: MouseEvent) => {
      if (!interactive) return;
      isDragging = true;
      setDragActive(true);
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - previousMouseX;
      const deltaY = e.clientY - previousMouseY;

      spherical.theta -= deltaX * 0.008;
      spherical.phi = Math.max(0.7, Math.min(Math.PI * 0.55, spherical.phi - deltaY * 0.008));
      updateCameraPosition();

      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
      setDragActive(false);
    };

    const canvasDom = renderer.domElement;
    canvasDom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Simulação física da dinâmica
    let theta = 0;
    let omega = 0;
    let tempo = 0;
    let ultimo: number | null = null;
    let acumuladorHud = 0;
    let reqId: number;

    const formato = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

    function passo(dt: number) {
      const v = Math.floor(tempo / MEIO_PERIODO_S) % 2 === 0 ? DEGRAU_V : 0;
      const sub = 8;
      const h = dt / sub;
      for (let i = 0; i < sub; i++) {
        const alfa = MODELO.b0 * v - MODELO.a1 * omega - MODELO.a0 * theta;
        omega += alfa * h;
        theta += omega * h;
      }
      tempo += dt;
      return v;
    }

    function animar(agora: number) {
      const dt = ultimo === null ? 0 : Math.min((agora - ultimo) / 1000, 0.05);
      ultimo = agora;

      const v = passo(dt);
      braco.rotation.z = theta;
      helice.rotation.x += (v > 0 ? 0.55 : 0.08) + Math.abs(omega) * 0.05;

      // Auto rotação suave quando o usuário não estiver arrastando
      if (!isDragging) {
        spherical.theta += 0.003;
        updateCameraPosition();
      }

      acumuladorHud += dt;
      if (acumuladorHud > 0.1) {
        const anguloGraus = THREE.MathUtils.radToDeg(theta);
        setHud({
          theta: `${formato.format(anguloGraus)}°`,
          volt: `${formato.format(v)} V`,
        });
        acumuladorHud = 0;
      }

      renderer.render(cena, camera);
      reqId = requestAnimationFrame(animar);
    }

    reqId = requestAnimationFrame(animar);

    // Redimensionamento responsivo
    const ro = new ResizeObserver(() => {
      if (!el) return;
      const nw = el.clientWidth;
      const nh = el.clientHeight;
      if (nw === 0 || nh === 0) return;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(el);

    return () => {
      cancelAnimationFrame(reqId);
      ro.disconnect();
      canvasDom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (el.contains(renderer.domElement)) {
        el.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [interactive]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 200,
        background: 'rgba(0,0,0,0.35)',
        cursor: dragActive ? 'grabbing' : 'grab',
        overflow: 'hidden',
        borderRadius: 2,
      }}
    >
      <div ref={mountRef} style={{ width: '100%', height: '100%' }} />

      {/* HUD de telemetria em tempo real */}
      <div
        style={{
          position: 'absolute',
          top: 10,
          right: 12,
          display: 'flex',
          gap: 12,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11,
          color: 'var(--accent)',
          background: 'rgba(20, 18, 15, 0.75)',
          padding: '4px 10px',
          border: '1px solid var(--line)',
          pointerEvents: 'none',
          backdropFilter: 'blur(4px)',
        }}
      >
        <span>θ = {hud.theta}</span>
        <span style={{ color: 'var(--accent-2)' }}>V = {hud.volt}</span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 8,
          left: 10,
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 9.5,
          color: 'var(--fg-soft)',
          pointerEvents: 'none',
        }}
      >
        <span>3D SIMULATION · THREE.JS (ARRASTE P/ GIRAR)</span>
      </div>
    </div>
  );
};

