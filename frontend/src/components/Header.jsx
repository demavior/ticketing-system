import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import UserHeader from './UserHeader';
import NavBar from './NavBar';

function Header() {
  // Handle Header based on user page
  const location = useLocation().pathname;
  console.log(location);
  const user = ['/', '/login', '/contact',].includes(location) ? false : true;
  // Handle toggleNav
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  // Return Header based on page
  if (user) {
    return <div>
      <UserHeader toggleNav={toggleNav} />
      <NavBar isNavOpen={isNavOpen} />
    </div>
  }
  else {
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
}

export default Header;