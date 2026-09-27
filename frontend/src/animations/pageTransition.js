import gsap from 'gsap';

export function runPageTransition(overlay, done) {
  const tl = gsap.timeline({ onComplete: done });
  tl.set(overlay, { display: 'block', autoAlpha: 1, scaleY: 0, transformOrigin: 'bottom' })
    .to(overlay, { scaleY: 1, duration: 0.32, ease: 'power3.inOut' })
    .set(overlay, { transformOrigin: 'top' })
    .to(overlay, { scaleY: 0, duration: 0.42, ease: 'power3.inOut' });
}
