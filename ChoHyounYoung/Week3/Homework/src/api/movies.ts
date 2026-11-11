import axios from 'axios';
import type {
  MovieDetailResponse,
  MovieListResponse,
  RatingFilter,
} from '../types/movie';
import { httpClient } from '../lib/http';
import { MOVIE_ENDPOINTS } from '../constants/api';

export async function getMovies(
  filter: RatingFilter,
  page: number,
  signal?: AbortSignal
) {
  const { data } = await httpClient.get<MovieListResponse>(
    MOVIE_ENDPOINTS.list,
    {
      signal,
      params: {
        page,
        sort_by: 'popularity.desc',
        include_adult: false,
        'vote_average.gte': filter.min,
        'vote_average.lte': filter.max,
      },
    }
  );
  return data;
}

export async function getMovieDetail(movieId: number, signal?: AbortSignal) {
  const { data } = await httpClient.get<MovieDetailResponse>(
    MOVIE_ENDPOINTS.detail(movieId),
    { signal }
  );
  return data;
}

export function getApiErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    if (error.code === 'ERR_CANCELED') return null;
    if (error.response?.status === 401) return 'TMDB API 키를 확인해주세요.';
    if (error.response?.status === 404) return '영화를 찾을 수 없습니다.';
    if (error.response?.status === 429)
      return '요청이 많습니다. 잠시 후 다시 시도해주세요.';
    if (error.code === 'ECONNABORTED')
      return '응답 시간이 초과됐습니다. 다시 시도해주세요.';
  }
  return '영화 정보를 불러오지 못했습니다. 네트워크 연결을 확인해주세요.';
}
