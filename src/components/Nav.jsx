import './Styles/Nav.css';


const vetro1 = {
    // #141a20 con trasparenza per effetto vetro
    background: 'var(--glassmorphism-bg)',
    backdropFilter: 'blur(14px) saturate(160%)',
    WebkitBackdropFilter: 'blur(14px) saturate(160%)',
};

const vetro2 = {
    // #141a20 con trasparenza per effetto vetro
    background: 'rgba(20, 26, 32, 0.6)',
    backdropFilter: 'blur(14px) saturate(160%)',
    WebkitBackdropFilter: 'blur(14px) saturate(160%)', boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
};

export default function Nav() {
    return (
        <nav>
            <a href="/"  className="logo">
                <img src="/logo/PNG-lcs_logo_white_t.png" alt="Logo" className="logo-img" />
            </a>
            <div className={"vetro1"}>
                <ul className="list-città">
                    <li><a href="/Brescia">Brescia</a></li>
                    <li><a href="/Roma">Roma</a></li>
                    <li><a href="/Milano">Milano</a></li>
                    <li><a href="/Napoli">Napoli</a></li>
                    <li><a href="/Torino">Torino</a></li>
                    <li><a href="/Verona">Verona</a></li>
                    <li><a href="/Genova">Genova</a></li>
                    <li><a href="/Bologna">Bologna</a></li>
                    <li><a href="/Firenze">Firenze</a></li>
                    <li><a href="/Palermo">Palermo</a></li>
                    <li><a href="/Catania">Catania</a></li>
                    <li><a href="/Venezia">Venezia</a></li>
                </ul>
            </div>
            <div className={"vetro2"}>
                <ul className="cityLinks">
                    <li><a href="/Classifica">Classifica</a></li>
                    <li><a href="/Squadre" className="register-btn">Squadre</a></li>
                    <li><a href="/Partite" className="login-btn">Partite</a></li>
                    <li><a href="/Giocatori" className="login-btn">Giocatori</a></li>
                    <div className="triangle"></div>
                    <div className="stripes"></div>
                </ul>
            </div>
            <div className="hamburger-menu">
                <div id="menuToggle">
                    <input type="checkbox" id="menuCheckbox" />
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <div className="menu">
                    <ul>
                        <li><a href="/Classifica">Classifica</a></li>
                        <li><a href="/Squadre" className="register-btn">Squadre</a></li>
                        <li><a href="/Partite" className="login-btn">Partite</a></li>
                        <li><a href="/Giocatori" className="login-btn">Giocatori</a></li>
                        <li><hr /></li>
                        <li><a href="/Brescia">Brescia</a></li>
                        <li><a href="/Roma">Roma</a></li>
                        <li><a href="/Milano">Milano</a></li>
                        <li><a href="/Napoli">Napoli</a></li>
                        <li><a href="/Torino">Torino</a></li>
                        <li><a href="/Verona">Verona</a></li>
                        <li><a href="/Genova">Genova</a></li>
                        <li><a href="/Bologna">Bologna</a></li>
                        <li><a href="/Firenze">Firenze</a></li>
                        <li><a href="/Palermo">Palermo</a></li>
                        <li><a href="/Catania">Catania</a></li>
                        <li><a href="/Venezia">Venezia</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
