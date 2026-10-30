import Header from './components/header';
import MovieListPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-svh bg-surface">
      <Header />
      <Routes>
        <Route path="/" element={<MovieListPage />} />
        <Route path="/movies/:movieId" element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
