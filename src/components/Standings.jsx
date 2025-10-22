"use client";
import React, { useMemo, useState } from "react";

/**
 * Standings
 * Props:
 * - groups: Array<{ name: string, teams: Array<{ id:string, name:string, logo?:string, p?:number, w?:number, d?:number, l?:number, gf?:number, ga?:number, gd?:number, pts?:number }> }>
 */
export default function Standings({ groups = [] }) {
  if (!groups || groups.length === 0) return null;
  const [activeIndex, setActiveIndex] = useState(0);
  const safeIndex = Math.min(Math.max(activeIndex, 0), groups.length - 1);
  const activeGroup = groups[safeIndex] ?? groups[0];

  const rows = useMemo(() => {
    const list = (activeGroup?.teams ?? []).slice(0, 4);
    // Ordina per punti, poi differenza reti, poi gol fatti (fallback)
    return list
      .map((t) => ({
        p: 0,
        w: 0,
        d: 0,
        l: 0,
        gf: 0,
        ga: 0,
        gd: 0,
        pts: 0,
        ...t,
      }))
      .sort((a, b) => (b.pts ?? 0) - (a.pts ?? 0) || (b.gd ?? 0) - (a.gd ?? 0) || (b.gf ?? 0) - (a.gf ?? 0));
  }, [activeGroup]);

  return (
    <section className="city-page standings-section">
      <div className="standings-header-wrap">
        <div className="group-tabs" role="tablist" aria-label="Gironi">
          {groups.map((g, i) => (
            <button
              key={g.name || i}
              role="tab"
              aria-selected={i === safeIndex}
              className={`group-tab ${i === safeIndex ? "active" : ""}`}
              onClick={() => setActiveIndex(i)}
            >
              {g.name || `Girone ${i + 1}`}
            </button>
          ))}
        </div>
      </div>

      <div className="standings-card" role="table" aria-label={`Classifica ${activeGroup?.name ?? "girone"}`}>
        <div className="standings-row head" role="row">
          <div className="col pos" role="columnheader" aria-label="#">#</div>
          <div className="col team" role="columnheader">Squadra</div>
          <div className="col p" role="columnheader" title="Partite">P</div>
          <div className="col w" role="columnheader" title="Vinte">V</div>
          <div className="col d" role="columnheader" title="Pareggi">N</div>
          <div className="col l" role="columnheader" title="Perse">P</div>
          <div className="col gf" role="columnheader" title="Gol fatti">GF</div>
          <div className="col ga" role="columnheader" title="Gol subiti">GS</div>
          <div className="col gd" role="columnheader" title="Differenza reti">DR</div>
          <div className="col pts" role="columnheader" title="Punti">Pt</div>
        </div>

        {rows.map((t, idx) => (
          <div
            key={t.id || t.name || idx}
            className={`standings-row body ${idx < 2 ? "top" : ""}`}
            role="row"
          >
            <div className="col pos" role="cell">
              <span className={`badge ${idx === 0 ? "gold" : idx === 1 ? "silver" : ""}`}>{idx + 1}</span>
            </div>

            <div className="col team" role="cell">
              <div className="team-info">
                <div className="logo">
                  {t.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={t.logo} alt="logo squadra" />
                  ) : (
                    <div className="placeholder" aria-hidden="true" />
                  )}
                </div>
                <div className="name" title={t.name}>{t.name}</div>
              </div>
            </div>

            <div className="col p" role="cell">{t.p ?? 0}</div>
            <div className="col w" role="cell">{t.w ?? 0}</div>
            <div className="col d" role="cell">{t.d ?? 0}</div>
            <div className="col l" role="cell">{t.l ?? 0}</div>
            <div className="col gf" role="cell">{t.gf ?? 0}</div>
            <div className="col ga" role="cell">{t.ga ?? 0}</div>
            <div className="col gd" role="cell">{t.gd ?? ((t.gf ?? 0) - (t.ga ?? 0))}</div>
            <div className="col pts" role="cell">{t.pts ?? 0}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

