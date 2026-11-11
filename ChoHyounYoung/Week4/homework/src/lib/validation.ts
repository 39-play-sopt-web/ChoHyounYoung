import { POST_LIMITS } from '@/constants/board';

export function getLengthError(label: string, value: string, maxLength: number) {
  if (value.length <= maxLength) return null;
  return `${label}은 ${maxLength}자 이하로 입력해 주세요.`;
}

export function getSearchError(keyword: string) {
  const length = keyword.trim().length;
  // 빈 검색어는 오류가 아니라 전체 목록 조회 조건이다.
  if (length === 0) return null;
  if (length < POST_LIMITS.searchKeywordMin) return '검색어는 2자 이상 입력해 주세요.';
  if (length > POST_LIMITS.searchKeywordMax) return '검색어는 50자 이하로 입력해 주세요.';
  return null;
}
