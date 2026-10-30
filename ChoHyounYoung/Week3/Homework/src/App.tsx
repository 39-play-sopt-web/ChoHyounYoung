import Header from './components/header'
import MainPage from './pages/MainPage'
import DetailPage from './pages/DetailPage'
import { Link, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="min-h-svh bg-surface">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/movies/:movieId" element={<DetailPage />} />
        <Route path="*" element={
          <main className="mx-auto max-w-[1044px] px-5 py-10">
            <p className="mb-4">페이지를 찾을 수 없습니다.</p>
            <Link to="/" className="text-accent">← 목록으로 돌아가기</Link>
          </main>
        } />
      </Routes>
    </div>
  )
}

export default App
