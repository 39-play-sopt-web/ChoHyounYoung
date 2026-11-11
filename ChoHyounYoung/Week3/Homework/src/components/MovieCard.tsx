import starIcon from '../assets/star_s.svg';
import { Link } from 'react-router-dom';

type MovieCardProps = {
  title: string;
  releaseDate: string;
  overview: string;
  rating: number;
  // 부모에서 API의 포스터 경로를 완성된 이미지 주소로 변환해서 전달
  posterUrl?: string | null;
  to: string;
};

function MovieCard({
  title,
  releaseDate,
  overview,
  rating,
  posterUrl,
  to,
}: MovieCardProps) {
  return (
    <Link
      to={to}
      className="flex h-[398px] w-full min-w-0 flex-col overflow-hidden rounded-[10px] bg-border text-left font-['Inter',sans-serif] no-underline transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[183/274] w-full shrink-0 overflow-hidden bg-text-muted">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${title} 포스터`}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-black">
            포스터 없음
          </div>
        )}
        <span className="absolute top-2 left-2 flex h-5 w-11 items-center justify-center gap-1 rounded-[7px] bg-accent text-[10px] leading-3 font-bold text-black outline-[0.5px] outline-text-secondary">
          <img src={starIcon} alt="" className="size-2.5" />
          <span className="sr-only">평점 </span>
          {rating.toFixed(1)}
        </span>
      </div>
      <div className="px-[15px] pt-3 pb-4">
        <h2
          className="truncate text-[13px] leading-4 font-bold text-text-primary"
          title={title}
        >
          {title}
        </h2>
        <p className="mt-[5px] text-[11px] leading-[15px] text-accent">
          {releaseDate || '개봉일 정보 없음'}
        </p>
        <p className="mt-1.5 line-clamp-3 min-h-[52.8px] text-[11px] leading-[17.6px] text-text-secondary">
          {overview || '줄거리 정보가 없습니다.'}
        </p>
      </div>
    </Link>
  );
}

export default MovieCard;
