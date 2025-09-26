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
                    <li><a href="/Brescia">Torino</a></li>
                    <li><a href="/Brescia">Milano</a></li>
                    <li><a href="/Brescia">Imola</a></li>
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
        </nav>
    );
}
