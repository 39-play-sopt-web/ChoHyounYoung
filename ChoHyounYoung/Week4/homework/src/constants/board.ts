export const POST_LIMITS = {
  title: 50,
  content: 1_000,
  author: 20,
  searchKeywordMin: 2,
  searchKeywordMax: 50,
} as const;

export const POSTS_PAGE_SIZE = 10;

// 문자열을 화면마다 직접 쓰면 invalidate할 때 오타가 나기 쉬워 쿼리 키를 한곳에 모았다.
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    list: (keyword: string) => ['posts', 'list', keyword] as const,
    detail: (postId: number) => ['posts', 'detail', postId] as const,
  },
} as const;
