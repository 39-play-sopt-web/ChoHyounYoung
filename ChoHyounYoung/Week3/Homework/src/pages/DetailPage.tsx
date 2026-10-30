import DetailCard from '../components/detailcard';
import DetailChip from '../components/detailchip';
import starIcon from '../assets/star_s.svg';

export type MovieDetail = {
  title: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  releaseDate: string;
  rating: number;
  runtime: number;
  voteCount: number;
  status: string;
  genres: { id: number; name: string }[];
  overview: string;
  originalTitle: string;
  originalLanguage: string;
  productionCountries: string[];
  spokenLanguages: string[];
  budget: number;
  revenue: number;
};

// API 연결 전 디자인 확인용 데이터
const previewMovie: MovieDetail = {
  title: '레지던트 이블: 0번째 밤',
  posterUrl: null,
  backdropUrl: null,
  releaseDate: '2026년 9월 16일',
  rating: 7.3,
  runtime: 94,
  voteCount: 938,
  status: 'Released',
  genres: [
    { id: 27, name: '공포' },
    { id: 878, name: 'SF' },
    { id: 12, name: '모험' },
  ],
  overview:
    '의료 택배 기사 브라이언은 긴급 배달을 맡아 심야에 라쿤 시티 종합 병원으로 향한다. 눈밭을 헤치며 가던 중 갑자기 차로 뛰어든 누군가를 치게 되고, 죽은 줄 알았던 이가 다시 그를 덮쳐온다. 하나인 줄 알았던 정체불명의 존재들은 끊임없이 늘어나고, 통신마저 끊긴다. 브라이언은 자신이 무엇을 배달하고 있는지도 모른 채 눈 앞에 닥친 존재들을 피해 필사의 사투를 벌이는데...',
  originalTitle: 'Resident Evil',
  originalLanguage: '영어',
  productionCountries: ['United States of America', 'Germany', 'France'],
  spokenLanguages: ['English'],
  budget: 75000000,
  revenue: 320225000,
};

type DetailPageProps = {
  movie?: MovieDetail;
};

const formatMoney = (amount: number) =>
  amount > 0 ? `$${amount.toLocaleString('en-US')}` : '정보 없음';

function DetailPage({ movie = previewMovie }: DetailPageProps) {
  const basicInfo = [
    { label: '원제', value: movie.originalTitle },
    { label: '원어', value: movie.originalLanguage },
    { label: '제작 국가', value: movie.productionCountries.join(', ') },
    { label: '사용 언어', value: movie.spokenLanguages.join(', ') },
    { label: '예산', value: formatMoney(movie.budget) },
    { label: '수익', value: formatMoney(movie.revenue) },
  ];

  return (
    <main className="mx-auto w-full max-w-[1044px] px-5 pt-[30px] pb-10 font-['Inter',sans-serif]">
      <a
        href="/"
        className="text-xs font-medium tracking-[0.24px] text-accent no-underline"
      >
        ← 목록으로 돌아가기
      </a>

      {/* 배경 이미지는 장식용으로 표시하고, 어두운 레이어를 덮어 글자의 가독성을 유지 */}
      <section className="relative mt-7 isolate overflow-hidden rounded-[30px] bg-border/30 p-6 sm:min-h-[333px] sm:px-9">
        {movie.backdropUrl && (
          <img
            src={movie.backdropUrl}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-surface/75" />
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="mx-auto aspect-[191/285] w-[191px] shrink-0 overflow-hidden rounded-lg bg-text-secondary sm:mx-0">
            {movie.posterUrl ? (
              <img
                src={movie.posterUrl}
                alt={`${movie.title} 포스터`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-black">
                포스터 없음
              </div>
            )}
          </div>
          <div className="min-w-0 pt-1">
            <h1 className="text-[27px] leading-8 font-bold text-text-primary">
              {movie.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-text-secondary">
              <span className="inline-flex h-[23px] items-center gap-1 rounded-[7px] bg-accent px-2 text-[11px] font-bold text-black">
                <img src={starIcon} alt="" className="size-[11px]" />
                <span className="sr-only">평점 </span>
                {movie.rating.toFixed(1)}
              </span>
              <span>{movie.releaseDate || '개봉일 정보 없음'}</span>
              <span>
                {movie.runtime > 0
                  ? `${Math.floor(movie.runtime / 60)}시간 ${movie.runtime % 60}분`
                  : '상영 시간 정보 없음'}
              </span>
              <span>투표 {movie.voteCount.toLocaleString('ko-KR')}명</span>
              <span className="rounded-[7px] border border-text-secondary px-2 py-1 text-[11px] font-bold">
                {movie.status || '상태 정보 없음'}
              </span>
            </div>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {movie.genres.map((genre) => (
                <DetailChip key={genre.id} label={genre.name} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-base font-bold text-text-primary">줄거리</h2>
        <p className="mt-4 text-[13px] leading-[23.4px] whitespace-pre-line text-text-primary">
          {movie.overview || '줄거리 정보가 없습니다.'}
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-bold text-text-primary">기본 정보</h2>
        {/* 작은 화면 1열 → 640px 이상 2열 → 1024px 이상 4열 */}
        <div className="mt-4 grid grid-cols-1 gap-x-3.5 gap-y-[15px] sm:grid-cols-2 lg:grid-cols-4">
          {basicInfo.map((info) => (
            <DetailCard
              key={info.label}
              label={info.label}
              value={info.value || '정보 없음'}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default DetailPage;
