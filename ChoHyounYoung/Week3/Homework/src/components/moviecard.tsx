import starIcon from '../assets/star_s.svg'

type MovieCardProps = {
  title: string
  releaseDate: string
  overview: string
  rating: number
  // 부모에서 API의 포스터 경로를 완성된 이미지 주소로 변환해서 전달
  posterUrl?: string | null
  // 상세 페이지 이동은 부모에서 처리
  onClick?: () => void
}

function MovieCard({ title, releaseDate, overview, rating, posterUrl, onClick }: MovieCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full min-w-0 overflow-hidden rounded-[10px] bg-border text-left font-['Inter',sans-serif] transition duration-200 hover:-translate-y-1 hover:shadow-lg hover:outline hover:outline-1 hover:outline-offset-0 hover:outline-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-text-secondary">
        {posterUrl ? (
          <img src={posterUrl} alt={`${title} 포스터`} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-black">
            포스터 없음
          </div>
        )}
        <span className="absolute top-2 left-2 flex h-5 w-11 items-center justify-center gap-1 rounded-md bg-accent text-[10px] leading-3 font-bold text-black outline-[0.5px] outline-text-secondary">
          <img src={starIcon} alt="" className="size-2.5" />
          <span className="sr-only">평점 </span>
          {rating.toFixed(1)}
        </span>
      </div>
      <div className="space-y-2 px-[15px] py-3">
        <h2 className="truncate text-xs font-bold text-text-primary" title={title}>{title}</h2>
        <p className="text-xs text-accent">{releaseDate || '개봉일 정보 없음'}</p>
        <p className="line-clamp-3 min-h-12 text-xs leading-4 text-text-secondary">{overview || '줄거리 정보가 없습니다.'}</p>
      </div>
    </button>
  )
}

export default MovieCard
