import { useEffect, useRef } from 'react';
import { imageReveal } from '../animations/reveal';

export default function ImageReveal({ src, alt, className = '', caption }) {
  const wrap = useRef(null);
  const img = useRef(null);
  useEffect(() => {
    const tween = imageReveal(wrap.current, img.current);
    return () => tween?.kill();
  }, []);
  return (
    <figure className={`reveal-image ${className}`} ref={wrap}>
      <img ref={img} src={src} alt={alt} loading="lazy" onError={(e) => e.currentTarget.classList.add('image-fallback')} />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
