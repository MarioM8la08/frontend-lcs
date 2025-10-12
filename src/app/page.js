import HeroWithBackground  from "@/components/HeroWithBackground";
import SectionReveal from "@/components/SectionReveal";

export default function Page() {
    return (
        <div className={"main"}>
            <HeroWithBackground text="estudentsleague" />

            {/* Sezioni di esempio con animazione GSAP su scroll */}
            <SectionReveal title="Chi siamo" align="left">
                ESL è una società con l&#39;obbiettivo di creare un torneo di calcio innovativo e coinvolgente tra le scuole superiori di tutta Italia
            </SectionReveal>

            <SectionReveal title="Come funziona" align="right">
                Ogni città ha le proprie squadre, calendari e classifiche. Scorri le competizioni per scoprire match, risultati e protagonisti.
            </SectionReveal>

            <SectionReveal title="Partecipa" align="left">
                Sei una scuola o un partner interessato? Contattaci per unire la tua realtà alla lega e costruire insieme la prossima stagione.
            </SectionReveal>


        </div>
    );
}
