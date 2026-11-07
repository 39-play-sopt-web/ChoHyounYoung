import axios from 'axios';
import { authStorage } from './storage';

const baseURL = import.meta.env.VITE_API_BASE_URL;

if (!baseURL) {
  throw new Error('VITE_API_BASE_URL 환경변수가 설정되지 않았습니다.');
}

export const http = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

http.interceptors.request.use((config) => {
  const authorizationCode = authStorage.getCode();

  // 작성·수정·삭제 요청마다 코드를 직접 넣지 않도록 공통 요청 단계에서 처리한다.
  // API 명세에 따라 Bearer 접두사 없이 발급받은 코드를 그대로 보낸다.
  if (authorizationCode) {
    config.headers.Authorization = authorizationCode;
  }

  return config;
});
