import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/Header.css';
import UsersAPI from '../api/UsersApi.js';
import logo from '../assets/images/logo.png';
import profileImage from '../assets/images/default.jpg';
import Cookies from 'js-cookie';
import { FaUser, FaCog, FaBuilding, FaSignOutAlt } from 'react-icons/fa';

const UserHeader = ({ toggleNav }) => {
  const navigate = useNavigate();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const tenant = Cookies.get('tenant');
  const profileMenuRef = useRef(null);

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

  const handleClickOutside = (event) => {
    if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
      setProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (profileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileMenuOpen]);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-button" onClick={toggleNav}>
          &#9776;
        </button>
        <Link to="/" className="logo-container">
          <img src={logo} alt="Pharos Support Logo" className="logo" />
        </Link>
        <span className="tenant-name">{tenant.toUpperCase()}</span>
      </div>
      <div className="header-middle">
        <input type="text" placeholder="Search..." className="search-bar" name="unique-search" autoComplete="off"/>
      </div>
      <div className="header-right">
        <img
          src={profileImage}
          alt="User Profile"
          className="profile-image"
          onClick={handleProfileClick}
        />
        {profileMenuOpen && (
          <div className="profile-menu" ref={profileMenuRef}>
            <Link to="/user/profile" onClick={handleProfileClick}>
              <FaUser /> Profile
            </Link>
            <Link to="/user/workplace" onClick={handleProfileClick}>
              <FaBuilding /> Workplace
            </Link>
            {/* <Link to="/user/settings" onClick={handleProfileClick}>
              <FaCog /> Settings
            </Link> */}
            <Link onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default UserHeader;