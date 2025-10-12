'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SectionReveal({ title, children, className = '', align = 'left' }) {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        gsap.registerPlugin(ScrollTrigger);

        const triggerEl = sectionRef.current;
        if (!triggerEl) return;

        // Se vuoi animare tutti i discendenti: gsap.utils.toArray(triggerEl.querySelectorAll('*'))
        const items = gsap.utils.toArray(triggerEl.children);
        if (!items.length) return;

        const prefersReduced =
            window.matchMedia &&
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReduced) {
            gsap.set(items, { autoAlpha: 1, y: 0 });
            return;
        }

        const ctx = gsap.context(() => {
            gsap.set(items, { autoAlpha: 0, y: 20 });

            gsap.timeline({
                defaults: { ease: 'power3.out' },
                scrollTrigger: {
                    trigger: triggerEl,
                    start: 'top 80%',
                    end: 'bottom 60%',
                    once: true,
                },
            }).to(items, {
                autoAlpha: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.15,
            });
        }, triggerEl);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`section-reveal ${className}`.trim()}
            style={{ textAlign: align }}
        >
            {title ? <h2 className="section-reveal__title">{title}</h2> : null}
            {children}
        </section>
    );
}
