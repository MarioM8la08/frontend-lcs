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
                        <p>Lega Calcio Studenti (LCS) è una lega studentesca nata con l&#39;obiettivo di valorizzare lo sport nel contesto scolastico, incentivando i licei a supportare i propri atleti e proponendo ai partecipanti nuove opportunità accademiche e didattiche.</p>
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
            <SectionReveal title="Come funziona" align="Center">
                <ul className={"timeline"}>
                   <li>
                       <div className={"desc"}>
                           <h4>Fase a gironi</h4>
                           <p>Le squadre si affrontano in tre gironi da quattro squadre</p>
                       </div>
                       <div className={"imgCircle"}>
                           <div className={"circle"}><i className="fa-solid fa-futbol"></i></div>
                       </div>
                       <div className={"desc"}></div>
                   </li>
                    <li className={"linea"}>
                    </li>
                    <li>
                        <div className={"desc"}>
                        </div>
                        <div className={"imgCircle"}>
                            <div className={"circle"}><i className="fa-solid fa-futbol"></i></div>
                        </div>
                        <div className={"desc desc-right"}>
                            <h4>Eliminazione diretta</h4>
                            <p>Le 12 migliori squadre procedono alla fase ad eliminazione diretta</p>
                        </div>
                    </li>
                    <li className={"linea"}></li>
                    <li>
                        <div className={"desc"}>
                            <h4>Finale nazionale</h4>
                            <p>Stay tuned</p>
                        </div>
                        <div className={"imgCircle"}>
                            <div className={"circle"}><i className="fa-solid fa-futbol"></i></div>
                        </div>
                        <div className={"desc"}></div>
                    </li>
                </ul>

            </SectionReveal>

        </div>
    );
}
