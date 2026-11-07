import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { getPost, getPosts } from '@/api/board';
import { queryKeys } from '@/constants/board';

export function usePosts(keyword: string) {
  return useInfiniteQuery({
    // 검색어를 쿼리 키에 넣어 전체 목록과 검색 결과의 캐시가 섞이지 않게 한다.
    queryKey: queryKeys.posts.list(keyword),
    queryFn: ({ pageParam }) => getPosts({ keyword, cursor: pageParam }),
    initialPageParam: undefined as number | undefined,
    // 서버가 준 cursor를 그대로 다음 요청에 넘겨야 중간 게시글이 빠지지 않는다.
    getNextPageParam: (lastPage) =>
      lastPage.hasNext ? lastPage.nextCursor ?? undefined : undefined,
  });
}

export function usePost(postId: number | null) {
  return useQuery({
    queryKey: queryKeys.posts.detail(postId ?? -1),
    queryFn: () => getPost(postId!),
    // 잘못된 URL의 ID로 요청하지 않고 페이지에서 안내 문구를 보여준다.
    enabled: postId !== null,
  });
}
