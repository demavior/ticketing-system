import { Link } from 'react-router-dom';
import '../assets/styles/NavBar.css';
import { FaHome, FaTicketAlt, FaChartBar, FaFileAlt, FaPlus } from 'react-icons/fa';

const NavBar = ({ isNavOpen }) => {
  return (
    <nav className={`nav-bar ${isNavOpen ? 'open' : 'collapsed'}`}>
      <ul>
        <li><Link to="/tickets/new"><FaPlus /> {isNavOpen && ' Create Ticket'}</Link></li>
        <li><Link to="/user"><FaHome /> {isNavOpen && 'Home'}</Link></li>
        <li><Link to="/tickets"><FaTicketAlt /> {isNavOpen && 'My Tickets'}</Link></li>
        <li><Link to="/dashboard"><FaChartBar /> {isNavOpen && 'Dashboard'}</Link></li>
        <li><Link to="/reporting"><FaFileAlt /> {isNavOpen && 'Reporting'}</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;