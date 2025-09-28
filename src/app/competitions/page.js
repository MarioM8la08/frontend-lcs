export const metadata = {
  title: 'Competitions',
};

export default function CompetitionsPage() {
  const cities = [
    'Brescia',
    'Roma',
    'Milano',
    'Napoli',
    'Torino',
    'Verona',
    'Genova',
    'Bologna',
    'Firenze',
    'Palermo',
    'Catania',
    'Venezia',
  ];

  return (
    <main style={{ padding: '2rem' }}>
      <h1>Competitions</h1>
      <p>Seleziona una città:</p>
      <ul style={{ lineHeight: 1.8 }}>
        {cities.map((name) => (
          <li key={name}>
            <a href={`/competitions/${name}`}>{name}</a>
          </li>
        ))}
      </ul>
    </main>
  );
}

