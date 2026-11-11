import { useInfiniteQuery } from '@tanstack/react-query';
import { getMovies } from '../api/movies';
import { TMDB_MAX_PAGE } from '../constants/api';
import { hasApiKey } from '../lib/http';
import type { RatingFilter } from '../types/movie';

export function useMovies(filter: RatingFilter) {
  return useInfiniteQuery({
    queryKey: ['movies', filter.min, filter.max],
    queryFn: ({ pageParam, signal }) => getMovies(filter, pageParam, signal),
    initialPageParam: 1,
    // TMDB는 최대 500페이지까지 조회 가능
    getNextPageParam: (lastPage) =>
      lastPage.page < Math.min(lastPage.total_pages, TMDB_MAX_PAGE)
        ? lastPage.page + 1
        : undefined,
    enabled: hasApiKey,
  });
}
