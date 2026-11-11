export const ROUTES = {
  home: '/',
  movieDetail: (movieId: number) => `/movies/${movieId}`,
  movieDetailPattern: '/movies/:movieId',
} as const;
