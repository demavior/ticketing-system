import React, { useState } from 'react';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import Cookies from 'js-cookie';
import '../assets/styles/User.css';

function UserHome() {
  const username = Cookies.get('username');

  return (
      <div className='main-content'>
        <h1>{`Welcome, ${username}`}</h1>
        <p>Here is a summary of your tickets and dashboard.</p>
        {/* Placeholder for ticket summary and dashboard widgets */}
      </div>
  );
};

export default UserHome;