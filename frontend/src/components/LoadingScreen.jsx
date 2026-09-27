import { useEffect, useState } from 'react';
import LogoMark from './LogoMark';

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const start = performance.now();
    const min = 850;
    const done = () => setVisible(false);
    const wait = Math.max(0, min - (performance.now() - start));
    const timer = setTimeout(done, wait);
    return () => clearTimeout(timer);
  }, []);
  if (!visible) return null;
  return (
    <div className="loading-screen" aria-hidden="true">
      <LogoMark />
      <div className="loading-screen__meta"><span>AUTHENTIC SICILIAN CUISINE</span><span>LINDFIELD · WEST SUSSEX</span></div>
      <div className="loading-screen__line"><span /></div>
    </div>
  );
}
