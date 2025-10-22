const cities = {
    torino: {
        title: 'Mole cup',
        schools: [
            { id: 'liceo-leonardo-1', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-1', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-2', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-2', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-3', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-3', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-4', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-4', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-5', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-5', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'liceo-leonardo-6', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
            { id: 'itis-a-6', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
        ],
        matches: [
            {
                id: 'm1',
                date: '2025-10-12T15:00:00+02:00',
                stage: 'Girone A',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '2 - 1',
                status: 'FT'
            },
            {
                id: 'm2',
                date: '2025-10-18T17:30:00+02:00',
                stage: 'Girone A',
                home: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '-',
                status: 'In programma'
            },
            {
                id: 'm3',
                date: '2025-11-02T16:00:00+01:00',
                stage: 'Quarti',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 1',
                status: 'FT'
            },
            {
                id: 'm4',
                date: '2025-11-02T16:00:00+01:00',
                stage: 'Quarti',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 1',
                status: 'FT'
            },
            {
                id: 'm5',
                date: '2025-11-02T16:00:00+01:00',
                stage: 'Quarti',
                home: { name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png' },
                away: { name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png' },
                score: '1 - 1',
                status: 'FT'
            }
        ],
        groups: [
            {
                name: 'Girone A',
                teams: [
                    { id: 'leonardo', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, gd: 2, pts: 6 },
                    { id: 'itis-a', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, gd: 2, pts: 6 },
                    { id: 'liceo-b', name: 'Liceo B.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, gd: -2, pts: 3 },
                    { id: 'itis-c', name: 'ITIS C.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 3, gd: -2, pts: 1 },
                ]
            },             {
                name: 'Girone B',
                teams: [
                    { id: 'leonardo', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, gd: 2, pts: 6 },
                    { id: 'itis-a', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, gd: 2, pts: 8 },
                    { id: 'liceo-b', name: 'Liceo B.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, gd: -2, pts: 3 },
                    { id: 'itis-c', name: 'ITIS C.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 3, gd: -2, pts: 1 },
                ]
            },
            {
                name: 'Girone C',
                teams: [
                    { id: 'leonardo', name: 'Liceo Leonardo', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, gd: 2, pts: 6 },
                    { id: 'itis-a', name: 'ITIS A.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, gd: 2, pts: 6 },
                    { id: 'liceo-b', name: 'Liceo B.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 1, d: 0, l: 2, gf: 2, ga: 4, gd: -2, pts: 3 },
                    { id: 'itis-c', name: 'ITIS C.', logo: '/logo/PNG-lcs_logo_white_t.png', p: 3, w: 0, d: 1, l: 2, gf: 1, ga: 3, gd: -2, pts: 9 },
                ]
            }
        ],
        news: [
            {
                id: 'n1',
                title: 'Inizia la Mole Cup: calendario e formato',
                excerpt: 'Al via il torneo scolastico con gironi da quattro squadre e fasi finali a eliminazione diretta. Scopri date e regolamento.',
                date: '2025-09-20'
            },
            {
                id: 'n2',
                title: 'Highlights prima giornata',
                excerpt: 'Partenza sprint per Liceo Leonardo: vittoria di misura e tante occasioni da gol. Tutti i risultati e le classifiche aggiornate.',
                date: '2025-10-12'
            },
            {
                id: 'n3',
                title: 'Fair Play Award',
                excerpt: 'Riconoscimento speciale a ITIS A. per il comportamento esemplare in campo e sugli spalti durante la seconda giornata.',
                date: '2025-10-18'
            }
        ]
    },
};
export default cities;
