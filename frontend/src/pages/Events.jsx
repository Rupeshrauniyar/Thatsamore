import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Users, Calculator, Sparkles, Calendar, Phone, Mail } from 'lucide-react';
import { images, eventsData, PHONE, PHONE_HREF, EMAIL, EMAIL_HREF } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const PACKAGES = [
  { name: 'Rustico', price: 25, desc: 'Unlimited stone-baked pizza, house salad, soft drinks', icon: '🍕' },
  { name: 'Conviviale', price: 35, desc: 'Antipasti sharing platters, unlimited pizza & pasta, house wine', icon: '🍝' },
  { name: 'Festa Grande', price: 50, desc: 'Full antipasto, unlimited pizza & pasta, cocktails, dessert, espresso', icon: '🥂' },
];

export default function Events() {
  const [guestCount, setGuestCount] = useState(12);
  const [selectedPkg, setSelectedPkg] = useState(1);
  const pageRef = useRef(null);

  const totalCost = guestCount * PACKAGES[selectedPkg].price;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.events-hero > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power4.out', delay: 0.3 });
      gsap.utils.toArray('.event-reveal').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });
      gsap.fromTo('.event-card', { y: 70, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.events-grid', start: 'top 80%' }
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-midnight text-cream min-h-screen">

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.diningRoom} alt="Events" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/90 to-midnight" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center events-hero">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Celebrations —</span>
          <h1 className="font-display text-5xl md:text-7xl italic text-cream tracking-wide mb-4">
            Events & <span className="text-gold">Parties</span>
          </h1>
          <p className="text-cream/50 text-base max-w-xl mx-auto">
            From intimate birthday dinners to large celebrations — we craft bespoke experiences for every occasion.
          </p>
        </div>
      </section>

      {/* Event Cards */}
      <section className="px-6 pb-24">
        <div className="events-grid max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {eventsData.map((event, idx) => (
            <div key={event.id} className="event-card group relative overflow-hidden bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-all duration-500">
              <div className="h-48 overflow-hidden">
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-gold text-midnight text-[9px] font-accent tracking-[0.2em] uppercase">{event.badge}</span>
                </div>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="font-display text-xl italic text-cream mb-2 tracking-wide group-hover:text-gold transition-colors">{event.title}</h3>
                <p className="text-cream/40 text-sm leading-relaxed mb-4">{event.description}</p>
                <div className="space-y-1 text-xs text-cream/40 mb-4">
                  <div className="flex items-center gap-2"><Calendar size={11} className="text-gold" /> {event.days}</div>
                  <div className="flex items-center gap-2"><Sparkles size={11} className="text-gold" /> {event.hours}</div>
                </div>
                <Link to="/book" className="inline-flex items-center gap-2 text-gold text-xs font-accent tracking-wider hover:text-gold-light transition-colors group/link">
                  <span className="border-b border-gold/40 group-hover/link:border-gold pb-0.5">{event.cta}</span>
                  <ArrowUpRight size={12} className="transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Party Calculator */}
      <section className="py-24 md:py-32 px-6 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 event-reveal">
            <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Interactive Planner —</span>
            <h2 className="font-display text-4xl md:text-5xl italic text-cream tracking-wide mb-4">
              Party <span className="text-gold">Planner</span>
            </h2>
            <p className="text-cream/50 text-sm max-w-lg mx-auto">Plan and estimate your group celebration.</p>
          </div>

          <div className="event-reveal grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Controls */}
            <div className="space-y-8">
              {/* Guest Slider */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-cream/60 text-sm flex items-center gap-2"><Users size={14} className="text-gold" /> Guests</span>
                  <span className="font-display text-2xl italic text-gold">{guestCount}</span>
                </div>
                <input type="range" min="8" max="60" value={guestCount} onChange={e => setGuestCount(+e.target.value)}
                  className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-gold-dark
                    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-midnight [&::-webkit-slider-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-cream/30 text-xs mt-1"><span>8</span><span>60</span></div>
              </div>

              {/* Packages */}
              <div>
                <span className="text-cream/60 text-sm block mb-3">Select Package</span>
                <div className="space-y-3">
                  {PACKAGES.map((pkg, idx) => (
                    <button key={pkg.name} onClick={() => setSelectedPkg(idx)}
                      className={`w-full text-left p-5 border transition-all duration-300 ${selectedPkg === idx ? 'border-gold/40 bg-gold/5' : 'border-white/5 bg-white/[0.01] hover:border-gold/20'}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{pkg.icon}</span>
                          <div>
                            <span className={`font-display text-lg italic ${selectedPkg === idx ? 'text-gold' : 'text-cream/80'}`}>{pkg.name}</span>
                            <p className="text-cream/40 text-xs mt-0.5">{pkg.desc}</p>
                          </div>
                        </div>
                        <span className="font-display text-lg italic text-gold">£{pkg.price}<span className="text-xs text-cream/40">/pp</span></span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white/[0.02] border border-gold/10 p-8 h-fit lg:sticky lg:top-32">
              <h3 className="font-display text-2xl italic text-cream mb-6 tracking-wide flex items-center gap-2">
                <Calculator size={18} className="text-gold" /> Estimate
              </h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Package</span>
                  <span className="text-cream">{PACKAGES[selectedPkg].name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Per Person</span>
                  <span className="text-cream">£{PACKAGES[selectedPkg].price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Guests</span>
                  <span className="text-cream">{guestCount}</span>
                </div>
                <div className="border-t border-white/5 pt-4 flex justify-between">
                  <span className="text-cream/60 font-medium">Estimated Total</span>
                  <span className="font-display text-3xl italic text-gold">£{totalCost}</span>
                </div>
              </div>

              <div className="space-y-3">
                <a href={PHONE_HREF} className="w-full py-4 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-xs tracking-[0.3em] uppercase hover:from-gold hover:to-gold-light transition-all flex items-center justify-center gap-2">
                  <Phone size={13} /> Enquire Now
                </a>
                <a href={EMAIL_HREF} className="w-full py-3 border border-white/10 text-cream/60 text-[10px] font-accent tracking-[0.2em] uppercase hover:border-gold/30 hover:text-gold transition-all flex items-center justify-center gap-2">
                  <Mail size={12} /> Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
