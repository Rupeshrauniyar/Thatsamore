import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Mail, Clock, Car, Train, ArrowUpRight, Sparkles } from 'lucide-react';
import { locationsData, openingHours, MAPS_URL } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

export default function Locations() {
  const pageRef = useRef(null);
  const loc = locationsData[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.loc-hero > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power4.out', delay: 0.3 });
      gsap.utils.toArray('.loc-reveal').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-midnight text-cream min-h-screen">

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={loc.heroImage} alt={loc.name} className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/90 to-midnight" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center loc-hero">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Our Location —</span>
          <h1 className="font-display text-5xl md:text-7xl italic text-cream tracking-wide mb-4">
            Find Us in <span className="text-gold">Lindfield</span>
          </h1>
          <p className="text-cream/50 text-base max-w-xl mx-auto">{loc.description}</p>
        </div>
      </section>

      {/* Location Details */}
      <section className="px-6 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="loc-reveal bg-white/[0.02] border border-white/5 p-8">
              <h3 className="font-display text-2xl italic text-cream mb-6 tracking-wide">{loc.name}</h3>
              <div className="space-y-4">
                <a href={MAPS_URL} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-cream/60 hover:text-gold transition-colors text-sm group">
                  <MapPin size={15} className="text-gold mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{loc.address}</span>
                </a>
                <a href={loc.phoneHref} className="flex items-center gap-3 text-cream/60 hover:text-gold transition-colors text-sm">
                  <Phone size={15} className="text-gold shrink-0" /> {loc.phone}
                </a>
                <a href={`mailto:${loc.email}`} className="flex items-center gap-3 text-cream/60 hover:text-gold transition-colors text-sm">
                  <Mail size={15} className="text-gold shrink-0" /> {loc.email}
                </a>
              </div>
            </div>

            {/* Hours */}
            <div className="loc-reveal bg-white/[0.02] border border-white/5 p-8">
              <h3 className="font-display text-xl italic text-cream mb-4 tracking-wide flex items-center gap-2">
                <Clock size={16} className="text-gold" /> Opening Hours
              </h3>
              <div className="space-y-2">
                {openingHours.map(([day, hrs, isOpen]) => (
                  <div key={day} className="flex justify-between text-sm py-2 border-b border-white/5 last:border-0">
                    <span className="text-cream/50">{day}</span>
                    <span className={isOpen ? 'text-cream/80' : 'text-cream/30 italic'}>{hrs}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-gold text-xs">
                <Sparkles size={12} /> 20% off Pizza & Pasta · Tue–Thu
              </div>
            </div>

            {/* Getting There */}
            <div className="loc-reveal bg-white/[0.02] border border-white/5 p-8">
              <h3 className="font-display text-xl italic text-cream mb-4 tracking-wide">Getting Here</h3>
              <div className="space-y-4 text-sm text-cream/50">
                <div className="flex items-start gap-3">
                  <Car size={15} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <span className="text-cream/70 font-medium block mb-1">By Car</span>
                    <p className="leading-relaxed">{loc.parkingInfo}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Train size={15} className="text-gold mt-0.5 shrink-0" />
                  <div>
                    <span className="text-cream/70 font-medium block mb-1">Public Transport</span>
                    <p className="leading-relaxed">{loc.transitInfo}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Areas Served */}
            <div className="loc-reveal">
              <span className="text-cream/40 text-xs font-accent tracking-wider uppercase block mb-3">Proudly serving</span>
              <div className="flex flex-wrap gap-2">
                {loc.areasServed.map(area => (
                  <span key={area} className="px-3 py-1.5 border border-white/10 text-cream/50 text-xs tracking-wider">{area}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Map + Image */}
          <div className="space-y-6">
            <div className="loc-reveal overflow-hidden border border-white/5 h-80">
              <iframe
                title="Restaurant Location"
                src={loc.mapEmbed}
                width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen loading="lazy"
              />
            </div>
            <div className="loc-reveal overflow-hidden group border border-white/5">
              <img src={loc.interiorImage} alt="Interior" className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
            <div className="loc-reveal text-center">
              <Link to="/book"
                className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-xs tracking-[0.3em] uppercase hover:from-gold hover:to-gold-light transition-all group">
                Book a Table <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
