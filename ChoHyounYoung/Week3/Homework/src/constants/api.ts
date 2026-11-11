export const MOVIE_ENDPOINTS = {
  list: '/discover/movie',
  detail: (movieId: number) => `/movie/${movieId}`,
} as const;
