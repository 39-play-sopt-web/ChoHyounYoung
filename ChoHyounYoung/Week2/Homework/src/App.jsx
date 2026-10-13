import Header from './components/Header.jsx';
import GamePage from './pages/GamePage.jsx';
import RankingPage from './pages/RankingPage.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      {/* 페이지 전환 중에도 Header를 유지해 메뉴 애니메이션이 이어지도록 한다. */}
      <Header />
      <Routes>
        {/* 기본 경로는 게임 페이지로 연결한다. */}
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
