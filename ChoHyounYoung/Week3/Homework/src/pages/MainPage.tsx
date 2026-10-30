import { useEffect, useRef, useState } from 'react';
import { useMovies } from '../hooks/useMovies';
import { getApiErrorMessage, hasApiKey } from '../api/movies';
import { formatReleaseDate, getImageUrl } from '../utils/movie';
import ApiKeyNotice from '../components/ApiKeyNotice';
import { useNavigate } from 'react-router-dom';
import StarSelect from '../components/starselect';
import MovieCard from '../components/moviecard';

const ratingFilters = [
  { id: 'all', label: '전체', min: 0, max: 10 },
  { id: '9', label: '9점 이상', min: 9, max: 10 },
  { id: '8', label: '8 ~ 9점', min: 8, max: 9 },
  { id: '7', label: '7 ~ 8점', min: 7, max: 8 },
  { id: '6', label: '6 ~ 7점', min: 6, max: 7 },
  { id: 'under6', label: '6점 미만', min: 0, max: 6 },
] as const;

function MainPage() {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState<
    (typeof ratingFilters)[number]
  >(ratingFilters[0]);
  const { data, error, isPending, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } = useMovies(selectedFilter);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const movies = [...new Map((data?.pages.flatMap((page) => page.results) ?? [])
    // lte는 경계를 포함하므로, '6점 미만' 등의 상한을 클라이언트에서도 확인
    .filter((movie) => movie.vote_average >= selectedFilter.min && (selectedFilter.max === 10 ? movie.vote_average <= 10 : movie.vote_average < selectedFilter.max))
    .map((movie) => [movie.id, movie])).values()];

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasNextPage || isFetchingNextPage || error) return;
    // 목록 끝에서 300px 전에 다음 페이지 요청. 요청 중에는 중복 호출 방지
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) void fetchNextPage();
    }, { rootMargin: '300px' });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, error]);

  return (


    <main className="mx-auto w-full max-w-[1044px] px-5 pt-[32px] pb-10">
      <h1 className="text-2xl font-bold text-text-primary">영화 둘러보기</h1>
      <div
        className="mt-[25px] flex flex-wrap gap-[9px]"
        role="group"
        aria-label="영화 평점 필터"
      >
        {ratingFilters.map((filter) => (
          <StarSelect

            key={filter.id}

            label={filter.label}

            isSelected={selectedFilter.id === filter.id}

            onClick={() => setSelectedFilter(filter)}
          />
        ))}
      </div>
      {/*
        grid: 영화 카드를 행과 열로 배치
        grid-cols-2: 기본 2열 (640px 미만)
        sm:grid-cols-3: 화면 너비 640px 이상이면 3열
        md:grid-cols-4: 화면 너비 768px 이상이면 4열
        lg:grid-cols-5: 화면 너비 1024px 이상이면 5열
        gap-x-[22px]: 열 사이 간격 22px / gap-y-[23px]: 행 사이 간격 23px
        items-start: 카드 높이가 달라도 위쪽에 맞춰 배치 / mt-[25px]: 위 여백 25px
      */}
      <div className="mt-[25px] grid grid-cols-2 items-start gap-x-[22px] gap-y-[23px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}

            title={movie.title}
            releaseDate={formatReleaseDate(movie.release_date)}
            overview={movie.overview}
            rating={movie.vote_average}

            posterUrl={getImageUrl(movie.poster_path)}

            onClick={() => navigate(`/movies/${movie.id}`)}
          />
        ))}
      </div>
      {hasApiKey && !isPending && !error && movies.length === 0 && (
        <p className="py-16 text-center text-sm text-text-secondary">
          해당 평점의 영화가 없습니다.
        </p>
      )}
      {!hasApiKey && <ApiKeyNotice />}
      {hasApiKey && (isPending || isFetchingNextPage) && <p role="status" className="py-8 text-center text-sm text-text-secondary">영화를 불러오는 중입니다...</p>}
      {error && (
        <div role="alert" className="py-8 text-center text-sm">
          <p>{getApiErrorMessage(error)}</p>
          <button type="button" className="mt-3 text-accent" onClick={() => { void (data ? fetchNextPage() : refetch()); }}>다시 시도</button>
        </div>
      )}
      <div ref={sentinelRef} aria-hidden="true" className="h-px" />

    </main>
  );
}

export default MainPage;
