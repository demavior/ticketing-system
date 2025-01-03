import { Link } from 'react-router-dom';
import '../assets/styles/NavBar.css';

const NavBar = ({ isNavOpen }) => {
  return (
    <nav className={`nav-bar ${isNavOpen ? 'open' : 'closed'}`}>
      <ul>
        <li><Link to="/user">Home</Link></li>
        <li><Link to="/my-tickets">My Tickets</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/reporting">Reporting</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;