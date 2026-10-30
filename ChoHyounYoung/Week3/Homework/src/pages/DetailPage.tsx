import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getApiErrorMessage, getMovieDetail, hasApiKey } from '../api/movies';
import { formatReleaseDate, getImageUrl } from '../utils/movie';
import ApiKeyNotice from '../components/ApiKeyNotice';
import DetailCard from '../components/detailcard';
import DetailChip from '../components/detailchip';
import starIcon from '../assets/star_s.svg';

const formatMoney = (amount: number) =>
  amount > 0 ? `$${amount.toLocaleString('en-US')}` : '정보 없음';

function DetailPage() {
  // URL의 movieId로 해당 영화만 조회하고, ID가 바뀌면 새로 요청
  const { movieId } = useParams<{ movieId: string }>();
  const id = Number(movieId);
  const isValidId = Boolean(movieId && /^[1-9]\d*$/.test(movieId) && Number.isSafeInteger(id));
  const { data, error, isPending, refetch } = useQuery({
    queryKey: ['movie', id],
    queryFn: ({ signal }) => getMovieDetail(id, signal),
    enabled: hasApiKey && isValidId,
  });

  // 데이터가 없는 동안에는 상세 화면 대신 로딩·오류 상태를 표시
  if (!isValidId || !hasApiKey || isPending || error || !data) {
    return (
      <main className="mx-auto max-w-[1044px] px-5 py-8">
        <Link to="/" className="text-xs text-accent no-underline">← 목록으로 돌아가기</Link>
        {!isValidId ? <p role="alert" className="py-12">올바르지 않은 영화 ID입니다.</p>
          : !hasApiKey ? <ApiKeyNotice />
          : error ? <div role="alert" className="py-12"><p>{getApiErrorMessage(error)}</p><button type="button" className="mt-3 text-accent" onClick={() => { void refetch(); }}>다시 시도</button></div>
          : <p role="status" className="py-12">영화 정보를 불러오는 중입니다...</p>}
      </main>
    );
  }

  const movie = data;
  const posterUrl = getImageUrl(movie.poster_path);
  const backdropUrl = getImageUrl(movie.backdrop_path, 'w1280');
  const runtime = movie.runtime ?? 0;

  // 같은 형태의 기본 정보 카드를 배열로 구성해 재사용
  const basicInfo = [
    { label: '원제', value: movie.original_title },
    { label: '원어', value: new Intl.DisplayNames(['ko'], { type: 'language' }).of(movie.original_language) ?? movie.original_language },
    { label: '제작 국가', value: movie.production_countries.map((country) => country.name).join(', ') },
    { label: '사용 언어', value: movie.spoken_languages.map((language) => language.english_name || language.name).join(', ') },
    { label: '예산', value: formatMoney(movie.budget) },
    { label: '수익', value: formatMoney(movie.revenue) },
  ];

  return (
    <main className="mx-auto w-full max-w-[1044px] px-5 pt-[30px] pb-10 font-['Inter',sans-serif]">
      <Link
        to="/"
        className="text-xs font-medium tracking-[0.24px] text-accent no-underline"
      >
        ← 목록으로 돌아가기
      </Link>

      {/* 배경 이미지는 장식용으로 표시하고, 어두운 레이어를 덮어 글자의 가독성을 유지 */}
      <section className="relative mt-7 isolate overflow-hidden rounded-[30px] bg-border/30 p-6 sm:min-h-[333px] sm:px-9">
        {backdropUrl && (
          <img
            src={backdropUrl}
            alt=""
            className="absolute inset-0 -z-20 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 -z-10 bg-surface/75" />
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="mx-auto aspect-[191/285] w-[191px] shrink-0 overflow-hidden rounded-lg bg-text-secondary sm:mx-0">
            {posterUrl ? (
              <img
                src={posterUrl}
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
                {movie.vote_average.toFixed(1)}
              </span>
              <span>{formatReleaseDate(movie.release_date)}</span>
              <span>
                {runtime > 0
                  ? `${Math.floor(runtime / 60)}시간 ${runtime % 60}분`
                  : '상영 시간 정보 없음'}
              </span>
              <span>투표 {movie.vote_count.toLocaleString('ko-KR')}명</span>
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
