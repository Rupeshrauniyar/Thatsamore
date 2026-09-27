import { Link } from 'react-router-dom';

export function Legal({ type }) {
  const isPrivacy = type === 'privacy';

  return (
    <div className="bg-midnight text-cream min-h-screen pt-40 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Legal —</span>
        <h1 className="font-display text-4xl md:text-5xl italic text-cream tracking-wide mb-8">
          {isPrivacy ? 'Privacy Policy' : 'Terms & Conditions'}
        </h1>
        <div className="prose prose-invert prose-sm max-w-none space-y-6 text-cream/50 leading-relaxed">
          {isPrivacy ? (
            <>
              <p>That's Amore Italian Restaurant ("we", "us") is committed to protecting and respecting your privacy. This policy explains how we collect, use, and safeguard your personal data.</p>
              <h3 className="font-display text-xl italic text-cream">Information We Collect</h3>
              <p>We may collect your name, email address, telephone number, and any other information you voluntarily provide when making a reservation, contacting us, or subscribing to our newsletter.</p>
              <h3 className="font-display text-xl italic text-cream">How We Use Your Information</h3>
              <p>We use your personal data to process reservations, respond to enquiries, send occasional marketing communications (with your consent), and improve our services.</p>
              <h3 className="font-display text-xl italic text-cream">Data Retention</h3>
              <p>We retain your data only for as long as necessary to fulfil the purposes outlined above, or as required by law.</p>
              <h3 className="font-display text-xl italic text-cream">Contact</h3>
              <p>For data-related enquiries, contact us at thatsamore.25@outlook.com or call 01444 484 824.</p>
            </>
          ) : (
            <>
              <p>By using this website and dining at That's Amore, you agree to the following terms and conditions.</p>
              <h3 className="font-display text-xl italic text-cream">Reservations</h3>
              <p>Reservations are subject to availability. We hold tables for 15 minutes past the booking time. For parties of 7+, please contact us directly.</p>
              <h3 className="font-display text-xl italic text-cream">Promotions</h3>
              <p>Our 20% discount on Pizza & Pasta (Tuesday–Thursday, dine-in only) cannot be combined with other offers. Management reserves the right to modify or withdraw promotions.</p>
              <h3 className="font-display text-xl italic text-cream">Dietary Information</h3>
              <p>While we take every care to accommodate dietary requirements, we cannot guarantee a completely allergen-free environment. Please inform your server of any allergies.</p>
            </>
          )}
        </div>
        <div className="mt-12">
          <Link to="/" className="text-gold text-sm hover:text-gold-light transition-colors border-b border-gold/40 pb-0.5">← Return Home</Link>
        </div>
      </div>
    </div>
  );
}
