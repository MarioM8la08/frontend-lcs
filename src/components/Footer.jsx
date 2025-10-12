import './Styles/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
export default function Footer() {
    return (
        <footer>
            <div className="logo-wrap">
                <img className="logo" src="/logo/PNG-lcs_logo_white_t.png"/>
                <h4>ESL</h4>
            </div>
            <div className="socials">
                <a className="fa-brands fa-facebook"></a>
                <a className="fa-brands fa-x-twitter"></a>
                <a className="fa-brands fa-discord"></a>
                <a className="fa-brands fa-linkedin"></a>
            </div>
            <div className="links">
                <ul>
                    <li>
                        <h2>About</h2>
                    </li>
                    <li>
                        <a>Mission</a>
                    </li>
                    <li>
                        <a>Customers</a>
                    </li>
                    <li>
                        <a>Careers</a>
                    </li>
                    <li>
                        <a>Members</a>
                    </li>
                    <li>
                        <a>Contact</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h2>Explore</h2>
                    </li>
                    <li>
                        <a>Solutions</a>
                    </li>
                    <li>
                        <a>Partners</a>
                    </li>
                    <li>
                        <a>Reports</a>
                    </li>
                    <li>
                        <a>Research</a>
                    </li>
                    <li>
                        <a>Docs</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h2>Legal</h2>
                    </li>
                    <li>
                        <a>Terms</a>
                    </li>
                    <li>
                        <a>Privacy</a>
                    </li>
                    <li>
                        <a>Data</a>
                    </li>
                    <li>
                        <a>Brand</a>
                    </li>
                </ul>
                <ul>
                    <li>
                        <h2>ESL</h2>
                    </li>
                    <li>
                        <address>
                            Via Don Giovanni Minzoni 14 <br/>
                            10121 <br/>
                            Torino, Italy
                        </address>
                    </li>
                </ul>
            </div>
        </footer>
    );
}