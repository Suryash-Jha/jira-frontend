import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import SecureStorage from '../utils/SecureStorage';

console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
const AXIOS: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '', 
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 10000, 
});
console.log('AXIOS', AXIOS);

AXIOS.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = SecureStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

AXIOS.interceptors.response.use(
  (response: AxiosResponse) => {

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized - Redirecting to login...');
      localStorage.removeItem('accessToken');
      // window.location.href = '/login'; // Adjust based on your app's routing
    }
    return Promise.reject(error);
  },
);

export default AXIOS;
