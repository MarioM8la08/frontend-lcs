"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useRouter, usePathname } from "next/navigation";

export default function NavMobile({ mobileCities }) {
  const [open, setOpen] = useState(false);
  const mobileMenuListRef = useRef(null); // lista sinistra mobile (orizzontale)
  const mobileCitiesPanelRef = useRef(null); // contenitore (solo fade)
  const mobileCitiesListRef = useRef(null); // lista destra scrollabile
  const router = useRouter();
  const pathname = usePathname();

  const buildContextHref = (href) => {
    const path = pathname || "/";
    const isCity = /^\/competitions\//i.test(path);
    if (!isCity) return href;
    // se un giorno aggiungi "Classifica" / "Squadre" / "Partite" nel menu mobile sinistro, usa questa funzione
    const baseSeg = (href || "/").replace(/^\//, "");
    if (!baseSeg) return "/";
    const citySegment = path.split("/")[2] || "";
    return `/competitions/${citySegment}/${baseSeg}`;
  };

  const updateFocus = (container, axis = "y") => {
    if (!container) return -1;
    const items = Array.from(container.querySelectorAll("li"));
    if (!items.length) return -1;

    // se siamo a inizio scroll orizzontale: focus forzato sul primo
    if (axis === "x" && container.scrollLeft === 0) {
      items.forEach((el, i) => {
        const isFirst = i === 0;
        gsap.to(el, {
          scale: isFirst ? 1.15 : 0.9,
          opacity: isFirst ? 1 : 0.5,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });
        el.classList.toggle("focused", isFirst);
      });
      return 0;
    }

    const rect = container.getBoundingClientRect();
    const containerCenter =
      axis === "y" ? rect.top + rect.height / 2 : rect.left + rect.width / 2;

    let minDist = Infinity;
    let closestIndex = -1;

    const centers = items.map((el) => {
      const r = el.getBoundingClientRect();
      return axis === "y" ? r.top + r.height / 2 : r.left + r.width / 2;
    });

    centers.forEach((c, i) => {
      const d = Math.abs(c - containerCenter);
      if (d < minDist) {
        minDist = d;
        closestIndex = i;
      }
    });

    items.forEach((el, i) => {
      const isFocused = i === closestIndex;
      gsap.to(el, {
        scale: isFocused ? 1.15 : 0.9,
        opacity: isFocused ? 1 : 0.5,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
      el.classList.toggle("focused", isFocused);
    });
    return closestIndex;
  };

  const attachFocusHandlers = (container, axis = "y") => {
    if (!container) return () => {};
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateFocus(container, axis);
          ticking = false;
        });
      }
    };
    const onResize = () => {
      updateFocus(container, axis);
    };
    container.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    updateFocus(container, axis);
    return () => {
      container.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  };

  // Forza scroll iniziale a sinistra e collega handlers quando si apre il menu
  useEffect(() => {
    if (!open) return;
    const left = mobileMenuListRef.current;
    const right = mobileCitiesListRef.current;
    [left, right].forEach((list) => {
      if (list) {
        list.style.paddingLeft = "12px";
        list.style.paddingRight = "12px";
      }
    });
    if (left) left.scrollLeft = 0;
    if (right) right.scrollLeft = 0;
    const cleanLeft = attachFocusHandlers(left, "x");
    const cleanRight = attachFocusHandlers(right, "x");
    [left, right].forEach((list) => {
      if (!list) return;
      const lis = list.querySelectorAll("li");
      lis.forEach((li, i) => li.classList.toggle("focused", i === 0));
    });
    return () => {
      cleanLeft();
      cleanRight();
    };
  }, [open]);

  // fade pannello destro
  useEffect(() => {
    const panel = mobileCitiesPanelRef.current;
    if (!panel) return;
    gsap.to(panel, {
      autoAlpha: open ? 1 : 0,
      duration: open ? 0.3 : 0.2,
      ease: open ? "power2.out" : "power2.in",
    });
  }, [open]);

  // blocco scroll del body quando il menu è aperto
  useEffect(() => {
    if (typeof document === "undefined") return;
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : original || "";
    return () => {
      document.body.style.overflow = original || "";
    };
  }, [open]);

  const handleMobileCityClick = (e, city) => {
    e.preventDefault();
    setOpen(false);
    router.push(city.href);
  };

  return (
    <>
      <div className="hamburger-menu">
        <div id="menuToggle">
          <input
            type="checkbox"
            id="menuCheckbox"
            checked={open}
            onChange={() => setOpen(!open)}
          />
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`menu${open ? " open" : ""}`}>
        <div className="menu-content">
          <ul className="menu-left" ref={mobileMenuListRef}>
            <li>
              <a href="/CompetizioneLSC">Competizione LSC</a>
            </li>
            <li>
              <a href="/Competizione">Competizioni</a>
            </li>
            <li>
              <a href="/Home">Chi siamo</a>
            </li>
          </ul>
          <div className={`menu-right visible`} ref={mobileCitiesPanelRef}>
            <ul className="menu-right-list" ref={mobileCitiesListRef}>
              {mobileCities.map((city) => (
                <li key={city.href}>
                  <a href={city.href} onClick={(e) => handleMobileCityClick(e, city)}>
                    {city.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
