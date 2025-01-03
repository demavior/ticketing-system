import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

function Header() {
return (
    <header className="header">
        <div className="logo-container">
        <img src={logo} alt="Pharos Support Logo" className="logo" />
        </div>
        <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
        </nav>
    </header>
    );
};

export default Header;