import { useState } from 'react';
import { DEFAULT_LEVEL } from './constants/game.js';
import Header from './components/Header.jsx';
import GamePage from './pages/GamePage.jsx';
import RankingPage from './pages/RankingPage.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
  // Header와 GamePage가 같은 레벨을 사용하도록 공통 부모에서 관리한다.
  const [level, setLevel] = useState(DEFAULT_LEVEL);
  const [time, setTime] = useState(0);

  const handleLevelChange = (newLevel) => {
    if (newLevel === level) return;
    setTime(0);
    setLevel(newLevel);
  };

  return (
    <BrowserRouter>
      {/* 페이지 전환 중에도 Header를 유지해 메뉴 애니메이션이 이어지도록 한다. */}
      <Header level={level} onLevelChange={handleLevelChange} time={time} />
      <Routes>
        {/* 기본 경로는 게임 페이지로 연결한다. */}
        <Route path="/" element={<Navigate to="/game" replace />} />
        {/* 레벨이 바뀌면 GamePage를 새로 생성해 숫자판과 게임 상태를 초기화한다. */}
        <Route path="/game" element={<GamePage key={level} level={level} onTimeChange={setTime} />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
