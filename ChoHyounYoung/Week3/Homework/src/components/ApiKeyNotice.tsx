function ApiKeyNotice() {
  return (
    <p role="status" className="py-12 text-sm leading-6 text-text-secondary">
      TMDB API 키를 설정해주세요. 프로젝트의 .env에 VITE_API_KEY를 입력한 뒤 개발 서버를 다시 실행해주세요.
    </p>
  )
}

export default ApiKeyNotice
