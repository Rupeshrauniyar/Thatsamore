import { useEffect, useRef } from 'react';
import { revealUp } from '../animations/reveal';

export default function RevealText({ children, as: Tag = 'div', className = '', delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const tween = revealUp(ref.current, { start: 'top 88%', y: 24, duration: 0.8, stagger: 0.04 });
    if (delay) tween.delay(delay);
    return () => tween?.kill();
  }, [delay]);
  return <Tag ref={ref} className={`reveal-text ${className}`}>{children}</Tag>;
}
