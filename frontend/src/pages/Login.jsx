import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Login.css';
import UserAPI from '../api/UserApi.js';

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [tenants, setTenants] = useState([]);
  const [tenant, setTenant] = useState('');
  const [error, setError] = useState('');
  const [tenantSelectionVisible, setTenantSelectionVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call the login API
    const data = { username, password, tenant_id: tenant };
    const result = await UserAPI.login(data);
    // Redirect to user page if login is successful
    if (result.success) {
      navigate('/user');
    } else if (result.message === 'tenants') {
      setTenants(result.tenants);
      setTenantSelectionVisible(true);
      setError('');
    } else {
      setError(result.message);
    }
  };

  const handleTenantSelection = (e) => {
    if (tenant) {
      handleSubmit(e)
    }
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
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
      {tenantSelectionVisible && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Select Tenant</h3>
            <select
              id="tenant"
              value={tenant}
              onChange={(e) => setTenant(e.target.value)}
              required
            >
              <option value="">Select Tenant</option>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => {setTenantSelectionVisible(false)
                setTenant()}}>Cancel</button>
              <button onClick={handleTenantSelection}>Continue</button>
            </div>
          </div>
        </div>
    )}
    </div>
  );
};

export default Login;