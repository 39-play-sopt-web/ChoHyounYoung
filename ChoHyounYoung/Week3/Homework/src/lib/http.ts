import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL?.trim();
const apiKey = import.meta.env.VITE_API_KEY?.trim();

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL이 설정되지 않았습니다.');
}

export const hasApiKey = Boolean(apiKey);

export const httpClient = axios.create({
  baseURL,
  timeout: 15000,
  params: { api_key: apiKey, language: 'ko-KR' },
});
