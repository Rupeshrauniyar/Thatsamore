import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight, ArrowUpRight, Heart } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EMAIL, EMAIL_HREF, OPEN_TABLE, PHONE, PHONE_HREF, ADDRESS, openingHours, MAPS_URL } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const footerRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-reveal', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' }
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };

  return (
    <footer ref={footerRef} className="relative bg-midnight border-t border-white/5 overflow-hidden">
      {/* Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`
      }} />

      {/* CTA Banner */}
      <div ref={ctaRef} className="footer-reveal py-20 md:py-28 text-center border-b border-white/5">
        <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase">Generations of Tradition</span>
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl italic text-cream mt-4 mb-8 tracking-wide">
          Leave room for <span className="text-gold">amore.</span>
        </h2>
        <Link
          to="/book"
          className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-xs tracking-[0.3em] uppercase hover:from-gold hover:to-gold-light transition-all duration-300 group"
        >
          Reserve a Table
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Brand & Newsletter */}
        <div className="footer-reveal lg:col-span-1">
          <div className="flex flex-col items-start mb-6">
            <span className="text-gold text-[10px] tracking-[0.4em] uppercase font-accent">— est. 2019 —</span>
            <h3 className="font-display text-3xl italic text-cream tracking-wide">That's Amore</h3>
          </div>
          <p className="text-cream/50 text-sm leading-relaxed mb-6">
            A family-run Italian trattoria in the historic heart of Lindfield, West Sussex. Authentic Sicilian recipes, fresh daily pasta, and stone-baked pizza.
          </p>
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.3em] uppercase block mb-3">Newsletter</span>
          {done ? (
            <p className="text-gold text-sm flex items-center gap-2">✓ Grazie mille! You're subscribed.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex border border-white/10 hover:border-gold/30 transition-colors">
              <input
                type="email" required placeholder="your@email.com" value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 bg-transparent text-cream text-sm placeholder:text-cream/30 outline-none"
              />
              <button type="submit" className="px-4 text-gold hover:text-gold-light transition-colors" aria-label="Subscribe">
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>

        {/* Navigation */}
        <div className="footer-reveal">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.3em] uppercase block mb-6">Navigation</span>
          <nav className="flex flex-col gap-3">
            {[
              ['Home', '/'], ['The Menu', '/menu'], ['Our Story', '/story'],
              ['Locations', '/locations'], ['Events & Parties', '/events'],
              ['Gallery', '/gallery'], ['Reservations', '/book'], ['Contact', '/contact']
            ].map(([label, to]) => (
              <Link key={to} to={to} className="text-cream/60 hover:text-gold transition-colors text-sm tracking-wide hover:translate-x-1 transform duration-200 flex items-center gap-2 group">
                <span className="w-3 h-px bg-gold/0 group-hover:bg-gold group-hover:w-4 transition-all duration-200" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Hours */}
        <div className="footer-reveal">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.3em] uppercase block mb-6">Opening Hours</span>
          <div className="space-y-2.5">
            {openingHours.map(([day, hrs, isOpen]) => (
              <div key={day} className="flex justify-between text-sm">
                <span className="text-cream/50">{day}</span>
                <span className={isOpen ? 'text-cream/80' : 'text-cream/30 italic'}>{hrs}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 px-4 py-3 bg-gold/5 border border-gold/10 rounded-sm">
            <p className="text-gold text-xs flex items-center gap-2">✦ 20% off Pizza & Pasta · Tue–Thu (Dine in)</p>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-reveal">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.3em] uppercase block mb-6">Find Us</span>
          <div className="space-y-4">
            <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-cream/60 hover:text-gold transition-colors text-sm group">
              <MapPin size={14} className="text-gold mt-0.5 shrink-0" />
              <span className="leading-relaxed">{ADDRESS}<br /><span className="text-xs text-cream/40">Free village car parking nearby</span></span>
            </a>
            <a href={PHONE_HREF} className="flex items-center gap-3 text-cream/60 hover:text-gold transition-colors text-sm">
              <Phone size={14} className="text-gold shrink-0" /> {PHONE}
            </a>
            <a href={EMAIL_HREF} className="flex items-center gap-3 text-cream/60 hover:text-gold transition-colors text-sm">
              <Mail size={14} className="text-gold shrink-0" /> {EMAIL}
            </a>
            <a href={OPEN_TABLE} target="_blank" rel="noreferrer"
              className="mt-2 inline-flex items-center gap-2 px-6 py-3 border border-gold/30 text-gold text-[10px] font-accent tracking-[0.3em] uppercase hover:bg-gold/10 transition-all">
              Book on OpenTable <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream/30">
          <span>© {new Date().getFullYear()} That's Amore · Lindfield, West Sussex. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-gold transition-colors">Terms</Link>
            <span>·</span>
            <span className="flex items-center gap-1">Crafted with <Heart size={10} className="text-gold" /> Amore</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
