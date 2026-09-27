import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { galleryItems } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = ['all', 'dishes', 'atmosphere', 'pizza', 'drinks'];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const pageRef = useRef(null);

  const filtered = activeFilter === 'all' ? galleryItems : galleryItems.filter(g => g.category === activeFilter);

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);

  const navigate = useCallback((dir) => {
    if (lightbox === null) return;
    const len = filtered.length;
    setLightbox((lightbox + dir + len) % len);
  }, [lightbox, filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [lightbox, navigate]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-hero > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power4.out', delay: 0.3 });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Animate gallery items when filter changes
    gsap.fromTo('.gallery-item', { y: 40, opacity: 0, scale: 0.95 }, {
      y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.5, ease: 'power3.out'
    });
  }, [activeFilter]);

  return (
    <div ref={pageRef} className="bg-midnight text-cream min-h-screen">

      {/* Hero */}
      <section className="pt-40 pb-16 px-6 text-center">
        <div className="gallery-hero max-w-3xl mx-auto">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Visual Journal —</span>
          <h1 className="font-display text-5xl md:text-7xl italic text-cream tracking-wide mb-4">
            The <span className="text-gold">Gallery</span>
          </h1>
          <p className="text-cream/50 text-base max-w-xl mx-auto mb-10">
            A curated collection of moments, dishes, and atmosphere from That's Amore.
          </p>

          {/* Filters */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2.5 text-[10px] font-accent tracking-[0.2em] uppercase border transition-all ${activeFilter === cat ? 'bg-gold text-midnight border-gold' : 'border-white/10 text-cream/50 hover:border-gold/30 hover:text-gold'}`}>
                {cat === 'all' ? `All (${galleryItems.length})` : `${cat} (${galleryItems.filter(g => g.category === cat).length})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid — Masonry-like */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, idx) => (
            <div key={item.id} className="gallery-item break-inside-avoid group relative overflow-hidden cursor-pointer border border-white/5 hover:border-gold/20 transition-all duration-500"
              onClick={() => openLightbox(idx)}>
              <img src={item.src} alt={item.title}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ aspectRatio: idx % 3 === 0 ? '3/4' : idx % 3 === 1 ? '4/3' : '1/1' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="font-display text-lg italic text-cream tracking-wide mb-1">{item.title}</h3>
                  <p className="text-cream/50 text-xs">{item.caption}</p>
                </div>
                <ZoomIn size={18} className="absolute top-4 right-4 text-gold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-[70] bg-midnight/95 backdrop-blur-md flex items-center justify-center" onClick={closeLightbox}>
          <button onClick={closeLightbox} className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center text-cream/60 hover:text-gold border border-white/10 hover:border-gold/30 transition-colors">
            <X size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-cream/40 hover:text-gold border border-white/10 hover:border-gold/30 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); navigate(1); }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-cream/40 hover:text-gold border border-white/10 hover:border-gold/30 transition-colors">
            <ChevronRight size={20} />
          </button>

          <div className="max-w-4xl max-h-[85vh] px-16" onClick={e => e.stopPropagation()}>
            <img src={filtered[lightbox].src} alt={filtered[lightbox].title} className="max-w-full max-h-[75vh] object-contain mx-auto" />
            <div className="text-center mt-4">
              <h3 className="font-display text-xl italic text-cream tracking-wide">{filtered[lightbox].title}</h3>
              <p className="text-cream/40 text-sm mt-1">{filtered[lightbox].caption}</p>
              <span className="text-cream/20 text-xs mt-2 block">{lightbox + 1} / {filtered.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
