import React, { useState } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import '../assets/styles/User.css';

function UserHome() {
  const [isNavOpen, setIsNavOpen] = useState(true);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="user-home-container">
      {/* <Header toggleNav={toggleNav} /> */}
      {/* <NavBar isNavOpen={isNavOpen} /> */}
      <div className={`main-content ${isNavOpen ? 'nav-open' : 'nav-closed'}`}>
        <h1>Welcome, User</h1>
        <p>Here is a summary of your tickets and dashboard.</p>
        {/* Placeholder for ticket summary and dashboard widgets */}
      </div>
    </div>
  );
};

export default UserHome;