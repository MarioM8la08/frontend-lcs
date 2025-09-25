"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

export default function ImageSlider({
                                        images = [],
                                        interval = 5000,
                                        transition = 1000,
                                        overlayOpacity = 0,
                                    }) {
    const [index, setIndex] = useState(0);
    const reduced = useRef(false);

    // Rispetta utenti con riduzione movimento
    useEffect(() => {
        if (typeof window !== "undefined" && window.matchMedia) {
            reduced.current = window
                .matchMedia("(prefers-reduced-motion: reduce)")
                .matches;
        }
    }, []);

    // Preload immagini
    useEffect(() => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, [images]);

    // Autoplay
    useEffect(() => {
        if (!images.length || reduced.current) return;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % images.length);
        }, interval);
        return () => clearInterval(id);
    }, [images, interval]);

    const slides = useMemo(
        () =>
            images.map((src, i) => {
                const isActive = i === index;
                return (
                    <div
                        key={src + i}
                        aria-hidden="true"
                        style={{
                            position: "absolute",
                            inset: 0,
                            backgroundImage: `url(${src})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            willChange: "opacity, transform",
                            opacity: isActive ? 1 : 0,
                            transform: reduced.current ? "none" : isActive ? "scale(1)" : "scale(1.05)",
                            transition: reduced.current
                                ? "none"
                                : `opacity ${transition}ms ease-in-out, transform ${Math.round(
                                    transition * 1.5
                                )}ms ease-out`,
                        }}
                    />
                );
            }),
        [images, index, transition]
    );

    return (
        <div
            aria-hidden="true"
            style={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                overflow: "hidden",
                pointerEvents: "none",
            }}
        >
            {slides}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.25) 100%)",
                    backdropFilter: "none",
                    // ulteriore oscuramento configurabile
                    boxShadow: `inset 0 0 0 100vmax rgba(0,0,0,${0.6})`,
                }}
            />
        </div>
    );
}


