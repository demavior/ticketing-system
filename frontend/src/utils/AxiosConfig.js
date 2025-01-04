import axios from 'axios';
import Cookies from 'js-cookie';
// Base URL for the API
const BASE_URL = 'http://127.0.0.1:8000/';
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';
// Add a request interceptor to include the token in the headers
axios.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) config.headers.Authorization = `Token ${token}`;
    return config;
  },
  error => Promise.reject(error)
);