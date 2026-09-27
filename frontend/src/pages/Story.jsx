import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Clock, Flame, MapPin, Heart } from 'lucide-react';
import { images } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { icon: <Clock size={20} />, title: '48-Hour Dough', desc: 'Our pizza dough is slow-proofed for 48 hours, creating an airy, blistered crust with complex flavours that quick-rise simply cannot achieve.' },
  { icon: <Flame size={20} />, title: '400°C Stone-Baked', desc: 'Each pizza enters our stone oven at scorching 400°C, emerging with the perfect char, leopard-spotted crust, and molten cheese in under 90 seconds.' },
  { icon: <MapPin size={20} />, title: 'Local Sourcing', desc: 'Our meats come directly from our master butcher in Haywards Heath. Seafood is delivered fresh daily from the coast. Vegetables sourced from Sussex farms.' },
  { icon: <Heart size={20} />, title: 'Family Recipes', desc: 'Every sauce, every pasta filling, every dessert follows recipes passed down through generations of Sicilian grandmothers. No shortcuts, only love.' },
];

export default function Story() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.story-hero-text > *', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.12, duration: 0.8, ease: 'power4.out', delay: 0.3
      });

      // Parallax images
      gsap.utils.toArray('.story-parallax-img').forEach(img => {
        gsap.to(img, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: img.closest('.story-parallax-wrap'), start: 'top bottom', end: 'bottom top', scrub: true }
        });
      });

      // Section reveals
      gsap.utils.toArray('.story-fade-in').forEach(el => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });

      // Pillar cards stagger
      gsap.fromTo('.pillar-card', { y: 80, opacity: 0, scale: 0.95 }, {
        y: 0, opacity: 1, scale: 1, stagger: 0.15, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: '.pillars-grid', start: 'top 80%' }
      });

      // Counter animation
      gsap.utils.toArray('.counter-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        gsap.fromTo(el, { innerText: 0 }, {
          innerText: target, duration: 2, ease: 'power2.out', snap: { innerText: 1 },
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });

    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="bg-midnight text-cream">

      {/* ═══ Hero ═══ */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-32 pb-20 px-6">
        <div className="absolute inset-0">
          <img src={images.restaurantExterior} alt="Restaurant exterior" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/70 to-midnight/30" />
        </div>
        <div className="relative z-10 max-w-4xl story-hero-text">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Our Story —</span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl italic text-cream tracking-wide mb-4">
            Generations of<br /><span className="text-gold">Sicilian Craft</span>
          </h1>
          <p className="text-cream/50 text-base md:text-lg max-w-xl leading-relaxed">
            From the sun-drenched coastlines of Sicily to the charming High Street of Lindfield — a family's journey of flavour, tradition, and love.
          </p>
        </div>
      </section>

      {/* ═══ Origin Story ═══ */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="story-fade-in">
            <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Origins —</span>
            <h2 className="font-display text-4xl md:text-5xl italic text-cream tracking-wide mb-6 leading-tight">
              Where It All <span className="text-gold">Began</span>
            </h2>
            <div className="space-y-4 text-cream/50 text-sm leading-relaxed">
              <p>
                In the heart of Sicily, where the Tyrrhenian Sea meets volcanic slopes, a grandmother's kitchen held the secrets of centuries. Recipes whispered from mother to daughter — the perfect tomato sugo, the precise folding of fresh ravioli, the patience of a 48-hour dough.
              </p>
              <p>
                When our family brought these treasured recipes to Lindfield in 2019, we didn't just open a restaurant — we transplanted a piece of Sicily into the Sussex Weald. Every dish served at That's Amore carries the DNA of those original recipes.
              </p>
              <p>
                The name itself — "That's Amore" — is our daily reminder: great food isn't just about technique, it's about love. It's the difference between cooking and creating.
              </p>
            </div>
          </div>
          <div className="story-parallax-wrap story-fade-in overflow-hidden h-[500px] md:h-[600px]">
            <img src={images.restaurantInterior} alt="Interior" className="story-parallax-img w-full h-[130%] object-cover" />
          </div>
        </div>
      </section>

      {/* ═══ Counter Stats ═══ */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { num: 48, suffix: 'hrs', label: 'Dough Proofing' },
            { num: 400, suffix: '°C', label: 'Stone Oven Temp' },
            { num: 120, suffix: '+', label: 'Menu Items' },
            { num: 5, suffix: '★', label: 'Guest Rating' },
          ].map((stat, idx) => (
            <div key={idx} className="story-fade-in">
              <div className="flex items-baseline justify-center gap-1">
                <span className="counter-num font-display text-4xl md:text-5xl italic text-gold" data-target={stat.num}>0</span>
                <span className="text-gold/60 font-accent text-sm">{stat.suffix}</span>
              </div>
              <span className="text-cream/40 text-xs font-accent tracking-[0.2em] uppercase mt-2 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ Craft Pillars ═══ */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 story-fade-in">
            <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Our Philosophy —</span>
            <h2 className="font-display text-4xl md:text-6xl italic text-cream tracking-wide">
              Four <span className="text-gold">Pillars</span>
            </h2>
          </div>
          <div className="pillars-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p, idx) => (
              <div key={idx} className="pillar-card bg-white/[0.02] border border-white/5 p-8 hover:border-gold/20 transition-all duration-500 group">
                <div className="text-gold mb-6 transition-transform group-hover:scale-110 group-hover:-rotate-6 duration-300">{p.icon}</div>
                <h3 className="font-display text-xl italic text-cream mb-3 tracking-wide group-hover:text-gold transition-colors">{p.title}</h3>
                <p className="text-cream/40 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Full-Width Image Break ═══ */}
      <section className="story-parallax-wrap h-[50vh] md:h-[60vh] overflow-hidden relative">
        <img src={images.diningRoom} alt="Dining ambiance" className="story-parallax-img w-full h-[130%] object-cover" />
        <div className="absolute inset-0 bg-midnight/40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="story-fade-in font-display text-3xl md:text-5xl italic text-cream text-center max-w-2xl px-6 tracking-wide leading-relaxed">
            "Cooking is love made <span className="text-gold">visible.</span>"
          </p>
        </div>
      </section>

      {/* ═══ Dough Process ═══ */}
      <section className="py-24 md:py-36 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="story-parallax-wrap story-fade-in overflow-hidden h-[450px] md:h-[550px] order-2 lg:order-1">
            <img src={images.heroPizza} alt="Pizza making" className="story-parallax-img w-full h-[130%] object-cover" />
          </div>
          <div className="story-fade-in order-1 lg:order-2">
            <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— The Process —</span>
            <h2 className="font-display text-4xl md:text-5xl italic text-cream tracking-wide mb-6 leading-tight">
              The Art of <span className="text-gold">48 Hours</span>
            </h2>
            <div className="space-y-4 text-cream/50 text-sm leading-relaxed">
              <p>
                Great pizza begins long before the oven. Our dough starts its journey 48 hours before it ever sees flame — a slow, patient fermentation that develops complex flavours and the signature airy texture.
              </p>
              <p>
                Using only Italian '00' flour, sea salt, water, and a carefully cultivated yeast culture, we allow time to do what no shortcut can replicate. The result? A crust that's crisp on the outside, cloud-soft within, with those coveted leopard spots from our 400°C stone oven.
              </p>
              <p>
                Every pizza is hand-stretched — never rolled — by our pizzaioli who learned the craft in Naples. Each one is unique, each one a small masterpiece.
              </p>
            </div>
            <Link to="/menu" className="inline-flex items-center gap-2 mt-8 text-gold text-sm tracking-wider hover:text-gold-light transition-colors group">
              <span className="border-b border-gold/40 group-hover:border-gold pb-0.5">View Our Pizza Menu</span>
              <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.cozyArch} alt="Atmosphere" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-midnight/80" />
        </div>
        <div className="relative z-10 text-center px-6">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Join Our Table —</span>
          <h2 className="font-display text-5xl md:text-7xl italic text-cream tracking-wide mb-8">
            Come Taste the <span className="text-gold">Tradition</span>
          </h2>
          <Link to="/book"
            className="inline-flex items-center gap-2 px-12 py-5 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-xs tracking-[0.3em] uppercase hover:from-gold hover:to-gold-light transition-all group">
            Reserve Your Experience
            <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
