export const MOVIE_ENDPOINTS = {
  list: '/discover/movie',
  detail: (movieId: number) => `/movie/${movieId}`,
} as const;

export const TMDB_MAX_PAGE = 500;
