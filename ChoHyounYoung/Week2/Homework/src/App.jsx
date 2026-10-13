import GamePage from './pages/GamePage.jsx';
import RankingPage from './pages/RankingPage.jsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/game" replace />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/ranking" element={<RankingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
