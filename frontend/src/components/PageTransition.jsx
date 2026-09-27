import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';

export default function PageTransition() {
  const overlay = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    const el = overlay.current;
    if (!el) return;
    gsap.fromTo(el, { scaleY: 1, transformOrigin: 'top' }, { scaleY: 0, duration: 0.55, ease: 'power3.inOut' });
  }, [pathname]);
  return <div ref={overlay} className="page-overlay" aria-hidden="true" />;
}
