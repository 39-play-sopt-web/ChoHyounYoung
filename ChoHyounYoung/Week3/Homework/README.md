# PLAY SOPT MOVIE

React + TypeScript로 만든 TMDB 영화 탐색 페이지입니다.

## 실행

```bash
npm install
cp .env.example .env
```

`.env`의 `VITE_API_KEY`에 TMDB API 키를 입력합니다.
환경 변수를 수정했다면 개발 서버를 다시 실행합니다.

```bash
npm run dev
```

## 기능

- 영화 목록 무한 스크롤 및 평점별 필터
- 영화 카드 클릭 시 상세 페이지 이동
- 영화 상세 정보와 포스터·배경 이미지 표시

## 확인

```bash
npm run build
npm run lint
```
