import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/styles/App.css';
import Cookies from 'js-cookie';
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import Contact from './pages/Contact';
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import UserProfile from './pages/UserProfile';
import UserWorkplace from './pages/UserWorkplace';
import Tickets from './pages/Tickets';
import TicketsNew from './pages/TicketsNew';
import TicketDetails from './pages/TicketDetails';
import NotFound from './pages/NotFound';

function getUserCookie() {
  const user = Cookies.get('username');
  return user;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserHome />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/user/workplace" element={<UserWorkplace />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/tickets/new" element={<TicketsNew />} />
        <Route path="/tickets/:ticketId" element={<TicketDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App