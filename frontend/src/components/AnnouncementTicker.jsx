import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';
import { tickerAnnouncements, OPEN_TABLE } from '../data/site';

export default function AnnouncementTicker() {
  const [index, setIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % tickerAnnouncements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  if (dismissed) return null;

  const current = tickerAnnouncements[index];

  return (
    <aside className="announcement-bar" aria-label="Restaurant announcements">
      <div className="announcement-bar__inner shell">
        <div className="announcement-bar__content">
          <span className="announcement-bar__tag">
            <Sparkles size={11} className="text-gold" />
            <span>Today at That's Amore</span>
          </span>
          <span className="announcement-bar__divider">|</span>
          <div className="announcement-bar__message-track" key={index}>
            <span className="announcement-bar__icon">{current.icon}</span>
            <span className="announcement-bar__text">{current.text}</span>
          </div>
        </div>

        <div className="announcement-bar__actions">
          <Link to="/menu" className="announcement-bar__link">
            View Menu
          </Link>
          <span className="announcement-bar__dot">·</span>
          <a
            href={OPEN_TABLE}
            target="_blank"
            rel="noreferrer"
            className="announcement-bar__link announcement-bar__link--cta"
          >
            Book Table ↗
          </a>
          <button
            type="button"
            className="announcement-bar__close"
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
          >
            <X size={13} />
          </button>
        </div>
      </div>
    </aside>
  );
}
