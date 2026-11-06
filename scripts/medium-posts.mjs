#!/usr/bin/env node
// Gera public/data/medium.json a partir do feed RSS público do Medium.
// Roda no predeploy; o feed traz só os 10 posts mais recentes.
// Uso: node scripts/medium-posts.mjs [usuario]

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const USER = process.argv[2] || 'oseiasfarias';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'data', 'medium.json');

const res = await fetch(`https://medium.com/feed/@${USER}`, { headers: { 'User-Agent': 'Mozilla/5.0 (portfolio build)' } });
if (!res.ok) throw new Error(`feed do Medium respondeu ${res.status}`);
const xml = await res.text();

const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
const decode = s => s
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&(\w+);/g, (m, n) => ENT[n] ?? m);
const cdata = s => (s ?? '').replace(/^<!\[CDATA\[/, '').replace(/\]\]>$/, '').trim();
const tag = (block, name) => cdata(block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`))?.[1]);
const text = html => decode(html.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();

// Linhas de cabeçalho da série que não servem de resumo
const META = /^(série|parte \d|tempo de leitura|>)/i;

const posts = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(([, it]) => {
  const html = tag(it, 'content:encoded');
  const plain = text(html);
  const paras = [...html.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m => text(m[1])).filter(Boolean);
  const excerpt = paras.find(p => p.length > 90 && !META.test(p)) ?? paras[0] ?? '';
  const series = plain.match(/Parte (\d+) (?:de (\d+)|da série)/i);
  const img = html.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? null;
  return {
    title: decode(tag(it, 'title')),
    url: tag(it, 'link').split('?')[0],
    date: new Date(tag(it, 'pubDate')).toISOString(),
    tags: [...it.matchAll(/<category>([\s\S]*?)<\/category>/g)].map(m => cdata(m[1])).slice(0, 4),
    // A CDN do Medium aceita o tamanho no caminho; 800px basta para os cards
    cover: img ? img.replace(/\/max\/\d+\//, '/max/800/') : null,
    excerpt: excerpt.length > 220 ? excerpt.slice(0, 217).replace(/\s+\S*$/, '') + '…' : excerpt,
    // Prefere o tempo que o próprio artigo declara; senão estima por palavras
    minutes: +(plain.match(/Tempo de leitura:\s*~?(\d+)/i)?.[1] ?? Math.max(1, Math.round(plain.split(' ').length / 230))),
    series: series ? { part: +series[1], total: series[2] ? +series[2] : null } : null,
  };
});

if (!posts.length) throw new Error('feed sem posts');
// Nem toda parte cita o total da série; herda de uma que cite
const total = posts.find(p => p.series?.total)?.series.total ?? null;
for (const p of posts) if (p.series && !p.series.total) p.series.total = total;
mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), profile: `https://medium.com/@${USER}`, posts }));
console.log(`medium.json: ${posts.length} posts · mais recente: ${posts[0].title}`);
