import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
    return (
        <html lang="it">
        <body>
        <Nav />
            <main className="main">
                {children}
            </main>
        <Footer />
        </body>
        </html>
    );
}