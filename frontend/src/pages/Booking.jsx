import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Users, Calendar, Clock, Sparkles, MapPin, Phone, Star } from 'lucide-react';
import { images, OPEN_TABLE, PHONE, PHONE_HREF, openingHours } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const PARTY_SIZES = [1, 2, 3, 4, 5, 6, 7, 8];
const TIME_SLOTS_LUNCH = ['12:00', '12:30', '13:00', '13:30', '14:00'];
const TIME_SLOTS_DINNER = ['17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'];
const ATMOSPHERES = [
  { name: 'Main Dining', desc: 'Our vibrant open floor, alive with the rhythm of service', icon: '🍝' },
  { name: 'Intimate Alcove', desc: 'Cozy arched nook for date nights and private conversations', icon: '🕯️' },
  { name: 'Window Seat', desc: 'Watch Lindfield High Street from our charming bay windows', icon: '🪟' },
  { name: 'Al Fresco', desc: 'Outdoor terrace seating for warm summer evenings', icon: '☀️' },
];
const OCCASIONS = ['Birthday', 'Anniversary', 'Date Night', 'Business', 'Family', 'Celebration'];

export default function Booking() {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [service, setService] = useState('dinner');
  const [time, setTime] = useState('');
  const [atmosphere, setAtmosphere] = useState('');
  const [occasion, setOccasion] = useState('');
  const pageRef = useRef(null);

  const isMidweek = (() => {
    if (!date) return false;
    const d = new Date(date).getDay();
    return d >= 2 && d <= 4;
  })();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.book-hero > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power4.out', delay: 0.3 });
      gsap.utils.toArray('.book-reveal').forEach(el => {
        gsap.fromTo(el, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const handleBook = () => {
    window.open(OPEN_TABLE, '_blank');
  };

  return (
    <div ref={pageRef} className="bg-midnight text-cream min-h-screen">

      {/* Hero */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.diningRoom} alt="Dining" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-b from-midnight via-midnight/90 to-midnight" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center book-hero">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Reservation Concierge —</span>
          <h1 className="font-display text-5xl md:text-7xl italic text-cream tracking-wide mb-4">
            Book Your <span className="text-gold">Table</span>
          </h1>
          <p className="text-cream/50 text-base max-w-xl mx-auto">
            Secure your dining experience at That's Amore. For parties of 7 or more, please call us directly.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-10">

            {/* Party Size */}
            <div className="book-reveal">
              <h3 className="flex items-center gap-2 text-cream/80 text-sm font-accent tracking-[0.2em] uppercase mb-4">
                <Users size={14} className="text-gold" /> Party Size
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                {PARTY_SIZES.map(n => (
                  <button key={n} onClick={() => setGuests(n)}
                    className={`w-14 h-14 border-2 font-display text-xl italic transition-all duration-300 ${guests === n ? 'bg-gold text-midnight border-gold scale-105' : 'border-white/10 text-cream/60 hover:border-gold/30 hover:text-gold'}`}>
                    {n}
                  </button>
                ))}
                <a href={PHONE_HREF} className="text-gold text-xs font-accent tracking-wider hover:text-gold-light transition-colors ml-2">
                  8+ Call Us
                </a>
              </div>
            </div>

            {/* Date */}
            <div className="book-reveal">
              <h3 className="flex items-center gap-2 text-cream/80 text-sm font-accent tracking-[0.2em] uppercase mb-4">
                <Calendar size={14} className="text-gold" /> Preferred Date
              </h3>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="w-full max-w-xs px-4 py-3 bg-white/[0.03] border border-white/10 text-cream text-sm outline-none focus:border-gold/40 transition-colors"
              />
              {isMidweek && date && (
                <div className="mt-3 flex items-center gap-2 px-4 py-2 bg-gold/5 border border-gold/20 text-gold text-xs">
                  <Sparkles size={12} /> 20% off Pizza & Pasta on this day!
                </div>
              )}
            </div>

            {/* Service & Time */}
            <div className="book-reveal">
              <h3 className="flex items-center gap-2 text-cream/80 text-sm font-accent tracking-[0.2em] uppercase mb-4">
                <Clock size={14} className="text-gold" /> Service & Time
              </h3>
              <div className="flex gap-3 mb-4">
                {['lunch', 'dinner'].map(s => (
                  <button key={s} onClick={() => { setService(s); setTime(''); }}
                    className={`px-6 py-3 text-[10px] font-accent tracking-[0.2em] uppercase border transition-all ${service === s ? 'bg-gold text-midnight border-gold' : 'border-white/10 text-cream/50 hover:border-gold/30'}`}>
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {(service === 'lunch' ? TIME_SLOTS_LUNCH : TIME_SLOTS_DINNER).map(t => (
                  <button key={t} onClick={() => setTime(t)}
                    className={`px-4 py-2.5 text-sm border transition-all ${time === t ? 'bg-gold/20 text-gold border-gold/40' : 'border-white/10 text-cream/50 hover:border-gold/20 hover:text-gold'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Atmosphere */}
            <div className="book-reveal">
              <h3 className="flex items-center gap-2 text-cream/80 text-sm font-accent tracking-[0.2em] uppercase mb-4">
                <Star size={14} className="text-gold" /> Seating Atmosphere
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ATMOSPHERES.map(a => (
                  <button key={a.name} onClick={() => setAtmosphere(a.name)}
                    className={`text-left p-5 border transition-all duration-300 ${atmosphere === a.name ? 'border-gold/40 bg-gold/5' : 'border-white/5 hover:border-gold/20 bg-white/[0.01]'}`}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">{a.icon}</span>
                      <span className={`font-display text-base italic ${atmosphere === a.name ? 'text-gold' : 'text-cream/80'}`}>{a.name}</span>
                    </div>
                    <p className="text-cream/40 text-xs">{a.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div className="book-reveal">
              <h3 className="text-cream/80 text-sm font-accent tracking-[0.2em] uppercase mb-4">Occasion <span className="text-cream/30 text-xs">(optional)</span></h3>
              <div className="flex flex-wrap gap-2">
                {OCCASIONS.map(o => (
                  <button key={o} onClick={() => setOccasion(occasion === o ? '' : o)}
                    className={`px-4 py-2 text-xs tracking-wider border rounded-full transition-all ${occasion === o ? 'bg-gold/20 text-gold border-gold/40' : 'border-white/10 text-cream/40 hover:border-gold/20'}`}>
                    {o}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary Card */}
          <div className="book-reveal lg:sticky lg:top-32 h-fit">
            <div className="bg-white/[0.02] border border-white/5 p-8">
              <h3 className="font-display text-2xl italic text-cream mb-6 tracking-wide">Your Reservation</h3>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Guests</span>
                  <span className="text-cream">{guests}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Date</span>
                  <span className="text-cream">{date || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Service</span>
                  <span className="text-cream capitalize">{service}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Time</span>
                  <span className="text-cream">{time || '—'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-cream/40">Seating</span>
                  <span className="text-cream">{atmosphere || '—'}</span>
                </div>
                {occasion && (
                  <div className="flex justify-between text-sm">
                    <span className="text-cream/40">Occasion</span>
                    <span className="text-cream">{occasion}</span>
                  </div>
                )}
                {isMidweek && (
                  <div className="px-3 py-2 bg-gold/5 border border-gold/20 text-gold text-xs flex items-center gap-2">
                    <Sparkles size={11} /> 20% off Pizza & Pasta
                  </div>
                )}
              </div>
              <button onClick={handleBook}
                className="w-full py-4 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-xs tracking-[0.3em] uppercase hover:from-gold hover:to-gold-light transition-all flex items-center justify-center gap-2 group">
                Complete on OpenTable
                <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
              <p className="text-cream/30 text-xs text-center mt-3">Secured via OpenTable</p>
            </div>

            <div className="mt-6 text-center">
              <a href={PHONE_HREF} className="flex items-center justify-center gap-2 text-cream/50 hover:text-gold transition-colors text-sm">
                <Phone size={13} className="text-gold" /> Or call {PHONE}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
