import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Header.css';
import UsersAPI from '../api/UserApi.js';
import logo from '../assets/images/logo.png';
import Cookies from 'js-cookie';

const UserHeader = ({ toggleNav }) => {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const tenant = Cookies.get('tenant');

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    // Call the logout API
    const result = await UsersAPI.logout();
    // Redirect to login page if logout is successful
    if (result.success) {
      navigate('/login');
    } else {
      setError(result.message);
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleNav}>
          &#9776;
        </button>
        <img src={logo} alt="Pharos Support Logo" className="logo" />
        <span className="tenant-name">{tenant.toUpperCase()}</span>
      </div>
      <div className="header-middle">
        <input type="text" placeholder="Search..." className="search-bar" name="unique-search" autoComplete="off"/>
      </div>
      <div className="header-right">
        <button className="profile-button" onClick={handleProfileClick}>
          Profile
        </button>
        {profileMenuOpen && (
          <div className="profile-menu">
            <Link to="/user/profile" onClick={handleProfileClick}>Profile</Link>
            <Link to="/user/settings" onClick={handleProfileClick}>Settings</Link>
            <Link onClick={handleLogout}>Logout</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;