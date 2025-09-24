const style = {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    // #141a20 con trasparenza per effetto vetro
    background: 'rgba(20, 26, 32, 0.55)',
    backdropFilter: 'blur(14px) saturate(160%)',
    WebkitBackdropFilter: 'blur(14px) saturate(160%)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: '0 6px 24px rgba(0, 0, 0, 0.08)',
};

export default function Nav() {
    return (
        <nav style={style}>
            <div className="">
                <a href="/"  className="logo">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo/PNG-lcs_logo_white_t.png" alt="Logo" className="logo-img" />
                </a>
            </div>
        </nav>
    );
}
