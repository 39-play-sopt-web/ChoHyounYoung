import axios from 'axios';
import { authStorage } from './storage';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

http.interceptors.request.use((config) => {
  const authorizationCode = authStorage.getCode();

  if (authorizationCode) {
    config.headers.Authorization = authorizationCode;
  }

  return config;
});
