import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/styles/UserHeader.css';
import logo from '../assets/images/logo.png';

const UserHeader = ({ toggleNav }) => {
    const navigate = useNavigate();
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);

    const handleProfileClick = () => {
        setProfileMenuOpen(!profileMenuOpen);
    };

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <header className="header">
            <div className="header-left">
                <button className="menu-button" onClick={toggleNav}>
                    &#9776;
                </button>
                <img src={logo} alt="Pharos Support Logo" className="logo" />
            </div>
            <div className="header-middle">
                <input type="text" placeholder="Search..." className="search-bar" />
            </div>
            <div className="header-right">
                <button className="profile-button" onClick={handleProfileClick}>
                    Profile
                </button>
                {profileMenuOpen && (
                    <div className="profile-menu">
                        <Link to="/profile">Profile</Link>
                        <Link to="/settings">Settings</Link>
                        <Link to="/login">Logout</Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default UserHeader;