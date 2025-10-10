'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function AnimatedSectionTitle({ children, className = '' }) {
  const ref = useRef(null);
  const reducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion.current) {
      gsap.set(el, { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(el, { autoAlpha: 0, y: 18 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(el, {
              autoAlpha: 1,
              y: 0,
              duration: 0.55,
              ease: 'power3.out',
              clearProps: 'transform,opacity'
            });
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <h2 ref={ref} className={`titleScrollers ${className}`.trim()}>
      {children}
    </h2>
  );
}

