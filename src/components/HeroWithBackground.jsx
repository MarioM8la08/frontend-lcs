"use client";

import React from "react";
import HeroAnimation from "./HeroAnimation";
import ImageSlider from "./ImageSlider";

export default function HeroWithBackground() {
    // Sostituisci con i tuoi path in `public/images/...`
    const images = [
        "/HomeFoto/13.jpg",
        "/HomeFoto/19.jpg"
    ];

    return (
        <section
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "grid",
                placeItems: "center",
                overflow: "hidden",
            }}
        >
            <ImageSlider images={images} interval={5000} transition={900} overlayOpacity={0.3} />
            <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
                <HeroAnimation text="estudentsleague" duration={2} stagger={0.1} />
            </div>
        </section>
    );
}