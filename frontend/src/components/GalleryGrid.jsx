import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { galleryItems } from '../data/site';
import ImageReveal from './ImageReveal';

export default function GalleryGrid() {
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  useEffect(() => {
    const onKey = (event) => { if (event.key === 'Escape') setActive(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return (
    <>
      <div className="gallery-grid">
        {galleryItems.map((item, i) => (
          <button key={item.src + i} type="button" className={`gallery-tile gallery-tile--${(i % 5) + 1}`} onClick={() => setActive(item)} aria-label={`Open ${item.title}`} data-cursor>
            <ImageReveal src={item.src} alt={item.alt} caption={`0${i + 1} · ${item.title}`} />
          </button>
        ))}
      </div>
      {active && <div className="lightbox" ref={dialog} role="dialog" aria-modal="true" aria-label={active.title} onClick={() => setActive(null)}>
        <button type="button" className="lightbox__close" aria-label="Close image" onClick={() => setActive(null)}><X size={24} /></button>
        <img src={active.src} alt={active.alt} onClick={(e) => e.stopPropagation()} />
        <div className="lightbox__caption">{active.title}</div>
      </div>}
    </>
  );
}
