export function getImageUrl(path: string | null, size: 'w500' | 'w1280' = 'w500') {
  return path ? `https://image.tmdb.org/t/p/${size}${path}` : null
}

export function formatReleaseDate(date: string) {
  if (!date) return '개봉일 정보 없음'
  const [year, month, day] = date.split('-')
  return `${year}년 ${Number(month)}월 ${Number(day)}일`
}
