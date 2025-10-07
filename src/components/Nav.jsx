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
    const defaultCities = [
        { name: 'LSC', href: '/' },
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
        { name: 'Venezia', href: '/competitions/Venezia' }
    ];

    const [cities, setCities] = useState(defaultCities);

    const mobileMenuListRef = useRef(null); // lista sinistra mobile (orizzontale)
    const mobileCitiesPanelRef = useRef(null); // contenitore (solo fade)
    const mobileCitiesListRef = useRef(null); // lista destra scrollabile
    const desktopCityListRef = useRef(null); // lista desktop

    const updateFocus = (container, axis = 'y') => {
        if (!container) return -1;
        const items = Array.from(container.querySelectorAll('li'));
        if (!items.length) return -1;

        // Se siamo a inizio scroll orizzontale: focus forzato sul primo (richiesta: "partire dal primo a sinistra")
        if (axis === 'x' && container.scrollLeft === 0) {
            items.forEach((el,i)=>{
                const isFirst = i===0;
                gsap.to(el,{ scale: isFirst ? 1.15 : 0.9, opacity: isFirst ? 1 : 0.5, duration:0.25, ease:'power2.out', overwrite:'auto'});
                el.classList.toggle('focused', isFirst);
            });
            return 0;
        }

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
            gsap.to(el, {
                scale: isFocused ? 1.15 : 0.9,
                opacity: isFocused ? 1 : 0.5,
                duration: 0.25,
                ease: 'power2.out',
                overwrite: 'auto',
            });
            el.classList.toggle('focused', isFocused);
        });
        return closestIndex;
    };

    const attachFocusHandlers = (container, axis = 'y') => {
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
        container.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        updateFocus(container, axis);
        return () => {
            container.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onResize);
        };
    };

    // Forza scroll iniziale a sinistra e collega handlers quando si apre il menu
    useEffect(() => {
        if (!open) return;
        const left = mobileMenuListRef.current;
        const right = mobileCitiesListRef.current;
        // Rimuovi padding dinamico (se impostato in versioni precedenti) e imposta padding fisso
        [left, right].forEach(list => { if (list){ list.style.paddingLeft='12px'; list.style.paddingRight='12px'; }});
        if (left) left.scrollLeft = 0;
        if (right) right.scrollLeft = 0;
        const cleanLeft = attachFocusHandlers(left, 'x');
        const cleanRight = attachFocusHandlers(right, 'x');
        [left, right].forEach(list => {
            if (!list) return;
            const lis = list.querySelectorAll('li');
            lis.forEach((li,i)=> li.classList.toggle('focused', i===0));
        });
        return () => { cleanLeft(); cleanRight(); };
    }, [open]);

    // fade pannello destro
    useEffect(() => {
        const panel = mobileCitiesPanelRef.current; if (!panel) return;
        gsap.to(panel, { autoAlpha: open ? 1 : 0, duration: open ? 0.3 : 0.2, ease: open ? 'power2.out' : 'power2.in' });
    }, [open]);

    useEffect(() => { gsap.registerPlugin(Flip); }, []);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        const original = document.body.style.overflow;
        document.body.style.overflow = open ? 'hidden' : (original || '');
        return () => { document.body.style.overflow = original || ''; };
    }, [open]);

    useEffect(() => { setMounted(true); }, []);

    // reorder dopo mount
    useEffect(() => {
        if (typeof window === 'undefined') return;
        let baseOrder = [...defaultCities];
        try {
            const raw = localStorage.getItem('navCitiesOrder');
            if (raw){
                const saved = JSON.parse(raw);
                if (Array.isArray(saved) && saved.length){
                    const hrefOrder = saved.map(c=>c.href);
                    baseOrder = [
                        ...hrefOrder.map(h=> defaultCities.find(c=>c.href===h)).filter(Boolean),
                        ...defaultCities.filter(c=> !hrefOrder.includes(c.href))
                    ];
                }
            }
        } catch {}
        const path = window.location.pathname || '';
        let currentCitySlug='';
        if (/^\/competitions\//i.test(path)) currentCitySlug = decodeURIComponent(path.split('/')[2]||'').toLowerCase();
        else currentCitySlug = decodeURIComponent(path.replace(/^\//,'')).toLowerCase();
        if (currentCitySlug){
            const idx = baseOrder.findIndex(c=>{
                const hrefSlug = c.href.replace(/^\/competitions\//i,'').replace(/^\//,'').toLowerCase();
                const nameSlug = c.name.toLowerCase();
                return hrefSlug===currentCitySlug || nameSlug===currentCitySlug;
            });
            if (idx>0){ const arr=[...baseOrder]; const [item]=arr.splice(idx,1); arr.unshift(item); baseOrder=arr; }
        }
        const changed = baseOrder.length!==cities.length || baseOrder.some((c,i)=>c.href!==cities[i]?.href);
        if (changed) setCities(baseOrder);
    }, []);

    // focus primo desktop
    useEffect(() => {
        const container = desktopCityListRef.current; if (!container) return;
        container.querySelectorAll('li').forEach((el,i)=> el.classList.toggle('focused', i===0));
    }, [cities]);

    const handleMobileCityClick = (e, city) => {
        e.preventDefault(); setOpen(false); router.push(city.href);
    };

    const handleCityClick = (e, city, index) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
        e.preventDefault();
        const container = desktopCityListRef.current;
        if (!container){ router.push(city.href); return; }
        if (index===0){ router.push(city.href); return; }
        const items = container.querySelectorAll('li');
        const state = Flip.getState(items);
        const newOrder=[...cities]; const [moved]=newOrder.splice(index,1); newOrder.unshift(moved); setCities(newOrder);
        try { localStorage.setItem('navCitiesOrder', JSON.stringify(newOrder)); } catch {}
        requestAnimationFrame(()=>{
            Flip.from(state,{ duration:0.5, ease:'power2.inOut'});
            container.querySelectorAll('li').forEach((el,i)=> el.classList.toggle('focused', i===0));
            gsap.to(container,{ scrollLeft:0, duration:0.5, ease:'power2.out'});
            gsap.delayedCall(0.55, ()=> router.push(city.href));
        });
    };

    const highlightFirst = () => {
        const container = desktopCityListRef.current; if (!container) return;
        const lis = container.querySelectorAll('li'); if(!lis.length) return;
        lis.forEach((el,i)=> el.classList.toggle('focused', i===0));
    };
    useEffect(()=>{ if (mounted) highlightFirst(); }, [mounted, cities]);

    const mobileCities = cities.filter(c => c.name !== 'LSC' && !/\/home$/i.test(c.href));

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
                    <span></span><span></span><span></span>
                </div>
            </div>
            <div className={`menu${open ? ' open' : ''}`}>
                <div className="menu-content">
                    <ul className="menu-left" ref={mobileMenuListRef}>
                        <li><a href="/CompetizioneLSC">Competizione LSC</a></li>
                        <li><a href="/Competizione">Competizioni</a></li>
                        <li><a href="/Home">Chi siamo</a></li>
                    </ul>
                    <div className={`menu-right visible`} ref={mobileCitiesPanelRef}>
                        <ul className="menu-right-list" ref={mobileCitiesListRef}>
                            {mobileCities.map(city => (
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
