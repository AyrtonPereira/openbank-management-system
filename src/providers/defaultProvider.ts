import type { AxiosRequestHeaders } from 'axios';
import axios from 'axios';

const HEADERS: Partial<AxiosRequestHeaders> = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  'Cache-Control': 'no-cache',
  'Pragma': 'no-cache',
  'Expires': '0',
};

const defaultProvider = axios.create({
  headers: HEADERS,
});

defaultProvider.interceptors.request.use((config) => {
  config.baseURL = import.meta.env.VITE_API_URL;
  return config;
});

export default defaultProvider;
