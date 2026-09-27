import { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, OPEN_TABLE, openingHours } from '../data/site';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'The Menu', to: '/menu' },
  { label: 'Our Story', to: '/story' },
  { label: 'Locations', to: '/locations' },
  { label: 'Events & Parties', to: '/events' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const overlayRef = useRef(null);
  const linksRef = useRef([]);
  const infoRef = useRef(null);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!overlayRef.current) return;
    if (open) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power4.inOut' });
      gsap.fromTo(linksRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.06, delay: 0.3, ease: 'power3.out' });
      if (infoRef.current) gsap.fromTo(infoRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, delay: 0.7, ease: 'power3.out' });
    } else {
      gsap.to(overlayRef.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.6, ease: 'power4.inOut' });
      document.body.style.overflow = '';
    }
  }, [open]);

  return (
    <>
      {/* Announcement Ticker */}
      <div className="bg-gradient-to-r from-gold-dark via-gold to-gold-dark overflow-hidden py-t2 relative z-[60]">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-12 px-6">
              <span className="text-midnight text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                🍕 20% off Pizza & Pasta — Tue to Thu
              </span>
              <span className="text-midnight/40">✦</span>
              <span className="text-midnight text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                ✦ Daily Fresh Handmade Pasta & Stone-Baked Pizza
              </span>
              <span className="text-midnight/40">✦</span>
              <span className="text-midnight text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                🦞 Fresh Seafood Daily · Coast to Table
              </span>
              <span className="text-midnight/40">✦</span>
              <span className="text-midnight text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                🍷 Italian Wine Collection & Artisan Cocktails
              </span>
              <span className="text-midnight/40">✦</span>
              <span className="text-midnight text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                📍 96 High Street, Lindfield · Mid-Sussex
              </span>
              <span className="text-midnight/40 mr-12">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* Fixed Header */}
      <header className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'top-[0px]' : ''}`}>
        <div className={`mx-auto max-w-[1400px] px-6 py-4 flex items-center justify-between transition-all duration-500 ${scrolled ? 'bg-midnight/80 backdrop-blur-xl border-b border-white/5 rounded-none' : ''}`}>
          
          {/* Left — Menu Trigger */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-3 group"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <div className="flex flex-col gap-[5px] w-7">
              <span className={`block h-[1.5px] bg-gold transition-all duration-300 ${open ? 'rotate-45 translate-y-[6.5px]' : 'w-7 group-hover:w-5'}`} />
              <span className={`block h-[1.5px] bg-gold transition-all duration-300 ${open ? 'opacity-0' : 'w-5 group-hover:w-7'}`} />
              <span className={`block h-[1.5px] bg-gold transition-all duration-300 ${open ? '-rotate-45 -translate-y-[6.5px]' : 'w-7 group-hover:w-5'}`} />
            </div>
            <span className="text-gold text-[11px] font-accent tracking-[0.3em] uppercase hidden sm:inline">
              {open ? 'Close' : 'Menu'}
            </span>
          </button>

          {/* Center — Logo */}
          <NavLink to="/" className="absolute left-1/2 -translate-x-1/2 text-center group">
            <div className="flex flex-col items-center">
              <span className="text-gold text-[10px] tracking-[0.4em] uppercase font-accent opacity-60">— est. 2019 —</span>
              <h1 className="font-display text-2xl md:text-3xl text-cream font-light italic tracking-wide group-hover:text-gold transition-colors duration-300">
                That's Amore
              </h1>
              <span className="text-gold/50 text-[8px] tracking-[0.5em] uppercase font-sans mt-0.5">Authentic Sicilian Cuisine</span>
            </div>
          </NavLink>

          {/* Right — CTAs */}
          <div className="flex items-center gap-4">
            <a href={PHONE_HREF} className="hidden lg:flex items-center gap-2 text-cream/60 hover:text-gold transition-colors text-xs tracking-wider">
              <Phone size={12} /> {PHONE}
            </a>
            <Link
              to="/book"
              className="relative px-6 py-2.5 text-[11px] font-accent tracking-[0.25em] uppercase text-midnight bg-gradient-to-r from-gold-dark to-gold hover:from-gold hover:to-gold-light transition-all duration-300 rounded-none group overflow-hidden"
            >
              <span className="relative z-10">Reserve</span>
              <ArrowUpRight size={12} className="inline-block ml-1 relative z-10 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Fullscreen Navigation Overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[55] bg-[#080E21]"
        style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
      >
        {/* Grain texture overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")` }}
        />

        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-8 left-6 z-10 flex items-center gap-3 group"
          aria-label="Close menu"
        >
          <div className="flex flex-col gap-[5px] w-7">
            <span className="block h-[1.5px] bg-gold rotate-45 translate-y-[6.5px] transition-all" />
            <span className="block h-[1.5px] bg-gold opacity-0 transition-all" />
            <span className="block h-[1.5px] bg-gold -rotate-45 -translate-y-[6.5px] transition-all" />
          </div>
          <span className="text-gold text-[11px] font-accent tracking-[0.3em] uppercase">Close</span>
        </button>

        <div className="h-full flex flex-col lg:flex-row">
          {/* Left — Navigation Links */}
          <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-24 lg:pt-0">
            <nav className="space-y-1">
              {navLinks.map((item, idx) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  ref={el => linksRef.current[idx] = el}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block py-2 md:py-3 group transition-all duration-300 border-b border-white/5 hover:border-gold/30 ${isActive ? 'border-gold/40' : ''}`
                  }
                >
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="text-gold/40 font-accent text-xs tracking-widest w-8">0{idx}</span>
                    <span className={`font-display text-3xl md:text-5xl lg:text-6xl italic text-cream/90 group-hover:text-gold transition-colors duration-300 tracking-wide`}>
                      {item.label}
                    </span>
                    <ArrowUpRight size={18} className="text-gold/0 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 ml-auto" />
                  </div>
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Right — Info Panel */}
          <div ref={infoRef} className="lg:w-[380px] bg-white/[0.02] border-l border-white/5 p-8 md:p-12 lg:p-16 flex flex-col justify-end lg:justify-center gap-10">
            {/* Location */}
            <div>
              <span className="text-gold/60 text-[10px] font-accent tracking-[0.3em] uppercase block mb-3">— Location —</span>
              <a href="https://www.google.com/maps/search/?api=1&query=That%27s+Amore+96+High+Street+Lindfield" target="_blank" rel="noreferrer"
                className="flex items-start gap-2 text-cream/70 hover:text-gold transition-colors text-sm leading-relaxed">
                <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
                96 High Street, Lindfield,<br />Haywards Heath RH16 2HP
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}