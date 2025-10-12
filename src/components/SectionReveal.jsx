'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionReveal({ title, children, className = '', align = 'left' }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const titleEl = titleRef.current;
    const paraEl = paraRef.current;
    const triggerEl = sectionRef.current;
    if (!titleEl || !paraEl || !triggerEl) return;

    if (prefersReduced) {
      gsap.set([titleEl, paraEl], { autoAlpha: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([titleEl, paraEl], { autoAlpha: 0, y: 20 });

      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: triggerEl,
          start: 'top 80%',
          end: 'bottom 60%',
          once: true,
        },
      });

      tl.to(titleEl, { autoAlpha: 1, y: 0, duration: 0.6 })
        .to(paraEl, { autoAlpha: 1, y: 0, duration: 0.6 }, '-=0.2');
    }, triggerEl);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`section-reveal ${className}`.trim()} style={{ textAlign: align }}>
      <h2 ref={titleRef} className="section-reveal__title">{title}</h2>
      <p ref={paraRef} className="section-reveal__paragraph">{children}</p>
    </section>
  );
}

