import React from "react";

function formatDate(dateStr) {
  try {
    const d = new Date(dateStr);
    return new Intl.DateTimeFormat("it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(d);
  } catch (e) {
    return dateStr;
  }
}

/**
 * NewsSection
 * Props: news: Array<{ id: string, title: string, excerpt: string, date?: string }>
 */
export default function NewsSection({ news = [] }) {
  if (!Array.isArray(news) || news.length === 0) return null;

  return (
    <section className="city-page news-section" aria-label="Notizie">
      <div className="news-grid">
        {news.map((n, idx) => (
          <article key={n.id || idx} className="news-card">
            <header className="news-header">
              {n.date && <div className="news-meta">{formatDate(n.date)}</div>}
              <h3 className="news-title">{n.title}</h3>
            </header>
            {n.excerpt && <p className="news-excerpt">{n.excerpt}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}

