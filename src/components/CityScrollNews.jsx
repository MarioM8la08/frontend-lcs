'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

/**
 * CityScrollNews
 * Props:
 * - items: [{ id, title, excerpt?, date: 'YYYY-MM-DD', image? }]
 * - durationMs?: number (default 5000)
 * - fallbackImage?: string (default '/HomeFoto/19.jpg')
 */
export default function CityScrollNews({ items = [], durationMs = 5000, fallbackImage = '/HomeFoto/19.jpg' }) {
  // Normalizza e ordina per data decrescente
  const news = useMemo(() => {
    if (!Array.isArray(items)) return [];
    return [...items]
      .filter(n => n && n.title && n.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [items]);

  const [index, setIndex] = useState(0);

  // Se 0 o 1 elementi, non avviare il timer
  useEffect(() => {
    if (news.length <= 1) return;
    const id = setInterval(() => {
      setIndex(prev => (prev + 1) % news.length);
    }, durationMs);
    return () => clearInterval(id);
  }, [news.length, durationMs]);

  if (!news.length) return null;
  const current = news[index];
  const imgSrc = current?.image || fallbackImage;
  const dateFormatted = current?.date
    ? new Date(current.date).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
    : '';

  return (
    <section className="scroll-news" aria-label="Notizie">
      <div className="scroll-news__card">
        <div className="scroll-news__image-wrap">
          <Image
            key={current.id}
            src={imgSrc}
            alt={current.title}
            fill
            priority
            sizes="(max-width: 600px) 100vw, (max-width: 1024px) 90vw, 1000px"
            className="scroll-news__image"
          />
          <div className="scroll-news__gradient" />
          <div className="scroll-news__caption">
            <span className="scroll-news__label">{index === 0 ? 'Ultima notizia' : 'Altre notizie'}</span>
            <h3 className="scroll-news__title">{current.title}</h3>
            {dateFormatted && (
              <time className="scroll-news__date" dateTime={current.date}>{dateFormatted}</time>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

