import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin, Clock, Send, ChevronDown, ArrowUpRight } from 'lucide-react';
import { PHONE, PHONE_HREF, EMAIL, EMAIL_HREF, ADDRESS, MAPS_URL, openingHours, faqs } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const pageRef = useRef(null);

  const handleChange = (e) => setFormData(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => { e.preventDefault(); if (formData.name && formData.email && formData.message) setSent(true); };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-hero > *', { y: 50, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power4.out', delay: 0.3 });
      gsap.utils.toArray('.contact-reveal').forEach(el => {
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
      <section className="pt-40 pb-16 px-6 text-center">
        <div className="contact-hero max-w-3xl mx-auto">
          <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Get in Touch —</span>
          <h1 className="font-display text-5xl md:text-7xl italic text-cream tracking-wide mb-4">
            <span className="text-gold">Contact</span> Us
          </h1>
          <p className="text-cream/50 text-base max-w-xl mx-auto">
            We'd love to hear from you. Whether it's a reservation question, group booking, or simply to say hello.
          </p>
        </div>
      </section>

      {/* Contact Grid */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info + Map */}
          <div className="space-y-8">
            {/* Info Cards */}
            <div className="contact-reveal grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a href={PHONE_HREF} className="group p-6 bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-all">
                <Phone size={18} className="text-gold mb-3" />
                <span className="text-[10px] font-accent tracking-[0.3em] uppercase text-cream/40 block mb-1">Telephone</span>
                <span className="font-display text-lg italic text-cream group-hover:text-gold transition-colors">{PHONE}</span>
              </a>
              <a href={EMAIL_HREF} className="group p-6 bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-all">
                <Mail size={18} className="text-gold mb-3" />
                <span className="text-[10px] font-accent tracking-[0.3em] uppercase text-cream/40 block mb-1">Email</span>
                <span className="text-cream group-hover:text-gold transition-colors text-sm">{EMAIL}</span>
              </a>
              <a href={MAPS_URL} target="_blank" rel="noreferrer" className="group p-6 bg-white/[0.02] border border-white/5 hover:border-gold/20 transition-all">
                <MapPin size={18} className="text-gold mb-3" />
                <span className="text-[10px] font-accent tracking-[0.3em] uppercase text-cream/40 block mb-1">Address</span>
                <span className="text-cream/80 group-hover:text-gold transition-colors text-sm">{ADDRESS}</span>
              </a>
              <div className="p-6 bg-white/[0.02] border border-white/5">
                <Clock size={18} className="text-gold mb-3" />
                <span className="text-[10px] font-accent tracking-[0.3em] uppercase text-cream/40 block mb-1">Today's Hours</span>
                <span className="text-cream/80 text-sm">
                  {(() => {
                    const today = new Date().getDay();
                    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    const todayEntry = openingHours.find(([d]) => d === dayNames[today]);
                    return todayEntry ? todayEntry[1] : 'Closed';
                  })()}
                </span>
              </div>
            </div>

            {/* Hours List */}
            <div className="contact-reveal bg-white/[0.02] border border-white/5 p-6">
              <h3 className="font-display text-xl italic text-cream mb-4 tracking-wide flex items-center gap-2">
                <Clock size={16} className="text-gold" /> Full Opening Hours
              </h3>
              <div className="space-y-2">
                {openingHours.map(([day, hrs, isOpen]) => (
                  <div key={day} className="flex justify-between text-sm py-2 border-b border-white/5 last:border-0">
                    <span className="text-cream/50">{day}</span>
                    <span className={isOpen ? 'text-cream/80' : 'text-cream/30 italic'}>{hrs}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="contact-reveal overflow-hidden border border-white/5 h-64">
              <iframe
                title="That's Amore Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2503.245765232827!2d-0.07278768405813!3d51.00862317956032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4875e0c4c5bdb5a7%3A0x3e75c5c0f5b87e2c!2s96%20High%20St%2C%20Lindfield%2C%20Haywards%20Heath%20RH16%202HP!5e0!3m2!1sen!2suk!4v1"
                width="100%" height="100%" style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }}
                allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="contact-reveal">
            <div className="bg-white/[0.02] border border-white/5 p-8 md:p-10">
              <h3 className="font-display text-2xl italic text-cream mb-6 tracking-wide">Send a Message</h3>
              {sent ? (
                <div className="text-center py-12">
                  <span className="text-gold text-3xl mb-4 block">✓</span>
                  <p className="font-display text-xl italic text-cream mb-2">Grazie Mille!</p>
                  <p className="text-cream/50 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="text-cream/40 text-xs font-accent tracking-wider uppercase block mb-2">Name *</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 text-cream text-sm outline-none focus:border-gold/40 transition-colors placeholder:text-cream/20"
                      placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-cream/40 text-xs font-accent tracking-wider uppercase block mb-2">Email *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 text-cream text-sm outline-none focus:border-gold/40 transition-colors placeholder:text-cream/20"
                      placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="text-cream/40 text-xs font-accent tracking-wider uppercase block mb-2">Subject</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 text-cream text-sm outline-none focus:border-gold/40 transition-colors placeholder:text-cream/20"
                      placeholder="Reservation, Group Booking, Feedback..." />
                  </div>
                  <div>
                    <label className="text-cream/40 text-xs font-accent tracking-wider uppercase block mb-2">Message *</label>
                    <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                      className="w-full px-4 py-3 bg-white/[0.03] border border-white/10 text-cream text-sm outline-none focus:border-gold/40 transition-colors placeholder:text-cream/20 resize-none"
                      placeholder="Tell us how we can help..." />
                  </div>
                  <button type="submit"
                    className="w-full py-4 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-xs tracking-[0.3em] uppercase hover:from-gold hover:to-gold-light transition-all flex items-center justify-center gap-2 group">
                    Send Message <Send size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 contact-reveal">
            <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Common Questions —</span>
            <h2 className="font-display text-3xl md:text-4xl italic text-cream tracking-wide">
              Frequently <span className="text-gold">Asked</span>
            </h2>
          </div>
          <div className="contact-reveal space-y-0">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-white/5">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between py-5 text-left group">
                  <span className={`text-sm font-medium transition-colors ${openFaq === idx ? 'text-gold' : 'text-cream/70 group-hover:text-gold'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown size={16} className={`text-gold/60 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-40 pb-5' : 'max-h-0'}`}>
                  <p className="text-cream/40 text-sm leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
