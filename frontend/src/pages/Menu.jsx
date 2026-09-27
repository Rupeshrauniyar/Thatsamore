import { useEffect, useRef, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Search, X, ArrowUpRight, Wine, Download, Flame, Filter, Grid, List, Star } from 'lucide-react';
import { menuSections, images, PDF_MENU_URL } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const DIET_FILTERS = [
  { key: 'all', label: 'All Dishes', icon: null },
  { key: 'V', label: 'Vegetarian', icon: '🌿' },
  { key: 'VG', label: 'Vegan', icon: '🌱' },
  { key: 'GF', label: 'Gluten-Free', icon: '🌾' },
  { key: 'featured', label: 'Chef\'s Pick', icon: '★' },
];

export default function Menu() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeDiet, setActiveDiet] = useState('all');
  const [viewMode, setViewMode] = useState('editorial');
  const [selectedDish, setSelectedDish] = useState(null);
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-hero-title', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.2 });
      gsap.fromTo('.menu-hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.6 });
      gsap.fromTo('.menu-filter-bar', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 0.8 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!contentRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.menu-section-block', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: contentRef.current, start: 'top 85%' }
      });
    }, contentRef);
    return () => ctx.revert();
  }, [activeCategory, activeDiet, search]);

  const filteredSections = useMemo(() => {
    return menuSections
      .filter(s => activeCategory === 'all' || s.id === activeCategory)
      .map(section => ({
        ...section,
        items: section.items.filter(item => {
          const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase()) || item.desc.toLowerCase().includes(search.toLowerCase());
          const matchDiet = activeDiet === 'all' ||
            (activeDiet === 'featured' && item.featured) ||
            (item.diet && item.diet.split(' ').includes(activeDiet));
          return matchSearch && matchDiet;
        })
      }))
      .filter(s => s.items.length > 0);
  }, [search, activeCategory, activeDiet]);

  const totalItems = filteredSections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <div ref={heroRef} className="bg-midnight text-cream min-h-screen">

      {/* ═══ Hero ═══ */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.heroPizza} alt="Menu" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/80 via-midnight/90 to-midnight" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <span className="menu-hero-sub text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Il Nostro Menu —</span>
          <h1 className="menu-hero-title font-display text-6xl md:text-8xl italic text-cream tracking-wide mb-4">
            The <span className="text-gold">Menu</span>
          </h1>
          <p className="menu-hero-sub text-cream/50 text-base max-w-xl mx-auto mb-8">
            Authentic Sicilian recipes, fresh daily pasta, stone-baked pizza proofed for 48 hours, and fresh seafood from the coast.
          </p>

          {/* Search */}
          <div className="menu-filter-bar max-w-lg mx-auto relative mb-6">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-cream/30" />
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Search dishes..."
              className="w-full pl-12 pr-12 py-4 bg-white/[0.03] border border-white/10 text-cream placeholder:text-cream/30 text-sm outline-none focus:border-gold/40 transition-colors"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-cream/40 hover:text-gold">
                <X size={16} />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="menu-filter-bar flex items-center justify-center gap-4 flex-wrap">
            <a href={PDF_MENU_URL} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gold/30 text-gold text-[10px] font-accent tracking-[0.2em] uppercase hover:bg-gold/10 transition-all">
              <Download size={12} /> Download PDF
            </a>
            <div className="flex items-center gap-1 border border-white/10 p-1">
              <button onClick={() => setViewMode('editorial')}
                className={`p-2 transition-colors ${viewMode === 'editorial' ? 'bg-gold/20 text-gold' : 'text-cream/40 hover:text-gold'}`}>
                <List size={14} />
              </button>
              <button onClick={() => setViewMode('grid')}
                className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-gold/20 text-gold' : 'text-cream/40 hover:text-gold'}`}>
                <Grid size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Filters ═══ */}
      <div className="sticky top-0 z-30 bg-midnight/90 backdrop-blur-xl border-b border-white/5 px-6">
        <div className="max-w-7xl mx-auto py-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 flex-wrap flex-1">
            <button onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 text-[10px] font-accent tracking-[0.2em] uppercase transition-all border ${activeCategory === 'all' ? 'bg-gold text-midnight border-gold' : 'border-white/10 text-cream/50 hover:border-gold/30 hover:text-gold'}`}>
              All ({menuSections.reduce((s, sec) => s + sec.items.length, 0)})
            </button>
            {menuSections.map(s => (
              <button key={s.id} onClick={() => setActiveCategory(s.id)}
                className={`px-4 py-2 text-[10px] font-accent tracking-[0.2em] uppercase transition-all border ${activeCategory === s.id ? 'bg-gold text-midnight border-gold' : 'border-white/10 text-cream/50 hover:border-gold/30 hover:text-gold'}`}>
                {s.label} ({s.items.length})
              </button>
            ))}
          </div>

          {/* Diet Filters */}
          <div className="flex items-center gap-2">
            {DIET_FILTERS.map(f => (
              <button key={f.key} onClick={() => setActiveDiet(f.key)}
                className={`px-3 py-1.5 text-[9px] tracking-wider uppercase transition-all border rounded-full ${activeDiet === f.key ? 'bg-gold/20 text-gold border-gold/40' : 'border-white/10 text-cream/40 hover:border-gold/20 hover:text-gold'}`}>
                {f.icon && <span className="mr-1">{f.icon}</span>}{f.label}
              </button>
            ))}
          </div>
        </div>
        <div className="max-w-7xl mx-auto pb-2 text-cream/30 text-xs">{totalItems} dishes found</div>
      </div>

      {/* ═══ Menu Content ═══ */}
      <div ref={contentRef} className="max-w-7xl mx-auto px-6 py-16">
        {filteredSections.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-cream/30 text-lg font-display italic">No dishes match your search.</p>
            <button onClick={() => { setSearch(''); setActiveCategory('all'); setActiveDiet('all'); }}
              className="mt-4 text-gold text-sm underline">Clear Filters</button>
          </div>
        ) : (
          filteredSections.map(section => (
            <div key={section.id} className="menu-section-block mb-20">
              {/* Section Header */}
              <div className="mb-10 border-b border-white/5 pb-6">
                <span className="text-gold/60 text-[9px] font-accent tracking-[0.4em] uppercase">{section.kicker}</span>
                <h2 className="font-display text-3xl md:text-4xl italic text-cream tracking-wide mt-1">{section.title}</h2>
                <p className="text-cream/40 text-sm mt-2 max-w-2xl">{section.intro}</p>
                {section.note && <p className="text-gold/50 text-xs mt-2 italic">{section.note}</p>}
              </div>

              {/* Items */}
              {viewMode === 'editorial' ? (
                <div className="space-y-0">
                  {section.items.map((item, idx) => (
                    <div key={idx}
                      onClick={() => setSelectedDish({ ...item, section: section.title })}
                      className="group flex items-start gap-4 py-5 border-b border-white/5 hover:border-gold/20 cursor-pointer transition-all duration-300 hover:bg-white/[0.01] px-4 -mx-4">
                      <div className="flex-1">
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-display text-lg md:text-xl italic text-cream group-hover:text-gold transition-colors tracking-wide">{item.name}</h3>
                          {item.featured && <Star size={10} className="text-gold fill-gold" />}
                          {item.diet && item.diet.split(' ').map(d => (
                            <span key={d} className="text-[8px] px-1.5 py-0.5 border border-gold/20 text-gold/50 tracking-wider">{d}</span>
                          ))}
                        </div>
                        <p className="text-cream/35 text-sm mt-1 max-w-2xl leading-relaxed">{item.desc}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-display text-lg italic text-gold">£{item.price.toFixed(2)}</span>
                        <ArrowUpRight size={14} className="text-cream/0 group-hover:text-gold transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.items.map((item, idx) => (
                    <div key={idx}
                      onClick={() => setSelectedDish({ ...item, section: section.title })}
                      className="group bg-white/[0.02] border border-white/5 hover:border-gold/20 p-6 cursor-pointer transition-all duration-300">
                      <div className="flex items-center gap-2 mb-2">
                        {item.featured && <Star size={10} className="text-gold fill-gold" />}
                        {item.diet && item.diet.split(' ').map(d => (
                          <span key={d} className="text-[8px] px-1.5 py-0.5 border border-gold/20 text-gold/50 tracking-wider">{d}</span>
                        ))}
                      </div>
                      <h3 className="font-display text-lg italic text-cream group-hover:text-gold transition-colors mb-2">{item.name}</h3>
                      <p className="text-cream/35 text-xs leading-relaxed line-clamp-2 mb-3">{item.desc}</p>
                      <span className="font-display text-lg italic text-gold">£{item.price.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* ═══ Dish Detail Modal ═══ */}
      {selectedDish && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4" onClick={() => setSelectedDish(null)}>
          <div className="absolute inset-0 bg-midnight/90 backdrop-blur-md" />
          <div className="relative z-10 max-w-lg w-full bg-surface border border-white/10 overflow-hidden" onClick={e => e.stopPropagation()}>
            {/* Close */}
            <button onClick={() => setSelectedDish(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-cream/60 hover:text-gold transition-colors border border-white/10 hover:border-gold/30">
              <X size={18} />
            </button>

            <div className="p-8 md:p-10">
              <span className="text-gold/60 text-[9px] font-accent tracking-[0.3em] uppercase">{selectedDish.section}</span>
              <h3 className="font-display text-3xl italic text-cream mt-2 mb-3 tracking-wide">{selectedDish.name}</h3>

              <div className="flex items-center gap-2 mb-4">
                {selectedDish.featured && (
                  <span className="flex items-center gap-1 text-[9px] px-2 py-1 bg-gold/10 text-gold border border-gold/20 tracking-wider">
                    <Star size={9} className="fill-gold" /> Chef's Pick
                  </span>
                )}
                {selectedDish.diet && selectedDish.diet.split(' ').map(d => (
                  <span key={d} className="text-[9px] px-2 py-1 border border-gold/20 text-gold/60 tracking-wider">{d}</span>
                ))}
              </div>

              <p className="text-cream/50 text-sm leading-relaxed mb-6">{selectedDish.desc}</p>

              <div className="flex items-center justify-between py-4 border-t border-white/5">
                <span className="text-gold font-display text-3xl italic">£{selectedDish.price.toFixed(2)}</span>
              </div>

              <div className="mt-6 flex gap-3">
                <Link to="/book" className="flex-1 text-center px-6 py-3 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-[10px] tracking-[0.2em] uppercase hover:from-gold hover:to-gold-light transition-all">
                  Reserve & Order
                </Link>
                <button onClick={() => setSelectedDish(null)}
                  className="px-6 py-3 border border-white/10 text-cream/60 text-[10px] font-accent tracking-[0.2em] uppercase hover:border-gold/30 hover:text-gold transition-all">
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
