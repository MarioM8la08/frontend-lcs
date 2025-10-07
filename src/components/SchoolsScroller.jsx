// src/components/SchoolsScroller.jsx
'use client';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function SchoolsScroller({ schools = [], animate = true }) {
    if (!schools.length) return null;

    const scrollerRef = useRef(null);
    const cardsRef = useRef([]);
    const reducedMotion = useRef(false);

    // Collettore refs card
    const setCardRef = (el) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current.push(el);
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.matchMedia) {
            reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        }
    }, []);

    useEffect(() => {
        if (!animate) return;
        const scroller = scrollerRef.current;
        if (!scroller || !cardsRef.current.length) return;

        // Stato iniziale card (se non ridotto movimento)
        if (!reducedMotion.current) {
            gsap.set(cardsRef.current, { autoAlpha: 0, y: 28 });
        }

        // Se utente preferisce meno animazioni: mostra tutto subito
        if (reducedMotion.current) {
            gsap.set(cardsRef.current, { autoAlpha: 1, y: 0 });
            return;
        }

        const animatedSet = new WeakSet();
        let sequence = 0; // per gestire lieve delay progressivo

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !animatedSet.has(entry.target)) {
                        animatedSet.add(entry.target);
                        const localDelay = Math.min(sequence * 0.05, 0.6); // limit del delay
                        sequence += 1;
                        gsap.to(entry.target, {
                            autoAlpha: 1,
                            y: 0,
                            duration: 0.55,
                            ease: 'power3.out',
                            delay: localDelay,
                            clearProps: 'transform,opacity'
                        });
                        // Una volta animata possiamo smettere di osservarla
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                root: scroller,
                threshold: 0.25,
                rootMargin: '0px 40px 0px 0px'
            }
        );

        cardsRef.current.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, [animate, schools]);

    return (
        <section className="schools-section">
            <div ref={scrollerRef} className="schools-scroller">
                {schools.map(s => (
                    <div ref={setCardRef} key={s.id} className="school-card">
                        <div className="logo-wrap">
                            {s.logo && (
                                <Image
                                    src={s.logo}
                                    alt={s.name}
                                    fill
                                    sizes="120px"
                                    style={{ objectFit: 'contain' }}
                                />
                            )}
                        </div>
                        <div className="school-name">{s.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
