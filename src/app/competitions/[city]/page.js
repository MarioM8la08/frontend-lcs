import { notFound } from 'next/navigation';
import cities from '@/data/cities';
import AnimatedTitle from '@/components/AnimatedTitle';
import SchoolsScroller from '@/components/SchoolsScroller';
import "./city.css";

export function generateStaticParams() {
    return Object.keys(cities).map(city => ({ city }));
}

export async function generateMetadata({ params }) {
    const { city } = await params;
    const key = city.toLowerCase();
    const data = cities[key];
    return { title: data ? data.title : 'Competitions' };
}

export default async function CityPage({ params }) {
    const { city } = await params;
    const key = city.toLowerCase();
    const data = cities[key];
    if (!data) notFound();

    return (
        <div className="city-page">
            <div className="banner">
                <div className="banner-content">
                    <AnimatedTitle text={data.title} />
                </div>
            </div>
            {/*Scuole che partecipano alle competizioni di {data.title} scroll orizzontalmente per visualizzare le squadre con loghi*/}
            <SchoolsScroller schools={data.schools} />
        </div>
    );
}
