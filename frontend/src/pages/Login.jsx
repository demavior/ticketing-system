import React, { useState } from 'react';
import '../assets/styles/Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [organization, setOrganization] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle login logic here
      console.log({ username, password, organization });
    };
  
    return (
      <div className="login-container">
        <h2>Login to Pharos Support</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
  
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
  
          <label htmlFor="organization">Organization</label>
          <select
            id="organization"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            required
          >
            <option value="">Select your organization</option>
            <option value="org1">Organization 1</option>
            <option value="org2">Organization 2</option>
            <option value="org3">Organization 3</option>
          </select>
  
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    );
  };
  
  export default Login;