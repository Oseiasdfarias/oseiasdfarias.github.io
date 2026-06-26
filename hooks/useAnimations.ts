import { useState, useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';

/** Counts from 0 to `end` (eased) once the ref enters the viewport. */
export function useCounter(end: number, duration = 1500) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-8%' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);

  return { ref, count };
}

/** Types out multiple lines sequentially once the ref enters the viewport. */
export function useTypewriter(lines: string[], charSpeed = 38, lineDelay = 350) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-5%' });
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;
    setDisplayedLines([]);
    setLineIndex(0);
    setCharIndex(0);
  }, [inView]);

  useEffect(() => {
    if (!inView || lineIndex >= lines.length) return;

    const line = lines[lineIndex];
    if (charIndex < line.length) {
      const t = setTimeout(() => setCharIndex(c => c + 1), charSpeed);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setLineIndex(l => l + 1);
        setCharIndex(0);
      }, lineDelay);
      return () => clearTimeout(t);
    }
  }, [inView, lineIndex, charIndex, lines, charSpeed, lineDelay]);

  const partial = lineIndex < lines.length ? lines[lineIndex].slice(0, charIndex) : '';
  const done = lineIndex >= lines.length;

  return { ref, displayedLines, partial, done };
}
