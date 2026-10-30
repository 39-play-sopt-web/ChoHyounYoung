import { useState } from 'react';
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

// API 연결 전 카드 배치를 확인하기 위한 예시 데이터
const previewMovies = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: '레지던트 이블: 0번째 밤',
  releaseDate: '2026년 9월 16일',
  overview:
    '의료 택배 기사 브라이언은 긴급 배달을 맡아 심야에 라쿤 시티 종합 병원으로 향한다. 눈밭을 헤치며 가던 중 갑자기 차로 뛰어든 누군가를 만나는데...',
  rating: 7.3,
  posterUrl: null,
}));

function MainPage() {
  const navigate = useNavigate();
  // 현재 선택한 필터를 저장. 처음에는 첫 번째 항목인 '전체'가 선택됨
  const [selectedFilter, setSelectedFilter] = useState<
    (typeof ratingFilters)[number]
  >(ratingFilters[0]);
  // 선택한 평점 범위에 맞는 영화만 남김
  const movies = previewMovies.filter(
    ({ rating }) =>
      rating >= selectedFilter.min &&
      (selectedFilter.max === 10 ? rating <= 10 : rating < selectedFilter.max)
  );

  return (
    // 화면 너비에 맞게 줄어들고, 최대 1044px까지만 넓어지는 가운데 정렬
    // mx-auto: 좌우 여백 자동 / w-full: 너비 100% / px-5: 좌우 내부 여백 20px
    <main className="mx-auto w-full max-w-[1044px] px-5 pt-[32px] pb-10">
      <h1 className="text-2xl font-bold text-text-primary">영화 둘러보기</h1>
      {/* flex: 버튼을 가로로 배치 / flex-wrap: 공간이 부족하면 다음 줄로 / gap-[9px]: 간격 9px */}
      <div
        className="mt-[25px] flex flex-wrap gap-[9px]"
        role="group"
        aria-label="영화 평점 필터"
      >
        {/* 필터 배열을 map으로 순회하며 항목마다 StarSelect 버튼 하나를 생성 */}
        {ratingFilters.map((filter) => (
          <StarSelect
            // key는 React가 각 항목을 구분하는 고유 값. 컴포넌트의 props로 전달되지는 않음
            key={filter.id}
            // label props에 현재 필터의 문구를 전달
            label={filter.label}
            // 현재 선택한 필터와 id가 같으면 true → 버튼이 민트색으로 표시됨
            isSelected={selectedFilter.id === filter.id}
            // 클릭할 때 해당 필터를 선택 상태로 저장 → 페이지가 다시 렌더링됨
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
        {/* 필터링된 영화마다 MovieCard 하나를 만들고, 영화 정보를 props로 전달 */}
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            // 왼쪽은 MovieCard가 받는 props 이름, 중괄호 안은 전달할 실제 값
            title={movie.title}
            releaseDate={movie.releaseDate}
            overview={movie.overview}
            rating={movie.rating}
            // 이미지 주소가 있으면 포스터 표시, null이면 '포스터 없음' 표시
            posterUrl={movie.posterUrl}
            // 카드의 영화 ID를 URL에 넣어 해당 상세 페이지로 이동
            onClick={() => navigate(`/movies/${movie.id}`)}
          />
        ))}
      </div>
      {movies.length === 0 && (
        <p className="py-16 text-center text-sm text-text-secondary">
          해당 평점의 영화가 없습니다.
        </p>
      )}
    </main>
  );
}

export default MainPage;
