import axios from 'axios';

const getBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    return 'https://types-menu-reasons-butterfly.trycloudflare.com/api';
  }
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl) return envUrl;
  return 'http://localhost:8080/api';
};

const api = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwt_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers['Bypass-Tunnel-Remainder'] = 'true';
  config.headers['ngrok-skip-browser-warning'] = 'true';
  return config;
});

export default api;
