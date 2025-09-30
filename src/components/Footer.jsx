import './Styles/Footer.css';
export default function Footer() {
    return (
        <footer className="footer">
            <div className="container">
                <p>© {new Date().getFullYear()} Nome Azienda. Tutti i diritti riservati.</p>
            </div>
        </footer>
    );
}