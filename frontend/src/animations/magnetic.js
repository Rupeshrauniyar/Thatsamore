import gsap from 'gsap';

export function bindMagnetic(el, strength = 0.22) {
  if (!el) return () => {};
  const move = (event) => {
    const rect = el.getBoundingClientRect();
    const x = event.clientX - (rect.left + rect.width / 2);
    const y = event.clientY - (rect.top + rect.height / 2);
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.45, ease: 'power3.out' });
  };
  const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.6)' });
  el.addEventListener('mousemove', move);
  el.addEventListener('mouseleave', leave);
  return () => {
    el.removeEventListener('mousemove', move);
    el.removeEventListener('mouseleave', leave);
  };
}
