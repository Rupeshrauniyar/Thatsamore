import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsap(setup, deps = []) {
  const root = useRef(null);

  useLayoutEffect(() => {
    if (!root.current) return undefined;
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger), root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return root;
}
