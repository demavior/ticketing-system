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
      const login = (await axios.post('users/login/', data)).data;
      // Set cookies
      Cookies.set('token', login.token, { expires: 7 });
      Cookies.set('username', data.username, { expires: 7 });
      Cookies.set('tenant', login.tenant, { expires: 7 });
      Cookies.set('role', login.role, { expires: 7 });
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

  changePassword: async (data) => (await axios.post('users/change-password/', data)).data,

  register: async (data) => (await axios.post('users/register/', data)).data,

  getCurrentUser: async () => (await axios.get('users/current/')).data,

  updateCurrentUser: async (data) => (axios.patch('users/current/', data)).data,

  getUserById: async (userId) => (await axios.get(`users/${userId}/`)).data,

  updateUserById: async (data, userId) => (await axios.patch(`users/${userId}/`, data)).data,

  getUsersList: async () => (await axios.get('users/')).data,

};

export default UsersAPI;