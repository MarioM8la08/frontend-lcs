"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function EventReveal() {
  const rootRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const el = rootRef.current;
    if (!el) return;

    const prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const headline = el.querySelector(".event-title");
    const eyebrow = el.querySelector(".event-eyebrow");
    const copy = el.querySelector(".event-tagline");
    const cards = gsap.utils.toArray(el.querySelectorAll(".feature-card"));
    const blobs = gsap.utils.toArray(el.querySelectorAll(".event-blob"));

    if (prefersReduced) {
      gsap.set([headline, eyebrow, copy, cards], { autoAlpha: 1, y: 0, skewY: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set([headline, eyebrow, copy], { autoAlpha: 0, y: 24 });
      gsap.set(cards, { autoAlpha: 0, y: 28, rotate: -2, scale: 0.96 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: el,
          start: "top 78%",
          end: "bottom 60%",
          once: true,
        },
      });

      tl.to(eyebrow, { autoAlpha: 1, y: 0, duration: 0.4 })
        .to(headline, { autoAlpha: 1, y: 0, duration: 0.6 }, "<+0.05")
        .to(copy, { autoAlpha: 1, y: 0, duration: 0.5 }, "<+0.05")
        .to(cards, {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
        }, "<+0.05");

      // Parallax delicato per i blob di background
      blobs.forEach((b, i) => {
        gsap.to(b, {
          yPercent: i % 2 === 0 ? -12 : -6,
          xPercent: i % 2 === 0 ? 6 : -6,
          rotate: i % 2 === 0 ? 8 : -6,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section-reveal event-reveal" style={{ textAlign: "left" }}>
      {/* Background decor */}
      <div className="event-bg" aria-hidden>
        <div className="event-blob event-blob--1" />
        <div className="event-blob event-blob--2" />
        <div className="event-gridlines" />
      </div>

      <div className="event-inner">
        <div className="event-copy">
          <div className="event-eyebrow">L'Evento</div>
          <h2 className="event-title">Un format unico e coinvolgente</h2>
          <p className="event-tagline">
            Costruito per attirare un vasto pubblico all'interno delle scuole,
            indipendentemente dai loro meriti sportivi.
          </p>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon" aria-hidden>🥇</div>
            <div className="feature-body">
              <h3 className="feature-title">Unico</h3>
              <p className="feature-text">
                Siamo il primo torneo in Italia specificamente rivolto alle scuole superiori.
              </p>
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden>🤝</div>
            <div className="feature-body">
              <h3 className="feature-title">Inclusivo</h3>
              <p className="feature-text">
                Rivolto a tutti gli studenti, indipendentemente dal sesso o dall'età.
              </p>
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden>🌿</div>
            <div className="feature-body">
              <h3 className="feature-title">Ecologico</h3>
              <p className="feature-text">
                Tutti i prodotti e le pratiche sono al 100% verdi ed ecologici.
              </p>
            </div>
          </article>

          <article className="feature-card">
            <div className="feature-icon" aria-hidden>📜</div>
            <div className="feature-body">
              <h3 className="feature-title">Storico</h3>
              <p className="feature-text">
                5 anni di esperienza nel settore con una fanbase già corposa.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

