const AUTHORIZATION_CODE_KEY = 'authorizationCode';
const PART_KEY = 'part';

export type Part = 'WEB' | 'iOS' | 'ANDROID';

export const authStorage = {
  getCode: () => localStorage.getItem(AUTHORIZATION_CODE_KEY),
  setCode: (code: string) => localStorage.setItem(AUTHORIZATION_CODE_KEY, code),
  getPart: (): Part | null => {
    const part = localStorage.getItem(PART_KEY);
    return part === 'WEB' || part === 'iOS' || part === 'ANDROID' ? part : null;
  },
  setPart: (part: Part) => localStorage.setItem(PART_KEY, part),
  clear: () => {
    // localStorage 전체를 비우면 다른 기능의 값도 사라질 수 있어 인증 관련 키만 삭제한다.
    localStorage.removeItem(AUTHORIZATION_CODE_KEY);
    localStorage.removeItem(PART_KEY);
  },
};
