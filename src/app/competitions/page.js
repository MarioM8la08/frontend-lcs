import Link from 'next/link';
import cities from '@/data/cities';

export default function CompetitionsIndex() {
    return (
        <main>
            <h1>Competitions</h1>
            <ul>
                {Object.keys(cities).map(c => (
                    <li key={c}>
                        <Link href={`/competitions/${c}`}>{cities[c].title}</Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}
