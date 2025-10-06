'use client';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function AnimatedTitle({ text }) {
    const titleRef = useRef(null);

    useEffect(() => {
        const el = titleRef.current;
        gsap.fromTo(
            el,
            { autoAlpha: 0, y: 40 },
            { autoAlpha: 1, y: 0, duration: 2, ease: 'power3.out' }
        );
    }, []);

    return <h1 ref={titleRef} className="city-title">{text}</h1>;
}