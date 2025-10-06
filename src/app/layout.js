import './globals.css';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { Audiowide } from 'next/font/google';

const audiowide = Audiowide({
    weight: '400',
    subsets: ['latin'],
    display: 'swap',
});

export default function RootLayout({ children }) {
    return (
        <html lang="it" className={audiowide.className}>
        <head>
            <title>estudentsleague</title>
            <meta name="description" content="estudentsleague"/>
            <link rel="icon" href="/favicon.ico"/>
            {/* Google Fonts gestiti da next/font/google */}
        </head>
        <body>
        <Nav/>
        <main className="main">
            {children}
        </main>
        <Footer/>
        </body>
        </html>
    );
}