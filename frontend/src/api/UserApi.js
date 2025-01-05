import axios from 'axios';
import Cookies from 'js-cookie';

const UsersAPI = {
  login: async (data) => {
    try {
      // Fetch tenants for the user
      const tenants = await UsersAPI.getUserTenants(data.username);
      // If tenant_id is not provided, use the first tenant
      if (!data.tenant_id && tenants.length > 0) {
        data.tenant_id = tenants[0].id;
        await axios.post('users/login/', data);
        if (tenants.length > 1) {
          return { success: false, message: 'tenants', tenants: tenants };
        }
      }
      // Call the login API
      const response = await axios.post('users/login/', data);
      // Set cookies
      Cookies.set('token', response.data.token, { expires: 7 });
      Cookies.set('username', data.username, { expires: 7 });
      Cookies.set('tenant', response.data.tenant, { expires: 7 });
      Cookies.set('role', data.role, { expires: 7 });
      console.log('Cookies set:', Cookies.get());
      return { success: true };
    } catch (error) {
      if (error.response && error.response.status === 400) {
        return { success: false, message: 'Invalid username or password!' };
      } else {
        return { success: false, message: 'Login failed. Please try again later.' };
      }
    }
  },

  logout: async () => {
    try{
      await axios.post('users/logout/');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      Cookies.remove('token');
      Cookies.remove('username');
      Cookies.remove('tenant');
      Cookies.remove('role');
      return { success: true };
    }
  },
  
  getUserTenants: async (id) => {
    try {
      const response = await axios.get(`users/${id}/tenants/`);
      return response.data;
    } catch (error) {
      // console.error('Error getting user tenants:', error);
      return [];
    }
  },

  changePassword: (data) => axios.post('users/change-password/', data),

  register: (data) => axios.post('users/register/', data),

  getCurrentUser: () => axios.get('users/current/'),

  updateCurrentUser: (data) => axios.patch('users/current/', data),

  getUserById: (userId) => axios.get(`users/${userId}/`),

  updateUserById: (data, userId) => axios.patch(`users/${userId}/`, data),

  getUsersList: () => axios.get('users/'),

};

export default UsersAPI;