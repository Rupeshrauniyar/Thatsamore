import { Heart } from 'lucide-react';

export default function LogoMark({ compact = false }) {
  return (
    <div className={`logo-mark ${compact ? 'logo-mark--compact' : ''}`} aria-label="That's Amore">
      <div className="logo-mark__heart"><Heart size={compact ? 12 : 15} strokeWidth={2.1} fill="currentColor" /></div>
      <div className="logo-mark__wordmark">That's <em>Amore</em></div>
      <div className="logo-mark__est">EST 2022 · Lindfield</div>
    </div>
  );
}
