import { useEffect, useRef } from 'react';

export default function ArchitecturalWaves() {
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!svgRef.current) return;
      const { clientX, clientY } = e;
      const xNorm = (clientX / window.innerWidth - 0.5) * 20;
      const yNorm = (clientY / window.innerHeight - 0.5) * 15;
      svgRef.current.style.transform = `translate3d(${xNorm}px, ${yNorm}px, 0)`;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="architectural-waves" aria-hidden="true">
      <svg
        ref={svgRef}
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="architectural-waves__svg"
      >
        <path
          className="wave-line wave-line--1"
          d="M-40 180 C 260 80, 520 280, 840 140 C 1140 20, 1380 240, 1500 120"
          stroke="currentColor"
          strokeWidth="1.2"
        />
        <path
          className="wave-line wave-line--2"
          d="M-40 220 C 290 120, 550 310, 870 170 C 1170 50, 1390 260, 1500 150"
          stroke="currentColor"
          strokeWidth="0.9"
        />
        <path
          className="wave-line wave-line--3"
          d="M-40 260 C 320 160, 580 340, 900 200 C 1200 80, 1400 280, 1500 180"
          stroke="currentColor"
          strokeWidth="0.7"
        />
        <path
          className="wave-line wave-line--4"
          d="M-40 300 C 350 200, 610 370, 930 230 C 1230 110, 1420 300, 1500 210"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
