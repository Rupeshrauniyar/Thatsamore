import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';
import gsap from 'gsap';

export default function CustomCursor() {
  const finePointer = useMediaQuery('(pointer: fine)');
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!finePointer) return undefined;
    const d = dot.current;
    const r = ring.current;
    const onMove = (event) => {
      gsap.to(d, { x: event.clientX, y: event.clientY, duration: 0.08, ease: 'none' });
      gsap.to(r, { x: event.clientX, y: event.clientY, duration: 0.35, ease: 'power3.out' });
    };
    const onOver = (event) => {
      const target = event.target.closest('a,button,[data-cursor]');
      document.body.classList.toggle('cursor-link', Boolean(target));
    };
    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
    };
  }, [finePointer]);

  if (!finePointer) return null;
  return <><div className="cursor-dot" ref={dot} /><div className="cursor-ring" ref={ring} /></>;
}
