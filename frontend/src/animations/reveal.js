import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const revealUp = (targets, options = {}) => {
  return gsap.fromTo(targets,
    { autoAlpha: 0, y: options.y ?? 36 },
    {
      autoAlpha: 1,
      y: 0,
      duration: options.duration ?? 0.8,
      ease: options.ease ?? 'power3.out',
      stagger: options.stagger ?? 0.06,
      scrollTrigger: {
        trigger: options.trigger ?? targets,
        start: options.start ?? 'top 86%',
        once: options.once ?? true
      }
    }
  );
};

export const imageReveal = (container, image, options = {}) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: options.trigger ?? container,
      start: options.start ?? 'top 86%',
      once: true
    }
  });
  tl.fromTo(container, { clipPath: 'inset(12% 8% 12% 8%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power3.out' });
  tl.fromTo(image, { scale: 1.08 }, { scale: 1, duration: 1.2, ease: 'power3.out' }, '<');
  return tl;
};
