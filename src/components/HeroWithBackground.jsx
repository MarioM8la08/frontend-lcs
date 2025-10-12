"use client";

import React, { useEffect, useState } from "react";
import HeroAnimation from "./HeroAnimation";
import ImageSlider from "./ImageSlider";

export default function HeroWithBackground() {
    const [isSmall, setIsSmall] = useState(false);

    useEffect(() => {
        const mql = window.matchMedia("(max-width: 408px)");
        const update = (e) => setIsSmall(e.matches);
        // init
        setIsSmall(mql.matches);
        // subscribe
        if (mql.addEventListener) {
            mql.addEventListener("change", update);
            return () => mql.removeEventListener("change", update);
        } else {
            // fallback
            mql.addListener(update);
            return () => mql.removeListener(update);
        }
    }, []);

    const images = ["/HomeFoto/13.jpg", "/HomeFoto/19.jpg"];
    const displayText = isSmall ? "esl" : "estudentsleague";

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
                <HeroAnimation text={displayText} duration={2} stagger={0.1} />
            </div>
        </section>
    );
}
