import React, { CSSProperties } from 'react';
import { BRANDS } from './brands';

// Logo de marca em silhueta no tom do texto; ganha cor no hover do próprio logo ou de
// qualquer ancestral com a classe `brand-host`. O <img> dá o tamanho natural e, no
// tipo "image", é a camada colorida revelada no hover.

export const brandUrl = (src: string) => `${import.meta.env.BASE_URL}assets/${src}`;

export const BrandMark: React.FC<{ id: string; height: number; maxWidth?: number; style?: CSSProperties }> = ({
  id, height, maxWidth, style,
}) => {
  const b = BRANDS[id];
  if (!b) return null;
  const url = brandUrl(b.src);
  return (
    <span
      className={`brand brand-${b.kind}${b.dark ? ' brand-dark' : ''}`}
      style={{ '--brand': b.hex, '--src': `url("${url}")`, ...style } as CSSProperties}
      role="img" aria-label={b.name}
    >
      <img src={url} alt="" loading="lazy" decoding="async" draggable={false}
        style={{ height, maxWidth: maxWidth ?? height * 5 }} />
      <span className="brand-mask" aria-hidden="true" />
    </span>
  );
};

// ─── Placa de logo ───────────────────────────────────────────────────────────
// A mesma caixa na Trajetória e na Formação. Cada logo tem a altura que o enche
// bem sem estourar a placa (marcas altas, como brasões, ficam maiores que as largas).
const PLATE_H: Record<string, number> = {
  ufabc: 64, ufpa: 64, ifpa: 60, ifma: 60, alumnione: 66, 'oracle-one': 44, otensor: 56, verzel: 52, udemy: 52,
  piracanjuba: 34, dow: 40, ibge: 34, eletrobras: 32,
};

export const LogoPlate: React.FC<{ id: string }> = ({ id }) => (
  <div className="exp-plate brand-host">
    <BrandMark id={id} height={PLATE_H[id] ?? 44} maxWidth={148} />
  </div>
);
