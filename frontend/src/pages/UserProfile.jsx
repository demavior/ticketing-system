import { useState, useEffect } from 'react';
import UsersAPI from '../api/UsersApi.js';

function UserProfile() {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [changePasswordVisible, setChangePasswordVisible] = useState(false);
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '' });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await UsersAPI.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSave = async () => {
    try {
      await UsersAPI.updateCurrentUser(user);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChangeButton = () => {
    setPasswords({ currentPassword: '', newPassword: '' });
    setChangePasswordVisible(true);
  };

  const handleCancelPassword = async (e) => {
    e.preventDefault();
    setPasswords({ currentPassword: '', newPassword: '' });
    setChangePasswordVisible(false);
  };

  const handleChangePassword = async (e) => {
    try {
      e.preventDefault();
      await UsersAPI.changePassword(passwords);
      setPasswords({ currentPassword: '', newPassword: '' });
      setChangePasswordVisible(false);
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div className="main-content">
      <div className="form-container">
        <h2>User Profile</h2>
        <div className="user-info">
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={user.username || ''}
              onChange={handleInputChange}
              disabled={true}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={user.email || ''}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </label>
          <label>
            First Name:
            <input
              type="text"
              name="first_name"
              value={user.first_name || ''}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="last_name"
              value={user.last_name || ''}
              onChange={handleInputChange}
              disabled={!editMode}
            />
          </label>
          {editMode ? (
            <button onClick={handleSave}>Save</button>
          ) : (
            <button onClick={() => setEditMode(true)}>Edit</button>
          )}
          <button onClick={handleChangeButton}>Change Password</button>
        </div>
        {changePasswordVisible && (
        <div className="modal-backdrop">
          <form autoComplete="off" id='modal-form'>
            <div className="modal change-password">
              <h3>Change Password</h3>
              <label>
                Current Password:
                <input
                  type="password"
                  name="currentPassword"
                  value={passwords.currentPassword}
                  onChange={handlePasswordChange}
                />
              </label>
              <label>
                New Password:
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handlePasswordChange}
                />
              </label>
              <div className="modal-buttons">
                <button className="cancel-button" onClick={handleCancelPassword}>Cancel</button>
                <button onClick={handleChangePassword}>Continue</button>
              </div>
            </div>
          </form>
        </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;