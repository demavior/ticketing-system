import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import TenantAPI from '../api/TenantsApi.js';
import '../assets/styles/UserWorkplace.css';

function UserWorkplace() {
  const [workplace, setWorkplace] = useState({name:"", full_name:"", address:"", phone_number:"", email:""});
  const [tenants, setTenants] = useState([]);
  const [error, setError] = useState('');
  const [selectWorkplaceVisible, setSelectWorkplaceVisible] = useState(false);

  const role = Cookies.get('role');

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const tenant = await TenantAPI.getCurrentTenant();
        setWorkplace(tenant);
        const tenantList = await TenantAPI.getTenants();
        setTenants(tenantList);
      } catch (err) {
        setError('Failed to fetch workplace data.');
      }
    };
    fetchTenant();
  }, []);

  const handleTenantChange = async (e) => {
    const newTenant = e.target.value;
    // UserAPI.setTenantCookie(newTenant);
    // Optionally, you can add a redirect or refresh logic here
  };

  return (
    <div className="main-container">
      <div className="form-container">
        <h2>Workplace</h2>
        {tenants.length > 1 && false && (
          <div>
            <button onClick={() => setSelectWorkplaceVisible(true)}>Switch Workplace</button>
            {selectWorkplaceVisible && (
              <div className="modal-backdrop">
                <div className="modal">
                <h3>Switch Workplace</h3>
                <select value={workplace.name} onChange={handleTenantChange}>
                  {tenants.map((tenant) => (
                    <option key={tenant.id} value={tenant.id}>
                      {tenant.name}
                    </option>
                  ))}
                </select>
                <div>
                  <button className="cancel-button" onClick={() => setSelectWorkplaceVisible(false)}>Cancel</button>
                  <button onClick={() => setSelectWorkplaceVisible(false)}>Switch</button>
                </div>
                </div>
              </div>
            )}
          </div>
        )}
        {error && <p className="error-message">{error}</p>}
        <div>
          <h3>Current Workplace</h3>
          <input value={workplace.name} disabled/>
          <label>Full Name:</label>
          <input value={workplace.full_name} disabled/>
          <label>Address:</label>
          <input value={workplace.address} disabled/>
          <label>Phone Number:</label>
          <input value={workplace.phone_number} disabled/>
          <label>Email:</label>
          <input value={workplace.email} disabled/>
        </div>
        {role === 'supervisor' && false && (
          <div className="create-user">
            <h3>Users</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserWorkplace;