import { notFound } from 'next/navigation';
import cities from '@/data/cities';
import AnimatedTitle from '@/components/AnimatedTitle';
import SchoolsScroller from '@/components/SchoolsScroller';
import MatchesSlider from '@/components/MatchesSlider';
import AnimatedSectionTitle from '@/components/AnimatedSectionTitle';
import Standings from '@/components/Standings';
import NewsSection from '@/components/NewsSection';
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

    const hasGroups = Array.isArray(data.groups) && data.groups.length > 0;
    const hasNews = Array.isArray(data.news) && data.news.length > 0;

    return (
        <div className="city-page">
            <div className="banner">
                <div className="banner-content">
                    <AnimatedTitle text={data.title} />
                </div>
            </div>
            <div className="city-info">
                {/*Scuole che partecipano alle competizioni di {data.title} scroll orizzontalmente per visualizzare le squadre con loghi*/}
                <SchoolsScroller schools={data.schools} />

                {/* Slider partite: data, loghi squadre, risultato */}
                <AnimatedSectionTitle className={"CityTitleInfo"}>Matches</AnimatedSectionTitle>
                <MatchesSlider matches={data.matches || []} />

                {/* Classifica gironi (max 4 squadre per girone) */}
                {hasGroups && (
                    <>
                        <AnimatedSectionTitle className={"CityTitleInfo"}>Classifica</AnimatedSectionTitle>
                        <Standings groups={data.groups} />
                    </>
                )}

                {/* Notizie */}
                {hasNews && (
                    <>
                        <AnimatedSectionTitle className={"CityTitleInfo"}>Notizie</AnimatedSectionTitle>
                        <p className="news-intro">Ultimi aggiornamenti, comunicati e curiosità dal torneo.</p>
                        <NewsSection news={data.news} />
                    </>
                )}
            </div>
        </div>
    );
}
