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
