import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Star, Clock, MapPin, ChevronRight, Wine, Flame } from 'lucide-react';
import { images, featureDishes, testimonials, openingHours, OPEN_TABLE } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const menuRef = useRef(null);
  const testimonialsRef = useRef(null);
  const hoursRef = useRef(null);
  const midweekRef = useRef(null);
  const parallaxImgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo('.hero-title span', { y: 120, opacity: 0, rotateX: -40 }, {
        y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out', delay: 0.3
      });
      gsap.fromTo('.hero-sub', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 1, ease: 'power3.out' });
      gsap.fromTo('.hero-ctas', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: 1.3, ease: 'power3.out' });
      gsap.fromTo('.hero-scroll-hint', { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 1.8 });

      // Hero parallax image
      if (parallaxImgRef.current) {
        gsap.to(parallaxImgRef.current, {
          yPercent: 20, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true }
        });
      }

      // Story Section Reveal
      gsap.fromTo('.story-reveal', { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: storyRef.current, start: 'top 80%' }
      });

      // Menu Cards — stagger from bottom
      gsap.fromTo('.dish-card', { y: 100, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: menuRef.current, start: 'top 75%' }
      });

      // Midweek Savings
      gsap.fromTo('.midweek-reveal', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: midweekRef.current, start: 'top 80%' }
      });

      // Testimonials
      gsap.fromTo('.testimonial-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' }
      });

      // Hours reveal
      gsap.fromTo('.hours-reveal', { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: hoursRef.current, start: 'top 80%' }
      });

      // Horizontal text scroll
      gsap.to('.marquee-text', {
        xPercent: -50, ease: 'none', duration: 20, repeat: -1
      });

    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Midweek calculator state
  const [guests, setGuests] = useState(4);
  const avgSpend = 22;
  const savings = Math.round(guests * avgSpend * 0.20);

  return (
    <div ref={heroRef} className="bg-midnight text-cream overflow-hidden">

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0">
          <img
            ref={parallaxImgRef}
            src={images.heroMain}
            alt="That's Amore restaurant"
            className="w-full h-[120%] object-cover object-center -mt-[10%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight/70 via-midnight/50 to-midnight" />
          <div className="absolute inset-0 bg-gradient-to-r from-midnight/60 to-transparent" />
        </div>

        {/* Grain */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none animate-grain"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`, backgroundSize: '200px' }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto" style={{ perspective: '1000px' }}>
          <span className="hero-sub inline-block text-gold/80 text-[10px] font-accent tracking-[0.5em] uppercase mb-6">
            — Authentic Sicilian Cuisine —
          </span>
          <h1 className="hero-title font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl italic text-cream leading-[0.9] mb-8 overflow-hidden">
            <span className="inline-block">Where Every</span><br />
            <span className="inline-block text-gold">Meal</span>{' '}
            <span className="inline-block">Tells a</span><br />
            <span className="inline-block text-gold">Story</span>
          </h1>
          <p className="hero-sub text-cream/60 text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light mb-10">
            Family recipes from the sun-drenched coast of Sicily, hand-stretched 48‑hour dough, and seafood delivered fresh daily. Lindfield's most loved Italian.
          </p>
          <div className="hero-ctas flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/book"
              className="group px-10 py-4 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-xs tracking-[0.3em] uppercase flex items-center gap-2 hover:from-gold hover:to-gold-light transition-all duration-300">
              Reserve Your Table
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <Link to="/menu"
              className="group px-10 py-4 border border-cream/20 text-cream font-accent text-xs tracking-[0.3em] uppercase flex items-center gap-2 hover:border-gold hover:text-gold transition-all duration-300">
              Explore Menu
              <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Scroll Hint */}
        <div className="hero-scroll-hint absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-cream/30 text-[9px] font-accent tracking-[0.4em] uppercase">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-gold/60 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ═══════════════ MARQUEE RIBBON ═══════════════ */}
      <div className="py-6 border-y border-white/5 overflow-hidden">
        <div className="marquee-text flex whitespace-nowrap">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 px-8 text-cream/20 text-sm font-display italic tracking-widest">
              <span>Authentic Sicilian</span><span className="text-gold/30">✦</span>
              <span>48-Hour Dough</span><span className="text-gold/30">✦</span>
              <span>Fresh Seafood Daily</span><span className="text-gold/30">✦</span>
              <span>Family Heritage</span><span className="text-gold/30">✦</span>
              <span>Stone-Baked at 400°C</span><span className="text-gold/30">✦</span>
              <span>Lindfield Village</span><span className="text-gold/30">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════ STORY INTRO ═══════════════ */}
      <section ref={storyRef} className="py-24 md:py-36 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="story-reveal relative group overflow-hidden">
            <img src={images.restaurantInterior} alt="Restaurant interior"
              className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="inline-block px-4 py-2 bg-gold/10 backdrop-blur-sm border border-gold/20 text-gold text-[10px] font-accent tracking-[0.3em] uppercase">
                Since 2019
              </span>
            </div>
          </div>

          {/* Text */}
          <div className="story-reveal">
            <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Our Heritage —</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl italic text-cream leading-tight mb-6 tracking-wide">
              A Sicilian Love<br />Letter to <span className="text-gold">Lindfield</span>
            </h2>
            <p className="text-cream/50 text-base leading-relaxed mb-6">
              Born from generations of Sicilian culinary mastery, That's Amore brings the sun-drenched flavours of the Mediterranean to the charming High Street of Lindfield. Our dough is proofed for 48 hours. Our meats are hand-selected from Haywards Heath's finest butcher.
            </p>
            <p className="text-cream/40 text-sm leading-relaxed mb-8">
              Every dish is a testament to the belief that great food begins with honest ingredients, patient craft, and boundless amore.
            </p>
            <Link to="/story" className="inline-flex items-center gap-2 text-gold text-sm tracking-wider hover:text-gold-light transition-colors group">
              <span className="border-b border-gold/40 group-hover:border-gold pb-0.5">Read Our Full Story</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ MIDWEEK SAVINGS ═══════════════ */}
      <section ref={midweekRef} className="py-20 md:py-28 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="midweek-reveal text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Exclusive Offer —</span>
          <h2 className="midweek-reveal font-display text-4xl md:text-5xl italic text-cream mb-4 tracking-wide">
            Midweek <span className="text-gold">Savings</span> Calculator
          </h2>
          <p className="midweek-reveal text-cream/50 text-sm mb-10 max-w-lg mx-auto">
            Every Tuesday to Thursday, enjoy 20% off all Pizza & Pasta. See how much your table saves:
          </p>
          <div className="midweek-reveal max-w-md mx-auto">
            <div className="flex items-center justify-center gap-6 mb-8">
              {[2, 4, 6, 8].map(n => (
                <button key={n} onClick={() => setGuests(n)}
                  className={`w-14 h-14 rounded-full border-2 font-display text-xl italic transition-all duration-300 ${guests === n ? 'bg-gold text-midnight border-gold scale-110' : 'border-cream/20 text-cream/60 hover:border-gold/50 hover:text-gold'}`}>
                  {n}
                </button>
              ))}
            </div>
            <p className="text-cream/40 text-xs mb-4">{guests} guests · average £{avgSpend}/person on pizza & pasta</p>
            <div className="bg-white/[0.03] border border-gold/20 px-8 py-6 backdrop-blur-sm">
              <div className="flex items-baseline justify-center gap-3">
                <span className="text-gold text-5xl md:text-6xl font-display italic">£{savings}</span>
                <span className="text-cream/40 text-sm">saved</span>
              </div>
              <p className="text-cream/30 text-xs mt-2">with 20% off Pizza & Pasta · Tue – Thu (Dine in)</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MENU SHOWCASE ═══════════════ */}
      <section ref={menuRef} className="py-24 md:py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— The Kitchen —</span>
            <h2 className="font-display text-4xl md:text-6xl italic text-cream tracking-wide mb-4">
              Signature <span className="text-gold">Creations</span>
            </h2>
            <p className="text-cream/50 text-sm max-w-lg mx-auto">Handcrafted dishes that define the That's Amore experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featureDishes.map((dish, idx) => (
              <div key={idx} className="dish-card group relative overflow-hidden bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-all duration-500">
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-[45%] overflow-hidden">
                    <img src={dish.image} alt={dish.name}
                      className="w-full h-48 sm:h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                  {/* Info */}
                  <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-gold/80 text-[9px] font-accent tracking-[0.3em] uppercase">{dish.tag}</span>
                        {dish.diet && <span className="text-[9px] px-2 py-0.5 border border-gold/20 text-gold/60 tracking-wider">{dish.diet}</span>}
                      </div>
                      <h3 className="font-display text-2xl italic text-cream mb-2 tracking-wide group-hover:text-gold transition-colors">{dish.name}</h3>
                      <p className="text-cream/40 text-sm leading-relaxed line-clamp-3">{dish.copy}</p>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <span className="text-gold font-display text-xl italic">{dish.price}</span>
                      <div className="flex items-center gap-1.5 text-cream/30 text-xs">
                        <Wine size={11} className="text-gold/50" />
                        <span>{dish.winePairing}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu"
              className="inline-flex items-center gap-2 px-10 py-4 border border-cream/20 text-cream font-accent text-xs tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-all duration-300 group">
              View Full Menu
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ OPENING HOURS ═══════════════ */}
      <section ref={hoursRef} className="py-24 md:py-32 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="hours-reveal relative overflow-hidden group">
            <img src={images.cozyArch} alt="Cozy interior"
              className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/20 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <div className="flex items-center gap-2 text-gold text-[10px] font-accent tracking-[0.3em] uppercase">
                <MapPin size={12} /> 96 High Street, Lindfield
              </div>
            </div>
          </div>

          {/* Hours */}
          <div>
            <span className="hours-reveal text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— When to Visit —</span>
            <h2 className="hours-reveal font-display text-4xl md:text-5xl italic text-cream mb-8 tracking-wide">
              Opening <span className="text-gold">Hours</span>
            </h2>
            <div className="space-y-0">
              {openingHours.map(([day, hrs, isOpen]) => (
                <div key={day}
                  className="hours-reveal flex items-center justify-between py-4 border-b border-white/5 group hover:border-gold/20 transition-colors">
                  <span className="text-cream/70 font-medium text-sm tracking-wider">{day}</span>
                  <div className="flex items-center gap-3">
                    {isOpen && <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />}
                    <span className={`text-sm ${isOpen ? 'text-cream/80' : 'text-cream/30 italic'}`}>{hrs}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="hours-reveal mt-6 flex items-center gap-3 text-gold text-sm">
              <Flame size={14} /> <span>20% off Pizza & Pasta every Tue–Thu</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section ref={testimonialsRef} className="py-24 md:py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Guest Voices —</span>
            <h2 className="font-display text-4xl md:text-6xl italic text-cream tracking-wide">
              What They <span className="text-gold">Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card bg-white/[0.02] border border-white/5 p-8 md:p-10 hover:border-gold/20 transition-all duration-500 group">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => <Star key={i} size={12} className="text-gold fill-gold" />)}
                </div>
                <p className="text-cream/60 text-sm leading-relaxed mb-6 italic font-display text-lg">
                  "{t.highlight}"
                </p>
                <p className="text-cream/40 text-sm leading-relaxed mb-6">{t.quote}</p>
                <span className="text-gold/60 text-[10px] font-accent tracking-[0.2em] uppercase">{t.author}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="relative py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.diningRoom} alt="Dining room" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-midnight/80" />
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Experience Awaits —</span>
          <h2 className="font-display text-5xl md:text-7xl lg:text-8xl italic text-cream mb-8 tracking-wide">
            Your Table is <span className="text-gold">Ready</span>
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/book"
              className="group px-12 py-5 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-xs tracking-[0.3em] uppercase flex items-center gap-2 hover:from-gold hover:to-gold-light transition-all">
              Book Now <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a href={OPEN_TABLE} target="_blank" rel="noreferrer"
              className="px-12 py-5 border border-cream/20 text-cream font-accent text-xs tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-all flex items-center gap-2">
              OpenTable <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
