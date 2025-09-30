"use client";
import React, { useEffect, useRef, useState } from 'react';
import './Styles/Nav.css';
import gsap from 'gsap';
import { Flip } from 'gsap/Flip';
import { useRouter } from 'next/navigation';


export default function Nav() {
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [leftFocusedIdx, setLeftFocusedIdx] = useState(0);
    const defaultCities = [
        { name: 'Brescia', href: '/competitions/Brescia' },
        { name: 'Roma', href: '/competitions/Roma' },
        { name: 'Milano', href: '/competitions/Milano' },
        { name: 'Napoli', href: '/competitions/Napoli' },
        { name: 'Torino', href: '/competitions/Torino' },
        { name: 'Verona', href: '/competitions/Verona' },
        { name: 'Genova', href: '/competitions/Genova' },
        { name: 'Bologna', href: '/competitions/Bologna' },
        { name: 'Firenze', href: '/competitions/Firenze' },
        { name: 'Palermo', href: '/competitions/Palermo' },
        { name: 'Catania', href: '/competitions/Catania' },
        { name: 'Venezia', href: '/competitions/Venezia' },
        { name: 'LSC', href: '/Home' },
    ];

    const [cities, setCities] = useState(() => {
        if (typeof window !== 'undefined') {
            // 1. Ordine base: da localStorage se presente, altrimenti default
            let baseOrder = [...defaultCities];
            try {
                const raw = localStorage.getItem('navCitiesOrder');
                if (raw) {
                    const saved = JSON.parse(raw);
                    if (Array.isArray(saved) && saved.length) {
                        const hrefOrder = saved.map((c) => c.href);
                        baseOrder = [
                            ...hrefOrder.map((h) => defaultCities.find((c) => c.href === h)).filter(Boolean),
                            ...defaultCities.filter((c) => !hrefOrder.includes(c.href)),
                        ];
                    }
                }
            } catch (e) { /* ignore */ }

            // 2. Ricava slug corrente dalla URL: supporta sia /competitions/Città che /Città
            const path = window.location.pathname || '';
            let currentCitySlug = '';
            if (/^\/competitions\//i.test(path)) {
                currentCitySlug = decodeURIComponent(path.split('/')[2] || '').toLowerCase();
            } else {
                currentCitySlug = decodeURIComponent(path.replace(/^\//, '')).toLowerCase();
            }

            // 3. Se lo slug è presente, sposta quella città in testa, preservando il resto dell'ordine
            if (currentCitySlug) {
                const idx = baseOrder.findIndex((c) => {
                    const hrefSlug = c.href.replace(/^\/competitions\//i, '').replace(/^\//, '').toLowerCase();
                    const nameSlug = c.name.toLowerCase();
                    return hrefSlug === currentCitySlug || nameSlug === currentCitySlug;
                });
                if (idx > 0) {
                    const arr = [...baseOrder];
                    const [item] = arr.splice(idx, 1);
                    arr.unshift(item);
                    return arr;
                }
            }

            return baseOrder;
        }
        return defaultCities;
    });


    // Refs per applicare l'effetto focus scroll
    const mobileMenuListRef = useRef(null); // verticale (mobile overlay, left)
    const mobileCitiesListRef = useRef(null); // verticale (mobile overlay, right cities)
    const mobileCitiesPanelRef = useRef(null); // contenitore pannello destro
    const desktopCityListRef = useRef(null); // orizzontale (desktop: lista città principale)

    // Funzione helper per aggiornare focus in base alla distanza dal centro
    const updateFocus = (container, axis = 'y') => {
        if (!container) return -1;
        const items = Array.from(container.querySelectorAll('li'));
        if (!items.length) return -1;

        const rect = container.getBoundingClientRect();
        const containerCenter = axis === 'y' ? rect.top + rect.height / 2 : rect.left + rect.width / 2;

        let minDist = Infinity;
        let closestIndex = -1;

        const centers = items.map((el) => {
            const r = el.getBoundingClientRect();
            return axis === 'y' ? r.top + r.height / 2 : r.left + r.width / 2;
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
            // Animazione scale/opacity con GSAP
            gsap.to(el, {
                scale: isFocused ? 1.2 : 0.9,
                opacity: isFocused ? 1 : 0.5,
                duration: 0.25,
                ease: 'power2.out',
                overwrite: 'auto',
            });
            // Classe per il font-weight bold sul link
            if (isFocused) {
                el.classList.add('focused');
            } else {
                el.classList.remove('focused');
            }
        });
        return closestIndex;
    };

    // Collega scroll/resize handlers a un container
    const attachFocusHandlers = (container, axis = 'y', onIndexChange) => {
        if (!container) return () => {};
        let ticking = false;
        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    const idx = updateFocus(container, axis);
                    if (typeof onIndexChange === 'function') onIndexChange(idx);
                    ticking = false;
                });
            }
        };
        const onResize = () => {
            const idx = updateFocus(container, axis);
            if (typeof onIndexChange === 'function') onIndexChange(idx);
        };
        container.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        // Primo calcolo
        const firstIdx = updateFocus(container, axis);
        if (typeof onIndexChange === 'function') onIndexChange(firstIdx);
        return () => {
            container.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    };

    // Setup per mobile overlay solo quando aperto (verticale)
    useEffect(() => {
        if (!open) return; // collega quando il menu è visibile
        const container = mobileMenuListRef.current;
        const cleanup = attachFocusHandlers(container, 'y', setLeftFocusedIdx);
        return cleanup;
    }, [open]);

    // Attacca handlers alla lista città quando visibile
    useEffect(() => {
        if (!open || leftFocusedIdx !== 1) return;
        const container = mobileCitiesListRef.current;
        const cleanup = attachFocusHandlers(container, 'y');
        return cleanup;
    }, [open, leftFocusedIdx]);

    // Anima la comparsa/scomparsa del pannello destro
    useEffect(() => {
        const panel = mobileCitiesPanelRef.current;
        if (!panel) return;
        if (leftFocusedIdx === 1) {
            gsap.to(panel, { autoAlpha: 1, x: 0, duration: 0.3, ease: 'power2.out' });
        } else {
            gsap.to(panel, { autoAlpha: 0, x: 30, duration: 0.2, ease: 'power2.in' });
        }
    }, [leftFocusedIdx]);

    // Registra GSAP Flip una sola volta
    useEffect(() => {
        gsap.registerPlugin(Flip);
    }, []);

    // Segna il montaggio per evitare mismatch di idratazione
    useEffect(() => {
        setMounted(true);
    }, []);


    // Mantieni evidenziato il primo elemento dopo ogni riordino
    useEffect(() => {
        const container = desktopCityListRef.current;
        if (!container) return;
        const lis = container.querySelectorAll('li');
        lis.forEach((el, i) => el.classList.toggle('focused', i === 0));
    }, [cities]);

    // Gestore click per la selezione città nel mobile (pannello destro)
    const handleMobileCityClick = (e, city) => {
        e.preventDefault();
        setOpen(false);
        router.push(city.href);
    };

    // Gestore click per portare l'elemento selezionato in prima posizione con animazione GSAP Flip
    const handleCityClick = (e, city, index) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return; // lascia comportamento default con tasti speciali
        e.preventDefault();
        const container = desktopCityListRef.current;
        if (!container) {
            router.push(city.href);
            return;
        }
        if (index === 0) {
            router.push(city.href);
            return;
        }
        const items = container.querySelectorAll('li');
        const state = Flip.getState(items);

        // Calcola il nuovo ordine e persistilo
        const newOrder = [...cities];
        const [moved] = newOrder.splice(index, 1);
        newOrder.unshift(moved);
        setCities(newOrder);
        try { localStorage.setItem('navCitiesOrder', JSON.stringify(newOrder)); } catch (e) {}

        requestAnimationFrame(() => {
            Flip.from(state, {
                duration: 0.5,
                ease: 'power2.inOut'
            });
            // Assicura evidenza al primo elemento
            const newLis = container.querySelectorAll('li');
            newLis.forEach((el, i) => el.classList.toggle('focused', i === 0));
            gsap.to(container, { scrollLeft: 0, duration: 0.5, ease: 'power2.out' });
            gsap.delayedCall(0.55, () => router.push(city.href));
        });
    };
// helper: metti in focus il primo elemento desktop
    const highlightFirst = () => {
        const container = desktopCityListRef.current;
        if (!container) return;
        const lis = container.querySelectorAll('li');
        if (!lis.length) return;
        lis.forEach((el, i) => el.classList.toggle('focused', i === 0));
    };

// sostituisci il vecchio useEffect che gestiva il focus con questo
    useEffect(() => {
        if (!mounted) return; // assicurati che la lista sia in DOM
        highlightFirst();
    }, [mounted, cities]);

    // Città per il pannello mobile (esclude 'LSC' / '/Home')
    const mobileCities = cities.filter((c) => c.name !== 'LSC' && !/\/home$/i.test(c.href));

    return (
        <nav>
            <a href="/"  className="logo">
                <img src="/logo/PNG-lcs_logo_white_t.png" alt="Logo" className="logo-img" />
            </a>
            <div className={"vetro1"}>
                <ul className="list-città" ref={desktopCityListRef}>
                    {mounted && cities.map((city, idx) => (
                        <li key={city.href}>
                            <a href={city.href} onClick={(e) => handleCityClick(e, city, idx)}>{city.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={"vetro2"}>
                <ul className="cityLinks">
                    <li><a href="/Classifica">Classifica</a></li>
                    <li><a href="/Squadre" className="register-btn">Squadre</a></li>
                    <li><a href="/Partite" className="login-btn">Partite</a></li>
                    <li><a href="/Giocatori" className="login-btn">Giocatori</a></li>
                    <div className="triangle"></div>
                    <div className="stripes"></div>
                </ul>
            </div>
            <div className="hamburger-menu">
                <div id="menuToggle">
                    <input type="checkbox" id="menuCheckbox" checked={open} onChange={() => setOpen(!open)}/>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
            <div className={`menu${open ? ' open' : ''}`}>
                <div className="menu-content">
                    <ul className="menu-left" ref={mobileMenuListRef}>
                        <li><a href="/CompetizioneLSC">Competizione LSC</a></li>
                        <li><a href="/Competizione">Competizioni</a></li>
                        <li><a href="/Home">Chi siamo</a></li>
                    </ul>
                    <div className={`menu-right${leftFocusedIdx === 1 ? ' visible' : ''}`} ref={mobileCitiesPanelRef}>
                        <ul className="menu-right-list" ref={mobileCitiesListRef}>
                            {mobileCities.map((city) => (
                                <li key={city.href}>
                                    <a href={city.href} onClick={(e) => handleMobileCityClick(e, city)}>{city.name}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}
