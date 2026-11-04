export type MovieSummary = {
  id: number
  title: string
  release_date: string
  overview: string
  vote_average: number
  poster_path: string | null
}

export type MovieListResponse = {
  page: number
  results: MovieSummary[]
  total_pages: number
  total_results: number
}

export type MovieDetailResponse = MovieSummary & {
  backdrop_path: string | null
  runtime: number | null
  vote_count: number
  status: string
  genres: { id: number; name: string }[]
  original_title: string
  original_language: string
  production_countries: { iso_3166_1: string; name: string }[]
  spoken_languages: { iso_639_1: string; name: string; english_name: string }[]
  budget: number
  revenue: number
}

export type RatingFilter = { id: string; label: string; min: number; max: number }
