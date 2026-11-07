const AUTHORIZATION_CODE_KEY = 'authorizationCode';
const PART_KEY = 'part';

export const authStorage = {
  getCode: () => localStorage.getItem(AUTHORIZATION_CODE_KEY),
  setCode: (code: string) => localStorage.setItem(AUTHORIZATION_CODE_KEY, code),
  getPart: () => localStorage.getItem(PART_KEY),
  setPart: (part: string) => localStorage.setItem(PART_KEY, part),
  clear: () => {
    localStorage.removeItem(AUTHORIZATION_CODE_KEY);
    localStorage.removeItem(PART_KEY);
  },
};
