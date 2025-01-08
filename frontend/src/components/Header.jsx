import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../assets/images/logo.png';
import UserHeader from './UserHeader';
import NavBar from './NavBar';

function Header() {
  // Handle Header based on user page
  const location = useLocation().pathname;
  // Handle toggleNav
  const [isNavOpen, setIsNavOpen] = useState(true);
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  // If user is logged in and on a page other than home, contact, or login, show UserHeader
  const user = Cookies.get('username');
  if (user && !['/', '/login', '/contact'].includes(location)) {
    return <>
      <UserHeader toggleNav={toggleNav} />
      <NavBar isNavOpen={isNavOpen} />
    </>
  }
  return (
    <header className="header">
      <Link to="/" className="logo-container">
        <img src={logo} alt="Pharos Support Logo" className="logo" />
      </Link>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {user ? (
            <li><Link to="/user">User Page</Link></li>
          ):(
            <li><Link to="/login">Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;