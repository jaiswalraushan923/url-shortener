import axios from 'axios';
import { getToken } from '../utils/auth';

const API = axios.create({
  baseURL: 'https://url-shortener-6kbq.onrender.com',
});

API.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
