import HeroWithBackground  from "@/components/HeroWithBackground";
import SectionReveal from "@/components/SectionReveal";
import img from "@/../public/HomeFoto/DSCF6614-Migliorato-NR.webp";
import Image from "next/image";
import Link from "next/link";
export default function Page() {
    return (
        <div className={"homeESL"}>
            <HeroWithBackground text="estudentsleague" />

            {/* Sezioni di esempio con animazione GSAP su scroll */}
            <SectionReveal title="" align="right">
                <div className={"div-content"}>
                    <div className={"div-content-text"}>
                        <h2>Chi siamo</h2>
                        <p>Mole Cup è una società con l&#39;obbiettivo di creare un torneo di calcio innovativo e coinvolgente tra le scuole superiori di tutta Italia</p>
                        <Link href="/competitions" className="btn-cta">Scopri di più</Link>
                    </div>
                    <figure className="div-image">
                        <Image
                            src={img}
                            alt="Mole Cup"
                            fill
                            priority
                            sizes="(max-width: 900px) 100vw, 520px"
                            style={{ objectFit: "cover" }}
                        />
                    </figure>
                </div>
            </SectionReveal>
            <SectionReveal title="" align="left">
                <div className={"div-content"}>
                    <figure className="div-image">
                        <Image
                            src={img}
                            alt="Mole Cup"
                            fill
                            priority
                            sizes="(max-width: 900px) 100vw, 520px"
                            style={{ objectFit: "cover" }}
                        />
                    </figure>
                    <div className={"div-content-text"}>
                        <h2>Chi siamo</h2>
                        <p>Mole Cup è una società con l&#39;obbiettivo di creare un torneo di calcio innovativo e coinvolgente tra le scuole superiori di tutta Italia</p>
                        <Link href="/competitions" className="btn-cta">Scopri di più</Link>
                    </div>
                </div>
            </SectionReveal>
        </div>
    );
}
