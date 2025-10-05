// src/components/SchoolsScroller.jsx
'use client';
import Image from 'next/image';

export default function SchoolsScroller({ schools = [] }) {
    if (!schools.length) return null;
    return (
        <section className="schools-section">
            <div className="schools-scroller">
                {schools.map(s => (
                    <div key={s.id} className="school-card">
                        <div className="logo-wrap">
                            {s.logo && (
                                <Image
                                    src={s.logo}
                                    alt={s.name}
                                    fill
                                    sizes="120px"
                                    style={{ objectFit: 'contain' }}
                                />
                            )}
                        </div>
                        <div className="school-name">{s.name}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
