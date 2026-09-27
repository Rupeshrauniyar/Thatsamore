import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-midnight text-cream min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <span className="text-gold/60 text-[10px] font-accent tracking-[0.4em] uppercase block mb-4">— Error 404 —</span>
        <h1 className="font-display text-7xl md:text-9xl italic text-gold mb-4">404</h1>
        <h2 className="font-display text-3xl md:text-4xl italic text-cream mb-4 tracking-wide">
          This Table Isn't Set
        </h2>
        <p className="text-cream/50 text-sm mb-8">
          The page you're looking for doesn't exist. Perhaps it's moved, or maybe you mistyped the URL.
        </p>
        <Link to="/"
          className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-gold-dark to-gold text-midnight font-accent text-xs tracking-[0.3em] uppercase hover:from-gold hover:to-gold-light transition-all group">
          Return Home
          <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
